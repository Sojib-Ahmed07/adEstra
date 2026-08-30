'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const TEAM = [
    {
        id: 1,
        name: 'Mh Ador',
        role: 'Operation Lead',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
        socials: { linkedin: '#', twitter: '#' },
    },
    {
        id: 2,
        name: 'Said Sajal',
        role: 'Business Developer',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
        socials: { linkedin: '#', twitter: '#' },
    },
    {
        id: 3,
        name: 'Muntasir Islam',
        role: 'SEO & Accounts Manager',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
        socials: { linkedin: '#', twitter: '#' },
    },
    {
        id: 4,
        name: 'Aria Montgomery',
        role: 'Lead UI/UX Designer',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
        socials: { linkedin: '#', twitter: '#' },
    },
    {
        id: 5,
        name: 'Alex Rivera',
        role: 'Senior Full-Stack Engineer',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
        socials: { linkedin: '#', twitter: '#' },
    },
    {
        id: 6,
        name: 'Sophia Chen',
        role: 'Product Strategist',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
        socials: { linkedin: '#', twitter: '#' },
    },
];

export default function TeamSection() {
    return (
        <section className="w-full bg-[#121214] text-white py-12 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 font-sans overflow-hidden">
            <div className="max-w-[1400px] mx-auto space-y-8 sm:space-y-12">

                {/* Responsive Header Bar */}
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                        <div className="space-y-3">
                            <div className="inline-flex items-center px-3.5 py-1 rounded-full border border-white/20 text-[10px] sm:text-xs font-semibold tracking-wider text-slate-300 uppercase">
                                ( OUR TEAM )
                            </div>
                            
                            {/* Main Headline - Ultra Slow Motion Right-to-Left Transition */}
                            <motion.h2 
                                initial={{ opacity: 0, x: 140 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ 
                                    duration: 3.5, // Ultra slow-motion duration (3.5s)
                                    ease: [0.16, 1, 0.3, 1] // Cinematic smooth deceleration curve
                                }}
                                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
                            >
                                Our Expert Members
                            </motion.h2>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/30 text-xs font-semibold uppercase tracking-widest text-slate-200 hover:bg-white hover:text-black transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer shrink-0"
                        >
                            See All Members
                            <ArrowUpRight className="w-4 h-4" />
                        </motion.button>
                    </div>

                    <div className="w-full h-[1px] bg-white/10" />
                </div>

                {/* Responsive 6 Team Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {TEAM.map((member, index) => (
                        <MemberCard key={member.id} member={member} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
}

function MemberCard({ member, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ 
                duration: 0.8, 
                delay: (index % 3) * 0.15,
                ease: [0.16, 1, 0.3, 1] 
            }}
            className="group cursor-pointer flex flex-col space-y-4 sm:space-y-5"
        >
            {/* Image Frame Container */}
            <div className="relative w-full h-[360px] xs:h-[400px] sm:h-[420px] lg:h-[460px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#e8e5f8] via-[#f1effc] to-[#ded9f6] flex items-end justify-center p-3 sm:p-4">

                {/* Background SVG Lines */}
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 400 500" fill="none" preserveAspectRatio="none">
                        <path d="M-50 100 Q150 300 450 50" stroke="#8b5cf6" strokeWidth="2" />
                        <path d="M-50 250 Q200 450 450 200" stroke="#a78bfa" strokeWidth="1.5" />
                    </svg>
                </div>

                {/* Ambient Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Member Image */}
                <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top rounded-2xl transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Floating Social Icons */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex flex-col gap-2 opacity-100 sm:opacity-0 sm:translate-y-4 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-300 ease-out z-10">
                    <motion.a
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        href={member.socials.linkedin}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-md text-slate-900 flex items-center justify-center shadow-lg hover:bg-slate-950 hover:text-white transition-colors"
                    >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                    </motion.a>
                    <motion.a
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        href={member.socials.twitter}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-md text-slate-900 flex items-center justify-center shadow-lg hover:bg-slate-950 hover:text-white transition-colors"
                    >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </motion.a>
                </div>

            </div>

            {/* Member Info Label */}
            <div className="space-y-1 px-1">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {member.role}
                </p>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight group-hover:text-purple-400 transition-colors duration-300">
                    {member.name}
                </h3>
            </div>
        </motion.div>
    );
}