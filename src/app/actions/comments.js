// app/actions/comments.js
'use server'

import mongoose from 'mongoose'
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/mongoose'
import { getClientIp, hitRateLimit } from '@/lib/rateLimit'
import { verifyFormToken } from '@/lib/formToken'
import Comment from '@/models/Comment'
import Post from '@/models/Post'

const MAX_NAME = 80
const MAX_EMAIL = 120
const MAX_CONTENT = 2000
const MAX_LINKS = 2
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LINK_RE_GLOBAL = /(https?:\/\/|www\.)/gi // for counting links
const LINK_RE = /(https?:\/\/|www\.)/i // for yes/no checks

// Spam limits (per visitor IP)
const COMMENT_LIMIT = 5 // comments…
const COMMENT_WINDOW_MS = 60 * 60 * 1000 // …per hour

// 1. Add a comment (public)
export async function addComment(formData) {
  const postId = String(formData.get('postId') || '')
  const postSlug = String(formData.get('postSlug') || '')
  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const content = String(formData.get('content') || '').trim()
  const honeypot = String(formData.get('website') || '')
  const formToken = String(formData.get('formToken') || '')

  // --- Spam trap 1: hidden "website" field. Humans never see it; bots fill it.
  // Pretend it worked so the bot doesn't learn anything, but save nothing.
  if (honeypot) {
    return { success: true }
  }

  // --- Spam trap 2: signed form-load time (rejects instant or page-less submissions)
  const token = verifyFormToken(formToken, { minAgeMs: 3000 })
  if (!token.ok) {
    if (token.reason === 'too_fast') {
      return { error: 'That was quick! Please wait a few seconds and try again.' }
    }
    return { error: 'This page has expired. Please refresh and try again.' }
  }

  // --- Field validation
  if (!postId || !name || !email || !content) {
    return { error: 'All fields are required.' }
  }
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return { error: 'Invalid post.' }
  }
  if (!EMAIL_RE.test(email) || email.length > MAX_EMAIL) {
    return { error: 'Please enter a valid email address.' }
  }
  if (name.length > MAX_NAME) {
    return { error: `Name must be under ${MAX_NAME} characters.` }
  }
  if (content.length > MAX_CONTENT) {
    return { error: `Comment must be under ${MAX_CONTENT} characters.` }
  }
  if ((content.match(LINK_RE_GLOBAL) || []).length > MAX_LINKS || LINK_RE.test(name)) {
    return { error: `Please include at most ${MAX_LINKS} links, and no links in your name.` }
  }

  try {
    // --- Spam trap 3: per-visitor rate limit (shared across all server instances)
    const limit = await hitRateLimit({
      name: 'comment',
      identifier: await getClientIp(),
      limit: COMMENT_LIMIT,
      windowMs: COMMENT_WINDOW_MS,
    })
    if (!limit.allowed) {
      return {
        error: `You've posted a lot of comments. Please try again in ${limit.retryInMinutes} minute${limit.retryInMinutes === 1 ? '' : 's'}.`,
      }
    }

    await connectToDatabase()

    // The post must really exist
    const postExists = await Post.exists({ _id: postId })
    if (!postExists) {
      return { error: 'This post no longer exists.' }
    }

    await Comment.create({
      post: postId,
      name,
      email,
      content,
    })

    if (postSlug) revalidatePath(`/blog/${postSlug}`)
    return { success: true }
  } catch (error) {
    console.error('Error adding comment:', error)
    return { error: 'Failed to submit comment. Please try again.' }
  }
}

// 2. Fetch comments for a post (public)
// Only safe fields are returned — commenters' emails are NEVER sent to the browser.
export async function getCommentsForPost(postId) {
  try {
    await connectToDatabase()
    const comments = await Comment.find({ post: postId })
      .select('_id name content createdAt')
      .sort({ createdAt: -1 })
      .lean()

    return JSON.parse(JSON.stringify(comments))
  } catch (error) {
    console.error('Error fetching comments:', error)
    return []
  }
}