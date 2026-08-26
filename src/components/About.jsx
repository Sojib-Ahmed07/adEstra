'use client';

import React from 'react';

export default function About() {
    return (
        <section className="bg-[#f8fafc] text-slate-900 py-24 px-8 font-sans">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                {/* Left Column (Main Headline & Stats Grid) */}
                <div className="lg:col-span-7 space-y-12">

                    {/* Pill Badge */}
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-slate-300 text-xs font-semibold tracking-wider text-slate-700 uppercase">
                        ( ABOUT US )
                    </div>

                    {/* Main Headline */}
                    <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-black tracking-tight leading-[1.1] text-slate-950 max-w-2xl">
                        Since 2019, become the #1 low-code agency in the world
                    </h2>

                    {/* Statistics Grid */}
                    <div className="pt-4 space-y-10">
                        {/* Top Row Stats */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-12">

                            {/* Stat 1 */}
                            <div className="space-y-2">
                                <div
                                    className="text-7xl lg:text-8xl font-extrabold tracking-tight"
                                    style={{
                                        WebkitTextStroke: '2px #1e293b',
                                        color: 'transparent'
                                    }}
                                >
                                    100+
                                </div>
                                <p className="text-sm font-semibold text-slate-700">
                                    Completed Projects
                                </p>
                            </div>

                            {/* Vertical Divider */}
                            <div className="hidden sm:block h-20 w-[1px] bg-slate-300" />

                            {/* Stat 2 */}
                            <div className="space-y-2">
                                <div
                                    className="text-7xl lg:text-8xl font-extrabold tracking-tight"
                                    style={{
                                        WebkitTextStroke: '2px #1e293b',
                                        color: 'transparent'
                                    }}
                                >
                                    6
                                </div>
                                <p className="text-sm font-semibold text-slate-700">
                                    Years of experience
                                </p>
                            </div>

                        </div>

                        {/* Bottom Row Stat */}
                        <div className="space-y-2 pt-2">
                            <div
                                className="text-7xl lg:text-8xl font-extrabold tracking-tight"
                                style={{
                                    WebkitTextStroke: '2px #1e293b',
                                    color: 'transparent'
                                }}
                            >
                                80+
                            </div>
                            <p className="text-sm font-semibold text-slate-700">
                                Positive Reviews
                            </p>
                        </div>

                    </div>

                </div>

                {/* Right Column (Subheadline, Body Text, CTA) */}
                <div className="lg:col-span-5 space-y-8 lg:pt-16">

                    {/* Cyan Subtitle */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#4cd3d6] leading-snug">
                        We are a dynamic design studio driven by a deep passion for creativity and innovation.
                    </h3>

                    {/* Description Paragraph */}
                    <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-md font-normal">
                        Our team is dedicated to crafting bespoke, thoughtful designs that not only reflect the individuality of your brand but also connect with your audience on a meaningful level.
                    </p>

                    {/* Learn More Button */}
                    <div>
                        <button className="px-8 py-3 rounded-full border border-slate-900 text-slate-900 text-sm font-semibold hover:bg-slate-900 hover:text-white transition-all duration-300 cursor-pointer shadow-xs">
                            Learn More
                        </button>
                    </div>

                </div>

            </div>
        </section>
    );
}