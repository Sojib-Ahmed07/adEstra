// app/blog/page.jsx
import Link from 'next/link'
import SearchBar from '@/components/SearchBar'
import { connectToDatabase } from '@/lib/mongoose'
import Post from '@/models/Post'
import Category from '@/models/Category'
import { getCategoriesWithCounts, searchPosts } from '@/app/actions/blog'

export default async function BlogPage({ searchParams }) {
  await connectToDatabase()

  // Handle URL query params for dynamic search
  const query = searchParams?.search || ''

  let posts = []

  if (query) {
    posts = await searchPosts(query)
  } else {
    posts = await Post.find({})
      .populate('category')
      .sort({ createdAt: -1 })
      .lean()
    
    // Serialize Mongoose ObjectIds / dates for Next.js Server Components
    posts = JSON.parse(JSON.stringify(posts))
  }

  const categories = await getCategoriesWithCounts()

  return (
    <main className="w-full min-h-screen bg-white text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Feed (Left Side) */}
        <section className="lg:col-span-8 space-y-16">
          {query && (
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-sm text-sm text-gray-600">
              Showing search results for: <span className="font-semibold text-black">&quot;{query}&quot;</span>
            </div>
          )}

          {posts.length > 0 ? (
            posts.map((post) => (
              <article key={post._id} className="border-b border-gray-100 pb-16 last:border-b-0">
                {post.image && (
                  <div className="mb-8 overflow-hidden rounded-sm">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-auto object-cover max-h-[450px]"
                    />
                  </div>
                )}

                <div className="text-xs text-gray-500 font-medium tracking-wide mb-3 space-x-2">
                  <span>{post.author || 'Admin'}</span>
                  <span>•</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  {post.category?.name && (
                    <>
                      <span>•</span>
                      <span className="uppercase text-black font-semibold">
                        {post.category.name}
                      </span>
                    </>
                  )}
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-gray-900 leading-tight mb-4 hover:text-gray-700 transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="text-gray-600 leading-relaxed text-base mb-6">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block border border-gray-900 text-gray-900 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition-colors duration-200"
                >
                  Read More
                </Link>
              </article>
            ))
          ) : (
            <div className="text-center py-16 border border-dashed border-gray-300 rounded-sm">
              <p className="text-gray-500 text-lg">No posts found.</p>
              {query && (
                <Link
                  href="/blog"
                  className="inline-block mt-4 text-xs font-semibold uppercase border-b border-black pb-0.5"
                >
                  Clear search
                </Link>
              )}
            </div>
          )}
        </section>

        {/* Sidebar (Right Side) */}
        <aside className="lg:col-span-4 space-y-12">
          {/* Search Box */}
          <SearchBar />

          {/* Categories Sidebar */}
          <div>
            <h3 className="text-2xl font-bold tracking-tight mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-[2px] after:bg-gray-900">
              Categories
            </h3>
            <ul className="space-y-3.5 text-sm text-gray-700">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/blog/category/${cat.slug}`}
                    className="hover:text-black transition-colors"
                  >
                    {cat.name} ({cat.count})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

      </div>
    </main>
  )
}