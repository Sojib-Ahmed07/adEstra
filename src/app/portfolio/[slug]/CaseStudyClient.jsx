'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Clock3, Layers3, Sparkles } from 'lucide-react'


/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
        },
    },
}

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 50,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
}

const fadeIn = {
    hidden: {
        opacity: 0,
    },
    show: {
        opacity: 1,
        transition: {
            duration: 0.8,
        },
    },
}


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function CaseStudyClient({ project }) {
    return (
        <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">

            {/* =====================================================
                BACKGROUND DECORATION
            ===================================================== */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">

                <motion.div
                    animate={{
                        x: [0, 40, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.08, 1],
                    }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute -right-52 -top-52 h-[600px] w-[600px] rounded-full bg-[#22e3ad]/10 blur-3xl"
                />

                <motion.div
                    animate={{
                        x: [0, -30, 0],
                        y: [0, 35, 0],
                    }}
                    transition={{
                        duration: 16,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute -left-60 top-[45%] h-[500px] w-[500px] rounded-full bg-indigo-200/20 blur-3xl"
                />

                {/* Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:70px_70px]" />

            </div>


            {/* =====================================================
                CONTENT
            ===================================================== */}

            <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-16 sm:px-8 lg:pt-24">


                {/* =================================================
                    BACK BUTTON
                ================================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        x: -30,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                    className="mb-12"
                >

                    <Link
                        href="/portfolio"
                        className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500 transition-colors hover:text-slate-950"
                    >

                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white transition-all duration-300 group-hover:border-[#22e3ad] group-hover:bg-[#22e3ad]">
                            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                        </span>

                        Back to Portfolio

                    </Link>

                </motion.div>


                {/* =================================================
                    HERO
                ================================================= */}

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16"
                >

                    {/* LEFT */}
                    <div className="lg:col-span-8">

                        {/* Small Label */}
                        <motion.div
                            variants={fadeUp}
                            className="mb-6 flex items-center gap-4"
                        >

                            <span className="h-[2px] w-12 bg-[#22e3ad]" />

                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
                                Case Study
                            </span>

                        </motion.div>


                        {/* Title */}
                        <motion.h1
                            variants={fadeUp}
                            className="max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.045em] text-slate-950 sm:text-7xl lg:text-[92px]"
                        >
                            {project.title}
                        </motion.h1>


                        {/* Project Type */}
                        <motion.div
                            variants={fadeUp}
                            className="mt-8 flex flex-wrap items-center gap-3"
                        >

                            <span className="rounded-full bg-slate-950 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                                {project.industry}
                            </span>

                            <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                                {project.projectType}
                            </span>

                        </motion.div>

                    </div>


                    {/* RIGHT META */}
                    <motion.div
                        variants={fadeUp}
                        className="lg:col-span-4 lg:pt-12"
                    >

                        <div className="rounded-2xl border border-slate-200 bg-white/80 p-7 shadow-sm backdrop-blur-xl">

                            <MetaItem
                                label="Client"
                                value={project.client}
                            />

                            <MetaItem
                                label="Industry"
                                value={project.industry}
                            />

                            <MetaItem
                                label="Project"
                                value={project.projectType}
                            />

                            <MetaItem
                                label="Duration"
                                value={project.duration}
                                last
                            />

                        </div>

                    </motion.div>

                </motion.div>


                {/* =================================================
                    COVER IMAGE
                ================================================= */}

                {project.coverImage && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 80,
                            scale: 0.96,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        transition={{
                            duration: 1,
                            delay: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="group relative mt-20 overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-2xl"
                    >

                        <motion.img
                            src={project.coverImage}
                            alt={project.title}
                            className="h-[420px] w-full object-cover sm:h-[550px] lg:h-[680px]"
                            whileHover={{
                                scale: 1.04,
                            }}
                            transition={{
                                duration: 1,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        />

                        {/* Image Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70" />

                        {/* Floating Badge */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.7,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            transition={{
                                delay: 0.9,
                                duration: 0.5,
                            }}
                            className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full border border-white/30 bg-black/30 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-xl"
                        >
                            <Sparkles className="h-3.5 w-3.5 text-[#22e3ad]" />

                            Featured Project
                        </motion.div>

                    </motion.div>
                )}


                {/* =================================================
                    BACKGROUND + OBJECTIVES
                ================================================= */}

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{
                        once: true,
                        amount: 0.15,
                    }}
                    className="mt-28 grid grid-cols-1 gap-16 lg:grid-cols-12"
                >

                    {/* Background */}
                    <motion.div
                        variants={fadeUp}
                        className="lg:col-span-7"
                    >

                        <SectionLabel>
                            Background
                        </SectionLabel>

                        <p className="mt-7 text-lg leading-9 text-slate-600 sm:text-xl">
                            {project.background}
                        </p>

                    </motion.div>


                    {/* Objectives */}
                    {project.objectives?.length > 0 && (
                        <motion.div
                            variants={fadeUp}
                            className="lg:col-span-5"
                        >

                            <SectionLabel>
                                Objectives
                            </SectionLabel>

                            <div className="mt-7 space-y-4">

                                {project.objectives.map((obj, index) => (

                                    <motion.div
                                        key={index}
                                        initial={{
                                            opacity: 0,
                                            x: 30,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            x: 0,
                                        }}
                                        viewport={{
                                            once: true,
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.08,
                                        }}
                                        className="group flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#22e3ad]/50 hover:shadow-lg"
                                    >

                                        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#22e3ad]/15 text-xs font-black text-[#159f79]">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>

                                        <span className="text-sm leading-6 text-slate-600">
                                            {obj}
                                        </span>

                                    </motion.div>

                                ))}

                            </div>

                        </motion.div>
                    )}

                </motion.div>


                {/* =================================================
                    PROCESS
                ================================================= */}

                {project.process?.length > 0 && (
                    <motion.section
                        initial="hidden"
                        whileInView="show"
                        viewport={{
                            once: true,
                            amount: 0.1,
                        }}
                        variants={containerVariants}
                        className="mt-32"
                    >

                        <motion.div variants={fadeUp}>
                            <SectionLabel>
                                Process
                            </SectionLabel>

                            <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
                                From idea
                                <span className="text-slate-400">
                                    {' '}to execution.
                                </span>
                            </h2>
                        </motion.div>


                        {/* Timeline */}
                        <div className="relative mt-16">

                            {/* Connecting Line */}
                            <div className="absolute left-[23px] top-5 hidden h-[calc(100%-40px)] w-px bg-gradient-to-b from-[#22e3ad] via-slate-200 to-transparent sm:block" />


                            <div className="space-y-12">

                                {project.process.map((step, idx) => (

                                    <motion.div
                                        key={idx}
                                        variants={fadeUp}
                                        className="group relative grid grid-cols-1 gap-8 sm:grid-cols-[48px_1fr] sm:gap-10"
                                    >

                                        {/* Number */}
                                        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-black text-slate-500 shadow-sm transition-all duration-500 group-hover:border-[#22e3ad] group-hover:bg-[#22e3ad] group-hover:text-slate-950 group-hover:shadow-lg">

                                            {String(idx + 1).padStart(2, '0')}

                                        </div>


                                        {/* Content */}
                                        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:border-slate-300 group-hover:shadow-xl sm:p-9">

                                            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

                                                <h3 className="text-2xl font-extrabold tracking-tight text-slate-950">
                                                    {step.title}
                                                </h3>

                                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                                                    Step {idx + 1}
                                                </span>

                                            </div>


                                            {step.points?.length > 0 && (
                                                <div className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-2">

                                                    {step.points.map((pt, pIdx) => (

                                                        <motion.div
                                                            key={pIdx}
                                                            whileHover={{
                                                                x: 5,
                                                            }}
                                                            className="flex items-start gap-3 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-600 transition-colors hover:bg-[#22e3ad]/10"
                                                        >

                                                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#22e3ad]" />

                                                            <span>
                                                                {pt}
                                                            </span>

                                                        </motion.div>

                                                    ))}

                                                </div>
                                            )}

                                        </div>

                                    </motion.div>

                                ))}

                            </div>

                        </div>

                    </motion.section>
                )}


                {/* =================================================
                    GALLERY
                ================================================= */}

                {project.galleryImages?.length > 0 && (
                    <motion.section
                        initial="hidden"
                        whileInView="show"
                        viewport={{
                            once: true,
                            amount: 0.05,
                        }}
                        variants={containerVariants}
                        className="mt-32"
                    >

                        <motion.div variants={fadeUp}>
                            <SectionLabel>
                                Visuals
                            </SectionLabel>

                            <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
                                Project
                                <span className="text-slate-400">
                                    {' '}gallery.
                                </span>
                            </h2>
                        </motion.div>


                        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">

                            {project.galleryImages.map((url, idx) => (

                                <motion.div
                                    key={idx}
                                    variants={fadeUp}
                                    className={`
                                        group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100
                                        ${idx % 3 === 0 ? 'md:row-span-2' : ''}
                                    `}
                                >

                                    <motion.img
                                        src={url}
                                        alt={`Gallery ${idx + 1}`}
                                        className={`
                                            w-full object-cover
                                            ${idx % 3 === 0
                                                ? 'h-[500px] md:h-full'
                                                : 'h-[300px]'
                                            }
                                        `}
                                        whileHover={{
                                            scale: 1.08,
                                        }}
                                        transition={{
                                            duration: 0.8,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                    />

                                    <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/10" />

                                    <div className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-black/30 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100">
                                        0{idx + 1}
                                    </div>

                                </motion.div>

                            ))}

                        </div>

                    </motion.section>
                )}


                {/* =================================================
                    RESULTS
                ================================================= */}

                {project.results?.length > 0 && (
                    <motion.section
                        initial="hidden"
                        whileInView="show"
                        viewport={{
                            once: true,
                            amount: 0.15,
                        }}
                        variants={containerVariants}
                        className="mt-32"
                    >

                        <motion.div
                            variants={fadeUp}
                            className="overflow-hidden rounded-3xl bg-slate-950 p-8 text-white sm:p-12 lg:p-16"
                        >

                            {/* Background Glow */}
                            <div className="pointer-events-none absolute" />

                            <div className="relative">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#22e3ad] text-slate-950">
                                        <Sparkles className="h-4 w-4" />
                                    </div>

                                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
                                        Results
                                    </span>

                                </div>


                                <h2 className="mt-7 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
                                    What we
                                    <span className="text-[#22e3ad]">
                                        {' '}achieved.
                                    </span>
                                </h2>


                                <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">

                                    {project.results.map((res, index) => (

                                        <motion.div
                                            key={index}
                                            variants={fadeUp}
                                            whileHover={{
                                                y: -4,
                                            }}
                                            className="group rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:border-[#22e3ad]/40 hover:bg-white/[0.08]"
                                        >

                                            <div className="mb-5 flex items-center justify-between">

                                                <span className="text-xs font-bold text-[#22e3ad]">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>

                                                <ArrowUpRight className="h-4 w-4 text-slate-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#22e3ad]" />

                                            </div>

                                            <p className="text-base leading-7 text-slate-300">
                                                {res}
                                            </p>

                                        </motion.div>

                                    ))}

                                </div>

                            </div>

                        </motion.div>

                    </motion.section>
                )}


                {/* =================================================
                    BOTTOM CTA
                ================================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 40,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.7,
                    }}
                    className="mt-24 flex flex-col items-start justify-between gap-6 border-t border-slate-200 pt-10 sm:flex-row sm:items-center"
                >

                    <div>

                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
                            Have a project in mind?
                        </p>

                        <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                            Let&apos;s create something great.
                        </h3>

                    </div>


                    <Link href="/contact">

                        <motion.div
                            whileHover={{
                                scale: 1.04,
                            }}
                            whileTap={{
                                scale: 0.97,
                            }}
                            className="group flex items-center gap-3 rounded-full bg-[#22e3ad] px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-[#22e3ad]/20"
                        >

                            Let&apos;s Talk

                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />

                        </motion.div>

                    </Link>

                </motion.div>

            </div>

        </main>
    )
}


/* =========================================================
   SECTION LABEL
========================================================= */

function SectionLabel({ children }) {
    return (
        <div className="flex items-center gap-3">

            <span className="h-2 w-2 rounded-full bg-[#22e3ad]" />

            <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
                {children}
            </span>

        </div>
    )
}


/* =========================================================
   META ITEM
========================================================= */

function MetaItem({ label, value, last = false }) {
    return (
        <div
            className={`
                ${!last ? 'mb-6 border-b border-slate-100 pb-6' : ''}
            `}
        >

            <div className="flex items-center gap-2">

                {label === 'Duration' && (
                    <Clock3 className="h-3.5 w-3.5 text-[#159f79]" />
                )}

                {label === 'Project' && (
                    <Layers3 className="h-3.5 w-3.5 text-[#159f79]" />
                )}

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    {label}
                </p>

            </div>

            <p className="mt-2 text-sm font-bold text-slate-900">
                {value}
            </p>

        </div>
    )
}