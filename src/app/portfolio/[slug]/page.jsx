import { getPortfolioItemBySlug } from '@/app/actions/portfolio'
import { notFound } from 'next/navigation'
import CaseStudyClient from './CaseStudyClient'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export default async function CaseStudyPage({ params }) {
    const { slug } = await params
    const item = await getPortfolioItemBySlug(slug)

    if (!item) {
        notFound()
    }

    return <CaseStudyClient project={item} item={item} />
}