'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const REVIEWS = [
    {
        id: 1,
        quote:
            '"From branding to digital marketing, adEstra delivers excellence! A professional team that understands creativity and results.."',
        author: 'Abu Ratul',
        role: 'Managing Director of Xpert Finance',
        image:
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    },
    {
        id: 2,
        quote:
            '"Working with adEstra transformed our entire brand identity. Their attention to strategic detail and modern aesthetic is second to none."',
        author: 'Sarah Jenkins',
        role: 'Head of Growth at TechFlow',
        image:
            'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop',
    },
    {
        id: 3,
        quote:
            '"Extremely reliable and highly skilled. They didn\'t just build a product for us—they helped refine our vision into an engaging experience."',
        author: 'David Chen',
        role: 'Founder of Nexus Studio',
        image:
            'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop',
    },
];

export default function ReviewSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1); // 1 = next, -1 = prev

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
    };

    const activeReview = REVIEWS[currentIndex];

    const textVariants = {
        initial: (dir) => ({
            opacity: 0,
            x: dir > 0 ? 40 : -40,
        }),
        animate: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        },
        exit: (dir) => ({
            opacity: 0,
            x: dir > 0 ? -40 : 40,
            transition: { duration: 0.3, ease: 'easeIn' },
        }),
    };

    return (
        <section className="w-full bg-[#f8f9fa] text-slate-950 py-20 px-6 sm:px-12 lg:px-20 font-sans overflow-hidden">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                {/* Left Content Column */}
                <div className="lg:col-span-6 flex flex-col space-y-8">

                    {/* Section Header */}
                    <div className="space-y-4">
                        <div className="inline-flex items-center px-4 py-1 rounded-full border border-slate-300 text-xs font-semibold tracking-wider text-slate-700 uppercase">
                            ( TESTIMONIALS )
                        </div>

                        {/* Animated Headline - Right to Left */}
                        <motion.h2 
                            initial={{ opacity: 0, x: 140 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ 
                                duration: 3.5, 
                                ease: [0.16, 1, 0.3, 1] 
                            }}
                            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight"
                        >
                            Discover Customer’s Reviews
                        </motion.h2>
                    </div>

                    {/* Dynamic Review Card */}
                    <div className="min-h-[220px] flex flex-col justify-between space-y-6 pt-2">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={activeReview.id}
                                custom={direction}
                                variants={textVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="space-y-6"
                            >
                                <p className="text-xl sm:text-2xl font-medium text-slate-800 leading-relaxed tracking-tight">
                                    {activeReview.quote}
                                </p>

                                <div className="flex items-center gap-3 text-sm">
                                    <span className="font-extrabold text-slate-950 text-base">
                                        {activeReview.author}
                                    </span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                    <span className="font-medium text-slate-500">
                                        {activeReview.role}
                                    </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Nav Controls */}
                        <div className="flex items-center gap-3 pt-4">
                            <button
                                onClick={handlePrev}
                                aria-label="Previous review"
                                className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center text-slate-800 hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 cursor-pointer active:scale-95"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            <button
                                onClick={handleNext}
                                aria-label="Next review"
                                className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center text-slate-800 hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 cursor-pointer active:scale-95"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                </div>

                {/* Right Image Column */}
                <div className="lg:col-span-6">
                    <div className="relative w-full h-[380px] sm:h-[480px] rounded-2xl overflow-hidden shadow-2xl bg-slate-200">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeReview.id}
                                src={activeReview.image}
                                alt={activeReview.author}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </section>
    );
}