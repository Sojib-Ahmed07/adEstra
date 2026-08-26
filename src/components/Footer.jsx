'use client';

import React from 'react';
import { motion } from 'framer-motion';

const NAV_LINKS = ['Home', 'About Us', 'Contact Us', 'Services', 'Portfolio'];
const SOCIALS = ['FB', 'IN', 'in', 'BE'];

export default function Footer() {
    return (
        <footer className="w-full bg-[#18181a] text-white font-sans overflow-hidden border-t border-white/10">

            {/* Top 3-Column Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] divide-y lg:divide-y-0 lg:divide-x divide-white/10">

                {/* Left Column - Brand Logo */}
                <div className="lg:col-span-4 p-10 sm:p-14 flex items-center justify-center lg:justify-start">
                    <div className="flex items-center gap-1 text-4xl sm:text-5xl font-black tracking-tight text-[#00f2a1]">
                        <span>adEstra</span>
                    </div>
                </div>

                {/* Middle Column - Animated Navigation */}
                <div className="lg:col-span-4 p-10 sm:p-14 flex flex-col items-center justify-center space-y-4">
                    {NAV_LINKS.map((link, idx) => (
                        <AnimatedNavLink key={idx} text={link} />
                    ))}
                </div>

                {/* Right Column - Contact & Socials */}
                <div className="lg:col-span-4 p-10 sm:p-14 flex flex-col justify-center space-y-8 text-center lg:text-left">

                    {/* Email */}
                    <div>
                        <a
                            href="mailto:adestrasolutions@gmail.com"
                            className="text-xl sm:text-2xl font-bold tracking-tight text-white hover:text-[#00f2a1] transition-colors duration-300"
                        >
                            adestrasolutions@gmail.com
                        </a>
                    </div>

                    {/* Address */}
                    <div className="space-y-1">
                        <h4 className="text-lg font-bold text-white tracking-wide">Address</h4>
                        <p className="text-sm text-slate-400 font-medium">
                            E-3, Savar, Dhaka, Bangladesh
                        </p>
                    </div>

                    {/* Social Icons */}
                    <div className="space-y-3">
                        <h4 className="text-lg font-bold text-white tracking-wide">Follow Us</h4>
                        <div className="flex items-center justify-center lg:justify-start gap-2.5">
                            {SOCIALS.map((soc, idx) => (
                                <motion.a
                                    key={idx}
                                    href="#"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-full border border-white/30 text-xs font-semibold flex items-center justify-center text-slate-200 hover:bg-white hover:text-black transition-colors duration-300"
                                >
                                    {soc}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                </div>

            </div>

            {/* Infinite Get In Touch Marquee Slider */}
            <div className="border-t border-b border-white/10 py-6 bg-[#121214] overflow-hidden whitespace-nowrap flex select-none">
                <motion.div
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
                    className="flex items-center gap-12 text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter text-white uppercase shrink-0"
                >
                    <span>GET IN TOUCH</span>
                    <ArrowUpRightIcon />
                    <span>GET IN TOUCH</span>
                    <ArrowUpRightIcon />
                    <span>GET IN TOUCH</span>
                    <ArrowUpRightIcon />
                    <span>GET IN TOUCH</span>
                    <ArrowUpRightIcon />
                </motion.div>
            </div>

            {/* Bottom Bar */}
            <div className="px-8 py-5 text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#121214]">
                <p>© 2024 adEstra ™ All rights reserved.</p>
                <p>Design & Developed by adEsrta</p>
                <a href="#" className="hover:text-white transition-colors">
                    Terms & Conditions
                </a>
            </div>

        </footer>
    );
}

{/* Middle Box Hover Text Component */ }
function AnimatedNavLink({ text }) {
    return (
        <motion.a
            href="#"
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="relative overflow-hidden block text-2xl sm:text-3xl font-bold tracking-tight cursor-pointer"
        >
            <div className="relative flex flex-col">
                {/* Main Text */}
                <motion.span
                    variants={{
                        rest: { y: 0 },
                        hover: { y: '-100%' },
                    }}
                    transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                    className="text-slate-200 block"
                >
                    {text}
                </motion.span>

                {/* Duplicate Sliding Text */}
                <motion.span
                    variants={{
                        rest: { y: '100%' },
                        hover: { y: 0 },
                    }}
                    transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                    className="absolute inset-0 text-[#00f2a1] block"
                >
                    {text}
                </motion.span>
            </div>
        </motion.a>
    );
}

{/* Marquee Arrow Icon */ }
function ArrowUpRightIcon() {
    return (
        <svg
            className="w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 stroke-white fill-none stroke-[2] shrink-0"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
        </svg>
    );
}