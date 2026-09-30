// app/services/page.jsx
import Link from 'next/link'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { getPublishedServices } from '@/app/actions/services'

export const dynamic = 'force-dynamic'

export const metadata = {
    title: 'Our Services — adEstra',
    description:
        'Explore the full range of services adEstra offers — design, marketing, SEO, copywriting, 3D visualization, AI brand training and more.',
}

export default async function ServicesIndexPage() {
    const services = await getPublishedServices()

    return (
        <div className="w-full bg-white text-slate-900 min-h-screen">
            {/* ========================================================= */}
            {/* HERO                                                     */}
            {/* ========================================================= */}
            <section className="w-full px-6 sm:px-12 lg:px-20 pt-32 lg:pt-40 pb-16 text-center max-w-[1400px] mx-auto relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

                <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-slate-300 text-[10px] sm:text-xs font-semibold tracking-wider text-slate-700 uppercase">
                    ( OUR SERVICES )
                </span>

                <h1 className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 tracking-tight leading-[1.08] max-w-5xl mx-auto">
                    Everything you need,{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-teal-700 to-slate-900">
                        under one roof
                    </span>
                </h1>

                <p className="mt-6 max-w-3xl mx-auto text-slate-600 text-base sm:text-lg leading-relaxed">
                    From brand identity and marketing to 3D visualization and AI training — explore the full
                    spectrum of services we deliver for ambitious teams.
                </p>
            </section>

            {/* ========================================================= */}
            {/* GRID                                                     */}
            {/* ========================================================= */}
            <section className="w-full px-6 sm:px-12 lg:px-16 py-16 border-t border-slate-100 bg-slate-50/60">
                <div className="max-w-[1400px] mx-auto">
                    {services.length === 0 ? (
                        <div className="max-w-xl mx-auto text-center py-20 bg-white border border-slate-200 rounded-2xl shadow-sm">
                            <Sparkles className="w-8 h-8 text-teal-500 mx-auto mb-4" />
                            <h2 className="text-xl font-bold text-slate-900">No services published yet</h2>
                            <p className="mt-2 text-sm text-slate-500">
                                Once services are published from the admin dashboard, they will appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <Link
                                    key={service._id}
                                    href={`/services/${service.slug}`}
                                    className="group relative bg-white border border-slate-200 rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <div className="space-y-5">
                                        <div className="flex items-center justify-between">
                                            <div className="p-3.5 rounded-xl bg-slate-100 group-hover:bg-teal-500 transition-colors duration-300">
                                                {service.heroIconImage ? (
                                                    <img
                                                        src={service.heroIconImage}
                                                        alt=""
                                                        className="w-7 h-7 object-contain"
                                                    />
                                                ) : (
                                                    <Sparkles className="w-7 h-7 text-slate-800 group-hover:text-white stroke-[1.5] transition-colors" />
                                                )}
                                            </div>
                                            <span className="text-xs font-mono font-bold text-slate-400 border border-slate-200 px-3 py-1 rounded-full group-hover:border-teal-500 group-hover:text-teal-600 group-hover:bg-teal-50 transition-colors">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                        </div>

                                        <h2 className="text-2xl font-bold text-slate-950 tracking-tight leading-snug group-hover:text-teal-900 transition-colors">
                                            {service.title}
                                        </h2>

                                        {service.shortDescription && (
                                            <p className="text-sm text-slate-500 leading-relaxed">
                                                {service.shortDescription}
                                            </p>
                                        )}
                                    </div>

                                    <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 group-hover:text-slate-900 transition-colors">
                                            View service
                                        </span>
                                        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}