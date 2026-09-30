'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveService, deleteService } from '@/app/actions/services'

/* =========================================================
   LUCIDE ICON OPTIONS (for the offer card icon <select>)
   ========================================================= */
const ICON_OPTIONS = [
    'Sparkles', 'Search', 'FileSearch', 'FileCode2', 'Globe2', 'MapPin', 'Wrench',
    'BarChart', 'Target', 'TrendingUp', 'PenTool', 'FileText', 'Mail', 'Share2',
    'BookOpen', 'Feather', 'Lightbulb', 'Zap', 'Languages', 'Ruler', 'Layout',
    'Users', 'Printer', 'Shapes', 'Compass', 'Settings', 'Home', 'Cpu', 'Video',
    'ImageIcon', 'Building2', 'Film', 'Boxes', 'Award', 'Briefcase', 'Camera',
    'Code2', 'Database', 'Heart', 'Layers', 'LineChart', 'Megaphone',
    'MessageSquare', 'Monitor', 'Palette', 'Rocket', 'ShieldCheck', 'ShoppingBag',
    'Smartphone', 'Star', 'ThumbsUp', 'Wand2',
]

export default function AdminServicesClient({ initialServices }) {
    const router = useRouter()
    const [services, setServices] = useState(initialServices || [])
    const [editingService, setEditingService] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    // Form state
    const [heroIconPreview, setHeroIconPreview] = useState('')
    const [existingHeroIcon, setExistingHeroIcon] = useState('')
    const [coverPreview, setCoverPreview] = useState('')
    const [existingCover, setExistingCover] = useState('')
    const [offerCards, setOfferCards] = useState([])
    const [whyChoose, setWhyChoose] = useState([])

    /* -------- Open modal -------- */
    function openCreateModal() {
        setEditingService(null)
        setExistingHeroIcon('')
        setHeroIconPreview('')
        setExistingCover('')
        setCoverPreview('')
        setOfferCards([])
        setWhyChoose([])
        setIsModalOpen(true)
    }

    function openEditModal(service) {
        setEditingService(service)
        setExistingHeroIcon(service.heroIconImage || '')
        setHeroIconPreview(service.heroIconImage || '')
        setExistingCover(service.coverImage || '')
        setCoverPreview(service.coverImage || '')
        setOfferCards(
            (service.offerCards || []).map((c) => ({
                icon: c.icon || 'Sparkles',
                title: c.title || '',
                description: c.description || '',
                pointsText: (c.points || []).join('\n'),
                footer: c.footer || '',
            }))
        )
        setWhyChoose(
            (service.whyChoose || []).map((w) => ({
                title: w.title || '',
                description: w.description || '',
            }))
        )
        setIsModalOpen(true)
    }

    function closeModal() {
        setEditingService(null)
        setIsModalOpen(false)
    }

    /* -------- File previews -------- */
    function handleHeroIconChange(e) {
        const file = e.target.files[0]
        if (file) setHeroIconPreview(URL.createObjectURL(file))
    }

    function handleCoverChange(e) {
        const file = e.target.files[0]
        if (file) setCoverPreview(URL.createObjectURL(file))
    }

    /* -------- Offer cards builder -------- */
    function addOfferCard() {
        setOfferCards([
            ...offerCards,
            { icon: 'Sparkles', title: '', description: '', pointsText: '', footer: '' },
        ])
    }

    function removeOfferCard(index) {
        setOfferCards(offerCards.filter((_, i) => i !== index))
    }

    function updateOfferCard(index, field, value) {
        const updated = [...offerCards]
        updated[index] = { ...updated[index], [field]: value }
        setOfferCards(updated)
    }

    /* -------- Why choose builder -------- */
    function addWhyChoose() {
        setWhyChoose([...whyChoose, { title: '', description: '' }])
    }

    function removeWhyChoose(index) {
        setWhyChoose(whyChoose.filter((_, i) => i !== index))
    }

    function updateWhyChoose(index, field, value) {
        const updated = [...whyChoose]
        updated[index] = { ...updated[index], [field]: value }
        setWhyChoose(updated)
    }

    /* -------- Save -------- */
    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)

        const form = e.target
        const formData = new FormData(form)

        // Structured JSON
        const cardsJSON = offerCards.map((c) => ({
            icon: c.icon,
            title: c.title,
            description: c.description,
            points: c.pointsText.split('\n').map((p) => p.trim()).filter(Boolean),
            footer: c.footer,
        }))
        formData.append('offerCardsJSON', JSON.stringify(cardsJSON))

        const whyJSON = whyChoose.map((w) => ({
            title: w.title,
            description: w.description,
        }))
        formData.append('whyChooseJSON', JSON.stringify(whyJSON))

        const res = await saveService(formData)
        setLoading(false)

        if (res.success) {
            closeModal()
            router.refresh()
        } else {
            alert(res.error || 'Failed to save service.')
        }
    }

    /* -------- Delete -------- */
    async function handleDelete(id) {
        if (!confirm('Delete this service? This cannot be undone.')) return
        const res = await deleteService(id)
        if (res.success) {
            setServices((prev) => prev.filter((s) => s._id !== id))
        } else {
            alert(res.error || 'Failed to delete service.')
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8 bg-slate-50 min-h-screen text-slate-900">

            {/* ========================================================= */}
            {/* HEADER                                                    */}
            {/* ========================================================= */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                    <h1 className="text-3xl font-bold">Services Manager</h1>
                    <p className="text-xs text-slate-500">
                        Create, edit and publish the services shown in the navbar and /services.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={openCreateModal}
                        className="bg-indigo-600 text-white px-5 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-indigo-700 transition-colors"
                    >
                        + Add Service
                    </button>
                    <a
                        href="/admin"
                        className="border border-slate-300 text-slate-700 px-4 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-slate-100 transition-colors"
                    >
                        Back to Dashboard
                    </a>
                </div>
            </div>

            {/* ========================================================= */}
            {/* LIST                                                      */}
            {/* ========================================================= */}
            {services.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-xl p-10 text-center shadow-sm">
                    <p className="text-sm text-slate-500">No services yet. Click &quot;+ Add Service&quot; to create one.</p>
                </div>
            ) : (
                <div className="bg-white border border-slate-200 rounded-xl divide-y shadow-sm">
                    {services.map((service) => (
                        <div key={service._id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                {service.heroIconImage ? (
                                    <img src={service.heroIconImage} alt="" className="w-12 h-12 object-contain rounded border bg-slate-50 p-1" />
                                ) : (
                                    <div className="w-12 h-12 rounded border bg-slate-50 flex items-center justify-center text-[9px] text-slate-400 font-bold uppercase">
                                        No Icon
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-bold text-sm">
                                        {service.title}
                                    </h3>
                                    <p className="text-xs text-slate-500">
                                        /services/{service.slug}
                                        <span className={`ml-2 font-bold uppercase ${service.published ? 'text-emerald-600' : 'text-slate-400'}`}>
                                            • {service.published ? 'Published' : 'Draft'}
                                        </span>
                                        <span className="ml-2 text-slate-400">• Order: {service.order ?? 0}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <a
                                    href={`/services/${service.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs border px-3 py-1.5 rounded font-semibold hover:bg-slate-100"
                                >
                                    Preview
                                </a>
                                <button
                                    onClick={() => openEditModal(service)}
                                    className="text-xs border px-3 py-1.5 rounded font-semibold hover:bg-slate-100"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(service._id)}
                                    className="text-xs border border-red-200 text-red-600 px-3 py-1.5 rounded font-semibold hover:bg-red-50"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ========================================================= */}
            {/* MODAL                                                     */}
            {/* ========================================================= */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 rounded-xl border border-slate-200 shadow-xl space-y-6 text-slate-900">

                        <div className="flex justify-between items-center border-b pb-4">
                            <h2 className="text-xl font-bold">
                                {editingService ? `Edit Service: ${editingService.title}` : 'Create New Service'}
                            </h2>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="text-xs font-semibold text-slate-500 hover:underline"
                            >
                                ✕ Close
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 text-sm">
                            {editingService && <input type="hidden" name="id" value={editingService._id} />}
                            <input type="hidden" name="existingHeroIconImage" value={existingHeroIcon} />
                            <input type="hidden" name="existingCoverImage" value={existingCover} />

                            {/* ---- BASIC ---- */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase mb-1">Title *</label>
                                    <input
                                        name="title"
                                        defaultValue={editingService?.title || ''}
                                        required
                                        className="w-full border p-2 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase mb-1">Slug (auto if empty)</label>
                                    <input
                                        name="slug"
                                        defaultValue={editingService?.slug || ''}
                                        placeholder="e.g. web-design"
                                        className="w-full border p-2 rounded"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase mb-1">Short Description (used in navbar + index grid)</label>
                                <textarea
                                    name="shortDescription"
                                    rows="2"
                                    defaultValue={editingService?.shortDescription || ''}
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            {/* ---- HERO ---- */}
                            <div className="border-t pt-6 space-y-4">
                                <h3 className="text-sm font-bold uppercase text-slate-500">Hero Section</h3>

                                <div>
                                    <label className="block text-xs font-bold uppercase mb-1">Hero Heading</label>
                                    <input
                                        name="heroHeading"
                                        defaultValue={editingService?.heroHeading || ''}
                                        placeholder="Falls back to Title if left empty"
                                        className="w-full border p-2 rounded"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase mb-1">Hero Intro</label>
                                    <textarea
                                        name="heroIntro"
                                        rows="4"
                                        defaultValue={editingService?.heroIntro || ''}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase mb-1">Hero Highlight (small pill line, optional)</label>
                                    <input
                                        name="heroHighlight"
                                        defaultValue={editingService?.heroHighlight || ''}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>
                            </div>

                            {/* ---- IMAGES ---- */}
                            <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="border p-4 rounded bg-slate-50 space-y-3">
                                    <label className="block text-xs font-bold uppercase">Hero Icon (uploaded image)</label>
                                    <input
                                        type="file"
                                        name="heroIconFile"
                                        accept="image/*"
                                        onChange={handleHeroIconChange}
                                        className="w-full text-xs"
                                    />
                                    {heroIconPreview && (
                                        <div className="w-24 h-24 rounded-2xl border-2 border-teal-400 bg-white flex items-center justify-center shadow-sm">
                                            <img src={heroIconPreview} alt="Hero icon preview" className="w-16 h-16 object-contain" />
                                        </div>
                                    )}
                                </div>

                                <div className="border p-4 rounded bg-slate-50 space-y-3">
                                    <label className="block text-xs font-bold uppercase">Cover Image (why-choose visual)</label>
                                    <input
                                        type="file"
                                        name="coverImageFile"
                                        accept="image/*"
                                        onChange={handleCoverChange}
                                        className="w-full text-xs"
                                    />
                                    {coverPreview && (
                                        <img src={coverPreview} alt="Cover preview" className="h-32 w-full object-cover rounded border" />
                                    )}
                                </div>
                            </div>

                            {/* ---- OFFER CARDS ---- */}
                            <div className="border-t pt-6 space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-sm font-bold uppercase text-slate-500">Offer Cards</h3>
                                    <button
                                        type="button"
                                        onClick={addOfferCard}
                                        className="text-xs bg-indigo-600 text-white px-3 py-1 rounded font-medium"
                                    >
                                        + Add Card
                                    </button>
                                </div>

                                {offerCards.length === 0 && (
                                    <p className="text-xs text-slate-400 italic">No cards yet. Section is hidden on the public page if empty.</p>
                                )}

                                {offerCards.map((card, idx) => (
                                    <div key={idx} className="p-4 border rounded bg-slate-50 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-xs">Card #{idx + 1}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeOfferCard(idx)}
                                                className="text-xs text-red-600 font-semibold"
                                            >
                                                Remove
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-bold uppercase mb-1">Icon</label>
                                                <select
                                                    value={card.icon}
                                                    onChange={(e) => updateOfferCard(idx, 'icon', e.target.value)}
                                                    className="w-full border p-2 rounded bg-white"
                                                >
                                                    {ICON_OPTIONS.map((name) => (
                                                        <option key={name} value={name}>{name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase mb-1">Title</label>
                                                <input
                                                    value={card.title}
                                                    onChange={(e) => updateOfferCard(idx, 'title', e.target.value)}
                                                    className="w-full border p-2 rounded"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase mb-1">Description</label>
                                            <textarea
                                                rows="2"
                                                value={card.description}
                                                onChange={(e) => updateOfferCard(idx, 'description', e.target.value)}
                                                className="w-full border p-2 rounded"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase mb-1">Bullet Points (one per line)</label>
                                            <textarea
                                                rows="4"
                                                value={card.pointsText}
                                                onChange={(e) => updateOfferCard(idx, 'pointsText', e.target.value)}
                                                className="w-full border p-2 rounded text-xs"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase mb-1">Footer note (italic, optional)</label>
                                            <input
                                                value={card.footer}
                                                onChange={(e) => updateOfferCard(idx, 'footer', e.target.value)}
                                                className="w-full border p-2 rounded"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* ---- WHY CHOOSE ---- */}
                            <div className="border-t pt-6 space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-sm font-bold uppercase text-slate-500">Why Choose Points</h3>
                                    <button
                                        type="button"
                                        onClick={addWhyChoose}
                                        className="text-xs bg-indigo-600 text-white px-3 py-1 rounded font-medium"
                                    >
                                        + Add Point
                                    </button>
                                </div>

                                {whyChoose.length === 0 && (
                                    <p className="text-xs text-slate-400 italic">No points yet. Section is hidden on the public page if empty.</p>
                                )}

                                {whyChoose.map((item, idx) => (
                                    <div key={idx} className="p-4 border rounded bg-slate-50 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-xs">Point #{idx + 1}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeWhyChoose(idx)}
                                                className="text-xs text-red-600 font-semibold"
                                            >
                                                Remove
                                            </button>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase mb-1">Title</label>
                                            <input
                                                value={item.title}
                                                onChange={(e) => updateWhyChoose(idx, 'title', e.target.value)}
                                                className="w-full border p-2 rounded"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase mb-1">Description</label>
                                            <textarea
                                                rows="2"
                                                value={item.description}
                                                onChange={(e) => updateWhyChoose(idx, 'description', e.target.value)}
                                                className="w-full border p-2 rounded"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* ---- ORDER / PUBLISHED ---- */}
                            <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase mb-1">Order (lower = first)</label>
                                    <input
                                        type="number"
                                        name="order"
                                        defaultValue={editingService?.order ?? 0}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>
                                <div className="flex items-end">
                                    <label className="flex items-center gap-2 text-xs font-bold uppercase cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="published"
                                            value="true"
                                            defaultChecked={editingService ? editingService.published : true}
                                            className="w-4 h-4"
                                        />
                                        Published (visible to public)
                                    </label>
                                </div>
                            </div>

                            {/* ---- ACTIONS ---- */}
                            <div className="flex justify-end gap-3 border-t pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 text-xs uppercase font-semibold text-slate-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-indigo-600 text-white px-6 py-2 rounded text-xs uppercase font-semibold hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : 'Save Service'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}