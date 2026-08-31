'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

const SERVICES_MENU = [
    { label: "Designs", href: "/pages/design" },
    { label: "Marketing", href: "/pages/marketing" },
    { label: "SEO", href: "/pages/seo" },
    { label: "Copywriting", href: "/pages/copywrite" },
    { label: "AutoCAD Design", href: "/pages/autocad" },
    { label: "AI Training", href: "/pages/ai-training" },
];

export default function Navbar() {
    const pathname = usePathname();

    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

    const isHomePage = pathname === '/';

    return (
        <header
            className={`
                w-full z-50
                ${isHomePage
                    ? 'absolute top-0 left-0 right-0 bg-transparent'
                    : 'relative bg-white'
                }
                py-6 sm:py-7
            `}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between w-full">

                {/* Brand Logo */}
                <Link
                    href="/"
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#22e3ad] cursor-pointer drop-shadow-md z-50"
                >
                    adEstra
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10 text-sm xl:text-base font-semibold text-[#22e3ad]">

                    {/* About */}
                    <Link
                        href="/pages/about"
                        className="relative group py-2 text-[#22e3ad] hover:text-[#22e3ad] transition-colors"
                    >
                        About

                        <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-[#22e3ad] transition-all duration-300 group-hover:w-full" />
                    </Link>

                    {/* Services */}
                    <div
                        className="relative py-2 cursor-pointer"
                        onMouseEnter={() => setIsServicesOpen(true)}
                        onMouseLeave={() => setIsServicesOpen(false)}
                    >
                        <div className="flex items-center gap-1.5 text-[#22e3ad] hover:text-[#22e3ad] transition-colors group">

                            <span>Services</span>

                            <motion.div
                                animate={{
                                    rotate: isServicesOpen ? 180 : 0
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronDown className="w-4 h-4" />
                            </motion.div>

                            <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-[#22e3ad] transition-all duration-300 group-hover:w-full" />
                        </div>

                        {/* Services Dropdown */}
                        <AnimatePresence>
                            {isServicesOpen && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 10
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: 8
                                    }}
                                    transition={{
                                        duration: 0.18,
                                        ease: 'easeOut'
                                    }}
                                    className="absolute top-full -left-4 mt-2 w-56 bg-slate-900/95 backdrop-blur-xl border border-white/15 rounded-xl p-2 shadow-2xl z-50 flex flex-col gap-1"
                                >
                                    {SERVICES_MENU.map((item, index) => (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            className="px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-100 hover:text-[#22e3ad] hover:bg-white/10 transition-all flex items-center justify-between group"
                                        >
                                            <span>
                                                {item.label}
                                            </span>

                                            <ArrowRight
                                                className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#22e3ad]"
                                            />
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Portfolio */}
                    <Link
                        href="/portfolio"
                        className="relative group py-2 text-[#22e3ad] hover:text-[#22e3ad] transition-colors"
                    >
                        Portfolio

                        <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-[#22e3ad] transition-all duration-300 group-hover:w-full" />
                    </Link>

                    {/* Team */}
                    <Link
                        href="/team"
                        className="relative group py-2 text-[#22e3ad] hover:text-[#22e3ad] transition-colors"
                    >
                        Team

                        <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-[#22e3ad] transition-all duration-300 group-hover:w-full" />
                    </Link>

                    {/* Blog */}
                    <Link
                        href="/blog"
                        className="relative group py-2 text-[#22e3ad] hover:text-[#22e3ad] transition-colors"
                    >
                        Blog

                        <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-[#22e3ad] transition-all duration-300 group-hover:w-full" />
                    </Link>

                    {/* Contact */}
                    <Link
                        href="/contact"
                        className="relative group py-2 text-[#22e3ad] hover:text-[#22e3ad] transition-colors"
                    >
                        Contact

                        <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-[#22e3ad] transition-all duration-300 group-hover:w-full" />
                    </Link>

                    {/* Pricing */}
                    <Link
                        href="/pricing"
                        className="relative group py-2 text-[#22e3ad] hover:text-[#22e3ad] transition-colors"
                    >
                        Pricing

                        <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-[#22e3ad] transition-all duration-300 group-hover:w-full" />
                    </Link>

                </nav>

                {/* Desktop CTA */}
                <div className="hidden lg:block">
                    <Link href="/contact">
                        <button
                            className="
                                px-6 py-2.5
                                rounded-full
                                border-2
                                border-[#22e3ad]
                                text-[#22e3ad]
                                text-sm
                                font-bold
                                shadow-md
                                hover:bg-[#22e3ad]
                                hover:text-slate-950
                                transition-all
                                cursor-pointer
                            "
                        >
                            Lets Talk
                        </button>
                    </Link>
                </div>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden p-2 text-[#22e3ad] focus:outline-none z-50 cursor-pointer"
                    aria-label="Toggle Menu"
                >
                    {isMobileMenuOpen ? (
                        <X className="w-7 h-7 text-[#22e3ad]" />
                    ) : (
                        <Menu className="w-7 h-7 text-[#22e3ad]" />
                    )}
                </button>

            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            height: 0
                        }}
                        animate={{
                            opacity: 1,
                            height: '100vh'
                        }}
                        exit={{
                            opacity: 0,
                            height: 0
                        }}
                        transition={{
                            duration: 0.3,
                            ease: 'easeInOut'
                        }}
                        className="fixed inset-0 top-0 left-0 w-full bg-slate-950/95 backdrop-blur-2xl z-40 lg:hidden flex flex-col justify-between pt-24 pb-12 px-6 overflow-y-auto"
                    >

                        <div className="flex flex-col space-y-4">

                            {/* About */}
                            <Link
                                href="/pages/about"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-xl font-bold text-[#22e3ad] hover:text-[#22e3ad] transition-colors py-2 border-b border-white/10"
                            >
                                About
                            </Link>

                            {/* Services */}
                            <div className="border-b border-white/10 py-2">

                                <button
                                    onClick={() =>
                                        setIsMobileServicesOpen(!isMobileServicesOpen)
                                    }
                                    className="w-full flex items-center justify-between text-xl font-bold text-[#22e3ad] hover:text-[#22e3ad] transition-colors"
                                >
                                    <span>
                                        Services
                                    </span>

                                    <ChevronDown
                                        className={`
                                            w-5 h-5
                                            transition-transform
                                            duration-300
                                            ${
                                                isMobileServicesOpen
                                                    ? 'rotate-180 text-[#22e3ad]'
                                                    : ''
                                            }
                                        `}
                                    />
                                </button>

                                <AnimatePresence>
                                    {isMobileServicesOpen && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                height: 0
                                            }}
                                            animate={{
                                                opacity: 1,
                                                height: 'auto'
                                            }}
                                            exit={{
                                                opacity: 0,
                                                height: 0
                                            }}
                                            className="overflow-hidden flex flex-col gap-2 pt-3 pl-4"
                                        >
                                            {SERVICES_MENU.map((item, index) => (
                                                <Link
                                                    key={index}
                                                    href={item.href}
                                                    onClick={() =>
                                                        setIsMobileMenuOpen(false)
                                                    }
                                                    className="text-base font-semibold text-slate-300 hover:text-[#22e3ad] py-1 transition-colors flex items-center justify-between"
                                                >
                                                    <span>
                                                        {item.label}
                                                    </span>

                                                    <ArrowRight className="w-4 h-4 text-[#22e3ad]" />
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                            </div>

                            {/* Portfolio */}
                            <Link
                                href="/portfolio"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-xl font-bold text-[#22e3ad] hover:text-[#22e3ad] transition-colors py-2 border-b border-white/10"
                            >
                                Portfolio
                            </Link>

                            {/* Team */}
                            <Link
                                href="/team"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-xl font-bold text-[#22e3ad] hover:text-[#22e3ad] transition-colors py-2 border-b border-white/10"
                            >
                                Team
                            </Link>

                            {/* Blog */}
                            <Link
                                href="/blog"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-xl font-bold text-[#22e3ad] hover:text-[#22e3ad] transition-colors py-2 border-b border-white/10"
                            >
                                Blog
                            </Link>

                            {/* Contact */}
                            <Link
                                href="/contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-xl font-bold text-[#22e3ad] hover:text-[#22e3ad] transition-colors py-2 border-b border-white/10"
                            >
                                Contact
                            </Link>

                            {/* Pricing */}
                            <Link
                                href="/pricing"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-xl font-bold text-[#22e3ad] hover:text-[#22e3ad] transition-colors py-2 border-b border-white/10"
                            >
                                Pricing
                            </Link>

                        </div>

                        {/* Mobile CTA */}
                        <div className="pt-6">
                            <Link
                                href="/contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <button
                                    className="
                                        w-full
                                        py-3.5
                                        rounded-full
                                        bg-[#22e3ad]
                                        text-slate-950
                                        font-bold
                                        text-base
                                        shadow-lg
                                        hover:bg-emerald-400
                                        transition-colors
                                        cursor-pointer
                                    "
                                >
                                    Lets Talk
                                </button>
                            </Link>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>

        </header>
    );
}