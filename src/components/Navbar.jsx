'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
    Menu,
    X,
    ChevronDown,
    ArrowUpRight,
    Sparkles,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SERVICES_MENU = [
    { label: 'Designs', href: '/pages/design' },
    { label: 'Marketing', href: '/pages/marketing' },
    { label: 'SEO', href: '/pages/seo' },
    { label: 'Copywriting', href: '/pages/copywrite' },
    { label: '3D Visualization', href: '/pages/autocad' },
    { label: 'AI Training', href: '/pages/ai-training' },
];

const NAV_ITEMS = [
    { label: 'About', href: '/pages/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Team', href: '/team' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const pathname = usePathname();
    const isHomePage = pathname === '/' || pathname === '';

    const containerRef = useRef(null);
    const logoRef = useRef(null);
    const ctaRef = useRef(null);

    // Dark by default on homepage, light everywhere else
    const [isScrolled, setIsScrolled] = useState(false);

    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

    // Robust scroll listener tied to actual window scroll offset
    useEffect(() => {
        if (!isHomePage) return;

        const handleScroll = () => {
            // Adjust '600' to match your Hero height (e.g., window.innerHeight - 80)
            const heroThreshold = window.innerHeight ? window.innerHeight - 100 : 600;
            if (window.scrollY > heroThreshold) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Check on initial load
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHomePage, pathname]);

    // GSAP Entrance & Shrink
    useGSAP(
        () => {
            const logo = logoRef.current;
            const cta = ctaRef.current;

            gsap.fromTo(
                containerRef.current,
                { y: -30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out' }
            );

            ScrollTrigger.create({
                start: '50px top',
                onEnter: () => {
                    if (logo) gsap.to(logo, { opacity: 0, y: -20, pointerEvents: 'none', duration: 0.3 });
                    if (cta) gsap.to(cta, { opacity: 0, y: -20, pointerEvents: 'none', duration: 0.3 });
                },
                onLeaveBack: () => {
                    if (logo) gsap.to(logo, { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.3 });
                    if (cta) gsap.to(cta, { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.3 });
                },
            });

            return () => {
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            };
        },
        { scope: containerRef, dependencies: [pathname] }
    );

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setIsMobileServicesOpen(false);
    };

    // Calculate light mode condition directly
    const isLight = !isHomePage || isScrolled;

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-[100] w-full pointer-events-none mb-8">
                <header
                    ref={containerRef}
                    className="mx-auto pt-6 pb-6 sm:pt-7 lg:pt-7 flex w-[94%] max-w-[1280px] items-center justify-between px-2"
                >
                    {/* LOGO */}
                    <div ref={logoRef} className="pointer-events-auto bg-transparent">
                        <Link
                            href="/"
                            className="group relative flex h-11 items-center rounded-full bg-transparent px-3 transition-all duration-300 hover:bg-black/[0.06]"
                        >
                            <Image
                                src="https://res.cloudinary.com/gd78bssj/image/upload/v1788229203/cropped-cropped-Asset-1_4x.png"
                                alt="adEstra Logo"
                                width={160}
                                height={40}
                                className="h-8 w-auto object-contain sm:h-9"
                                priority
                            />
                        </Link>
                    </div>

                    {/* DESKTOP NAV */}
                    <div className="pointer-events-auto hidden lg:block mx-auto">
                        <nav
                            className={`flex h-[60px] items-center gap-1 rounded-full border px-4 transition-all duration-500 ease-out ${isLight
                                ? 'bg-white/95 border-black/10 shadow-[0_18px_50px_rgba(0,0,0,0.10)] backdrop-blur-2xl'
                                : 'bg-[#0a0c0b]/45 border-white/[0.09] shadow-[0_12px_40px_rgba(0,0,0,0.20)] backdrop-blur-[18px]'
                                }`}
                        >
                            <DesktopLink href="/pages/about" label="About" isLight={isLight} />

                            {/* SERVICES */}
                            <div
                                className="relative"
                                onMouseEnter={() => setIsServicesOpen(true)}
                                onMouseLeave={() => setIsServicesOpen(false)}
                            >
                                <button
                                    type="button"
                                    className={`group relative flex items-center gap-1.5 rounded-full px-3.5 py-2.5 text-[12px] font-medium tracking-wide transition-colors duration-300 hover:bg-black/[0.05] ${isLight ? 'text-black/75' : 'text-white/50'
                                        }`}
                                >
                                    <span>Services</span>

                                    <motion.span
                                        animate={{ rotate: isServicesOpen ? 180 : 0 }}
                                        transition={{ duration: 0.25, ease: 'easeOut' }}
                                    >
                                        <ChevronDown
                                            className={`h-3.5 w-3.5 transition-colors duration-300 ${isLight ? 'text-black/50' : 'text-white/35'
                                                }`}
                                        />
                                    </motion.span>
                                </button>

                                {/* SERVICES DROPDOWN */}
                                <AnimatePresence>
                                    {isServicesOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.96 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 8, scale: 0.97 }}
                                            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                                            className="absolute left-1/2 top-[calc(100%+12px)] w-[285px] -translate-x-1/2"
                                        >
                                            <div className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-l border-t border-white/[0.10] bg-[#101311]" />

                                            <div className="relative overflow-hidden rounded-[22px] border border-white/[0.10] bg-[#101311]/95 p-2 shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
                                                <div className="flex items-center justify-between px-4 pb-2 pt-3">
                                                    <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/25">
                                                        Services
                                                    </span>

                                                    <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                                                </div>

                                                <div className="space-y-0.5">
                                                    {SERVICES_MENU.map((item, index) => (
                                                        <motion.div
                                                            key={item.href}
                                                            initial={{ opacity: 0, y: 5 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: index * 0.035, duration: 0.25 }}
                                                        >
                                                            <Link
                                                                href={item.href}
                                                                className="group flex items-center justify-between rounded-[15px] px-4 py-3 transition-all duration-300 hover:bg-white/[0.06]"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <span className="text-[9px] tabular-nums text-white/20">
                                                                        0{index + 1}
                                                                    </span>

                                                                    <span className="text-[12px] font-medium text-white/55 transition-colors duration-300 group-hover:text-white">
                                                                        {item.label}
                                                                    </span>
                                                                </div>

                                                                <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 translate-y-1 text-white/0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-white/60" />
                                                            </Link>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* OTHER NAV ITEMS */}
                            {NAV_ITEMS.slice(1).map((item) => (
                                <DesktopLink key={item.href} href={item.href} label={item.label} isLight={isLight} />
                            ))}
                        </nav>
                    </div>

                    {/* CTA BUTTON */}
                    <div ref={ctaRef} className="pointer-events-auto hidden lg:block bg-transparent">
                        <Link
                            href="/contact"
                            className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full border border-black/80 bg-black px-6 py-3 shadow-md transition-all duration-300 hover:bg-black/90 hover:shadow-lg"
                        >
                            <Sparkles className="h-3.5 w-3.5 text-white transition-transform duration-300 group-hover:scale-110" />

                            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                                Let&apos;s Talk
                            </span>

                            <div className="relative flex h-4 w-4 overflow-hidden">
                                <ArrowUpRight className="absolute inset-0 h-4 w-4 text-white transition-all duration-300 group-hover:-translate-y-full group-hover:translate-x-full group-hover:opacity-0" />
                                <ArrowUpRight className="absolute inset-0 h-4 w-4 translate-y-full -translate-x-full text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100" />
                            </div>
                        </Link>
                    </div>

                    {/* MOBILE TOGGLE */}
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="pointer-events-auto relative z-[110] flex h-11 w-11 items-center justify-center rounded-full border border-black/20 bg-white/80 text-black shadow-sm transition-all duration-300 hover:bg-white lg:hidden"
                        aria-label="Toggle navigation"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {isMobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                                >
                                    <X className="h-5 w-5" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
                                >
                                    <Menu className="h-5 w-5" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </header>
            </div>
        </>
    );
}

function DesktopLink({ href, label, isLight }) {
    return (
        <Link
            href={href}
            className={`group relative rounded-full px-3.5 py-2.5 text-[12px] font-medium tracking-wide transition-colors duration-300 hover:bg-black/[0.05] ${isLight ? 'text-black/75' : 'text-white/50'
                }`}
        >
            {label}
        </Link>
    );
}