// 'use client';

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const BACKGROUND_VIDEO_URL = "https://res.cloudinary.com/dlefye5fi/video/upload/v1787184455/hero_bg_plixha.mp4";

// const SERVICES_MENU = [
//     "Designs",
//     "Marketing",
//     "SEO",
//     "Copywriting",
//     "AutoCAD Design",
//     "AI Training",
// ];

// export default function Hero() {
//     const [isServicesOpen, setIsServicesOpen] = useState(false);

//     return (
//         <div className="relative min-h-screen bg-[#a0b8c8] text-white overflow-hidden font-sans selection:bg-[#22e3ad] selection:text-black">

//             {/* 1. Video Background Layer */}
//             <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
//                 <video
//                     autoPlay
//                     loop
//                     muted
//                     playsInline
//                     preload="auto"
//                     className="w-full h-full object-cover scale-105"
//                 >
//                     <source src={BACKGROUND_VIDEO_URL} type="video/mp4" />
//                 </video>

//                 {/* Adjusted dark overlay for text contrast */}
//                 <div className="absolute inset-0 bg-slate-950/25 backdrop-blur-[0.5px]" />
//             </div>

//             {/* 2. Navigation Bar */}
//             <header className="relative z-50 flex items-center justify-between px-8 py-7 max-w-7xl mx-auto">
//                 {/* Brand Logo */}
//                 <div className="text-3xl font-extrabold tracking-tight text-[#22e3ad] cursor-pointer drop-shadow-md">
//                     adEstra
//                 </div>

//                 {/* Navigation Links with High Contrast White Text */}
//                 <nav className="hidden lg:flex items-center space-x-10 text-base font-semibold text-white drop-shadow-sm">

//                     <a href="#" className="relative group py-2 transition-colors hover:text-[#22e3ad]">
//                         About
//                         <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-[#22e3ad] transition-all duration-300 group-hover:w-full" />
//                     </a>

//                     {/* Services Dropdown Parent */}
//                     <div
//                         className="relative py-2 cursor-pointer"
//                         onMouseEnter={() => setIsServicesOpen(true)}
//                         onMouseLeave={() => setIsServicesOpen(false)}
//                     >
//                         <div className="flex items-center gap-1.5 transition-colors hover:text-[#22e3ad] group">
//                             <span>Services</span>
//                             <motion.span
//                                 animate={{ rotate: isServicesOpen ? 180 : 0 }}
//                                 transition={{ duration: 0.2 }}
//                                 className="text-xs"
//                             >
//                                 ▾
//                             </motion.span>
//                             <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-[#22e3ad] transition-all duration-300 group-hover:w-full" />
//                         </div>

//                         {/* Submenu Dropdown Panel (Names Only) */}
//                         <AnimatePresence>
//                             {isServicesOpen && (
//                                 <motion.div
//                                     initial={{ opacity: 0, y: 10 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     exit={{ opacity: 0, y: 8 }}
//                                     transition={{ duration: 0.18, ease: "easeOut" }}
//                                     className="absolute top-full -left-4 mt-2 w-56 bg-slate-900/95 backdrop-blur-xl border border-white/15 rounded-xl p-2 shadow-2xl z-50 flex flex-col gap-1"
//                                 >
//                                     {SERVICES_MENU.map((item, index) => (
//                                         <a
//                                             key={index}
//                                             href="#"
//                                             className="px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-100 hover:text-[#22e3ad] hover:bg-white/10 transition-all flex items-center justify-between group"
//                                         >
//                                             <span>{item}</span>
//                                             <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">→</span>
//                                         </a>
//                                     ))}
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>
//                     </div>

//                     <a href="#" className="relative group py-2 transition-colors hover:text-[#22e3ad]">
//                         Portfolio
//                         <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-[#22e3ad] transition-all duration-300 group-hover:w-full" />
//                     </a>
//                     <a href="#" className="relative group py-2 transition-colors hover:text-[#22e3ad]">
//                         Team
//                         <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-[#22e3ad] transition-all duration-300 group-hover:w-full" />
//                     </a>
//                     <a href="#" className="relative group py-2 transition-colors hover:text-[#22e3ad]">
//                         Blog
//                         <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-[#22e3ad] transition-all duration-300 group-hover:w-full" />
//                     </a>
//                     <a href="#" className="relative group py-2 transition-colors hover:text-[#22e3ad]">
//                         Contact
//                         <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-[#22e3ad] transition-all duration-300 group-hover:w-full" />
//                     </a>
//                     <a href="#" className="relative group py-2 transition-colors hover:text-[#22e3ad]">
//                         Pricing
//                         <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-[#22e3ad] transition-all duration-300 group-hover:w-full" />
//                     </a>
//                 </nav>

//                 {/* CTA Button */}
//                 <button className="px-7 py-2.5 rounded-full border-2 border-white text-white text-base font-bold shadow-md hover:bg-white hover:text-slate-900 transition-all cursor-pointer">
//                     Lets Talk
//                 </button>
//             </header>

//             {/* 3. Hero Content Grid */}
//             <main className="relative z-10 max-w-7xl mx-auto px-8 pt-10 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

//                 {/* Left Column */}
//                 <div className="space-y-12">
//                     <h1 className="text-7xl sm:text-8xl lg:text-[90px] font-extrabold text-white tracking-tight leading-[0.98] drop-shadow-lg">
//                         Your Digital <br />
//                         Partner
//                     </h1>

//                     <div className="space-y-6 max-w-md pt-4">
//                         {/* Smooth Hover Arrow Box */}
//                         <div className="w-20 h-20 border-2 border-white/60 bg-white/10 backdrop-blur-md flex items-center justify-center rounded-xl cursor-pointer shadow-lg hover:border-white hover:bg-white/20 transition-all duration-300 group">
//                             <svg
//                                 className="w-10 h-10 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25" />
//                             </svg>
//                         </div>

//                         <p className="text-white text-base sm:text-lg font-medium leading-relaxed drop-shadow-md">
//                             From Concept to Creation — Beautiful design has the power to captivate audiences
//                         </p>
//                     </div>
//                 </div>

//                 {/* Right Column */}
//                 <div className="relative flex flex-col justify-between h-full min-h-[460px]">

//                     {/* Smooth, Professional Badge Hover */}
//                     <div className="self-end lg:mr-8 my-4">
//                         <div className="w-44 h-44 border-2 border-white/70 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-center p-6 cursor-pointer shadow-xl hover:scale-[1.04] hover:border-[#22e3ad] hover:bg-slate-900/40 transition-all duration-300 ease-out group">
//                             <span className="text-sm font-extrabold tracking-widest text-white uppercase group-hover:text-[#22e3ad] transition-colors duration-300 leading-snug drop-shadow-sm">
//                                 Explore <br /> Portfolio
//                             </span>
//                         </div>
//                     </div>

//                     {/* Keywords Typography */}
//                     <div className="mt-auto space-y-2 text-left lg:text-left pt-12 drop-shadow-md">
//                         <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-wide">
//                             Web <span className="font-extrabold text-white">design</span> / <span className="font-extrabold text-white">dev</span>
//                         </h2>
//                         <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white/95 tracking-wide">
//                             services /
//                         </h2>
//                         <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-wide">
//                             marketing
//                         </h2>
//                     </div>

//                 </div>

//             </main>
//         </div>
//     );
// }

'use client';

import React from 'react';

export default function Hero() {
    return (
        <div className="max-w-7xl mx-auto px-8 pt-10 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

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