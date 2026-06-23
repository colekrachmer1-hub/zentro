'use client'

import { useState, useEffect } from 'react'
import { Logo } from '@/components/Logo'

function WaitlistForm({ dark = false }: { dark?: boolean }) {
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
      if (data.message === 'success' || data.message?.includes('already')) {
        setStatus('success')
        setMessage(data.message === 'success' ? "You're on the list. We'll be in touch soon." : "You're already on the list!")
        setEmail('')
      } else throw new Error()
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className={`flex items-center gap-2 font-medium ${dark ? 'text-emerald-400' : 'text-emerald-600'}`}>
        <span>✓</span> {message}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
      <input
        type="email"
        placeholder="Enter your work email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={`flex-1 px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          dark
            ? 'bg-white/10 border-white/20 text-white placeholder-white/40'
            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
        }`}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors whitespace-nowrap disabled:opacity-60"
      >
        {status === 'loading' ? '...' : 'Join Early Access'}
      </button>
      {status === 'error' && <p className="text-red-400 text-xs mt-1 w-full">{message}</p>}
    </form>
  )
}

const aiEmployeeTypes = [
  { role: 'Sales AI', icon: '📞', color: 'bg-blue-50 border-blue-100', iconBg: 'bg-blue-100', iconText: 'text-blue-600', desc: 'Books meetings and generates outreach at scale.' },
  { role: 'Research AI', icon: '🔍', color: 'bg-purple-50 border-purple-100', iconBg: 'bg-purple-100', iconText: 'text-purple-600', desc: 'Analyzes competitors and surfaces market opportunities.' },
  { role: 'Marketing AI', icon: '✍️', color: 'bg-pink-50 border-pink-100', iconBg: 'bg-pink-100', iconText: 'text-pink-600', desc: 'Creates content and finds growth trends daily.' },
  { role: 'Executive Assistant AI', icon: '📋', color: 'bg-emerald-50 border-emerald-100', iconBg: 'bg-emerald-100', iconText: 'text-emerald-600', desc: 'Organizes tasks and prepares weekly summaries.' },
  { role: 'Support AI', icon: '💬', color: 'bg-orange-50 border-orange-100', iconBg: 'bg-orange-100', iconText: 'text-orange-600', desc: 'Handles customer questions and creates documentation.' },
]

const steps = [
  { num: '01', title: 'Create an AI Employee', desc: 'Choose a role — Sales AI, Research AI, Marketing AI, Assistant AI, or Support AI.', examples: ['SDR AI', 'Research AI', 'Marketing AI', 'Support AI'] },
  { num: '02', title: 'Choose a Brain', desc: 'Connect your preferred AI model. Each employee can run on a different model.', examples: ['OpenAI GPT-4o', 'Claude 3.5', 'Gemini (soon)'] },
  { num: '03', title: 'Define a Goal', desc: 'Give your employee a clear objective. They work toward it autonomously.', examples: ['Book 10 meetings/month', 'Analyze competitors weekly', 'Generate content daily'] },
  { num: '04', title: 'Run Tasks', desc: 'Assign work. Your AI employee executes and returns structured results.', examples: ['Research competitors', 'Generate outreach', 'Write content'] },
  { num: '05', title: 'Monitor Activity', desc: 'Every action is logged. See exactly what your AI workforce accomplished today.', examples: ['Tasks completed', 'Costs tracked', 'Performance scored'] },
]

const activityFeed = [
  { name: 'Sales AI', action: 'Generated 50 qualified leads', time: '2m ago', color: 'bg-blue-500' },
  { name: 'Research AI', action: 'Completed competitor analysis', time: '8m ago', color: 'bg-purple-500' },
  { name: 'Marketing AI', action: 'Created 10 content ideas', time: '22m ago', color: 'bg-pink-500' },
  { name: 'Executive Assistant AI', action: 'Prepared weekly summary', time: '1h ago', color: 'bg-emerald-500' },
  { name: 'Support AI', action: 'Resolved 12 support tickets', time: '2h ago', color: 'bg-orange-500' },
]

export default function HomePage() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch('/api/waitlist').then(r => r.json()).then(d => setCount(d.count || 0))
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo iconSize={28} textColor="#0f172a" />
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            <a href="#employees" className="hover:text-gray-900 transition-colors">AI Employees</a>
            <a href="#how" className="hover:text-gray-900 transition-colors">How it works</a>
            <a href="#future" className="hover:text-gray-900 transition-colors">Vision</a>
          </div>
          <a href="#waitlist" className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
            Join Early Access
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-40 pb-28 px-6" id="waitlist">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 text-gray-500 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            {count > 0 ? `${count.toLocaleString()} people on the waitlist` : 'Now in early access — limited spots'}
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6">
            Build Your<br />
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">AI Workforce.</span>
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Create AI employees powered by OpenAI and Claude. Organize them into departments, assign goals, and manage all your AI work from one place.
          </p>

          <div className="max-w-lg mx-auto mb-5">
            <WaitlistForm />
          </div>
          <p className="text-xs text-gray-400">Free to join · No credit card required · Founding member pricing locked in</p>

          {/* Dashboard preview */}
          <div className="mt-20 rounded-2xl border border-gray-200 overflow-hidden shadow-2xl shadow-gray-100/80 text-left">
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-gray-400 text-xs font-mono ml-2">zentro.app/dashboard</span>
            </div>
            <div className="flex bg-white" style={{ minHeight: 380 }}>
              {/* Sidebar */}
              <div className="w-44 bg-gray-950 flex-shrink-0 p-4">
                <div className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-5">Zentro</div>
                {['Dashboard', 'AI Workers', 'Departments', 'Tasks', 'Activity'].map((item, i) => (
                  <div key={item} className={`text-xs px-3 py-2 rounded-lg mb-1 font-medium ${i === 0 ? 'bg-blue-600 text-white' : 'text-white/40'}`}>
                    {item}
                  </div>
                ))}
                <div className="mt-4 text-xs px-3 py-2 text-white/20">Marketplace</div>
                <div className="text-xs px-3 text-white/20">Coming Soon</div>
              </div>
              {/* Main */}
              <div className="flex-1 p-6 overflow-hidden">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className="text-sm font-bold text-gray-900">Workforce Dashboard</div>
                    <div className="text-xs text-gray-400">5 AI employees · all active</div>
                  </div>
                  <div className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-lg font-medium">+ Add AI Worker</div>
                </div>
                <div className="grid grid-cols-4 gap-3 mb-5">
                  {[
                    { label: 'AI Workers', value: '5', color: 'text-blue-600' },
                    { label: 'Tasks Done', value: '142', color: 'text-emerald-600' },
                    { label: 'Est. Value', value: '$596', color: 'text-purple-600' },
                    { label: 'AI Cost', value: '$2.40', color: 'text-gray-600' },
                  ].map(s => (
                    <div key={s.label} className="rounded-xl border border-gray-100 p-3">
                      <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
                      <div className="text-xs text-gray-400">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-5 gap-4">
                  <div className="col-span-3 space-y-2">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">AI Workers</div>
                    {[
                      { name: 'Sales AI', brain: 'GPT-4o', status: 'Generating leads...' },
                      { name: 'Research AI', brain: 'Claude', status: 'Analyzing market...' },
                      { name: 'Marketing AI', brain: 'GPT-4o', status: 'Writing content...' },
                    ].map(w => (
                      <div key={w.name} className="flex items-center gap-2 p-2 rounded-lg border border-gray-100">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">{w.name[0]}</div>
                        <span className="text-xs font-medium text-gray-700 flex-1">{w.name}</span>
                        <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{w.brain}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      </div>
                    ))}
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Activity</div>
                    {activityFeed.slice(0, 4).map((a, i) => (
                      <div key={i} className="flex items-start gap-1.5 mb-2">
                        <div className={`w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0 ${a.color}`} />
                        <div className="text-xs text-gray-500 leading-tight">{a.name} — {a.action}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEET YOUR AI EMPLOYEES */}
      <section className="py-28 px-6 bg-gray-50 border-y border-gray-100" id="employees">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-blue-600 text-sm font-semibold uppercase tracking-wide mb-3">Meet your team</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your AI Employees</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Every role you need. Powered by the best AI models. Working 24/7.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiEmployeeTypes.map((emp) => (
              <div key={emp.role} className={`rounded-2xl border p-6 ${emp.color}`}>
                <div className={`w-11 h-11 rounded-xl ${emp.iconBg} ${emp.iconText} flex items-center justify-center text-xl mb-4`}>
                  {emp.icon}
                </div>
                <div className="font-semibold text-gray-900 mb-2">{emp.role}</div>
                <p className="text-sm text-gray-500 leading-relaxed">{emp.desc}</p>
              </div>
            ))}
            {/* Add your own */}
            <div className="rounded-2xl border border-dashed border-gray-200 p-6 flex flex-col items-center justify-center text-center bg-white">
              <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-xl mb-4">＋</div>
              <div className="font-semibold text-gray-700 mb-1">Custom AI Employee</div>
              <p className="text-sm text-gray-400">Define any role with a custom goal and system prompt.</p>
            </div>
          </div>
        </div>
      </section>

      {/* THE FUTURE OF WORK */}
      <section className="py-28 px-6 bg-gray-950" id="future">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-blue-400 text-sm font-semibold uppercase tracking-wide mb-3">The future of work</div>
            <h2 className="text-4xl font-bold text-white mb-6">Every company will eventually have<br />human and AI employees working together.</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Zentro is where they are managed. One dashboard for your entire workforce — human and AI, side by side.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8">
              <div className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-6">Human Employees</div>
              <div className="space-y-3">
                {['CEO', 'Head of Sales', 'Marketing Manager', 'Customer Success'].map(role => (
                  <div key={role} className="flex items-center gap-3 p-3 rounded-xl bg-gray-800">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 text-xs font-bold">
                      {role[0]}
                    </div>
                    <span className="text-sm text-gray-300">{role}</span>
                    <span className="ml-auto text-xs text-gray-500">Human</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-950/60 to-purple-950/60 p-8">
              <div className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-6">AI Employees</div>
              <div className="space-y-3">
                {[
                  { name: 'Sales AI', brain: 'GPT-4o', status: 'Active' },
                  { name: 'Research AI', brain: 'Claude', status: 'Active' },
                  { name: 'Marketing AI', brain: 'GPT-4o', status: 'Active' },
                  { name: 'Support AI', brain: 'Claude', status: 'Active' },
                ].map(emp => (
                  <div key={emp.name} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-blue-400 text-xs font-bold">
                      {emp.name[0]}
                    </div>
                    <span className="text-sm text-white">{emp.name}</span>
                    <span className="text-xs text-blue-400 bg-blue-950 px-2 py-0.5 rounded">{emp.brain}</span>
                    <span className="ml-auto flex items-center gap-1 text-xs text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {emp.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-center text-gray-600 text-sm mt-8">Zentro is the operating system for this new workforce.</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-28 px-6" id="how">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-blue-600 text-sm font-semibold uppercase tracking-wide mb-3">How it works</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">From zero to AI workforce in minutes.</h2>
            <p className="text-gray-500 text-lg">No technical setup. No prompt engineering. Just create, assign, and go.</p>
          </div>
          <div className="space-y-4">
            {steps.map((s, i) => (
              <div key={s.num} className="flex gap-6 p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all items-start">
                <div className="text-3xl font-black text-gray-100 leading-none w-10 flex-shrink-0">{s.num}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{s.title}</h3>
                  <p className="text-gray-500 text-sm mb-3">{s.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.examples.map(e => (
                      <span key={e} className="px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600">{e}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW — ACTIVITY FEED */}
      <section className="py-28 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-blue-600 text-sm font-semibold uppercase tracking-wide mb-4">Full visibility</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">Know exactly what your AI team did today.</h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">Every task, output, and cost is logged automatically. No more guessing if your AI tools are actually working.</p>
            <div className="space-y-3">
              {['Real-time activity feed', 'Cost tracking per employee', 'Performance scoring', 'Task history & outputs'].map(f => (
                <div key={f} className="flex items-center gap-2 text-gray-700 text-sm">
                  <span className="text-blue-500">✓</span> {f}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900">Activity Feed</span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </div>
            <div className="divide-y divide-gray-50">
              {activityFeed.map((a, i) => (
                <div key={i} className="flex items-start gap-3 px-5 py-4">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${a.color}`} />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold text-gray-900">{a.name}</span>
                    <p className="text-sm text-gray-500 mt-0.5">{a.action}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EARLY ACCESS CTA */}
      <section className="py-28 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">The future workforce starts here.</h2>
          <p className="text-gray-500 text-lg mb-10">Join the waitlist for early access, founding member pricing, marketplace access, and a direct line to the team.</p>
          <div className="bg-gray-950 rounded-2xl p-8 mb-6">
            <div className="grid grid-cols-2 gap-4 mb-8 text-left">
              {[
                { icon: '⚡', title: 'Early access', desc: 'First in line when we launch.' },
                { icon: '🔒', title: 'Founding pricing', desc: 'Locked in forever.' },
                { icon: '🛒', title: 'Marketplace', desc: 'Hire community-built AI workers.' },
                { icon: '🎯', title: 'Shape the product', desc: 'Your feedback drives what we build.' },
              ].map(p => (
                <div key={p.title} className="flex gap-3">
                  <span className="text-xl">{p.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-white">{p.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <WaitlistForm dark />
          </div>
          <p className="text-xs text-gray-400">Free to join · No credit card · {count > 0 ? `${count.toLocaleString()} people already waiting` : 'Be among the first'}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Logo iconSize={22} textColor="#0f172a" />
          <p className="text-xs text-gray-400">© 2025 Zentro · The Operating System for AI Workers</p>
        </div>
      </footer>
    </div>
  )
}
