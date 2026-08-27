// components/CommentForm.jsx
'use client'

import { useState } from 'react'
import { addComment } from '@/app/actions/blog'

export default function CommentForm({ postId }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    const formData = new FormData(e.currentTarget)
    const commentData = {
      author: formData.get('author'),
      email: formData.get('email'),
      content: formData.get('content'),
    }

    try {
      await addComment(postId, commentData)
      e.target.reset()
      setSuccess(true)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Leave a Reply</h3>

      {success && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-xs rounded-sm">
          Comment submitted successfully!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Name *</label>
          <input
            type="text"
            name="author"
            required
            className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-black rounded-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Email *</label>
          <input
            type="email"
            name="email"
            required
            className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-black rounded-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Comment *</label>
        <textarea
          name="content"
          rows="4"
          required
          className="w-full border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-black rounded-sm"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-6 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50"
      >
        {loading ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  )
}