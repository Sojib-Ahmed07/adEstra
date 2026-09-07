// app/admin/page.jsx
import { connectToDatabase } from '@/lib/mongoose'
import Post from '@/models/Post'
import Category from '@/models/Category'
import Portfolio from '@/models/Portfolio'
import { isAdminAuthenticated } from '@/app/actions/admin'
import AdminDashboardClient from '@/components/AdminDashboardClient'

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated()

  if (!authenticated) {
    return (
      <main className="w-full pt-28 lg:pt-36 min-h-screen">
        <AdminDashboardClient
          isAuthenticated={false}
          initialPosts={[]}
          categories={[]}
          initialPortfolio={[]}
        />
      </main>
    )
  }

  await connectToDatabase()

  const [postDocs, categoryDocs, portfolioDocs] = await Promise.all([
    Post.find({}).populate('category').sort({ createdAt: -1 }).lean(),
    Category.find({}).sort({ name: 1 }).lean(),
    Portfolio.find({}).sort({ createdAt: -1 }).lean(),
  ])

  const posts = JSON.parse(JSON.stringify(postDocs))
  const categories = JSON.parse(JSON.stringify(categoryDocs))
  const portfolio = JSON.parse(JSON.stringify(portfolioDocs))

  return (
    <main className="w-full pt-28 lg:pt-36 min-h-screen">
      <AdminDashboardClient
        isAuthenticated={true}
        initialPosts={posts}
        categories={categories}
        initialPortfolio={portfolio}
      />
    </main>
  )
}