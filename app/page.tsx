'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/Logo'

function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

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
      if (data.message === 'success') {
        setStatus('success')
        setMessage("You're on the list. We'll be in touch.")
        setEmail('')
      } else if (data.message?.includes('already')) {
        setStatus('success')
        setMessage("You're already on the list!")
      } else {
        throw new Error()
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className={`flex items-center gap-2 text-emerald-600 font-medium ${compact ? 'text-sm' : 'text-base'}`}>
        <span>✓</span> {message}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${compact ? 'flex-row' : 'flex-col sm:flex-row'} w-full`}>
      <input
        type="email"
        placeholder="Enter your work email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={`flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent ${compact ? 'min-w-0' : ''}`}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors whitespace-nowrap disabled:opacity-60"
      >
        {status === 'loading' ? '...' : 'Join Waitlist'}
      </button>
      {status === 'error' && <p className="text-red-500 text-xs mt-1 w-full">{message}</p>}
    </form>
  )
}

const aiTools = ['ChatGPT', 'Claude', 'Perplexity', 'Lindy', 'Make', 'Zapier', 'Cursor', 'ElevenLabs', 'Jasper', 'Midjourney', 'Notion AI', 'Copilot']

const departments = [
  {
    name: 'Sales',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    workers: [
      { name: 'SDR AI', status: 'active', task: 'Generating leads...' },
      { name: 'Follow-Up AI', status: 'active', task: 'Sending sequences...' },
    ],
  },
  {
    name: 'Marketing',
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    workers: [
      { name: 'Content AI', status: 'active', task: 'Writing blog post...' },
      { name: 'Research AI', status: 'active', task: 'Analyzing trends...' },
    ],
  },
  {
    name: 'Operations',
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    workers: [
      { name: 'Executive Assistant AI', status: 'active', task: 'Preparing summary...' },
    ],
  },
]

const activityItems = [
  { worker: 'SDR AI', action: 'Generated 50 qualified leads', time: '2m ago', dot: 'bg-blue-500' },
  { worker: 'Research AI', action: 'Completed competitor report', time: '8m ago', dot: 'bg-purple-500' },
  { worker: 'Content AI', action: 'Created 10 content ideas', time: '14m ago', dot: 'bg-purple-500' },
  { worker: 'Executive Assistant AI', action: 'Prepared weekly summary', time: '31m ago', dot: 'bg-emerald-500' },
  { worker: 'Follow-Up AI', action: 'Sent 24 follow-up emails', time: '1h ago', dot: 'bg-blue-500' },
]

const marketplaceWorkers = [
  { name: 'Amazon Arbitrage AI', desc: 'Finds profitable products and monitors price drops 24/7.', icon: '📦' },
  { name: 'Elite SDR AI', desc: 'Books meetings on autopilot using proven cold outreach sequences.', icon: '📞' },
  { name: 'Recruiter AI', desc: 'Screens candidates, schedules interviews, and ranks applicants.', icon: '👤' },
  { name: 'Market Research AI', desc: 'Delivers weekly competitor and market intelligence reports.', icon: '📊' },
]

export default function HomePage() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch('/api/waitlist').then(r => r.json()).then(d => setCount(d.count || 0))
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo iconSize={28} textColor="#0f172a" />
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            <a href="#problem" className="hover:text-gray-900 transition-colors">Why Zentro</a>
            <a href="#how" className="hover:text-gray-900 transition-colors">How it works</a>
            <a href="#marketplace" className="hover:text-gray-900 transition-colors">Marketplace</a>
          </div>
          <a href="#waitlist" className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
            Join Waitlist
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-40 pb-24 px-6" id="waitlist">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 text-gray-500 text-xs font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Now in early access — {count > 0 ? `${count.toLocaleString()} people waiting` : 'Limited spots available'}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6">
              Your AI Workforce,<br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Organized.</span>
            </h1>

            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Manage all your AI workers in one place. Track activity, organize departments, discover new AI workers, and build the future workforce.
            </p>

            <div className="max-w-md mx-auto mb-6">
              <WaitlistForm />
            </div>
            <p className="text-xs text-gray-400">Free to join · No credit card required · Founding member pricing locked in</p>
          </div>

          {/* Dashboard mockup */}
          <div className="relative mt-16">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-10 pointer-events-none" style={{ top: '70%' }} />
            <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-2xl shadow-gray-200/60">
              {/* Window chrome */}
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-gray-400 text-xs font-mono ml-2">zentro.app/dashboard</span>
              </div>
              {/* Dashboard interior */}
              <div className="bg-white flex" style={{ minHeight: 400 }}>
                {/* Fake sidebar */}
                <div className="w-44 bg-gray-900 p-4 flex-shrink-0">
                  <div className="text-white text-xs font-semibold mb-6 opacity-80">ZENTRO</div>
                  {['Dashboard', 'AI Workers', 'Tasks', 'Departments'].map((item, i) => (
                    <div key={item} className={`text-xs px-3 py-2 rounded-lg mb-1 ${i === 0 ? 'bg-blue-600 text-white' : 'text-gray-400'}`}>{item}</div>
                  ))}
                </div>
                {/* Main content */}
                <div className="flex-1 p-6">
                  {/* Stats row */}
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {[
                      { label: 'AI Workers', value: '4', color: 'text-blue-600' },
                      { label: 'Departments', value: '3', color: 'text-purple-600' },
                      { label: 'Tasks Completed', value: '142', color: 'text-emerald-600' },
                      { label: 'AI Costs', value: '$2.40', color: 'text-gray-600' },
                    ].map(s => (
                      <div key={s.label} className="rounded-xl border border-gray-100 p-3">
                        <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  {/* Two columns */}
                  <div className="grid grid-cols-5 gap-4">
                    {/* Departments */}
                    <div className="col-span-3 space-y-3">
                      {departments.map(dept => (
                        <div key={dept.name} className="rounded-xl border border-gray-100 p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-2 h-2 rounded-full ${dept.color}`} />
                            <span className="text-xs font-semibold text-gray-700">{dept.name}</span>
                          </div>
                          <div className="space-y-1.5">
                            {dept.workers.map(w => (
                              <div key={w.name} className="flex items-center justify-between">
                                <span className="text-xs text-gray-600">{w.name}</span>
                                <span className="text-xs text-gray-400 italic">{w.task}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Activity feed */}
                    <div className="col-span-2">
                      <div className="text-xs font-semibold text-gray-500 mb-2">ACTIVITY</div>
                      <div className="space-y-2">
                        {activityItems.slice(0, 4).map((a, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${a.dot}`} />
                            <div>
                              <div className="text-xs font-medium text-gray-700">{a.worker}</div>
                              <div className="text-xs text-gray-400">{a.action}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="py-28 px-6 bg-gray-950" id="problem">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">AI is becoming impossible to manage.</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">You're using a dozen AI tools. None of them talk to each other. There's no central place to see what's happening.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Today */}
            <div className="rounded-2xl border border-gray-800 p-8">
              <div className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-6">Today</div>
              <div className="flex flex-wrap gap-2">
                {aiTools.map(tool => (
                  <span key={tool} className="px-3 py-1.5 rounded-lg bg-gray-800 text-gray-400 text-sm">{tool}</span>
                ))}
                <span className="px-3 py-1.5 rounded-lg bg-gray-800 text-gray-500 text-sm">20 browser tabs</span>
              </div>
              <p className="text-gray-500 text-sm mt-6">Scattered. Disconnected. No visibility into what's actually happening.</p>
            </div>
            {/* Future */}
            <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-950/50 to-purple-950/50 p-8">
              <div className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-6">With Zentro</div>
              <div className="space-y-3">
                {['All AI workers in one dashboard', 'Organized by department', 'Real-time activity feed', 'Performance metrics & costs', 'Hire new workers in seconds'].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span className="text-white text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-blue-300 text-sm mt-6">One command center for your entire AI workforce.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-28 px-6" id="how">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Built for the future of work.</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">In four steps, your entire AI workforce is organized, monitored, and scaling.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Connect AI Workers',
                desc: 'Import workers from OpenAI, Claude, Lindy, or other platforms. Or create new ones from scratch.',
                icon: '⚡',
              },
              {
                step: '02',
                title: 'Organize Departments',
                desc: 'Group workers into Sales, Marketing, Operations, and Research departments — just like a real company.',
                icon: '🏢',
              },
              {
                step: '03',
                title: 'Monitor Activity',
                desc: 'See exactly what each worker completed, how long it took, and what it cost — in real time.',
                icon: '📊',
              },
              {
                step: '04',
                title: 'Scale Your Workforce',
                desc: 'Add new AI workers in seconds. Grow your team without headcount, HR, or overhead.',
                icon: '🚀',
              },
            ].map((s) => (
              <div key={s.step} className="relative p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
                <div className="text-4xl font-black text-gray-100 mb-3 leading-none">{s.step}</div>
                <div className="text-xl mb-3">{s.icon}</div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORKFORCE VISUAL ── */}
      <section className="py-28 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">One company. Human and AI workers, side by side.</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Zentro gives your AI workers the same structure, visibility, and accountability as your human team.</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            {/* Org chart */}
            <div className="flex flex-col items-center gap-6">
              <div className="px-6 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold">CEO</div>
              <div className="w-px h-6 bg-gray-200" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {departments.map(dept => (
                  <div key={dept.name} className="flex flex-col items-center gap-3">
                    <div className={`px-5 py-2.5 rounded-xl text-sm font-semibold ${dept.lightColor} ${dept.textColor} border border-current border-opacity-20`}>{dept.name}</div>
                    <div className="w-px h-4 bg-gray-200" />
                    <div className="space-y-2 w-full">
                      {dept.workers.map(w => (
                        <div key={w.name} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50">
                          <div className={`w-2 h-2 rounded-full ${dept.color} flex-shrink-0`} />
                          <span className="text-xs font-medium text-gray-700">{w.name}</span>
                          <span className="ml-auto text-xs text-emerald-500 font-medium">● Active</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACTIVITY FEED ── */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-blue-600 text-sm font-semibold mb-4 uppercase tracking-wide">Real-time visibility</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">Know exactly what your AI team is doing, right now.</h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">Every task, every output, every cost — logged automatically. No more wondering if your AI tools are actually working.</p>
            <a href="#waitlist" className="inline-block px-6 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors">
              Get early access →
            </a>
          </div>
          <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm font-semibold text-gray-900">Activity Feed</span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </div>
            <div className="space-y-4">
              {activityItems.map((a, i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${a.dot}`} />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-gray-900">{a.worker}</span>
                    <p className="text-sm text-gray-500 mt-0.5">{a.action}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MARKETPLACE ── */}
      <section className="py-28 px-6 bg-gray-950" id="marketplace">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <span className="inline-block px-3 py-1 rounded-full bg-purple-900/50 border border-purple-700/30 text-purple-300 text-xs font-medium mb-6">Coming Soon</span>
            <h2 className="text-4xl font-bold text-white mb-4">Hire AI Workers from the Marketplace</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Browse battle-tested AI workers built by the community. Add them to your workforce in one click.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {marketplaceWorkers.map(w => (
              <div key={w.name} className="rounded-2xl border border-gray-800 bg-gray-900 p-5 relative overflow-hidden">
                <div className="absolute top-3 right-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-500 border border-gray-700">Soon</span>
                </div>
                <div className="text-2xl mb-3">{w.icon}</div>
                <div className="font-semibold text-white text-sm mb-2">{w.name}</div>
                <p className="text-gray-500 text-xs leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 text-sm mt-8">Join the waitlist to get marketplace access on day one.</p>
        </div>
      </section>

      {/* ── EARLY ACCESS ── */}
      <section className="py-28 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">The future workforce starts here.</h2>
          <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">Join the waitlist for early access, founding member pricing, marketplace access, and direct input on what we build next.</p>
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 mb-6">
            <div className="grid grid-cols-2 gap-4 mb-8 text-left">
              {[
                { icon: '⚡', title: 'Early access', desc: 'First in line when we launch.' },
                { icon: '🔒', title: 'Founding pricing', desc: 'Locked in forever, never increases.' },
                { icon: '🛒', title: 'Marketplace access', desc: 'Hire community-built AI workers.' },
                { icon: '🎯', title: 'Shape the product', desc: 'Your feedback builds what comes next.' },
              ].map(p => (
                <div key={p.title} className="flex gap-3">
                  <span className="text-xl">{p.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{p.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <WaitlistForm />
          </div>
          <p className="text-xs text-gray-400">Free to join · No credit card · {count > 0 ? `${count.toLocaleString()} people already waiting` : 'Be among the first'}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Logo iconSize={22} textColor="#0f172a" />
          <p className="text-xs text-gray-400">© 2025 Zentro. The Operating System for AI Workers.</p>
        </div>
      </footer>
    </div>
  )
}
