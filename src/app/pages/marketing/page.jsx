'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Megaphone,
    Search,
    Mail,
    BarChart3,
    Share2,
    Target,
    Lightbulb,
    ArrowUpRight,
    CheckCircle2
} from 'lucide-react';

// --- DATA ---

const MARKETING_SERVICES = [
    {
        id: '01',
        icon: Megaphone,
        title: 'Social Media Marketing (SMM)',
        description: 'We turn scrolls into sales with engaging, strategic social content. Whether it’s Facebook, Instagram, LinkedIn, or TikTok — we craft content that connects.',
        points: [
            'Content Strategy & Planning',
            'Post Design & Scheduling',
            'Reels, Stories & Video Marketing',
            'Community Engagement & Growth',
        ],
        footer: 'We don’t just post — we build presence.',
    },
    {
        id: '02',
        icon: Search,
        title: 'Search Engine Marketing (SEM & PPC)',
        description: 'Be seen when it matters most. Our paid advertising experts optimize every dollar to get maximum return — on Google, YouTube, and beyond.',
        points: [
            'Google Ads (Search, Display, Shopping)',
            'YouTube Video Ads',
            'Campaign Setup & Optimization',
            'Keyword Research & A/B Testing',
            'Performance Tracking & Reporting',
        ],
        footer: 'No guesswork. Just measurable results.',
    },
    {
        id: '03',
        icon: Mail,
        title: 'Email Marketing',
        description: 'Your inbox is a goldmine — if used right. We create automated email flows and newsletters that nurture, inform, and convert leads.',
        points: [
            'Email Campaign Strategy',
            'List Segmentation',
            'Sequence Automation (Welcome, Abandoned Cart, etc.)',
            'Creative Design & Copywriting',
            'Analytics & Performance Reports',
        ],
        footer: 'Build trust through the power of community.',
    },
    {
        id: '04',
        icon: BarChart3,
        title: 'Performance & Analytics',
        description: 'Marketing is only as good as its results. That’s why we measure everything — so you know what’s working and what needs refining.',
        points: [
            'Monthly Reports with Actionable Insights',
            'ROI Tracking Across Channels',
            'Heatmaps, CTRs, and Conversion Analysis',
            'Strategy Adjustments Based on Data',
        ],
        footer: 'We make your offline presence just as compelling as your online image.',
    },
    {
        id: '05',
        icon: Share2,
        title: 'Influencer & Affiliate Marketing',
        description: 'Tap into trusted voices. We help you identify the right influencers and affiliates to boost your brand reach and credibility.',
        points: [
            'Influencer Research & Outreach',
            'Campaign Brief Creation',
            'Performance Monitoring',
            'Affiliate Program Setup',
            'Custom Tracking & Incentives',
        ],
        footer: 'Build trust through the power of community.',
    },
];

// --- ANIMATION VARIANTS ---

const fadeInUp = {
    hidden: { opacity: 0, y: 35 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    },
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

export default function MarketingServicesPage() {
    return (
        <div className="w-full bg-white text-slate-900 font-sans min-h-screen overflow-x-hidden">

            {/* ========================================================= */}
            {/* SECTION 1: HERO & HEADING                                */}
            {/* ========================================================= */}
            <section className="w-full px-6 sm:px-12 lg:px-20 pt-20 pb-24 text-center max-w-[1400px] mx-auto relative">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={staggerContainer}
                    className="space-y-12"
                >
                    {/* Floating Line Art Illustrations Background */}
                    <div className="relative w-full max-w-2xl mx-auto h-40 flex items-center justify-center">

                        {/* Background floating target icon */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                            className="absolute -top-6 left-12 text-teal-300 opacity-60"
                        >
                            <Target className="w-16 h-16 stroke-[1]" />
                        </motion.div>

                        {/* Background floating lightbulb */}
                        <motion.div
                            animate={{ y: [-6, 6, -6] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute bottom-2 right-12 text-amber-300 opacity-70"
                        >
                            <Lightbulb className="w-16 h-16 stroke-[1]" />
                        </motion.div>

                        {/* Central Hexagon Megaphone Icon */}
                        <motion.div
                            whileHover={{ scale: 1.08, rotate: -5 }}
                            className="relative z-10 w-28 h-28 border-2 border-teal-400 rounded-3xl flex items-center justify-center bg-white/80 backdrop-blur-sm shadow-xl shadow-teal-500/10 cursor-pointer"
                        >
                            <Megaphone className="w-12 h-12 text-slate-800 stroke-[1.5]" />
                        </motion.div>
                    </div>

                    {/* Heading */}
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 tracking-tight leading-[1.08] max-w-5xl mx-auto"
                    >
                        Smart Marketing That Moves the Needle
                    </motion.h1>

                    {/* Intro Description */}
                    <motion.div
                        variants={fadeInUp}
                        className="max-w-3xl mx-auto space-y-6 text-slate-600 text-base sm:text-lg leading-relaxed text-left sm:text-center"
                    >
                        <p>
                            In today&apos;s digital-first world, marketing is no longer about pushing messages — it&apos;s about creating meaningful connections. At{" "}
                            <strong className="text-slate-900 font-bold">adEstra</strong>, we blend data-driven strategies with creative storytelling to help your brand reach, engage, and convert the right audience, at the right time.
                        </p>
                        <p>
                            From social media to email campaigns, ad management to influencer outreach, we design marketing ecosystems that grow businesses and amplify brand visibility.
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 2: WHAT WE OFFER (5 CARDS GRID)                   */}
            {/* ========================================================= */}
            <section className="w-full px-6 sm:px-12 lg:px-16 py-20 border-t border-slate-100 bg-slate-50/50">
                <div className="max-w-[1500px] mx-auto space-y-16">

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl sm:text-6xl font-extrabold text-slate-950 text-center tracking-tight"
                    >
                        What We Offer
                    </motion.h2>

                    {/* Cards Grid: 3 top row, 2 bottom row */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={staggerContainer}
                        className="space-y-8"
                    >
                        {/* Top Row: Cards 01, 02, 03 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {MARKETING_SERVICES.slice(0, 3).map((card) => {
                                const Icon = card.icon;
                                return (
                                    <motion.div
                                        key={card.id}
                                        variants={fadeInUp}
                                        whileHover={{ y: -8 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                        className="bg-white border border-slate-200/80 rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 group relative"
                                    >
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <div className="p-3.5 rounded-xl bg-slate-100 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                                                    <Icon className="w-7 h-7 text-slate-800 group-hover:text-teal-600 stroke-[1.5]" />
                                                </div>
                                                <span className="text-xs font-mono font-bold text-slate-400 border border-slate-200 px-3 py-1 rounded-full group-hover:border-slate-900 group-hover:text-slate-900 transition-colors">
                                                    {card.id}
                                                </span>
                                            </div>

                                            <h3 className="text-2xl font-bold text-slate-950 tracking-tight leading-snug">
                                                {card.title}
                                            </h3>

                                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                                                {card.description}
                                            </p>

                                            <ul className="space-y-2.5 pt-2">
                                                {card.points.map((point, i) => (
                                                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-800 shrink-0 mt-1.5" />
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="pt-8 mt-6 border-t border-slate-100">
                                            <p className="text-xs text-slate-400 leading-relaxed italic">
                                                {card.footer}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Bottom Row: Cards 04, 05 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            {MARKETING_SERVICES.slice(3, 5).map((card) => {
                                const Icon = card.icon;
                                return (
                                    <motion.div
                                        key={card.id}
                                        variants={fadeInUp}
                                        whileHover={{ y: -8 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                        className="bg-white border border-slate-200/80 rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 group relative"
                                    >
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <div className="p-3.5 rounded-xl bg-slate-100 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                                                    <Icon className="w-7 h-7 text-slate-800 group-hover:text-teal-600 stroke-[1.5]" />
                                                </div>
                                                <span className="text-xs font-mono font-bold text-indigo-400 border border-indigo-200 bg-indigo-50/50 px-3 py-1 rounded-full group-hover:border-indigo-900 group-hover:text-indigo-900 transition-colors">
                                                    {card.id}
                                                </span>
                                            </div>

                                            <h3 className="text-2xl font-bold text-slate-950 tracking-tight leading-snug">
                                                {card.title}
                                            </h3>

                                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                                                {card.description}
                                            </p>

                                            <ul className="space-y-2.5 pt-2">
                                                {card.points.map((point, i) => (
                                                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-800 shrink-0 mt-1.5" />
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="pt-8 mt-6 border-t border-slate-100">
                                            <p className="text-xs text-slate-400 leading-relaxed italic">
                                                {card.footer}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                    </motion.div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 3: WHY CHOOSE ADESTRA?                           */}
            {/* ========================================================= */}
            <section className="w-full px-6 sm:px-12 lg:px-20 py-24 max-w-[1400px] mx-auto border-t border-slate-100">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={staggerContainer}
                    className="space-y-16"
                >
                    {/* Header Title */}
                    <motion.h2
                        variants={fadeInUp}
                        className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight leading-tight"
                    >
                        Why Choose adEstra?
                    </motion.h2>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Left Column: Key Pillars */}
                        <motion.div variants={fadeInUp} className="lg:col-span-6 space-y-8">
                            <div className="space-y-6">

                                {/* Pillar 1 */}
                                <div className="space-y-2">
                                    <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                                        Full-Spectrum Digital Expertise
                                    </h3>
                                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed pl-7">
                                        We don’t just manage platforms — we build end-to-end strategies across channels.
                                    </p>
                                </div>

                                {/* Pillar 2 */}
                                <div className="space-y-2">
                                    <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                                        Creative + Analytical Balance
                                    </h3>
                                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed pl-7">
                                        We combine storytelling with strategy, imagination with insights.
                                    </p>
                                </div>

                                {/* Pillar 3 */}
                                <div className="space-y-2">
                                    <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                                        Client-First Approach
                                    </h3>
                                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed pl-7">
                                        We collaborate closely, share transparent reports, and adjust swiftly to your needs.
                                    </p>
                                </div>

                                {/* Pillar 4 */}
                                <div className="space-y-2">
                                    <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                                        Growth-Minded Execution
                                    </h3>
                                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed pl-7">
                                        Every campaign is tied to your business objectives — not vanity metrics.
                                    </p>
                                </div>

                            </div>

                            <div className="pt-4">
                                <a
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-950 text-white font-bold text-sm hover:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-lg"
                                >
                                    Start Your Growth Campaign
                                    <ArrowUpRight className="w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>

                        {/* Right Column: Live Working Team Photo (Unsplash fallback included) */}
                        <motion.div
                            variants={fadeInUp}
                            className="lg:col-span-6 rounded-3xl overflow-hidden shadow-2xl relative border border-slate-200 group aspect-[4/3]"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                                alt="adEstra Marketing Team"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent opacity-90 transition-opacity duration-300 flex items-end p-8">
                                <div>
                                    <p className="text-white text-lg font-bold tracking-tight">
                                        The adEstra Growth & Marketing Team
                                    </p>
                                    <p className="text-slate-300 text-xs font-medium mt-1">
                                        Collaborating, strategizing, and delivering measurable results daily.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </motion.div>
            </section>

        </div>
    );
}