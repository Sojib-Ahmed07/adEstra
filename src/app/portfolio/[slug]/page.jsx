// app/portfolio/[slug]/page.jsx

import { getPortfolioBySlug } from '@/app/actions/portfolio'
import { notFound } from 'next/navigation'
import CaseStudyClient from './CaseStudyClient'

export const revalidate = 60

export default async function CaseStudyPage({ params }) {
    const { slug } = await params

    const project = await getPortfolioBySlug(slug)

    if (!project) {
        notFound()
    }

    return <CaseStudyClient project={project} />
}