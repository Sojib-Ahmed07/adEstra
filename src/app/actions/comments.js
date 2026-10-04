// app/actions/comments.js
'use server'

import mongoose from 'mongoose'
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/mongoose'
import Comment from '@/models/Comment'

const MAX_NAME = 80
const MAX_EMAIL = 120
const MAX_CONTENT = 2000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// 1. Add a comment (public)
export async function addComment(formData) {
  const postId = String(formData.get('postId') || '')
  const postSlug = String(formData.get('postSlug') || '')
  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const content = String(formData.get('content') || '').trim()

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

  try {
    await connectToDatabase()

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