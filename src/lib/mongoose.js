import mongoose from 'mongoose'
import dns from 'node:dns'

// Force Node.js to use standard public DNS for SRV lookups across all environments
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4'])
} catch (err) {
  // Fail silently if environment doesn't permit runtime DNS server overrides
}

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // Optimize timeouts so failed attempts don't hang serverless functions
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}