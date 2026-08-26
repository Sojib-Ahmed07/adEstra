'use client'

import Link from 'next/link'
import { FiSearch } from 'react-icons/fi'

// Sample Blog Posts Data
const posts = [
  {
    id: '1',
    slug: 'low-code-web-design',
    title: 'Low Code Web Design: Speed, Flexibility, and Results',
    author: 'admin',
    date: 'June 10, 2025',
    comments: 0,
    excerpt:
      "In today's fast-moving digital world, business can not afford to wait months for a website launch. They need speed, flexibility and results fast. That's where low code web design comes in. At adEstra Solution, we help brands turn ideas into high-performing websites in record time, combining low-code technology with professional design and marketing expertise.",
    image: null,
  },
  {
    id: '2',
    slug: 'twin-engines-of-success-branding-vs-marketing',
    title: 'The Twin Engines of Success: Branding vs. Marketing (And Why You Need Both)',
    author: 'admin',
    date: 'May 21, 2025',
    comments: 0,
    excerpt:
      "What do the world's most iconic brands—like Nike, Apple, or Coca-Cola—have in common? It's not just great products. It's not just smart campaigns. 👉 It's the synergistic power of branding and marketing working together. These two elements are the driving force behind any thriving brand. One without the other falls short. Together? They create a brand that doesn't...",
    image: null,
  },
  {
    id: '3',
    slug: 'common-web-design-mistakes-and-solutions',
    title: 'Common web design mistakes & solutions',
    author: 'admin',
    date: 'January 17, 2024',
    comments: 0,
    excerpt:
      'In 2022, at vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam...',
    image: 'https://picsum.photos/seed/abstract/1200/600',
  },
]

// Sample Sidebar Data
const categories = [
  { name: 'Creative', count: 3, slug: 'creative' },
  { name: 'Design', count: 5, slug: 'design' },
  { name: 'Marketing', count: 4, slug: 'marketing' },
  { name: 'Portfolio', count: 4, slug: 'portfolio' },
  { name: 'Technology', count: 5, slug: 'technology' },
  { name: 'Uncategorized', count: 6, slug: 'uncategorized' },
]

const tags = [
  'agency',
  'business',
  'creative',
  'elegant',
  'modern',
  'news',
  'portfolio',
  'responsive',
  'shop',
]

export default function BlogPage() {
  return (
    <main className="w-full min-h-screen bg-white text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Post Feed (Left Side) */}
        <section className="lg:col-span-8 space-y-16">
          {posts.map((post) => (
            <article
              key={post.id}
              className="border-b border-gray-100 pb-16 last:border-b-0"
            >
              {/* Optional Featured Image */}
              {post.image && (
                <div className="mb-8 overflow-hidden rounded-sm">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-auto object-cover max-h-[450px]"
                  />
                </div>
              )}

              {/* Meta information */}
              <div className="text-xs text-gray-500 font-medium tracking-wide mb-3 space-x-2">
                <span>{post.author}</span>
                <span>•</span>
                <span>{post.date}</span>
                <span>•</span>
                <span>
                  {post.comments === 0
                    ? 'No Comments'
                    : `${post.comments} Comments`}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-tight mb-4 hover:text-gray-700 transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>

              {/* Excerpt */}
              <p className="text-gray-600 leading-relaxed text-base mb-6">
                {post.excerpt}
              </p>

              {/* Read More Button */}
              <Link
                href={`/blog/${post.slug}`}
                className="inline-block border border-gray-900 text-gray-900 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition-colors duration-200"
              >
                Read More
              </Link>
            </article>
          ))}
        </section>

        {/* Sidebar (Right Side) */}
        <aside className="lg:col-span-4 space-y-12">
          
          {/* Search Box */}
          <div className="relative border-b border-gray-300 pb-2">
            <input
              type="text"
              placeholder="Search"
              className="w-full pr-8 text-sm focus:outline-none placeholder-gray-400 bg-transparent"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            >
              <FiSearch className="w-4 h-4" />
            </button>
          </div>

          {/* Categories */}
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

          {/* Tags */}
          <div>
            <h3 className="text-2xl font-bold tracking-tight mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-[2px] after:bg-gray-900">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag}`}
                  className="bg-gray-50 border border-gray-200 px-3 py-1.5 text-xs text-gray-700 hover:border-gray-900 hover:text-black transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

        </aside>

      </div>
    </main>
  )
}