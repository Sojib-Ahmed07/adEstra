'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    // Lucide icon map — only what the admin <select> will offer
    Sparkles, Search, FileSearch, FileCode2, Globe2, MapPin, Wrench,
    BarChart, Target, TrendingUp, PenTool, FileText, Mail, Share2, BookOpen,
    Feather, Lightbulb, Zap, Languages, Ruler, Layout, Users, Printer, Shapes,
    Compass, Settings, Home, Cpu, Video, Image as ImageIcon, Building2, Film,
    Boxes, CheckCircle2, ArrowUpRight, Award, Briefcase, Camera, Code2, Database,
    Heart, Layers, LineChart, Megaphone, MessageSquare, Monitor, Palette,
    Rocket, ShieldCheck, ShoppingBag, Smartphone, Star, ThumbsUp, Wand2,
} from 'lucide-react'

// Icon name → component. Fallback = Sparkles (never crashes on unknown names).
const ICONS = {
    Sparkles, Search, FileSearch, FileCode2, Globe2, MapPin, Wrench,
    BarChart, Target, TrendingUp, PenTool, FileText, Mail, Share2, BookOpen,
    Feather, Lightbulb, Zap, Languages, Ruler, Layout, Users, Printer, Shapes,
    Compass, Settings, Home, Cpu, Video, ImageIcon, Building2, Film,
    Boxes, CheckCircle2, Award, Briefcase, Camera, Code2, Database,
    Heart, Layers, LineChart, Megaphone, MessageSquare, Monitor, Palette,
    Rocket, ShieldCheck, ShoppingBag, Smartphone, Star, ThumbsUp, Wand2,
}

function getIcon(name) {
    return ICONS[name] || Sparkles
}

/* =========================================================
   ANIMATION VARIANTS (match existing service pages)
   ========================================================= */
const fadeInUp = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
    },
}

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

export default function ServiceDetailClient({ service }) {
    const {
        title,
        heroHeading,
        heroIntro,
        heroHighlight,
        heroIconImage,
        coverImage,
        offerCards = [],
        whyChoose = [],
    } = service || {}

    const heading = heroHeading || title || 'Our Service'
    const hasOfferCards = offerCards.length > 0
    const hasWhyChoose = whyChoose.length > 0

    return (
        <div className="w-full bg-white text-slate-900 font-sans min-h-screen overflow-x-hidden">

            {/* ========================================================= */}
            {/* SECTION 1: HERO                                          */}
            {/* ========================================================= */}
            <section className="w-full px-6 sm:px-12 lg:px-20 pt-20 pb-24 text-center max-w-[1400px] mx-auto relative overflow-hidden">

                {/* Animated radial glow */}
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
                    className="space-y-10 relative z-10"
                >
                    {/* Hero central badge — uploaded image OR fallback icon */}
                    <div className="relative w-full max-w-2xl mx-auto h-44 flex items-center justify-center">

                        <motion.div
                            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute top-2 right-[26%] text-teal-400"
                        >
                            <Sparkles className="w-8 h-8" />
                        </motion.div>

                        <motion.div
                            animate={{ rotate: 360, y: [-4, 4, -4] }}
                            transition={{
                                rotate: { duration: 26, repeat: Infinity, ease: 'linear' },
                                y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                            }}
                            className="absolute -top-2 left-12 text-teal-300 opacity-70"
                        >
                            <Shapes className="w-16 h-16 stroke-[1]" />
                        </motion.div>

                        <motion.div
                            animate={{ y: [8, -8, 8], rotate: [4, -4, 4] }}
                            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute bottom-2 right-12 text-amber-300 opacity-80"
                        >
                            <Lightbulb className="w-16 h-16 stroke-[1]" />
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.08, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                            className="relative z-10 w-28 h-28 border-2 border-teal-400 rounded-3xl flex items-center justify-center bg-white/90 backdrop-blur-md shadow-2xl shadow-teal-500/20 cursor-pointer group"
                        >
                            {heroIconImage ? (
                                <img
                                    src={heroIconImage}
                                    alt={`${title} icon`}
                                    className="w-16 h-16 object-contain"
                                />
                            ) : (
                                <motion.div
                                    animate={{ rotate: [0, -5, 5, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    <Sparkles className="w-12 h-12 text-slate-800 group-hover:text-teal-600 transition-colors stroke-[1.5]" />
                                </motion.div>
                            )}
                        </motion.div>
                    </div>

                    {/* Heading */}
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 tracking-tight leading-[1.08] max-w-5xl mx-auto"
                    >
                        {heading}
                    </motion.h1>

                    {/* Intro + optional highlight pill */}
                    {(heroIntro || heroHighlight) && (
                        <motion.div
                            variants={fadeInUp}
                            className="max-w-3xl mx-auto space-y-6 text-slate-600 text-base sm:text-lg leading-relaxed text-left sm:text-center"
                        >
                            {heroIntro && (
                                <p className="whitespace-pre-line">{heroIntro}</p>
                            )}
                            {heroHighlight && (
                                <motion.p
                                    whileHover={{ scale: 1.02 }}
                                    className="font-bold text-slate-900 inline-block bg-teal-50 px-5 py-2.5 rounded-full border border-teal-200"
                                >
                                    {heroHighlight}
                                </motion.p>
                            )}
                        </motion.div>
                    )}
                </motion.div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 2: OFFER CARDS                                   */}
            {/* ========================================================= */}
            {hasOfferCards && (
                <section className="w-full px-6 sm:px-12 lg:px-16 py-20 border-t border-slate-100 bg-slate-50/60 relative">
                    <div className="max-w-[1500px] mx-auto space-y-16">

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
                            className="flex flex-wrap justify-center gap-8"
                        >
                            {offerCards.map((card, index) => {
                                const Icon = getIcon(card.icon)
                                return (
                                    <motion.div
                                        key={index}
                                        variants={fadeInUp}
                                        whileHover={{
                                            y: -12,
                                            scale: 1.02,
                                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)',
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
                                                    className="p-3.5 rounded-xl bg-slate-100 group-hover:bg-teal-500 transition-colors duration-300"
                                                >
                                                    <Icon className="w-7 h-7 text-slate-800 group-hover:text-white stroke-[1.5] transition-colors" />
                                                </motion.div>

                                                <span className="text-xs font-mono font-bold text-slate-400 border border-slate-200 px-3 py-1 rounded-full group-hover:border-teal-500 group-hover:text-teal-600 group-hover:bg-teal-50 transition-colors">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                            </div>

                                            {card.title && (
                                                <h3 className="text-2xl font-bold text-slate-950 tracking-tight leading-snug group-hover:text-teal-900 transition-colors">
                                                    {card.title}
                                                </h3>
                                            )}

                                            {card.description && (
                                                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                                                    {card.description}
                                                </p>
                                            )}

                                            {card.points && card.points.length > 0 && (
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
                                            )}
                                        </div>

                                        {card.footer && (
                                            <div className="pt-8 mt-6 border-t border-slate-100">
                                                <p className="text-xs text-slate-400 leading-relaxed italic group-hover:text-slate-600 transition-colors">
                                                    {card.footer}
                                                </p>
                                            </div>
                                        )}
                                    </motion.div>
                                )
                            })}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* ========================================================= */}
            {/* SECTION 3: WHY CHOOSE ADESTRA                            */}
            {/* ========================================================= */}
            {hasWhyChoose && (
                <section className="w-full px-6 sm:px-12 lg:px-20 py-24 max-w-[1400px] mx-auto border-t border-slate-100">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={staggerContainer}
                        className="space-y-16"
                    >
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                            <h2 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight leading-tight">
                                Why Choose adEstra?
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            {/* Left: bullet list */}
                            <motion.div variants={fadeInUp} className="lg:col-span-6 space-y-6">
                                <div className="space-y-4">
                                    {whyChoose.map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ x: 6 }}
                                            className="space-y-1.5 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                                        >
                                            {item.title && (
                                                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight flex items-center gap-2.5">
                                                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                                                    {item.title}
                                                </h3>
                                            )}
                                            {item.description && (
                                                <p className="text-slate-600 text-sm sm:text-base leading-relaxed pl-7">
                                                    {item.description}
                                                </p>
                                            )}
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
                                        Start Your Project
                                        <ArrowUpRight className="w-4 h-4" />
                                    </a>
                                </motion.div>
                            </motion.div>

                            {/* Right: cover image (only if provided) */}
                            {coverImage ? (
                                <motion.div
                                    variants={fadeInUp}
                                    whileHover={{ scale: 1.01 }}
                                    transition={{ type: 'spring', stiffness: 200 }}
                                    className="lg:col-span-6 rounded-3xl overflow-hidden shadow-2xl relative border border-slate-200 group aspect-[4/3]"
                                >
                                    <img
                                        src={coverImage}
                                        alt={title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 transition-opacity duration-300 flex items-end p-8">
                                        <div>
                                            <p className="text-white text-lg sm:text-xl font-bold tracking-tight">
                                                The adEstra {title} Team
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    variants={fadeInUp}
                                    className="lg:col-span-6 rounded-3xl bg-neutral-900 p-8 sm:p-12 relative overflow-hidden flex items-center justify-center min-h-[300px] shadow-2xl"
                                >
                                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                                    <div className="relative z-10 text-center">
                                        <Sparkles className="w-10 h-10 text-teal-400 mx-auto mb-4" />
                                        <p className="text-white/80 text-sm font-semibold tracking-wide">
                                            Ready when you are.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </section>
            )}

        </div>
    )
}