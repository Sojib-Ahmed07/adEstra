'use client'

import React from 'react'
import Link from 'next/link'
import { useIsDesktop } from '@/hooks/useIsDesktop'

export default function CaseStudyClient({ project: projectProp, item }) {
    const project = projectProp || item
    const isDesktop = useIsDesktop()

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-slate-500 px-4">
                <p>Case study data could not be loaded.</p>
            </div>
        )
    }

    const isWebsite = (project.category || '').toLowerCase() === 'websites' && project.websiteUrl

    return (
        <article className="min-h-screen bg-white text-slate-900 pt-20 md:pt-28 pb-16 md:pb-20 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
                {/* Navigation Back Link */}
                <div>
                    <Link
                        href="/portfolio"
                        className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors min-h-[44px]"
                    >
                        ← Back to Portfolio
                    </Link>
                </div>

                {/* Case Study Heading */}
                <header className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider rounded-full">
                            {project.category || 'Case Study'}
                        </div>

                        {project.websiteUrl && (
                            <a
                                href={project.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-1.5 bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-slate-800 transition-colors w-full sm:w-auto min-h-[44px]"
                            >
                                Visit Live Site ↗
                            </a>
                        )}
                    </div>

                    <h1 className="max-w-5xl text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900 break-words">
                        {project.title}
                    </h1>

                    {/* Project Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-slate-200 text-sm">
                        <div>
                            <span className="text-slate-400 block text-xs">Client</span>
                            <strong className="text-slate-900 font-semibold break-words">{project.client || 'N/A'}</strong>
                        </div>
                        <div>
                            <span className="text-slate-400 block text-xs">Industry</span>
                            <strong className="text-slate-900 font-semibold break-words">{project.industry || 'N/A'}</strong>
                        </div>
                        <div>
                            <span className="text-slate-400 block text-xs">Project Type</span>
                            <strong className="text-slate-900 font-semibold break-words">{project.projectType || 'N/A'}</strong>
                        </div>
                        <div>
                            <span className="text-slate-400 block text-xs">Duration</span>
                            <strong className="text-slate-900 font-semibold break-words">{project.duration || 'N/A'}</strong>
                        </div>
                    </div>
                </header>

                {/* Media Preview (Live Website Frame or Cover Image) */}
                <section className="pt-2">
                    {isWebsite ? (
                        <div className="relative border-slate-200 bg-slate-100 border-[6px] sm:border-[8px] md:border-[12px] rounded-2xl shadow-md overflow-hidden w-full">
                            <div className="h-8 sm:h-9 bg-slate-100 flex items-center px-3 sm:px-4 space-x-2 border-b border-slate-200">
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-400 rounded-full shrink-0"></div>
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-amber-400 rounded-full shrink-0"></div>
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-400 rounded-full shrink-0"></div>
                                <div className="ml-2 sm:ml-4 bg-white text-slate-600 text-[11px] sm:text-xs px-3 sm:px-4 py-0.5 rounded-md w-full max-w-md truncate border border-slate-200">
                                    {project.websiteUrl}
                                </div>
                            </div>
                            <div className="relative w-full bg-white overflow-hidden">
                                {isDesktop ? (
                                    <div className="w-full h-[550px]">
                                        <iframe
                                            src={project.websiteUrl}
                                            title={project.title}
                                            className="w-full h-full border-0"
                                            loading="lazy"
                                        />
                                    </div>
                                ) : (
                                    <a
                                        href={project.websiteUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative block w-full aspect-[16/10] overflow-hidden bg-slate-100"
                                    >
                                        {project.coverImage ? (
                                            <img
                                                src={project.coverImage}
                                                alt={`${project.title} live site preview`}
                                                className="w-full h-full object-cover object-top"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-50">
                                                <span className="text-slate-800 font-bold text-base mb-2 break-all">
                                                    {project.websiteUrl.replace(/^https?:\/\//, '')}
                                                </span>
                                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
                                                    Visit Site ↗
                                                </span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="bg-slate-900/80 text-white text-xs font-bold px-4 py-2 rounded-full backdrop-blur-sm">
                                                Visit Live Site ↗
                                            </span>
                                        </div>
                                    </a>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-[4/3] sm:aspect-video lg:aspect-auto">
                            <img
                                src={project.coverImage}
                                alt={project.title}
                                loading="lazy"
                                className="w-full h-full object-cover lg:max-h-[600px]"
                            />
                        </div>
                    )}
                </section>

                {/* Background & Summary */}
                <section className="space-y-4 max-w-4xl">
                    <h2 className="text-2xl font-bold text-slate-900">Project Overview</h2>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {project.background}
                    </p>
                </section>

                {/* Objectives */}
                {project.objectives && project.objectives.length > 0 && (
                    <section className="space-y-4 max-w-4xl pt-6 border-t border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900">Key Objectives</h2>
                        <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm sm:text-base">
                            {project.objectives.map((obj, idx) => (
                                <li key={idx} className="leading-relaxed">{obj}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Results */}
                {project.results && project.results.length > 0 && (
                    <section className="space-y-4 max-w-4xl pt-6 border-t border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900">Results & Impact</h2>
                        <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm sm:text-base">
                            {project.results.map((res, idx) => (
                                <li key={idx} className="leading-relaxed">{res}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Gallery Showcase */}
                {project.galleryImages && project.galleryImages.length > 0 && (
                    <section className="space-y-6 pt-6 border-t border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900">Project Showcase</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            {project.galleryImages.map((img, idx) => (
                                <div key={idx} className="rounded-xl overflow-hidden border border-slate-200 shadow-sm aspect-video">
                                    <img
                                        src={img}
                                        alt={`${project.title} preview ${idx + 1}`}
                                        loading="lazy"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </article>
    )
}