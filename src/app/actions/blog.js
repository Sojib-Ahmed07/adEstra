// app/actions/blog.js
'use server'

import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/mongoose'
import { sanitizeHtml } from '@/lib/sanitizeHtml'
import { isAdminAuthenticated } from '@/app/actions/admin'
import Post from '@/models/Post'
import Category from '@/models/Category'

/* ---------- helpers (not exported) ---------- */

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

// Escape special characters so user text is searched literally
function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

async function findOrCreateCategory(categoryName) {
  const name = String(categoryName || '').trim()
  const slug = slugify(name)
  if (!slug) throw new Error('Category name is required.')

  let category = await Category.findOne({ slug })
  if (!category) {
    category = await Category.create({ name, slug })
  }
  return category
}

// Returns a slug that no other post uses: "my-post", "my-post-2", "my-post-3"…
async function uniquePostSlug(baseSlug) {
  let slug = baseSlug
  let counter = 2
  while (await Post.exists({ slug })) {
    slug = `${baseSlug}-${counter}`
    counter++
  }
  return slug
}

/* ---------- 1. Fetch or Create Category (admin only) ---------- */
export async function getOrCreateCategory(categoryName) {
  const isAuth = await isAdminAuthenticated()
  if (!isAuth) throw new Error('Unauthorized action.')

  await connectToDatabase()
  const category = await findOrCreateCategory(categoryName)
  return JSON.parse(JSON.stringify(category))
}

/* ---------- 2. Fetch All Categories with Post Counts (public) ---------- */
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

/* ---------- 3. Create a New Post (admin only) ----------
   Returns { success: true, slug } or { success: false, error } */
export async function createPost(postData) {
  const isAuth = await isAdminAuthenticated()
  if (!isAuth) return { success: false, error: 'Unauthorized action.' }

  try {
    await connectToDatabase()

    const title = String(postData?.title || '').trim()
    const excerpt = String(postData?.excerpt || '').trim()
    const content = sanitizeHtml(String(postData?.content || ''))
    const categoryName = String(postData?.categoryName || '').trim()
    const imageUrl = String(postData?.imageUrl || '').trim()
    const tags = String(postData?.tags || '')

    if (!title || !excerpt || !content || !categoryName) {
      return { success: false, error: 'Title, category, excerpt and content are required.' }
    }

    const baseSlug = slugify(title)
    if (!baseSlug) {
      return { success: false, error: 'Title must contain letters or numbers.' }
    }

    const category = await findOrCreateCategory(categoryName)
    const slug = await uniquePostSlug(baseSlug)

    await Post.create({
      title,
      slug,
      excerpt,
      content,
      category: category._id,
      image: imageUrl || null,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    })

    revalidatePath('/blog')
    revalidatePath(`/blog/category/${category.slug}`)
    revalidatePath('/admin')

    return { success: true, slug }
  } catch (error) {
    console.error('Error creating post:', error)
    return { success: false, error: 'Failed to create post.' }
  }
}

/* ---------- 4. Search Posts across Title, Excerpt, and Content (public) ---------- */
export async function searchPosts(query) {
  await connectToDatabase()

  const text = String(query || '').trim().slice(0, 100)
  if (!text) return []

  const searchRegex = new RegExp(escapeRegex(text), 'i')

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