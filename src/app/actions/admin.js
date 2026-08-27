// app/actions/admin.js
'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/mongoose'
import Post from '@/models/Post'
import Comment from '@/models/Comment'

// Verify Admin Password & Set Session Cookie
export async function loginAdmin(password) {
  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies()
    cookieStore.set('admin_auth', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    })
    return { success: true }
  }
  return { error: 'Incorrect password.' }
}

// Logout
export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_auth')
  revalidatePath('/admin')
  return { success: true }
}

// Check Auth Status
export async function isAdminAuthenticated() {
  const cookieStore = await cookies()
  return cookieStore.get('admin_auth')?.value === 'authenticated'
}

// Fetch Comments for Admin Modal
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
    const title = formData.get('title')
    const slug = formData.get('slug')
    const category = formData.get('category')
    const excerpt = formData.get('excerpt')
    const content = formData.get('content')
    const image = formData.get('image')

    const postData = { title, slug, category, excerpt, content, image }

    if (id) {
      await Post.findByIdAndUpdate(id, postData)
    } else {
      await Post.create(postData)
    }

    revalidatePath('/blog')
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
    await Post.findByIdAndDelete(postId)

    revalidatePath('/blog')
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