// app/actions/portfolio.js
'use server'

import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/mongoose'
import { isAdminAuthenticated } from '@/app/actions/admin'
import { uploadImage } from '@/lib/cloudinary'
import Portfolio from '@/models/Portfolio'

export async function getPortfolioItems() {
  try {
    await connectToDatabase()
    const items = await Portfolio.find({}).sort({ createdAt: -1 }).lean()
    return JSON.parse(JSON.stringify(items))
  } catch (error) {
    console.error('Error fetching portfolio items:', error)
    return []
  }
}

export async function getPortfolioBySlug(slug) {
  try {
    await connectToDatabase()
    const item = await Portfolio.findOne({ slug }).lean()
    return item ? JSON.parse(JSON.stringify(item)) : null
  } catch (error) {
    console.error('Error fetching case study:', error)
    return null
  }
}

export async function savePortfolioItem(formData) {
  const isAuth = await isAdminAuthenticated()
  if (!isAuth) return { error: 'Unauthorized action.' }

  try {
    await connectToDatabase()

    const id = formData.get('id')
    const title = formData.get('title')
    const client = formData.get('client')
    const industry = formData.get('industry')
    const projectType = formData.get('projectType')
    const duration = formData.get('duration')
    const background = formData.get('background')
    
    // Parse arrays from text inputs
    const objectives = formData.get('objectivesText')?.split('\n').filter(Boolean) || []
    const results = formData.get('resultsText')?.split('\n').filter(Boolean) || []
    const process = JSON.parse(formData.get('processJSON') || '[]')

    // Handle Cover Image Upload
    let coverImage = formData.get('existingCoverImage') || ''
    const coverFile = formData.get('coverImageFile')

    if (coverFile && coverFile.size > 0) {
      const buffer = Buffer.from(await coverFile.arrayBuffer())
      coverImage = await uploadImage(buffer, 'portfolio_covers')
    }

    if (!coverImage) {
      return { error: 'Cover image is required.' }
    }

    // Handle Gallery Images Uploads
    const galleryFiles = formData.getAll('galleryImageFiles')
    const existingGallery = JSON.parse(formData.get('existingGalleryJSON') || '[]')
    const newGalleryUrls = []

    for (const file of galleryFiles) {
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer())
        const uploadedUrl = await uploadImage(buffer, 'portfolio_gallery')
        newGalleryUrls.push(uploadedUrl)
      }
    }

    const galleryImages = [...existingGallery, ...newGalleryUrls]

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

    const payload = {
      title,
      slug,
      client,
      industry,
      projectType,
      duration,
      background,
      coverImage,
      objectives,
      process,
      galleryImages,
      results,
    }

    if (id) {
      await Portfolio.findByIdAndUpdate(id, payload)
    } else {
      await Portfolio.create(payload)
    }

    revalidatePath('/portfolio')
    revalidatePath(`/portfolio/${slug}`)
    revalidatePath('/admin/portfolio')
    return { success: true }
  } catch (error) {
    console.error('Error saving case study:', error)
    return { error: error.message || 'Failed to save case study.' }
  }
}

export async function deletePortfolioItem(id) {
  const isAuth = await isAdminAuthenticated()
  if (!isAuth) return { error: 'Unauthorized action.' }

  try {
    await connectToDatabase()
    await Portfolio.findByIdAndDelete(id)

    revalidatePath('/portfolio')
    revalidatePath('/admin/portfolio')
    return { success: true }
  } catch (error) {
    console.error('Error deleting portfolio item:', error)
    return { error: 'Failed to delete portfolio item.' }
  }
}