'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const BLOG_POSTS = [
    {
        id: 1,
        title: 'From Concept to Clicks: How Low-Code',
        link: '#',
    },
    {
        id: 2,
        title: 'From Concept to Clicks: How Low-Code',
        link: '#',
    },
    {
        id: 3,
        title: 'The Twin Engines of Success: Branding',
        link: '#',
    },
    {
        id: 4,
        title: 'Marketing Strategy VS Marketing Plan. So,',
        link: '#',
    },
    {
        id: 5,
        title: 'Brand Guideline',
        link: '#',
    },
    {
        id: 6,
        title: 'Content Creation: The Heart of Digital',
        link: '#',
    },
];

export default function BlogSection() {
    return (
        <section className="w-full bg-[#f8fafc] text-slate-950 py-20 px-6 sm:px-12 lg:px-20 font-sans">
            <div className="max-w-[1400px] mx-auto space-y-12">

                {/* Header Bar */}
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                        <div className="space-y-3">
                            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-slate-300 text-xs font-bold tracking-wider text-slate-700 uppercase">
                                ( BLOGS & NEWS )
                            </div>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950">
                                Our Latest Stories
                            </h2>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-8 py-3 rounded-full border border-slate-300 text-xs font-bold uppercase tracking-widest text-slate-900 hover:bg-slate-950 hover:text-white transition-all duration-300 cursor-pointer"
                        >
                            See All News
                        </motion.button>
                    </div>

                    <div className="w-full h-[1px] bg-slate-200" />
                </div>

                {/* Blog Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {BLOG_POSTS.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>

            </div>
        </section>
    );
}

function BlogCard({ post }) {
    return (
        <motion.a
            href={post.link}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="group relative bg-white border border-slate-100 rounded-xl p-8 sm:p-10 flex flex-col justify-between min-h-[160px] sm:min-h-[180px] shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 cursor-pointer"
        >
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug group-hover:text-blue-600 transition-colors duration-300 pr-6">
                {post.title}
            </h3>

            {/* Floating Arrow Icon on Hover */}
            <div className="absolute top-8 right-8 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-blue-600 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowUpRight className="w-6 h-6" />
            </div>
        </motion.a>
    );
}