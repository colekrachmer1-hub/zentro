'use client'

import { useState } from 'react'
import Link from 'next/link'

const CATEGORIES = ['Sales', 'Marketing', 'Research', 'Amazon FBA', 'Recruiting', 'Customer Support', 'Real Estate', 'Productivity', 'Finance', 'Operations', 'AI Assistants', 'Lead Generation', 'Content Creation']

interface FormState {
  title: string
  company: string
  industry: string
  company_size: string
  category: string
  budget: string
  description: string
  requirements: string
  preferred: string
  tags: string
  contact_email: string
}

const EMPTY: FormState = {
  title: '',
  company: '',
  industry: '',
  company_size: '',
  category: 'Sales',
  budget: '',
  description: '',
  requirements: '',
  preferred: '',
  tags: '',
  contact_email: '',
}

export default function PostJobPage() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // In a real app, POST to /api/jobs or Supabase
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f3f2f0] flex items-center justify-center px-4">
        <div className="bg-white rounded-xl border border-gray-200 p-10 max-w-md w-full text-center">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Job posted!</h1>
          <p className="text-gray-600 mb-6">
            Your AI employee job posting is live. AI creators will be able to apply with their AI employees.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/jobs" className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors text-sm">
              Browse AI Employee Jobs
            </Link>
            <button onClick={() => { setForm(EMPTY); setSubmitted(false) }} className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
              Post another job
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f3f2f0]">
      {/* Hero */}
      <div className="bg-blue-700 text-white py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-blue-300 text-sm font-medium mb-2">For Businesses</p>
          <h1 className="text-3xl font-bold mb-2">Post an AI Employee Job</h1>
          <p className="text-blue-100 text-base">Tell AI creators what you need. They'll apply with the perfect AI employee for your business.</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Company info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-5 text-lg">Company information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Company name <span className="text-red-500">*</span></label>
                <input
                  required
                  value={form.company}
                  onChange={set('company')}
                  placeholder="Acme Corp"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Industry <span className="text-red-500">*</span></label>
                  <input
                    required
                    value={form.industry}
                    onChange={set('industry')}
                    placeholder="B2B SaaS, E-commerce…"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Company size</label>
                  <select
                    value={form.company_size}
                    onChange={set('company_size')}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Select…</option>
                    <option>1 employee (just me)</option>
                    <option>2–10 employees</option>
                    <option>11–50 employees</option>
                    <option>51–200 employees</option>
                    <option>201–1,000 employees</option>
                    <option>1,000+ employees</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact email <span className="text-red-500">*</span></label>
                <input
                  required
                  type="email"
                  value={form.contact_email}
                  onChange={set('contact_email')}
                  placeholder="you@yourcompany.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-400 mt-1">AI creators will reach out here to apply.</p>
              </div>
            </div>
          </div>

          {/* Role info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-5 text-lg">AI employee role</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Job title <span className="text-red-500">*</span></label>
                <input
                  required
                  value={form.title}
                  onChange={set('title')}
                  placeholder="e.g. AI Sales Development Representative"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Category <span className="text-red-500">*</span></label>
                  <select
                    required
                    value={form.category}
                    onChange={set('category')}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Monthly budget <span className="text-red-500">*</span></label>
                  <input
                    required
                    value={form.budget}
                    onChange={set('budget')}
                    placeholder="e.g. $100–300/month"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-5 text-lg">Description &amp; requirements</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">About the role <span className="text-red-500">*</span></label>
                <textarea
                  required
                  rows={5}
                  value={form.description}
                  onChange={set('description')}
                  placeholder="Describe what your business does, what you need this AI employee to accomplish, and what success looks like. Be specific — AI creators will use this to decide if their product is a fit."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Requirements</label>
                <textarea
                  rows={4}
                  value={form.requirements}
                  onChange={set('requirements')}
                  placeholder="List what the AI must be able to do. One per line. e.g.:&#10;Find and qualify leads from LinkedIn&#10;Write personalized cold emails&#10;Integrate with HubSpot"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <p className="text-xs text-gray-400 mt-1">One requirement per line.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nice to have</label>
                <textarea
                  rows={3}
                  value={form.preferred}
                  onChange={set('preferred')}
                  placeholder="Optional but preferred capabilities. One per line."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags / skills</label>
                <input
                  value={form.tags}
                  onChange={set('tags')}
                  placeholder="e.g. Cold Email, CRM, Lead Gen (comma separated)"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors text-sm disabled:opacity-60"
            >
              {loading ? 'Posting…' : 'Post AI Employee Job'}
            </button>
            <p className="text-xs text-gray-400">Free to post. AI creators apply to you.</p>
          </div>
        </form>
      </div>
    </div>
  )
}
