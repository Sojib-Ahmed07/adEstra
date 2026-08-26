'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ITEMS = [
    'UI-UX Design',
    'Digital Marketing',
    'Web Development',
    'IT Solutions',
    'Product Design',
    'App Development',
];

export default function TickerSlider() {
    const sliderItems = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

    return (
        <div className="relative w-full bg-[#f8fafc] overflow-hidden py-10 flex justify-center">
            {/* Full-width container with constrained inner marquee viewport */}
            <div className="relative w-[110%] bg-white py-5 -rotate-1 transform origin-center shadow-xs flex justify-center">

                {/* Top Cyan Angled Border Line */}
                <div
                    className="absolute top-0 left-0 h-[5px] bg-[#22e3ad] pointer-events-none"
                    style={{
                        width: '45%',
                        clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)',
                    }}
                />

                {/* Bottom Cyan Angled Border Line */}
                <div
                    className="absolute bottom-0 right-0 h-[5px] bg-[#22e3ad] pointer-events-none"
                    style={{
                        width: '60%',
                        clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)',
                    }}
                />

                {/* Constrained Marquee Window (Limits text width visibility) */}
                <div className="w-full max-w-6xl overflow-hidden">
                    <motion.div
                        className="flex whitespace-nowrap items-center"
                        animate={{ x: ['0%', '-50%'] }}
                        transition={{
                            repeat: Infinity,
                            ease: 'linear',
                            duration: 25,
                        }}
                    >
                        {sliderItems.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center px-8 sm:px-12 shrink-0"
                            >
                                <span className="text-xl sm:text-2xl lg:text-[25px] font-bold text-[#334155] tracking-tight select-none">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </div>
    );
}