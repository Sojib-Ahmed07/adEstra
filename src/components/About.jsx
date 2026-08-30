'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, animate, useMotionValueEvent } from 'framer-motion';

// High-Performance Zero-Jank Counter
function CountingNumber({ value, suffix = '', duration = 1.2 }) {
    const ref = useRef(null);
    const spanRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-20px' });
    const count = useMotionValue(0);

    // Direct DOM manipulation bypasses React state updates & prevents lag
    useMotionValueEvent(count, 'change', (latest) => {
        if (spanRef.current) {
            spanRef.current.textContent = `${Math.floor(latest)}${suffix}`;
        }
    });

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, value, {
                duration: duration,
                ease: [0.12, 0.8, 0.2, 1], // Fluid cubic-bezier curve
            });
            return controls.stop;
        }
    }, [isInView, count, value, duration]);

    return (
        <span ref={ref} className="inline-flex tabular-nums">
            <span ref={spanRef}>0{suffix}</span>
        </span>
    );
}

export default function About() {
    return (
        <section className="bg-[#f8fafc] text-slate-900 py-10 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">

                {/* Left Column (Headline & Stats Grid) */}
                <div className="lg:col-span-7 space-y-6 sm:space-y-10">

                    {/* Badge */}
                    <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-slate-300 text-[10px] sm:text-xs font-semibold tracking-wider text-slate-700 uppercase">
                        ( ABOUT US )
                    </div>

                    {/* Main Headline */}
                    <motion.h2 
                        initial={{ opacity: 0, x: 140 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ 
                            duration: 1.8,
                            ease: [0.16, 1, 0.3, 1] 
                        }}
                        className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black tracking-tight leading-[1.15] sm:leading-[1.1] text-slate-950 max-w-2xl"
                    >
                        Since 2019, become the #1 low-code agency in the world
                    </motion.h2>

                    {/* Statistics */}
                    <div className="pt-2 sm:pt-4 space-y-6 sm:space-y-10">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12">

                            {/* Stat 1 */}
                            <div className="space-y-1 sm:space-y-2">
                                <div
                                    className="text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight"
                                    style={{
                                        WebkitTextStroke: '1.5px #1e293b',
                                        color: 'transparent'
                                    }}
                                >
                                    <CountingNumber value={100} suffix="+" duration={1.2} />
                                </div>
                                <p className="text-xs sm:text-sm font-semibold text-slate-700">
                                    Completed Projects
                                </p>
                            </div>

                            <div className="hidden sm:block h-16 sm:h-20 w-[1px] bg-slate-300" />

                            {/* Stat 2 */}
                            <div className="space-y-1 sm:space-y-2">
                                <div
                                    className="text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight"
                                    style={{
                                        WebkitTextStroke: '1.5px #1e293b',
                                        color: 'transparent'
                                    }}
                                >
                                    <CountingNumber value={6} duration={0.8} />
                                </div>
                                <p className="text-xs sm:text-sm font-semibold text-slate-700">
                                    Years of experience
                                </p>
                            </div>

                        </div>

                        {/* Stat 3 */}
                        <div className="space-y-1 sm:space-y-2">
                            <div
                                className="text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight"
                                style={{
                                    WebkitTextStroke: '1.5px #1e293b',
                                    color: 'transparent'
                                }}
                            >
                                <CountingNumber value={80} suffix="+" duration={1.2} />
                            </div>
                            <p className="text-xs sm:text-sm font-semibold text-slate-700">
                                Positive Reviews
                            </p>
                        </div>

                    </div>

                </div>

                {/* Right Column */}
                <div className="lg:col-span-5 space-y-4 sm:space-y-8 lg:pt-16">

                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#4cd3d6] leading-snug">
                        We are a dynamic design studio driven by a deep passion for creativity and innovation.
                    </h3>

                    <p className="text-slate-500 text-xs sm:text-base leading-relaxed max-w-md font-normal">
                        Our team is dedicated to crafting bespoke, thoughtful designs that not only reflect the individuality of your brand but also connect with your audience on a meaningful level.
                    </p>

                    <div className="pt-2">
                        <button className="w-full sm:w-auto px-6 py-2.5 sm:px-8 sm:py-3 rounded-full border border-slate-900 text-slate-900 text-xs sm:text-sm font-semibold hover:bg-slate-900 hover:text-white transition-all duration-300 cursor-pointer shadow-xs">
                            Learn More
                        </button>
                    </div>

                </div>

            </div>
        </section>
    );
}