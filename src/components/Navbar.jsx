'use client';

import React, { useRef, useState } from 'react';
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
    PhoneCall,
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
    { label: 'AutoCAD Design', href: '/pages/autocad' },
    { label: 'AI Training', href: '/pages/ai-training' },
];

const NAV_ITEMS = [
    { label: 'About', href: '/pages/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Team', href: '/team' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Pricing', href: '/pricing' },
];

export default function Navbar() {
    const pathname = usePathname();

    const containerRef = useRef(null);
    const navPillRef = useRef(null);
    const logoRef = useRef(null);
    const ctaRef = useRef(null);

    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

    useGSAP(
        () => {
            const navPill = navPillRef.current;
            const logo = logoRef.current;
            const cta = ctaRef.current;

            if (!navPill) return;

            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

            const hero = document.getElementById('hero');

            /* ENTRANCE ANIMATION */
            gsap.fromTo(
                containerRef.current,
                { y: -30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: 0.1, ease: 'power4.out' }
            );

            /* HELPER FUNCTIONS */
            const setDarkNavbar = () => {
                gsap.to(navPill, {
                    backgroundColor: 'rgba(10, 12, 11, 0.45)',
                    borderColor: 'rgba(255, 255, 255, 0.09)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.20)',
                    backdropFilter: 'blur(18px)',
                    scale: 1,
                    duration: 0.45,
                    ease: 'power3.out',
                    overwrite: 'auto',
                });
                gsap.to('.desktop-nav-text', {
                    color: 'rgba(255, 255, 255, 0.50)',
                    duration: 0.35,
                    ease: 'power2.out',
                    overwrite: 'auto',
                });
                gsap.to('.services-button', {
                    color: 'rgba(255, 255, 255, 0.50)',
                    duration: 0.35,
                    ease: 'power2.out',
                    overwrite: 'auto',
                });
                gsap.to('.desktop-nav-icon', {
                    color: 'rgba(255, 255, 255, 0.35)',
                    duration: 0.35,
                    ease: 'power2.out',
                    overwrite: 'auto',
                });
            };

            const setLightNavbar = () => {
                gsap.to(navPill, {
                    backgroundColor: 'rgba(255, 255, 255, 0.94)',
                    borderColor: 'rgba(0, 0, 0, 0.10)',
                    boxShadow: '0 18px 50px rgba(0, 0, 0, 0.10)',
                    backdropFilter: 'blur(24px)',
                    scale: 1,
                    duration: 0.45,
                    ease: 'power3.out',
                    overwrite: 'auto',
                });
                gsap.to('.desktop-nav-text', {
                    color: 'rgba(0, 0, 0, 0.75)',
                    duration: 0.35,
                    ease: 'power2.out',
                    overwrite: 'auto',
                });
                gsap.to('.services-button', {
                    color: 'rgba(0, 0, 0, 0.75)',
                    duration: 0.35,
                    ease: 'power2.out',
                    overwrite: 'auto',
                });
                gsap.to('.desktop-nav-icon', {
                    color: 'rgba(0, 0, 0, 0.50)',
                    duration: 0.35,
                    ease: 'power2.out',
                    overwrite: 'auto',
                });
            };

            /* SCROLL LOGIC FOR HERO (HOME PAGE ONLY) */
            if (hero) {
                ScrollTrigger.create({
                    trigger: hero,
                    start: 'bottom top',
                    onEnter: () => setLightNavbar(),
                    onLeaveBack: () => setDarkNavbar(),
                });

                ScrollTrigger.create({
                    start: '50px top',
                    onEnter: () => {
                        if (logo) gsap.to(logo, { opacity: 0, y: -20, pointerEvents: 'none', duration: 0.35 });
                        if (cta) gsap.to(cta, { opacity: 0, y: -20, pointerEvents: 'none', duration: 0.35 });

                        const heroBottom = hero.getBoundingClientRect().bottom;
                        if (heroBottom > 0) {
                            gsap.to(navPill, {
                                backgroundColor: 'rgba(10, 12, 11, 0.85)',
                                borderColor: 'rgba(255, 255, 255, 0.18)',
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.45)',
                                backdropFilter: 'blur(24px)',
                                scale: 0.98,
                                duration: 0.4,
                            });
                        }
                    },
                    onLeaveBack: () => {
                        if (logo) gsap.to(logo, { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.35 });
                        if (cta) gsap.to(cta, { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.35 });
                        setDarkNavbar();
                    },
                });

                const heroBottom = hero.getBoundingClientRect().bottom;
                if (heroBottom <= 0) {
                    setLightNavbar();
                } else {
                    setDarkNavbar();
                }
            } else {
                setLightNavbar();

                ScrollTrigger.create({
                    start: '50px top',
                    onEnter: () => {
                        if (logo) gsap.to(logo, { opacity: 0, y: -20, pointerEvents: 'none', duration: 0.35 });
                        if (cta) gsap.to(cta, { opacity: 0, y: -20, pointerEvents: 'none', duration: 0.35 });
                    },
                    onLeaveBack: () => {
                        if (logo) gsap.to(logo, { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.35 });
                        if (cta) gsap.to(cta, { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.35 });
                    },
                });
            }

            ScrollTrigger.refresh();

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

    return (
        <>
            {/* Added mb-8 for extra spacing from page text */}
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
                            ref={navPillRef}
                            className="flex h-[60px] items-center gap-1 rounded-full border border-white/[0.09] bg-black/[0.45] px-4 shadow-[0_12px_40px_rgba(0,0,0,0.2)] backdrop-blur-[18px]"
                        >
                            <DesktopLink href="/pages/about" label="About" />

                            {/* SERVICES */}
                            <div
                                className="relative"
                                onMouseEnter={() => setIsServicesOpen(true)}
                                onMouseLeave={() => setIsServicesOpen(false)}
                            >
                                <button
                                    type="button"
                                    className="services-button group relative flex items-center gap-1.5 rounded-full px-3.5 py-2.5 text-[12px] font-medium tracking-wide text-white/50 transition-all duration-300 hover:bg-black/[0.05]"
                                >
                                    <span>Services</span>

                                    <motion.span
                                        animate={{ rotate: isServicesOpen ? 180 : 0 }}
                                        transition={{ duration: 0.25, ease: 'easeOut' }}
                                    >
                                        <ChevronDown className="desktop-nav-icon h-3.5 w-3.5 text-white/35" />
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
                                <DesktopLink key={item.href} href={item.href} label={item.label} />
                            ))}
                        </nav>
                    </div>

                    {/* FIXED VISIBILITY FOR CTA BUTTON */}
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

            {/* CALL BUTTON */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="fixed bottom-6 right-6 z-[100]"
            >
                <a
                    href="tel:+1234567890"
                    aria-label="Call Now"
                    className="group relative flex items-center gap-3 rounded-full border border-black/10 bg-black px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 hover:scale-105"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:rotate-12">
                        <PhoneCall className="h-4 w-4" />
                    </div>

                    <span className="pr-2 text-[11px] font-bold uppercase tracking-[0.15em] text-white">
                        Call Now
                    </span>
                </a>
            </motion.div>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-3 z-[90] flex flex-col overflow-y-auto rounded-[30px] border border-black/[0.10] bg-white/95 px-6 pb-7 pt-28 shadow-[0_30px_100px_rgba(0,0,0,0.2)] backdrop-blur-3xl lg:hidden"
                    >
                        <div className="relative flex flex-1 flex-col">
                            <div className="mb-7">
                                <span className="text-[9px] uppercase tracking-[0.3em] text-black/40 font-bold">
                                    Menu
                                </span>
                            </div>

                            <div>
                                <MobileLink href="/pages/about" label="About" onClick={closeMobileMenu} />

                                <div className="border-b border-black/[0.07]">
                                    <button
                                        type="button"
                                        onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                                        className="flex w-full items-center justify-between py-4"
                                    >
                                        <span className="text-[22px] font-medium tracking-[-0.04em] text-black">
                                            Services
                                        </span>

                                        <motion.div animate={{ rotate: isMobileServicesOpen ? 180 : 0 }}>
                                            <ChevronDown className="h-5 w-5 text-black/60" />
                                        </motion.div>
                                    </button>

                                    <AnimatePresence>
                                        {isMobileServicesOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="space-y-1 pb-4 pl-3">
                                                    {SERVICES_MENU.map((item) => (
                                                        <Link
                                                            key={item.href}
                                                            href={item.href}
                                                            onClick={closeMobileMenu}
                                                            className="group flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-black/[0.05]"
                                                        >
                                                            <span className="text-sm font-medium text-black/70 group-hover:text-black">
                                                                {item.label}
                                                            </span>

                                                            <ArrowUpRight className="h-3.5 w-3.5 text-black/40 group-hover:text-black" />
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {NAV_ITEMS.slice(1).map((item) => (
                                    <MobileLink
                                        key={item.href}
                                        href={item.href}
                                        label={item.label}
                                        onClick={closeMobileMenu}
                                    />
                                ))}
                            </div>

                            <div className="mt-auto pt-10">
                                <Link
                                    href="/contact"
                                    onClick={closeMobileMenu}
                                    className="group flex w-full items-center justify-between rounded-full bg-black px-6 py-4 transition-transform duration-300 hover:scale-[1.015]"
                                >
                                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white">
                                        Let&apos;s Talk
                                    </span>

                                    <ArrowUpRight className="h-5 w-5 text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function DesktopLink({ href, label }) {
    return (
        <Link
            href={href}
            className="desktop-nav-text group relative rounded-full px-3.5 py-2.5 text-[12px] font-medium tracking-wide text-white/50 transition-all duration-300 hover:bg-black/[0.05]"
        >
            {label}
        </Link>
    );
}

function MobileLink({ href, label, onClick }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="group flex items-center justify-between border-b border-black/[0.07] py-4"
        >
            <span className="text-[22px] font-medium tracking-[-0.04em] text-black/80 transition-colors duration-300 group-hover:text-black">
                {label}
            </span>

            <ArrowUpRight className="h-5 w-5 text-black/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black" />
        </Link>
    );
}