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

    // Track progress through the dark container
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    });

    // 1. Position Y: Starts near top (-20vh) -> locks center (0vh)
    const titleY = useTransform(
        scrollYProgress,
        [0, 0.2, 0.75],
        ['-20vh', '0vh', '0vh']
    );

    // 2. Scale: Grows massive behind cards (1.8x) as you scroll down
    const titleScale = useTransform(
        scrollYProgress,
        [0, 0.25, 0.75],
        [1, 1.8, 1.8]
    );

    // 3. Opacity: Fully visible -> dissolves out well before section end
    const titleOpacity = useTransform(
        scrollYProgress,
        [0, 0.1, 0.6, 0.8],
        [1, 1, 1, 0]
    );

    // 4. Hard-hide DOM display at end of section to prevent sticky layer ghosting
    const titleDisplay = useTransform(scrollYProgress, (progress) =>
        progress >= 0.8 ? 'none' : 'block'
    );

    return (
        <section className="bg-[#18181b] font-sans relative py-20 text-white min-h-screen">

            {/* Outer Dark Container */}
            <div
                ref={sectionRef}
                className="relative w-full bg-[#18181b] pt-12 pb-48 px-4 sm:px-12 min-h-[320vh]"
            >

                {/* Sticky Background Stage for "WORKS" (z-0 sits behind cards) */}
                <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                    <motion.h1
                        style={{
                            y: titleY,
                            scale: titleScale,
                            opacity: titleOpacity,
                            display: titleDisplay,
                        }}
                        className="text-[15vw] font-black tracking-wider text-white uppercase leading-none select-none origin-center text-center w-full transform-gpu"
                    >
                        WORKS
                    </motion.h1>
                </div>

                {/* Stacking Cards Stream (z-10 sits on top of text) */}
                <div className="relative z-10 max-w-3xl mx-auto -mt-[60vh] space-y-20 pb-32">
                    {WORKS.map((work, index) => (
                        <StackCard
                            key={work.id}
                            work={work}
                            index={index}
                            total={WORKS.length}
                            sectionProgress={scrollYProgress}
                        />
                    ))}
                </div>

            </div>

        </section>
    );
}

function StackCard({ work, index, total, sectionProgress }) {
    // Scaling down older cards as newer cards stack over them
    const scaleProgress = useTransform(
        sectionProgress,
        [0.2 + index * 0.22, 0.45 + index * 0.22],
        [1, 1 - (total - index - 1) * 0.04]
    );

    return (
        <div
            className="sticky"
            style={{ top: `calc(16vh + ${index * 32}px)` }}
        >
            <motion.div
                style={{ scale: scaleProgress }}
                className="group bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100/10 cursor-pointer origin-top transform-gpu"
            >
                {/* Card Image */}
                <div className={`relative h-[380px] sm:h-[460px] ${work.bgColor} overflow-hidden p-8 flex items-center justify-center`}>
                    <img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-full object-cover rounded-2xl shadow-xl transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                </div>

                {/* Card Info Footer */}
                <div className="p-8 sm:p-10 bg-white flex justify-between items-center text-slate-950">
                    <div className="space-y-2">
                        <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                            {work.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest">
                            {work.year}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}