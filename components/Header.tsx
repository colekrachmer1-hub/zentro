'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { CATEGORIES } from '@/lib/mock-agents'

const NAV_CATEGORIES = CATEGORIES.filter(c => c !== 'All')

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [catOpen, setCatOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const catRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setCatOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  const navLink = (href: string, label: string) => {
    const active = pathname === href || pathname.startsWith(href + '/')
    return (
      <Link
        href={href}
        className={`text-sm font-medium transition-colors px-1 py-0.5 ${
          active ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        {label}
      </Link>
    )
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200/80 shadow-sm'
            : 'bg-white/0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm">
              <span className="text-white text-xs font-bold">Z</span>
            </div>
            <span className="font-semibold text-gray-900 text-base tracking-tight">Zentro</span>
          </Link>

          {/* Desktop Nav — centered */}
          <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            {navLink('/agents', 'Browse Agents')}

            {/* Categories dropdown */}
            <div className="relative" ref={catRef}>
              <button
                onClick={() => setCatOpen(v => !v)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                  catOpen ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Categories
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${catOpen ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {catOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-white rounded-2xl border border-gray-200 shadow-xl shadow-gray-200/60 p-3 z-50">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 pb-2">Browse by Category</p>
                  <div className="grid grid-cols-2 gap-0.5">
                    {NAV_CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => {
                          setCatOpen(false)
                          router.push(`/agents?category=${encodeURIComponent(cat)}`)
                        }}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-left w-full"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLink('/pricing', 'Pricing')}
          </nav>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Sign in
            </Link>
            <Link
              href="/agents"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition-colors"
            >
              Get Started
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-gray-700 transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-gray-700 transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-gray-700 transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-5 py-4 space-y-1">
            <Link href="/agents" className="block py-2.5 text-sm font-medium text-gray-700">Browse Agents</Link>
            <div className="py-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Categories</p>
              <div className="grid grid-cols-2 gap-1">
                {NAV_CATEGORIES.map(cat => (
                  <Link
                    key={cat}
                    href={`/agents?category=${encodeURIComponent(cat)}`}
                    className="text-sm text-gray-600 py-1.5"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/pricing" className="block py-2.5 text-sm font-medium text-gray-700">Pricing</Link>
            <div className="pt-3 flex flex-col gap-2">
              <Link href="/login" className="text-center py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl">Sign in</Link>
              <Link href="/agents" className="text-center py-2.5 text-sm font-semibold text-white bg-gray-900 rounded-xl">Get Started</Link>
            </div>
          </div>
        )}
      </header>
      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  )
}
