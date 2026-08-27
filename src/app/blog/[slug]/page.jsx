// app/blog/[slug]/page.jsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { connectToDatabase } from '@/lib/mongoose'
import Post from '@/models/Post'
import Category from '@/models/Category' // Ensures schema registration for populate
import CommentSection from '@/components/CommentSection'
import { getCommentsForPost } from '@/app/actions/comments'

export default async function SinglePostPage({ params }) {
  // Await params for Next.js 15 compatibility
  const resolvedParams = await params
  const slug = resolvedParams?.slug

  if (!slug) {
    notFound()
  }

  await connectToDatabase()

  // Find post by slug and populate category
  const postDoc = await Post.findOne({ slug }).populate('category').lean()

  if (!postDoc) {
    notFound() // Triggers Next.js 404 page if slug isn't in database
  }

  // Serialize MongoDB document for Client/Server component boundary
  const post = JSON.parse(JSON.stringify(postDoc))

  // Fetch comments specifically for this post
  const comments = await getCommentsForPost(post._id)

  return (
    <main className="w-full min-h-screen bg-white text-gray-900 font-sans py-16 px-6 lg:px-12">
      <article className="max-w-4xl mx-auto space-y-8">
        
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-block text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-black transition-colors"
        >
          ← Back to all posts
        </Link>

        {/* Header Metadata */}
        <div className="space-y-4">
          {post.category && (
            <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-sm uppercase tracking-wider">
              {post.category.name}
            </span>
          )}
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            {post.title}
          </h1>
          <div className="text-sm text-gray-500 space-x-2">
            <span>By {post.author || 'Admin'}</span>
            <span>•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Featured Image */}
        {post.image && (
          <div className="w-full overflow-hidden rounded-sm">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover max-h-[500px]"
            />
          </div>
        )}

        {/* Content Body */}
        <div
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-8 border-t border-gray-200 flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Comment Section Component */}
        <CommentSection
          postId={post._id}
          postSlug={post.slug}
          initialComments={comments}
        />

      </article>
    </main>
  )
}