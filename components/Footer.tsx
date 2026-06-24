import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="font-extrabold text-2xl tracking-tight text-white mb-3">
              ZENTR<span className="text-blue-400">O</span>
            </div>
            <p className="text-sm leading-relaxed">
              The marketplace for AI employees. Discover specialized AI workers built by experts.
            </p>
          </div>

          {/* Marketplace */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Marketplace</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/explore" className="hover:text-white transition-colors">Explore</Link></li>
              <li><Link href="/submit" className="hover:text-white transition-colors">Submit Employee</Link></li>
              <li><Link href="/explore?category=Sales" className="hover:text-white transition-colors">Sales AI</Link></li>
              <li><Link href="/explore?category=Marketing" className="hover:text-white transition-colors">Marketing AI</Link></li>
              <li><Link href="/explore?category=Research" className="hover:text-white transition-colors">Research AI</Link></li>
            </ul>
          </div>

          {/* Creators */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Creators</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/submit" className="hover:text-white transition-colors">List Your AI Employee</Link></li>
              <li><Link href="/creators" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/creators#faq" className="hover:text-white transition-colors">Creator FAQ</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>© 2025 Zentro. All rights reserved.</p>
          <p className="text-slate-500">Built for the AI-native future of work.</p>
        </div>
      </div>
    </footer>
  )
}
