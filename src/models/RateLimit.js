// models/RateLimit.js
// Generic counter used for rate limits (admin login, comments, …).
// `key` is a SHA-256 hash of "<limit name>:<visitor IP>" — real IPs are never stored.
// Documents delete themselves automatically after `expiresAt` (MongoDB TTL index).
import mongoose from 'mongoose'

const RateLimitSchema = new mongoose.Schema(
    {
        key: { type: String, required: true, unique: true },
        count: { type: Number, default: 0 },
        windowStart: { type: Date, required: true },
        expiresAt: { type: Date, required: true },
    },
    { timestamps: false }
)

// TTL index: MongoDB removes the document once expiresAt has passed
RateLimitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

export default mongoose.models.RateLimit || mongoose.model('RateLimit', RateLimitSchema)