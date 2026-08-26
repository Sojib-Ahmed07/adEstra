'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    PenTool,
    FileText,
    Sparkles,
    Mail,
    Share2,
    BookOpen,
    CheckCircle2,
    ArrowUpRight,
    Feather,
    Lightbulb,
    Zap,
    Languages
} from 'lucide-react';

// --- DATA ---

const COPYWRITING_SERVICES = [
    {
        id: '01',
        icon: FileText,
        title: 'Website Copywriting',
        description: 'Your website is your digital storefront — and the words on it matter.',
        points: [
            'Homepage & Landing Page Copy',
            'About Us & Team Sections',
            'Services & Product Descriptions',
            'SEO-friendly structure',
        ],
        footer: 'From tone to structure, we make every word work hard.',
    },
    {
        id: '02',
        icon: Zap,
        title: 'Marketing & Ad Copy',
        description: 'Cut through the clutter and create campaigns that click — literally.',
        points: [
            'Google & Meta Ad Copy',
            'Taglines, Headlines & Hooks',
            'PPC Ad Descriptions',
            'Print or Display Ads',
            'Conversion Copywriting',
        ],
        footer: 'Short, sharp, and built to sell.',
    },
    {
        id: '03',
        icon: Mail,
        title: 'Email & Newsletter Copy',
        description: 'Make every email open-worthy and every newsletter engaging.',
        points: [
            'Welcome Sequences',
            'Promotional Campaigns',
            'Product Launch Announcements',
            'Drip Campaigns & Automation Copy',
            'Monthly Brand Updates',
        ],
        footer: 'We help you stay in inboxes and on minds.',
    },
    {
        id: '04',
        icon: Share2,
        title: 'Social Media Content',
        description: 'Your brand voice, tailored for every platform and scroll-friendly.',
        points: [
            'Post Captions & Story Scripts',
            'LinkedIn Articles & Carousels',
            'Reels/TikTok Captioning',
            'Hashtag Research & Strategy',
            'Engaging Community Building Posts',
        ],
        footer: 'We make your online presence impossible to ignore.',
    },
    {
        id: '05',
        icon: BookOpen,
        title: 'Blog & SEO Content Writing',
        description: 'Position your brand as a leader with insightful, search-optimized content.',
        points: [
            'Long-form Blogs & Articles',
            'Product/Service Guides',
            'Thought Leadership Content',
            'Industry-Specific SEO Blogs',
            'Keyword-Rich & Readable',
        ],
        footer: 'Built for search. Written for people.',
    },
];

const WHY_COPYWRITING_POINTS = [
    {
        title: 'Strategic Writing',
        description: 'Every word is backed by a goal: brand awareness, conversion, or credibility.',
    },
    {
        title: 'Voice Consistency',
        description: 'We adapt to your brand’s tone, whether professional, playful, or persuasive.',
    },
    {
        title: 'SEO-Savvy',
        description: 'We understand keywords, search intent, and Google’s love for natural writing.',
    },
    {
        title: 'Fast Turnaround',
        description: 'Quality content, delivered efficiently — even at scale.',
    },
    {
        title: 'Multilingual Options',
        description: 'Need bilingual content (e.g., English & Arabic)? We’ve got you covered.',
    },
];

// --- DELAYED & SLOWER ANIMATION VARIANTS ---

const fadeInUp = {
    hidden: { opacity: 0, y: 50, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }
    },
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2, // Increased delay between items
            delayChildren: 0.1
        }
    },
};

export default function CopywritingPage() {
    return (
        <div className="w-full bg-white text-slate-900 font-sans min-h-screen overflow-x-hidden">

            {/* ========================================================= */}
            {/* SECTION 1: HERO & HEADING                                */}
            {/* ========================================================= */}
            <section className="w-full px-6 sm:px-12 lg:px-20 pt-20 pb-24 text-center max-w-[1400px] mx-auto relative overflow-hidden">

                {/* Animated Background Glow */}
                <motion.div
                    animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.35, 0.15] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-teal-200/40 rounded-full blur-3xl -z-10 pointer-events-none"
                />

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={staggerContainer}
                    className="space-y-12 relative z-10"
                >
                    {/* Floating Pen & Writing Illustration */}
                    <div className="relative w-full max-w-2xl mx-auto h-44 flex items-center justify-center">

                        <motion.div
                            animate={{ y: [-8, 8, -8], rotate: [-8, 8, -8] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute -top-2 left-12 text-slate-300 opacity-80"
                        >
                            <Feather className="w-16 h-16 stroke-[1]" />
                        </motion.div>

                        <motion.div
                            animate={{ y: [8, -8, 8], rotate: [5, -5, 5] }}
                            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute bottom-2 right-12 text-amber-300 opacity-80"
                        >
                            <Lightbulb className="w-16 h-16 stroke-[1]" />
                        </motion.div>

                        <motion.div
                            animate={{ scale: [0.8, 1.25, 0.8], opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute top-1 right-28 text-teal-400"
                        >
                            <Sparkles className="w-8 h-8" />
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.12, rotate: -6 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                            className="relative z-10 w-28 h-28 border-2 border-teal-400 rounded-3xl flex items-center justify-center bg-white/90 backdrop-blur-md shadow-2xl shadow-teal-500/20 cursor-pointer group"
                        >
                            <motion.div
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <PenTool className="w-12 h-12 text-slate-800 group-hover:text-teal-600 transition-colors stroke-[1.5]" />
                            </motion.div>
                        </motion.div>
                    </div>

                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 tracking-tight leading-[1.08] max-w-5xl mx-auto"
                    >
                        Words That Captivate,{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-teal-700 to-slate-900">
                            Convert & Connect
                        </span>
                    </motion.h1>

                    <motion.div
                        variants={fadeInUp}
                        className="max-w-3xl mx-auto space-y-6 text-slate-600 text-base sm:text-lg leading-relaxed text-left sm:text-center"
                    >
                        <p>
                            In today’s noisy digital world, attention is currency — and{' '}
                            <strong className="text-slate-900 font-bold">great copy is how you earn it</strong>.
                        </p>
                        <p>
                            At <strong className="text-slate-900 font-bold">adEstra</strong>, we turn ideas into clear, compelling words that inspire action. Whether it’s for your website, ad campaigns, social media, or emails, our copywriting is crafted to{' '}
                            <strong className="text-slate-900 font-bold">sound human, sell smart, and strengthen your brand voice</strong>.
                        </p>
                        <motion.p
                            whileHover={{ scale: 1.02 }}
                            className="font-bold text-slate-900 inline-block bg-teal-50 px-5 py-2.5 rounded-full border border-teal-200"
                        >
                            We don’t just write to fill space, we write to build trust, drive results, and make your message impossible to ignore.
                        </motion.p>
                    </motion.div>
                </motion.div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 2: WHAT WE OFFER (CENTERED 4 & 5 GRID)            */}
            {/* ========================================================= */}
            <section className="w-full px-6 sm:px-12 lg:px-16 py-20 border-t border-slate-100 bg-slate-50/60 relative">
                <div className="max-w-[1400px] mx-auto space-y-16">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-center space-y-4"
                    >
                        <h2 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight">
                            What We Offer
                        </h2>
                        <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto">
                            Tailored copywriting services that turn casual readers into loyal buyers.
                        </p>
                    </motion.div>

                    {/* Centered Flexible Cards Grid */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={staggerContainer}
                        className="flex flex-wrap justify-center gap-8"
                    >
                        {COPYWRITING_SERVICES.map((card) => {
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
                                    transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                                    className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md bg-white border border-slate-200/90 rounded-2xl p-8 flex flex-col justify-between shadow-sm transition-all duration-300 group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <div className="space-y-6">
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

                                        <h3 className="text-2xl font-bold text-slate-950 tracking-tight leading-snug group-hover:text-teal-900 transition-colors">
                                            {card.title}
                                        </h3>

                                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                                            {card.description}
                                        </p>

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
            {/* SECTION 3: WHY CHOOSE ADESTRA COPYWRITERS?                */}
            {/* ========================================================= */}
            <section className="w-full px-6 sm:px-12 lg:px-20 py-24 max-w-[1400px] mx-auto border-t border-slate-100">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={staggerContainer}
                    className="space-y-16"
                >
                    <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight leading-tight">
                            Why Choose adEstra Copywriters?
                        </h2>
                        <div className="flex items-center gap-2 text-teal-600 font-bold text-sm bg-teal-50 px-4 py-2 rounded-full w-fit">
                            <Languages className="w-4 h-4" /> Multilingual & High-Conversion Copy
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        <motion.div variants={fadeInUp} className="lg:col-span-6 space-y-6">
                            <div className="space-y-4">
                                {WHY_COPYWRITING_POINTS.map((item, idx) => (
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

                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="pt-4"
                            >
                                <a
                                    href="/contact"
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-slate-950 text-white font-bold text-sm hover:bg-teal-600 transition-all duration-300 shadow-md hover:shadow-xl"
                                >
                                    Elevate Your Brand Voice Today
                                    <ArrowUpRight className="w-4 h-4" />
                                </a>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                            className="lg:col-span-6 rounded-3xl overflow-hidden shadow-2xl relative border border-slate-200 group aspect-[4/3]"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                                alt="adEstra Copywriting Team"
                                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 transition-opacity duration-300 flex items-end p-8">
                                <motion.div initial={{ y: 10 }} whileHover={{ y: 0 }}>
                                    <p className="text-white text-lg sm:text-xl font-bold tracking-tight">
                                        The adEstra Creative Writing Team
                                    </p>
                                    <p className="text-slate-300 text-xs sm:text-sm font-medium mt-1">
                                        Crafting persuasive copy that sparks engagement and converts.
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