// app/api/chat/session/route.js
import { NextResponse } from 'next/server'
import crypto from 'crypto'

const SESSION_COOKIE = 'adestra_chat_sid'
const MAX_AGE_SECONDS = 60 * 60 * 24

function getSecret() {
    return (
        process.env.CHAT_SESSION_SECRET ||
        process.env.ADMIN_PASSWORD ||
        'adestra-dev-fallback-secret'
    )
}

function signSessionId(id) {
    return crypto
        .createHmac('sha256', getSecret())
        .update(id)
        .digest('hex')
}

export async function GET() {
    const id = crypto.randomBytes(16).toString('hex')
    const sig = signSessionId(id)
    const value = `${id}.${sig}`

    const res = NextResponse.json({ ok: true })
    res.cookies.set(SESSION_COOKIE, value, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: MAX_AGE_SECONDS,
    })
    return res
}