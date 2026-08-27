'use server'

import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/mongoose'
import Comment from '@/models/Comment'

// 1. Action to add a comment
export async function addComment(formData) {
  const postId = formData.get('postId')
  const postSlug = formData.get('postSlug')
  const name = formData.get('name')
  const email = formData.get('email')
  const content = formData.get('content')

  if (!postId || !name || !email || !content) {
    return { error: 'All fields are required.' }
  }

  try {
    await connectToDatabase()

    await Comment.create({
      post: postId,
      author: name, // Passes author for schema validation
      name,
      email,
      content,
    })

    revalidatePath(`/blog/${postSlug}`)
    return { success: true }
  } catch (error) {
    console.error('Error adding comment:', error)
    return { error: 'Failed to submit comment. Please try again.' }
  }
}

// 2. Action/function to fetch comments for a post
export async function getCommentsForPost(postId) {
  try {
    await connectToDatabase()
    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: -1 })
      .lean()

    return JSON.parse(JSON.stringify(comments))
  } catch (error) {
    console.error('Error fetching comments:', error)
    return []
  }
}