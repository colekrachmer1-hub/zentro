'use client'

import { useState } from 'react'
import Link from 'next/link'

const CATEGORIES = ['Sales', 'Marketing', 'Research', 'Amazon FBA', 'Recruiting', 'Customer Support', 'Real Estate', 'Productivity', 'Finance', 'Operations']

interface FormState {
  name: string
  category: string
  provider_name: string
  website: string
  short_description: string
  full_description: string
  pricing: string
  demo_video_url: string
  external_link: string
  tags: string
}

const EMPTY: FormState = {
  name: '',
  category: 'Sales',
  provider_name: '',
  website: '',
  short_description: '',
  full_description: '',
  pricing: '',
  demo_video_url: '',
  external_link: '',
  tags: '',
}

export default function SubmitPage() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          category: form.category,
          creator_name: form.provider_name,
          creator_website: form.website,
          short_description: form.short_description,
          full_description: form.full_description,
          pricing: form.pricing,
          demo_video_url: form.demo_video_url,
          external_link: form.external_link,
          tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
          status: 'pending',
        }),
      })
    } catch {
      // proceed anyway
    }
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-10 max-w-md w-full text-center shadow-sm">
          <div className="text-5xl mb-5">✅</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Submission received</h1>
          <p className="text-gray-500 mb-2">Thank you.</p>
          <p className="text-gray-600 mb-7 text-sm leading-relaxed">
            Your AI employee has been submitted for review. We&apos;ll check it within 24 hours and notify you when it goes live.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/employees" className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors text-sm">
              Browse the Marketplace
            </Link>
            <button onClick={() => { setForm(EMPTY); setSubmitted(false) }} className="text-sm text-gray-400 hover:text-gray-700 transition-colors">
              Submit another
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-2">For Creators</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">List Your AI Employee</h1>
          <p className="text-gray-500 text-sm">Get discovered by businesses actively searching for AI workers. Free to list.</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Basic Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-5">Employee name &amp; category</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Employee name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  value={form.name}
                  onChange={set('name')}
                  placeholder="e.g. AI SDR, AI Lead Agent, Amazon Product Scout AI"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={form.category}
                  onChange={set('category')}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-5">Description</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Short description <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  value={form.short_description}
                  onChange={set('short_description')}
                  placeholder="One sentence — what does your AI employee do?"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={180}
                />
                <p className="text-xs text-gray-400 mt-1">{form.short_description.length}/180</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={6}
                  value={form.full_description}
                  onChange={set('full_description')}
                  placeholder="Describe what your AI employee does, how it works, who it's for, and what results users can expect."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Link */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-5">Pricing &amp; link</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Pricing <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  value={form.pricing}
                  onChange={set('pricing')}
                  placeholder="e.g. $49/month, $99/month, Free tier available"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  External link <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="url"
                  value={form.external_link}
                  onChange={set('external_link')}
                  placeholder="https://yourplatform.com/hire"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-400 mt-1">Where businesses land when they click "Hire Employee".</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Demo video URL</label>
                <input
                  type="url"
                  value={form.demo_video_url}
                  onChange={set('demo_video_url')}
                  placeholder="https://youtube.com/..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Provider Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-5">Provider information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Provider / company name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  value={form.provider_name}
                  onChange={set('provider_name')}
                  placeholder="e.g. Lindy AI, HirePilot, SellerOps"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Website</label>
                <input
                  type="url"
                  value={form.website}
                  onChange={set('website')}
                  placeholder="https://yourwebsite.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags</label>
                <input
                  value={form.tags}
                  onChange={set('tags')}
                  placeholder="e.g. Cold Email, CRM, Lead Generation (comma separated)"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors text-sm disabled:opacity-60"
            >
              {loading ? 'Submitting…' : 'Submit AI Employee'}
            </button>
            <p className="text-xs text-gray-400">Free to list. Reviewed within 24 hours.</p>
          </div>
        </form>
      </div>
    </div>
  )
}
