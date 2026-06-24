'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/Logo'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

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
          <Link href="/submit" className="hover:text-blue-700 transition-colors">List AI Employee</Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
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
            <Link href="/jobs" onClick={() => setMobileOpen(false)} className="hover:text-blue-700">Open Positions</Link>
            <Link href="/creators" onClick={() => setMobileOpen(false)} className="hover:text-blue-700">For Creators</Link>
            <Link href="/submit" onClick={() => setMobileOpen(false)} className="hover:text-blue-700">List AI Employee</Link>
            <hr className="border-gray-100" />
            <Link
              href="/post-job"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2 text-center text-white bg-blue-700 rounded-full hover:bg-blue-800"
            >
              Post a Job / List AI Employee
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
