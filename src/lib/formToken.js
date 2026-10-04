// lib/formToken.js
// Signed "form loaded at" timestamp. Bots that post instantly, or post without ever
// loading the page, are rejected. Server-only (uses the secret).
import crypto from 'crypto'

function getSecret() {
    return process.env.ADMIN_SESSION_SECRET || process.env.CHAT_SESSION_SECRET || ''
}

function sign(value) {
    return crypto.createHmac('sha256', `form-token:${getSecret()}`).update(value).digest('hex')
}

/** Create a token when the page is rendered: "<timestamp>.<signature>" */
export function createFormToken() {
    const ts = String(Date.now())
    return `${ts}.${sign(ts)}`
}

/**
 * Check a token from a submitted form.
 * @returns {{ ok: true } | { ok: false, reason: 'invalid' | 'too_fast' | 'expired' }}
 */
export function verifyFormToken(token, { minAgeMs = 3000, maxAgeMs = 24 * 60 * 60 * 1000 } = {}) {
    if (!getSecret() || typeof token !== 'string') return { ok: false, reason: 'invalid' }

    const [ts, signature] = token.split('.')
    if (!ts || !signature) return { ok: false, reason: 'invalid' }

    const expected = sign(ts)
    const a = Buffer.from(signature)
    const b = Buffer.from(expected)
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return { ok: false, reason: 'invalid' }

    const age = Date.now() - Number(ts)
    if (!Number.isFinite(age) || age < 0) return { ok: false, reason: 'invalid' }
    if (age < minAgeMs) return { ok: false, reason: 'too_fast' }
    if (age > maxAgeMs) return { ok: false, reason: 'expired' }
    return { ok: true }
}