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
        <section className="max-w-7xl mx-auto px-6 text-slate-900 bg-white">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                    Selected Works & Case Studies
                </h1>
                <p className="text-base text-slate-600">
                    Explore our latest projects spanning web engineering, digital marketing, media management, and 3D design.
                </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-16">
                <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${selectedCategory === 'all'
                            ? 'bg-slate-900 text-white shadow-sm'
                            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
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
                                    ? 'bg-slate-900 text-white shadow-sm'
                                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                                }`}
                        >
                            {cat} ({count})
                        </button>
                    )
                })}
            </div>

            {/* Portfolio Items Grid */}
            {filteredItems.length === 0 ? (
                <div className="text-center py-20 bg-white border border-slate-200 border-dashed rounded-2xl">
                    <p className="text-slate-500 font-medium">
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
                                    className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm hover:shadow-md transition-shadow space-y-8"
                                >
                                    {/* Top: Metadata & Case Study Info */}
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                        <div className="space-y-3 max-w-3xl">
                                            <div className="flex items-center gap-3">
                                                <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold uppercase tracking-wider rounded-full">
                                                    {item.category || 'Website'}
                                                </span>
                                                <span className="text-xs text-slate-500">
                                                    Client: <strong className="text-slate-900">{item.client}</strong>
                                                </span>
                                                <span className="text-xs text-slate-500">
                                                    Duration: <strong className="text-slate-900">{item.duration}</strong>
                                                </span>
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                                                {item.title}
                                            </h2>
                                            <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                                                {item.background}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-3 shrink-0">
                                            <Link
                                                href={`/portfolio/${item.slug}`}
                                                className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-slate-800 transition-colors"
                                            >
                                                Read Case Study →
                                            </Link>

                                            {item.websiteUrl && (
                                                <a
                                                    href={item.websiteUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 border border-slate-300 bg-white text-slate-800 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-slate-50 transition-colors"
                                                >
                                                    Visit Site ↗
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Bottom: Full-Width Monitor Frame Preview */}
                                    <div className="relative border-slate-200 bg-slate-100 border-[8px] md:border-[12px] rounded-xl shadow-md overflow-hidden w-full">
                                        {/* Monitor Top Bar */}
                                        <div className="h-8 bg-slate-100 flex items-center px-4 space-x-2 border-b border-slate-200">
                                            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                            <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                                            <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                                            <div className="ml-4 bg-white text-slate-600 text-xs px-4 py-0.5 rounded-md w-full max-w-sm truncate border border-slate-200">
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
                                className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                            >
                                {/* Left Side: Info */}
                                <div className="lg:col-span-5 space-y-6">
                                    <div className="space-y-2">
                                        <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-bold uppercase tracking-wider rounded-full">
                                            {item.category || 'Project'}
                                        </span>
                                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                                            {item.title}
                                        </h2>
                                    </div>

                                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                                        {item.background}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
                                        <div>
                                            <span className="text-slate-400 font-medium block">Client</span>
                                            <span className="font-semibold text-slate-900">{item.client}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 font-medium block">Duration</span>
                                            <span className="font-semibold text-slate-900">{item.duration}</span>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <Link
                                            href={`/portfolio/${item.slug}`}
                                            className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-slate-800 transition-colors"
                                        >
                                            Read Case Study →
                                        </Link>
                                    </div>
                                </div>

                                {/* Right Side: Cover Image Showcase */}
                                <div className="lg:col-span-7">
                                    <div className="overflow-hidden rounded-xl border border-slate-200 group">
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