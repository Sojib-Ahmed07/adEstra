// app/actions/blog.js
'use server'

import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/mongoose'
import Post from '@/models/Post'
import Category from '@/models/Category'
import Comment from '@/models/Comment'

// 1. Fetch or Create Category
export async function getOrCreateCategory(categoryName) {
  await connectToDatabase()

  const slug = categoryName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

  let category = await Category.findOne({ slug })

  if (!category) {
    category = await Category.create({ name: categoryName.trim(), slug })
  }

  return JSON.parse(JSON.stringify(category))
}

// 2. Fetch All Categories with Post Counts
export async function getCategoriesWithCounts() {
  await connectToDatabase()

  const categories = await Category.find().lean()

  const categoriesWithCounts = await Promise.all(
    categories.map(async (cat) => {
      const count = await Post.countDocuments({ category: cat._id })
      return {
        _id: cat._id.toString(),
        name: cat.name,
        slug: cat.slug,
        count,
      }
    })
  )

  return categoriesWithCounts
}

// 3. Create a New Post
export async function createPost(postData) {
  await connectToDatabase()

  const { title, excerpt, content, categoryName, imageUrl, tags } = postData

  // First ensure category exists or create it
  const category = await getOrCreateCategory(categoryName)

  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

  const newPost = await Post.create({
    title,
    slug,
    excerpt,
    content,
    category: category._id,
    image: imageUrl || null,
    tags: tags ? tags.split(',').map((t) => t.trim()) : [],
  })

  revalidatePath('/blog')
  revalidatePath(`/blog/category/${category.slug}`)

  return JSON.parse(JSON.stringify(newPost))
}

// 4. Submit a Comment for a Post
export async function addComment(postId, commentData) {
  await connectToDatabase()

  const comment = await Comment.create({
    post: postId,
    author: commentData.author,
    email: commentData.email,
    content: commentData.content,
  })

  revalidatePath(`/blog`)

  return JSON.parse(JSON.stringify(comment))
}

// 5. Search Posts across Title, Excerpt, and Content
export async function searchPosts(query) {
  await connectToDatabase()

  if (!query) return []

  const searchRegex = new RegExp(query, 'i')

  const posts = await Post.find({
    $or: [
      { title: searchRegex },
      { excerpt: searchRegex },
      { content: searchRegex },
    ],
  })
    .populate('category')
    .sort({ createdAt: -1 })
    .lean()

  return JSON.parse(JSON.stringify(posts))
}