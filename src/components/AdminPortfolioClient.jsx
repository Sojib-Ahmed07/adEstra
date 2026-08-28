// components/AdminPortfolioClient.jsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { savePortfolioItem, deletePortfolioItem } from '@/app/actions/portfolio'

export default function AdminPortfolioClient({ initialItems }) {
  const router = useRouter()
  const [items, setItems] = useState(initialItems || [])
  const [editingItem, setEditingItem] = useState(null)
  const [loading, setLoading] = useState(false)
  
  // Dynamic Form States
  const [existingCover, setExistingCover] = useState('')
  const [coverPreview, setCoverPreview] = useState('')
  const [existingGallery, setExistingGallery] = useState([])
  const [processSteps, setProcessSteps] = useState([{ title: '', pointsText: '' }])

  function handleEdit(item) {
    setEditingItem(item)
    setExistingCover(item.coverImage || '')
    setCoverPreview(item.coverImage || '')
    setExistingGallery(item.galleryImages || [])
    setProcessSteps(
      item.process?.map((p) => ({
        title: p.title,
        pointsText: p.points?.join('\n') || '',
      })) || [{ title: '', pointsText: '' }]
    )
  }

  function resetForm() {
    setEditingItem(null)
    setExistingCover('')
    setCoverPreview('')
    setExistingGallery([])
    setProcessSteps([{ title: '', pointsText: '' }])
  }

  function handleCoverChange(e) {
    const file = e.target.files[0]
    if (file) setCoverPreview(URL.createObjectURL(file))
  }

  function handleRemoveExistingGalleryImage(index) {
    setExistingGallery((prev) => prev.filter((_, i) => i !== index))
  }

  function handleAddProcessStep() {
    setProcessSteps([...processSteps, { title: '', pointsText: '' }])
  }

  function handleRemoveProcessStep(index) {
    setProcessSteps(processSteps.filter((_, i) => i !== index))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const form = e.target
    const formData = new FormData(form)

    // Append structured process JSON
    const formattedProcess = processSteps.map((step) => ({
      title: step.title,
      points: step.pointsText.split('\n').filter(Boolean),
    }))
    formData.append('processJSON', JSON.stringify(formattedProcess))

    // Append existing gallery URLs state
    formData.append('existingGalleryJSON', JSON.stringify(existingGallery))

    const res = await savePortfolioItem(formData)
    setLoading(false)

    if (res.success) {
      resetForm()
      form.reset()
      router.refresh()
    } else {
      alert(res.error || 'Failed to save case study.')
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12 bg-slate-50 min-h-screen text-slate-900">
      <h1 className="text-3xl font-bold">Case Studies Manager</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 border border-slate-200 rounded-md space-y-6 text-sm shadow-sm">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-bold">
            {editingItem ? `Editing: ${editingItem.title}` : 'Create New Case Study'}
          </h2>
          {editingItem && (
            <button type="button" onClick={resetForm} className="text-xs font-semibold text-slate-500 hover:underline">
              Cancel Edit
            </button>
          )}
        </div>

        {editingItem && <input type="hidden" name="id" value={editingItem._id} />}
        <input type="hidden" name="existingCoverImage" value={existingCover} />

        {/* Core Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Title</label>
            <input name="title" defaultValue={editingItem?.title || ''} required className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Client Name</label>
            <input name="client" defaultValue={editingItem?.client || ''} required className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Industry</label>
            <input name="industry" defaultValue={editingItem?.industry || ''} required className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Project Type</label>
            <input name="projectType" defaultValue={editingItem?.projectType || ''} placeholder="e.g. Social Media Marketing" required className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Duration</label>
            <input name="duration" defaultValue={editingItem?.duration || ''} placeholder="e.g. 3 years" required className="w-full border p-2 rounded" />
          </div>
        </div>

        {/* Main Cover Upload */}
        <div className="border p-4 rounded bg-slate-50 space-y-3">
          <label className="block text-xs font-bold uppercase">Main Banner Image</label>
          <input type="file" name="coverImageFile" accept="image/*" onChange={handleCoverChange} className="w-full text-xs" />
          {coverPreview && (
            <img src={coverPreview} alt="Cover Preview" className="h-40 w-full object-cover rounded border" />
          )}
        </div>

        {/* Text Paragraphs */}
        <div>
          <label className="block text-xs font-bold uppercase mb-1">Background Story</label>
          <textarea name="background" rows="4" defaultValue={editingItem?.background || ''} required className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase mb-1">Objectives (1 bullet point per line)</label>
          <textarea name="objectivesText" rows="4" defaultValue={editingItem?.objectives?.join('\n') || ''} className="w-full border p-2 rounded" />
        </div>

        {/* Process Step Builder */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-xs font-bold uppercase">Process Timeline Steps</label>
            <button type="button" onClick={handleAddProcessStep} className="text-xs bg-indigo-600 text-white px-3 py-1 rounded font-medium">
              + Add Step
            </button>
          </div>
          {processSteps.map((step, idx) => (
            <div key={idx} className="p-4 border rounded bg-slate-50 space-y-3 relative">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xs">Step #{idx + 1}</span>
                {processSteps.length > 1 && (
                  <button type="button" onClick={() => handleRemoveProcessStep(idx)} className="text-xs text-red-600 font-semibold">
                    Remove
                  </button>
                )}
              </div>
              <input
                className="w-full border p-2 rounded text-sm"
                placeholder="Step Title (e.g. Audit & Strategy Development)"
                value={step.title}
                onChange={(e) => {
                  const updated = [...processSteps]
                  updated[idx].title = e.target.value
                  setProcessSteps(updated)
                }}
              />
              <textarea
                className="w-full border p-2 rounded text-xs"
                rows="3"
                placeholder="Bullet points for this step (1 per line)"
                value={step.pointsText}
                onChange={(e) => {
                  const updated = [...processSteps]
                  updated[idx].pointsText = e.target.value
                  setProcessSteps(updated)
                }}
              />
            </div>
          ))}
        </div>

        {/* Gallery Multi-Upload */}
        <div className="border p-4 rounded bg-slate-50 space-y-4">
          <label className="block text-xs font-bold uppercase">Gallery Showcase Images</label>
          <input type="file" name="galleryImageFiles" accept="image/*" multiple className="w-full text-xs" />
          
          {existingGallery.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {existingGallery.map((url, i) => (
                <div key={i} className="relative group">
                  <img src={url} alt="Gallery item" className="h-24 w-full object-cover rounded border" />
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingGalleryImage(i)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-[10px] leading-none"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase mb-1">Results & Outcomes (1 point per line)</label>
          <textarea name="resultsText" rows="4" defaultValue={editingItem?.results?.join('\n') || ''} className="w-full border p-2 rounded" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-8 py-3 rounded font-bold uppercase tracking-wider text-xs hover:bg-slate-800 disabled:opacity-50"
        >
          {loading ? 'Uploading & Saving...' : 'Save Case Study'}
        </button>
      </form>

      {/* Existing Items Table */}
      <div className="bg-white border rounded-md divide-y">
        {items.map((item) => (
          <div key={item._id} className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src={item.coverImage} alt={item.title} className="w-16 h-12 object-cover rounded" />
              <div>
                <h3 className="font-bold text-sm">{item.title}</h3>
                <p className="text-xs text-slate-500">{item.client} • {item.industry}</p>
              </div>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(item)} className="text-xs border px-3 py-1.5 rounded font-semibold hover:bg-slate-100">
                Edit
              </button>
              <button
                onClick={() => {
                  if (confirm('Delete this case study?')) {
                    deletePortfolioItem(item._id).then(() => router.refresh())
                  }
                }}
                className="text-xs border border-red-200 text-red-600 px-3 py-1.5 rounded font-semibold hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}