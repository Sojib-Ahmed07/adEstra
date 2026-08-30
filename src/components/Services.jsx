'use client';

import React from 'react';
import { motion } from 'framer-motion';

const SERVICES = [
    {
        id: '01.',
        title: 'UI/UX Design',
        description: 'We believe that exceptional design is the main cornerstone of effective new digital experiences.',
        bg: 'bg-[#f4f5f7]',
        subServices: [
            'UI/UX DESIGN',
            'PRODUCT DESIGN',
            'BRAND IDENTITY DESIGN',
            'GRAPHICS / 3D DESIGN'
        ]
    },
    {
        id: '02.',
        title: 'Digital Marketing',
        description: 'We offer a comprehensive range of digital marketing services designed to help your business thrive in the digital landscape.',
        bg: 'bg-[#f3f1ea]',
        subServices: [
            'SEO EXPERT',
            'SOCIAL MEDIA MARKETING',
            'CONTENT MARKETING',
            'EMAIL MARKETING'
        ]
    },
    {
        id: '03.',
        title: 'Web Development',
        description: 'Building modern, high-performance web applications and websites tailored to deliver speed, security, and scalability.',
        bg: 'bg-[#eef4f8]',
        subServices: [
            'FRONTEND DEVELOPMENT',
            'BACKEND ARCHITECTURE',
            'E-COMMERCE PLATFORMS',
            'WEB PERFORMANCE'
        ]
    },
    {
        id: '04.',
        title: 'IT Solutions',
        description: 'Robust enterprise IT infrastructure, cloud architectures, and system integrations built to optimize operations.',
        bg: 'bg-[#f5f3f0]',
        subServices: [
            'CLOUD INFRASTRUCTURE',
            'CYBERSECURITY',
            'SYSTEM INTEGRATION',
            'IT CONSULTING'
        ]
    },
    {
        id: '05.',
        title: 'Product Design',
        description: 'End-to-end digital product design from initial feature ideation and MVP validation to full-scale interactive system design.',
        bg: 'bg-[#f1f5f9]',
        subServices: [
            'MVP DEVELOPMENT',
            'UX ARCHITECTURE',
            'USER TESTING',
            'PRODUCT STRATEGY'
        ]
    },
    {
        id: '06.',
        title: 'App Development',
        description: 'Native and cross-platform mobile apps engineered with fluid animations, intuitive UI, and secure API integrations.',
        bg: 'bg-[#f0fdf4]',
        subServices: [
            'IOS & ANDROID',
            'REACT NATIVE / FLUTTER',
            'MOBILE UI/UX',
            'API INTEGRATION'
        ]
    }
];

// Entrance Animation Variants for Cards
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};

// Ultra Slow-Motion Bottom to Up Variant for Card Headers & Content
const slideUpVariant = {
    hidden: { opacity: 0, y: 120 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 3.5, // Ultra slow-motion duration (3.5s)
            ease: [0.16, 1, 0.3, 1], // Smooth cinematic easing
        },
    },
};

export default function ServicesSection() {
    return (
        <section className="bg-[#f8fafc] font-sans relative">

            {/* Sticky Main Header */}
            <div className="sticky top-0 z-[60] bg-[#f8fafc]/90 backdrop-blur-md px-4 sm:px-8 py-4 sm:py-6 lg:py-8 border-b border-slate-200/80 overflow-hidden">
                <div className="max-w-[1400px] mx-auto flex flex-row justify-between items-center gap-4">
                    
                    {/* Main Header Text: Right-to-Left Ultra Slow Motion */}
                    <motion.h2 
                        initial={{ opacity: 0, x: 140 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ 
                            duration: 3.5, 
                            ease: [0.16, 1, 0.3, 1] 
                        }}
                        className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight"
                    >
                        Our services
                    </motion.h2>

                    <button className="px-4 py-2 sm:px-8 sm:py-3 rounded-full border border-slate-900 sm:border-2 text-slate-900 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all duration-300 cursor-pointer shrink-0">
                        See All Services
                    </button>
                </div>
            </div>

            {/* Stacking Cards Container */}
            <div className="relative max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
                {SERVICES.map((service, index) => (
                    <div
                        key={service.id}
                        className={`sticky ${service.bg} min-h-0 md:min-h-[550px] lg:min-h-[600px] p-5 sm:p-10 lg:p-16 rounded-2xl sm:rounded-3xl border border-slate-300/70 shadow-xl transition-all duration-500 mb-6 sm:mb-12`}
                        style={{
                            zIndex: index + 1,
                            top: `calc(70px + ${index * 24}px)` // Dynamic offset for sticky stack
                        }}
                    >
                        {/* Card Staggered Entrance Container */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.2, once: false }}
                            variants={containerVariants}
                            className="w-full h-full flex flex-col justify-between space-y-6 sm:space-y-12 lg:space-y-16 overflow-hidden"
                        >

                            {/* Top Row: Title, Number & Main Paragraph */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-start">

                                {/* Service Title & Number - Ultra Slow Bottom-to-Top Animation */}
                                <motion.div variants={slideUpVariant} className="lg:col-span-8 flex items-baseline gap-3 sm:gap-8">
                                    <span className="text-lg sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight shrink-0">
                                        {service.id}
                                    </span>
                                    
                                    <h3 className="text-3xl sm:text-6xl lg:text-[110px] font-black text-slate-950 tracking-tight leading-[1] sm:leading-[0.9] break-words">
                                        {service.title}
                                    </h3>
                                </motion.div>

                                {/* Description Paragraph - Ultra Slow Bottom-to-Top Animation */}
                                <motion.div variants={slideUpVariant} className="lg:col-span-4 lg:pt-4">
                                    <p className="text-slate-800 text-sm sm:text-base lg:text-xl font-medium leading-relaxed max-w-md">
                                        {service.description}
                                    </p>
                                </motion.div>

                            </div>

                            {/* Bottom Row: Sub-Services Tag Line - Ultra Slow Bottom-to-Top Animation */}
                            <motion.div variants={slideUpVariant} className="pt-4 sm:pt-8 border-t border-slate-900/10">
                                <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
                                    {service.subServices.map((sub, i) => (
                                        <React.Fragment key={i}>
                                            <span className="text-[10px] sm:text-xs lg:text-base font-extrabold tracking-wider sm:tracking-widest text-slate-900 uppercase">
                                                {sub}
                                            </span>
                                            {i < service.subServices.length - 1 && (
                                                <span className="hidden md:inline-block w-8 sm:w-20 lg:w-36 h-[2px] bg-slate-900/20" />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </motion.div>

                        </motion.div>
                    </div>
                ))}
            </div>

        </section>
    );
}