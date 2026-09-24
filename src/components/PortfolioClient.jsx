'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useIsDesktop } from '@/hooks/useIsDesktop'

export default function PortfolioClient({ initialItems = [] }) {
    const items = Array.isArray(initialItems) ? initialItems : []
    const [selectedCategory, setSelectedCategory] = useState('all')
    const isDesktop = useIsDesktop()

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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 text-slate-900 bg-white">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center space-y-3 md:space-y-4 mb-8 md:mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 break-words">
                    Selected Works & Case Studies
                </h1>
                <p className="text-sm sm:text-base text-slate-600">
                    Explore our latest projects spanning web engineering, digital marketing, media management, and 3D design.
                </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex overflow-x-auto md:flex-wrap justify-start md:justify-center gap-2 mb-10 md:mb-16 pb-2 md:pb-0 scrollbar-none snap-x">
                <button
                    onClick={() => setSelectedCategory('all')}
                    className={`shrink-0 snap-start px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all min-h-[44px] ${selectedCategory === 'all'
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
                            className={`shrink-0 snap-start px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all capitalize min-h-[44px] ${selectedCategory === cat
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
                <div className="text-center py-16 md:py-20 bg-white border border-slate-200 border-dashed rounded-2xl">
                    <p className="text-slate-500 font-medium text-sm sm:text-base">
                        No projects found under this category.
                    </p>
                </div>
            ) : (
                <div className="space-y-8 md:space-y-16">
                    {filteredItems.map((item) => {
                        const isWebsite =
                            (item.category || '').toLowerCase() === 'websites' && item.websiteUrl

                        // 1. Full-width stacked layout for Website projects with Live URLs
                        if (isWebsite) {
                            return (
                                <div
                                    key={item._id}
                                    className="bg-white border border-slate-200 rounded-2xl p-5 md:p-10 shadow-sm hover:shadow-md transition-shadow space-y-6 md:space-y-8"
                                >
                                    {/* Top: Metadata & Case Study Info */}
                                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                                        <div className="space-y-3 max-w-3xl">
                                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-500">
                                                <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold uppercase tracking-wider rounded-full">
                                                    {item.category || 'Website'}
                                                </span>
                                                {item.client && (
                                                    <span>
                                                        Client: <strong className="text-slate-900">{item.client}</strong>
                                                    </span>
                                                )}
                                                {item.duration && (
                                                    <span>
                                                        Duration: <strong className="text-slate-900">{item.duration}</strong>
                                                    </span>
                                                )}
                                            </div>
                                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 break-words">
                                                {item.title}
                                            </h2>
                                            <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                                                {item.background}
                                            </p>
                                        </div>

                                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                                            <Link
                                                href={`/portfolio/${item.slug}`}
                                                className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-3 sm:py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-slate-800 transition-colors w-full sm:w-auto min-h-[44px]"
                                            >
                                                Read Case Study →
                                            </Link>

                                            {item.websiteUrl && (
                                                <a
                                                    href={item.websiteUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center gap-2 border border-slate-300 bg-white text-slate-800 px-5 py-3 sm:py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-slate-50 transition-colors w-full sm:w-auto min-h-[44px]"
                                                >
                                                    Visit Site ↗
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Bottom: Browser Window Frame Preview */}
                                    <div className="relative border-slate-200 bg-slate-100 border-[6px] sm:border-[8px] md:border-[12px] rounded-xl shadow-md overflow-hidden w-full">
                                        {/* Monitor Top Bar */}
                                        <div className="h-8 bg-slate-100 flex items-center px-3 sm:px-4 space-x-2 border-b border-slate-200">
                                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-400 rounded-full shrink-0"></div>
                                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-amber-400 rounded-full shrink-0"></div>
                                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-400 rounded-full shrink-0"></div>
                                            <div className="ml-2 sm:ml-4 bg-white text-slate-600 text-[11px] sm:text-xs px-3 sm:px-4 py-0.5 rounded-md w-full max-w-xs sm:max-w-sm truncate border border-slate-200">
                                                {item.websiteUrl}
                                            </div>
                                        </div>

                                        {/* Interactive Frame / Static Banner Fallback */}
                                        <div className="relative w-full bg-white overflow-hidden">
                                            {isDesktop ? (
                                                <div className="w-full h-[520px]">
                                                    <iframe
                                                        src={item.websiteUrl}
                                                        title={item.title}
                                                        className="w-full h-full border-0"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            ) : (
                                                <a
                                                    href={item.websiteUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group relative block w-full aspect-[16/10] overflow-hidden bg-slate-100"
                                                >
                                                    {item.coverImage ? (
                                                        <img
                                                            src={item.coverImage}
                                                            alt={`${item.title} website preview`}
                                                            className="w-full h-full object-cover object-top"
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-50">
                                                            <span className="text-slate-800 font-bold text-base mb-2 break-all">
                                                                {item.websiteUrl.replace(/^https?:\/\//, '')}
                                                            </span>
                                                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
                                                                Visit Site ↗
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <span className="bg-slate-900/80 text-white text-xs font-bold px-4 py-2 rounded-full backdrop-blur-sm">
                                                            Visit Live Site ↗
                                                        </span>
                                                    </div>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        // 2. Side-by-side split layout for Marketing, Media, 3D, and standard projects
                        return (
                            <div
                                key={item._id}
                                className="bg-white border border-slate-200 rounded-2xl p-5 md:p-8 shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center"
                            >
                                {/* Left Side: Info */}
                                <div className="lg:col-span-5 space-y-4 md:space-y-6">
                                    <div className="space-y-2">
                                        <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-bold uppercase tracking-wider rounded-full">
                                            {item.category || 'Project'}
                                        </span>
                                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 break-words">
                                            {item.title}
                                        </h2>
                                    </div>

                                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                                        {item.background}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
                                        <div>
                                            <span className="text-slate-400 font-medium block">Client</span>
                                            <span className="font-semibold text-slate-900 break-words">{item.client || 'N/A'}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 font-medium block">Duration</span>
                                            <span className="font-semibold text-slate-900 break-words">{item.duration || 'N/A'}</span>
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <Link
                                            href={`/portfolio/${item.slug}`}
                                            className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-3 sm:py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-slate-800 transition-colors w-full sm:w-auto min-h-[44px]"
                                        >
                                            Read Case Study →
                                        </Link>
                                    </div>
                                </div>

                                {/* Right Side: Cover Image Showcase */}
                                <div className="lg:col-span-7 order-first lg:order-none">
                                    <div className="overflow-hidden rounded-xl border border-slate-200 group aspect-[4/3] lg:aspect-auto lg:h-[380px]">
                                        <img
                                            src={item.coverImage}
                                            alt={item.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover lg:group-hover:scale-105 transition-transform duration-500"
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