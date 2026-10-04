// app/api/chat/session/route.js
// Issues the signed chat session cookie. Rate-limited per visitor so bots
// can't mint unlimited sessions.
import { NextResponse } from 'next/server'
import { getClientIp, hitRateLimit } from '@/lib/rateLimit'
import {
    CHAT_SESSION_COOKIE,
    CHAT_SESSION_SECONDS,
    createChatSession,
} from '@/lib/chatSession'

const SESSIONS_PER_IP_PER_HOUR = 20

export async function GET() {
    try {
        const limit = await hitRateLimit({
            name: 'chat-session',
            identifier: await getClientIp(),
            limit: SESSIONS_PER_IP_PER_HOUR,
            windowMs: 60 * 60 * 1000,
        })
        if (!limit.allowed) {
            return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
        }
    } catch (err) {
        console.error('[chat-session] rate limiter unavailable:', err)
        return NextResponse.json({ ok: false, error: 'unavailable' }, { status: 503 })
    }

    const value = createChatSession()
    if (!value) {
        console.error('[chat-session] CHAT_SESSION_SECRET is not set — chat is disabled.')
        return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 })
    }

    const res = NextResponse.json({ ok: true })
    res.cookies.set(CHAT_SESSION_COOKIE, value, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: CHAT_SESSION_SECONDS,
    })
    return res
}