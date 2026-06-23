'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Logo } from '@/components/Logo'
import clsx from 'clsx'

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: '▦' },
  { href: '/employees', label: 'AI Workers', icon: '👥' },
  { href: '/org', label: 'Departments', icon: '🏢' },
  { href: '/tasks', label: 'Tasks', icon: '⚡' },
  { href: '/activity', label: 'Activity', icon: '📋' },
]

const comingSoon = [
  { label: 'Marketplace', icon: '🛒' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-gray-950 flex flex-col z-40 border-r border-white/5">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/5">
        <Logo href="/dashboard" iconSize={28} textColor="#ffffff" />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <div className="px-3 py-2 text-xs font-semibold text-white/20 uppercase tracking-widest">Workspace</div>
        {nav.map((item) => {
          const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                active
                  ? 'bg-blue-600 text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              )}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}

        <div className="pt-4 px-3 py-2 text-xs font-semibold text-white/20 uppercase tracking-widest">Coming Soon</div>
        {comingSoon.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-white/20 cursor-default"
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/5 space-y-0.5">
        <Link
          href="/employees/new"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-blue-400 hover:text-blue-300 hover:bg-white/5 transition-colors"
        >
          <span>＋</span>
          Add AI Worker
        </Link>
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-white/40 hover:text-white hover:bg-white/5 transition-colors"
        >
          <span>⚙</span>
          Settings
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-white/30 hover:text-white hover:bg-white/5 transition-colors"
        >
          <span>⎋</span>
          Sign Out
        </button>
      </div>
    </aside>
  )
}
