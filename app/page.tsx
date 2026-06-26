'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { MOCK_AGENTS, CATEGORIES, AIAgent } from '@/lib/mock-agents'

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function StarIcon() {
  return (
    <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}

function AgentCard({ agent, index, visible }: { agent: AIAgent; index: number; visible: boolean }) {
  return (
    <Link
      href={`/agent/${agent.id}`}
      className="group block bg-white rounded-2xl border border-gray-200 p-5 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-100/80 transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s ease ${index * 55}ms, transform 0.5s ease ${index * 55}ms, box-shadow 0.2s, border-color 0.2s`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center text-xl shadow-sm`}>
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
      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors text-sm">{agent.name}</h3>
      <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">{agent.tagline}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {agent.integrations.slice(0, 3).map(i => (
          <span key={i} className="text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md">{i}</span>
        ))}
        {agent.integrations.length > 3 && <span className="text-xs text-gray-400 self-center">+{agent.integrations.length - 3}</span>}
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1"><StarIcon />{agent.rating}</span>
          <span>{agent.installs.toLocaleString()} installs</span>
        </div>
        <span className="text-sm font-semibold text-gray-900">{agent.price}</span>
      </div>
    </Link>
  )
}

const CATEGORY_ICONS: Record<string, string> = {
  Sales: '💼', Marketing: '📣', 'Customer Support': '🎧', Healthcare: '🏥',
  'Real Estate': '🏠', Restaurants: '🍽️', Construction: '🏗️', Finance: '💰',
  HR: '👥', Operations: '⚙️', Productivity: '⚡',
}

const STEPS = [
  { num: '01', title: 'Browse the marketplace', desc: 'Find a production-ready AI agent built for your industry and use case.', icon: '🔍' },
  { num: '02', title: 'Customize with your business', desc: 'Add your name, logo, brand voice, and connect your tools in minutes.', icon: '✏️' },
  { num: '03', title: 'Launch in minutes', desc: 'Your AI agent goes live automatically — no code, no developers needed.', icon: '🚀' },
]

const TESTIMONIALS = [
  { quote: 'We deployed an AI receptionist on Monday. By Friday it had booked 23 appointments and we hadn\'t touched a thing.', author: 'Sarah M.', role: 'Owner, Bloom Dental', avatar: 'SM', color: 'from-blue-400 to-indigo-500' },
  { quote: 'The setup genuinely took 5 minutes. Our AI sales assistant now qualifies every inbound lead before our team ever sees it.', author: 'David R.', role: 'VP Sales, TechCo', avatar: 'DR', color: 'from-violet-400 to-purple-500' },
  { quote: 'I went from spending 4 hours a day on email to 45 minutes. My AI email assistant handles the rest better than I did.', author: 'Jake M.', role: 'CEO, Growth Agency', avatar: 'JM', color: 'from-emerald-400 to-teal-500' },
]

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const { ref: agentsRef, inView: agentsInView } = useInView()
  const { ref: stepsRef, inView: stepsInView } = useInView()
  const { ref: catsRef, inView: catsInView } = useInView()
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView()

  useEffect(() => { const t = setTimeout(() => setMounted(true), 50); return () => clearTimeout(t) }, [])

  const displayCats = CATEGORIES.filter(c => c !== 'All')

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.07) 0%, transparent 70%)' }} />
        <div className="max-w-5xl mx-auto px-5 pt-20 pb-16 text-center relative">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-100 bg-indigo-50 text-indigo-600 text-xs font-semibold mb-8"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            500+ production-ready AI agents
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s' }}>
            The Fastest Way to<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)' }}>
              Add AI to Your Business.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(12px)', transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s' }}>
            Browse production-ready AI agents, customize them with your business, and launch in minutes. No code. No developers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(12px)', transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s' }}>
            <Link href="/agents" className="inline-flex items-center gap-2 px-6 py-3.5 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-700 transition-colors text-sm shadow-md">
              Browse AI Agents <ChevronRight />
            </Link>
            <button className="inline-flex items-center gap-2 px-6 py-3.5 border border-gray-200 text-gray-700 font-semibold rounded-full hover:border-gray-300 hover:bg-gray-50 transition-colors text-sm">
              <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              Watch Demo
            </button>
          </div>

          <div className="inline-flex flex-wrap justify-center gap-8 px-8 py-4 bg-gray-50 rounded-2xl border border-gray-100"
            style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.45s' }}>
            {[['500+', 'AI Agents'], ['10k+', 'Businesses'], ['4.8', 'Avg Rating'], ['5 min', 'Avg Setup']].map(([v, l]) => (
              <div key={l} className="text-center">
                <p className="text-xl font-bold text-gray-900">{v}</p>
                <p className="text-xs text-gray-400 mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Agents */}
      <section className="max-w-7xl mx-auto px-5 pb-20" ref={agentsRef}>
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1.5">Featured Agents</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Ready to deploy today</h2>
          </div>
          <Link href="/agents" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1">
            View all <ChevronRight />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {MOCK_AGENTS.map((agent, i) => (
            <AgentCard key={agent.id} agent={agent} index={i} visible={agentsInView} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 border-y border-gray-100 py-20" ref={catsRef}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1.5">Browse by Industry</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">AI agents for every business</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {displayCats.map((cat, i) => (
              <Link key={cat} href={`/agents?category=${encodeURIComponent(cat)}`}
                className="flex flex-col items-center gap-2.5 p-4 bg-white rounded-2xl border border-gray-200 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-50 transition-all duration-200 text-center group"
                style={{ opacity: catsInView ? 1 : 0, transform: catsInView ? 'translateY(0)' : 'translateY(16px)', transition: `opacity 0.4s ease ${i * 40}ms, transform 0.4s ease ${i * 40}ms, box-shadow 0.2s, border-color 0.2s` }}>
                <span className="text-2xl">{CATEGORY_ICONS[cat] || '🤖'}</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors leading-tight">{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 max-w-5xl mx-auto px-5" ref={stepsRef}>
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1.5">How It Works</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Launch in 3 steps</h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">No technical knowledge required. No developers. No waiting weeks.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {STEPS.map((step, i) => (
            <div key={i}
              style={{ opacity: stepsInView ? 1 : 0, transform: stepsInView ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms` }}>
              <div className="text-3xl mb-4">{step.icon}</div>
              <div className="text-xs font-bold text-indigo-400 mb-2 tracking-wider">{step.num}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link href="/agents" className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors text-sm shadow-lg shadow-indigo-200">
            Browse all AI agents <ChevronRight />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 border-t border-gray-100 py-24" ref={testimonialsRef}>
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1.5">Loved by businesses</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Real results, real fast</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"
                style={{ opacity: testimonialsInView ? 1 : 0, transform: testimonialsInView ? 'translateY(0)' : 'translateY(20px)', transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms` }}>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, s) => <StarIcon key={s} />)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold`}>{t.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.author}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-5">
        <div className="max-w-3xl mx-auto text-center rounded-3xl p-12 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 opacity-30 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)' }} />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative">Ready to add AI to your business?</h2>
          <p className="text-indigo-200 mb-8 relative">Join 10,000+ businesses using Zentro to automate their operations with AI.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative">
            <Link href="/agents" className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors text-sm">
              Browse AI Agents <ChevronRight />
            </Link>
            <button className="inline-flex items-center gap-2 px-6 py-3.5 border border-indigo-400/50 text-white font-medium rounded-full hover:border-indigo-300 hover:bg-white/5 transition-colors text-sm">
              Talk to sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">Z</span>
                </div>
                <span className="font-semibold text-gray-900">Zentro</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">The App Store for AI agents. Deploy in minutes, not months.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
              <div>
                <p className="font-semibold text-gray-900 mb-3">Product</p>
                <div className="space-y-2">
                  <Link href="/agents" className="block text-gray-400 hover:text-gray-700 transition-colors">Browse Agents</Link>
                  <Link href="/pricing" className="block text-gray-400 hover:text-gray-700 transition-colors">Pricing</Link>
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-3">Company</p>
                <div className="space-y-2">
                  <Link href="/about" className="block text-gray-400 hover:text-gray-700 transition-colors">About</Link>
                  <Link href="/contact" className="block text-gray-400 hover:text-gray-700 transition-colors">Contact</Link>
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-3">Legal</p>
                <div className="space-y-2">
                  <Link href="/privacy" className="block text-gray-400 hover:text-gray-700 transition-colors">Privacy</Link>
                  <Link href="/terms" className="block text-gray-400 hover:text-gray-700 transition-colors">Terms</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-400">© 2024 Zentro. All rights reserved.</p>
            <p className="text-xs text-gray-400">hirezentro.com</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
