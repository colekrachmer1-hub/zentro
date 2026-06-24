'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// ── Data ──────────────────────────────────────────────────────────────────────

const HERO_CARDS = [
  { name: 'AI SDR', provider: 'Built by Lindy AI', category: 'Sales', rating: 4.7, price: '$79/mo' },
  { name: 'AI Lead Agent', provider: 'Built by Monday CRM', category: 'Sales', rating: 4.8, price: '$49/mo' },
  { name: 'AI Product Scout', provider: 'Built by SellerOps', category: 'Amazon FBA', rating: 4.9, price: '$99/mo' },
  { name: 'AI Recruiter', provider: 'Built by HirePilot', category: 'Recruiting', rating: 4.7, price: '$129/mo' },
]

const CATEGORIES = [
  { name: 'Sales', emoji: '📞' },
  { name: 'Marketing', emoji: '📣' },
  { name: 'Research', emoji: '🔍' },
  { name: 'Amazon FBA', emoji: '📦' },
  { name: 'Recruiting', emoji: '👥' },
  { name: 'Customer Support', emoji: '💬' },
  { name: 'Operations', emoji: '⚙️' },
  { name: 'Finance', emoji: '💰' },
  { name: 'Real Estate', emoji: '🏠' },
  { name: 'Productivity', emoji: '⚡' },
  { name: 'AI Assistants', emoji: '🤖' },
  { name: 'Lead Generation', emoji: '🎯' },
  { name: 'Content Creation', emoji: '✍️' },
]

const TYPING_WORDS = ['AI SDR', 'AI Recruiter', 'AI Lead Agent', 'AI Product Scout', 'AI Research Analyst', 'AI Support Agent']

const STEPS = [
  { step: '1', title: 'Search for the role you need', desc: 'Browse by role, category, or keyword — just like searching for a job candidate.' },
  { step: '2', title: 'Compare AI employees', desc: 'Side-by-side comparison of providers, pricing, ratings, and capabilities.' },
  { step: '3', title: 'Review demos, pricing & outcomes', desc: 'Read what the AI employee does, who it\'s for, and what results businesses are seeing.' },
  { step: '4', title: 'Hire the best AI employee', desc: 'Click "Hire Employee" and go directly to the provider\'s platform to get started.' },
]

const CREATOR_BENEFITS = [
  'Get customers without building an audience',
  'Appear in front of buyers already searching',
  'Build credibility through ratings and reviews',
  'Free to list during our founding creator phase',
]

// ── Hooks ─────────────────────────────────────────────────────────────────────

function useTyping(words: string[]) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const word = words[wordIdx]
    const speed = deleting ? 40 : 80

    const t = setTimeout(() => {
      if (!deleting) {
        const next = word.slice(0, charIdx + 1)
        setDisplay(next)
        if (next === word) { setPaused(true); setTimeout(() => { setPaused(false); setDeleting(true) }, 1800) }
        else setCharIdx(c => c + 1)
      } else {
        const next = word.slice(0, charIdx - 1)
        setDisplay(next)
        if (next === '') { setDeleting(false); setWordIdx(i => (i + 1) % words.length); setCharIdx(0) }
        else setCharIdx(c => c - 1)
      }
    }, speed)
    return () => clearTimeout(t)
  }, [charIdx, deleting, paused, wordIdx, words])

  return display
}

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

function useCountUp(target: number, inView: boolean, duration = 1400) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const start = Date.now()
    const id = setInterval(() => {
      const p = Math.min((Date.now() - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(eased * target))
      if (p >= 1) clearInterval(id)
    }, 16)
    return () => clearInterval(id)
  }, [inView, target, duration])
  return val
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating)
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => (
        <svg key={s} className={`w-3.5 h-3.5 ${s <= full ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  )
}

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const router = useRouter()
  const [q, setQ] = useState('')
  const [mounted, setMounted] = useState(false)
  const typedText = useTyping(TYPING_WORDS)
  const catSection = useInView(0.1)
  const stepsSection = useInView(0.1)
  const creatorSection = useInView(0.1)
  const statsCount = useCountUp(10000, creatorSection.inView)

  useEffect(() => { setMounted(true) }, [])

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    router.push(q ? `/employees?q=${encodeURIComponent(q)}` : '/employees')
  }, [q, router])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ── HERO ── */}
      <section
        className="border-b border-gray-100 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #dce9ff 0%, #eaf2ff 40%, #f5f9ff 70%, #ffffff 100%)' }}
      >
        {/* Animated background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div style={{
            position: 'absolute', width: 500, height: 500,
            borderRadius: '50%', background: 'rgba(99,130,255,0.08)',
            top: -100, left: -100,
            animation: 'blobFloat 8s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', width: 350, height: 350,
            borderRadius: '50%', background: 'rgba(59,130,246,0.07)',
            bottom: -80, right: 100,
            animation: 'blobFloat 10s ease-in-out infinite reverse',
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">

          {/* Left */}
          <div>
            <div style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Find AI Employees<br />For Your Business
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Hire specialized AI workers for sales, marketing, recruiting, research, Amazon FBA, customer support, and more.
              </p>
            </div>

            {/* Search bar with typing animation */}
            <div style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
            }}>
              <form onSubmit={handleSearch}>
                <div className="flex bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden"
                  style={{ transition: 'box-shadow 0.2s ease' }}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.2)')}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.1)')}
                >
                  <div className="flex items-center flex-1 px-4 py-3.5 gap-3">
                    <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
                    </svg>
                    <input
                      value={q}
                      onChange={e => setQ(e.target.value)}
                      placeholder={`Search for ${typedText}|`}
                      className="flex-1 outline-none text-gray-900 text-sm bg-transparent placeholder-gray-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-700 text-white px-7 py-3.5 font-semibold text-sm shrink-0"
                    style={{ transition: 'background 0.15s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#1d4ed8')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#1d4ddb')}
                  >
                    Search
                  </button>
                </div>
              </form>

              <div className="mt-4 flex items-center gap-3">
                <p className="text-sm text-gray-500">Built an AI employee?</p>
                <Link href="/submit" className="text-sm font-semibold text-blue-700 hover:underline">
                  List it for free →
                </Link>
              </div>
            </div>
          </div>

          {/* Right: staggered animated cards */}
          <div className="hidden lg:flex flex-col gap-3">
            {HERO_CARDS.map((card, i) => (
              <div
                key={card.name}
                className="bg-white border border-gray-200 rounded-lg px-5 py-4 shadow-sm flex items-center justify-between cursor-pointer"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateX(0)' : 'translateX(40px)',
                  transition: `opacity 0.6s ease ${i * 100 + 200}ms, transform 0.6s ease ${i * 100 + 200}ms, box-shadow 0.2s ease, border-color 0.2s ease`,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.boxShadow = '0 8px 24px rgba(59,130,246,0.15)'
                  el.style.borderColor = '#bfdbfe'
                  el.style.transform = 'translateX(-4px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'
                  el.style.borderColor = '#e5e7eb'
                  el.style.transform = 'translateX(0)'
                }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-gray-900 text-sm">{card.name}</p>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">{card.category}</span>
                  </div>
                  <p className="text-xs text-gray-500">{card.provider}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Stars rating={card.rating} />
                    <span className="text-xs font-semibold text-gray-700">{card.rating}</span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-bold text-gray-900 text-sm">{card.price}</p>
                  <span className="text-xs text-green-600 font-medium">Remote</span>
                </div>
              </div>
            ))}
            <Link href="/employees" className="text-center text-xs text-blue-700 hover:underline mt-1"
              style={{
                opacity: mounted ? 1 : 0,
                transition: 'opacity 0.6s ease 700ms',
              }}
            >
              View all AI employees →
            </Link>
          </div>
        </div>
      </section>

      {/* ── EXPLORE BY CATEGORY ── */}
      <section className="px-4 py-14 border-b border-gray-100 bg-gray-50" ref={catSection.ref}>
        <div className="max-w-7xl mx-auto">
          <div style={{
            opacity: catSection.inView ? 1 : 0,
            transform: catSection.inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Explore by Category</h2>
            <p className="text-sm text-gray-500 mb-8">Find the right AI employee for every function in your business.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat.name}
                href={`/employees?category=${encodeURIComponent(cat.name)}`}
                className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-200 rounded-xl text-center group"
                style={{
                  opacity: catSection.inView ? 1 : 0,
                  transform: catSection.inView ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                  transition: `opacity 0.5s ease ${i * 50}ms, transform 0.5s ease ${i * 50}ms, box-shadow 0.2s ease, border-color 0.2s ease`,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.boxShadow = '0 8px 20px rgba(59,130,246,0.12)'
                  el.style.borderColor = '#93c5fd'
                  el.style.transform = 'translateY(-4px) scale(1.03)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.boxShadow = ''
                  el.style.borderColor = '#e5e7eb'
                  el.style.transform = 'translateY(0) scale(1)'
                }}
              >
                <span className="text-2xl" style={{ transition: 'transform 0.2s ease' }}>{cat.emoji}</span>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-blue-700 leading-tight" style={{ transition: 'color 0.2s ease' }}>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW HIRING WORKS ── */}
      <section className="px-4 py-16 border-b border-gray-100" ref={stepsSection.ref}>
        <div className="max-w-7xl mx-auto">
          <div style={{
            opacity: stepsSection.inView ? 1 : 0,
            transform: stepsSection.inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">How Hiring Works</h2>
            <p className="text-sm text-gray-500 mb-12">From search to hire in four steps.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((item, i) => (
              <div
                key={item.step}
                style={{
                  opacity: stepsSection.inView ? 1 : 0,
                  transform: stepsSection.inView ? 'translateY(0)' : 'translateY(32px)',
                  transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms`,
                }}
              >
                <div
                  className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm mb-4"
                  style={{ transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.transform = 'scale(1.15)'
                    el.style.boxShadow = '0 0 0 6px rgba(59,130,246,0.2)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.transform = 'scale(1)'
                    el.style.boxShadow = ''
                  }}
                >
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm leading-snug">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR CREATORS ── */}
      <section
        className="px-4 py-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #dce9ff 0%, #eaf2ff 50%, #f5f9ff 100%)' }}
        ref={creatorSection.ref}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">

          {/* Copy */}
          <div
            className="flex-1 max-w-xl"
            style={{
              opacity: creatorSection.inView ? 1 : 0,
              transform: creatorSection.inView ? 'translateX(0)' : 'translateX(-32px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-3">For AI Employee Creators</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built an AI Employee?</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Get discovered by founders, agencies, consultants, Amazon sellers, and business owners actively searching for AI workers. No audience required.
            </p>
            <div className="space-y-3 mb-8">
              {CREATOR_BENEFITS.map((b, i) => (
                <div
                  key={b}
                  className="flex items-center gap-3 text-sm text-gray-700"
                  style={{
                    opacity: creatorSection.inView ? 1 : 0,
                    transform: creatorSection.inView ? 'translateX(0)' : 'translateX(-16px)',
                    transition: `opacity 0.5s ease ${i * 100 + 200}ms, transform 0.5s ease ${i * 100 + 200}ms`,
                  }}
                >
                  <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {b}
                </div>
              ))}
            </div>
            <Link
              href="/submit"
              className="inline-block px-7 py-3 bg-blue-700 text-white font-semibold rounded-lg text-sm"
              style={{ transition: 'background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = '#1d4ed8'
                el.style.transform = 'translateY(-2px)'
                el.style.boxShadow = '0 8px 20px rgba(59,130,246,0.3)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = '#1d4ddb'
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = ''
              }}
            >
              List Your AI Employee →
            </Link>
          </div>

          {/* Stats card */}
          <div
            className="lg:w-80 bg-white rounded-2xl border border-gray-200 shadow-sm p-8"
            style={{
              opacity: creatorSection.inView ? 1 : 0,
              transform: creatorSection.inView ? 'translateX(0)' : 'translateX(32px)',
              transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
            }}
          >
            <p className="font-bold text-gray-900 text-lg mb-6">Why creators choose Zentro</p>
            <div className="grid grid-cols-2 gap-5 mb-7">
              {[
                { stat: statsCount >= 10000 ? '10,000+' : statsCount.toLocaleString(), label: 'Businesses searching monthly' },
                { stat: 'Free', label: 'Always free to list' },
                { stat: '13', label: 'Categories with active buyers' },
                { stat: '24hr', label: 'Average listing review time' },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-2xl font-bold text-blue-700 leading-none mb-1">{item.stat}</p>
                  <p className="text-xs text-gray-500 leading-snug">{item.label}</p>
                </div>
              ))}
            </div>
            <Link
              href="/submit"
              className="block w-full text-center py-3 bg-blue-700 text-white font-semibold rounded-lg text-sm"
              style={{ transition: 'background 0.2s ease' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#1d4ed8')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#1d4ddb')}
            >
              List Your AI Employee
            </Link>
          </div>
        </div>
      </section>

      {/* Keyframe styles */}
      <style>{`
        @keyframes blobFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
      `}</style>
    </div>
  )
}
