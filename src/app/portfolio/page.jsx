// app/portfolio/page.jsx

import { getPortfolioItems } from '@/app/actions/portfolio'
import PortfolioClient from '@/components/PortfolioClient'

export const revalidate = 60

export default async function PortfolioPage() {
    const projects = await getPortfolioItems()

    return (
        <PortfolioClient projects={projects} />
    )
}