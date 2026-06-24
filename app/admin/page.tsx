'use client'

import { useState, useEffect } from 'react'

const ADMIN_PASSWORD = 'zentro2025admin'

const CATEGORIES = ['Sales', 'Marketing', 'Research', 'Amazon FBA', 'Recruiting', 'Real Estate', 'Productivity', 'Support']

type ListingStatus = 'pending_review' | 'approved' | 'rejected'
type TabFilter = 'all' | 'pending_review' | 'approved' | 'rejected'

interface Listing {
  id: string
  name: string
  category: string
  creator_name: string
  status: ListingStatus
  created_at: string
  pricing: string
  short_description: string
  external_link: string
}

const emptyForm = {
  name: '', category: 'Sales', short_description: '', full_description: '',
  what_it_does: '', who_its_for: '', pricing: '', external_link: '',
  creator_name: '', creator_website: '', demo_video_url: '', tags: '',
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [authError, setAuthError] = useState('')
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<TabFilter>('all')
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [addStatus, setAddStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [addError, setAddError] = useState('')

  const fetchListings = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/listings')
      if (res.ok) {
        const data = await res.json()
        setListings(data.listings || [])
      }
    } catch (err) {
      console.error('Failed to fetch listings:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (authenticated) fetchListings()
  }, [authenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) { setAuthenticated(true); setAuthError('') }
    else setAuthError('Incorrect password.')
  }

  const updateStatus = async (id: string, status: ListingStatus) => {
    setActionLoading(id + status)
    try {
      const res = await fetch('/api/admin/listings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      if (res.ok) await fetchListings()
    } catch (err) {
      console.error('Failed to update status:', err)
    } finally {
      setActionLoading(null)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.category || !form.short_description || !form.creator_name || !form.external_link) {
      setAddError('Name, category, short description, creator name, and external link are required.')
      return
    }
    setAddStatus('saving')
    setAddError('')
    try {
      const res = await fetch('/api/admin/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setAddError(data.error || 'Failed to add.'); setAddStatus('error'); return }
      setAddStatus('saved')
      setForm(emptyForm)
      setShowAddForm(false)
      await fetchListings()
      setAddStatus('idle')
    } catch {
      setAddError('Something went wrong.')
      setAddStatus('error')
    }
  }

  const filteredListings = activeTab === 'all' ? listings : listings.filter((l) => l.status === activeTab)
  const countFor = (tab: TabFilter) => tab === 'all' ? listings.length : listings.filter((l) => l.status === tab).length

  const statusBadge = (status: ListingStatus) => {
    const styles: Record<ListingStatus, string> = {
      pending_review: 'bg-yellow-100 text-yellow-700',
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
    }
    const labels: Record<ListingStatus, string> = { pending_review: 'Pending', approved: 'Approved', rejected: 'Rejected' }
    return <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles[status]}`}>{labels[status]}</span>
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-sm w-full bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Admin Access</h1>
            <p className="text-sm text-gray-500">Enter the admin password to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            {authError && <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg p-3">{authError}</div>}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
              Sign In
            </button>
          </form>
        </div>
      </div>
    )
  }

  const TABS: { key: TabFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'pending_review', label: 'Pending Review' },
    { key: 'approved', label: 'Approved' },
    { key: 'rejected', label: 'Rejected' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Zentro Admin</h1>
            <p className="text-sm text-gray-500 mt-1">Manage AI employee listings</p>
          </div>
          <div className="flex gap-3">
            <button onClick={fetchListings} className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">
              Refresh
            </button>
            <button
              onClick={() => { setShowAddForm(!showAddForm); setAddError(''); setAddStatus('idle') }}
              className="px-4 py-2 text-sm bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showAddForm ? '✕ Cancel' : '+ Add Listing'}
            </button>
          </div>
        </div>

        {/* Add Listing Form */}
        {showAddForm && (
          <form onSubmit={handleAdd} className="bg-white border border-gray-100 rounded-2xl p-6 mb-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Add New Listing <span className="text-sm font-normal text-green-600 ml-2">→ Goes live immediately</span></h2>
            {addError && <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg">{addError}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Amazon Product Scout AI" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description * <span className="text-gray-400 font-normal">(shown on cards)</span></label>
                <input value={form.short_description} onChange={e => setForm(f => ({ ...f, short_description: e.target.value }))} placeholder="One-line description of what this AI employee does" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
                <textarea value={form.full_description} onChange={e => setForm(f => ({ ...f, full_description: e.target.value }))} rows={3} placeholder="Detailed description shown on the listing page" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">What It Does <span className="text-gray-400 font-normal">(one task per line)</span></label>
                <textarea value={form.what_it_does} onChange={e => setForm(f => ({ ...f, what_it_does: e.target.value }))} rows={4} placeholder={"Finds profitable products daily\nCalculates margins and competition\nDelivers ranked opportunity list"} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Who It&apos;s For</label>
                <input value={form.who_its_for} onChange={e => setForm(f => ({ ...f, who_its_for: e.target.value }))} placeholder="e.g. Amazon FBA sellers, e-commerce entrepreneurs" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pricing</label>
                <input value={form.pricing} onChange={e => setForm(f => ({ ...f, pricing: e.target.value }))} placeholder="e.g. $49/mo, Free, $99 one-time" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">External Link * <span className="text-gray-400 font-normal">(the "Hire" button goes here)</span></label>
                <input value={form.external_link} onChange={e => setForm(f => ({ ...f, external_link: e.target.value }))} placeholder="https://..." type="url" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Creator Name *</label>
                <input value={form.creator_name} onChange={e => setForm(f => ({ ...f, creator_name: e.target.value }))} placeholder="e.g. SellerOps AI" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Creator Website</label>
                <input value={form.creator_website} onChange={e => setForm(f => ({ ...f, creator_website: e.target.value }))} placeholder="https://..." type="url" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Demo Video URL <span className="text-gray-400 font-normal">(optional)</span></label>
                <input value={form.demo_video_url} onChange={e => setForm(f => ({ ...f, demo_video_url: e.target.value }))} placeholder="https://youtube.com/..." type="url" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags <span className="text-gray-400 font-normal">(comma-separated)</span></label>
                <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="Amazon, FBA, Product Research" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-100">
              <button type="submit" disabled={addStatus === 'saving'} className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60">
                {addStatus === 'saving' ? 'Adding...' : 'Add Listing →'}
              </button>
              <span className="text-xs text-gray-400">Saves directly as Approved and goes live immediately</span>
            </div>
          </form>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.key ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.key ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {countFor(tab.key)}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-16 text-gray-400">Loading listings...</div>
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-400 mb-3">No listings yet.</p>
            <button onClick={() => setShowAddForm(true)} className="text-sm text-blue-600 hover:underline">Add your first listing →</button>
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Name</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Category</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Creator</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Link</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Status</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredListings.map((listing) => (
                    <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-semibold text-gray-900">{listing.name}</div>
                        <div className="text-xs text-gray-400 mt-0.5 max-w-xs truncate">{listing.short_description}</div>
                      </td>
                      <td className="px-5 py-4 text-gray-600">{listing.category}</td>
                      <td className="px-5 py-4 text-gray-600">{listing.creator_name}</td>
                      <td className="px-5 py-4">
                        {listing.external_link && (
                          <a href={listing.external_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs truncate block max-w-[140px]">
                            {listing.external_link.replace(/^https?:\/\//, '')}
                          </a>
                        )}
                      </td>
                      <td className="px-5 py-4">{statusBadge(listing.status)}</td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          {listing.status !== 'approved' && (
                            <button onClick={() => updateStatus(listing.id, 'approved')} disabled={actionLoading === listing.id + 'approved'} className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 disabled:opacity-50">
                              {actionLoading === listing.id + 'approved' ? '...' : 'Approve'}
                            </button>
                          )}
                          {listing.status !== 'rejected' && (
                            <button onClick={() => updateStatus(listing.id, 'rejected')} disabled={actionLoading === listing.id + 'rejected'} className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 disabled:opacity-50">
                              {actionLoading === listing.id + 'rejected' ? '...' : 'Reject'}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
