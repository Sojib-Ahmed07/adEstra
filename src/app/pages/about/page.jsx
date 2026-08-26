'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowDownRight, Asterisk } from 'lucide-react';

// --- DATA ---

const SERVICES_LIST = [
    {
        id: '01',
        title: 'Photoshoot',
        description: "Wedding day is one of the most important days of your life, I'm committed to capturing beautiful moments.",
    },
    {
        id: '02',
        title: 'Customer Care',
        description: 'Whether it’s a family portrait, or a creative photo session, my goal is to create images that reflect your personality and style.',
    },
    {
        id: '03',
        title: 'Data Entry',
        description: 'For businesses looking to elevate their brand, I offer professional commercial photography services.',
    },
    {
        id: '04',
        title: 'Video Editing',
        description: 'High-end post-production, color grading, motion graphics, and engaging reel assembly to keep your audience hooked.',
    },
];

const FAQS_LIST = [
    {
        question: 'What services does Adestra offer?',
        answer: 'Adestra offers web design & development, digital marketing, video editing, social media management, SEO, customer care, and data entry services tailored for global businesses.',
    },
    {
        question: 'How do I get started with your team?',
        answer: 'Simply click "Let\'s Talk" or reach out via our contact page. We will set up a quick discovery call to discuss your goals, requirements, and project timeline.',
    },
    {
        question: 'Do you work with clients internationally?',
        answer: 'Yes! While we originated in Australia, we partner with clients across North America, Europe, Asia, and beyond.',
    },
    {
        question: 'What platforms do you work with for websites?',
        answer: 'We specialize in Next.js, React, Webflow, Framer, WordPress, and Shopify depending on your scale and low-code preferences.',
    },
    {
        question: 'Can you help with social media marketing only?',
        answer: 'Absolutely. We offer standalone packages for social media management, content creation, video editing, and targeted ad campaigns.',
    },
    {
        question: 'Do you offer ongoing support and maintenance?',
        answer: 'Yes, we provide post-launch support, security maintenance, and continuous optimization retainers.',
    },
    {
        question: 'What industries do you specialize in?',
        answer: 'We work across e-commerce, tech startups, real estate, professional services, hospitality, and creative media.',
    },
    {
        question: 'What makes Adestra different from other agencies?',
        answer: 'We blend high-end design aesthetics with practical low-code efficiency and data-driven marketing, offering end-to-end partner execution.',
    },
    {
        question: 'Do you offer data entry or virtual assistant services?',
        answer: 'Yes, we have dedicated operational specialists trained in administrative support, data migration, and customer care operations.',
    },
];

// --- ANIMATION VARIANTS ---

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

export default function AboutPage() {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="w-full bg-white text-slate-900 font-sans min-h-screen overflow-x-hidden">

            {/* ========================================================= */}
            {/* SECTION 1: HERO & STATS                                 */}
            {/* ========================================================= */}
            <section className="w-full px-6 sm:px-12 lg:px-16 pt-16 pb-24 border-b border-slate-100">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
                >

                    {/* Left Column */}
                    <div className="lg:col-span-7 space-y-12">
                        <motion.div variants={fadeInUp} className="inline-block">
                            <span className="px-4 py-1.5 rounded-full border border-slate-300 text-xs font-bold tracking-wider text-slate-800 uppercase">
                                ( ABOUT US )
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-slate-950 tracking-tight leading-[0.98]"
                        >
                            Since 2019, become the #1 low-code agency in the world
                        </motion.h1>

                        {/* Outlined Stats Box */}
                        <motion.div variants={fadeInUp} className="flex items-center gap-10 sm:gap-16 pt-4">
                            <div className="space-y-2">
                                <span className="text-6xl sm:text-7xl lg:text-8xl font-light text-slate-900 tracking-tight font-mono">
                                    750+
                                </span>
                                <p className="text-sm font-semibold text-slate-600">Completed Projects</p>
                            </div>

                            <div className="h-24 w-[1px] bg-slate-200" />

                            <div className="space-y-2">
                                <span className="text-6xl sm:text-7xl lg:text-8xl font-light text-slate-900 tracking-tight font-mono">
                                    600+
                                </span>
                                <p className="text-sm font-semibold text-slate-600">Positive Reviews</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-5 space-y-8 lg:pt-14">
                        <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#22e3ad] leading-snug">
                            We are a dynamic design studio driven by a deep passion for creativity and innovation.
                        </motion.h2>

                        <motion.p variants={fadeInUp} className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
                            Our team is dedicated to crafting bespoke, thoughtful designs that not only reflect the individuality of your brand but also connect with your audience on a meaningful level.
                        </motion.p>

                        <motion.div variants={fadeInUp}>
                            <a
                                href="#story"
                                className="inline-block px-7 py-3 rounded-full border border-slate-900 text-slate-900 text-sm font-semibold hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm"
                            >
                                Learn More
                            </a>
                        </motion.div>
                    </div>

                </motion.div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 2: BRAND STORY & MISSION                        */}
            {/* ========================================================= */}
            <section id="story" className="w-full px-6 sm:px-12 lg:px-16 py-20 border-b border-slate-100">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
                >
                    {/* Brand Tag */}
                    <motion.div variants={fadeInUp} className="lg:col-span-3 flex items-center gap-4">
                        <span className="text-3xl font-extrabold text-slate-950 tracking-tight leading-none">At <br />adEstra</span>
                        <ArrowDownRight className="w-10 h-10 text-slate-950 stroke-[1.5]" />
                    </motion.div>

                    {/* Story Paragraphs */}
                    <motion.div variants={fadeInUp} className="lg:col-span-6 space-y-6 text-slate-800 text-base sm:text-lg leading-relaxed font-normal">
                        <p>
                            we believe great brands are built with passion, purpose, and precision. What started as a small team of freelancers with a shared love for digital creativity has now grown into a full-service digital marketing agency serving businesses across Australia and beyond. From humble beginnings—working late nights, chasing deadlines, and building websites from coffee shops—we’ve transformed into a dedicated powerhouse of marketers, designers, developers, and problem-solvers.
                        </p>
                        <p className="font-semibold text-slate-950">
                            Our journey began with one goal: <span className="font-extrabold">to simplify digital for businesses.</span>
                        </p>
                        <p>
                            Over time, we’ve helped startups find their voice, guided local businesses into the online space, and partnered with brands to scale their presence through smart design and strategy. We’re not just about making things look good — we focus on results, conversions, and sustainable growth.
                        </p>
                        <p>
                            At Adestra, we blend strategy with creativity. Whether it’s launching your first website, managing your social media, running high-converting ad campaigns, or handling large-scale data entry — our team is built to deliver. We believe in collaboration, transparency, and long-term relationships. We’re not just an agency — we’re your <span className="font-extrabold text-slate-950">digital growth partner.</span>
                        </p>
                    </motion.div>

                    {/* Established Stamp */}
                    <motion.div variants={fadeInUp} className="lg:col-span-3 flex items-center justify-start lg:justify-end gap-3 pt-4 lg:pt-0">
                        <span className="text-xl font-bold text-slate-900 tracking-tight">Since 2019</span>
                        <Asterisk className="w-7 h-7 text-slate-900 animate-spin-slow" />
                    </motion.div>
                </motion.div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 3: OUR UNIQUE SERVICES (FULL-WIDTH MASSIVE TEXT) */}
            {/* ========================================================= */}
            <section className="w-full px-6 sm:px-12 lg:px-16 py-24 border-b border-slate-100">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={staggerContainer}
                    className="space-y-16"
                >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                        <div className="space-y-3">
                            <span className="px-4 py-1.5 rounded-full border border-slate-300 text-xs font-bold tracking-wider text-slate-800 uppercase">
                                ( OUR SERVICES )
                            </span>
                            <h2 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight">
                                Our Unique Services
                            </h2>
                        </div>

                        <a
                            href="/services"
                            className="px-8 py-3.5 rounded-full border border-slate-900 text-slate-900 text-sm font-semibold hover:bg-slate-900 hover:text-white transition-all duration-300 shrink-0"
                        >
                            See All Services
                        </a>
                    </div>

                    {/* Massive Full-Width Services List */}
                    <div className="divide-y divide-slate-200 border-t border-b border-slate-200 w-full">
                        {SERVICES_LIST.map((service) => (
                            <motion.div
                                key={service.id}
                                variants={fadeInUp}
                                className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group cursor-pointer hover:bg-slate-50 transition-colors px-2 sm:px-6 -mx-2 sm:-mx-6 rounded-2xl"
                            >
                                {/* Number + Giant Service Title */}
                                <div className="lg:col-span-8 flex items-baseline gap-4 sm:gap-10">
                                    <span className="text-lg sm:text-2xl font-mono font-bold text-slate-400 group-hover:text-slate-900 transition-colors shrink-0">
                                        {service.id}/
                                    </span>
                                    <h3 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-slate-950 tracking-tight leading-none uppercase group-hover:translate-x-3 transition-transform duration-300">
                                        {service.title}
                                    </h3>
                                </div>

                                {/* Right Description Column */}
                                <div className="lg:col-span-4 lg:pl-6">
                                    <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </motion.div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 4: FAQ SECTION & CTA                            */}
            {/* ========================================================= */}
            <section className="w-full px-6 sm:px-12 lg:px-16 py-24">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={staggerContainer}
                    className="space-y-16"
                >
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pb-12 border-b border-slate-200">
                        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 tracking-tight leading-tight max-w-4xl">
                            Ready to discuss how we can work together?
                        </h2>

                        <a
                            href="/contact"
                            className="px-9 py-4 rounded-full border border-slate-900 text-slate-900 text-sm font-bold hover:bg-slate-900 hover:text-white transition-all duration-300 shrink-0"
                        >
                            Lets Start
                        </a>
                    </div>

                    {/* Accordion List */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                        {/* Left Label */}
                        <div className="lg:col-span-3">
                            <span className="text-xs font-bold text-slate-900 tracking-widest uppercase flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-slate-900" /> FAQ&apos;S
                            </span>
                        </div>

                        {/* Accordion Rows */}
                        <div className="lg:col-span-9 divide-y divide-slate-200 border-t border-b border-slate-200">
                            {FAQS_LIST.map((faq, index) => {
                                const isOpen = openFaq === index;
                                return (
                                    <div key={index} className="py-6 transition-colors">
                                        <button
                                            onClick={() => toggleFaq(index)}
                                            className="w-full flex justify-between items-center text-left gap-6 group cursor-pointer"
                                        >
                                            <span className="text-lg sm:text-2xl font-bold text-slate-900 group-hover:text-slate-600 transition-colors">
                                                {faq.question}
                                            </span>
                                            <div className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center shrink-0 group-hover:border-slate-900 transition-colors">
                                                {isOpen ? (
                                                    <Minus className="w-4 h-4 text-slate-900" />
                                                ) : (
                                                    <Plus className="w-4 h-4 text-slate-900" />
                                                )}
                                            </div>
                                        </button>

                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="pt-4 text-slate-600 text-sm sm:text-base leading-relaxed pr-12">
                                                        {faq.answer}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>

                    </div>

                </motion.div>
            </section>

        </div>
    );
}