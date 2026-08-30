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
          <div className="space-y-12">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Process</h2>

            <div className="relative pl-16 space-y-12">
              {/* Vertical Connecting Line */}
              <div className="absolute left-7 top-7 bottom-7 w-[1.5px] bg-indigo-200" />

              {project.process.map((step, idx) => (
                <div key={idx} className="group relative">
                  {/* Circle Badge with Hover Transition */}
                  <span className="absolute -left-16 top-0 flex items-center justify-center w-14 h-14 rounded-full border border-indigo-400 bg-white text-slate-600 font-semibold text-xl transition-all duration-300 group-hover:bg-indigo-500 group-hover:border-indigo-500 group-hover:text-white group-hover:shadow-md">
                    {idx + 1}
                  </span>

                  {/* Step Content */}
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                      {step.title}
                    </h3>

                    {step.points?.length > 0 && (
                      <ul className="mt-3 space-y-2.5 text-slate-500 text-base">
                        {step.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-400 mt-2.5 mr-3 flex-shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
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