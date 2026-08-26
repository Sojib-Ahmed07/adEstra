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

// Ultra-Smooth PowerPoint Entrance Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05,
        },
    },
};

const slideUpVariant = {
    hidden: { opacity: 0, y: 70 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1], // Custom smooth cubic-bezier curve
        },
    },
};

export default function ServicesSection() {
    return (
        <section className="bg-[#f8fafc] font-sans relative">

            {/* Sticky Main Header */}
            <div className="sticky top-0 z-50 bg-[#f8fafc]/90 backdrop-blur-md px-8 py-8 border-b border-slate-200/80">
                <div className="max-w-[1400px] mx-auto flex justify-between items-center">
                    <h2 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
                        Our services
                    </h2>
                    <button className="px-8 py-3 rounded-full border-2 border-slate-900 text-slate-900 text-xs font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all duration-300 cursor-pointer">
                        See All Services
                    </button>
                </div>
            </div>

            {/* Stacking Cards Container */}
            <div className="relative max-w-[1600px] mx-auto px-4 sm:px-8 py-12">
                {SERVICES.map((service, index) => (
                    <div
                        key={service.id}
                        className={`sticky ${service.bg} min-h-[600px] sm:min-h-[650px] p-8 sm:p-16 lg:p-20 rounded-3xl border border-slate-300/70 shadow-2xl transition-all duration-500 mb-12`}
                        style={{
                            zIndex: index + 1,
                            top: `${110 + index * 40}px` // Staggered top offset allows all cards to stack cleanly
                        }}
                    >
                        {/* PowerPoint Slide Up Text Animation */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.2, once: false }}
                            variants={containerVariants}
                            className="w-full h-full flex flex-col justify-between space-y-16"
                        >

                            {/* Top Row: Title, Number & Main Paragraph */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                                {/* Title & Number */}
                                <motion.div variants={slideUpVariant} className="lg:col-span-8 flex items-baseline gap-6 sm:gap-10">
                                    <span className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                                        {service.id}
                                    </span>
                                    <h3 className="text-5xl sm:text-7xl lg:text-[110px] font-black text-slate-950 tracking-tight leading-[0.9]">
                                        {service.title}
                                    </h3>
                                </motion.div>

                                {/* Description Paragraph */}
                                <motion.div variants={slideUpVariant} className="lg:col-span-4 lg:pt-4">
                                    <p className="text-slate-800 text-base sm:text-lg lg:text-xl font-medium leading-relaxed max-w-md">
                                        {service.description}
                                    </p>
                                </motion.div>

                            </div>

                            {/* Bottom Row: Sub-Services Tag Line */}
                            <motion.div variants={slideUpVariant} className="pt-8 border-t-2 border-slate-900/10">
                                <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-4">
                                    {service.subServices.map((sub, i) => (
                                        <React.Fragment key={i}>
                                            <span className="text-xs sm:text-sm lg:text-base font-extrabold tracking-widest text-slate-900 uppercase">
                                                {sub}
                                            </span>
                                            {i < service.subServices.length - 1 && (
                                                <span className="hidden md:inline-block w-12 sm:w-24 lg:w-36 h-[2px] bg-slate-900/20" />
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