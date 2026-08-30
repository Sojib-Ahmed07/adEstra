'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const WORKS = [
    {
        id: 1,
        title: 'Brand: Give for Goods',
        category: 'Branding / Identity',
        year: '2023',
        bgColor: 'bg-[#f3f4f6]',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    },
    {
        id: 2,
        title: 'TVC : Company profile',
        category: 'Commercial / Film',
        year: '2024',
        bgColor: 'bg-[#0f172a]',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    },
    {
        id: 3,
        title: '360 Automotive solutions',
        category: 'Digital Product',
        year: '2022',
        bgColor: 'bg-[#7dd3fc]',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    },
];

export default function ShowcaseSection() {
    const sectionRef = useRef(null);

    // Track scroll progress through the main section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    });

    // 1. Position Y: Starts offset -> locks into center position
    const titleY = useTransform(
        scrollYProgress,
        [0, 0.2, 0.75],
        ['-15vh', '0vh', '0vh']
    );

    // 2. Scale: Grows behind cards as you scroll down
    const titleScale = useTransform(
        scrollYProgress,
        [0, 0.25, 0.75],
        [1, 1.8, 1.8]
    );

    // 3. Opacity: Remains solid -> fades out near section end
    const titleOpacity = useTransform(
        scrollYProgress,
        [0, 0.1, 0.65, 0.85],
        [1, 1, 1, 0]
    );

    // 4. Hide element completely at end of section
    const titleDisplay = useTransform(scrollYProgress, (progress) =>
        progress >= 0.85 ? 'none' : 'block'
    );

    return (
        <section className="bg-[#18181b] font-sans relative text-white">

            {/* DESKTOP VIEW (≥ sm): Stacking Card Scroll Animations */}
            <div
                ref={sectionRef}
                className="hidden sm:block relative w-full bg-[#18181b] px-6 lg:px-12 min-h-[230vh]"
            >
                {/* Sticky Background Title Stage */}
                <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                    <motion.h1
                        style={{
                            y: titleY,
                            scale: titleScale,
                            opacity: titleOpacity,
                            display: titleDisplay,
                        }}
                        className="text-[14vw] font-black tracking-wider text-white uppercase leading-none select-none origin-center text-center w-full transform-gpu"
                    >
                        WORKS
                    </motion.h1>
                </div>

                {/* Stacking Cards Stream */}
                <div className="relative z-10 max-w-3xl mx-auto -mt-[65vh] space-y-12 lg:space-y-16 pb-24">
                    {WORKS.map((work, index) => (
                        <DesktopStackCard
                            key={work.id}
                            work={work}
                            index={index}
                            total={WORKS.length}
                            sectionProgress={scrollYProgress}
                        />
                    ))}
                </div>
            </div>

            {/* MOBILE VIEW (< sm): Pure Static Stack Layout */}
            <div className="block sm:hidden w-full bg-[#18181b] px-3 py-8">
                <div className="text-center py-4 mb-2">
                    <h2 className="text-4xl font-black tracking-wider text-white uppercase leading-none">
                        WORKS
                    </h2>
                </div>

                <div className="space-y-4">
                    {WORKS.map((work) => (
                        <div
                            key={work.id}
                            className="bg-white rounded-xl overflow-hidden shadow-lg border border-slate-100/10"
                        >
                            <div className={`relative h-[180px] xs:h-[220px] ${work.bgColor} overflow-hidden p-3 flex items-center justify-center`}>
                                <img
                                    src={work.image}
                                    alt={work.title}
                                    className="w-full h-full object-cover rounded-lg shadow-md"
                                />
                            </div>
                            <div className="p-4 bg-white flex justify-between items-center text-slate-950">
                                <div>
                                    <h3 className="text-lg font-extrabold tracking-tight break-words">
                                        {work.title}
                                    </h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                        {work.category} • {work.year}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}

function DesktopStackCard({ work, index, total, sectionProgress }) {
    // Subtle scale-down effect for earlier cards as new ones stack on top
    const scaleProgress = useTransform(
        sectionProgress,
        [0.15 + index * 0.2, 0.4 + index * 0.2],
        [1, 1 - (total - index - 1) * 0.04]
    );

    return (
        <div
            className="sticky"
            style={{ top: `calc(12vh + ${index * 24}px)` }}
        >
            <motion.div
                style={{ scale: scaleProgress }}
                className="group bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100/10 cursor-pointer origin-top transform-gpu"
            >
                {/* Card Image */}
                <div className={`relative h-[320px] lg:h-[400px] ${work.bgColor} overflow-hidden p-6 lg:p-8 flex items-center justify-center`}>
                    <img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-full object-cover rounded-2xl shadow-xl transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                </div>

                {/* Card Info Footer */}
                <div className="p-6 lg:p-8 bg-white flex justify-between items-center text-slate-950">
                    <div className="space-y-1">
                        <h3 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
                            {work.title}
                        </h3>
                        <p className="text-xs lg:text-sm font-bold text-slate-400 uppercase tracking-widest">
                            {work.category} • {work.year}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}