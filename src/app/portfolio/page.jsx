// app/portfolio/page.jsx
import Link from 'next/link'
import { getPortfolioItems } from '@/app/actions/portfolio'

export const revalidate = 60

export default async function PortfolioPage() {
  const projects = await getPortfolioItems()

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 px-6 py-16">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center sm:text-left space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight">Our Work & Case Studies</h1>
          <p className="text-slate-600 max-w-2xl text-base">
            Discover how we help brands scale through strategic content, visual identity design, and digital execution.
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-lg">
            <p className="text-slate-500 font-medium">No case studies published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project._id}
                href={`/portfolio/${project.slug}`}
                className="group border border-slate-200 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <div className="h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      {project.industry} • {project.projectType}
                    </span>
                    <h2 className="mt-2 text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {project.title}
                    </h2>
                    <p className="mt-2 text-xs font-semibold text-slate-500">
                      Client: {project.client}
                    </p>
                    <p className="mt-3 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {project.background}
                    </p>
                  </div>

                  <div className="pt-2 text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Case Study →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}