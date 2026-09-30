// app/actions/services.js
'use server'

import { revalidatePath } from 'next/cache'
import connectToDatabase from '@/lib/mongoose'
import Service from '@/models/Service'
import { isAdminAuthenticated } from '@/app/actions/admin'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary (matches portfolio.js pattern — 3rd place it lives, but keeps this file self-contained)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function uploadToCloudinary(file, folder = 'services') {
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

function slugify(input) {
    return (input || '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
}

/* =========================================================
   PUBLIC READS
   ========================================================= */

// All published services (used by Navbar + /services index + admin list fallback)
export async function getPublishedServices() {
    try {
        await connectToDatabase()
        const services = await Service.find({ published: true })
            .sort({ order: 1, createdAt: -1 })
            .lean()
        return JSON.parse(JSON.stringify(services))
    } catch (error) {
        console.error('Error fetching published services:', error)
        return []
    }
}

// All services regardless of published (admin use)
export async function getAllServices() {
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) return []

    try {
        await connectToDatabase()
        const services = await Service.find({})
            .sort({ order: 1, createdAt: -1 })
            .lean()
        return JSON.parse(JSON.stringify(services))
    } catch (error) {
        console.error('Error fetching services:', error)
        return []
    }
}

// Single service by slug — only published ones visible to public
export async function getServiceBySlug(slug) {
    if (!slug) return null
    try {
        await connectToDatabase()
        const service = await Service.findOne({
            slug: slug.toLowerCase().trim(),
            published: true,
        }).lean()
        if (!service) return null
        return JSON.parse(JSON.stringify(service))
    } catch (error) {
        console.error('Error fetching service by slug:', error)
        return null
    }
}

// Single service by id — admin use only (for edit modal)
export async function getServiceById(id) {
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) return null

    try {
        await connectToDatabase()
        const service = await Service.findById(id).lean()
        if (!service) return null
        return JSON.parse(JSON.stringify(service))
    } catch (error) {
        console.error('Error fetching service by id:', error)
        return null
    }
}

/* =========================================================
   MUTATIONS (auth protected)
   ========================================================= */

// Create OR Update (id present = update)
export async function saveService(formData) {
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) return { success: false, error: 'Unauthorized action.' }

    try {
        await connectToDatabase()

        const id = formData.get('id')
        const title = formData.get('title')?.trim() || ''
        let slug = formData.get('slug')?.trim() || ''
        const shortDescription = formData.get('shortDescription')?.trim() || ''
        const heroHeading = formData.get('heroHeading')?.trim() || ''
        const heroIntro = formData.get('heroIntro')?.trim() || ''
        const heroHighlight = formData.get('heroHighlight')?.trim() || ''
        const order = Number(formData.get('order')) || 0
        const published = formData.get('published') === 'true'

        // Auto slug from title if left empty
        if (!slug && title) slug = slugify(title)

        if (!title) return { success: false, error: 'Title is required.' }
        if (!slug) return { success: false, error: 'Slug is required (or fill Title to auto-generate).' }

        // Duplicate slug check (exclude self when editing)
        const existing = await Service.findOne({ slug })
        if (existing && existing._id.toString() !== (id || '')) {
            return { success: false, error: 'A service with this slug already exists.' }
        }

        // Hero badge icon — keep existing OR upload new
        let heroIconImage = formData.get('existingHeroIconImage') || ''
        const heroIconFile = formData.get('heroIconFile')
        if (heroIconFile && heroIconFile.size > 0) {
            const uploaded = await uploadToCloudinary(heroIconFile, 'services/icons')
            if (uploaded) heroIconImage = uploaded
        }

        // Big cover image — keep existing OR upload new
        let coverImage = formData.get('existingCoverImage') || ''
        const coverImageFile = formData.get('coverImageFile')
        if (coverImageFile && coverImageFile.size > 0) {
            const uploaded = await uploadToCloudinary(coverImageFile, 'services/covers')
            if (uploaded) coverImage = uploaded
        }

        // Offer cards (JSON string from client)
        let offerCards = []
        const offerCardsJSON = formData.get('offerCardsJSON')
        if (offerCardsJSON) {
            try {
                const parsed = JSON.parse(offerCardsJSON)
                offerCards = parsed
                    .filter((c) => c && (c.title || c.description || (c.points && c.points.length)))
                    .map((c) => ({
                        icon: c.icon || 'Sparkles',
                        title: c.title || '',
                        description: c.description || '',
                        points: Array.isArray(c.points) ? c.points.filter(Boolean) : [],
                        footer: c.footer || '',
                    }))
            } catch (err) {
                console.error('Failed to parse offerCards JSON:', err)
            }
        }

        // Why choose points (JSON string from client)
        let whyChoose = []
        const whyChooseJSON = formData.get('whyChooseJSON')
        if (whyChooseJSON) {
            try {
                const parsed = JSON.parse(whyChooseJSON)
                whyChoose = parsed
                    .filter((w) => w && (w.title || w.description))
                    .map((w) => ({
                        title: w.title || '',
                        description: w.description || '',
                    }))
            } catch (err) {
                console.error('Failed to parse whyChoose JSON:', err)
            }
        }

        const payload = {
            title,
            slug,
            shortDescription,
            heroHeading,
            heroIntro,
            heroHighlight,
            heroIconImage,
            coverImage,
            offerCards,
            whyChoose,
            order,
            published,
        }

        if (id) {
            await Service.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
        } else {
            await Service.create(payload)
        }

        revalidatePath('/', 'layout')
        revalidatePath('/services')
        revalidatePath(`/services/${slug}`)
        revalidatePath('/admin/services')

        return { success: true, slug }
    } catch (error) {
        console.error('Error saving service:', error)
        return { success: false, error: error.message || 'Failed to save service.' }
    }
}

export async function deleteService(id) {
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) return { success: false, error: 'Unauthorized action.' }

    try {
        await connectToDatabase()
        const service = await Service.findByIdAndDelete(id)

        if (service) {
            revalidatePath('/', 'layout')
            revalidatePath('/services')
            revalidatePath(`/services/${service.slug}`)
            revalidatePath('/admin/services')
        }

        return { success: true }
    } catch (error) {
        console.error('Error deleting service:', error)
        return { success: false, error: error.message || 'Failed to delete service.' }
    }
}