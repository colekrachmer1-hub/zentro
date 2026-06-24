'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Listing } from '@/lib/mock-listings'

const CATEGORIES = ['All', 'Sales', 'Marketing', 'Research', 'Amazon FBA', 'Recruiting', 'Customer Support', 'Real Estate', 'Productivity', 'Finance', 'Operations']

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating)
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <svg key={s} className={`w-3.5 h-3.5 ${s <= full ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  )
}

function JobCard({ listing, selected, onClick }: { listing: Listing; selected: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`px-5 py-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors relative
        ${selected ? 'bg-blue-50 border-l-[3px] border-l-blue-700' : 'border-l-[3px] border-l-transparent'}`}
    >
      {/* Company */}
      <p className="text-xs text-blue-700 font-medium mb-0.5">{listing.creator_name}</p>

      {/* Name */}
      <h3 className="font-semibold text-gray-900 text-sm mb-1 leading-snug">{listing.name}</h3>

      {/* Rating */}
      {listing.rating > 0 && (
        <div className="flex items-center gap-1.5 mb-1.5">
          <Stars rating={listing.rating} />
          <span className="text-xs text-gray-600">{Number(listing.rating).toFixed(1)}</span>
          {listing.review_count > 0 && <span className="text-xs text-gray-400">({listing.review_count})</span>}
        </div>
      )}

      {/* Location + Price */}
      <div className="flex items-center gap-2 mb-2 text-xs text-gray-600">
        <span>Remote · Online</span>
        {listing.pricing && listing.pricing !== 'Contact for pricing' && (
          <>
            <span className="text-gray-300">·</span>
            <span className="font-medium">{listing.pricing}</span>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 mb-2">{listing.short_description}</p>

      {/* Tags */}
      {listing.tags && listing.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {listing.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{tag}</span>
          ))}
        </div>
      )}
    </div>
  )
}

function JobDetailPanel({ listing }: { listing: Listing }) {
  const whatItDoes = listing.what_it_does
    ? listing.what_it_does.split('\n').filter(Boolean)
    : []

  return (
    <div className="p-8 max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{listing.name}</h1>
        <p className="text-blue-700 font-medium text-sm mb-2">{listing.creator_name}</p>

        {listing.rating > 0 && (
          <div className="flex items-center gap-1.5 mb-3">
            <Stars rating={listing.rating} />
            <span className="text-sm text-gray-700 font-medium">{Number(listing.rating).toFixed(1)}</span>
            {listing.review_count > 0 && (
              <span className="text-sm text-blue-700 hover:underline cursor-pointer">{listing.review_count} reviews</span>
            )}
          </div>
        )}

        <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
          <span>Remote · Online</span>
          {listing.pricing && <><span className="text-gray-300">·</span><span className="font-medium">{listing.pricing}</span></>}
        </div>

        {/* Primary CTA */}
        {listing.external_link && (
          <a
            href={listing.external_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors text-sm mb-3"
          >
            View AI Employee
          </a>
        )}

        {/* Secondary actions */}
        <div className="flex items-center gap-4 text-sm text-blue-700 mb-5">
          <button className="flex items-center gap-1.5 hover:underline">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            Save
          </button>
          <button className="flex items-center gap-1.5 hover:underline">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            Not interested
          </button>
          <button className="flex items-center gap-1.5 hover:underline">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
        </div>

        <hr className="border-gray-200" />
      </div>

      {/* Job details */}
      <div className="mb-6">
        <h2 className="font-bold text-gray-900 mb-3">Job details</h2>
        <div className="space-y-2 text-sm">
          <div className="flex gap-3">
            <span className="text-gray-500 w-32 shrink-0">Role</span>
            <span className="text-gray-900 font-medium">{listing.category}</span>
          </div>
          <div className="flex gap-3">
            <span className="text-gray-500 w-32 shrink-0">Job type</span>
            <span className="text-gray-900 font-medium">AI Employee</span>
          </div>
          <div className="flex gap-3">
            <span className="text-gray-500 w-32 shrink-0">Remote</span>
            <span className="text-gray-900 font-medium">Yes — works online</span>
          </div>
          <div className="flex gap-3">
            <span className="text-gray-500 w-32 shrink-0">Experience needed</span>
            <span className="text-gray-900 font-medium">No experience needed</span>
          </div>
          {listing.pricing && (
            <div className="flex gap-3">
              <span className="text-gray-500 w-32 shrink-0">Price</span>
              <span className="text-gray-900 font-medium">{listing.pricing}</span>
            </div>
          )}
        </div>
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* Full description */}
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
          <ul className="space-y-1.5">
            {whatItDoes.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-blue-700 mt-0.5 shrink-0">•</span>
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

      {/* Tags/Skills */}
      {listing.tags && listing.tags.length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold text-gray-900 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {listing.tags.map(tag => (
              <span key={tag} className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      )}

      <hr className="border-gray-200 mb-6" />

      {/* View full listing */}
      <Link
        href={`/employee/${listing.id}`}
        className="text-blue-700 text-sm hover:underline font-medium"
      >
        View full listing →
      </Link>
    </div>
  )
}

export default function JobsView({
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
  const [category, setCategory] = useState(initialCategory)

  const selectedListing = listings.find(l => l.id === selectedId) ?? listings[0] ?? null

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (category && category !== 'All') params.set('category', category)
    router.push(`/jobs?${params.toString()}`)
  }, [q, category, router])

  const handleCategoryClick = useCallback((cat: string) => {
    setCategory(cat)
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (cat && cat !== 'All') params.set('category', cat)
    router.push(`/jobs?${params.toString()}`)
  }, [q, router])

  return (
    <div className="flex flex-col bg-[#f3f2f0]" style={{ minHeight: 'calc(100vh - 56px)' }}>
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
                placeholder="AI role, skill, or company"
                className="flex-1 py-2.5 outline-none text-sm text-gray-900 bg-transparent"
              />
            </div>
            <div className="flex items-center px-4 gap-3 min-w-0">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span className="text-sm text-gray-500 py-2.5">Remote / Online</span>
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
              onClick={() => handleCategoryClick(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors
                ${(category || 'All') === cat || (!category && cat === 'All')
                  ? 'bg-blue-700 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-400'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Split layout */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full overflow-hidden" style={{ height: 'calc(100vh - 56px - 60px - 48px)' }}>
        {/* Left: card list */}
        <aside className="w-full md:w-[420px] lg:w-[480px] shrink-0 overflow-y-auto bg-white border-r border-gray-200">
          {listings.length === 0 ? (
            <div className="p-10 text-center">
              <div className="text-4xl mb-3">🤖</div>
              <p className="font-semibold text-gray-900 mb-1">No AI employees found</p>
              <p className="text-sm text-gray-500">Try a different search or category.</p>
            </div>
          ) : (
            <>
              <p className="px-5 py-3 text-xs text-gray-500 border-b border-gray-100">
                <span className="font-semibold text-gray-900">{listings.length}</span> AI employee{listings.length !== 1 ? 's' : ''} found
              </p>
              {listings.map(listing => (
                <JobCard
                  key={listing.id}
                  listing={listing}
                  selected={selectedId === listing.id}
                  onClick={() => setSelectedId(listing.id)}
                />
              ))}
            </>
          )}
        </aside>

        {/* Right: detail panel */}
        <main className="hidden md:block flex-1 overflow-y-auto bg-white">
          {selectedListing ? (
            <JobDetailPanel listing={selectedListing} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p className="text-sm">Select an AI employee to see details</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
