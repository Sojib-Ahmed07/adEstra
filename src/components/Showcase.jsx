'use client';

import React, { useRef } from 'react';
import {
    motion,
    useScroll,
    useTransform,
} from 'framer-motion';

const WORKS = [
    {
        id: 1,
        title: 'Brand: Give for Goods',
        year: '2023',
        image:
            'https://res.cloudinary.com/gd78bssj/image/upload/v1788234778/Give-for-Goods1.png',
    },
    {
        id: 2,
        title: 'TVC : Company profile',
        year: '2024',
        image:
            'https://res.cloudinary.com/gd78bssj/image/upload/v1788234539/DSC05963.jpg',
    },
    {
        id: 3,
        title: 'Brand Develop and Marketing',
        year: '2021',
        image:
            'https://res.cloudinary.com/gd78bssj/image/upload/v1788234533/65464.jpg',
    },
    {
        id: 4,
        title: '360 Automotive solutions',
        year: '2022',
        image:
            'https://res.cloudinary.com/gd78bssj/image/upload/v1788234927/Al-Siha-Website-1.jpg',
    },
];

export default function ShowcaseSection() {
    const sectionRef = useRef(null);

    /*
     * The whole section controls the animation.
     *
     * Increasing the section height gives us enough scroll distance
     * for each project to enter the stack naturally.
     */
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    });

    /*
     * ---------------------------------------------------------
     * WORKS TITLE
     * ---------------------------------------------------------
     *
     * Initial:
     *   normal size
     *
     * Middle:
     *   becomes HUGE behind the cards
     *
     * End:
     *   fades and disappears
     */
    const worksScale = useTransform(
        scrollYProgress,
        [0, 0.10, 0.28, 0.68, 0.86, 1],
        [1, 1.05, 2.15, 2.15, 1.35, 0.75]
    );

    const worksOpacity = useTransform(
        scrollYProgress,
        [0, 0.08, 0.70, 0.82, 0.94, 1],
        [1, 1, 1, 0.7, 0.15, 0]
    );

    const worksY = useTransform(
        scrollYProgress,
        [0, 0.15, 0.72, 0.88, 1],
        ['0vh', '0vh', '0vh', '-4vh', '-8vh']
    );

    /*
     * Slightly darken WORKS near the beginning/middle.
     * This makes the cards visually sit above it.
     */
    const worksFilter = useTransform(
        scrollYProgress,
        [0, 0.25, 0.75, 1],
        [
            'brightness(1)',
            'brightness(0.88)',
            'brightness(0.65)',
            'brightness(0.5)',
        ]
    );

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#181818] text-white font-sans"
        >
            {/* =====================================================
                DESKTOP
            ====================================================== */}
            <div className="hidden md:block">

                {/* 
                    Large scroll stage.

                    330vh gives enough room for:
                    - WORKS entrance
                    - card 1
                    - card 2
                    - card 3
                    - card 4
                    - dissolve
                */}
                <div className="relative h-[330vh]">

                    {/* =================================================
                        STICKY ANIMATION VIEWPORT
                    ================================================== */}
                    <div className="sticky top-0 h-screen overflow-hidden">

                        {/* =============================================
                            WORKS BACKGROUND TITLE
                        ============================================== */}
                        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">

                            <motion.h1
                                style={{
                                    scale: worksScale,
                                    y: worksY,
                                    opacity: worksOpacity,
                                    filter: worksFilter,
                                }}
                                className="
                                    absolute
                                    whitespace-nowrap
                                    select-none
                                    font-black
                                    uppercase
                                    leading-none
                                    tracking-[-0.055em]
                                    text-white
                                    text-[14vw]
                                    will-change-transform
                                "
                            >
                                WORKS
                            </motion.h1>
                        </div>

                        {/* =============================================
                            PROJECT CARDS
                        ============================================== */}
                        <div className="absolute inset-0 z-10 pointer-events-none">

                            {WORKS.map((work, index) => (
                                <WorkCard
                                    key={work.id}
                                    work={work}
                                    index={index}
                                    progress={scrollYProgress}
                                    total={WORKS.length}
                                />
                            ))}

                        </div>

                    </div>
                </div>
            </div>

            {/* =====================================================
                MOBILE
            ====================================================== */}
            <div className="block md:hidden bg-[#181818] px-4 py-16">

                <div className="mb-12 text-center">
                    <h2 className="text-[18vw] font-black uppercase leading-none tracking-[-0.06em]">
                        WORKS
                    </h2>
                </div>

                <div className="space-y-8">

                    {WORKS.map((work) => (
                        <div
                            key={work.id}
                            className="overflow-hidden bg-white text-black"
                        >
                            <div className="bg-[#e8e5df] p-3">
                                <img
                                    src={work.image}
                                    alt={work.title}
                                    className="block w-full aspect-[4/3] object-cover"
                                />
                            </div>

                            <div className="px-5 py-5">
                                <h3 className="text-xl font-bold tracking-tight">
                                    {work.title}
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    {work.year}
                                </p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}


/* ================================================================
   WORK CARD
================================================================ */

function WorkCard({
    work,
    index,
    progress,
    total,
}) {
    /*
     * Each card owns one part of the overall scroll.
     *
     * Card 1:
     *   0.03 -> 0.30
     *
     * Card 2:
     *   0.20 -> 0.50
     *
     * Card 3:
     *   0.40 -> 0.70
     *
     * Card 4:
     *   0.60 -> 0.88
     *
     * This overlap is intentional.
     */
    const start = 0.035 + index * 0.19;
    const enterEnd = start + 0.105;

    const holdStart = enterEnd;
    const holdEnd = start + 0.21;

    const exitEnd = start + 0.285;

    /*
     * ---------------------------------------------------------
     * CARD Y POSITION
     * ---------------------------------------------------------
     *
     * New card starts below the viewport and rises into position.
     */
    const y = useTransform(
        progress,
        [
            start,
            enterEnd,
            holdEnd,
            exitEnd,
        ],
        [
            '105vh',
            '0vh',
            '0vh',
            '-4vh',
        ]
    );

    /*
     * ---------------------------------------------------------
     * CARD SCALE
     * ---------------------------------------------------------
     *
     * New card:
     *   starts slightly smaller
     *
     * enters:
     *   becomes full size
     *
     * while another card comes in:
     *   older card gets slightly smaller
     */
    const scale = useTransform(
        progress,
        [
            start,
            enterEnd,
            holdEnd,
            exitEnd,
        ],
        [
            0.92,
            1,
            index === total - 1 ? 1 : 0.96,
            index === total - 1 ? 0.94 : 0.91,
        ]
    );

    /*
     * ---------------------------------------------------------
     * OPACITY
     * ---------------------------------------------------------
     */
    const opacity = useTransform(
        progress,
        [
            start,
            start + 0.025,
            exitEnd,
            Math.min(exitEnd + 0.035, 1),
        ],
        [
            0,
            1,
            1,
            index === total - 1 ? 1 : 0,
        ]
    );

    /*
     * ---------------------------------------------------------
     * CARD SHADOW
     * ---------------------------------------------------------
     */
    const shadowOpacity = useTransform(
        progress,
        [start, enterEnd, holdEnd],
        [0, 0.22, 0.3]
    );

    /*
     * z-index is important.
     *
     * Later cards must sit above earlier cards.
     */
    const zIndex = 20 + index;

    return (
        <motion.article
            style={{
                y,
                scale,
                opacity,
                zIndex,
                boxShadow: `0 35px 100px rgba(0,0,0,${0.28})`,
            }}
            className="
                absolute
                left-1/2
                top-[8vh]
                w-[min(52vw,735px)]
                -translate-x-1/2
                origin-top
                overflow-hidden
                bg-white
                text-black
                will-change-transform
                pointer-events-auto
            "
        >

            {/* =====================================================
                IMAGE
            ====================================================== */}
            <div className="relative bg-[#e9e6e0]">

                <img
                    src={work.image}
                    alt={work.title}
                    className="
                        block
                        w-full
                        aspect-[1.58/1]
                        object-cover
                    "
                />

            </div>

            {/* =====================================================
                FOOTER
            ====================================================== */}
            <div className="bg-white px-5 py-5 sm:px-6 sm:py-5">

                <h2 className="
                    text-[21px]
                    sm:text-[24px]
                    lg:text-[27px]
                    font-bold
                    tracking-[-0.025em]
                    leading-tight
                ">
                    {work.title}
                </h2>

                <p className="
                    mt-2
                    text-[14px]
                    sm:text-[15px]
                    text-slate-500
                    font-medium
                ">
                    {work.year}
                </p>

            </div>

        </motion.article>
    );
}