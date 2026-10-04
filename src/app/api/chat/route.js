// app/api/chat/route.js
// POST { messages: [{ role, content }, ...] }
// Returns { reply, source } where source ∈ 'gemini' | 'groq' | 'handoff' | 'error' | 'limited'
//
// Multi-layer protection:
//   1. Origin + Referer check  (blocks direct scripts / curl / Postman)
//   2. Signed session cookie   (blocks bots that never loaded the site)
//   3. Per-IP sliding window   (blocks casual + moderate abuse)
//   4. Global caps             (blocks distributed attacks / quota burn)
//   5. Input hardening         (message length, history size, whitespace)

import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { cookies } from 'next/headers'
import { buildChatbotContext } from '@/app/actions/chatbot'
import {
    buildSystemPrompt,
    HANDOFF_TOKEN,
    HANDOFF_MESSAGE,
    ERROR_MESSAGE,
} from '@/lib/chatbotPersonality'

/* =========================================================
   CONFIG
   ========================================================= */

const CONFIG = {
    // Layer 3 — per-IP
    PER_IP_PER_MIN: 4,
    PER_IP_PER_HOUR: 20,

    // Layer 4 — global (protects Gemini 1,500/day + Groq 1,000/day)
    GLOBAL_PER_MIN: 20,
    GLOBAL_PER_DAY: 800,

    // Layer 5 — input
    MAX_MESSAGE_CHARS: 500,
    MAX_HISTORY: 10,
    MAX_OUTPUT_TOKENS: 250,

    // Layer 1 — allowed origins (prod + dev)
    ALLOWED_ORIGINS: [
        'https://adestrasolutions.com',
        'https://www.adestrasolutions.com',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
    ],

    // Layer 2 — cookie name
    SESSION_COOKIE: 'adestra_chat_sid',
}

// Friendly, Ade-voiced rate-limit message
const LIMITED_MESSAGE = `Whoa there — you're faster than my servers. 😅

Give me a minute to catch my breath, then try again. Or if it's urgent, skip the queue:

👉 [Chat with our team on WhatsApp](https://wa.me/8801685655696)`

/* =========================================================
   IN-MEMORY STORES (per-worker-instance; fine for <50 users/day)
   ========================================================= */

const ipBuckets = new Map()   // ip -> { minute: number[], hour: number[] }
const globalBucket = { minute: [], day: [], dayStamp: '' }

function nowMs() {
    return Date.now()
}

function prune(arr, windowMs) {
    const cutoff = nowMs() - windowMs
    while (arr.length && arr[0] < cutoff) arr.shift()
    return arr
}

/* =========================================================
   LAYER 1 — ORIGIN / REFERER
   ========================================================= */

function originAllowed(req) {
    const origin = req.headers.get('origin') || ''
    const referer = req.headers.get('referer') || ''

    // Prefer Origin (set by browsers on cross-origin fetch). Fall back to Referer.
    const check = origin || referer
    if (!check) return false

    try {
        const url = new URL(check)

        // Exact matches (custom domains, localhost)
        if (CONFIG.ALLOWED_ORIGINS.includes(url.origin)) return true

        // Any Vercel deployment (preview or production)
        if (url.hostname.endsWith('.vercel.app')) return true

        return false
    } catch {
        return false
    }
}

/* =========================================================
   LAYER 2 — SIGNED SESSION COOKIE
   Uses HMAC so the token can't be forged without the secret.
   Falls back to a weak-but-functional secret in dev.
   ========================================================= */

function signSessionId(id) {
    const secret =
        process.env.CHAT_SESSION_SECRET ||
        process.env.ADMIN_PASSWORD || // reuse as fallback so it's non-empty
        'adestra-dev-fallback-secret'
    return crypto.createHmac('sha256', secret).update(id).digest('hex')
}

async function validateSessionCookie() {
    try {
        const store = await cookies()
        const raw = store.get(CONFIG.SESSION_COOKIE)?.value
        if (!raw) return false

        // Format: <id>.<signature>
        const dot = raw.lastIndexOf('.')
        if (dot <= 0) return false

        const id = raw.slice(0, dot)
        const sig = raw.slice(dot + 1)
        if (!id || !sig) return false

        const expected = signSessionId(id)

        // constant-time compare
        const a = Buffer.from(sig)
        const b = Buffer.from(expected)
        if (a.length !== b.length) return false
        return crypto.timingSafeEqual(a, b)
    } catch {
        return false
    }
}

/* =========================================================
   LAYER 3 — PER-IP SLIDING WINDOW
   ========================================================= */

function getClientIp(req) {
    // Cloudflare Workers sets cf-connecting-ip; standard proxies use x-forwarded-for
    const cf = req.headers.get('cf-connecting-ip')
    if (cf) return cf
    const xff = req.headers.get('x-forwarded-for')
    if (xff) return xff.split(',')[0].trim()
    const real = req.headers.get('x-real-ip')
    if (real) return real
    return 'unknown'
}

function checkPerIp(ip) {
    let bucket = ipBuckets.get(ip)
    if (!bucket) {
        bucket = { minute: [], hour: [] }
        ipBuckets.set(ip, bucket)
    }

    prune(bucket.minute, 60 * 1000)
    prune(bucket.hour, 60 * 60 * 1000)

    if (bucket.minute.length >= CONFIG.PER_IP_PER_MIN) return false
    if (bucket.hour.length >= CONFIG.PER_IP_PER_HOUR) return false

    const t = nowMs()
    bucket.minute.push(t)
    bucket.hour.push(t)
    return true
}

/* =========================================================
   LAYER 4 — GLOBAL SLIDING WINDOW + DAILY CAP
   ========================================================= */

function checkGlobal() {
    const t = nowMs()
    const dayStamp = new Date().toISOString().slice(0, 10) // YYYY-MM-DD UTC

    if (globalBucket.dayStamp !== dayStamp) {
        globalBucket.dayStamp = dayStamp
        globalBucket.day = []
    }

    prune(globalBucket.minute, 60 * 1000)
    prune(globalBucket.day, 24 * 60 * 60 * 1000)

    if (globalBucket.minute.length >= CONFIG.GLOBAL_PER_MIN) return false
    if (globalBucket.day.length >= CONFIG.GLOBAL_PER_DAY) return false

    globalBucket.minute.push(t)
    globalBucket.day.push(t)
    return true
}

/* =========================================================
   PROVIDER CALLS (unchanged behavior)
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
   ROUTE HANDLER
   ========================================================= */

export async function POST(req) {
    try {
        /* ---- Layer 1: origin / referer ---- */
        if (!originAllowed(req)) {
            console.warn('[chat][l1] blocked: bad origin/referer')
            return NextResponse.json(
                { reply: ERROR_MESSAGE, source: 'error' },
                { status: 403 }
            )
        }

        /* ---- Layer 2: signed session cookie ---- */
        const hasValidSession = await validateSessionCookie()
        if (!hasValidSession) {
            console.warn('[chat][l2] blocked: missing/invalid session cookie')
            return NextResponse.json(
                { reply: ERROR_MESSAGE, source: 'error' },
                { status: 403 }
            )
        }

        /* ---- Parse + Layer 5: input hardening ---- */
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

        if (messages.length === 0) {
            return NextResponse.json(
                { reply: ERROR_MESSAGE, source: 'error' },
                { status: 400 }
            )
        }

        /* ---- Layer 3: per-IP ---- */
        const ip = getClientIp(req)
        if (!checkPerIp(ip)) {
            console.warn(`[chat][l3] rate-limited IP ${ip}`)
            return NextResponse.json(
                { reply: LIMITED_MESSAGE, source: 'limited' },
                { status: 429 }
            )
        }

        /* ---- Layer 4: global ---- */
        if (!checkGlobal()) {
            console.warn('[chat][l4] global cap hit')
            return NextResponse.json(
                { reply: LIMITED_MESSAGE, source: 'limited' },
                { status: 429 }
            )
        }

        /* ---- Build context + call providers ---- */
        const contextBlock = await buildChatbotContext()
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
        return NextResponse.json(
            { reply: ERROR_MESSAGE, source: 'error' },
            { status: 500 }
        )
    }
}