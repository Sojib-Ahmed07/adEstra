'use client';

import React from 'react';

export default function Hero() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-28 sm:pt-36 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">

            {/* Left Column */}
            <div className="space-y-12">
                <h1 className="text-7xl sm:text-8xl lg:text-[90px] font-extrabold text-white tracking-tight leading-[0.98] drop-shadow-lg">
                    Your Digital <br />
                    Partner
                </h1>

                <div className="space-y-6 max-w-md pt-4">
                    <div className="w-20 h-20 border-2 border-white/60 bg-white/10 backdrop-blur-md flex items-center justify-center rounded-xl cursor-pointer shadow-lg hover:border-white hover:bg-white/20 transition-all duration-300 group">
                        <svg
                            className="w-10 h-10 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25" />
                        </svg>
                    </div>

                    <p className="text-white text-base sm:text-lg font-medium leading-relaxed drop-shadow-md">
                        From Concept to Creation — Beautiful design has the power to captivate audiences
                    </p>
                </div>
            </div>

            {/* Right Column */}
            <div className="relative flex flex-col justify-between h-full min-h-[460px]">
                <div className="self-end lg:mr-8 my-4">
                    <div className="w-44 h-44 border-2 border-white/70 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-center p-6 cursor-pointer shadow-xl hover:scale-[1.04] hover:border-[#22e3ad] hover:bg-slate-900/40 transition-all duration-300 ease-out group">
                        <span className="text-sm font-extrabold tracking-widest text-white uppercase group-hover:text-[#22e3ad] transition-colors duration-300 leading-snug drop-shadow-sm">
                            Explore <br /> Portfolio
                        </span>
                    </div>
                </div>

                <div className="mt-auto space-y-2 text-left lg:text-left pt-12 drop-shadow-md">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-wide">
                        Web <span className="font-extrabold text-white">design</span> / <span className="font-extrabold text-white">dev</span>
                    </h2>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white/95 tracking-wide">
                        services /
                    </h2>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-wide">
                        marketing
                    </h2>
                </div>
            </div>

        </div>
    );
}