// lib/rateLimit.js
// Shared rate limiter stored in MongoDB (works across all Vercel serverless instances).
// Server-only: import from server actions / route handlers, never from client components.
import crypto from 'crypto'
import { headers } from 'next/headers'
import { connectToDatabase } from '@/lib/mongoose'
import RateLimit from '@/models/RateLimit'

/**
 * Real visitor IP.
 * - On Vercel, `x-real-ip` / `x-forwarded-for` are set by Vercel itself and can't be faked.
 * - `cf-connecting-ip` is only trusted when NOT on Vercel (i.e. behind Cloudflare Workers),
 *   because on Vercel a visitor could send that header themselves to dodge the limit.
 */
export async function getClientIp() {
    const h = await headers()
    const forwarded = h.get('x-forwarded-for')?.split(',')[0]?.trim()

    if (process.env.VERCEL) {
        return h.get('x-real-ip') || forwarded || 'unknown'
    }
    return h.get('cf-connecting-ip') || h.get('x-real-ip') || forwarded || 'unknown'
}

function hashKey(name, identifier) {
    return crypto.createHash('sha256').update(`${name}:${identifier}`).digest('hex')
}

/**
 * Count one hit for (name, identifier) and say whether it's allowed.
 * The hit is counted atomically in one database update, so parallel requests
 * can't slip past the limit.
 *
 * @returns {{ allowed: boolean, remaining: number, retryInMinutes: number, key: string }}
 */
export async function hitRateLimit({ name, identifier, limit, windowMs }) {
    await connectToDatabase()

    const key = hashKey(name, identifier)
    const now = new Date()
    const windowCutoff = new Date(now.getTime() - windowMs)
    const windowExpired = {
        $or: [
            { $eq: [{ $ifNull: ['$windowStart', null] }, null] },
            { $lt: ['$windowStart', windowCutoff] },
        ],
    }

    // Native driver pipeline update: start a new window if the old one expired,
    // otherwise add 1 — in a single atomic operation.
    const doc = await RateLimit.collection.findOneAndUpdate(
        { key },
        [
            {
                $set: {
                    key,
                    count: { $cond: [windowExpired, 1, { $add: [{ $ifNull: ['$count', 0] }, 1] }] },
                    windowStart: { $cond: [windowExpired, now, '$windowStart'] },
                    expiresAt: new Date(now.getTime() + windowMs * 2),
                },
            },
        ],
        { upsert: true, returnDocument: 'after' }
    )

    const count = doc?.count ?? 1
    const windowStart = doc?.windowStart ? new Date(doc.windowStart) : now
    const unlockAt = windowStart.getTime() + windowMs

    return {
        allowed: count <= limit,
        remaining: Math.max(0, limit - count),
        retryInMinutes: Math.max(1, Math.ceil((unlockAt - now.getTime()) / 60000)),
        key,
    }
}

/** Reset a counter (e.g. after a successful login). */
export async function clearRateLimit(key) {
    if (!key) return
    await connectToDatabase()
    await RateLimit.collection.deleteOne({ key })
}