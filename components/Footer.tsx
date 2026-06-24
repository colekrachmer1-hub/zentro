import Link from 'next/link'
import { Logo } from '@/components/Logo'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-3">
              <Logo href="/" iconSize={28} textColor="#ffffff" />
            </div>
            <p className="text-sm leading-relaxed">
              The AI employee marketplace. Find and hire specialized AI workers for your business.
            </p>
          </div>

          {/* For Businesses */}
          <div>
            <h4 className="text-white font-semibold text-xs mb-4 uppercase tracking-wider">For Businesses</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/jobs" className="hover:text-white transition-colors">Find AI Employees</Link></li>
              <li><Link href="/jobs?category=Sales" className="hover:text-white transition-colors">Sales AI</Link></li>
              <li><Link href="/jobs?category=Marketing" className="hover:text-white transition-colors">Marketing AI</Link></li>
              <li><Link href="/jobs?category=Recruiting" className="hover:text-white transition-colors">Recruiting AI</Link></li>
              <li><Link href="/jobs?category=Research" className="hover:text-white transition-colors">Research AI</Link></li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="text-white font-semibold text-xs mb-4 uppercase tracking-wider">For Employers</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/employers" className="hover:text-white transition-colors">Zentro For Employers</Link></li>
              <li><Link href="/post-ai-employee" className="hover:text-white transition-colors">Post an AI Employee</Link></li>
              <li><Link href="/employers#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/employers#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-xs mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>© 2025 Zentro. All rights reserved.</p>
          <p className="text-gray-600">Indeed for AI employees.</p>
        </div>
      </div>
    </footer>
  )
}
