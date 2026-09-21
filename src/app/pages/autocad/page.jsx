'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Ruler,
    Lightbulb,
    Sparkles,
    Video,
    Image as ImageIcon,
    Building2,
    Film,
    Boxes,
    CheckCircle2,
    ArrowUpRight
} from 'lucide-react';

// --- DATA ---

const VISUALIZATION_SERVICES = [
    {
        id: '01',
        icon: Video,
        title: 'Animated Walkthrough & Flythrough Videos',
        description: 'Cinematic interior and exterior property walkthrough videos that bring unbuilt spaces to life.',
        points: [
            'Interior Walkthroughs',
            'Exterior Flythroughs',
            'Smooth Camera Motion',
            'Realistic Lighting & Atmospheres',
        ],
        footer: 'Immersive property tours that make buyers feel like they are already there.',
    },
    {
        id: '02',
        icon: ImageIcon,
        title: 'Photorealistic 3D Renders',
        description: 'High-impact 3D imagery tailored for real estate listings, marketing brochures, and social media.',
        points: [
            'High-Resolution Still Renders',
            'Brochure & Print Quality Visuals',
            'Social Media Ready Content',
            'Marketing-Focused Angles',
        ],
        footer: 'Stunning visual assets designed to sell projects before they are built.',
    },
    {
        id: '03',
        icon: Building2,
        title: 'Exterior & Interior Visualizations',
        description: 'Comprehensive rendering for complete developments, individual units, and custom spaces.',
        points: [
            'Buildings, Villas & Apartment Complexes',
            'Entire Community Master Plans',
            'Furnished, Staged & Beautifully Lit Interiors',
            'True-to-Scale Materials & Textures',
        ],
        footer: 'Polished interior and exterior spaces showcased at their absolute best.',
    },
    {
        id: '04',
        icon: Film,
        title: '3D Modeling & Branded Video Production',
        description: 'End-to-end service from raw CAD files to fully edited marketing videos.',
        points: [
            '3D Models Built from AutoCAD & Sketches',
            'Fully Edited Videos with Music & Transitions',
            'Custom Branding & Logo Integration',
            'Ready-to-Post Final Deliverables',
        ],
        footer: 'Turnkey visual marketing solutions ready for immediate campaign deployment.',
    },
];

const WHY_CAD_POINTS = [
    {
        title: 'Civil Engineering Background',
        description: '5+ years working on real infrastructure projects ensures true-to-scale, accurate 3D modeling.',
    },
    {
        title: 'Revit, Twinmotion & 3ds Max Expertise',
        description: 'Utilizing industry-standard tools to deliver photorealistic lighting, materials, and fluid animation.',
    },
    {
        title: 'Pre-Construction Sales Impact',
        description: 'Help real estate developers, agents, and architects sell projects faster before breaking ground.',
    },
    {
        title: 'End-to-End Execution',
        description: 'From raw floor plans and CAD files to fully edited, branded videos with custom audio and transitions.',
    },
    {
        title: 'Scalable Solutions',
        description: 'Whether marketing a single residential unit or an entire commercial development, we deliver consistent quality.',
    },
];

// --- ANIMATION VARIANTS ---

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
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    },
};

export default function CADServicesPage() {
    return (
        <div className="w-full bg-white text-slate-900 font-sans min-h-screen overflow-x-hidden">

            {/* ========================================================= */}
            {/* SECTION 1: HERO & HEADING                                */}
            {/* ========================================================= */}
            <section className="w-full px-6 sm:px-12 lg:px-20 pt-20 pb-24 text-center max-w-[1400px] mx-auto relative overflow-hidden">

                {/* Background Radial Glow */}
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
                    {/* Header Visual */}
                    <div className="relative w-full max-w-2xl mx-auto h-44 flex items-center justify-center">

                        {/* Rotating Gear Icon */}
                        <motion.div
                            animate={{ rotate: 360, y: [-6, 6, -6] }}
                            transition={{
                                rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
                                y: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
                            }}
                            className="absolute -top-2 left-12 text-slate-300 opacity-80"
                        >
                            <Boxes className="w-16 h-16 stroke-[1]" />
                        </motion.div>

                        {/* Floating Lightbulb Icon */}
                        <motion.div
                            animate={{ y: [8, -8, 8], rotate: [5, -5, 5] }}
                            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute bottom-2 right-12 text-amber-300 opacity-80"
                        >
                            <Lightbulb className="w-16 h-16 stroke-[1]" />
                        </motion.div>

                        {/* Floating Sparkles */}
                        <motion.div
                            animate={{ scale: [0.8, 1.25, 0.8], opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute top-1 right-28 text-teal-400"
                        >
                            <Sparkles className="w-8 h-8" />
                        </motion.div>

                        {/* Main Interactive Hexagon Badge */}
                        <motion.div
                            whileHover={{ scale: 1.12, rotate: 6 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                            className="relative z-10 w-28 h-28 border-2 border-teal-400 rounded-3xl flex items-center justify-center bg-white/90 backdrop-blur-md shadow-2xl shadow-teal-500/20 cursor-pointer group"
                        >
                            <motion.div
                                animate={{ rotate: [0, -5, 5, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <Ruler className="w-12 h-12 text-slate-800 group-hover:text-teal-600 transition-colors stroke-[1.5]" />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Headline */}
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 tracking-tight leading-[1.08] max-w-5xl mx-auto"
                    >
                        Photorealistic{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-teal-700 to-slate-900">
                            3D Visualization
                        </span>{' '}
                        & Cinematic Walkthroughs
                    </motion.h1>

                    {/* Body Description */}
                    <motion.div
                        variants={fadeInUp}
                        className="max-w-3xl mx-auto space-y-6 text-slate-600 text-base sm:text-lg leading-relaxed text-left sm:text-center"
                    >
                        <p>
                            We help <strong className="text-slate-900 font-bold">real estate developers, agents, and architects</strong> sell projects before they're built — by turning 2D plans and CAD files into <strong className="text-slate-900 font-bold">photorealistic 3D visualizations and cinematic property walkthrough videos</strong>.
                        </p>

                        <p>
                            With a civil engineering background and 5+ years working on real infrastructure projects, we model accurately and true-to-scale using <strong className="text-slate-900 font-bold">Revit, Twinmotion, and 3ds Max</strong>. We bring spaces to life with realistic lighting, materials, and smooth camera motion.
                        </p>

                        <motion.p
                            whileHover={{ scale: 1.02 }}
                            className="font-bold text-slate-900 inline-block bg-teal-50 px-5 py-2.5 rounded-full border border-teal-200"
                        >
                            Send us your plans and let's bring your project to life.
                        </motion.p>
                    </motion.div>
                </motion.div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 2: WHAT WE OFFER (4 CARDS FLEX GRID)             */}
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
                            What We Create For You
                        </h2>
                        <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto">
                            High-impact 3D renders, video tours, and models tailored for pre-construction marketing.
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
                        {VISUALIZATION_SERVICES.map((card) => {
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
                                    className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] min-w-[280px] max-w-sm bg-white border border-slate-200/90 rounded-2xl p-8 flex flex-col justify-between shadow-sm transition-all duration-300 group relative overflow-hidden"
                                >
                                    {/* Top Accent Hover Bar */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <div className="space-y-6">
                                        {/* Header Icon and ID */}
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

                                        {/* Bullet Points */}
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

                                    {/* Card Footer */}
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
            {/* SECTION 3: WHY CHOOSE ADESTRA FOR 3D VISUALIZATION?      */}
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
                            Why Choose adEstra for 3D Visualization?
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Left Column: Bullet List */}
                        <motion.div variants={fadeInUp} className="lg:col-span-6 space-y-6">
                            <div className="space-y-4">
                                {WHY_CAD_POINTS.map((item, idx) => (
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

                            {/* Call to Action Button */}
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="pt-4"
                            >
                                <a
                                    href="/contact"
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-slate-950 text-white font-bold text-sm hover:bg-teal-600 transition-all duration-300 shadow-md hover:shadow-xl"
                                >
                                    Bring Your Project to Life
                                    <ArrowUpRight className="w-4 h-4" />
                                </a>
                            </motion.div>
                        </motion.div>

                        {/* Right Column: Interactive Team Visual Container */}
                        <motion.div
                            variants={fadeInUp}
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                            className="lg:col-span-6 rounded-3xl overflow-hidden shadow-2xl relative border border-slate-200 group aspect-[4/3]"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                                alt="adEstra 3D Visualization & Architectural Rendering Team"
                                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 transition-opacity duration-300 flex items-end p-8">
                                <motion.div initial={{ y: 10 }} whileHover={{ y: 0 }}>
                                    <p className="text-white text-lg sm:text-xl font-bold tracking-tight">
                                        The adEstra 3D Visualization Team
                                    </p>
                                    <p className="text-slate-300 text-xs sm:text-sm font-medium mt-1">
                                        Crafting photorealistic 3D renders, architectural flythroughs, and video tours using Revit, Twinmotion, and 3ds Max.
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