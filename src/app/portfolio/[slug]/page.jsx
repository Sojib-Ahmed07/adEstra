// app/portfolio/[slug]/page.jsx
import { getPortfolioBySlug } from '@/app/actions/portfolio'
import { notFound } from 'next/navigation'

export const revalidate = 60

export default async function CaseStudyPage({ params }) {
  const { slug } = await params
  const project = await getPortfolioBySlug(slug)

  if (!project) notFound()

  return (
    <main className="min-h-screen bg-white text-slate-900 px-6 py-16">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header & Meta Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Background</h2>
              <p className="mt-4 text-slate-600 leading-relaxed text-base">{project.background}</p>
            </div>

            {/* Objectives */}
            {project.objectives?.length > 0 && (
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Objectives</h2>
                <ul className="mt-4 space-y-3 list-disc list-inside text-slate-600">
                  {project.objectives.map((obj, i) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Metadata Sidebar Card */}
          <aside className="bg-slate-50 p-6 rounded-lg space-y-6 text-sm">
            <div>
              <p className="font-bold text-slate-900 text-base">Clients</p>
              <p className="text-slate-600 mt-0.5">{project.client}</p>
            </div>
            <div>
              <p className="font-bold text-slate-900 text-base">Industry</p>
              <p className="text-slate-600 mt-0.5">{project.industry}</p>
            </div>
            <div>
              <p className="font-bold text-slate-900 text-base">Project</p>
              <p className="text-slate-600 mt-0.5">{project.projectType}</p>
            </div>
            <div>
              <p className="font-bold text-slate-900 text-base">Duration</p>
              <p className="text-slate-600 mt-0.5">{project.duration}</p>
            </div>
          </aside>
        </div>

        {/* Banner Cover Image */}
        {project.coverImage && (
          <div className="w-full overflow-hidden rounded-lg border border-slate-100">
            <img src={project.coverImage} alt={project.title} className="w-full object-cover" />
          </div>
        )}

        {/* Process Steps Timeline */}
        {project.process?.length > 0 && (
          <div className="space-y-8">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Process</h2>
            <div className="relative border-l-2 border-indigo-200 ml-5 space-y-10 pl-8">
              {project.process.map((step, idx) => (
                <div key={idx} className="relative">
                  {/* Step Circle Badge */}
                  <span className="absolute -left-[45px] top-0 flex items-center justify-center w-8 h-8 rounded-full border border-indigo-500 bg-white text-indigo-600 font-semibold text-sm">
                    {idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                  {step.points?.length > 0 && (
                    <ul className="mt-2 space-y-2 list-disc list-inside text-sm text-slate-600">
                      {step.points.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Secondary Gallery Grid */}
        {project.galleryImages?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.galleryImages.map((url, idx) => (
              <img key={idx} src={url} alt={`Gallery ${idx}`} className="w-full h-64 object-cover rounded-lg border" />
            ))}
          </div>
        )}

        {/* Results Section */}
        {project.results?.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Results</h2>
            <ul className="space-y-3 list-disc list-inside text-slate-600">
              {project.results.map((res, i) => (
                <li key={i}>{res}</li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </main>
  )
}