'use server'

import { revalidatePath } from 'next/cache'
import connectToDatabase from '@/lib/mongoose'
import Portfolio from '@/models/Portfolio'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function uploadToCloudinary(file, folder = 'portfolio') {
  if (!file || typeof file === 'string' || file.size === 0) return null

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'auto' },
      (error, result) => {
        if (error) reject(error)
        else resolve(result.secure_url)
      }
    )
    uploadStream.end(buffer)
  })
}

export async function getPortfolioItems() {
  try {
    await connectToDatabase()
    const items = await Portfolio.find().sort({ createdAt: -1 }).lean()
    return JSON.parse(JSON.stringify(items))
  } catch (error) {
    console.error('Error fetching portfolio items:', error)
    return []
  }
}

export async function getPortfolioItemBySlug(slug) {
  try {
    await connectToDatabase()
    const item = await Portfolio.findOne({ slug: slug.toLowerCase().trim() }).lean()
    if (!item) return null
    return JSON.parse(JSON.stringify(item))
  } catch (error) {
    console.error('Error fetching portfolio item by slug:', error)
    return null
  }
}

// Export alias for backward compatibility
export { getPortfolioItemBySlug as getPortfolioBySlug }

export async function savePortfolioItem(formData) {
  try {
    await connectToDatabase()

    const id = formData.get('id')
    const title = formData.get('title')?.trim()
    const client = formData.get('client')?.trim()
    const industry = formData.get('industry')?.trim()
    const projectType = formData.get('projectType')?.trim()
    const duration = formData.get('duration')?.trim()
    const background = formData.get('background')?.trim()
    const featured = formData.get('featured') === 'true'

    const category = (formData.get('category') || 'websites').toLowerCase().trim()
    const websiteUrl = formData.get('websiteUrl')?.trim() || ''

    let slug = formData.get('slug')?.trim()
    if (!slug && title) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
    }

    const objectivesText = formData.get('objectivesText') || ''
    const objectives = objectivesText
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)

    const resultsText = formData.get('resultsText') || ''
    const results = resultsText
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)

    const processJSON = formData.get('processJSON')
    let process = []
    if (processJSON) {
      try {
        process = JSON.parse(processJSON)
      } catch (err) {
        console.error('Failed to parse process JSON:', err)
      }
    }

    let coverImage = formData.get('existingCoverImage') || ''
    const coverImageFile = formData.get('coverImageFile')
    if (coverImageFile && coverImageFile.size > 0) {
      const uploadedCover = await uploadToCloudinary(coverImageFile, 'portfolio/covers')
      if (uploadedCover) {
        coverImage = uploadedCover
      }
    }

    const existingGalleryJSON = formData.get('existingGalleryJSON')
    let galleryImages = []
    if (existingGalleryJSON) {
      try {
        galleryImages = JSON.parse(existingGalleryJSON)
      } catch (err) {
        console.error('Failed to parse existing gallery JSON:', err)
      }
    }

    const galleryImageFiles = formData.getAll('galleryImageFiles')
    if (galleryImageFiles && galleryImageFiles.length > 0) {
      for (const file of galleryImageFiles) {
        if (file && file.size > 0) {
          const uploadedGalleryImg = await uploadToCloudinary(file, 'portfolio/gallery')
          if (uploadedGalleryImg) {
            galleryImages.push(uploadedGalleryImg)
          }
        }
      }
    }

    if (!title || !slug || !coverImage || !client || !industry || !projectType || !duration || !background) {
      return { success: false, error: 'Please fill in all required fields.' }
    }

    const payload = {
      title,
      slug,
      category,
      websiteUrl,
      client,
      industry,
      projectType,
      duration,
      background,
      objectives,
      process,
      results,
      coverImage,
      galleryImages,
      featured,
    }

    if (id) {
      await Portfolio.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    } else {
      await Portfolio.create(payload)
    }

    revalidatePath('/portfolio')
    revalidatePath(`/portfolio/${slug}`)
    revalidatePath('/admin')

    return { success: true }
  } catch (error) {
    console.error('Error saving portfolio item:', error)
    return { success: false, error: error.message || 'Failed to save portfolio item.' }
  }
}

export async function deletePortfolioItem(id) {
  try {
    await connectToDatabase()
    const item = await Portfolio.findByIdAndDelete(id)

    if (item) {
      revalidatePath('/portfolio')
      revalidatePath(`/portfolio/${item.slug}`)
      revalidatePath('/admin')
    }

    return { success: true }
  } catch (error) {
    console.error('Error deleting portfolio item:', error)
    return { success: false, error: error.message || 'Failed to delete portfolio item.' }
  }
}