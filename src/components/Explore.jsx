'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PROCESS_STEPS = [
    {
        id: '01',
        title: 'Discovery & Strategy',
        description: 'Our professional team is dedicated to helping you achieve your digital goals through deep analysis and planning.',
        icon: (
            <svg className="w-12 h-12 stroke-[1.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
            </svg>
        ),
    },
    {
        id: '02',
        title: 'Design & Development',
        description: 'We craft bespoke, highly interactive digital products that elevate your visual identity and user engagement.',
        icon: (
            <svg className="w-12 h-12 stroke-[1.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
        ),
    },
    {
        id: '03',
        title: 'Launch & Optimize',
        description: 'Continuous monitoring, user testing, and performance optimization to ensure sustained long-term success.',
        icon: (
            <svg className="w-12 h-12 stroke-[1.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
    },
];

export default function ExploreSection() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section className="bg-[#f8fafc] text-slate-900 py-24 px-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header Section */}
                <div className="space-y-4">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-slate-300 text-xs font-semibold tracking-wider text-slate-700 uppercase">
                        ( WORK PROCESS )
                    </div>

                    <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-black tracking-tight text-slate-950">
                        Explore how we innovate
                    </h2>
                </div>

                {/* Process Cards Grid with Gap and Individual Borders */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {PROCESS_STEPS.map((step, index) => {
                        const isHovered = hoveredIndex === index;

                        return (
                            <div
                                key={step.id}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="relative overflow-hidden p-10 min-h-[380px] flex flex-col justify-between cursor-pointer border border-slate-900 bg-white shadow-xs"
                            >
                                {/* Slow, Smooth Background Fill Transition */}
                                <motion.div
                                    initial={false}
                                    animate={{
                                        x: isHovered ? '0%' : '-100%',
                                    }}
                                    transition={{
                                        duration: 0.7,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                    className="absolute inset-0 bg-[#18181b] z-0 pointer-events-none"
                                />

                                {/* Top Content: Icon */}
                                <div
                                    className="relative z-10 transition-colors duration-500 ease-out"
                                    style={{ color: isHovered ? '#ffffff' : '#0f172a' }}
                                >
                                    {step.icon}
                                </div>

                                {/* Bottom Content: Title & Description */}
                                <div className="relative z-10 space-y-4 pt-12">
                                    <h3
                                        className="text-2xl lg:text-[26px] font-bold tracking-tight transition-colors duration-500 ease-out"
                                        style={{ color: isHovered ? '#ffffff' : '#0f172a' }}
                                    >
                                        {step.title}
                                    </h3>

                                    <div className="overflow-hidden min-h-[60px]">
                                        <motion.p
                                            initial={false}
                                            animate={{
                                                opacity: isHovered ? 1 : 0.7,
                                                y: isHovered ? 0 : 4,
                                            }}
                                            transition={{ duration: 0.5 }}
                                            className="text-sm leading-relaxed font-normal transition-colors duration-500 ease-out"
                                            style={{ color: isHovered ? '#cbd5e1' : '#64748b' }}
                                        >
                                            {step.description}
                                        </motion.p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}