// app/team/page.jsx
import { getTeamMembers } from '@/app/actions/team'
import TeamGridClient from '@/components/TeamGridClient'

export default async function ExpertMembersPage() {
  const teamMembers = await getTeamMembers()

  return (
    <main className="w-full min-h-screen bg-white">
      <section className="bg-white px-6 py-20 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
        <TeamGridClient initialMembers={teamMembers} />
      </section>
    </main>
  )
}