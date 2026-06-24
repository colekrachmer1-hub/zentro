'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/Logo'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-6">
        {/* Logo + Nav */}
        <div className="flex items-center gap-8 min-w-0">
          <Logo href="/" iconSize={28} />
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link href="/jobs" className="hover:text-blue-700 transition-colors">AI Employee Jobs</Link>
            <Link href="/post-job" className="hover:text-blue-700 transition-colors">Post a Job</Link>
            <Link href="/employers" className="hover:text-blue-700 transition-colors">For Creators</Link>
          </nav>
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-4 text-sm font-medium shrink-0">
          <Link href="/post-job" className="text-gray-700 hover:text-blue-700 transition-colors">
            Post a Job
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            href="/post-ai-employee"
            className="px-4 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors text-sm font-semibold"
          >
            List AI Employee
          </Link>
        </div>

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
            <Link href="/jobs" onClick={() => setMobileOpen(false)} className="hover:text-blue-700">Find AI Employees</Link>
            <Link href="/employers" onClick={() => setMobileOpen(false)} className="hover:text-blue-700">For Employers</Link>
            <Link href="/post-ai-employee" onClick={() => setMobileOpen(false)} className="hover:text-blue-700">Post AI Employee</Link>
            <hr className="border-gray-100" />
            <Link
              href="/post-ai-employee"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2 text-center text-white bg-blue-700 rounded-full hover:bg-blue-800"
            >
              Post AI Employee
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
