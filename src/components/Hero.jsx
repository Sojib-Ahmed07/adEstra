'use client';

import React from 'react';
import Link from 'next/link';

export default function Hero() {
    return (
        <div
            id="hero"
            className="max-w-7xl mx-auto px-4 sm:px-8 pt-24 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-20 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center lg:min-h-screen"
        >
            {/* Left Column */}
            <div className="space-y-6 sm:space-y-8 lg:space-y-12">
                <h1 className="text-4xl sm:text-6xl lg:text-[90px] font-extrabold text-white tracking-tight leading-[1.02] lg:leading-[0.98] drop-shadow-lg">
                    Your Digital <br />
                    Partner
                </h1>

                <div className="space-y-4 sm:space-y-6 max-w-md pt-1 sm:pt-2 lg:pt-4">
                    {/* Desktop Arrow Box (Hidden below lg) */}
                    <div className="hidden lg:flex w-20 h-20 border-2 border-white/60 bg-white/10 backdrop-blur-md items-center justify-center rounded-xl cursor-pointer shadow-lg hover:border-white hover:bg-white/20 transition-all duration-300 group">
                        <svg
                            className="w-10 h-10 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25"
                            />
                        </svg>
                    </div>

                    <p className="text-base sm:text-lg font-medium leading-relaxed drop-shadow-md text-white">
                        From Concept to Creation — Beautiful design has the power
                        to captivate audiences
                    </p>

                    {/* Mobile & Tablet Professional Button (<1024px) */}
                    <div className="pt-2 lg:hidden">
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#22e3ad] text-slate-950 font-bold text-sm tracking-wide transition-all duration-300 hover:bg-[#1cd29e] active:scale-[0.98] shadow-lg shadow-[#22e3ad]/20"
                        >
                            <span>Explore Portfolio</span>
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="relative flex flex-col justify-between h-full lg:min-h-[460px]">
                {/* Desktop Circular Button (Hidden below lg) */}
                <div className="hidden lg:flex self-end lg:mr-8 my-4">
                    <Link
                        href="/portfolio"
                        className="w-44 h-44 border-2 border-white/70 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-center p-6 cursor-pointer shadow-xl hover:scale-[1.04] hover:border-[#22e3ad] hover:bg-slate-900/40 transition-all duration-300 ease-out group"
                    >
                        <span className="text-sm font-extrabold tracking-widest text-white uppercase group-hover:text-[#22e3ad] transition-colors duration-300 leading-snug drop-shadow-sm">
                            Explore <br /> Portfolio
                        </span>
                    </Link>
                </div>

                {/* Services Block */}
                <div className="mt-auto space-y-1 sm:space-y-2 text-left pt-6 sm:pt-8 lg:pt-12 drop-shadow-md">
                    <h2 className="text-2xl sm:text-4xl lg:text-6xl font-light text-white tracking-wide">
                        Web{' '}
                        <span className="font-extrabold text-white">
                            design
                        </span>{' '}
                        /{' '}
                        <span className="font-extrabold text-white">
                            dev
                        </span>
                    </h2>

                    <h2 className="text-2xl sm:text-4xl lg:text-6xl font-light text-white/95 tracking-wide">
                        services /
                    </h2>

                    <h2 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold text-white tracking-wide">
                        marketing
                    </h2>
                </div>
            </div>
        </div>
    );
}