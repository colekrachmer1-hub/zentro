'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

const CATEGORIES = ['All', 'Sales', 'Marketing', 'Research', 'Amazon FBA', 'Recruiting', 'Real Estate', 'Productivity', 'Support']

interface ExploreFiltersProps {
  selectedCategory: string
  searchQuery: string
}

export default function ExploreFilters({ selectedCategory, searchQuery }: ExploreFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value && value !== 'All') {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`/explore?${params.toString()}`)
    },
    [router, searchParams]
  )

  return (
    <div className="space-y-4 mb-8">
      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="What role are you hiring for?"
          defaultValue={searchQuery}
          onChange={(e) => {
            const val = e.target.value
            const params = new URLSearchParams(searchParams.toString())
            if (val) {
              params.set('q', val)
            } else {
              params.delete('q')
            }
            router.push(`/explore?${params.toString()}`)
          }}
          className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
        />
      </div>

      {/* Category pills + Sort */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = cat === 'All' ? !selectedCategory || selectedCategory === 'All' : selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => updateParam('category', cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Sort */}
        <select
          defaultValue={searchParams.get('sort') || 'popular'}
          onChange={(e) => updateParam('sort', e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shrink-0"
        >
          <option value="popular">Most Popular</option>
          <option value="newest">Newest</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    </div>
  )
}
