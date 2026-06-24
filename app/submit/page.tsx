'use client'

import { useState } from 'react'

const CATEGORIES = ['Sales', 'Marketing', 'Research', 'Amazon FBA', 'Recruiting', 'Real Estate', 'Productivity', 'Support']

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

const INITIAL_FORM: FormData = {
  name: '',
  category: '',
  short_description: '',
  full_description: '',
  what_it_does: '',
  who_its_for: '',
  pricing: '',
  external_link: '',
  creator_name: '',
  creator_website: '',
  demo_video_url: '',
  tags: '',
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function SubmitPage() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const update = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const validate = () => {
    if (!form.name.trim()) return 'Employee name is required.'
    if (!form.category) return 'Category is required.'
    if (!form.short_description.trim()) return 'Short description is required.'
    if (!form.creator_name.trim()) return 'Creator name is required.'
    if (!form.external_link.trim()) return 'External link is required.'
    try {
      new URL(form.external_link)
    } catch {
      return 'External link must be a valid URL (e.g. https://yoursite.com).'
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationError = validate()
    if (validationError) {
      setErrorMsg(validationError)
      setStatus('error')
      return
    }

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white border border-gray-100 rounded-2xl p-10 text-center shadow-sm">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Submitted for Review!</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Thanks for submitting <strong>{form.name}</strong> to Zentro. Our team will review your listing within <strong>24 hours</strong> and notify you once it&apos;s live.
          </p>
          <p className="text-sm text-gray-400 mb-8">
            Questions? Reach out to <a href="mailto:hello@zentro.ai" className="text-blue-600 hover:underline">hello@zentro.ai</a>
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { setForm(INITIAL_FORM); setStatus('idle') }}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              Submit Another Employee
            </button>
            <a
              href="/explore"
              className="w-full py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-center"
            >
              Browse the Marketplace
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Submit Your AI Employee</h1>
          <p className="text-gray-500">
            List your AI employee on Zentro. Free during our launch phase. Goes live within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm space-y-6">
          {/* Error message */}
          {status === 'error' && (
            <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl p-4">
              {errorMsg}
            </div>
          )}

          {/* Employee Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Employee Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="e.g. SalesBot Pro, ContentGenius, FBA Scout AI"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={form.category}
              onChange={(e) => update('category', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Short Description <span className="text-red-500">*</span>
              <span className="ml-2 font-normal text-gray-400">({form.short_description.length}/120)</span>
            </label>
            <textarea
              value={form.short_description}
              onChange={(e) => update('short_description', e.target.value.slice(0, 120))}
              placeholder="One-sentence summary that appears on the listing card. Be specific about what it does."
              rows={2}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Full Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Description
            </label>
            <textarea
              value={form.full_description}
              onChange={(e) => update('full_description', e.target.value)}
              placeholder="Detailed description of your AI employee. What makes it unique? How does it work?"
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* What It Does */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              What It Does
            </label>
            <textarea
              value={form.what_it_does}
              onChange={(e) => update('what_it_does', e.target.value)}
              placeholder="List the key tasks this AI employee performs, one per line. e.g.&#10;Researches and qualifies prospects&#10;Writes personalized cold emails&#10;Books meetings automatically"
              rows={5}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Who It's For */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Who It&apos;s For
            </label>
            <textarea
              value={form.who_its_for}
              onChange={(e) => update('who_its_for', e.target.value)}
              placeholder="Describe the ideal customer. What type of business? What size? What problem are they solving?"
              rows={2}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Pricing */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Pricing
            </label>
            <input
              type="text"
              value={form.pricing}
              onChange={(e) => update('pricing', e.target.value)}
              placeholder="$49/mo, $199/mo, Free trial, Contact for pricing"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* External Link */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Signup / Sales Page URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={form.external_link}
              onChange={(e) => update('external_link', e.target.value)}
              placeholder="https://yourdomain.com/product"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-400 mt-1">Buyers will be sent here when they click &ldquo;Hire Employee&rdquo;.</p>
          </div>

          {/* Creator Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Creator / Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.creator_name}
              onChange={(e) => update('creator_name', e.target.value)}
              placeholder="Your name or company name"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Creator Website */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Creator Website
            </label>
            <input
              type="url"
              value={form.creator_website}
              onChange={(e) => update('creator_website', e.target.value)}
              placeholder="https://yourcompany.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Demo Video */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Demo Video URL <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="url"
              value={form.demo_video_url}
              onChange={(e) => update('demo_video_url', e.target.value)}
              placeholder="https://youtube.com/watch?v=... or https://loom.com/..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tags <span className="text-gray-400 font-normal">(comma-separated)</span>
            </label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => update('tags', e.target.value)}
              placeholder="Sales, Cold Email, B2B, Outreach"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Submitting...' : 'Submit for Review →'}
          </button>

          <p className="text-xs text-gray-400 text-center">
            By submitting, you confirm this AI employee is real and the information is accurate. We review all submissions before they go live.
          </p>
        </form>
      </div>
    </div>
  )
}
