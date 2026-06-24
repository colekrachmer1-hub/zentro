'use client'

import { useState, useEffect } from 'react'

const ADMIN_PASSWORD = 'zentro2025admin'

type ListingStatus = 'pending_review' | 'approved' | 'rejected'

interface Listing {
  id: string
  name: string
  category: string
  creator_name: string
  status: ListingStatus
  created_at: string
  pricing: string
  short_description: string
}

type TabFilter = 'all' | 'pending_review' | 'approved' | 'rejected'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [authError, setAuthError] = useState('')
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<TabFilter>('all')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

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
    if (authenticated) {
      fetchListings()
    }
  }, [authenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      setAuthError('')
    } else {
      setAuthError('Incorrect password.')
    }
  }

  const updateStatus = async (id: string, status: ListingStatus) => {
    setActionLoading(id + status)
    try {
      const res = await fetch('/api/admin/listings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      if (res.ok) {
        await fetchListings()
      }
    } catch (err) {
      console.error('Failed to update status:', err)
    } finally {
      setActionLoading(null)
    }
  }

  const filteredListings = activeTab === 'all'
    ? listings
    : listings.filter((l) => l.status === activeTab)

  const countFor = (tab: TabFilter) =>
    tab === 'all' ? listings.length : listings.filter((l) => l.status === tab).length

  const statusBadge = (status: ListingStatus) => {
    const map: Record<ListingStatus, string> = {
      pending_review: 'bg-yellow-100 text-yellow-700',
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
    }
    const label: Record<ListingStatus, string> = {
      pending_review: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
    }
    return (
      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${map[status]}`}>
        {label[status]}
      </span>
    )
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
            {authError && (
              <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg p-3">
                {authError}
              </div>
            )}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Zentro Admin</h1>
            <p className="text-sm text-gray-500 mt-1">Review and manage AI employee submissions</p>
          </div>
          <button
            onClick={fetchListings}
            className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
          >
            Refresh
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === tab.key ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
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
            <p className="text-gray-400">No listings found.</p>
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
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Status</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Created</th>
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
                      <td className="px-5 py-4">{statusBadge(listing.status)}</td>
                      <td className="px-5 py-4 text-gray-400 text-xs">
                        {new Date(listing.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          {listing.status !== 'approved' && (
                            <button
                              onClick={() => updateStatus(listing.id, 'approved')}
                              disabled={actionLoading === listing.id + 'approved'}
                              className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                            >
                              {actionLoading === listing.id + 'approved' ? '...' : 'Approve'}
                            </button>
                          )}
                          {listing.status !== 'rejected' && (
                            <button
                              onClick={() => updateStatus(listing.id, 'rejected')}
                              disabled={actionLoading === listing.id + 'rejected'}
                              className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
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
