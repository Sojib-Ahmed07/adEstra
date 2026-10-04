// app/admin/create/page.jsx
import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/app/actions/admin'
import CreatePostClient from './CreatePostClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Create Post — adEstra Admin',
  robots: { index: false, follow: false },
}

export default async function CreatePostPage() {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    redirect('/admin')
  }

  return <CreatePostClient />
}