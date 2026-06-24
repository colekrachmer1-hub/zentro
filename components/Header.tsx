'use client'

import { useState } from 'react'
import { Logo } from '@/components/Logo'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 h-16 flex items-center">
      <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between">
        {/* Logo */}
        <Logo href="/" iconSize={32} />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/explore" className="hover:text-gray-900 transition-colors">Explore</Link>
          <Link href="/creators" className="hover:text-gray-900 transition-colors">For Creators</Link>
          <Link href="/submit" className="hover:text-gray-900 transition-colors">Submit Employee</Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            List Your AI Employee
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
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

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-lg md:hidden">
          <nav className="flex flex-col px-4 py-4 gap-4 text-sm font-medium text-gray-700">
            <Link href="/explore" onClick={() => setMobileOpen(false)} className="hover:text-blue-600">Explore</Link>
            <Link href="/creators" onClick={() => setMobileOpen(false)} className="hover:text-blue-600">For Creators</Link>
            <Link href="/submit" onClick={() => setMobileOpen(false)} className="hover:text-blue-600">Submit Employee</Link>
            <hr className="border-gray-100" />
            <Link href="/login" onClick={() => setMobileOpen(false)} className="hover:text-blue-600">Sign In</Link>
            <Link
              href="/submit"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              List Your AI Employee
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
