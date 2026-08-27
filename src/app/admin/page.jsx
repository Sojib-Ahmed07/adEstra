// app/admin/page.jsx
import { connectToDatabase } from '@/lib/mongoose'
import Post from '@/models/Post'
import Category from '@/models/Category'
import { isAdminAuthenticated } from '@/app/actions/admin'
import AdminDashboardClient from '@/components/AdminDashboardClient'

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated()

  if (!authenticated) {
    return <AdminDashboardClient isAuthenticated={false} initialPosts={[]} categories={[]} />
  }

  await connectToDatabase()

  const postDocs = await Post.find({})
    .populate('category')
    .sort({ createdAt: -1 })
    .lean()

  const categoryDocs = await Category.find({}).sort({ name: 1 }).lean()

  const posts = JSON.parse(JSON.stringify(postDocs))
  const categories = JSON.parse(JSON.stringify(categoryDocs))

  return (
    <AdminDashboardClient
      isAuthenticated={true}
      initialPosts={posts}
      categories={categories}
    />
  )
}