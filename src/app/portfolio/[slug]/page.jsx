'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';

const PORTFOLIO_DETAILS = {
    'give-for-goods-foundation': {
        title: 'Give for Goods Foundation',
        client: 'Give for Goods Foundation',
        industry: 'Charity Organization',
        project: 'Social Media Management & Photoshoot',
        duration: '11 months',
        background: 'Give for Good is a U.S.-based charitable foundation committed to supporting underprivileged communities through education, healthcare, and emergency aid initiatives.',
        objectives: [
            'Build a trustworthy, compassionate digital presence for the foundation',
            'Drive traffic to donation pages and campaign landing pages',
            'Increase volunteer sign-ups and supporter engagement',
        ],
        mockup1: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
        mockup2: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&w=1200&q=80',
        process: [
            { step: '01', title: 'Discovery & Goal Setting', points: ['Met with team to align on fundraising goals', 'Audited existing platforms'] },
            { step: '02', title: 'Brand & Content Strategy', points: ['Crafted hopeful tone', 'Mapped donor impact stories'] },
        ],
        results: [
            '65% increase in website visits from social media in 3 months',
            '40% growth in online donations during the first campaign period',
        ],
        nextProjects: [
            { title: 'Angies Kebab & Burger', slug: '/portfolio/angies-kebab-burger', image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80' },
            { title: 'eGarage Bangladesh', slug: '/portfolio/egarage-bangladesh', image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80' },
        ],
    },
};

const DEFAULT_PROJECT = {
    title: 'Project Case Study',
    client: 'Valued Client',
    industry: 'Digital Growth',
    project: 'Full Spectrum Campaign',
    duration: '6 Months',
    background: 'Comprehensive digital strategy and execution engineered to elevate market positioning and drive measurable conversion metrics.',
    objectives: [
        'Establish category leadership through high-converting assets',
        'Scale digital touchpoints and reach target demographic',
        'Optimize multi-channel conversion funnels',
    ],
    mockup1: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    mockup2: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    process: [
        { step: '01', title: 'Strategy & Research', points: ['Audited target market dynamics', 'Mapped customer acquisition channels'] },
        { step: '02', title: 'Execution & Launch', points: ['Deployed custom visual assets', 'Activated targeted outreach campaigns'] },
    ],
    results: [
        'Expanded overall digital reach significantly',
        'Improved engagement and lead acquisition rates',
    ],
    nextProjects: [
        { title: 'Give for Goods Foundation', slug: '/portfolio/give-for-goods-foundation', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80' },
    ],
};

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function PortfolioDetailPage({ params }) {
    const resolvedParams = params instanceof Promise ? React.use(params) : params;
    const slug = resolvedParams?.slug;
    const project = PORTFOLIO_DETAILS[slug] || { ...DEFAULT_PROJECT, title: slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : DEFAULT_PROJECT.title };

    return (
        <div className="w-full bg-[#fcfcfd] text-slate-900 font-sans min-h-screen py-16 px-6 sm:px-12 lg:px-24 max-w-[1400px] mx-auto selection:bg-[#22e3ad] selection:text-slate-950">
            <div className="pb-8">
                <Link href="/portfolio" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-950 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Showcase
                </Link>
            </div>

            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={staggerContainer}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4 pb-20 border-b border-slate-200/80"
            >
                <div className="lg:col-span-8 space-y-12">
                    <motion.div variants={fadeInUp} className="space-y-4">
                        <span className="text-xs font-semibold tracking-widest text-[#00b284] uppercase">Project Case Study</span>
                        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950">
                            {project.title}
                        </h1>
                        <p className="text-slate-600 text-lg sm:text-xl leading-relaxed font-normal pt-2">
                            {project.background}
                        </p>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="space-y-6">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
                            Objectives
                        </h2>
                        <ul className="space-y-4 text-slate-700 text-base sm:text-lg font-normal">
                            {project.objectives.map((obj, i) => (
                                <motion.li key={i} variants={fadeInUp} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm">
                                    <span className="h-2 w-2 rounded-full bg-[#22e3ad] mt-2.5 shrink-0" />
                                    <span>{obj}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                <motion.div variants={fadeInUp} className="lg:col-span-4">
                    <div className="sticky top-12 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-100/50 space-y-6">
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Client</p>
                            <p className="text-lg font-bold text-slate-950 mt-1">{project.client}</p>
                        </div>
                        <div className="h-px bg-slate-100" />
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Industry</p>
                            <p className="text-lg font-bold text-slate-950 mt-1">{project.industry}</p>
                        </div>
                        <div className="h-px bg-slate-100" />
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Project Scope</p>
                            <p className="text-lg font-bold text-slate-950 mt-1">{project.project}</p>
                        </div>
                        <div className="h-px bg-slate-100" />
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Duration</p>
                            <p className="text-lg font-bold text-slate-950 mt-1">{project.duration}</p>
                        </div>
                    </div>
                </motion.div>
            </motion.section>

            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="my-20">
                <div className="relative w-full bg-slate-950 rounded-3xl p-4 sm:p-8 border border-slate-800 shadow-2xl overflow-hidden">
                    <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl">
                        <img src={project.mockup1} alt={project.title} className="w-full h-full object-cover" />
                    </div>
                </div>
            </motion.section>

            <section className="py-16 max-w-4xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-12 text-center">
                    Execution Process
                </h2>
                <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-8 space-y-12 pl-8 sm:pl-12">
                    {project.process.map((step, idx) => (
                        <div key={idx} className="relative group">
                            <div className="absolute -left-[49px] sm:-left-[65px] top-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-slate-950 text-slate-950 font-bold text-sm sm:text-base flex items-center justify-center shadow-lg group-hover:bg-[#22e3ad] transition-colors duration-300">
                                {step.step}
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                                <h3 className="text-xl font-bold text-slate-950 mb-3">{step.title}</h3>
                                <ul className="space-y-2 text-slate-600 text-sm sm:text-base">
                                    {step.points.map((pt, pIdx) => (
                                        <li key={pIdx} className="flex items-start gap-2">
                                            <span className="text-slate-400">•</span>
                                            <span>{pt}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-16 space-y-12 border-t border-slate-200/80">
                <div className="space-y-6 max-w-4xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">Key Results & Impact</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {project.results.map((res, i) => (
                            <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                                <p className="text-slate-800 text-base sm:text-lg font-medium">{res}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="pt-16 border-t border-slate-200">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-8">Next Case Studies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {project.nextProjects.map((item, idx) => (
                        <Link key={idx} href={item.slug}>
                            <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }} className="group block space-y-4 cursor-pointer">
                                <div className="w-full aspect-[16/10] bg-slate-100 rounded-3xl overflow-hidden border border-slate-200/80 p-3 shadow-sm group-hover:shadow-xl transition-all duration-300">
                                    <div className="w-full h-full rounded-2xl overflow-hidden bg-white">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between px-2 pt-2">
                                    <h3 className="text-xl font-bold text-slate-950 group-hover:text-[#00b284] transition-colors">
                                        {item.title}
                                    </h3>
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-950 group-hover:text-white transition-colors duration-300">
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}