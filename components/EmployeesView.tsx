'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Listing } from '@/lib/mock-listings'

const CATEGORIES = ['All', 'Sales', 'Marketing', 'Research', 'Amazon FBA', 'Recruiting', 'Customer Support', 'Real Estate', 'Productivity', 'Finance', 'Operations']

function Stars({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const full = Math.round(rating)
  const sz = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <svg key={s} className={`${sz} ${s <= full ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  )
}

function EmployeeCard({ listing, selected, onClick }: { listing: Listing; selected: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`px-5 py-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors
        ${selected ? 'bg-blue-50 border-l-[3px] border-l-blue-700' : 'border-l-[3px] border-l-transparent'}`}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="font-semibold text-blue-700 text-sm leading-snug hover:underline flex-1">{listing.name}</h3>
        <svg className="w-5 h-5 text-gray-200 hover:text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      </div>

      <p className="text-sm text-gray-700 mb-1">{listing.creator_name}</p>

      <div className="flex items-center gap-1.5 mb-2">
        <Stars rating={listing.rating} />
        <span className="text-xs font-semibold text-gray-700">{listing.rating}</span>
        <span className="text-xs text-blue-700">({listing.review_count})</span>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
        <span className="bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded font-medium">Remote</span>
        <span className="text-gray-300">·</span>
        <span className="font-semibold text-gray-800">{listing.pricing}</span>
      </div>

      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-2">{listing.short_description}</p>

      <div className="flex flex-wrap gap-1">
        {listing.tags.slice(0, 3).map(tag => (
          <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{tag}</span>
        ))}
      </div>
    </div>
  )
}

function EmployeeDetailPanel({ listing }: { listing: Listing }) {
  const whatItDoes = listing.what_it_does ? listing.what_it_does.split('\n').filter(Boolean) : []
  const skills = listing.skills || listing.tags || []

  return (
    <div className="p-8 max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{listing.name}</h1>
        <p className="text-blue-700 font-semibold text-sm mb-1">{listing.creator_name}</p>

        <div className="flex items-center gap-2 mb-4">
          <Stars rating={listing.rating} size="md" />
          <span className="text-sm font-bold text-gray-800">{listing.rating}</span>
          <span className="text-sm text-blue-700">{listing.review_count} reviews</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 mb-5">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            Remote · Online
          </span>
          <span className="text-gray-400">·</span>
          <span className="font-bold text-gray-900">{listing.pricing}</span>
          <span className="text-gray-400">·</span>
          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{listing.category}</span>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mb-5">
          {listing.external_link && (
            <a
              href={listing.external_link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors text-sm"
            >
              Hire Employee
            </a>
          )}
          <Link
            href={`/employee/${listing.id}`}
            className="px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            View Full Profile
          </Link>
          <button className="px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            Save
          </button>
        </div>
        <hr className="border-gray-200" />
      </div>

      {/* Job details */}
      <div className="mb-6">
        <h2 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide text-gray-500">Position details</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            { label: 'Role', value: listing.category },
            { label: 'Type', value: 'AI Employee' },
            { label: 'Location', value: 'Remote · Online' },
            { label: 'Experience required', value: 'None' },
            { label: 'Price', value: listing.pricing },
            { label: 'Provider', value: listing.creator_name },
          ].map(item => (
            <div key={item.label}>
              <p className="text-gray-400 text-xs mb-0.5">{item.label}</p>
              <p className="font-semibold text-gray-900">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* About */}
      {listing.full_description && (
        <div className="mb-6">
          <h2 className="font-bold text-gray-900 mb-3">About this AI employee</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{listing.full_description}</p>
        </div>
      )}

      {/* What it does */}
      {whatItDoes.length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold text-gray-900 mb-3">What it does</h2>
          <ul className="space-y-2">
            {whatItDoes.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                <svg className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Who it's for */}
      {listing.who_its_for && (
        <div className="mb-6">
          <h2 className="font-bold text-gray-900 mb-3">Who it&apos;s for</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{listing.who_its_for}</p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold text-gray-900 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s: string) => (
              <span key={s} className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full">{s}</span>
            ))}
          </div>
        </div>
      )}

      <hr className="border-gray-200 mb-6" />

      <div className="bg-gray-50 rounded-lg p-5">
        <p className="font-semibold text-gray-900 text-sm mb-1">Ready to hire {listing.name}?</p>
        <p className="text-xs text-gray-500 mb-3">You'll be taken to {listing.creator_name}'s platform to get started.</p>
        {listing.external_link && (
          <a
            href={listing.external_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2.5 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors text-sm"
          >
            Hire Employee →
          </a>
        )}
      </div>
    </div>
  )
}

export default function EmployeesView({
  listings,
  initialQ,
  initialCategory,
}: {
  listings: Listing[]
  initialQ: string
  initialCategory: string
}) {
  const router = useRouter()
  const [selectedId, setSelectedId] = useState<string>(listings[0]?.id ?? '')
  const [q, setQ] = useState(initialQ)
  const [category, setCategory] = useState(initialCategory || 'All')

  const selected = listings.find(l => l.id === selectedId) ?? listings[0] ?? null

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (category && category !== 'All') params.set('category', category)
    router.push(`/employees?${params.toString()}`)
  }, [q, category, router])

  const handleCategory = useCallback((cat: string) => {
    setCategory(cat)
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (cat !== 'All') params.set('category', cat)
    router.push(`/employees?${params.toString()}`)
  }, [q, router])

  return (
    <div className="flex flex-col bg-gray-50" style={{ minHeight: 'calc(100vh - 56px)' }}>
      {/* Search bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 shrink-0">
        <form onSubmit={handleSearch} className="max-w-5xl mx-auto flex gap-2">
          <div className="flex flex-1 bg-white border border-gray-300 rounded-lg overflow-hidden">
            <div className="flex items-center flex-1 px-4 gap-3 border-r border-gray-200">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
              </svg>
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="AI role, skill, or provider"
                className="flex-1 py-2.5 outline-none text-sm text-gray-900 bg-transparent"
              />
            </div>
            <div className="flex items-center px-4 gap-2">
              <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span className="text-sm text-gray-400 py-2.5 whitespace-nowrap">Remote / Online</span>
            </div>
          </div>
          <button type="submit" className="px-6 py-2.5 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors text-sm shrink-0">
            Search
          </button>
        </form>
      </div>

      {/* Category pills */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 shrink-0 overflow-x-auto">
        <div className="flex gap-2 max-w-5xl mx-auto">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors
                ${category === cat || (!category && cat === 'All')
                  ? 'bg-blue-700 text-white'
                  : 'bg-white border border-gray-300 text-gray-600 hover:border-blue-400'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Split layout */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full overflow-hidden" style={{ height: 'calc(100vh - 56px - 60px - 48px)' }}>
        {/* Left */}
        <aside className="w-full md:w-[420px] lg:w-[480px] shrink-0 overflow-y-auto bg-white border-r border-gray-200">
          {listings.length === 0 ? (
            <div className="p-10 text-center">
              <div className="text-4xl mb-3">🤖</div>
              <p className="font-semibold text-gray-900 mb-1">No employees found</p>
              <p className="text-sm text-gray-500 mb-4">Try a different search or category.</p>
              <Link href="/employees" className="text-sm text-blue-700 hover:underline">Browse all AI employees</Link>
            </div>
          ) : (
            <>
              <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  <span className="font-semibold text-gray-900">{listings.length}</span> AI employee{listings.length !== 1 ? 's' : ''} available
                </p>
                <Link href="/submit" className="text-xs text-blue-700 hover:underline font-medium">List your AI employee →</Link>
              </div>
              {listings.map(l => (
                <EmployeeCard
                  key={l.id}
                  listing={l}
                  selected={selectedId === l.id}
                  onClick={() => setSelectedId(l.id)}
                />
              ))}
            </>
          )}
        </aside>

        {/* Right */}
        <main className="hidden md:block flex-1 overflow-y-auto bg-white">
          {selected ? (
            <EmployeeDetailPanel listing={selected} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              Select an AI employee to see details
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
