// app/services/[slug]/page.jsx
import { notFound } from 'next/navigation'
import { getServiceBySlug } from '@/app/actions/services'
import ServiceDetailClient from './ServiceDetailClient'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
    const { slug } = await params
    const service = await getServiceBySlug(slug)
    if (!service) return { title: 'Service not found — adEstra' }

    return {
        title: `${service.title} — adEstra`,
        description: service.shortDescription || service.heroIntro || undefined,
    }
}

export default async function ServiceDetailPage({ params }) {
    const { slug } = await params
    const service = await getServiceBySlug(slug)

    if (!service) notFound()

    return <ServiceDetailClient service={service} />
}