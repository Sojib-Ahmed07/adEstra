// components/AdminTeamClient.jsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { saveTeamMember, deleteTeamMember } from '@/app/actions/team'

export default function AdminTeamClient({ initialMembers }) {
  const [members, setMembers] = useState(initialMembers || [])
  const [editingMember, setEditingMember] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')
  const [loading, setLoading] = useState(false)

  function openModal(member = null) {
    setEditingMember(member)
    setPreviewUrl(member?.image || '')
    setIsModalOpen(true)
  }

  function closeModal() {
    setEditingMember(null)
    setPreviewUrl('')
    setIsModalOpen(false)
  }

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (file) {
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to remove this team member?')) return

    const res = await deleteTeamMember(id)
    if (res.success) {
      setMembers((prev) => prev.filter((m) => m._id !== id))
    } else {
      alert(res.error || 'Failed to delete member')
    }
  }

  async function handleSave(e) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target)
    const res = await saveTeamMember(formData)

    if (res.success) {
      closeModal()
      window.location.reload()
    } else {
      alert(res.error || 'Error saving team member')
    }
    setLoading(false)
  }

  return (
    <main className="max-w-6xl mx-auto py-12 px-6 bg-slate-50 text-slate-900 min-h-screen">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manage Team Members</h1>
          <p className="text-xs text-slate-500">
            Add, edit, or remove staff members with Cloudinary storage
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 uppercase"
          >
            ← Back to Posts
          </Link>

          <button
            onClick={() => openModal()}
            className="bg-slate-900 text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-slate-800"
          >
            + Add Team Member
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div
            key={member._id}
            className="border border-slate-200 p-4 rounded-sm flex gap-4 items-center bg-white"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-16 h-20 object-cover bg-slate-100 rounded-sm"
            />

            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-slate-900 text-base truncate">
                {member.name}
              </h3>

              <p className="text-xs text-slate-500 truncate">
                {member.role}
              </p>

              <div className="mt-3 flex gap-3 text-xs font-semibold uppercase">
                <button
                  onClick={() => openModal(member)}
                  className="text-slate-700 hover:text-slate-900"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(member._id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-lg w-full p-6 border border-slate-200 space-y-6">
            <h2 className="text-xl font-bold text-slate-900">
              {editingMember ? 'Edit Team Member' : 'Add Team Member'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4 text-sm">
              {editingMember && (
                <input type="hidden" name="id" value={editingMember._id} />
              )}

              <input
                type="hidden"
                name="existingImage"
                value={editingMember?.image || ''}
              />

              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-slate-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  defaultValue={editingMember?.name || ''}
                  required
                  className="w-full px-4 py-2 border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-slate-700">
                  Role / Job Title
                </label>

                <input
                  type="text"
                  name="role"
                  defaultValue={editingMember?.role || ''}
                  required
                  className="w-full px-4 py-2 border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-slate-500"
                />
              </div>

              {/* Cloudinary File Input */}
              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-slate-700">
                  Member Image
                </label>

                <input
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-2 py-1.5 border border-slate-300 bg-white text-slate-600 text-xs focus:outline-none focus:border-slate-500"
                />

                {previewUrl && (
                  <div className="mt-3 flex items-center gap-3">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-16 h-20 object-cover border border-slate-200 rounded-sm"
                    />

                    <p className="text-xs text-slate-500">
                      Image preview
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-slate-700">
                  Social Links
                </label>

                <input
                  type="text"
                  name="facebook"
                  placeholder="Facebook URL"
                  defaultValue={editingMember?.socials?.facebook || ''}
                  className="w-full px-4 py-2 border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-500 text-xs"
                />

                <input
                  type="text"
                  name="twitter"
                  placeholder="Twitter URL"
                  defaultValue={editingMember?.socials?.twitter || ''}
                  className="w-full px-4 py-2 border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-500 text-xs"
                />

                <input
                  type="text"
                  name="instagram"
                  placeholder="Instagram URL"
                  defaultValue={editingMember?.socials?.instagram || ''}
                  className="w-full px-4 py-2 border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-500 text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
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
                  className="bg-slate-900 text-white px-6 py-2 text-xs uppercase font-semibold hover:bg-slate-800 disabled:opacity-50"
                >
                  {loading ? 'Uploading & Saving...' : 'Save Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}