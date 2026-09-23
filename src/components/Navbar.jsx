'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
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
    {
        label: 'Designs',
        href: '/pages/design',
    },
    {
        label: 'Marketing',
        href: '/pages/marketing',
    },
    {
        label: 'SEO',
        href: '/pages/seo',
    },
    {
        label: 'Copywriting',
        href: '/pages/copywrite',
    },
    {
        label: '3D Visualization',
        href: '/pages/autocad',
    },
    {
        label: 'AI Training',
        href: '/pages/ai-training',
    },
];

const NAV_ITEMS = [
    {
        label: 'About',
        href: '/pages/about',
    },
    {
        label: 'Portfolio',
        href: '/portfolio',
    },
    {
        label: 'Team',
        href: '/team',
    },
    {
        label: 'Blog',
        href: '/blog',
    },
    {
        label: 'Contact',
        href: '/contact',
    },
];

const WHATSAPP_URL = 'https://wa.me/8801685655696';

export default function Navbar() {
    const pathname = usePathname();

    const isHomePage =
        pathname === '/' || pathname === '';

    const isAdminPage =
        pathname.startsWith('/admin');

    const containerRef = useRef(null);
    const logoRef = useRef(null);
    const ctaRef = useRef(null);

    const [isScrolled, setIsScrolled] =
        useState(false);

    const [isServicesOpen, setIsServicesOpen] =
        useState(false);

    const [isMobileMenuOpen, setIsMobileMenuOpen] =
        useState(false);

    const [
        isMobileServicesOpen,
        setIsMobileServicesOpen,
    ] = useState(false);

    /*
    ================================================================
    DESKTOP SCROLL
    ================================================================
    */

    useEffect(() => {
        if (!isHomePage) {
            setIsScrolled(false);
            return;
        }

        const mediaQuery = window.matchMedia(
            '(min-width: 1024px)'
        );

        if (!mediaQuery.matches) {
            setIsScrolled(false);
            return;
        }

        const handleScroll = () => {
            const heroThreshold =
                window.innerHeight
                    ? window.innerHeight - 100
                    : 600;

            setIsScrolled(
                window.scrollY > heroThreshold
            );
        };

        handleScroll();

        window.addEventListener(
            'scroll',
            handleScroll,
            {
                passive: true,
            }
        );

        return () => {
            window.removeEventListener(
                'scroll',
                handleScroll
            );
        };
    }, [isHomePage, pathname]);

    /*
    ================================================================
    GSAP
    ================================================================
    
    Only runs on desktop.
    Mobile does NOT run this navbar GSAP.
    */

    useGSAP(
        () => {
            if (
                !window.matchMedia(
                    '(min-width: 1024px)'
                ).matches
            ) {
                return;
            }

            const logo = logoRef.current;
            const cta = ctaRef.current;

            gsap.fromTo(
                containerRef.current,
                {
                    y: -30,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power4.out',
                }
            );

            const trigger =
                ScrollTrigger.create({
                    start: '50px top',

                    onEnter: () => {
                        if (logo) {
                            gsap.to(logo, {
                                opacity: 0,
                                y: -20,
                                pointerEvents:
                                    'none',
                                duration: 0.3,
                            });
                        }

                        if (cta) {
                            gsap.to(cta, {
                                opacity: 0,
                                y: -20,
                                pointerEvents:
                                    'none',
                                duration: 0.3,
                            });
                        }
                    },

                    onLeaveBack: () => {
                        if (logo) {
                            gsap.to(logo, {
                                opacity: 1,
                                y: 0,
                                pointerEvents:
                                    'auto',
                                duration: 0.3,
                            });
                        }

                        if (cta) {
                            gsap.to(cta, {
                                opacity: 1,
                                y: 0,
                                pointerEvents:
                                    'auto',
                                duration: 0.3,
                            });
                        }
                    },
                });

            return () => {
                trigger.kill();
            };
        },
        {
            scope: containerRef,
            dependencies: [pathname],
        }
    );

    /*
    ================================================================
    MOBILE MENU
    ================================================================
    */

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setIsMobileServicesOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(
            (previous) => !previous
        );

        setIsMobileServicesOpen(false);
    };

    const isLight =
        !isHomePage || isScrolled;

    return (
        <>
            {/* ====================================================== */}
            {/* NAVBAR                                                  */}
            {/* ====================================================== */}

            <div
                className="
                    absolute
                    top-0
                    left-0
                    right-0
                    z-[99999]
                    w-full
                    pointer-events-none

                    lg:fixed
                "
            >
                <header
                    ref={containerRef}
                    className="
                        relative
                        z-[99999]
                        mx-auto
                        flex
                        w-[94%]
                        max-w-[1280px]
                        items-center
                        justify-between
                        px-2
                        pt-6
                        pb-6
                        sm:pt-7
                        sm:pb-7
                        lg:pt-7
                    "
                >
                    {/* ================================================== */}
                    {/* LOGO                                                 */}
                    {/* ================================================== */}

                    <div
                        ref={logoRef}
                        className="
                            pointer-events-auto
                            relative
                            z-[100000]
                            bg-transparent
                        "
                    >
                        <Link
                            href="/"
                            onClick={
                                closeMobileMenu
                            }
                            className="
                                group
                                relative
                                flex
                                h-11
                                items-center
                                rounded-full
                                bg-transparent
                                px-3
                                transition-all
                                duration-300
                                hover:bg-black/[0.06]
                            "
                        >
                            <Image
                                src="https://res.cloudinary.com/gd78bssj/image/upload/v1788229203/cropped-cropped-Asset-1_4x.png"
                                alt="adEstra Logo"
                                width={160}
                                height={40}
                                className="
                                    h-8
                                    w-auto
                                    object-contain
                                    sm:h-9
                                "
                                priority
                            />
                        </Link>
                    </div>

                    {/* ================================================== */}
                    {/* DESKTOP NAV                                          */}
                    {/* ================================================== */}

                    <div
                        className="
                            pointer-events-auto
                            mx-auto
                            hidden
                            lg:block
                        "
                    >
                        <nav
                            className={`
                                flex
                                h-[60px]
                                items-center
                                gap-1
                                rounded-full
                                border
                                px-4
                                transition-all
                                duration-500
                                ease-out

                                ${isLight
                                    ? `
                                            border-black/10
                                            bg-white/95
                                            shadow-[0_18px_50px_rgba(0,0,0,0.10)]
                                            backdrop-blur-2xl
                                        `
                                    : `
                                            border-white/[0.09]
                                            bg-[#0a0c0b]/45
                                            shadow-[0_12px_40px_rgba(0,0,0,0.20)]
                                            backdrop-blur-[18px]
                                        `
                                }
                            `}
                        >
                            {/* ABOUT */}

                            <DesktopLink
                                href="/pages/about"
                                label="About"
                                isLight={isLight}
                            />

                            {/* SERVICES */}

                            <div
                                className="relative"
                                onMouseEnter={() =>
                                    setIsServicesOpen(
                                        true
                                    )
                                }
                                onMouseLeave={() =>
                                    setIsServicesOpen(
                                        false
                                    )
                                }
                            >
                                <button
                                    type="button"
                                    className={`
                                        group
                                        relative
                                        flex
                                        items-center
                                        gap-1.5
                                        rounded-full
                                        px-3.5
                                        py-2.5
                                        text-[12px]
                                        font-medium
                                        tracking-wide
                                        transition-colors
                                        duration-300
                                        hover:bg-black/[0.05]

                                        ${isLight
                                            ? 'text-black/75'
                                            : 'text-white/50'
                                        }
                                    `}
                                >
                                    <span>
                                        Services
                                    </span>

                                    <motion.span
                                        animate={{
                                            rotate:
                                                isServicesOpen
                                                    ? 180
                                                    : 0,
                                        }}
                                        transition={{
                                            duration: 0.25,
                                            ease: 'easeOut',
                                        }}
                                    >
                                        <ChevronDown
                                            className={`
                                                h-3.5
                                                w-3.5

                                                ${isLight
                                                    ? 'text-black/50'
                                                    : 'text-white/35'
                                                }
                                            `}
                                        />
                                    </motion.span>
                                </button>

                                {/* DESKTOP SERVICES */}

                                <AnimatePresence>
                                    {isServicesOpen && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                y: 10,
                                                scale: 0.96,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: 8,
                                                scale: 0.97,
                                            }}
                                            transition={{
                                                duration: 0.22,
                                                ease: [
                                                    0.22,
                                                    1,
                                                    0.36,
                                                    1,
                                                ],
                                            }}
                                            className="
                                                absolute
                                                left-1/2
                                                top-[calc(100%+12px)]
                                                w-[285px]
                                                -translate-x-1/2
                                            "
                                        >
                                            <div
                                                className="
                                                    absolute
                                                    left-1/2
                                                    top-[-5px]
                                                    h-2.5
                                                    w-2.5
                                                    -translate-x-1/2
                                                    rotate-45
                                                    border-l
                                                    border-t
                                                    border-white/[0.10]
                                                    bg-[#101311]
                                                "
                                            />

                                            <div
                                                className="
                                                    relative
                                                    overflow-hidden
                                                    rounded-[22px]
                                                    border
                                                    border-white/[0.10]
                                                    bg-[#101311]/95
                                                    p-2
                                                    shadow-[0_30px_90px_rgba(0,0,0,0.42)]
                                                    backdrop-blur-2xl
                                                "
                                            >
                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        justify-between
                                                        px-4
                                                        pb-2
                                                        pt-3
                                                    "
                                                >
                                                    <span
                                                        className="
                                                            text-[9px]
                                                            font-medium
                                                            uppercase
                                                            tracking-[0.25em]
                                                            text-white/25
                                                        "
                                                    >
                                                        Services
                                                    </span>

                                                    <span
                                                        className="
                                                            h-1.5
                                                            w-1.5
                                                            rounded-full
                                                            bg-white/30
                                                        "
                                                    />
                                                </div>

                                                <div className="space-y-0.5">
                                                    {SERVICES_MENU.map(
                                                        (
                                                            item,
                                                            index
                                                        ) => (
                                                            <motion.div
                                                                key={
                                                                    item.href
                                                                }
                                                                initial={{
                                                                    opacity: 0,
                                                                    y: 5,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    y: 0,
                                                                }}
                                                                transition={{
                                                                    delay:
                                                                        index *
                                                                        0.035,
                                                                    duration: 0.25,
                                                                }}
                                                            >
                                                                <Link
                                                                    href={
                                                                        item.href
                                                                    }
                                                                    className="
                                                                        group
                                                                        flex
                                                                        items-center
                                                                        justify-between
                                                                        rounded-[15px]
                                                                        px-4
                                                                        py-3
                                                                        transition-all
                                                                        duration-300
                                                                        hover:bg-white/[0.06]
                                                                    "
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <span className="text-[9px] tabular-nums text-white/20">
                                                                            0
                                                                            {index +
                                                                                1}
                                                                        </span>

                                                                        <span className="text-[12px] font-medium text-white/55 transition-colors duration-300 group-hover:text-white">
                                                                            {
                                                                                item.label
                                                                            }
                                                                        </span>
                                                                    </div>

                                                                    <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 translate-y-1 text-white/0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-white/60" />
                                                                </Link>
                                                            </motion.div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* OTHER NAV ITEMS */}

                            {NAV_ITEMS.slice(
                                1
                            ).map((item) => (
                                <DesktopLink
                                    key={
                                        item.href
                                    }
                                    href={
                                        item.href
                                    }
                                    label={
                                        item.label
                                    }
                                    isLight={
                                        isLight
                                    }
                                />
                            ))}
                        </nav>
                    </div>

                    {/* ================================================== */}
                    {/* DESKTOP LET'S TALK                                   */}
                    {/* ================================================== */}

                    <div
                        ref={ctaRef}
                        className="
                            pointer-events-auto
                            hidden
                            bg-transparent
                            lg:block
                        "
                    >
                        <Link
                            href="/contact"
                            className="
                                group
                                relative
                                inline-flex
                                items-center
                                justify-center
                                gap-2.5
                                overflow-hidden
                                rounded-full
                                border
                                border-black/80
                                bg-black
                                px-6
                                py-3
                                shadow-md
                                transition-all
                                duration-300
                                hover:bg-black/90
                                hover:shadow-lg
                            "
                        >
                            <Sparkles
                                className="
                                    h-3.5
                                    w-3.5
                                    text-white
                                    transition-transform
                                    duration-300
                                    group-hover:scale-110
                                "
                            />

                            <span
                                className="
                                    text-[11px]
                                    font-bold
                                    uppercase
                                    tracking-[0.18em]
                                    text-white
                                "
                            >
                                Let&apos;s Talk
                            </span>

                            <div
                                className="
                                    relative
                                    flex
                                    h-4
                                    w-4
                                    overflow-hidden
                                "
                            >
                                <ArrowUpRight
                                    className="
                                        absolute
                                        inset-0
                                        h-4
                                        w-4
                                        text-white
                                        transition-all
                                        duration-300
                                        group-hover:-translate-y-full
                                        group-hover:translate-x-full
                                        group-hover:opacity-0
                                    "
                                />

                                <ArrowUpRight
                                    className="
                                        absolute
                                        inset-0
                                        h-4
                                        w-4
                                        translate-y-full
                                        -translate-x-full
                                        text-white
                                        opacity-0
                                        transition-all
                                        duration-300
                                        group-hover:translate-y-0
                                        group-hover:translate-x-0
                                        group-hover:opacity-100
                                    "
                                />
                            </div>
                        </Link>
                    </div>

                    {/* ================================================== */}
                    {/* MOBILE THREE DOT MENU                                */}
                    {/* ================================================== */}

                    <div
                        className="
                            pointer-events-auto
                            lg:hidden
                        "
                    >
                        <button
                            type="button"
                            onClick={
                                toggleMobileMenu
                            }
                            aria-label={
                                isMobileMenuOpen
                                    ? 'Close navigation'
                                    : 'Open navigation'
                            }
                            aria-expanded={
                                isMobileMenuOpen
                            }
                            className="
                                pointer-events-auto
                                relative
                                z-[100001]
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-black/15
                                bg-white/80
                                shadow-[0_8px_30px_rgba(0,0,0,0.10)]
                                backdrop-blur-xl
                                transition-all
                                duration-300
                                hover:bg-white
                                active:scale-95
                            "
                        >
                            <AnimatePresence
                                mode="wait"
                                initial={false}
                            >
                                {isMobileMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{
                                            opacity: 0,
                                            rotate: -90,
                                            scale: 0.7,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            rotate: 0,
                                            scale: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            rotate: 90,
                                            scale: 0.7,
                                        }}
                                    >
                                        <X className="h-5 w-5 text-black" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="dots"
                                        initial={{
                                            opacity: 0,
                                            scale: 0.7,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.7,
                                        }}
                                        className="
                                            flex
                                            flex-col
                                            items-center
                                            justify-center
                                            gap-[3px]
                                        "
                                    >
                                        <span className="block h-[3px] w-[3px] rounded-full bg-black" />

                                        <span className="block h-[3px] w-[3px] rounded-full bg-black" />

                                        <span className="block h-[3px] w-[3px] rounded-full bg-black" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </header>

                {/* ====================================================== */}
                {/* MOBILE MENU                                             */}
                {/* ====================================================== */}

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: -12,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -10,
                            }}
                            transition={{
                                duration: 0.24,
                                ease: [
                                    0.22,
                                    1,
                                    0.36,
                                    1,
                                ],
                            }}
                            className="
                                pointer-events-auto
                                absolute
                                left-0
                                right-0
                                top-full
                                z-[100000]
                                px-[3%]

                                lg:hidden
                            "
                        >
                            <div
                                className="
                                    mx-auto
                                    w-full
                                    overflow-hidden
                                    rounded-[22px]
                                    border
                                    border-black/10
                                    bg-white/95
                                    p-2
                                    shadow-[0_25px_80px_rgba(0,0,0,0.16)]
                                    backdrop-blur-2xl
                                "
                            >
                                {/* ABOUT */}

                                <MobileLink
                                    href="/pages/about"
                                    label="About"
                                    onClick={
                                        closeMobileMenu
                                    }
                                />

                                {/* SERVICES */}

                                <div>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsMobileServicesOpen(
                                                (
                                                    previous
                                                ) =>
                                                    !previous
                                            )
                                        }
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            justify-between
                                            rounded-[15px]
                                            px-4
                                            py-3.5
                                            text-left
                                            text-[13px]
                                            font-medium
                                            text-black/75
                                            transition-colors
                                            duration-300
                                            hover:bg-black/[0.04]
                                        "
                                    >
                                        <span>
                                            Services
                                        </span>

                                        <motion.span
                                            animate={{
                                                rotate:
                                                    isMobileServicesOpen
                                                        ? 180
                                                        : 0,
                                            }}
                                            transition={{
                                                duration: 0.2,
                                            }}
                                        >
                                            <ChevronDown className="h-4 w-4 text-black/40" />
                                        </motion.span>
                                    </button>

                                    <AnimatePresence
                                        initial={false}
                                    >
                                        {isMobileServicesOpen && (
                                            <motion.div
                                                initial={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    height: 'auto',
                                                    opacity: 1,
                                                }}
                                                exit={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                transition={{
                                                    duration: 0.22,
                                                    ease: 'easeOut',
                                                }}
                                                className="overflow-hidden"
                                            >
                                                <div className="mb-1 ml-3 border-l border-black/10 pl-2">
                                                    {SERVICES_MENU.map(
                                                        (
                                                            item,
                                                            index
                                                        ) => (
                                                            <Link
                                                                key={
                                                                    item.href
                                                                }
                                                                href={
                                                                    item.href
                                                                }
                                                                onClick={
                                                                    closeMobileMenu
                                                                }
                                                                className="
                                                                    flex
                                                                    items-center
                                                                    justify-between
                                                                    rounded-[12px]
                                                                    px-3
                                                                    py-2.5
                                                                    transition-colors
                                                                    duration-300
                                                                    hover:bg-black/[0.04]
                                                                "
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <span className="text-[9px] tabular-nums text-black/25">
                                                                        0
                                                                        {index +
                                                                            1}
                                                                    </span>

                                                                    <span className="text-[12px] font-medium text-black/60">
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </span>
                                                                </div>

                                                                <ArrowUpRight className="h-3.5 w-3.5 text-black/25" />
                                                            </Link>
                                                        )
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* OTHER LINKS */}

                                {NAV_ITEMS.slice(
                                    1
                                ).map((item) => (
                                    <MobileLink
                                        key={
                                            item.href
                                        }
                                        href={
                                            item.href
                                        }
                                        label={
                                            item.label
                                        }
                                        onClick={
                                            closeMobileMenu
                                        }
                                    />
                                ))}

                                {/* MOBILE CTA */}

                                <div
                                    className="
                                        mt-1
                                        border-t
                                        border-black/[0.07]
                                        pt-2
                                    "
                                >
                                    <Link
                                        href="/contact"
                                        onClick={
                                            closeMobileMenu
                                        }
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            rounded-[15px]
                                            bg-black
                                            px-4
                                            py-3.5
                                        "
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <Sparkles className="h-3.5 w-3.5 text-white" />

                                            <span
                                                className="
                                                    text-[11px]
                                                    font-bold
                                                    uppercase
                                                    tracking-[0.18em]
                                                    text-white
                                                "
                                            >
                                                Let&apos;s Talk
                                            </span>
                                        </div>

                                        <ArrowUpRight className="h-4 w-4 text-white/70" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ====================================================== */}
            {/* FLOATING WHATSAPP                                       */}
            {/* ====================================================== */}

            {!isAdminPage && (
                <FloatingWhatsApp />
            )}
        </>
    );
}

/* ================================================================== */
/* DESKTOP LINK                                                       */
/* ================================================================== */

function DesktopLink({
    href,
    label,
    isLight,
}) {
    return (
        <Link
            href={href}
            className={`
                group
                relative
                rounded-full
                px-3.5
                py-2.5
                text-[12px]
                font-medium
                tracking-wide
                transition-colors
                duration-300
                hover:bg-black/[0.05]

                ${isLight
                    ? 'text-black/75'
                    : 'text-white/50'
                }
            `}
        >
            {label}
        </Link>
    );
}

/* ================================================================== */
/* MOBILE LINK                                                        */
/* ================================================================== */

function MobileLink({
    href,
    label,
    onClick,
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="
                flex
                w-full
                items-center
                justify-between
                rounded-[15px]
                px-4
                py-3.5
                text-[13px]
                font-medium
                text-black/75
                transition-colors
                duration-300
                hover:bg-black/[0.04]
                hover:text-black
            "
        >
            <span>{label}</span>

            <ArrowUpRight className="h-4 w-4 text-black/20" />
        </Link>
    );
}

/* ================================================================== */
/* FLOATING WHATSAPP                                                  */
/* ================================================================== */

function FloatingWhatsApp() {
    return (
        <motion.a
            href="https://wa.me/8801685655696"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            initial={{
                opacity: 0,
                scale: 0.7,
                y: 20,
            }}
            animate={{
                opacity: 1,
                scale: 1,
                y: 0,
            }}
            transition={{
                duration: 0.5,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
                scale: 1.08,
            }}
            whileTap={{
                scale: 0.92,
            }}
            className="
                fixed
                bottom-5
                right-5
                z-[99998]

                flex
                h-14
                w-14
                items-center
                justify-center

                rounded-full

                bg-[#25D366]

                shadow-[0_10px_35px_rgba(37,211,102,0.32)]

                transition-shadow
                duration-300

                hover:shadow-[0_14px_45px_rgba(37,211,102,0.45)]

                sm:bottom-6
                sm:right-6
                sm:h-[58px]
                sm:w-[58px]
            "
        >
            {/* WhatsApp logo */}

            <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="
                    h-[29px]
                    w-[29px]
                    sm:h-[30px]
                    sm:w-[30px]
                "
                aria-hidden="true"
            >
                <path
                    d="M16.002 3C8.823 3 3 8.823 3 16.002c0 2.294.594 4.45 1.635 6.32L3 29l6.85-1.597a12.94 12.94 0 0 0 6.152 1.557h.006C23.177 28.96 29 23.181 29 16.002 29 8.823 23.177 3 16.002 3Z"
                    fill="white"
                />

                <path
                    d="M22.96 19.078c-.38-.19-2.24-1.105-2.587-1.23-.347-.127-.6-.19-.853.19-.253.38-.98 1.23-1.2 1.482-.22.254-.44.285-.82.095-.38-.19-1.604-.591-3.056-1.886-1.13-1.008-1.893-2.254-2.114-2.634-.22-.38-.023-.585.167-.774.17-.17.38-.443.57-.664.19-.22.253-.38.38-.633.126-.253.063-.475-.032-.664-.095-.19-.853-2.055-1.168-2.814-.308-.738-.622-.638-.853-.65-.22-.011-.475-.013-.728-.013-.253 0-.664.095-1.012.475-.347.38-1.328 1.298-1.328 3.163 0 1.865 1.36 3.666 1.55 3.919.19.253 2.676 4.086 6.482 5.73.906.392 1.613.625 2.164.8.91.29 1.739.249 2.394.151.73-.109 2.24-.916 2.555-1.8.316-.885.316-1.643.221-1.8-.095-.158-.348-.253-.728-.443Z"
                    fill="#25D366"
                />
            </svg>

            {/* Small hover glow */}

            <span
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    rounded-full
                    bg-white/20
                    opacity-0
                    transition-opacity
                    duration-300
                    hover:opacity-100
                "
            />
        </motion.a>
    );
}