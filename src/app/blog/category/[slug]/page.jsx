'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FiSearch, FiFolder } from 'react-icons/fi'

// All posts data pool (will be replaced by MongoDB query later)
const allPosts = [
    {
        id: '1',
        slug: 'low-code-web-design',
        title: 'Low Code Web Design: Speed, Flexibility, and Results',
        category: 'technology',
        author: 'admin',
        date: 'June 10, 2025',
        excerpt:
            "In today's fast-moving digital world, business can not afford to wait months for a website launch. They need speed, flexibility and results fast...",
        image: null,
    },
    {
        id: '2',
        slug: 'twin-engines-of-success-branding-vs-marketing',
        title: 'The Twin Engines of Success: Branding vs. Marketing (And Why You Need Both)',
        category: 'marketing',
        author: 'admin',
        date: 'May 21, 2025',
        excerpt:
            "What do the world's most iconic brands—like Nike, Apple, or Coca-Cola—have in common? It's not just great products. It's smart branding...",
        image: null,
    },
    {
        id: '3',
        slug: 'common-web-design-mistakes-and-solutions',
        title: 'Common web design mistakes & solutions',
        category: 'design',
        author: 'admin',
        date: 'January 17, 2024',
        excerpt:
            'In 2022, at vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores...',
        image: 'https://picsum.photos/seed/abstract/1200/600',
    },
]

const categories = [
    { name: 'Creative', count: 3, slug: 'creative' },
    { name: 'Design', count: 5, slug: 'design' },
    { name: 'Marketing', count: 4, slug: 'marketing' },
    { name: 'Portfolio', count: 4, slug: 'portfolio' },
    { name: 'Technology', count: 5, slug: 'technology' },
    { name: 'Uncategorized', count: 6, slug: 'uncategorized' },
]

export default function CategoryBlogPage() {
    const params = useParams()
    const categorySlug = params.slug

    // Filter posts matching the current URL category slug
    const filteredPosts = allPosts.filter(
        (post) => post.category.toLowerCase() === categorySlug.toLowerCase()
    )

    // Format category name for display (e.g. "web-design" -> "WEB-DESIGN")
    const categoryTitle = categorySlug ? categorySlug.replace('-', ' ') : ''

    return (
        <main className="w-full min-h-screen bg-white text-gray-900 font-sans">
            <div className="max-w-7xl mx-auto px-6 py-16 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Main Post List (Left Side) */}
                <section className="lg:col-span-8 space-y-16">

                    {/* Active Category Header Banner */}
                    <div className="bg-gray-50 border border-gray-200 p-6 rounded-sm mb-10 flex items-center gap-3">
                        <FiFolder className="w-6 h-6 text-gray-700" />
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Category Archive
                            </p>
                            <h1 className="text-2xl font-bold capitalize text-gray-900">
                                {categoryTitle}
                            </h1>
                        </div>
                    </div>

                    {/* Filtered Posts Feed */}
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <article
                                key={post.id}
                                className="border-b border-gray-100 pb-16 last:border-b-0"
                            >
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
                                    <span>{post.author}</span>
                                    <span>•</span>
                                    <span>{post.date}</span>
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
                            <p className="text-gray-500 text-lg">
                                No articles found under the &quot;{categoryTitle}&quot; category.
                            </p>
                            <Link
                                href="/blog"
                                className="inline-block mt-4 text-xs font-semibold uppercase border-b border-black pb-0.5"
                            >
                                View all posts
                            </Link>
                        </div>
                    )}
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
                                        className={`hover:text-black transition-colors ${cat.slug === categorySlug ? 'font-bold text-black' : ''
                                            }`}
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