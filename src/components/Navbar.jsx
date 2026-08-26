'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const SERVICES_MENU = [
    { label: "Designs", href: "/pages/design" },
    { label: "Marketing", href: "/pages/marketing" },
    { label: "SEO", href: "/pages/seo" },
    { label: "Copywriting", href: "/pages/copywrite" },
    { label: "AutoCAD Design", href: "/pages/autocad" },
    { label: "AI Training", href: "/pages/ai-training" },
];

export default function Navbar() {
    const [isServicesOpen, setIsServicesOpen] = useState(false);

    return (
        <header className="relative z-50 flex items-center justify-between px-8 py-7 max-w-7xl mx-auto w-full">
            {/* Brand Logo */}
            <Link href="/" className="text-3xl font-extrabold tracking-tight text-[#22e3ad] cursor-pointer drop-shadow-md">
                adEstra
            </Link>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-10 text-base font-semibold text-white drop-shadow-sm">
                <Link href="/pages/about" className="relative group py-2 hover:text-[#22e3ad] transition-colors">
                    About
                    <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-[#22e3ad] transition-all duration-300 group-hover:w-full" />
                </Link>

                {/* Services Dropdown */}
                <div
                    className="relative py-2 cursor-pointer"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                >
                    <div className="flex items-center gap-1.5 hover:text-[#22e3ad] transition-colors group">
                        <span>Services</span>
                        <motion.span
                            animate={{ rotate: isServicesOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-xs"
                        >
                            ▾
                        </motion.span>
                        <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-[#22e3ad] transition-all duration-300 group-hover:w-full" />
                    </div>

                    <AnimatePresence>
                        {isServicesOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 8 }}
                                transition={{ duration: 0.18, ease: 'easeOut' }}
                                className="absolute top-full -left-4 mt-2 w-56 bg-slate-900/95 backdrop-blur-xl border border-white/15 rounded-xl p-2 shadow-2xl z-50 flex flex-col gap-1"
                            >
                                {SERVICES_MENU.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className="px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-100 hover:text-[#22e3ad] hover:bg-white/10 transition-all flex items-center justify-between group"
                                    >
                                        <span>{item.label}</span>
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">→</span>
                                    </Link>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <Link href="/portfolio" className="relative group py-2 hover:text-[#22e3ad] transition-colors">
                    Portfolio
                    <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-[#22e3ad] transition-all duration-300 group-hover:w-full" />
                </Link>

                <Link href="/team" className="relative group py-2 hover:text-[#22e3ad] transition-colors">
                    Team
                    <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-[#22e3ad] transition-all duration-300 group-hover:w-full" />
                </Link>

                <Link href="/blog" className="relative group py-2 hover:text-[#22e3ad] transition-colors">
                    Blog
                    <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-[#22e3ad] transition-all duration-300 group-hover:w-full" />
                </Link>

                <Link href="/contact" className="relative group py-2 hover:text-[#22e3ad] transition-colors">
                    Contact
                    <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-[#22e3ad] transition-all duration-300 group-hover:w-full" />
                </Link>

                <Link href="/pricing" className="relative group py-2 hover:text-[#22e3ad] transition-colors">
                    Pricing
                    <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-[#22e3ad] transition-all duration-300 group-hover:w-full" />
                </Link>
            </nav>

            {/* CTA Button */}
            <Link href="/contact">
                <button className="px-7 py-2.5 rounded-full border-2 border-white text-white text-base font-bold shadow-md hover:bg-white hover:text-slate-900 transition-all cursor-pointer">
                    Lets Talk
                </button>
            </Link>
        </header>
    );
}