'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    FileSearch,
    FileCode2,
    Globe2,
    MapPin,
    Wrench,
    BarChart,
    Target,
    Lightbulb,
    ArrowUpRight,
    CheckCircle2,
    TrendingUp,
    Sparkles
} from 'lucide-react';

// --- DATA ---

const SEO_SERVICES = [
    {
        id: '01',
        icon: FileSearch,
        title: 'SEO Strategy & Audit',
        description: 'We start by understanding where you are — and what’s holding your website back.',
        points: [
            'In-depth Website Audit',
            'Competitor & Market Analysis',
            'Keyword Gap Identification',
            'Actionable Roadmap & Timeline',
            'Performance Benchmarking',
        ],
        footer: 'We lay the groundwork for your success, step by step.',
    },
    {
        id: '02',
        icon: FileCode2,
        title: 'On-Page SEO',
        description: 'Be seen when it matters most. We optimize content and site structure so search engines and users love your pages.',
        points: [
            'Meta Data & Tag Optimization',
            'Content Alignment & Keyword Mapping',
            'Internal Linking Architecture',
            'URL Structure & Hierarchy Fixes',
            'Image & Media Optimization',
        ],
        footer: 'Crafting content search engines love.',
    },
    {
        id: '03',
        icon: Globe2,
        title: 'Off-Page SEO',
        description: 'We help build your site’s authority and credibility in Google’s eyes — naturally.',
        points: [
            'High-Quality Backlink Outreach',
            'Guest Posting Strategy',
            'Citation & Directory Listings',
            'Press Release Optimization',
            'Social Signal Integration',
        ],
        footer: 'Get links that matter, not just numbers.',
    },
    {
        id: '04',
        icon: MapPin,
        title: 'Local SEO',
        description: 'Perfect for businesses targeting a specific city, suburb, or region.',
        points: [
            'Google Business Profile Optimization',
            'Local Listings Management',
            'Review & Reputation Management',
            'Location-Specific Content & Pages',
        ],
        footer: 'Own your neighborhood — digitally.',
    },
    {
        id: '05',
        icon: Wrench,
        title: 'Technical SEO',
        description: 'Behind-the-scenes work that makes a big impact on your rankings.',
        points: [
            'Site Architecture Optimization',
            'Crawlability & Indexing Fixes',
            'XML Sitemap & Robots.txt Setup',
            'Core Web Vitals Improvement',
            'HTTPS, Canonical Tags, Schema Markup',
        ],
        footer: 'We speak search engine fluently.',
    },
    {
        id: '06',
        icon: BarChart,
        title: 'SEO Reporting & Insights',
        description: 'Transparency and data go hand in hand with results.',
        points: [
            'Monthly SEO Reports',
            'Keyword Ranking Updates',
            'Traffic & Click-Through Analysis',
            'Strategy Tweaks Based on Performance',
            'Conversion Tracking',
        ],
        footer: 'Know exactly what’s working — and why.',
    },
];

const WHY_SEO_POINTS = [
    {
        title: 'Tailored Strategy',
        description: 'No one-size-fits-all here. We customize based on your niche, competition, and goals.',
    },
    {
        title: 'White-Hat Techniques',
        description: 'We use ethical, future-proof SEO practices that build sustainable growth.',
    },
    {
        title: 'Full-Team Support',
        description: 'From content writing to web dev, we bring the whole team to the SEO table.',
    },
    {
        title: 'Ongoing Optimization',
        description: 'SEO isn’t a one-time fix — it’s a continuous climb. And we’re here for the long run.',
    },
];

// --- ANIMATION VARIANTS ---

const fadeInUp = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }
    },
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

export default function SEOServicesPage() {
    return (
        <div className="w-full bg-white text-slate-900 font-sans min-h-screen overflow-x-hidden">

            {/* ========================================================= */}
            {/* SECTION 1: HERO & HEADING                                */}
            {/* ========================================================= */}
            <section className="w-full px-6 sm:px-12 lg:px-20 pt-20 pb-24 text-center max-w-[1400px] mx-auto relative overflow-hidden">

                {/* Animated Background Subtle Glow Pulsing */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-200/40 rounded-full blur-3xl -z-10 pointer-events-none"
                />

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={staggerContainer}
                    className="space-y-12 relative z-10"
                >
                    {/* Floating Interactive Hero Illustration */}
                    <div className="relative w-full max-w-2xl mx-auto h-44 flex items-center justify-center">

                        {/* Rotating target icon */}
                        <motion.div
                            animate={{ rotate: 360, y: [-4, 4, -4] }}
                            transition={{
                                rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
                                y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                            }}
                            className="absolute -top-4 left-10 text-teal-300 opacity-70"
                        >
                            <Target className="w-16 h-16 stroke-[1]" />
                        </motion.div>

                        {/* Floating lightbulb with aura effect */}
                        <motion.div
                            animate={{ y: [6, -6, 6], rotate: [-5, 5, -5] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute bottom-1 right-10 text-amber-300 opacity-80"
                        >
                            <Lightbulb className="w-16 h-16 stroke-[1]" />
                        </motion.div>

                        {/* Sparkles Floating Top Right */}
                        <motion.div
                            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute top-2 right-28 text-teal-400"
                        >
                            <Sparkles className="w-8 h-8" />
                        </motion.div>

                        {/* Main Interactive Magnifying Search Glass Hexagon */}
                        <motion.div
                            whileHover={{ scale: 1.12, rotate: 6 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                            className="relative z-10 w-28 h-28 border-2 border-teal-400 rounded-3xl flex items-center justify-center bg-white/90 backdrop-blur-md shadow-2xl shadow-teal-500/20 cursor-pointer group"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <Search className="w-12 h-12 text-slate-800 group-hover:text-teal-600 transition-colors stroke-[1.5]" />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Headline */}
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 tracking-tight leading-[1.08] max-w-5xl mx-auto"
                    >
                        Rank Higher. Grow Faster.{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-teal-700 to-slate-900">
                            Get Found Organically
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.div
                        variants={fadeInUp}
                        className="max-w-3xl mx-auto space-y-6 text-slate-600 text-base sm:text-lg leading-relaxed text-left sm:text-center"
                    >
                        <p>
                            At <strong className="text-slate-900 font-bold">adEstra</strong>, we believe great content and smart strategy go hand-in-hand, but without visibility, even the best websites get lost in the crowd. That’s where our SEO expertise comes in.
                        </p>
                        <p>
                            We craft tailored Search Engine Optimization strategies that help you climb rankings, attract more qualified traffic, and convert visitors into loyal customers, all without paying for every click.
                        </p>
                        <motion.p
                            whileHover={{ scale: 1.02 }}
                            className="font-bold text-slate-900 inline-block bg-teal-50 px-4 py-2 rounded-full border border-teal-200"
                        >
                            We don’t chase algorithms. We understand them.
                        </motion.p>
                    </motion.div>
                </motion.div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 2: WHAT WE OFFER (6 CARDS GRID)                   */}
            {/* ========================================================= */}
            <section className="w-full px-6 sm:px-12 lg:px-16 py-20 border-t border-slate-100 bg-slate-50/60 relative">
                <div className="max-w-[1500px] mx-auto space-y-16">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center space-y-4"
                    >
                        <h2 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight">
                            What We Offer
                        </h2>
                        <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto">
                            Comprehensive search engine solutions engineered for sustainable organic dominant visibility.
                        </p>
                    </motion.div>

                    {/* Cards Grid: 2 rows of 3 columns */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {SEO_SERVICES.map((card) => {
                            const Icon = card.icon;
                            return (
                                <motion.div
                                    key={card.id}
                                    variants={fadeInUp}
                                    whileHover={{
                                        y: -12,
                                        scale: 1.02,
                                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)'
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    className="bg-white border border-slate-200/90 rounded-2xl p-8 flex flex-col justify-between shadow-sm transition-all duration-300 group relative overflow-hidden"
                                >
                                    {/* Subtle hover accent bar on top */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <div className="space-y-6">
                                        {/* Header with Icon and Badge */}
                                        <div className="flex items-center justify-between">
                                            <motion.div
                                                whileHover={{ rotate: [0, -10, 10, 0] }}
                                                transition={{ duration: 0.5 }}
                                                className="p-3.5 rounded-xl bg-slate-100 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300"
                                            >
                                                <Icon className="w-7 h-7 text-slate-800 group-hover:text-white stroke-[1.5] transition-colors" />
                                            </motion.div>

                                            <motion.span
                                                whileHover={{ scale: 1.1 }}
                                                className="text-xs font-mono font-bold text-slate-400 border border-slate-200 px-3 py-1 rounded-full group-hover:border-teal-500 group-hover:text-teal-600 group-hover:bg-teal-50 transition-colors"
                                            >
                                                {card.id}
                                            </motion.span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl font-bold text-slate-950 tracking-tight leading-snug group-hover:text-teal-900 transition-colors">
                                            {card.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                                            {card.description}
                                        </p>

                                        {/* List Points */}
                                        <ul className="space-y-2.5 pt-2">
                                            {card.points.map((point, i) => (
                                                <motion.li
                                                    key={i}
                                                    whileHover={{ x: 4 }}
                                                    className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-1.5 group-hover:scale-150 transition-transform" />
                                                    <span>{point}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Footer */}
                                    <div className="pt-8 mt-6 border-t border-slate-100">
                                        <p className="text-xs text-slate-400 leading-relaxed italic group-hover:text-slate-600 transition-colors">
                                            {card.footer}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 3: WHY SEO WITH ADESTRA?                         */}
            {/* ========================================================= */}
            <section className="w-full px-6 sm:px-12 lg:px-20 py-24 max-w-[1400px] mx-auto border-t border-slate-100">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={staggerContainer}
                    className="space-y-16"
                >
                    {/* Section Header */}
                    <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight leading-tight">
                            Why SEO with adEstra?
                        </h2>
                        <div className="flex items-center gap-2 text-teal-600 font-bold text-sm bg-teal-50 px-4 py-2 rounded-full w-fit">
                            <TrendingUp className="w-4 h-4" /> Sustainable Organic Growth
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Left Column: Key Points */}
                        <motion.div variants={fadeInUp} className="lg:col-span-6 space-y-8">
                            <div className="space-y-6">
                                {WHY_SEO_POINTS.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ x: 6 }}
                                        className="space-y-1.5 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                                    >
                                        <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight flex items-center gap-2.5">
                                            <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed pl-7">
                                            {item.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="pt-4"
                            >
                                <a
                                    href="/contact"
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-slate-950 text-white font-bold text-sm hover:bg-teal-600 transition-all duration-300 shadow-md hover:shadow-xl"
                                >
                                    Request Your Free SEO Audit
                                    <ArrowUpRight className="w-4 h-4" />
                                </a>
                            </motion.div>
                        </motion.div>

                        {/* Right Column: Interactive Team Image Container */}
                        <motion.div
                            variants={fadeInUp}
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                            className="lg:col-span-6 rounded-3xl overflow-hidden shadow-2xl relative border border-slate-200 group aspect-[4/3]"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                                alt="adEstra SEO Specialists Team"
                                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 transition-opacity duration-300 flex items-end p-8">
                                <motion.div initial={{ y: 10 }} whileHover={{ y: 0 }}>
                                    <p className="text-white text-lg sm:text-xl font-bold tracking-tight">
                                        The adEstra SEO & Analytics Team
                                    </p>
                                    <p className="text-slate-300 text-xs sm:text-sm font-medium mt-1">
                                        Continuous monitoring, technical audits, and keyword dominance.
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>

                    </div>
                </motion.div>
            </section>

        </div>
    );
}