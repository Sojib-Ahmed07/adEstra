// app/admin/team/page.jsx
import { isAdminAuthenticated } from '@/app/actions/admin'
import { getTeamMembers } from '@/app/actions/team'
import AdminTeamClient from '@/components/AdminTeamClient'

export default async function AdminTeamPage() {
  const authenticated = await isAdminAuthenticated()

  if (!authenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-sm font-semibold text-red-600">
          Unauthorized. Please log in at /admin first.
        </p>
      </main>
    )
  }

  const members = await getTeamMembers()

  return <AdminTeamClient initialMembers={members} />
}