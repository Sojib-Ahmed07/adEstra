'use client'

import React from 'react'
import Link from 'next/link'

export default function CaseStudyClient({ project: projectProp, item }) {
    const project = projectProp || item

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-slate-500">
                <p>Case study data could not be loaded.</p>
            </div>
        )
    }

    const isWebsite = (project.category || '').toLowerCase() === 'websites' && project.websiteUrl

    return (
        <article className="min-h-screen bg-white text-slate-900 pt-28 pb-20 px-6">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Navigation Back Link */}
                <div>
                    <Link
                        href="/portfolio"
                        className="text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
                    >
                        ← Back to Portfolio
                    </Link>
                </div>

                {/* Case Study Heading */}
                <header className="space-y-6">
                    <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider rounded-full">
                        {project.category || 'Case Study'}
                    </div>

                    <h1 className="max-w-5xl text-4xl sm:text-6xl font-black leading-tight tracking-tight text-slate-900">
                        {project.title}
                    </h1>

                    {/* Project Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-200 text-sm">
                        <div>
                            <span className="text-slate-400 block text-xs">Client</span>
                            <strong className="text-slate-900 font-semibold">{project.client}</strong>
                        </div>
                        <div>
                            <span className="text-slate-400 block text-xs">Industry</span>
                            <strong className="text-slate-900 font-semibold">{project.industry}</strong>
                        </div>
                        <div>
                            <span className="text-slate-400 block text-xs">Project Type</span>
                            <strong className="text-slate-900 font-semibold">{project.projectType}</strong>
                        </div>
                        <div>
                            <span className="text-slate-400 block text-xs">Duration</span>
                            <strong className="text-slate-900 font-semibold">{project.duration}</strong>
                        </div>
                    </div>
                </header>

                {/* Media Preview (Live Website Frame or Cover Image) */}
                <section className="pt-4">
                    {isWebsite ? (
                        <div className="relative border-slate-200 bg-slate-100 border-[8px] md:border-[12px] rounded-2xl shadow-md overflow-hidden w-full">
                            <div className="h-9 bg-slate-100 flex items-center px-4 space-x-2 border-b border-slate-200">
                                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                                <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                                <div className="ml-4 bg-white text-slate-600 text-xs px-4 py-1 rounded-md w-full max-w-md truncate border border-slate-200">
                                    {project.websiteUrl}
                                </div>
                            </div>
                            <div className="relative w-full h-[550px] bg-white overflow-hidden">
                                <iframe
                                    src={project.websiteUrl}
                                    title={project.title}
                                    className="w-full h-full border-0"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                            <img
                                src={project.coverImage}
                                alt={project.title}
                                className="w-full h-auto object-cover max-h-[600px]"
                            />
                        </div>
                    )}
                </section>

                {/* Background & Summary */}
                <section className="space-y-4 max-w-4xl">
                    <h2 className="text-2xl font-bold text-slate-900">Project Overview</h2>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-line text-base">
                        {project.background}
                    </p>
                </section>

                {/* Objectives */}
                {project.objectives && project.objectives.length > 0 && (
                    <section className="space-y-4 max-w-4xl pt-6 border-t border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900">Key Objectives</h2>
                        <ul className="list-disc list-inside space-y-2 text-slate-600">
                            {project.objectives.map((obj, idx) => (
                                <li key={idx}>{obj}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Results */}
                {project.results && project.results.length > 0 && (
                    <section className="space-y-4 max-w-4xl pt-6 border-t border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900">Results & Impact</h2>
                        <ul className="list-disc list-inside space-y-2 text-slate-600">
                            {project.results.map((res, idx) => (
                                <li key={idx}>{res}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Gallery Showcase */}
                {project.galleryImages && project.galleryImages.length > 0 && (
                    <section className="space-y-6 pt-6 border-t border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900">Project Showcase</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {project.galleryImages.map((img, idx) => (
                                <div key={idx} className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                                    <img
                                        src={img}
                                        alt={`${project.title} preview ${idx + 1}`}
                                        className="w-full h-64 object-cover"
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