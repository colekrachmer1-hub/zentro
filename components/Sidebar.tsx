'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Logo } from '@/components/Logo'
import clsx from 'clsx'

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: '▦' },
  { href: '/employees', label: 'Employees', icon: '👥' },
  { href: '/tasks', label: 'Tasks', icon: '⚡' },
  { href: '/org', label: 'Org Chart', icon: '🌐' },
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
    <aside className="fixed left-0 top-0 h-screen w-56 bg-gray-900 flex flex-col z-40">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-800">
        <Logo href="/dashboard" iconSize={28} textColor="#ffffff" />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {nav.map((item) => {
          const active = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                active
                  ? 'bg-brand-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              )}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-gray-800 space-y-1">
        <Link
          href="/employees/new"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-brand-400 hover:text-brand-300 hover:bg-gray-800 transition-colors"
        >
          <span>＋</span>
          New Employee
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
        >
          <span>⎋</span>
          Sign Out
        </button>
      </div>
    </aside>
  )
}
