// components/AdminDashboardClient.jsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  loginAdmin,
  logoutAdmin,
  savePost,
  deletePost,
  deleteComment,
  getPostCommentsAdmin,
} from '@/app/actions/admin'

export default function AdminDashboardClient({ isAuthenticated, initialPosts, categories }) {
  const [authed, setAuthed] = useState(isAuthenticated)
  const [passwordInput, setPasswordInput] = useState('')
  const [posts, setPosts] = useState(initialPosts || [])
  const [editingPost, setEditingPost] = useState(null)
  const [postComments, setPostComments] = useState([])
  const [loadingComments, setLoadingComments] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  // Login Handler
  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    const res = await loginAdmin(passwordInput)
    if (res.success) {
      setAuthed(true)
      window.location.reload()
    } else {
      setErrorMsg(res.error || 'Invalid Password')
    }

    setLoading(false)
  }

  // Logout Handler
  async function handleLogout() {
    await logoutAdmin()
    setAuthed(false)
  }

  // Open Edit Modal & Load Post Comments
  async function openEditModal(post) {
    setEditingPost(post)
    setIsModalOpen(true)
    setPostComments([])

    if (post?._id) {
      setLoadingComments(true)
      const comments = await getPostCommentsAdmin(post._id)
      setPostComments(comments)
      setLoadingComments(false)
    }
  }

  function closeModal() {
    setEditingPost(null)
    setPostComments([])
    setIsModalOpen(false)
  }

  // Delete Post
  async function handleDeletePost(id) {
    if (!confirm('This will delete the post AND all associated comments. Continue?')) return

    const res = await deletePost(id)
    if (res.success) {
      setPosts((prev) => prev.filter((p) => p._id !== id))
    } else {
      alert(res.error)
    }
  }

  // Delete Individual Comment inside Modal
  async function handleDeleteComment(commentId) {
    if (!confirm('Are you sure you want to delete this comment?')) return

    const res = await deleteComment(commentId, editingPost?.slug)
    if (res.success) {
      setPostComments((prev) => prev.filter((c) => c._id !== commentId))
    } else {
      alert(res.error || 'Failed to delete comment')
    }
  }

  // Save Existing Post Form
  async function handleSavePost(e) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target)

    const res = await savePost(formData)
    if (res.success) {
      closeModal()
      window.location.reload()
    } else {
      alert(res.error || 'Error saving post')
    }

    setLoading(false)
  }

  // Password Gate
  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white p-8 border border-slate-200 rounded-xl shadow-sm space-y-6"
        >
          <h1 className="text-2xl font-bold text-slate-900">
            Admin Login
          </h1>

          <p className="text-xs text-slate-500">
            Enter master password to access management modules.
          </p>

          <div>
            <input
              type="password"
              placeholder="Admin Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 text-slate-900"
            />
          </div>

          {errorMsg && (
            <p className="text-xs text-red-600 font-semibold">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-2.5 text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Unlock Dashboard'}
          </button>
        </form>
      </main>
    )
  }

  return (
    <main className="max-w-6xl mx-auto py-12 px-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Admin Control Center
          </h1>
          <p className="text-xs text-slate-500">
            Manage blog posts, team members, and site content
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Linked directly to /admin/create */}
          <Link
            href="/admin/create"
            className="bg-slate-900 text-white px-5 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-slate-800 transition-colors"
          >
            + Create New Post
          </Link>

          <Link
            href="/admin/team"
            className="bg-emerald-700 text-white px-5 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-emerald-800 transition-colors"
          >
            Manage Team
          </Link>

          <button
            onClick={handleLogout}
            className="border border-slate-300 text-slate-700 px-4 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-slate-100 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Admin Module Navigation Hub */}
      <div className="mb-8 border border-slate-200 bg-white p-2 rounded-lg flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider shadow-sm">
        <Link
          href="/admin"
          className="px-4 py-2 bg-slate-900 text-white rounded-md"
        >
          Blog Posts
        </Link>
        <Link
          href="/admin/team"
          className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
        >
          Team Members
        </Link>
        <span className="px-4 py-2 text-slate-400 italic normal-case border-l border-slate-200 ml-auto">
          + Add future modules here
        </span>
      </div>

      {/* Post Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-sm">
        <table className="w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {posts.map((post) => (
              <tr
                key={post._id}
                className="hover:bg-slate-50/80 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-slate-900">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:underline"
                  >
                    {post.title}
                  </Link>
                </td>

                <td className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                  {post.category?.name || 'Uncategorized'}
                </td>

                <td className="px-6 py-4 text-xs text-slate-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-right space-x-4">
                  <button
                    onClick={() => openEditModal(post)}
                    className="text-xs text-slate-700 hover:text-slate-900 font-semibold uppercase"
                  >
                    Edit & Comments
                  </button>

                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="text-xs text-red-600 hover:text-red-800 font-semibold uppercase"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Post Modal with Embedded Comment Management */}
      {isModalOpen && editingPost && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 rounded-xl border border-slate-200 shadow-xl space-y-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Edit Post
              </h2>

              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-900 text-sm font-semibold"
              >
                ✕ Close
              </button>
            </div>

            {/* Post Details Form */}
            <form
              onSubmit={handleSavePost}
              className="space-y-4 text-sm"
            >
              <input
                type="hidden"
                name="id"
                value={editingPost._id}
              />

              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-slate-700">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  defaultValue={editingPost.title || ''}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-slate-500 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 text-slate-700">
                    Slug
                  </label>

                  <input
                    type="text"
                    name="slug"
                    defaultValue={editingPost.slug || ''}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-slate-500 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1 text-slate-700">
                    Category
                  </label>

                  <select
                    name="category"
                    defaultValue={
                      editingPost.category?._id ||
                      editingPost.category ||
                      ''
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-slate-500 text-slate-900"
                  >
                    <option value="">Select Category</option>

                    {categories.map((cat) => (
                      <option
                        key={cat._id}
                        value={cat._id}
                      >
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-slate-700">
                  Image URL
                </label>

                <input
                  type="text"
                  name="image"
                  defaultValue={editingPost.image || editingPost.imageUrl || ''}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-slate-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-slate-700">
                  Excerpt
                </label>

                <textarea
                  name="excerpt"
                  rows="2"
                  defaultValue={editingPost.excerpt || ''}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-slate-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-slate-700">
                  Content
                </label>

                <textarea
                  name="content"
                  rows="6"
                  defaultValue={editingPost.content || ''}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-slate-500 text-slate-900"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-xs uppercase font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-slate-900 text-white px-6 py-2 rounded-md text-xs uppercase font-semibold hover:bg-slate-800 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>

            {/* Embedded Comments Section */}
            <div className="pt-8 border-t border-slate-200 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                Manage Comments ({postComments.length})
              </h3>

              {loadingComments ? (
                <p className="text-xs text-slate-500">
                  Loading comments...
                </p>
              ) : postComments.length > 0 ? (
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {postComments.map((comment) => (
                    <div
                      key={comment._id}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-md flex justify-between items-start gap-4"
                    >
                      <div className="space-y-1">
                        <div className="text-xs font-semibold text-slate-900 flex items-center gap-2">
                          <span>
                            {comment.name ||
                              comment.author ||
                              'Anonymous'}
                          </span>

                          <span className="text-slate-400">
                            •{' '}
                            {new Date(
                              comment.createdAt
                            ).toLocaleDateString()}
                          </span>
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed">
                          {comment.content}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteComment(comment._id)
                        }
                        className="text-xs text-red-600 hover:text-red-800 font-bold uppercase shrink-0"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">
                  No comments on this post yet.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}