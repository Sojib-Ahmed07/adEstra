'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Ruler,
    Layout,
    Users,
    Printer,
    PenTool,
    Lightbulb,
    Shapes,
    CheckCircle2,
    ArrowUpRight
} from 'lucide-react';

// --- DATA ---

const DESIGN_CAPABILITIES = [
    {
        id: '01',
        icon: Ruler,
        title: 'Brand Identity Design',
        description: 'Your brand identity is your voice, your presence, your reputation — all visualized into one. We develop cohesive branding systems that include:',
        points: [
            'Logo Design & Concept',
            'Color Palette & Typography',
            'Brand Style Guides',
            'Visual Storytelling',
        ],
        footer: 'We ensure your brand looks memorable, professional, and aligned with your core values.',
    },
    {
        id: '02',
        icon: Layout,
        title: 'UI/UX Design',
        description: 'Exceptional design starts with empathy. We design intuitive digital experiences that feel natural, reduce friction, and keep users engaged. Our UI/UX services cover:',
        points: [
            'Website & Web App Interface Design',
            'Mobile App Design (iOS & Android)',
            'Wireframes & Interactive Prototypes',
            'User Journey & Flow Optimization',
        ],
        footer: 'We focus on both beauty and usability, ensuring that your platform delights users at every touchpoint.',
    },
    {
        id: '03',
        icon: Users,
        title: 'Social Media Creative Design',
        description: 'Social platforms demand scroll-stopping visuals. We create engaging and branded content tailored to your tone, audience, and campaign goals:',
        points: [
            'Instagram & Facebook Posts',
            'Ad Creatives & Banners',
            'Reels Covers & Story Templates',
            'Highlight Icons & Page Branding',
        ],
        footer: 'Let your feed be your best salesperson.',
    },
    {
        id: '04',
        icon: Printer,
        title: 'Marketing & Print Collaterals',
        description: 'Even in a digital age, tangible design still matters. Whether you’re pitching, promoting, or presenting, we design materials that communicate with clarity and confidence:',
        points: [
            'Brochures & Flyers',
            'Business Cards & Letterheads',
            'Presentation Decks',
            'Posters & Event Banners',
        ],
        footer: 'We make your offline presence just as compelling as your online image.',
    },
];

const TRUSTED_PARTNERS = [
    { name: 'Hulk', logo: 'Hulk' },
    { name: 'Maximum Factory', logo: 'MAXIMUM FACTORY' },
    { name: 'Apex Media', logo: 'APEX MEDIA' },
    { name: 'Vanguard Studios', logo: 'VANGUARD' },
    { name: 'Aura Design', logo: 'AURA' },
    { name: 'Monolith', logo: 'MONOLITH' },
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

export default function DesignServicesPage() {
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

                        {/* Background floating geometric shapes */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                            className="absolute -top-6 left-12 text-teal-300 opacity-60"
                        >
                            <Shapes className="w-16 h-16 stroke-[1]" />
                        </motion.div>

                        <motion.div
                            animate={{ y: [-6, 6, -6] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute bottom-2 right-12 text-amber-300 opacity-70"
                        >
                            <Lightbulb className="w-16 h-16 stroke-[1]" />
                        </motion.div>

                        {/* Central Hexagon Pen Icon */}
                        <motion.div
                            whileHover={{ scale: 1.08, rotate: 5 }}
                            className="relative z-10 w-28 h-28 border-2 border-teal-400 rounded-3xl flex items-center justify-center bg-white/80 backdrop-blur-sm shadow-xl shadow-teal-500/10 cursor-pointer"
                        >
                            <PenTool className="w-12 h-12 text-slate-800 stroke-[1.5]" />
                        </motion.div>
                    </div>

                    {/* Heading */}
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 tracking-tight leading-[1.08] max-w-5xl mx-auto"
                    >
                        Design Services That Speak Louder Than Words
                    </motion.h1>

                    {/* Intro Description */}
                    <motion.div
                        variants={fadeInUp}
                        className="max-w-3xl mx-auto space-y-6 text-slate-600 text-base sm:text-lg leading-relaxed text-left sm:text-center"
                    >
                        <p>
                            At <strong className="text-slate-900 font-bold">Adestra</strong>, we believe that design is more than just visual appeal, it&apos;s a powerful communication tool. It&apos;s the first impression, the lasting identity, and the emotional connection your audience builds with your brand. From branding to UI/UX, from digital to print, we design experiences that leave a mark.
                        </p>

                        <p>
                            Whether you&apos;re a startup looking to build a compelling identity or an established business seeking to reimagine your brand visuals, our design solutions are tailored to help you stand out in today&apos;s competitive market.
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 2: OUR DESIGN CAPABILITIES (4 CARDS)             */}
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
                        Our Design Capabilities
                    </motion.h2>

                    {/* Grid Cards */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {DESIGN_CAPABILITIES.map((card) => {
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
                                        {/* Header Row with Badge Number */}
                                        <div className="flex items-center justify-between">
                                            <div className="p-3.5 rounded-xl bg-slate-100 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                                                <Icon className="w-7 h-7 text-slate-800 group-hover:text-teal-600 stroke-[1.5]" />
                                            </div>
                                            <span className="text-xs font-mono font-bold text-slate-400 border border-slate-200 px-3 py-1 rounded-full group-hover:border-slate-900 group-hover:text-slate-900 transition-colors">
                                                {card.id}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl font-bold text-slate-950 tracking-tight leading-snug">
                                            {card.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                                            {card.description}
                                        </p>

                                        {/* Bullet Points */}
                                        <ul className="space-y-2.5 pt-2">
                                            {card.points.map((point, i) => (
                                                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800 shrink-0 mt-1.5" />
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Footer Note */}
                                    <div className="pt-8 mt-6 border-t border-slate-100">
                                        <p className="text-xs text-slate-400 leading-relaxed italic">
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
            {/* SECTION 3: SPECIAL OFFER & WHY CHOOSE US                 */}
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
                        className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight max-w-2xl leading-tight"
                    >
                        Special offer! choose your pack today
                    </motion.h2>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Left Column: Why Choose Us */}
                        <motion.div variants={fadeInUp} className="lg:col-span-6 space-y-8">
                            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                                Why Choose Us?
                            </h3>

                            <ul className="space-y-4">
                                {[
                                    'Creative meets strategy',
                                    'Fast turnaround, quality delivery',
                                    'Experienced designers who care about results',
                                    'Scalable solutions for startups to enterprises',
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-3 text-base sm:text-lg text-slate-700 font-medium">
                                        <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-4">
                                <a
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-950 text-white font-bold text-sm hover:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-lg"
                                >
                                    Get A Custom Quote
                                    <ArrowUpRight className="w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>

                        {/* Right Column: Visual Mockup Showcase */}
                        <motion.div
                            variants={fadeInUp}
                            className="lg:col-span-6 rounded-3xl bg-neutral-900 p-8 sm:p-12 relative overflow-hidden flex items-center justify-center min-h-[380px] shadow-2xl"
                        >
                            {/* Background texture pattern */}
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

                            <div className="relative z-10 flex items-center justify-center gap-4 sm:gap-6 flex-wrap sm:flex-nowrap">
                                {/* Left Flyer */}
                                <motion.div
                                    whileHover={{ scale: 1.05, rotate: -3 }}
                                    className="w-36 sm:w-44 bg-amber-400 text-slate-950 p-4 rounded-xl shadow-lg border border-white/20 transform -rotate-6 transition-transform"
                                >
                                    <span className="text-[10px] font-black tracking-widest uppercase bg-slate-950 text-amber-400 px-2 py-0.5 rounded">
                                        VARIETY OVERLOADED
                                    </span>
                                    <h4 className="text-xl font-black mt-4 leading-tight uppercase">
                                        TASTIER TASTIER TASTIER
                                    </h4>
                                    <p className="text-[10px] mt-2 font-bold opacity-80">
                                        Premium Quality Menu Mockup
                                    </p>
                                </motion.div>

                                {/* Center Phone Frame */}
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="w-44 sm:w-52 bg-slate-950 border-4 border-slate-700 rounded-[2.5rem] p-3 shadow-2xl z-20"
                                >
                                    <div className="bg-slate-100 rounded-[2rem] p-4 text-center text-slate-900 min-h-[220px] flex flex-col justify-between items-center">
                                        <span className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto" />
                                        <div className="my-6">
                                            <span className="text-3xl">🍔</span>
                                            <p className="text-xs font-bold uppercase tracking-wider mt-2">
                                                Have a Tasty Ramadan, More!
                                            </p>
                                        </div>
                                        <span className="text-[9px] text-slate-400 font-mono">App Interface</span>
                                    </div>
                                </motion.div>

                                {/* Right Card */}
                                <motion.div
                                    whileHover={{ scale: 1.05, rotate: 3 }}
                                    className="w-36 sm:w-44 bg-white text-slate-900 p-4 rounded-xl shadow-lg border border-slate-200 transform rotate-6 transition-transform"
                                >
                                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
                                        MAKE YOUR OWN
                                    </span>
                                    <h4 className="text-xl font-black tracking-tight mt-1">BURGER</h4>
                                    <div className="w-full h-16 bg-amber-100 rounded-lg mt-3 flex items-center justify-center text-2xl">
                                        🥪
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                    </div>
                </motion.div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 4: TRUSTED PARTNERS (INFINITE MARQUEE SLIDER)    */}
            {/* ========================================================= */}
            <section className="w-full py-16 border-t border-b border-slate-200 overflow-hidden bg-slate-50">
                <div className="max-w-[1500px] mx-auto px-6 sm:px-12 mb-8">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                        ( TRUSTED PARTNERS )
                    </span>
                </div>

                {/* Infinite Scroll Wrapper */}
                <div className="relative w-full flex overflow-hidden group">
                    <motion.div
                        animate={{ x: ['0%', '-50%'] }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        className="flex items-center gap-16 whitespace-nowrap shrink-0 pr-16"
                    >
                        {[...TRUSTED_PARTNERS, ...TRUSTED_PARTNERS, ...TRUSTED_PARTNERS].map((partner, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-16 group/item cursor-pointer"
                            >
                                <span className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tighter uppercase grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                    {partner.logo}
                                </span>
                                <span className="h-8 w-[1px] bg-slate-300" />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

        </div>
    );
}