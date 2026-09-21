import { getPortfolioItems } from '@/app/actions/portfolio'
import PortfolioClient from '@/components/PortfolioClient'

// Force Next.js to fetch fresh data on every page load
export const revalidate = 0
export const dynamic = 'force-dynamic'

export default async function PortfolioPage() {
    const initialItems = await getPortfolioItems()

    return (
        <main className="min-h-screen bg-white text-slate-900 pt-24 pb-16">
            <PortfolioClient initialItems={initialItems} />
        </main>
    )
}