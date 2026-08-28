// app/admin/portfolio/page.jsx
import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/app/actions/admin'
import { getPortfolioItems } from '@/app/actions/portfolio'
import AdminPortfolioClient from '@/components/AdminPortfolioClient'

export default async function AdminPortfolioPage() {
  const authenticated = await isAdminAuthenticated()

  if (!authenticated) {
    redirect('/admin')
  }

  const items = await getPortfolioItems()

  return <AdminPortfolioClient initialItems={items} />
}