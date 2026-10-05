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
    MAX_OUTPUT_TOKENS: 250,
    // Fixed allowed origins (production + local dev)
    ALLOWED_ORIGINS: [
        'https://adestrasolutions.com',
        'https://www.adestrasolutions.com',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
    ],
}

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
    return list
}

function originAllowed(req) {
    const origin = req.headers.get('origin') || ''
    const referer = req.headers.get('referer') || ''
    const check = origin || referer
    if (!check) return false
    try {
        return allowedOrigins().includes(new URL(check).origin)
    } catch {
        return false
    }
}

/* =========================================================
   PROVIDER CALLS
   ========================================================= */

async function callGemini(systemPrompt, messages) {
    const key = process.env.GEMINI_API_KEY
    if (!key) throw new Error('GEMINI_API_KEY missing')

    const contents = messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
    }))

    const url =
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=' +
        encodeURIComponent(key)

    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents,
            generationConfig: {
                temperature: 0.9,
                maxOutputTokens: CONFIG.MAX_OUTPUT_TOKENS,
            },
        }),
    })

    if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(`Gemini ${res.status}: ${text.slice(0, 200)}`)
    }

    const data = await res.json()
    const text =
        data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || ''
    if (!text) throw new Error('Gemini returned empty response')
    return text.trim()
}

async function callGroq(systemPrompt, messages) {
    const key = process.env.GROQ_API_KEY
    if (!key) throw new Error('GROQ_API_KEY missing')

    const chat = [
        { role: 'system', content: systemPrompt },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
    ]

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: chat,
            temperature: 0.9,
            max_tokens: CONFIG.MAX_OUTPUT_TOKENS,
        }),
    })

    if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(`Groq ${res.status}: ${text.slice(0, 200)}`)
    }

    const data = await res.json()
    const text = data?.choices?.[0]?.message?.content || ''
    if (!text) throw new Error('Groq returned empty response')
    return text.trim()
}

/* =========================================================
   HELPERS
   ========================================================= */

function limited() {
    return NextResponse.json({ reply: LIMITED_MESSAGE, source: 'limited' }, { status: 429 })
}

function failed(status = 500) {
    return NextResponse.json({ reply: ERROR_MESSAGE, source: 'error' }, { status })
}

/* =========================================================
   ROUTE HANDLER
   ========================================================= */

export async function POST(req) {
    try {
        /* ---- Layer 1: origin ---- */
        if (!originAllowed(req)) {
            console.warn('[chat][l1] blocked: bad origin/referer')
            return failed(403)
        }

        /* ---- Layer 2: signed, unexpired session cookie ---- */
        const store = await cookies()
        const session = validateChatSession(store.get(CHAT_SESSION_COOKIE)?.value)
        if (!session.ok) {
            // The widget will fetch a fresh session and retry once
            return NextResponse.json({ reply: ERROR_MESSAGE, source: 'session' }, { status: 401 })
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
            return failed(400)
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
            return failed(503)
        }

        /* ---- Build context + call providers ---- */
        // Last few user turns decide which items get full details
        // (so follow-ups like "tell me more about that one" still match)
        const query = messages
            .filter((m) => m.role === 'user')
            .slice(-3)
            .map((m) => m.content)
            .join(' ')
        const contextBlock = STATIC_CONTEXT + (await buildSiteKnowledge(query))
        const systemPrompt = buildSystemPrompt(contextBlock)

        let reply = ''
        let source = 'gemini'

        try {
            reply = await callGemini(systemPrompt, messages)
        } catch (err) {
            console.warn('[chat] Gemini failed, falling back to Groq:', err.message)
            try {
                reply = await callGroq(systemPrompt, messages)
                source = 'groq'
            } catch (err2) {
                console.error('[chat] Groq also failed:', err2.message)
                return NextResponse.json({ reply: ERROR_MESSAGE, source: 'error' })
            }
        }

        /* ---- Deterministic WhatsApp handoff ---- */
        if (reply.includes(HANDOFF_TOKEN)) {
            return NextResponse.json({ reply: HANDOFF_MESSAGE, source: 'handoff' })
        }

        return NextResponse.json({ reply, source })
    } catch (err) {
        console.error('[chat] unexpected error:', err)
        return failed(500)
    }
}