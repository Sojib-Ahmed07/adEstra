portfolio/page.jsx
import { getPortfolioItems } from '@/app/actions/portfolio'
import PortfolioClient from '@/components/PortfolioClient'

// Force Next.js to fetch fresh data on every page load
export const revalidate = 0
export const dynamic = 'force-dynamic'

export default async function PortfolioPage() {
    const initialItems = await getPortfolioItems()

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16">
            <PortfolioClient initialItems={initialItems} />
        </main>
    )
}

'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

export default function PortfolioClient({ initialItems = [] }) {
    const items = Array.isArray(initialItems) ? initialItems : []
    const [selectedCategory, setSelectedCategory] = useState('all')

    // Extract unique categories present in database
    const categories = useMemo(() => {
        const set = new Set()
        items.forEach((item) => {
            if (item.category) set.add(item.category.toLowerCase())
        })
        return Array.from(set)
    }, [items])

    // Filter items based on active category tab
    const filteredItems = useMemo(() => {
        if (selectedCategory === 'all') return items
        return items.filter(
            (item) => (item.category || '').toLowerCase() === selectedCategory
        )
    }, [items, selectedCategory])

    return (
        <section className="max-w-7xl mx-auto px-6 text-white">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                    Selected Works & Case Studies
                </h1>
                <p className="text-base text-zinc-400">
                    Explore our latest projects spanning web engineering, digital marketing, media management, and 3D design.
                </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-16">
                <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${selectedCategory === 'all'
                            ? 'bg-white text-black shadow-md'
                            : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                        }`}
                >
                    All Works ({items.length})
                </button>

                {categories.map((cat) => {
                    const count = items.filter(
                        (i) => (i.category || '').toLowerCase() === cat
                    ).length

                    return (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all capitalize ${selectedCategory === cat
                                    ? 'bg-white text-black shadow-md'
                                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                                }`}
                        >
                            {cat} ({count})
                        </button>
                    )
                })}
            </div>

            {/* Portfolio Items Grid */}
            {filteredItems.length === 0 ? (
                <div className="text-center py-20 bg-zinc-900/50 border border-zinc-800 border-dashed rounded-2xl">
                    <p className="text-zinc-400 font-medium">
                        No projects found under this category.
                    </p>
                </div>
            ) : (
                <div className="space-y-16">
                    {filteredItems.map((item) => {
                        const isWebsite =
                            (item.category || '').toLowerCase() === 'websites' && item.websiteUrl

                        // 1. Full-width stacked layout for Website projects with Live URLs
                        if (isWebsite) {
                            return (
                                <div
                                    key={item._id}
                                    className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 md:p-10 shadow-xl space-y-8"
                                >
                                    {/* Top: Metadata & Case Study Info */}
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                        <div className="space-y-3 max-w-3xl">
                                            <div className="flex items-center gap-3">
                                                <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold uppercase tracking-wider rounded-full">
                                                    {item.category || 'Website'}
                                                </span>
                                                <span className="text-xs text-zinc-400">
                                                    Client: <strong className="text-zinc-200">{item.client}</strong>
                                                </span>
                                                <span className="text-xs text-zinc-400">
                                                    Duration: <strong className="text-zinc-200">{item.duration}</strong>
                                                </span>
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-bold text-white">
                                                {item.title}
                                            </h2>
                                            <p className="text-sm text-zinc-300 leading-relaxed line-clamp-2">
                                                {item.background}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-3 shrink-0">
                                            <Link
                                                href={`/portfolio/${item.slug}`}
                                                className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
                                            >
                                                Read Case Study →
                                            </Link>

                                            {item.websiteUrl && (
                                                <a
                                                    href={item.websiteUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 border border-zinc-700 text-zinc-200 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-zinc-800 transition-colors"
                                                >
                                                    Visit Site ↗
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Bottom: Full-Width Monitor Frame Preview */}
                                    <div className="relative border-zinc-700 bg-zinc-800 border-[8px] md:border-[12px] rounded-xl shadow-2xl overflow-hidden w-full">
                                        {/* Monitor Top Bar */}
                                        <div className="h-8 bg-zinc-800 flex items-center px-4 space-x-2 border-b border-zinc-700">
                                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                            <div className="ml-4 bg-zinc-900 text-zinc-400 text-xs px-4 py-0.5 rounded-md w-full max-w-sm truncate border border-zinc-700/50">
                                                {item.websiteUrl}
                                            </div>
                                        </div>

                                        {/* Interactive Frame */}
                                        <div className="relative w-full h-[520px] bg-white overflow-hidden">
                                            <iframe
                                                src={item.websiteUrl}
                                                title={item.title}
                                                className="w-full h-full border-0"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        // 2. Original side-by-side split layout for Marketing, Media, 3D, and standard projects
                        return (
                            <div
                                key={item._id}
                                className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                            >
                                {/* Left Side: Info */}
                                <div className="lg:col-span-5 space-y-6">
                                    <div className="space-y-2">
                                        <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[11px] font-bold uppercase tracking-wider rounded-full">
                                            {item.category || 'Project'}
                                        </span>
                                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                                            {item.title}
                                        </h2>
                                    </div>

                                    <p className="text-sm text-zinc-300 leading-relaxed line-clamp-3">
                                        {item.background}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800 text-xs">
                                        <div>
                                            <span className="text-zinc-500 font-medium block">Client</span>
                                            <span className="font-semibold text-zinc-200">{item.client}</span>
                                        </div>
                                        <div>
                                            <span className="text-zinc-500 font-medium block">Duration</span>
                                            <span className="font-semibold text-zinc-200">{item.duration}</span>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <Link
                                            href={`/portfolio/${item.slug}`}
                                            className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
                                        >
                                            Read Case Study →
                                        </Link>
                                    </div>
                                </div>

                                {/* Right Side: Cover Image Showcase */}
                                <div className="lg:col-span-7">
                                    <div className="overflow-hidden rounded-xl border border-zinc-800 group">
                                        <img
                                            src={item.coverImage}
                                            alt={item.title}
                                            className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </section>
    )
}

portfolio/[slug]/page.jsx
import { getPortfolioItemBySlug } from '@/app/actions/portfolio'
import { notFound } from 'next/navigation'
import CaseStudyClient from './CaseStudyClient'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export default async function CaseStudyPage({ params }) {
    const { slug } = await params
    const item = await getPortfolioItemBySlug(slug)

    if (!item) {
        notFound()
    }

    return <CaseStudyClient project={item} item={item} />
}

'use client'

import React from 'react'
import Link from 'next/link'

export default function CaseStudyClient({ project: projectProp, item }) {
    const project = projectProp || item

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-zinc-400">
                <p>Case study data could not be loaded.</p>
            </div>
        )
    }

    const isWebsite = (project.category || '').toLowerCase() === 'websites' && project.websiteUrl

    return (
        <article className="min-h-screen bg-[#0a0a0a] text-white pt-28 pb-20 px-6">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Navigation Back Link */}
                <div>
                    <Link
                        href="/portfolio"
                        className="text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
                    >
                        ← Back to Portfolio
                    </Link>
                </div>

                {/* Case Study Heading */}
                <header className="space-y-6">
                    <div className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider rounded-full">
                        {project.category || 'Case Study'}
                    </div>

                    <h1 className="max-w-5xl text-4xl sm:text-6xl font-black leading-tight tracking-tight text-white">
                        {project.title}
                    </h1>

                    {/* Project Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-zinc-800 text-sm">
                        <div>
                            <span className="text-zinc-500 block text-xs">Client</span>
                            <strong className="text-zinc-200">{project.client}</strong>
                        </div>
                        <div>
                            <span className="text-zinc-500 block text-xs">Industry</span>
                            <strong className="text-zinc-200">{project.industry}</strong>
                        </div>
                        <div>
                            <span className="text-zinc-500 block text-xs">Project Type</span>
                            <strong className="text-zinc-200">{project.projectType}</strong>
                        </div>
                        <div>
                            <span className="text-zinc-500 block text-xs">Duration</span>
                            <strong className="text-zinc-200">{project.duration}</strong>
                        </div>
                    </div>
                </header>

                {/* Media Preview (Live Website Frame or Cover Image) */}
                <section className="pt-4">
                    {isWebsite ? (
                        <div className="relative border-zinc-700 bg-zinc-800 border-[8px] md:border-[12px] rounded-2xl shadow-2xl overflow-hidden w-full">
                            <div className="h-9 bg-zinc-800 flex items-center px-4 space-x-2 border-b border-zinc-700">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <div className="ml-4 bg-zinc-900 text-zinc-400 text-xs px-4 py-1 rounded-md w-full max-w-md truncate border border-zinc-700/50">
                                    {project.websiteUrl}
                                </div>
                            </div>
                            <div className="relative w-full h-[550px] bg-white overflow-hidden">
                                <iframe
                                    src={project.websiteUrl}
                                    title={project.title}
                                    className="w-full h-full border-0"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-2xl overflow-hidden border border-zinc-800">
                            <img
                                src={project.coverImage}
                                alt={project.title}
                                className="w-full h-auto object-cover max-h-[600px]"
                            />
                        </div>
                    )}
                </section>

                {/* Background & Summary */}
                <section className="space-y-4 max-w-4xl">
                    <h2 className="text-2xl font-bold text-white">Project Overview</h2>
                    <p className="text-zinc-300 leading-relaxed whitespace-pre-line text-base">
                        {project.background}
                    </p>
                </section>

                {/* Objectives */}
                {project.objectives && project.objectives.length > 0 && (
                    <section className="space-y-4 max-w-4xl pt-6 border-t border-zinc-800">
                        <h2 className="text-2xl font-bold text-white">Key Objectives</h2>
                        <ul className="list-disc list-inside space-y-2 text-zinc-300">
                            {project.objectives.map((obj, idx) => (
                                <li key={idx}>{obj}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Results */}
                {project.results && project.results.length > 0 && (
                    <section className="space-y-4 max-w-4xl pt-6 border-t border-zinc-800">
                        <h2 className="text-2xl font-bold text-white">Results & Impact</h2>
                        <ul className="list-disc list-inside space-y-2 text-zinc-300">
                            {project.results.map((res, idx) => (
                                <li key={idx}>{res}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Gallery Showcase */}
                {project.galleryImages && project.galleryImages.length > 0 && (
                    <section className="space-y-6 pt-6 border-t border-zinc-800">
                        <h2 className="text-2xl font-bold text-white">Project Showcase</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {project.galleryImages.map((img, idx) => (
                                <div key={idx} className="rounded-xl overflow-hidden border border-zinc-800">
                                    <img
                                        src={img}
                                        alt={`${project.title} preview ${idx + 1}`}
                                        className="w-full h-64 object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </article>
    )
}
