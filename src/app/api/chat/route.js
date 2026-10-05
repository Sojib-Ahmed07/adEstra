// app/api/chat/route.js
// POST { messages: [{ role, content }, ...] }
// Returns { reply, source } where source ∈ 'gemini' | 'groq' | 'handoff' | 'error' | 'limited' | 'session'
//
// Protection layers:
//   1. Origin check     — only our own domains (browsers can't fake this header)
//   2. Signed session   — HMAC cookie with expiry from /api/chat/session (itself rate-limited)
//   3. Input hardening  — message length, history size, roles
//   4. Per-visitor + per-session limits — stored in MongoDB, shared by all Vercel instances
//   5. Global caps      — protect the free Gemini/Groq quotas from distributed abuse
// All counters live in MongoDB (lib/rateLimit.js); if the database is unreachable the
// chat refuses to answer rather than risk burning the AI quota.
//
// Every failure response includes a short `reason` code (no secrets) so you can see
// WHY it failed in the browser: DevTools → Network → /api/chat → Response.
//   origin | session | bad-input | ratelimit-db | providers (with per-provider status)

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { STATIC_CONTEXT } from '@/lib/chatbotContext'
import { buildSiteKnowledge } from '@/lib/siteKnowledge'
import { getClientIp, hitRateLimit } from '@/lib/rateLimit'
import { CHAT_SESSION_COOKIE, validateChatSession } from '@/lib/chatSession'
import {
    buildSystemPrompt,
    HANDOFF_TOKEN,
    HANDOFF_MESSAGE,
    ERROR_MESSAGE,
} from '@/lib/chatbotPersonality'

/* =========================================================
   CONFIG
   ========================================================= */

const MINUTE = 60 * 1000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

const CONFIG = {
    // Per visitor (IP)
    PER_IP_PER_MIN: 4,
    PER_IP_PER_HOUR: 20,
    // Per chat session (one browser)
    PER_SESSION_PER_DAY: 40,
    // Whole site (protects Gemini ~1,500/day + Groq ~1,000/day free quotas)
    GLOBAL_PER_MIN: 20,
    GLOBAL_PER_DAY: 800,
    // Input
    MAX_MESSAGE_CHARS: 500,
    MAX_HISTORY: 10,
    // Gemini 3.x "thinks" before answering and those thinking tokens count against
    // this limit — 250 was too small (the model ran out before writing any text).
    // Reply length is controlled by the prompt ("2–4 sentences"), not by this cap.
    MAX_OUTPUT_TOKENS: 1024,
    // Groq's free tier has a small tokens-per-minute cap, so it gets a smaller context
    GROQ_CONTEXT_CHARS: 4500,
    PROVIDER_TIMEOUT_MS: 20000,
    // Fixed allowed origins (production + local dev)
    ALLOWED_ORIGINS: [
        'https://adestrasolutions.com',
        'https://www.adestrasolutions.com',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
    ],
}

// Gemini models tried in order (first one that answers wins).
// Override with GEMINI_MODEL in your env vars if you want a specific one first.
const GEMINI_MODELS = [
    process.env.GEMINI_MODEL,
    'gemini-3.5-flash-lite',
    'gemini-2.5-flash-lite',
    'gemini-flash-lite-latest',
].filter((m, i, arr) => m && arr.indexOf(m) === i)

// Groq models tried in order. The 8B model has much higher free limits — used if 70B is busy.
const GROQ_MODELS = [
    process.env.GROQ_MODEL,
    'llama-3.3-70b-versatile',
    'llama-3.1-8b-instant',
].filter((m, i, arr) => m && arr.indexOf(m) === i)

// Friendly, Ade-voiced rate-limit message
const LIMITED_MESSAGE = `Whoa there — you're faster than my servers. 😅

Give me a minute to catch my breath, then try again. Or if it's urgent, skip the queue:

👉 [Chat with our team on WhatsApp](https://wa.me/8801685655696)`

/* =========================================================
   LAYER 1 — ORIGIN
   Only our own domains. On Vercel we also allow THIS project's own
   deployment URLs (from Vercel's system env vars) — not every *.vercel.app.
   ========================================================= */

function allowedOrigins() {
    const list = [...CONFIG.ALLOWED_ORIGINS]
    for (const host of [
        process.env.VERCEL_URL,
        process.env.VERCEL_BRANCH_URL,
        process.env.VERCEL_PROJECT_PRODUCTION_URL,
    ]) {
        if (host) list.push(`https://${host}`)
    }
    // Extra domains (comma separated), e.g. your *.workers.dev / preview URL:
    // CHAT_ALLOWED_ORIGINS=https://adestra.yourname.workers.dev
    for (const o of (process.env.CHAT_ALLOWED_ORIGINS || '').split(',')) {
        if (o.trim()) list.push(o.trim().replace(/\/$/, ''))
    }
    return list
}

function originAllowed(req) {
    const origin = req.headers.get('origin') || ''
    const referer = req.headers.get('referer') || ''
    const check = origin || referer
    if (!check) return false
    let from
    try {
        from = new URL(check)
    } catch {
        return false
    }
    if (allowedOrigins().includes(from.origin)) return true

    // Same-site request: the page and this API are on the same host
    // (covers Cloudflare Workers / preview domains without listing each one).
    const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || ''
    return Boolean(host) && from.host === host
}

/* =========================================================
   PROVIDER CALLS
   ========================================================= */

class ProviderError extends Error {
    constructor(provider, status, message) {
        super(`${provider} ${status}: ${message}`)
        this.provider = provider
        this.status = status
    }
}

async function fetchWithTimeout(url, options) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), CONFIG.PROVIDER_TIMEOUT_MS)
    try {
        return await fetch(url, { ...options, signal: controller.signal })
    } finally {
        clearTimeout(timer)
    }
}

async function geminiRequest(model, systemPrompt, contents, withThinkingConfig) {
    const key = process.env.GEMINI_API_KEY
    const url =
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=` +
        encodeURIComponent(key)

    const generationConfig = { maxOutputTokens: CONFIG.MAX_OUTPUT_TOKENS }
    // Keep thinking to a minimum — a chat reply doesn't need it, and it eats output tokens.
    if (withThinkingConfig) {
        generationConfig.thinkingConfig = model.startsWith('gemini-2')
            ? { thinkingBudget: 0 }
            : { thinkingLevel: 'minimal' }
    }

    return fetchWithTimeout(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents,
            generationConfig,
        }),
    })
}

async function callGeminiModel(model, systemPrompt, messages) {
    const contents = messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
    }))

    let res = await geminiRequest(model, systemPrompt, contents, true)

    // Some models reject the thinking setting — retry once without it
    if (res.status === 400) {
        const text = await res.text().catch(() => '')
        if (/thinking/i.test(text)) {
            res = await geminiRequest(model, systemPrompt, contents, false)
        } else {
            throw new ProviderError('gemini', 400, text.slice(0, 200))
        }
    }

    if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new ProviderError('gemini', res.status, text.slice(0, 200))
    }

    const data = await res.json()
    const candidate = data?.candidates?.[0]
    const text = (candidate?.content?.parts || [])
        .filter((p) => p.text && !p.thought) // skip thought summaries if any
        .map((p) => p.text)
        .join('')
        .trim()

    if (!text) {
        const why = data?.promptFeedback?.blockReason || candidate?.finishReason || 'no text'
        throw new ProviderError('gemini', 'empty', why)
    }
    return text
}

async function callGemini(systemPrompt, messages) {
    if (!process.env.GEMINI_API_KEY) throw new ProviderError('gemini', 'nokey', 'GEMINI_API_KEY missing')
    let lastErr
    for (const model of GEMINI_MODELS) {
        try {
            return await callGeminiModel(model, systemPrompt, messages)
        } catch (err) {
            lastErr = err
            console.warn(`[chat] Gemini (${model}) failed:`, err.message)
            // Only try the next model if this one doesn't exist / is unavailable.
            // A bad key (400/401/403) or exhausted quota (429) fails the same way on every model.
            if (![404, 500, 503, 'empty'].includes(err.status) && err.name !== 'AbortError') break
        }
    }
    throw lastErr
}

async function callGroq(systemPrompt, messages) {
    const key = process.env.GROQ_API_KEY
    if (!key) throw new ProviderError('groq', 'nokey', 'GROQ_API_KEY missing')

    const chat = [
        { role: 'system', content: systemPrompt },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
    ]

    let lastErr
    for (const model of GROQ_MODELS) {
        try {
            const res = await fetchWithTimeout('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${key}`,
                },
                body: JSON.stringify({
                    model,
                    messages: chat,
                    temperature: 0.9,
                    max_tokens: 400,
                }),
            })

            if (!res.ok) {
                const text = await res.text().catch(() => '')
                throw new ProviderError('groq', res.status, text.slice(0, 200))
            }

            const data = await res.json()
            const text = (data?.choices?.[0]?.message?.content || '').trim()
            if (!text) throw new ProviderError('groq', 'empty', 'no text')
            return text
        } catch (err) {
            lastErr = err
            console.warn(`[chat] Groq (${model}) failed:`, err.message)
            // 413 = prompt too big, 429 = rate limit, 404 = model retired → try the smaller model
            if (![404, 413, 429, 500, 503, 'empty'].includes(err.status) && err.name !== 'AbortError') break
        }
    }
    throw lastErr
}

/* =========================================================
   HELPERS
   ========================================================= */

function limited() {
    return NextResponse.json({ reply: LIMITED_MESSAGE, source: 'limited' }, { status: 429 })
}

function failed(status = 500, reason = 'unknown') {
    return NextResponse.json({ reply: ERROR_MESSAGE, source: 'error', reason }, { status })
}

const errCode = (err) => {
    if (err?.name === 'AbortError') return 'timeout'
    return String(err?.status ?? 'fail')
}

/* =========================================================
   ROUTE HANDLER
   ========================================================= */

export async function POST(req) {
    try {
        /* ---- Layer 1: origin ---- */
        if (!originAllowed(req)) {
            console.warn('[chat][l1] blocked origin:', req.headers.get('origin') || req.headers.get('referer'))
            return failed(403, 'origin')
        }

        /* ---- Layer 2: signed, unexpired session cookie ---- */
        const store = await cookies()
        const session = validateChatSession(store.get(CHAT_SESSION_COOKIE)?.value)
        if (!session.ok) {
            // The widget will fetch a fresh session and retry once
            return NextResponse.json(
                { reply: ERROR_MESSAGE, source: 'session', reason: 'session' },
                { status: 401 }
            )
        }

        /* ---- Layer 3: input hardening ---- */
        const body = await req.json().catch(() => ({}))
        const rawMessages = Array.isArray(body?.messages) ? body.messages : []

        const messages = rawMessages
            .filter(
                (m) =>
                    m &&
                    (m.role === 'user' || m.role === 'assistant') &&
                    typeof m.content === 'string' &&
                    m.content.trim().length > 0
            )
            .slice(-CONFIG.MAX_HISTORY)
            .map((m) => ({
                role: m.role,
                content: m.content.slice(0, CONFIG.MAX_MESSAGE_CHARS),
            }))

        if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
            return failed(400, 'bad-input')
        }

        /* ---- Layers 4 & 5: limits (MongoDB) ---- */
        try {
            const ip = await getClientIp()

            // Visitor + session limits first, so one abuser can't eat the global budget
            const personal = await Promise.all([
                hitRateLimit({ name: 'chat-ip-min', identifier: ip, limit: CONFIG.PER_IP_PER_MIN, windowMs: MINUTE }),
                hitRateLimit({ name: 'chat-ip-hour', identifier: ip, limit: CONFIG.PER_IP_PER_HOUR, windowMs: HOUR }),
                hitRateLimit({ name: 'chat-session-day', identifier: session.id, limit: CONFIG.PER_SESSION_PER_DAY, windowMs: DAY }),
            ])
            if (personal.some((r) => !r.allowed)) {
                console.warn('[chat] visitor/session limit hit')
                return limited()
            }

            const global = await Promise.all([
                hitRateLimit({ name: 'chat-global-min', identifier: 'all', limit: CONFIG.GLOBAL_PER_MIN, windowMs: MINUTE }),
                hitRateLimit({ name: 'chat-global-day', identifier: 'all', limit: CONFIG.GLOBAL_PER_DAY, windowMs: DAY }),
            ])
            if (global.some((r) => !r.allowed)) {
                console.warn('[chat] global cap hit')
                return limited()
            }
        } catch (err) {
            console.error('[chat] rate limiter unavailable:', err)
            return failed(503, 'ratelimit-db')
        }

        /* ---- Build context + call providers ---- */
        // Last few user turns decide which items get full details
        // (so follow-ups like "tell me more about that one" still match)
        const query = messages
            .filter((m) => m.role === 'user')
            .slice(-3)
            .map((m) => m.content)
            .join(' ')
        let reply = ''
        let source = 'gemini'
        let geminiErr = null

        try {
            const contextBlock = STATIC_CONTEXT + (await buildSiteKnowledge(query))
            reply = await callGemini(buildSystemPrompt(contextBlock), messages)
        } catch (err) {
            geminiErr = err
            try {
                // Smaller context for Groq so it fits its free tokens-per-minute limit
                const smallBlock =
                    STATIC_CONTEXT + (await buildSiteKnowledge(query, { maxChars: CONFIG.GROQ_CONTEXT_CHARS }))
                reply = await callGroq(buildSystemPrompt(smallBlock), messages)
                source = 'groq'
            } catch (err2) {
                const reason = `providers (gemini:${errCode(geminiErr)}, groq:${errCode(err2)})`
                console.error('[chat] all providers failed:', geminiErr?.message, '|', err2?.message)
                return failed(502, reason)
            }
        }

        /* ---- Deterministic WhatsApp handoff ---- */
        if (reply.includes(HANDOFF_TOKEN)) {
            return NextResponse.json({ reply: HANDOFF_MESSAGE, source: 'handoff' })
        }

        return NextResponse.json({ reply, source })
    } catch (err) {
        console.error('[chat] unexpected error:', err)
        return failed(500, 'server')
    }
}