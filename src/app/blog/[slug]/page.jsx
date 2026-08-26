'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
    FiSearch,
    FiCalendar,
    FiUser,
    FiMessageSquare,
    FiClock,
    FiShare2,
} from 'react-icons/fi'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaLink } from 'react-icons/fa6'

// Dummy single post data
const postData = {
    slug: 'low-code-web-design',
    title:
        'From Concept to Clicks: How Low-Code Web Design Accelerates Business Growth',
    author: 'admin',
    authorBio:
        'Senior Web Architect & Content Strategist at adEstra Solution. Passionate about performant Web UI and modern JavaScript tooling.',
    date: 'October 25, 2025',
    readTime: '4 min read',
    commentsCount: 2,
    image: 'https://picsum.photos/seed/abstract/1200/600',
    content: `
    <p class="mb-4">In today's fast-moving digital world, businesses cannot afford to wait months for a website launch. They need speed, flexibility, and results fast. That's where low-code web design comes in. At adEstra Solution, we help brands turn ideas into high-performing websites in record time, combining low-code technology with professional design and marketing expertise.</p>
    
    <h3 class="text-2xl font-bold my-4 text-gray-900">Why Speed to Market Matters</h3>
    <p class="mb-4">The digital landscape evolves at breakneck speed. Launching a site in weeks instead of months allows businesses to capture market demand, test offers, and generate revenue faster than ever before.</p>
    
    <blockquote class="border-l-4 border-black pl-4 italic my-6 text-gray-700 font-medium">
      "Low-code doesn't mean low quality. It means working smarter to focus on user experience and business strategy."
    </blockquote>
    
    <p class="mb-4">By taking advantage of streamlined component architectures, developers can focus on custom interactive elements while core infrastructure handles the heavy lifting.</p>
  `,
}

const categories = [
    { name: 'Creative', count: 3, slug: 'creative' },
    { name: 'Design', count: 5, slug: 'design' },
    { name: 'Marketing', count: 4, slug: 'marketing' },
    { name: 'Technology', count: 5, slug: 'technology' },
]

export default function SingleBlogPage() {
    const params = useParams()
    const slug = params.slug

    return (
        <main className="w-full min-h-screen bg-white text-gray-900 font-sans">
            <div className="max-w-7xl mx-auto px-6 py-16 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Main Content Area (Left Column) */}
                <article className="lg:col-span-8">

                    {/* Header Metadata */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-medium tracking-wide mb-4">
                        <span className="flex items-center gap-1">
                            <FiUser className="w-3.5 h-3.5" /> {postData.author}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <FiCalendar className="w-3.5 h-3.5" /> {postData.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <FiClock className="w-3.5 h-3.5" /> {postData.readTime}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <FiMessageSquare className="w-3.5 h-3.5" /> {postData.commentsCount} Comments
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-8">
                        {postData.title}
                    </h1>

                    {/* Featured Image */}
                    {postData.image && (
                        <div className="mb-10 overflow-hidden rounded-sm">
                            <img
                                src={postData.image}
                                alt={postData.title}
                                className="w-full h-auto object-cover max-h-[500px]"
                            />
                        </div>
                    )}

                    {/* HTML Article Body */}
                    <div
                        className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4"
                        dangerouslySetInnerHTML={{ __html: postData.content }}
                    />

                    {/* Social Share Bar */}
                    <div className="mt-10 py-6 border-y border-gray-200 flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                            <FiShare2 className="w-4 h-4" /> Share Article
                        </span>
                        <div className="flex items-center gap-3">
                            <a
                                href="#"
                                aria-label="Share on Facebook"
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white hover:border-black transition-colors"
                            >
                                <FaFacebookF className="w-3 h-3" />
                            </a>
                            <a
                                href="#"
                                aria-label="Share on Twitter"
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white hover:border-black transition-colors"
                            >
                                <FaTwitter className="w-3 h-3" />
                            </a>
                            <a
                                href="#"
                                aria-label="Share on LinkedIn"
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white hover:border-black transition-colors"
                            >
                                <FaLinkedinIn className="w-3 h-3" />
                            </a>
                            <button
                                type="button"
                                aria-label="Copy Link"
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white hover:border-black transition-colors"
                            >
                                <FaLink className="w-3 h-3" />
                            </button>
                        </div>
                    </div>

                    {/* Author Box */}
                    <div className="my-10 p-6 bg-gray-50 border border-gray-100 rounded-sm flex items-start gap-4">
                        <div className="w-14 h-14 rounded-full bg-black text-white font-bold text-lg flex items-center justify-center shrink-0">
                            AD
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-base">Written by {postData.author}</h4>
                            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                                {postData.authorBio}
                            </p>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div>
                        <Link
                            href="/blog"
                            className="inline-block border border-gray-900 text-gray-900 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
                        >
                            ← Back to All Posts
                        </Link>
                    </div>

                    {/* Related Articles Section */}
                    <section className="mt-16 pt-12 border-t border-gray-200">
                        <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
                            Related Articles
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <article className="group">
                                <div className="overflow-hidden rounded-sm mb-4 aspect-[16/9] bg-gray-100">
                                    <img
                                        src="https://picsum.photos/seed/rel1/600/400"
                                        alt="Related Post 1"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <span className="text-xs text-gray-400 font-medium">October 22, 2025</span>
                                <h4 className="text-lg font-bold text-gray-900 mt-1 leading-snug group-hover:text-gray-600 transition-colors">
                                    <Link href="/blog/marketing-strategy-vs-plan">
                                        Marketing Strategy VS Marketing Plan: What&apos;s the Difference?
                                    </Link>
                                </h4>
                            </article>

                            <article className="group">
                                <div className="overflow-hidden rounded-sm mb-4 aspect-[16/9] bg-gray-100">
                                    <img
                                        src="https://picsum.photos/seed/rel2/600/400"
                                        alt="Related Post 2"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <span className="text-xs text-gray-400 font-medium">September 14, 2025</span>
                                <h4 className="text-lg font-bold text-gray-900 mt-1 leading-snug group-hover:text-gray-600 transition-colors">
                                    <Link href="/blog/brand-guidelines-importance">
                                        Why Complete Brand Guidelines Are Essential for Growth
                                    </Link>
                                </h4>
                            </article>
                        </div>
                    </section>

                    {/* Comments List Section */}
                    <section className="mt-16 pt-12 border-t border-gray-200">
                        <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
                            Comments ({postData.commentsCount})
                        </h3>

                        <div className="space-y-8 mb-14">
                            {/* Comment 1 */}
                            <div className="flex gap-4">
                                <div className="w-11 h-11 rounded-full bg-gray-900 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                                    JD
                                </div>
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-3">
                                        <h4 className="font-bold text-gray-900 text-sm">John Doe</h4>
                                        <span className="text-xs text-gray-400">October 26, 2025</span>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Great insights on low-code solutions! We recently switched to a component-based setup and reduced our launch time by almost 50%.
                                    </p>
                                    <button className="text-xs font-semibold uppercase tracking-wider text-black border-b border-black pb-0.5 hover:opacity-70 transition-opacity">
                                        Reply
                                    </button>
                                </div>
                            </div>

                            {/* Comment 2 (Author Reply) */}
                            <div className="flex gap-4 pl-8 md:pl-12 border-l-2 border-gray-100">
                                <div className="w-11 h-11 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                                    AD
                                </div>
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-3">
                                        <h4 className="font-bold text-gray-900 text-sm">admin</h4>
                                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                                            Author
                                        </span>
                                        <span className="text-xs text-gray-400">October 26, 2025</span>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Thanks John! That speed advantage is exactly why more teams are moving toward hybrid low-code frameworks.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Leave a Reply Form */}
                        <div className="bg-gray-50 p-8 rounded-sm border border-gray-100">
                            <h4 className="text-xl font-bold tracking-tight text-gray-900 mb-2">
                                Leave a Reply
                            </h4>
                            <p className="text-xs text-gray-500 mb-6">
                                Your email address will not be published. Required fields are marked *
                            </p>

                            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                                <div>
                                    <label htmlFor="comment" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                                        Comment *
                                    </label>
                                    <textarea
                                        id="comment"
                                        rows={5}
                                        required
                                        placeholder="Write your comment here..."
                                        className="w-full p-3.5 text-sm bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-black transition-colors"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            placeholder="Your name"
                                            className="w-full p-3.5 text-sm bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-black transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            placeholder="your@email.com"
                                            className="w-full p-3.5 text-sm bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-black transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="border border-gray-900 bg-gray-900 text-white px-8 py-3 text-xs font-semibold uppercase tracking-wider hover:bg-black transition-colors"
                                    >
                                        Post Comment
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>

                </article>

                {/* Sidebar (Right Column) */}
                <aside className="lg:col-span-4 space-y-12">

                    {/* Search Box */}
                    <div className="relative border-b border-gray-300 pb-2">
                        <input
                            type="text"
                            placeholder="Search..."
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

                    {/* Categories Widget */}
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