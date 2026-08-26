'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, Layers, Flame, Eye } from 'lucide-react';

export const PORTFOLIO_ITEMS = [
    {
        id: 'elite-plus-accounting',
        title: 'Elite Plus Accounting',
        category: 'Social Media Management',
        slug: '/portfolio/elite-plus-accounting',
        bgGradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
        mainImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
        overlayImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80',
        tags: ['Cash Flow', 'Financial Strategy', 'Social Posts'],
    },
    {
        id: 'hiree',
        title: 'Hiree',
        category: 'Social Media Management',
        slug: '/portfolio/hiree',
        bgGradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',
        mainImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
        overlayImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
        tags: ['Mobile App', 'Recruitment', 'B2B Marketing'],
    },
    {
        id: 'epiderra',
        title: 'Epiderra',
        category: 'Brand Development',
        slug: '/portfolio/epiderra',
        bgGradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
        mainImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
        overlayImage: 'https://images.unsplash.com/photo-1608248597260-8488e7a08fb3?auto=format&fit=crop&w=400&q=80',
        tags: ['Skincare', 'Packaging', 'Visual Identity'],
    },
    {
        id: 'egarage-bangladesh',
        title: 'eGarage Bangladesh',
        category: 'Social Media Management',
        slug: '/portfolio/egarage-bangladesh',
        bgGradient: 'from-rose-500/10 via-red-500/5 to-transparent',
        mainImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
        overlayImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80',
        tags: ['Automotive', 'Ad Campaign', 'Social Grid'],
    },
    {
        id: 'angies-kebab-burger',
        title: 'Angies Kebab & Burger',
        category: 'Digital Marketing',
        slug: '/portfolio/angies-kebab-burger',
        bgGradient: 'from-yellow-500/10 via-amber-500/5 to-transparent',
        mainImage: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
        overlayImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80',
        tags: ['Food & Bev', 'Promotional', 'Ad Creatives'],
    },
    {
        id: 'give-for-goods-foundation',
        title: 'Give for Goods Foundation',
        category: 'Digital Marketing',
        slug: '/portfolio/give-for-goods-foundation',
        bgGradient: 'from-cyan-500/10 via-blue-500/5 to-transparent',
        mainImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
        overlayImage: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&w=400&q=80',
        tags: ['Non-Profit', 'Multi-Screen', 'Awareness'],
    },
    {
        id: 'dana-group',
        title: 'Dana Group Facility',
        category: 'TVC Shooting',
        slug: '/portfolio/dana-group',
        bgGradient: 'from-violet-500/10 via-purple-500/5 to-transparent',
        mainImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
        overlayImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80',
        tags: ['Video Production', 'Aerial Drone', 'TV Commercial'],
    },
    {
        id: 'medjool-dates',
        title: 'Medjool Fine Dates',
        category: 'Digital Branding',
        slug: '/portfolio/medjool-fine-dates',
        bgGradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
        mainImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
        overlayImage: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=400&q=80',
        tags: ['Organic', 'Islamic Heritage', 'Grid Design'],
    },
    {
        id: 'monochrono',
        title: 'Monochrono Automotive',
        category: 'Social Media Management',
        slug: '/portfolio/monochrono',
        bgGradient: 'from-slate-500/10 via-zinc-500/5 to-transparent',
        mainImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
        overlayImage: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=400&q=80',
        tags: ['Luxury Cars', 'Dark Aesthetic', 'Product Launch'],
    },
];

const CATEGORIES = [
    'All',
    'Social Media Management',
    'Brand Development',
    'Digital Marketing',
    'Digital Branding',
    'TVC Shooting',
];

function PortfolioCard({ item }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [8, -8]);
    const rotateY = useTransform(x, [-100, 100], [-8, 8]);

    function handleMouseMove(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const mouseX = event.clientX - rect.left - rect.width / 2;
        const mouseY = event.clientY - rect.top - rect.height / 2;
        x.set(mouseX);
        y.set(mouseY);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col cursor-pointer"
            style={{ perspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <Link href={item.slug} className="block w-full">
                <motion.div
                    style={{ rotateX, rotateY }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="relative w-full aspect-[4/3] rounded-3xl bg-[#f4f5f8] border border-slate-200/90 overflow-hidden flex items-center justify-center p-6 shadow-sm group-hover:shadow-2xl transition-all duration-500"
                >
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-md group-hover:shadow-2xl transition-all duration-500 bg-white">
                        <img
                            src={item.mainImage}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <motion.div
                            className="absolute -bottom-4 -right-4 w-1/2 aspect-[9/16] rounded-2xl overflow-hidden border-2 border-white shadow-2xl z-20 hidden sm:block"
                            initial={{ y: 20, opacity: 0.8 }}
                            whileHover={{ y: -6, scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                        >
                            <img
                                src={item.overlayImage}
                                alt={`${item.title} Mobile View`}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 flex items-center gap-1.5 z-30">
                            <Eye className="w-3 h-3 text-[#22e3ad]" /> Quick View
                        </div>
                    </div>
                </motion.div>

                <div className="pt-5 px-1 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <p className="text-xs font-medium text-slate-400 tracking-normal">{item.category}</p>
                        <h3 className="text-2xl font-extrabold text-slate-950 tracking-tight group-hover:text-[#00b284] transition-colors duration-300">
                            {item.title}
                        </h3>
                        <div className="flex items-center gap-2 pt-1 flex-wrap">
                            {item.tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="text-[11px] font-semibold text-slate-500 bg-slate-100 group-hover:bg-emerald-50 group-hover:text-emerald-700 px-2.5 py-0.5 rounded-md transition-colors"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.15, rotate: 45 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-full bg-slate-950 text-white flex items-center justify-center shrink-0 shadow-md group-hover:bg-[#22e3ad] group-hover:text-slate-950 transition-colors duration-300"
                    >
                        <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                    </motion.div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function PortfolioPage() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredItems = activeCategory === 'All'
        ? PORTFOLIO_ITEMS
        : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

    return (
        <div className="w-full bg-white text-slate-900 min-h-screen font-sans overflow-x-hidden relative selection:bg-[#22e3ad] selection:text-slate-950">
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#22e3ad]/30 via-emerald-300/20 to-teal-400/20 rounded-full blur-3xl -z-10 pointer-events-none"
            />

            <section className="pt-24 pb-16 px-6 sm:px-12 lg:px-20 max-w-[1400px] mx-auto text-center space-y-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 text-white text-xs font-extrabold uppercase tracking-widest shadow-xl border border-slate-800"
                >
                    <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
                        <Sparkles className="w-4 h-4 text-[#22e3ad]" />
                    </motion.div>
                    <span>Selected Showcase 2026</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 leading-[1.08] max-w-5xl mx-auto"
                >
                    Work That Drives Attention &{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22e3ad] via-emerald-500 to-teal-600">
                        Scales Businesses
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-normal"
                >
                    Discover how we integrate high-performance digital marketing, TVC video production, brand identity, and social media growth strategies for market leaders.
                </motion.p>
            </section>

            <section className="px-6 sm:px-12 lg:px-20 max-w-[1400px] mx-auto pb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap bg-slate-100/80 backdrop-blur-md p-2 rounded-2xl border border-slate-200/80 max-w-4xl mx-auto shadow-inner"
                >
                    {CATEGORIES.map((cat) => {
                        const isActive = activeCategory === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`relative px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${isActive ? 'text-white' : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activePillBg"
                                        className="absolute inset-0 bg-slate-950 rounded-xl shadow-lg"
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-1.5">
                                    {cat === 'All' && <Layers className="w-3.5 h-3.5" />}
                                    {cat}
                                </span>
                            </button>
                        );
                    })}
                </motion.div>
            </section>

            <section className="px-6 sm:px-12 lg:px-20 max-w-[1400px] mx-auto pb-36 relative z-10">
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    <AnimatePresence>
                        {filteredItems.map((item) => (
                            <PortfolioCard key={item.id} item={item} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </section>

            <section className="w-full bg-slate-950 text-white py-20 px-6 relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
                    <div className="inline-flex items-center gap-2 text-[#22e3ad] text-xs font-bold uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/10">
                        <Flame className="w-4 h-4" /> Ready to build yours?
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                        Have a Project in Mind? Let&apos;s Create Something Iconic.
                    </h2>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="pt-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#22e3ad] text-slate-950 font-bold text-base shadow-2xl hover:bg-emerald-400 transition-colors"
                        >
                            Start a Conversation <ArrowUpRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}