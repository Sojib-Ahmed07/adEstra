// components/CommentSection.jsx
'use client'

import { useState, useRef } from 'react'
import { addComment } from '@/app/actions/comments'

export default function CommentSection({ postId, postSlug, initialComments }) {
  const [comments, setComments] = useState(initialComments || [])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const formRef = useRef(null)

  async function handleSubmit(formData) {
    setIsSubmitting(true)
    setMessage('')

    const name = formData.get('name')
    const content = formData.get('content')

    const res = await addComment(formData)

    if (res?.error) {
      setMessage(res.error)
    } else {
      // Create an optimistic comment object for immediate display
      const newComment = {
        _id: Date.now().toString(),
        name,
        content,
        createdAt: new Date().toISOString(),
      }

      // Update local state instantly so no refresh is needed
      setComments((prev) => [newComment, ...prev])

      setMessage('Comment posted successfully!')
      formRef.current?.reset()
    }
    setIsSubmitting(false)
  }

  return (
    <section className="mt-16 pt-12 border-t border-gray-200 space-y-12">
      <h3 className="text-2xl font-bold text-gray-900">
        Comments ({comments.length})
      </h3>

      {/* Add Comment Form */}
      <form
        ref={formRef}
        action={handleSubmit}
        className="space-y-4 bg-gray-50 p-6 rounded-sm border border-gray-200"
      >
        <h4 className="text-lg font-semibold text-gray-900">Leave a reply</h4>

        <input type="hidden" name="postId" value={postId} />
        <input type="hidden" name="postSlug" value={postSlug} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-black bg-white text-gray-900"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email *"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-black bg-white text-gray-900"
          />
        </div>

        <textarea
          name="content"
          rows="4"
          placeholder="Write your comment here..."
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-black bg-white text-gray-900"
        />

        {message && (
          <p className="text-xs font-semibold text-green-600">{message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white px-6 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="p-4 border-b border-gray-100 last:border-b-0 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900 text-sm">
                  {comment.name || comment.author}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {comment.content}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">
            No comments yet. Be the first to share your thoughts!
          </p>
        )}
      </div>
    </section>
  )
}