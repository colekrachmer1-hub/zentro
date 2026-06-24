'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/Logo'

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

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)
  const catRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setCatOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 relative">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center">

        {/* Logo — left */}
        <div className="shrink-0">
          <Logo href="/" iconSize={28} />
        </div>

        {/* Nav — true center */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700 absolute left-1/2 -translate-x-1/2">
          <Link href="/employees" className="hover:text-blue-700 transition-colors">Find AI Employees</Link>

          {/* Categories dropdown */}
          <div ref={catRef} className="relative">
            <button
              onClick={() => setCatOpen(o => !o)}
              className={`flex items-center gap-1 hover:text-blue-700 transition-colors ${catOpen ? 'text-blue-700' : ''}`}
            >
              Categories
              <svg className={`w-3.5 h-3.5 transition-transform ${catOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {catOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[600px] bg-white border border-gray-200 rounded-2xl shadow-xl p-6 z-50">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Browse by category</p>
                <div className="grid grid-cols-5 gap-3">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.name}
                      onClick={() => {
                        setCatOpen(false)
                        router.push(`/employees?category=${encodeURIComponent(cat.name)}`)
                      }}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-blue-400 hover:bg-blue-50 transition-all text-center group"
                    >
                      <span className="text-2xl">{cat.emoji}</span>
                      <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700 leading-tight">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right */}
        <div className="hidden md:flex items-center ml-auto shrink-0">
          <Link
            href="/submit"
            className="px-4 py-2 bg-blue-700 text-white rounded-full font-semibold hover:bg-blue-800 transition-colors text-sm"
          >
            For Creators / List AI Employee
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg ml-auto"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-14 left-0 right-0 bg-white border-b border-gray-200 shadow-lg md:hidden z-50">
          <nav className="flex flex-col px-4 py-4 gap-4 text-sm font-medium text-gray-700">
            <Link href="/employees" onClick={() => setMobileOpen(false)} className="hover:text-blue-700">Find AI Employees</Link>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">Categories</p>
            {CATEGORIES.map(cat => (
              <Link
                key={cat.name}
                href={`/employees?category=${encodeURIComponent(cat.name)}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 hover:text-blue-700 pl-2"
              >
                <span>{cat.emoji}</span> {cat.name}
              </Link>
            ))}
            <hr className="border-gray-100" />
            <Link
              href="/submit"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2 text-center text-white bg-blue-700 rounded-full hover:bg-blue-800"
            >
              For Creators / List AI Employee
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
