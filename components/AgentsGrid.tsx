'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AIAgent } from '@/lib/mock-agents'

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
]

const INTEGRATION_FILTERS = ['Google Calendar', 'Gmail', 'Slack', 'HubSpot', 'Twilio', 'Stripe', 'Notion']

function StarIcon({ className = 'w-3.5 h-3.5 text-amber-400' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function AgentCard({ agent }: { agent: AIAgent }) {
  return (
    <Link
      href={`/agent/${agent.id}`}
      className="group block bg-white rounded-2xl border border-gray-200 p-5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50/50 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center text-2xl shadow-sm`}>
          {agent.icon}
        </div>
        {agent.badge && (
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            agent.badge === 'Popular' ? 'bg-blue-50 text-blue-600' :
            agent.badge === 'New' ? 'bg-emerald-50 text-emerald-600' :
            agent.badge === 'Featured' ? 'bg-violet-50 text-violet-600' :
            'bg-orange-50 text-orange-600'
          }`}>{agent.badge}</span>
        )}
      </div>

      <div className="mb-1 flex items-center gap-2">
        <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors text-sm">{agent.name}</h3>
      </div>
      <p className="text-xs text-gray-500 mb-1">{agent.category}</p>
      <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">{agent.tagline}</p>

      {/* Integrations */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {agent.integrations.slice(0, 3).map(i => (
          <span key={i} className="text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md">{i}</span>
        ))}
        {agent.integrations.length > 3 && (
          <span className="text-xs text-gray-400 self-center">+{agent.integrations.length - 3}</span>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2.5 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <StarIcon />{agent.rating} <span className="text-gray-300">({agent.reviewCount})</span>
          </span>
          <span>⏱ {agent.setupTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-900">{agent.price}</span>
        </div>
      </div>
    </Link>
  )
}

export default function AgentsGrid({
  agents,
  initialQ,
  initialCategory,
  initialSort,
  categories,
}: {
  agents: AIAgent[]
  initialQ: string
  initialCategory: string
  initialSort: string
  categories: string[]
}) {
  const router = useRouter()
  const [q, setQ] = useState(initialQ)
  const [category, setCategory] = useState(initialCategory)
  const [sort, setSort] = useState(initialSort)
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([])

  const pushParams = useCallback((newQ: string, newCat: string, newSort: string) => {
    const p = new URLSearchParams()
    if (newQ) p.set('q', newQ)
    if (newCat && newCat !== 'All') p.set('category', newCat)
    if (newSort !== 'popular') p.set('sort', newSort)
    router.push(`/agents${p.toString() ? '?' + p.toString() : ''}`)
  }, [router])

  const handleCategory = (cat: string) => {
    setCategory(cat)
    pushParams(q, cat, sort)
  }

  const handleSort = (s: string) => {
    setSort(s)
    pushParams(q, category, s)
  }

  const toggleIntegration = (name: string) => {
    setSelectedIntegrations(prev =>
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    )
  }

  // Client-side integration filter
  const filteredAgents = selectedIntegrations.length > 0
    ? agents.filter(a => selectedIntegrations.every(i => a.integrations.includes(i)))
    : agents

  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-5 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Browse AI Agents</h1>
          <p className="text-gray-400 text-sm">Find and deploy the perfect AI agent for your business</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-8 flex gap-8">

        {/* Sidebar filters */}
        <aside className="w-56 shrink-0 hidden lg:block">
          <div className="sticky top-24 space-y-6">

            {/* Search */}
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">Search</label>
              <form onSubmit={e => { e.preventDefault(); pushParams(q, category, sort) }}>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
                  </svg>
                  <input
                    value={q}
                    onChange={e => setQ(e.target.value)}
                    placeholder="Search agents..."
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all"
                  />
                </div>
              </form>
            </div>

            {/* Category */}
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">Category</label>
              <div className="space-y-0.5">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                      category === cat
                        ? 'bg-indigo-50 text-indigo-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Integrations */}
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">Integrations</label>
              <div className="space-y-1">
                {INTEGRATION_FILTERS.map(name => (
                  <label key={name} className="flex items-center gap-2.5 py-1 cursor-pointer group">
                    <div
                      onClick={() => toggleIntegration(name)}
                      className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors cursor-pointer ${
                        selectedIntegrations.includes(name)
                          ? 'bg-indigo-600 border-indigo-600'
                          : 'border-gray-300 group-hover:border-indigo-300'
                      }`}
                    >
                      {selectedIntegrations.includes(name) && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">{name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price filter placeholder */}
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">Price Range</label>
              <div className="space-y-0.5">
                {['Any price', 'Under $50/mo', '$50–$100/mo', '$100+/mo'].map(p => (
                  <button key={p} className="w-full text-left px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main grid */}
        <div className="flex-1 min-w-0">
          {/* Sort + count bar */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-900">{filteredAgents.length}</span> agent{filteredAgents.length !== 1 ? 's' : ''} found
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Sort by</span>
              <select
                value={sort}
                onChange={e => handleSort(e.target.value)}
                className="text-sm border border-gray-200 rounded-xl px-3 py-1.5 outline-none focus:ring-2 focus:ring-indigo-100 bg-white text-gray-700"
              >
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {/* Mobile category pills */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                  category === cat ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredAgents.length === 0 ? (
            <div className="py-20 text-center">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No agents found</h3>
              <p className="text-sm text-gray-400 mb-6">Try adjusting your filters or search terms.</p>
              <button onClick={() => { setQ(''); setCategory('All'); pushParams('', 'All', sort) }}
                className="text-sm text-indigo-600 hover:underline">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredAgents.map(agent => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
