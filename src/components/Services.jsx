'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    {
        id: '01.',
        title: 'Design',
        description:
            'We believe that exceptional design is the main cornerstone of effective new digital experiences.',
        bg: '#f7f6f8',
        subServices: [
            'UI/UX DESIGN',
            'PRODUCT DESIGN',
            'BRAND IDENTITY DESIGN',
            'GRAPHICS / 3D DESIGN',
        ],
    },
    {
        id: '02.',
        title: 'Marketing',
        description:
            'We offer a comprehensive range of digital marketing services designed to help your business thrive in the digital landscape.',
        bg: '#f1f0eb',
        subServices: [
            'SEO EXPERT',
            'SOCIAL MEDIA MARKETING',
            'CONTENT MARKETING',
            'EMAIL MARKETING',
        ],
    },
    {
        id: '03.',
        title: 'SEO',
        description:
            'Our SEO strategies are designed to improve visibility, attract qualified traffic, and build sustainable organic growth.',
        bg: '#eef3f7',
        subServices: [
            'KEYWORD RESEARCH',
            'ON-PAGE SEO',
            'TECHNICAL SEO',
            'SEO STRATEGY',
        ],
    },
    {
        id: '04.',
        title: 'Copywriting',
        description:
            'Our copywriting services create clear, compelling, and persuasive content that communicates your brand and drives meaningful action.',
        bg: '#f4f1ed',
        subServices: [
            'ADVERTISING COPY',
            'SEO COPYWRITING',
            'CONTENT WRITING',
            'SALES COPYWRITING',
        ],
    },
    {
        id: '05.',
        title: 'Autocad Design',
        description:
            'Our AutoCAD design services transform conceptual ideas into precise, detailed, and production-ready technical drawings.',
        bg: '#f1f4f7',
        subServices: [
            'IDEATION',
            'MODELING',
            'ANALYSIS',
            'FINALIZATION',
        ],
    },
    {
        id: '06.',
        title: 'Ai Training',
        description:
            'Enhance your digital strategy with our AI Training Service, tailored to boost productivity and SEO performance.',
        bg: '#f7f5f6',
        subServices: [
            'RESEARCH',
            'QUESTION',
            'ANSWER',
            'RESULT',
        ],
    },
];

export default function ServicesSection() {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useLayoutEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const ctx = gsap.context(() => {
            const cards = cardsRef.current.filter(Boolean);

            const mm = gsap.matchMedia();

            /*
            ============================================================
            DESKTOP
            ============================================================
            */

            mm.add('(min-width: 768px)', () => {
                cards.forEach((card) => {
                    const title = card.querySelector('.service-title');
                    const description =
                        card.querySelector('.service-description');
                    const bottom =
                        card.querySelector('.service-bottom');

                    /*
                    Initial state
                    */
                    gsap.set(title, {
                        y: 50,
                        opacity: 0,
                    });

                    gsap.set(description, {
                        y: 30,
                        opacity: 0,
                    });

                    gsap.set(bottom, {
                        y: 20,
                        opacity: 0,
                    });

                    /*
                    Title
                    */
                    gsap.to(title, {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 80%',
                            toggleActions:
                                'play none none reverse',
                        },
                    });

                    /*
                    Description
                    */
                    gsap.to(description, {
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                        delay: 0.08,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 80%',
                            toggleActions:
                                'play none none reverse',
                        },
                    });

                    /*
                    Bottom services
                    */
                    gsap.to(bottom, {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 80%',
                            toggleActions:
                                'play none none reverse',
                        },
                    });
                });

                /*
                ========================================================
                STACK DEPTH
                ========================================================

                When a new card comes up, the cards underneath become
                slightly smaller.

                This makes the stack feel deeper without changing
                the actual card design.
                */

                cards.forEach((card, index) => {
                    if (index === 0) return;

                    const previousCards = cards.slice(0, index);

                    previousCards.forEach(
                        (previousCard, previousIndex) => {
                            gsap.to(previousCard, {
                                scale: Math.max(
                                    0.96,
                                    1 -
                                        (index - previousIndex) *
                                            0.012
                                ),
                                ease: 'none',
                                scrollTrigger: {
                                    trigger: card,
                                    start: 'top bottom',
                                    end: 'top top',
                                    scrub: true,
                                },
                            });
                        }
                    );
                });

                ScrollTrigger.refresh();
            });

            /*
            ============================================================
            MOBILE
            ============================================================
            */

            mm.add('(max-width: 767px)', () => {
                cards.forEach((card) => {
                    const title =
                        card.querySelector('.service-title');

                    const description =
                        card.querySelector(
                            '.service-description'
                        );

                    const bottom =
                        card.querySelector('.service-bottom');

                    gsap.set(title, {
                        y: 30,
                        opacity: 0,
                    });

                    gsap.set(description, {
                        y: 20,
                        opacity: 0,
                    });

                    gsap.set(bottom, {
                        y: 15,
                        opacity: 0,
                    });

                    gsap.to(title, {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions:
                                'play none none reverse',
                        },
                    });

                    gsap.to(description, {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: 0.08,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions:
                                'play none none reverse',
                        },
                    });

                    gsap.to(bottom, {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions:
                                'play none none reverse',
                        },
                    });
                });

                ScrollTrigger.refresh();
            });

            return () => {
                mm.revert();
            };
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-[#f7f6f8]"
        >
            {/* ========================================================
                HEADER
            ======================================================== */}

            <div
                className="
                    relative
                    z-[100]
                    flex
                    w-full
                    items-center
                    justify-between
                    border-t
                    border-black/[0.08]
                    bg-[#f7f6f8]
                    px-6
                    py-6

                    sm:px-10
                    sm:py-7

                    lg:px-[9.4vw]
                    lg:py-8
                "
            >
                <h2
                    className="
                        text-[28px]
                        font-medium
                        leading-none
                        tracking-[-0.045em]
                        text-[#111111]

                        sm:text-[36px]

                        lg:text-[42px]
                    "
                >
                    Our services
                </h2>

                <Link
                    href="/services"
                    className="
                        group
                        flex
                        items-center
                        gap-3
                        text-[10px]
                        font-medium
                        uppercase
                        tracking-[0.12em]
                        text-[#111111]

                        sm:text-[11px]
                    "
                >
                    <span>
                        See All Services
                    </span>

                    <span
                        className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-black
                            transition-all
                            duration-300
                            group-hover:bg-black
                            group-hover:text-white

                            sm:h-9
                            sm:w-9
                        "
                    >
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M2 10L10 2"
                                stroke="currentColor"
                                strokeWidth="1.3"
                                strokeLinecap="round"
                            />

                            <path
                                d="M4 2H10V8"
                                stroke="currentColor"
                                strokeWidth="1.3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                </Link>
            </div>

            {/* ========================================================
                STACKING SERVICES
            ======================================================== */}

            <div className="relative w-full">
                {SERVICES.map((service, index) => (
                    <article
                        key={service.id}
                        ref={(element) => {
                            cardsRef.current[index] = element;
                        }}
                        className="
                            service-card
                            sticky
                            w-full

                            /*
                            Desktop card height
                            */
                            min-h-[470px]

                            /*
                            Mobile
                            */
                            sm:min-h-[500px]

                            /*
                            Layout
                            */
                            flex
                            flex-col
                            justify-between

                            /*
                            Borders
                            */
                            border-t
                            border-black/[0.05]

                            /*
                            Padding
                            */
                            px-6
                            py-10

                            sm:px-10
                            sm:py-12

                            lg:px-[9.4vw]
                            lg:py-[55px]
                        "
                        style={{
                            backgroundColor: service.bg,

                            /*
                            ==================================================
                            STACK POSITION
                            ==================================================

                            Every card sticks slightly lower than the
                            previous card.

                            Card 1 = 70px
                            Card 2 = 94px
                            Card 3 = 118px
                            Card 4 = 142px
                            etc.
                            */

                            top: `calc(70px + ${index * 24}px)`,

                            /*
                            New cards always sit above older cards.
                            */

                            zIndex: index + 1,
                        }}
                    >
                        {/* =================================================
                            TOP CONTENT
                        ================================================= */}

                        <div
                            className="
                                grid
                                w-full
                                grid-cols-1
                                gap-8

                                lg:grid-cols-12
                                lg:gap-8
                            "
                        >
                            {/* =================================================
                                TITLE
                            ================================================= */}

                            <div className="lg:col-span-8">
                                <div
                                    className="
                                        service-title
                                        flex
                                        items-start
                                    "
                                >
                                    {/* NUMBER */}

                                    <span
                                        className="
                                            mr-3
                                            shrink-0
                                            pt-1
                                            text-[15px]
                                            font-medium
                                            leading-none
                                            tracking-[-0.03em]
                                            text-[#171717]

                                            sm:mr-5
                                            sm:text-[19px]

                                            lg:mr-4
                                            lg:pt-[9px]
                                            lg:text-[23px]
                                        "
                                    >
                                        {service.id}
                                    </span>

                                    {/* TITLE */}

                                    <h3
                                        className="
                                            max-w-full
                                            break-words
                                            text-[62px]
                                            font-black
                                            leading-[0.83]
                                            tracking-[-0.075em]
                                            text-[#111111]

                                            sm:text-[92px]

                                            md:text-[105px]

                                            lg:text-[clamp(90px,8vw,150px)]
                                        "
                                    >
                                        {service.title}
                                    </h3>
                                </div>
                            </div>

                            {/* =================================================
                                DESCRIPTION
                            ================================================= */}

                            <div
                                className="
                                    service-description
                                    lg:col-span-4
                                    lg:pt-1
                                "
                            >
                                <p
                                    className="
                                        max-w-[380px]
                                        text-[15px]
                                        font-normal
                                        leading-[1.5]
                                        tracking-[-0.012em]
                                        text-[#292929]

                                        sm:text-[16px]

                                        lg:text-[17px]
                                    "
                                >
                                    {service.description}
                                </p>
                            </div>
                        </div>

                        {/* =================================================
                            BOTTOM SERVICE LIST
                        ================================================= */}

                        <div
                            className="
                                service-bottom
                                mt-auto
                                w-full
                                border-t
                                border-black/[0.25]
                                pt-5

                                sm:pt-6

                                lg:pt-7
                            "
                        >
                            <div
                                className="
                                    flex
                                    w-full
                                    flex-col
                                    gap-4

                                    sm:grid
                                    sm:grid-cols-2
                                    sm:gap-y-4

                                    lg:flex
                                    lg:flex-row
                                    lg:items-center
                                    lg:justify-between
                                    lg:gap-0
                                "
                            >
                                {service.subServices.map(
                                    (sub, i) => (
                                        <React.Fragment key={sub}>
                                            {/* SERVICE NAME */}

                                            <span
                                                className="
                                                    whitespace-nowrap
                                                    text-[10px]
                                                    font-normal
                                                    uppercase
                                                    tracking-[0.02em]
                                                    text-[#626575]

                                                    sm:text-[11px]

                                                    lg:text-[13px]
                                                "
                                            >
                                                {sub}
                                            </span>

                                            {/* LINE */}

                                            {i <
                                                service
                                                    .subServices
                                                    .length -
                                                    1 && (
                                                <span
                                                    className="
                                                        hidden
                                                        h-px
                                                        bg-black/60

                                                        lg:block
                                                        lg:w-[65px]

                                                        xl:w-[100px]
                                                    "
                                                />
                                            )}
                                        </React.Fragment>
                                    )
                                )}
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* ========================================================
                IMPORTANT:

                NO EXTRA PADDING / HEIGHT AFTER THE LAST CARD.

                The section ends naturally after the sixth card.
            ======================================================== */}
        </section>
    );
}