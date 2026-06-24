'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { JobPosting } from '@/lib/mock-job-postings'

const CATEGORIES = ['All', 'Sales', 'Marketing', 'Research', 'Amazon FBA', 'Recruiting', 'Customer Support', 'Real Estate', 'Productivity', 'Finance', 'Operations', 'AI Assistants', 'Lead Generation', 'Content Creation']

function timeAgo(days: number) {
  if (days === 0) return 'Today'
  if (days === 1) return '1 day ago'
  return `${days} days ago`
}

function JobCard({ posting, selected, onClick }: { posting: JobPosting; selected: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`px-5 py-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors
        ${selected ? 'bg-blue-50 border-l-[3px] border-l-blue-700' : 'border-l-[3px] border-l-transparent'}`}
    >
      {/* Role */}
      <h3 className="font-semibold text-blue-700 text-sm mb-0.5 leading-snug hover:underline">{posting.title}</h3>

      {/* Company + industry */}
      <p className="text-sm text-gray-800 mb-1">{posting.company}</p>
      <p className="text-xs text-gray-500 mb-1.5">{posting.industry} · {posting.company_size}</p>

      {/* Location + budget */}
      <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
        <span>{posting.location}</span>
        <span className="text-gray-300">·</span>
        <span className="font-medium text-gray-800">{posting.budget}</span>
      </div>

      {/* Description snippet */}
      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-2">{posting.description}</p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {posting.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{tag}</span>
          ))}
        </div>
        <span className="text-xs text-gray-400 shrink-0">{timeAgo(posting.posted_days_ago)}</span>
      </div>
    </div>
  )
}

function JobDetailPanel({ posting }: { posting: JobPosting }) {
  return (
    <div className="p-8 max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{posting.title}</h1>
        <p className="text-gray-800 font-medium mb-0.5">{posting.company}</p>
        <p className="text-sm text-gray-500 mb-3">{posting.industry} · {posting.company_size}</p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 mb-5">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
            </svg>
            {posting.location}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {posting.budget}
          </span>
          <span className="text-gray-400">{timeAgo(posting.posted_days_ago)}</span>
          {posting.applicants !== undefined && posting.applicants > 0 && (
            <span className="text-gray-400">{posting.applicants} AI employee{posting.applicants !== 1 ? 's' : ''} applied</span>
          )}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mb-5">
          <Link
            href="/post-ai-employee"
            className="px-6 py-2.5 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors text-sm"
          >
            Apply with Your AI Employee
          </Link>
          <button className="px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            Save
          </button>
          <button className="px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
        </div>

        <hr className="border-gray-200" />
      </div>

      {/* Job overview */}
      <div className="mb-6">
        <h2 className="font-bold text-gray-900 mb-3">Job details</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            { label: 'Role type', value: 'AI Employee' },
            { label: 'Department', value: posting.category },
            { label: 'Location', value: posting.location },
            { label: 'Experience needed', value: 'No experience needed' },
            { label: 'Budget', value: posting.budget },
            { label: 'Status', value: posting.status === 'open' ? 'Actively hiring' : 'Filled' },
          ].map(item => (
            <div key={item.label}>
              <p className="text-gray-400 text-xs mb-0.5">{item.label}</p>
              <p className="font-medium text-gray-900">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* Description */}
      <div className="mb-6">
        <h2 className="font-bold text-gray-900 mb-3">About the role</h2>
        <p className="text-sm text-gray-700 leading-relaxed">{posting.description}</p>
      </div>

      {/* Requirements */}
      <div className="mb-6">
        <h2 className="font-bold text-gray-900 mb-3">Requirements</h2>
        <ul className="space-y-2">
          {posting.requirements.map((req, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
              <svg className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {req}
            </li>
          ))}
        </ul>
      </div>

      {/* Preferred */}
      {posting.preferred.length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold text-gray-900 mb-3">Nice to have</h2>
          <ul className="space-y-2">
            {posting.preferred.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                <span className="text-gray-300 mt-0.5 shrink-0 font-bold">○</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {posting.tags.length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold text-gray-900 mb-3">Skills &amp; capabilities needed</h2>
          <div className="flex flex-wrap gap-2">
            {posting.tags.map(tag => (
              <span key={tag} className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      )}

      <hr className="border-gray-200 mb-6" />

      {/* About the company */}
      <div className="mb-6">
        <h2 className="font-bold text-gray-900 mb-2">About {posting.company}</h2>
        <div className="text-sm text-gray-600 space-y-1">
          <p><span className="text-gray-400">Industry:</span> {posting.industry}</p>
          <p><span className="text-gray-400">Company size:</span> {posting.company_size}</p>
        </div>
      </div>

      {/* Apply again */}
      <div className="bg-[#f3f2f0] rounded-lg p-5">
        <p className="font-semibold text-gray-900 text-sm mb-1">Have an AI employee that fits this role?</p>
        <p className="text-xs text-gray-500 mb-3">Submit your AI employee and let {posting.company} know you can fill this role.</p>
        <Link
          href="/post-ai-employee"
          className="inline-block px-5 py-2.5 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors text-sm"
        >
          Apply with Your AI Employee →
        </Link>
      </div>
    </div>
  )
}

export default function JobsView({
  postings,
  initialQ,
  initialCategory,
}: {
  postings: JobPosting[]
  initialQ: string
  initialCategory: string
}) {
  const router = useRouter()
  const [selectedId, setSelectedId] = useState<string>(postings[0]?.id ?? '')
  const [q, setQ] = useState(initialQ)
  const [category, setCategory] = useState(initialCategory)

  const selectedPosting = postings.find(p => p.id === selectedId) ?? postings[0] ?? null

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
            <div className="flex items-center px-4 gap-3">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z" />
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
        {/* Left: job posting cards */}
        <aside className="w-full md:w-[420px] lg:w-[480px] shrink-0 overflow-y-auto bg-white border-r border-gray-200">
          {postings.length === 0 ? (
            <div className="p-10 text-center">
              <div className="text-4xl mb-3">📋</div>
              <p className="font-semibold text-gray-900 mb-1">No job postings found</p>
              <p className="text-sm text-gray-500 mb-4">Try a different search or category.</p>
              <Link href="/post-job" className="text-sm text-blue-700 hover:underline">Post an AI employee job →</Link>
            </div>
          ) : (
            <>
              <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  <span className="font-semibold text-gray-900">{postings.length}</span> AI employee job{postings.length !== 1 ? 's' : ''} available
                </p>
                <Link href="/post-job" className="text-xs text-blue-700 hover:underline font-medium">Post a job →</Link>
              </div>
              {postings.map(posting => (
                <JobCard
                  key={posting.id}
                  posting={posting}
                  selected={selectedId === posting.id}
                  onClick={() => setSelectedId(posting.id)}
                />
              ))}
            </>
          )}
        </aside>

        {/* Right: detail panel */}
        <main className="hidden md:block flex-1 overflow-y-auto bg-white">
          {selectedPosting ? (
            <JobDetailPanel posting={selectedPosting} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p className="text-sm">Select a job to see details</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
