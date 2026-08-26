'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Compass,
    Settings,
    Home,
    Lightbulb,
    Cpu,
    Sparkles,
    ArrowUpRight,
    ShieldCheck,
    CheckCircle2
} from 'lucide-react';

// --- DATA STRUCTURES ---

const WHAT_WE_OFFER = [
    {
        id: '01',
        icon: Compass,
        title: 'Custom AI Model Training',
        points: [
            'ChatGPT Enterprise Integration',
            'DeepSeek Knowledge Base Setup',
            'Google Gemini Business Optimization',
            'Grok Platform Customization',
            'Your preferable any AI',
        ],
    },
    {
        id: '02',
        icon: Settings,
        title: 'Industry-Specific AI Positioning',
        points: [
            'Portfolio Optimization for AI Recognition',
            'Service Description AI Alignment',
            'Case Study Integration into AI Models',
            'Brand Voice Consistency Across Platforms',
        ],
    },
    {
        id: '03',
        icon: Home,
        title: 'AI Presence Management',
        points: [
            'Continuous Model Updates & Refinement',
            'Performance Analytics & Citation Tracking',
            'Competitive AI Positioning',
            'Multi-Platform AI Synchronization',
        ],
    },
];

const TRAINING_METHODOLOGY = [
    {
        id: '01',
        icon: Compass,
        title: 'Data Structuring',
        points: [
            'Brand Knowledge Base Development',
            'Industry Terminology Optimization',
            'Service Hierarchy Mapping',
            'Competitive Differentiation Scripting',
        ],
    },
    {
        id: '02',
        icon: Settings,
        title: 'Model Integration',
        points: [
            'Official API Partnerships',
            'Training Data Submission',
            'Quality Assurance Testing',
            'Cross-Platform Consistency Checks',
        ],
    },
    {
        id: '03',
        icon: Home,
        title: 'Performance Optimization',
        points: [
            'Citation Rate Monitoring',
            'Query Response Analysis',
            'Market Share Tracking',
            'Regular Model Retraining',
        ],
    },
];

const WHY_CHOOSE_ADESTRA = [
    {
        title: 'End-to-End Expertise',
        description:
            'From AutoCAD-driven design precision to AI-powered brand integration — we offer a full spectrum of digital solutions under one roof.',
    },
    {
        title: 'Strategy-First, Always',
        description:
            'We don’t just execute — we build. Every campaign, design, and content piece is rooted in a clear brand strategy tailored to your business goals.',
    },
    {
        title: 'Human-Centric + Tech-Enhanced',
        description:
            'We combine the best of both worlds: creative intuition and AI-powered scalability so your brand stays authentic.',
    },
    {
        title: 'Built for the Australian Market',
        description:
            'We speak your audience’s language with deep local insight to help Australian brands scale with relevance and impact.',
    },
    {
        title: 'Results You Can Measure',
        description:
            'Transparent reporting, actionable data, and clear KPIs so you always know your return on investment.',
    },
];

// --- ANIMATION VARIANTS ---

const fadeInUp = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
    },
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

export default function AITrainingPage() {
    return (
        <div className="w-full bg-white text-slate-900 font-sans min-h-screen overflow-x-hidden">

            {/* ========================================================= */}
            {/* SECTION 1: HERO & HEADING                                 */}
            {/* ========================================================= */}
            <section className="w-full px-6 sm:px-12 lg:px-20 pt-20 pb-24 text-center max-w-[1400px] mx-auto relative overflow-hidden">

                {/* Animated Radial Background Glow */}
                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-200/40 rounded-full blur-3xl -z-10 pointer-events-none"
                />

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={staggerContainer}
                    className="space-y-10 relative z-10"
                >
                    {/* Header Visual with Animated Floating Elements */}
                    <div className="relative w-full max-w-2xl mx-auto h-44 flex items-center justify-center">

                        {/* Floating Lightbulb */}
                        <motion.div
                            animate={{ y: [8, -8, 8], rotate: [4, -4, 4] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute left-[20%] text-amber-400 opacity-80"
                        >
                            <Lightbulb className="w-14 h-14 stroke-[1]" />
                        </motion.div>

                        {/* Floating Sparkles */}
                        <motion.div
                            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute top-2 right-[25%] text-emerald-400"
                        >
                            <Sparkles className="w-8 h-8" />
                        </motion.div>

                        {/* Central Interactive CPU Badge */}
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                            className="relative z-10 w-28 h-28 border-2 border-emerald-400 rounded-3xl flex items-center justify-center bg-white/90 backdrop-blur-md shadow-2xl shadow-emerald-500/20 cursor-pointer group"
                        >
                            <motion.div
                                animate={{ rotate: [0, -5, 5, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <Cpu className="w-12 h-12 text-slate-800 group-hover:text-emerald-600 transition-colors stroke-[1.5]" />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Headline with Gradient */}
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 tracking-tight leading-[1.08] max-w-5xl mx-auto"
                    >
                        AI Brand Integration – Dominate Your Industry’s{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-indigo-600">
                            AI Conversations
                        </span>
                    </motion.h1>

                    {/* Body Description */}
                    <motion.div
                        variants={fadeInUp}
                        className="max-w-3xl mx-auto space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed text-left sm:text-center"
                    >
                        <motion.p
                            whileHover={{ scale: 1.02 }}
                            className="font-bold text-slate-900 inline-block bg-emerald-50 px-5 py-2.5 rounded-full border border-emerald-200"
                        >
                            Your Brand, The Industry Authority – In Every AI Chat.
                        </motion.p>
                        <p>
                            Stop being invisible in the age of AI. We embed your brand’s expertise, services, and unique value directly into the knowledge base of leading AI models. When your future clients ask for the best in your field, your company is the cited source and definitive solution.
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 2: WHAT WE OFFER                                  */}
            {/* ========================================================= */}
            <section className="w-full px-6 sm:px-12 lg:px-16 py-20 border-t border-slate-100 bg-slate-50/60 relative">
                <div className="max-w-[1400px] mx-auto space-y-16">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center space-y-4"
                    >
                        <h2 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight">
                            What We Offer
                        </h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {WHAT_WE_OFFER.map((card) => {
                            const Icon = card.icon;
                            return (
                                <motion.div
                                    key={card.id}
                                    variants={fadeInUp}
                                    whileHover={{
                                        y: -12,
                                        scale: 1.02,
                                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)',
                                    }}
                                    transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                                    className="bg-white border border-slate-200/90 rounded-2xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group min-h-[420px]"
                                >
                                    {/* Top Animated Gradient Accent Bar */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <motion.div
                                                whileHover={{ rotate: [0, -10, 10, 0] }}
                                                transition={{ duration: 0.5 }}
                                                className="p-3.5 rounded-xl bg-slate-100 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300"
                                            >
                                                <Icon className="w-7 h-7 text-slate-800 group-hover:text-white stroke-[1.5]" />
                                            </motion.div>
                                            <span className="text-xs font-mono font-bold text-slate-400 border border-slate-200 px-3 py-1 rounded-full group-hover:border-emerald-500 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-colors">
                                                {card.id}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-slate-950 tracking-tight group-hover:text-emerald-900 transition-colors">
                                            {card.title}
                                        </h3>

                                        <ul className="space-y-2.5 pt-2">
                                            {card.points.map((point, i) => (
                                                <motion.li
                                                    key={i}
                                                    whileHover={{ x: 4 }}
                                                    className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5 group-hover:scale-150 transition-transform" />
                                                    <span>{point}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 3: OUR TRAINING METHODOLOGY                        */}
            {/* ========================================================= */}
            <section className="w-full px-6 sm:px-12 lg:px-16 py-20 bg-white relative">
                <div className="max-w-[1400px] mx-auto space-y-16">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center space-y-4"
                    >
                        <h2 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight">
                            Our Training Methodology
                        </h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {TRAINING_METHODOLOGY.map((step) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={step.id}
                                    variants={fadeInUp}
                                    whileHover={{
                                        y: -12,
                                        scale: 1.02,
                                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)',
                                    }}
                                    transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                                    className="bg-white border border-slate-200/90 rounded-2xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group min-h-[420px]"
                                >
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <motion.div
                                                whileHover={{ rotate: [0, -10, 10, 0] }}
                                                transition={{ duration: 0.5 }}
                                                className="p-3.5 rounded-xl bg-slate-100 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300"
                                            >
                                                <Icon className="w-7 h-7 text-slate-800 group-hover:text-white stroke-[1.5]" />
                                            </motion.div>
                                            <span className="text-xs font-mono font-bold text-slate-400 border border-slate-200 px-3 py-1 rounded-full group-hover:border-indigo-500 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors">
                                                {step.id}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-slate-950 tracking-tight group-hover:text-indigo-900 transition-colors">
                                            {step.title}
                                        </h3>

                                        <ul className="space-y-2.5 pt-2">
                                            {step.points.map((point, i) => (
                                                <motion.li
                                                    key={i}
                                                    whileHover={{ x: 4 }}
                                                    className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5 group-hover:scale-150 transition-transform" />
                                                    <span>{point}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 4: WHY CHOOSE ADESTRA                             */}
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
                            Why Choose Adestra?
                        </h2>
                        <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 px-4 py-2 rounded-full w-fit">
                            <ShieldCheck className="w-4 h-4" /> AI Integration Specialists
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Left Column: Bullet List with Hovers */}
                        <motion.div variants={fadeInUp} className="lg:col-span-6 space-y-6">
                            <div className="space-y-3">
                                {WHY_CHOOSE_ADESTRA.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ x: 6 }}
                                        className="space-y-1 p-3.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                                    >
                                        <h3 className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight flex items-center gap-2.5">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pl-7">
                                            {item.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="pt-2"
                            >
                                <a
                                    href="/contact"
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-slate-950 text-white font-bold text-sm hover:bg-emerald-600 transition-all duration-300 shadow-md hover:shadow-xl"
                                >
                                    Start Your AI Integration Today
                                    <ArrowUpRight className="w-4 h-4" />
                                </a>
                            </motion.div>
                        </motion.div>

                        {/* Right Column: Interactive Image Container */}
                        <motion.div
                            variants={fadeInUp}
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                            className="lg:col-span-6 rounded-3xl overflow-hidden shadow-2xl relative border border-slate-200 group aspect-[4/3]"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80"
                                alt="Adestra AI Team Workspace"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 transition-opacity duration-300 flex items-end p-8">
                                <div>
                                    <p className="text-white text-lg sm:text-xl font-bold tracking-tight">
                                        The Adestra AI & Strategy Team
                                    </p>
                                    <p className="text-slate-300 text-xs sm:text-sm font-medium mt-1">
                                        Building custom knowledge structures to position your brand as an AI market leader.
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