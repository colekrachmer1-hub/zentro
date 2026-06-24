'use client'

import { useState } from 'react'
import Link from 'next/link'

const CATEGORIES = ['Sales', 'Marketing', 'Research', 'Amazon FBA', 'Recruiting', 'Customer Support', 'Real Estate', 'Productivity', 'Finance', 'Operations']

interface FormData {
  name: string
  category: string
  short_description: string
  full_description: string
  what_it_does: string
  who_its_for: string
  pricing: string
  external_link: string
  creator_name: string
  creator_website: string
  demo_video_url: string
  tags: string
}

const EMPTY: FormData = {
  name: '', category: '', short_description: '', full_description: '',
  what_it_does: '', who_its_for: '', pricing: '', external_link: '',
  creator_name: '', creator_website: '', demo_video_url: '', tags: '',
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function PostAIEmployeePage() {
  const [form, setForm] = useState<FormData>(EMPTY)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const update = (key: keyof FormData, value: string) => setForm(prev => ({ ...prev, [key]: value }))

  const validate = () => {
    if (!form.name.trim()) return 'AI employee name is required.'
    if (!form.category) return 'Category is required.'
    if (!form.short_description.trim()) return 'Short description is required.'
    if (!form.creator_name.trim()) return 'Provider / creator name is required.'
    if (!form.external_link.trim()) return 'Your product link is required.'
    try { new URL(form.external_link) } catch { return 'Product link must be a valid URL.' }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const err = validate()
    if (err) { setErrorMsg(err); setStatus('error'); return }
    setStatus('submitting')
    setErrorMsg('')
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        const data = await res.json()
        setErrorMsg(data.error || 'Submission failed. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[#f3f2f0] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Your AI employee has been submitted for review.</h2>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            We&apos;ll review <strong>{form.name}</strong> within 24 hours. If approved, it goes live on Zentro immediately.
          </p>
          <p className="text-xs text-gray-400 mb-8">Questions? Email <a href="mailto:hello@zentro.ai" className="text-blue-700 hover:underline">hello@zentro.ai</a></p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { setForm(EMPTY); setStatus('idle') }}
              className="w-full py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors text-sm"
            >
              Submit Another AI Employee
            </button>
            <Link href="/jobs" className="w-full py-3 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-center text-sm">
              Browse the Marketplace
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f3f2f0] py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/employers" className="text-xs text-blue-700 hover:underline mb-3 block">← Zentro For Employers</Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Post an AI Employee</h1>
          <p className="text-gray-500 text-sm">Free during our founding creator phase. Goes live within 24 hours of approval.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {/* Progress indicator */}
          <div className="bg-[#f3f2f0] border-b border-gray-200 px-6 py-3 flex items-center gap-2 text-xs font-medium text-gray-500">
            <span className="text-blue-700">1</span>
            <span>AI Employee Details</span>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-4">{errorMsg}</div>
            )}

            {/* Section: Basic info */}
            <div>
              <h2 className="font-semibold text-gray-900 text-sm mb-4 pb-2 border-b border-gray-100">Basic information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">AI Employee Name <span className="text-red-500">*</span></label>
                  <input
                    value={form.name}
                    onChange={e => update('name', e.target.value)}
                    placeholder="e.g. AI Lead Agent, Amazon Product Scout AI, AI SDR"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Category <span className="text-red-500">*</span></label>
                  <select
                    value={form.category}
                    onChange={e => update('category', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Short Description <span className="text-red-500">*</span>
                    <span className="ml-1 font-normal text-gray-400">({form.short_description.length}/120)</span>
                  </label>
                  <textarea
                    value={form.short_description}
                    onChange={e => update('short_description', e.target.value.slice(0, 120))}
                    placeholder="One sentence that tells buyers exactly what this AI employee does."
                    rows={2}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Section: Description */}
            <div>
              <h2 className="font-semibold text-gray-900 text-sm mb-4 pb-2 border-b border-gray-100">Description</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Description</label>
                  <textarea
                    value={form.full_description}
                    onChange={e => update('full_description', e.target.value)}
                    placeholder="Detailed description of your AI employee. What makes it unique? How does it work?"
                    rows={4}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">What It Does <span className="text-gray-400 font-normal">(one task per line)</span></label>
                  <textarea
                    value={form.what_it_does}
                    onChange={e => update('what_it_does', e.target.value)}
                    placeholder={'Finds and qualifies leads automatically\nSends personalized outreach\nBooks meetings directly to your calendar'}
                    rows={4}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Who It&apos;s For</label>
                  <textarea
                    value={form.who_its_for}
                    onChange={e => update('who_its_for', e.target.value)}
                    placeholder="Describe the ideal customer. What type of business? What problem are they solving?"
                    rows={2}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Section: Pricing + Link */}
            <div>
              <h2 className="font-semibold text-gray-900 text-sm mb-4 pb-2 border-b border-gray-100">Pricing &amp; link</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Pricing</label>
                  <input
                    value={form.pricing}
                    onChange={e => update('pricing', e.target.value)}
                    placeholder="$49/month, Free trial, $99 one-time, Contact for pricing"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your Product Link <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    value={form.external_link}
                    onChange={e => update('external_link', e.target.value)}
                    placeholder="https://yourdomain.com/product"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">Buyers go here when they click &ldquo;View AI Employee&rdquo;.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Demo Video URL <span className="text-gray-400 font-normal">(optional)</span></label>
                  <input
                    type="url"
                    value={form.demo_video_url}
                    onChange={e => update('demo_video_url', e.target.value)}
                    placeholder="https://youtube.com/watch?v=... or Loom link"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Section: Provider info */}
            <div>
              <h2 className="font-semibold text-gray-900 text-sm mb-4 pb-2 border-b border-gray-100">Provider information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Provider / Creator Name <span className="text-red-500">*</span></label>
                  <input
                    value={form.creator_name}
                    onChange={e => update('creator_name', e.target.value)}
                    placeholder="Your name or company name"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Provider Website</label>
                  <input
                    type="url"
                    value={form.creator_website}
                    onChange={e => update('creator_website', e.target.value)}
                    placeholder="https://yourcompany.com"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags <span className="text-gray-400 font-normal">(comma-separated)</span></label>
                  <input
                    value={form.tags}
                    onChange={e => update('tags', e.target.value)}
                    placeholder="Sales, Lead Generation, CRM, B2B"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3.5 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 text-sm"
              >
                {status === 'submitting' ? 'Submitting...' : 'Submit AI Employee →'}
              </button>
              <p className="text-xs text-gray-400 text-center mt-3">
                By submitting, you confirm this AI employee is real and your information is accurate.
                We review all submissions before going live.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
