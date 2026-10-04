// app/actions/admin.js
'use server'

import crypto from 'crypto'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/mongoose'
import { sanitizeHtml } from '@/lib/sanitizeHtml'
import Post from '@/models/Post'
import Comment from '@/models/Comment'
import { getClientIp, hitRateLimit, clearRateLimit } from '@/lib/rateLimit'

/* =========================================================
   ADMIN SESSION (signed cookie)
   ---------------------------------------------------------
   Cookie value = "<expiresAt>.<random>.<signature>"
   The signature is an HMAC made with a server-only secret,
   so nobody can create a valid cookie without knowing it.
   The admin password is mixed into the key, so changing
   ADMIN_PASSWORD logs out every existing admin session.
   ========================================================= */

const COOKIE_NAME = 'admin_auth'
const SESSION_SECONDS = 60 * 60 * 24 // 1 day

function getSigningKey() {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.CHAT_SESSION_SECRET
  const password = process.env.ADMIN_PASSWORD
  if (!secret || !password) return null
  return `${secret}:${password}`
}

function sign(payload, key) {
  return crypto.createHmac('sha256', key).update(payload).digest('hex')
}

function safeEqual(a, b) {
  const bufA = Buffer.from(String(a))
  const bufB = Buffer.from(String(b))
  if (bufA.length !== bufB.length) return false
  return crypto.timingSafeEqual(bufA, bufB)
}

function createSessionToken(key) {
  const expiresAt = Date.now() + SESSION_SECONDS * 1000
  const nonce = crypto.randomBytes(16).toString('hex')
  const payload = `${expiresAt}.${nonce}`
  return `${payload}.${sign(payload, key)}`
}

function isValidSessionToken(token, key) {
  if (!token || !key) return false
  const parts = token.split('.')
  if (parts.length !== 3) return false
  const [expiresAt, nonce, signature] = parts
  const expected = sign(`${expiresAt}.${nonce}`, key)
  if (!safeEqual(signature, expected)) return false
  return Number(expiresAt) > Date.now()
}

// Compare passwords without leaking timing information
function passwordMatches(input, actual) {
  const a = crypto.createHash('sha256').update(String(input || '')).digest()
  const b = crypto.createHash('sha256').update(String(actual || '')).digest()
  return crypto.timingSafeEqual(a, b)
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/* =========================================================
   LOGIN ATTEMPT LIMIT
   ---------------------------------------------------------
   Max 5 attempts per visitor (IP) per 15 minutes, stored in
   MongoDB via lib/rateLimit.js. The attempt is counted BEFORE
   the password is checked, so parallel requests can't get
   extra guesses. A successful login clears the counter.
   ========================================================= */

const LOGIN_LIMIT = 5
const LOGIN_WINDOW_MS = 15 * 60 * 1000 // 15 minutes

/* =========================================================
   AUTH ACTIONS
   ========================================================= */

// Verify Admin Password & Set Session Cookie
export async function loginAdmin(password) {
  const key = getSigningKey()
  if (!key) {
    console.error('[admin] ADMIN_PASSWORD or ADMIN_SESSION_SECRET is not set.')
    return { error: 'Admin login is not configured on the server.' }
  }

  // Count this attempt first (fail closed if the database is unreachable)
  let attempt
  try {
    attempt = await hitRateLimit({
      name: 'admin-login',
      identifier: await getClientIp(),
      limit: LOGIN_LIMIT,
      windowMs: LOGIN_WINDOW_MS,
    })
  } catch (error) {
    console.error('[admin] login limiter unavailable:', error)
    return { error: 'Login is temporarily unavailable. Please try again shortly.' }
  }

  if (!attempt.allowed) {
    return {
      error: `Too many failed attempts. Try again in ${attempt.retryInMinutes} minute${attempt.retryInMinutes === 1 ? '' : 's'}.`,
    }
  }

  if (!passwordMatches(password, process.env.ADMIN_PASSWORD)) {
    await wait(800) // slows down password guessing
    return {
      error:
        attempt.remaining > 0
          ? `Incorrect password. ${attempt.remaining} attempt${attempt.remaining === 1 ? '' : 's'} left.`
          : 'Incorrect password. Login is now locked for 15 minutes.',
    }
  }

  // Correct password → reset the counter
  try {
    await clearRateLimit(attempt.key)
  } catch (error) {
    console.error('[admin] could not clear login attempts:', error)
  }

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, createSessionToken(key), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_SECONDS,
    path: '/',
  })
  return { success: true }
}

// Logout
export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
  revalidatePath('/admin')
  return { success: true }
}

// Check Auth Status
// Note: cookies() must NOT be wrapped in try/catch — Next.js uses the error it
// throws during build to know these admin pages must be rendered per request.
export async function isAdminAuthenticated() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  const key = getSigningKey()
  if (!key) return false
  return isValidSessionToken(token, key)
}

/* =========================================================
   BLOG ADMIN
   ========================================================= */

// Fetch Comments for Admin Modal (admin can see emails)
export async function getPostCommentsAdmin(postId) {
  const isAuth = await isAdminAuthenticated()
  if (!isAuth) return []

  try {
    await connectToDatabase()
    const comments = await Comment.find({ post: postId }).sort({ createdAt: -1 }).lean()
    return JSON.parse(JSON.stringify(comments))
  } catch (error) {
    console.error('Error fetching comments:', error)
    return []
  }
}

// Create or Update Post
export async function savePost(formData) {
  const isAuth = await isAdminAuthenticated()
  if (!isAuth) return { error: 'Unauthorized action.' }

  try {
    await connectToDatabase()

    const id = formData.get('id')
    const title = formData.get('title')?.trim()
    const slug = formData.get('slug')?.trim().toLowerCase()
    const category = formData.get('category')
    const excerpt = formData.get('excerpt')?.trim()
    const content = sanitizeHtml(formData.get('content') || '')
    const image = formData.get('image')?.trim() || null

    if (!title || !slug || !category || !excerpt || !content) {
      return { error: 'Title, slug, category, excerpt and content are required.' }
    }

    // Slug must be unique (ignore the post being edited)
    const existing = await Post.findOne({ slug }).select('_id').lean()
    if (existing && existing._id.toString() !== (id || '')) {
      return { error: 'Another post already uses this slug.' }
    }

    const postData = { title, slug, category, excerpt, content, image }

    let oldSlug = null
    if (id) {
      const old = await Post.findByIdAndUpdate(id, postData).select('slug').lean()
      oldSlug = old?.slug || null
    } else {
      await Post.create(postData)
    }

    revalidatePath('/blog')
    revalidatePath(`/blog/${slug}`)
    if (oldSlug && oldSlug !== slug) revalidatePath(`/blog/${oldSlug}`)
    revalidatePath('/blog/category/[slug]', 'page')
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Error saving post:', error)
    return { error: 'Failed to save post.' }
  }
}

// Delete Post AND associated comments
export async function deletePost(postId) {
  const isAuth = await isAdminAuthenticated()
  if (!isAuth) return { error: 'Unauthorized action.' }

  try {
    await connectToDatabase()
    await Comment.deleteMany({ post: postId })
    const deleted = await Post.findByIdAndDelete(postId).select('slug').lean()

    revalidatePath('/blog')
    if (deleted?.slug) revalidatePath(`/blog/${deleted.slug}`)
    revalidatePath('/blog/category/[slug]', 'page')
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Error deleting post:', error)
    return { error: 'Failed to delete post.' }
  }
}

// Delete Single Comment
export async function deleteComment(commentId, postSlug) {
  const isAuth = await isAdminAuthenticated()
  if (!isAuth) return { error: 'Unauthorized action.' }

  try {
    await connectToDatabase()
    await Comment.findByIdAndDelete(commentId)

    if (postSlug) revalidatePath(`/blog/${postSlug}`)
    return { success: true }
  } catch (error) {
    console.error('Error deleting comment:', error)
    return { error: 'Failed to delete comment.' }
  }
}