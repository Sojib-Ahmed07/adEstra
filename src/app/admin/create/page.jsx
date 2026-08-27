// app/admin/create/page.jsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createPost } from '@/app/actions/blog'

export default function CreatePostPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState('')

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    setError('')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Upload failed')

      setImageUrl(data.url)
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)

    const postData = {
      title: formData.get('title'),
      excerpt: formData.get('excerpt'),
      content: formData.get('content'),
      categoryName: formData.get('categoryName'),
      imageUrl: imageUrl,
      tags: formData.get('tags'),
    }

    try {
      await createPost(postData)
      router.push('/blog')
    } catch (err) {
      setError(err.message || 'Failed to create post')
      setLoading(false)
    }
  }

  const inputClass =
    'w-full border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 p-3 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-500 transition'

  const labelClass =
    'block text-sm font-semibold text-slate-700 mb-2'

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Create New Blog Post
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Create and publish a new article to your blog.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >

          {/* Title */}
          <div>
            <label className={labelClass}>
              Title
            </label>

            <input
              type="text"
              name="title"
              required
              className={inputClass}
              placeholder="Post Title..."
            />
          </div>

          {/* Category */}
          <div>
            <label className={labelClass}>
              Category Name
            </label>

            <input
              type="text"
              name="categoryName"
              required
              className={inputClass}
              placeholder="e.g. Technology, Design, Marketing"
            />
          </div>

          {/* Featured Image */}
          <div>
            <label className={labelClass}>
              Featured Image
            </label>

            <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full cursor-pointer text-sm text-slate-500
                  file:mr-4 file:cursor-pointer file:rounded-md
                  file:border-0 file:bg-slate-900 file:px-4 file:py-2
                  file:text-xs file:font-semibold file:text-white
                  hover:file:bg-slate-700"
              />

              {uploading && (
                <p className="mt-3 text-xs font-medium text-slate-500">
                  Uploading image...
                </p>
              )}

              {imageUrl && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-semibold text-emerald-600">
                    Image uploaded successfully
                  </p>

                  <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="h-40 w-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className={labelClass}>
              Excerpt
            </label>

            <textarea
              name="excerpt"
              rows="3"
              required
              className={inputClass}
              placeholder="Short summary of the post..."
            />
          </div>

          {/* Content */}
          <div>
            <label className={labelClass}>
              Content
            </label>

            <textarea
              name="content"
              rows="10"
              required
              className={`${inputClass} font-mono`}
              placeholder="Write your article content here..."
            />
          </div>

          {/* Tags */}
          <div>
            <label className={labelClass}>
              Tags
            </label>

            <input
              type="text"
              name="tags"
              className={inputClass}
              placeholder="nextjs, mongodb, webdev"
            />

            <p className="mt-2 text-xs text-slate-400">
              Separate multiple tags with commas.
            </p>
          </div>

          {/* Submit */}
          <div className="border-t border-slate-200 pt-6">
            <button
              type="submit"
              disabled={loading || uploading}
              className="w-full rounded-md bg-slate-900 py-3 text-sm font-semibold text-white
                transition-colors hover:bg-slate-800
                focus:outline-none focus:ring-2 focus:ring-slate-900/20
                disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>

        </form>
      </div>
    </main>
  )
}