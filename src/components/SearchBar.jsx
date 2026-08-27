// components/SearchBar.jsx
'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FiSearch } from 'react-icons/fi'

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')

  const handleSearch = (e) => {
    e.preventDefault()
    const trimmed = searchTerm.trim()

    if (trimmed) {
      router.push(`/blog?search=${encodeURIComponent(trimmed)}`)
    } else {
      router.push('/blog')
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative border-b border-gray-300 pb-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="w-full pr-8 text-sm focus:outline-none placeholder-gray-400 bg-transparent"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
      >
        <FiSearch className="w-4 h-4" />
      </button>
    </form>
  )
}