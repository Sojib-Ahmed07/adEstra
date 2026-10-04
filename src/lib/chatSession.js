// lib/chatSession.js
// Signed chat session cookie for the Ade chatbot. Server-only.
// Cookie value: "<id>.<expiresAt>.<signature>"
import crypto from 'crypto'

export const CHAT_SESSION_COOKIE = 'adestra_chat_sid'
export const CHAT_SESSION_SECONDS = 60 * 60 * 24 // 24 hours

function getSecret() {
    const secret = process.env.CHAT_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET
    if (secret) return secret
    // Only allow a built-in secret during local development.
    // In production a missing secret means NO session is ever valid (chat stays off)
    // instead of silently using a guessable key.
    if (process.env.NODE_ENV !== 'production') return 'adestra-local-dev-only-secret'
    return null
}

function sign(payload, secret) {
    return crypto.createHmac('sha256', `chat-session:${secret}`).update(payload).digest('hex')
}

/** Returns a new cookie value, or null if the server has no secret configured. */
export function createChatSession() {
    const secret = getSecret()
    if (!secret) return null
    const id = crypto.randomBytes(16).toString('hex')
    const expiresAt = Date.now() + CHAT_SESSION_SECONDS * 1000
    const payload = `${id}.${expiresAt}`
    return `${payload}.${sign(payload, secret)}`
}

/** Returns { ok: true, id } for a valid, unexpired cookie, otherwise { ok: false }. */
export function validateChatSession(raw) {
    const secret = getSecret()
    if (!secret || typeof raw !== 'string') return { ok: false }

    const parts = raw.split('.')
    if (parts.length !== 3) return { ok: false }
    const [id, expiresAt, signature] = parts
    if (!id || !expiresAt || !signature) return { ok: false }

    const expected = sign(`${id}.${expiresAt}`, secret)
    const a = Buffer.from(signature)
    const b = Buffer.from(expected)
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return { ok: false }
    if (!(Number(expiresAt) > Date.now())) return { ok: false }

    return { ok: true, id }
}