'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/Logo'

const features = [
  {
    icon: '🤖',
    title: 'Create AI Employees',
    description: 'Spin up AI workers with custom roles, goals, and system prompts in seconds.',
  },
  {
    icon: '⚡',
    title: 'Run Tasks Instantly',
    description: 'Assign work to your AI team and get structured results powered by GPT-4o.',
  },
  {
    icon: '📊',
    title: 'Track Performance',
    description: 'Monitor task completion, costs, and performance scores across your workforce.',
  },
  {
    icon: '🌟',
    title: 'Community Marketplace',
    description: 'Clone proven AI employees built by top-performing teams. Skip the setup.',
  },
  {
    icon: '🌐',
    title: 'Org Chart View',
    description: 'Visualize your AI team hierarchy with an interactive drag-and-drop org chart.',
  },
  {
    icon: '🔒',
    title: 'Secure & Private',
    description: 'Your data is encrypted and isolated. Each workspace is fully private.',
  },
]

function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle')
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/waitlist')
      .then((r) => r.json())
      .then((d) => setCount(d.count + 47)) // seed offset for social proof
      .catch(() => {})
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (data.message === "You're already on the list!") {
        setStatus('duplicate')
      } else if (res.ok) {
        setStatus('success')
        setCount((c) => (c ?? 0) + 1)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 py-2">
        <div className="flex items-center gap-2 text-green-600 font-semibold text-lg">
          <span className="text-2xl">🎉</span> You&apos;re on the list!
        </div>
        <p className="text-gray-500 text-sm">We&apos;ll email you the moment early access opens.</p>
        {count && (
          <p className="text-xs text-gray-400">You&apos;re one of {count.toLocaleString()} people waiting.</p>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent shadow-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap"
        >
          {status === 'loading' ? (
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Joining...
            </span>
          ) : 'Get Early Access →'}
        </button>
      </div>

      {status === 'duplicate' && (
        <p className="text-sm text-brand-600 mt-2 text-center">✓ You&apos;re already on the list — we&apos;ll be in touch!</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-500 mt-2 text-center">Something went wrong. Please try again.</p>
      )}

      {count !== null && status === 'idle' && (
        <p className="text-xs text-gray-400 mt-3 text-center">
          Join <strong>{count.toLocaleString()}</strong> founders already on the waitlist
        </p>
      )}
    </form>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo iconSize={28} />
          <a href="#waitlist" className="btn-primary text-sm">
            Join Waitlist
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-36 pb-28 px-6" id="waitlist">
        <div className="max-w-3xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
            Early Access — Limited Spots
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight leading-tight mb-5">
            Your First AI Employee<br />
            <span className="text-brand-600">Starts Working Today</span>
          </h1>

          <p className="text-xl text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
            Create AI workers, assign tasks, and manage your entire AI workforce in one dashboard. No meetings. No salaries.
          </p>

          {/* Waitlist form */}
          <WaitlistForm />

          {/* Trust signals */}
          <div className="mt-8 flex items-center justify-center gap-6 flex-wrap text-xs text-gray-400">
            <span>✓ Free to join waitlist</span>
            <span>✓ No credit card required</span>
            <span>✓ Founding member pricing locked in</span>
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="max-w-5xl mx-auto mt-20">
          <div className="card overflow-hidden shadow-2xl shadow-gray-200/80">
            <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-gray-400 text-xs ml-2 font-mono">zentro.app/dashboard</span>
            </div>
            <div className="bg-gray-50 p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'AI Employees', value: '6', color: 'text-brand-600' },
                { label: 'Tasks Completed', value: '142', color: 'text-green-600' },
                { label: 'AI Cost (MTD)', value: '$2.40', color: 'text-yellow-600' },
                { label: 'Avg. Score', value: '91%', color: 'text-purple-600' },
              ].map((stat) => (
                <div key={stat.label} className="card p-4">
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 px-6 pb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Aria (SDR)', score: 94, task: 'Drafting outreach email...' },
                { name: 'Max (Research)', score: 88, task: 'Analyzing competitor data...' },
                { name: 'Nova (Support)', score: 96, task: 'Resolving ticket #1042...' },
              ].map((emp) => (
                <div key={emp.name} className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-semibold text-sm">
                        {emp.name[0]}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{emp.name}</span>
                    </div>
                    <span className="badge bg-green-100 text-green-700">● Active</span>
                  </div>
                  <p className="text-xs text-gray-500 italic">{emp.task}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 rounded-full" style={{ width: `${emp.score}%` }} />
                    </div>
                    <span className="text-xs text-gray-500">{emp.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY JOIN EARLY ── */}
      <section className="py-20 px-6 bg-brand-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Why join the waitlist?</h2>
          <p className="text-brand-100 mb-12">Early members get perks that won&apos;t be available at launch.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🔒', title: 'Founding member pricing', desc: 'Lock in $29/mo forever, even when we raise prices at launch.' },
              { icon: '🚀', title: 'First access', desc: 'Skip the line. Get in before we open to the public.' },
              { icon: '🎯', title: 'Shape the product', desc: "Your feedback directly influences what we build next. You're not just a user — you're a co-founder." },
            ].map((p) => (
              <div key={p.title} className="bg-white/10 rounded-xl p-6 text-left border border-white/10">
                <div className="text-3xl mb-3">{p.icon}</div>
                <div className="font-semibold text-white mb-2">{p.title}</div>
                <div className="text-sm text-brand-100">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to manage AI workers</h2>
            <p className="text-gray-500 max-w-xl mx-auto">From hiring to task management, Zentro gives you a complete AI workforce platform.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARKETPLACE SECTION ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-medium mb-4">
              🌟 Community Marketplace
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Hire proven AI employees — built by the community
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Don&apos;t start from scratch. Browse high-performing AI employees built and battle-tested by other Zentro users. Clone them to your team in one click.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { name: 'Outreach Oscar', role: 'SDR', author: 'by @salesteam', score: 97, uses: '2.4k', tag: '🏆 Top Performer', tagColor: 'bg-yellow-100 text-yellow-700', desc: 'Writes personalized cold outreach that converts. Trained on 500+ successful sequences.', roleColor: 'bg-blue-100 text-blue-700' },
              { name: 'Data Diana', role: 'Analyst', author: 'by @growthco', score: 94, uses: '1.8k', tag: '⚡ Most Used', tagColor: 'bg-brand-100 text-brand-700', desc: 'Turns raw data into executive-ready insights. Specializes in SaaS metrics and cohort analysis.', roleColor: 'bg-orange-100 text-orange-700' },
              { name: 'Support Sam', role: 'Support', author: 'by @helpdesk', score: 99, uses: '3.1k', tag: '❤️ Community Fave', tagColor: 'bg-green-100 text-green-700', desc: 'Resolves 94% of tickets without escalation. Empathetic, fast, and always on-brand.', roleColor: 'bg-green-100 text-green-700' },
            ].map((emp) => (
              <div key={emp.name} className="card p-6 hover:shadow-lg hover:border-gray-300 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-lg">
                      {emp.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{emp.name}</div>
                      <div className="text-xs text-gray-400">{emp.author}</div>
                    </div>
                  </div>
                  <span className={`badge text-xs ${emp.roleColor}`}>{emp.role}</span>
                </div>
                <span className={`badge text-xs mb-3 ${emp.tagColor}`}>{emp.tag}</span>
                <p className="text-sm text-gray-500 mb-4">{emp.desc}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 rounded-full" style={{ width: `${emp.score}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-brand-600">{emp.score}%</span>
                  </div>
                  <span className="text-xs text-gray-400">{emp.uses} clones</span>
                </div>
                <button className="btn-secondary w-full justify-center text-sm">+ Clone to My Team</button>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href="#waitlist" className="btn-primary">Join Waitlist to Get Access →</a>
          </div>
        </div>
      </section>

      {/* ── ROLES ── */}
      <section className="py-24 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Built-in AI roles for every team</h2>
          <p className="text-gray-500 mb-12">Choose from specialized roles, each with tailored AI behavior.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { role: 'SDR', icon: '📞', desc: 'Sales Development' },
              { role: 'Research', icon: '🔍', desc: 'Market & Data Research' },
              { role: 'Support', icon: '💬', desc: 'Customer Support' },
              { role: 'Analyst', icon: '📈', desc: 'Data & Reports' },
            ].map((r) => (
              <div key={r.role} className="card p-6 text-center hover:border-brand-300 hover:shadow-md transition-all">
                <div className="text-3xl mb-2">{r.icon}</div>
                <div className="font-semibold text-gray-900">{r.role}</div>
                <div className="text-xs text-gray-500 mt-1">{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple pricing</h2>
          <p className="text-gray-500 mb-12">Lock in founding member pricing by joining the waitlist today.</p>
          <div className="card p-8 max-w-sm mx-auto border-2 border-brand-200">
            <div className="badge bg-brand-100 text-brand-700 mb-4">Founding Member Rate</div>
            <div className="text-4xl font-bold text-gray-900 mb-1">$29<span className="text-lg font-normal text-gray-400">/mo</span></div>
            <p className="text-sm text-gray-500 mb-6">Lock this in now — price increases at public launch.</p>
            <ul className="text-sm text-gray-600 space-y-3 mb-8 text-left">
              {[
                'Unlimited AI employees',
                'GPT-4o powered tasks',
                'Activity logs & analytics',
                'Org chart visualization',
                'Community marketplace access',
                'Priority support',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <a href="#waitlist" className="btn-primary w-full justify-center text-base py-3 block text-center">
              Join Waitlist — Lock In $29/mo
            </a>
            <p className="text-xs text-gray-400 mt-3">Free during beta · No card required</p>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-24 px-6 bg-brand-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to build your AI workforce?</h2>
          <p className="text-brand-100 mb-8">Join the waitlist and be first in line when we launch.</p>
          <div className="max-w-md mx-auto">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Logo iconSize={22} />
          <p className="text-xs text-gray-400">© 2024 Zentro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
