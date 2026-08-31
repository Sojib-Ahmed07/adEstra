'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 60,
        scale: 0.96,
    },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export default function PortfolioClient({ projects }) {
    return (
        <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">

            {/* Background Decoration */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">

                <motion.div
                    animate={{
                        x: [0, 30, 0],
                        y: [0, -30, 0],
                        rotate: [0, 8, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#22e3ad]/10 blur-3xl"
                />

                <motion.div
                    animate={{
                        x: [0, -25, 0],
                        y: [0, 25, 0],
                    }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute -left-60 top-[35%] h-[450px] w-[450px] rounded-full bg-indigo-300/10 blur-3xl"
                />

                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:70px_70px]" />

            </div>

            {/* Main Content */}
            <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-28">

                {/* Header */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 40,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mb-20"
                >

                    {/* Small Label */}
                    <div className="mb-6 flex items-center gap-4">

                        <motion.div
                            initial={{
                                width: 0,
                            }}
                            animate={{
                                width: 55,
                            }}
                            transition={{
                                duration: 0.8,
                                delay: 0.2,
                            }}
                            className="h-[2px] bg-[#22e3ad]"
                        />

                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
                            Selected Work
                        </span>

                    </div>

                    {/* Heading */}
                    <div className="max-w-5xl">

                        <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.04em] text-slate-950 sm:text-7xl lg:text-8xl">
                            Our Work

                            <span className="block text-slate-400">
                                & Case Studies
                            </span>
                        </h1>

                    </div>

                    {/* Description */}
                    <div className="mt-8 flex flex-col justify-between gap-8 border-t border-slate-200 pt-8 sm:flex-row sm:items-end">

                        <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                            Discover how we help brands scale through strategic
                            content, visual identity design, and digital execution.
                        </p>

                        <motion.div
                            whileHover={{
                                x: 6,
                            }}
                            className="hidden items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-500 sm:flex"
                        >
                            <span>
                                Scroll to explore
                            </span>

                            <motion.span
                                animate={{
                                    y: [0, 5, 0],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                }}
                                className="text-lg text-[#22e3ad]"
                            >
                                ↓
                            </motion.span>
                        </motion.div>

                    </div>

                </motion.div>

                {/* Projects */}
                {projects.length === 0 ? (

                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.95,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        transition={{
                            duration: 0.6,
                        }}
                        className="rounded-2xl border border-slate-200 bg-white p-16 text-center shadow-sm"
                    >

                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                            <span className="text-2xl">
                                ✦
                            </span>
                        </div>

                        <p className="font-medium text-slate-500">
                            No case studies published yet.
                        </p>

                    </motion.div>

                ) : (

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{
                            once: true,
                            amount: 0.05,
                        }}
                        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                    >

                        {projects.map((project, index) => (

                            <motion.div
                                key={project._id}
                                variants={itemVariants}
                                className={`
                                    ${
                                        index % 5 === 1
                                            ? 'lg:translate-y-16'
                                            : ''
                                    }
                                    ${
                                        index % 5 === 4
                                            ? 'lg:translate-y-10'
                                            : ''
                                    }
                                `}
                            >

                                <Link
                                    href={`/portfolio/${project.slug}`}
                                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-slate-300 hover:shadow-2xl"
                                >

                                    {/* Image */}
                                    <div className="relative h-64 w-full overflow-hidden bg-slate-100">

                                        <motion.img
                                            src={project.coverImage}
                                            alt={project.title}
                                            className="h-full w-full object-cover"
                                            whileHover={{
                                                scale: 1.1,
                                            }}
                                            transition={{
                                                duration: 0.8,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                        />

                                        {/* Dark Overlay */}
                                        <div className="absolute inset-0 bg-slate-950/0 transition-all duration-500 group-hover:bg-slate-950/35" />

                                        {/* Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-70" />

                                        {/* Number */}
                                        <div className="absolute left-5 top-5">

                                            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/20 text-xs font-bold text-white backdrop-blur-md">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>

                                        </div>

                                        {/* Hover Arrow */}
                                        <motion.div
                                            className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#22e3ad] text-xl font-bold text-slate-950 shadow-lg"
                                            initial={{
                                                opacity: 0,
                                                scale: 0.7,
                                                rotate: -30,
                                            }}
                                            whileHover={{
                                                opacity: 1,
                                                scale: 1,
                                                rotate: 0,
                                            }}
                                        >
                                            ↗
                                        </motion.div>

                                        {/* Industry */}
                                        <div className="absolute bottom-5 left-5">

                                            <span className="rounded-full border border-white/30 bg-black/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                                                {project.industry}
                                            </span>

                                        </div>

                                    </div>

                                    {/* Card Content */}
                                    <div className="flex flex-1 flex-col justify-between p-6">

                                        <div>

                                            {/* Project Type */}
                                            <div className="mb-3 flex items-center gap-2">

                                                <span className="h-1.5 w-1.5 rounded-full bg-[#22e3ad]" />

                                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                                    {project.projectType}
                                                </span>

                                            </div>

                                            {/* Title */}
                                            <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 transition-colors duration-300 group-hover:text-[#159f79]">
                                                {project.title}
                                            </h2>

                                            {/* Client */}
                                            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                                Client: {project.client}
                                            </p>

                                            {/* Description */}
                                            <p className="mt-5 line-clamp-3 text-sm leading-7 text-slate-600">
                                                {project.background}
                                            </p>

                                        </div>

                                        {/* Footer */}
                                        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">

                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 transition-colors duration-300 group-hover:text-slate-900">
                                                View Case Study
                                            </span>

                                            <motion.div
                                                whileHover={{
                                                    x: 6,
                                                }}
                                                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-900 transition-all duration-300 group-hover:border-[#22e3ad] group-hover:bg-[#22e3ad]"
                                            >
                                                <ArrowIcon />
                                            </motion.div>

                                        </div>

                                    </div>

                                </Link>

                            </motion.div>

                        ))}

                    </motion.div>

                )}

            </div>

        </main>
    );
}

function ArrowIcon() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}