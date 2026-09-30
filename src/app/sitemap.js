// src/app/sitemap.js
import { connectToDatabase } from '@/lib/mongoose'
import Post from '@/models/Post'
import Category from '@/models/Category'
import Portfolio from '@/models/Portfolio'
import Service from '@/models/Service'

// Build the sitemap on each request so new posts/projects/services appear automatically
export const dynamic = 'force-dynamic'

const BASE = 'https://www.adestrasolutions.com'

// Fixed pages: [path, priority, changeFrequency]
const STATIC_PAGES = [
    ['', 1.0, 'weekly'],
    // Company
    ['/pages/about', 0.8, 'monthly'],
    ['/pricing', 0.8, 'monthly'],
    ['/portfolio', 0.8, 'weekly'],
    ['/services', 0.9, 'weekly'],
    ['/team', 0.7, 'monthly'],
    ['/blog', 0.8, 'weekly'],
    ['/contact', 0.7, 'yearly'],
]

export default async function sitemap() {
    const now = new Date()

    const staticEntries = STATIC_PAGES.map(([path, priority, changeFrequency]) => ({
        url: `${BASE}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
    }))

    // If the database is unreachable, still return the fixed pages
    try {
        await connectToDatabase()

        const [posts, categories, projects, services] = await Promise.all([
            Post.find({}, 'slug updatedAt').lean(),
            Category.find({}, 'slug updatedAt').lean(),
            Portfolio.find({}, 'slug updatedAt').lean(),
            Service.find({ published: true }, 'slug updatedAt').lean(),
        ])

        const postEntries = posts.map((p) => ({
            url: `${BASE}/blog/${p.slug}`,
            lastModified: p.updatedAt || now,
            changeFrequency: 'monthly',
            priority: 0.7,
        }))

        const categoryEntries = categories.map((c) => ({
            url: `${BASE}/blog/category/${c.slug}`,
            lastModified: c.updatedAt || now,
            changeFrequency: 'weekly',
            priority: 0.5,
        }))

        const projectEntries = projects.map((p) => ({
            url: `${BASE}/portfolio/${p.slug}`,
            lastModified: p.updatedAt || now,
            changeFrequency: 'monthly',
            priority: 0.7,
        }))

        const serviceEntries = services.map((s) => ({
            url: `${BASE}/services/${s.slug}`,
            lastModified: s.updatedAt || now,
            changeFrequency: 'monthly',
            priority: 0.8,
        }))

        return [
            ...staticEntries,
            ...postEntries,
            ...categoryEntries,
            ...projectEntries,
            ...serviceEntries,
        ]
    } catch (err) {
        console.error('Sitemap: database fetch failed', err)
        return staticEntries
    }
}