'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const TEAM = [
    {
        id: 1,
        name: 'Mh Ador',
        role: 'Operation Lead',
        image:
            'https://res.cloudinary.com/gd78bssj/image/upload/v1788057674/team_members/jrxoy5rm3h4vusr8ciqp.png',
        socials: {
            linkedin: '#',
            twitter: '#',
        },
    },
    {
        id: 2,
        name: 'Said Sajal',
        role: 'Business Developer',
        image:
            'https://res.cloudinary.com/gd78bssj/image/upload/v1788235837/sajal-bg.png',
        socials: {
            linkedin: '#',
            twitter: '#',
        },
    },
    {
        id: 3,
        name: 'Muntasir Islam',
        role: 'Accounts & Quicbook Manager',
        image:
            'https://res.cloudinary.com/gd78bssj/image/upload/v1788235838/muntasir-bg.png',
        socials: {
            linkedin: '#',
            twitter: '#',
        },
    },
    {
        id: 4,
        name: 'Apon Yeager',
        role: 'Motion Designer',
        image:
            'https://res.cloudinary.com/gd78bssj/image/upload/v1788235837/Untitled-design-1.png',
        socials: {
            linkedin: '#',
            twitter: '#',
        },
    },
    {
        id: 5,
        name: 'Mansura Mim',
        role: 'Graphic Designer',
        image:
            'https://res.cloudinary.com/gd78bssj/image/upload/v1788235838/mim-bg.png',
        socials: {
            linkedin: '#',
            twitter: '#',
        },
    },
    {
        id: 6,
        name: 'Palash Bhuiyan',
        role: 'SEO Wizard',
        image:
            'https://res.cloudinary.com/gd78bssj/image/upload/v1788235838/polash-bg.png',
        socials: {
            linkedin: '#',
            twitter: '#',
        },
    },
];

const headerVariants = {
    hidden: {
        opacity: 0,
        x: 100,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 70,
    },
    visible: (index) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            delay: index * 0.08,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

export default function TeamSection() {
    return (
        <section
            id="team"
            className="relative w-full overflow-hidden bg-[#181818] text-white"
        >
            <div className="mx-auto w-full max-w-[1600px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28 xl:px-16">

                {/* =========================================================
                    HEADER
                ========================================================== */}
                <div className="mb-12 sm:mb-16 lg:mb-20">

                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

                        {/* Left */}
                        <div className="min-w-0">

                            {/* Small label */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{
                                    once: true,
                                    amount: 0.3,
                                }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="mb-5 inline-flex items-center"
                            >
                                <span className="relative flex items-center gap-2 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-white/90 sm:text-xs">

                                    {/* Left curved bracket */}
                                    <span className="absolute left-0 top-1/2 h-5 w-2 -translate-y-1/2 rounded-l-full border-b border-l border-t border-white/80" />

                                    <span>(</span>
                                    <span>OUR TEAM</span>
                                    <span>)</span>

                                    {/* Right curved bracket */}
                                    <span className="absolute right-0 top-1/2 h-5 w-2 -translate-y-1/2 rounded-r-full border-b border-r border-t border-white/80" />
                                </span>
                            </motion.div>

                            {/* Main Heading */}
                            <motion.h2
                                variants={headerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{
                                    once: true,
                                    amount: 0.25,
                                }}
                                className="
                                    max-w-[900px]
                                    text-4xl
                                    font-extrabold
                                    leading-[0.95]
                                    tracking-[-0.045em]
                                    text-white
                                    sm:text-5xl
                                    md:text-6xl
                                    lg:text-7xl
                                    xl:text-[76px]
                                "
                            >
                                Our Expert Members
                            </motion.h2>
                        </div>

                        {/* Button */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 60,
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                            }}
                            viewport={{
                                once: true,
                                amount: 0.3,
                            }}
                            transition={{
                                duration: 1,
                                delay: 0.15,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            <motion.a
                                href="#"
                                whileHover="hover"
                                whileTap={{
                                    scale: 0.97,
                                }}
                                className="
                                    group
                                    inline-flex
                                    w-fit
                                    items-center
                                    gap-4
                                    rounded-full
                                    border
                                    border-white/40
                                    px-5
                                    py-3
                                    text-xs
                                    font-medium
                                    tracking-tight
                                    text-white
                                    transition-colors
                                    duration-300
                                    hover:border-white
                                    hover:bg-white
                                    hover:text-black
                                    sm:px-6
                                    sm:py-3.5
                                "
                            >
                                <span>See All Members</span>

                                <span
                                    className="
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        border-white/40
                                        transition-all
                                        duration-300
                                        group-hover:border-black/30
                                    "
                                >
                                    <motion.span
                                        variants={{
                                            hover: {
                                                x: 3,
                                                y: -3,
                                            },
                                        }}
                                        transition={{
                                            duration: 0.25,
                                        }}
                                    >
                                        <ArrowUpRight className="h-4 w-4" />
                                    </motion.span>
                                </span>
                            </motion.a>
                        </motion.div>
                    </div>

                    {/* Divider */}
                    <motion.div
                        initial={{
                            scaleX: 0,
                            opacity: 0,
                        }}
                        whileInView={{
                            scaleX: 1,
                            opacity: 1,
                        }}
                        viewport={{
                            once: true,
                            amount: 0.3,
                        }}
                        transition={{
                            duration: 1.2,
                            delay: 0.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{
                            transformOrigin: 'left',
                        }}
                        className="mt-10 h-px w-full bg-white/15 sm:mt-12 lg:mt-14"
                    />
                </div>

                {/* =========================================================
                    TEAM GRID
                ========================================================== */}
                <div
                    className="
                        grid
                        grid-cols-1
                        gap-x-5
                        gap-y-12
                        sm:grid-cols-2
                        sm:gap-x-6
                        sm:gap-y-14
                        lg:grid-cols-3
                        lg:gap-x-7
                        lg:gap-y-16
                    "
                >
                    {TEAM.map((member, index) => (
                        <MemberCard
                            key={member.id}
                            member={member}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

/* =============================================================
   MEMBER CARD
============================================================= */

function MemberCard({ member, index }) {
    return (
        <motion.article
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
                once: true,
                amount: 0.12,
            }}
            className="group min-w-0"
        >
            {/* =====================================================
                IMAGE
            ====================================================== */}
            <div
                className="
                    relative
                    aspect-[1.08/1]
                    w-full
                    overflow-hidden
                    rounded-[4px]
                    bg-[#e8e6f0]
                    sm:rounded-[6px]
                "
            >
                {/* Image */}
                <motion.img
                    src={member.image}
                    alt={member.name}
                    loading={index < 3 ? 'eager' : 'lazy'}
                    className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-cover
                        object-center
                    "
                    whileHover={{
                        scale: 1.035,
                    }}
                    transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                />

                {/* Dark bottom fade */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-x-0
                        bottom-0
                        h-24
                        bg-gradient-to-t
                        from-black/20
                        to-transparent
                        opacity-0
                        transition-opacity
                        duration-500
                        group-hover:opacity-100
                    "
                />

                {/* =================================================
                    SOCIAL BUTTONS
                ================================================== */}
                <div
                    className="
                        absolute
                        right-4
                        top-4
                        flex
                        flex-col
                        gap-2
                        sm:right-5
                        sm:top-5
                    "
                >
                    {/* LinkedIn */}
                    <motion.a
                        href={member.socials.linkedin}
                        aria-label={`${member.name} LinkedIn`}
                        whileHover={{
                            scale: 1.08,
                        }}
                        whileTap={{
                            scale: 0.94,
                        }}
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            bg-white
                            text-black
                            shadow-lg
                            transition-colors
                            duration-300
                            hover:bg-black
                            hover:text-white
                            sm:h-10
                            sm:w-10
                        "
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="h-[17px] w-[17px] fill-current"
                        >
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14Zm-8.5 7H7.7v8.5h2.8V10Zm-1.4-4.25A1.65 1.65 0 1 0 9.1 9.05 1.65 1.65 0 0 0 9.1 5.75ZM19 13.6c0-2.56-1.37-3.75-3.2-3.75-1.48 0-2.15.82-2.52 1.4V10h-2.8v8.5h2.8v-4.7c0-1.24.23-2.44 1.77-2.44 1.52 0 1.54 1.42 1.54 2.52v4.62H19V13.6Z" />
                        </svg>
                    </motion.a>

                    {/* X */}
                    <motion.a
                        href={member.socials.twitter}
                        aria-label={`${member.name} X`}
                        whileHover={{
                            scale: 1.08,
                        }}
                        whileTap={{
                            scale: 0.94,
                        }}
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            bg-white
                            text-black
                            shadow-lg
                            transition-colors
                            duration-300
                            hover:bg-black
                            hover:text-white
                            sm:h-10
                            sm:w-10
                        "
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="h-[16px] w-[16px] fill-current"
                        >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
                        </svg>
                    </motion.a>
                </div>
            </div>

            {/* =====================================================
                MEMBER INFORMATION
            ====================================================== */}
            <div className="mt-4 px-0.5 sm:mt-5">
                <motion.p
                    initial={{
                        opacity: 0,
                        y: 8,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.6,
                        delay: 0.1 + index * 0.05,
                    }}
                    className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.08em]
                        text-white/55
                        sm:text-xs
                    "
                >
                    {member.role}
                </motion.p>

                <motion.h3
                    initial={{
                        opacity: 0,
                        y: 8,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.6,
                        delay: 0.15 + index * 0.05,
                    }}
                    className="
                        mt-1
                        text-xl
                        font-extrabold
                        leading-tight
                        tracking-[-0.025em]
                        text-white
                        transition-colors
                        duration-300
                        group-hover:text-white/80
                        sm:text-2xl
                        lg:text-[28px]
                    "
                >
                    {member.name}
                </motion.h3>
            </div>
        </motion.article>
    );
}