import Link from 'next/link'

export default function EmployersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="bg-blue-700 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          {/* Left */}
          <div className="flex-1">
            <p className="text-blue-200 text-sm font-semibold uppercase tracking-wider mb-4">Zentro For Employers</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              Reach Businesses Looking To Hire AI Employees
            </h1>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed max-w-xl">
              Post your AI employee on Zentro and get discovered by founders, agencies, consultants, and business owners who are actively searching for digital workers.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/post-ai-employee"
                className="px-7 py-3.5 bg-white text-blue-700 font-bold rounded-full hover:bg-blue-50 transition-colors text-sm"
              >
                Post an AI Employee
              </Link>
              <a
                href="#how-it-works"
                className="px-7 py-3.5 border-2 border-white text-white font-semibold rounded-full hover:bg-blue-600 transition-colors text-sm"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right: form card */}
          <div className="lg:w-80 bg-white rounded-xl shadow-xl p-6 text-gray-900 shrink-0">
            <h3 className="font-bold text-gray-900 mb-1">The businesses you&apos;re looking for are here.</h3>
            <p className="text-xs text-gray-500 mb-5">Post your AI employee in minutes. Free during founding creator phase.</p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">What AI employee are you listing?</label>
                <Link href="/post-ai-employee">
                  <div className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-400 hover:border-blue-400 cursor-pointer transition-colors">AI employee name or role</div>
                </Link>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Where does it run?</label>
                <Link href="/post-ai-employee">
                  <div className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-400 hover:border-blue-400 cursor-pointer transition-colors">Platform, website, or link</div>
                </Link>
              </div>
              <Link
                href="/post-ai-employee"
                className="block w-full text-center py-3 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition-colors text-sm"
              >
                Post AI Employee
              </Link>
            </div>
            <p className="text-xs text-gray-400 text-center mt-3">Free. No commission. Goes live within 24 hours.</p>
          </div>
        </div>
      </section>

      {/* WHY LIST */}
      <section className="py-16 px-4 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Why list on Zentro?</h2>
          <p className="text-gray-500 mb-10">Everything you need to grow your AI employee business.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🎯', title: 'Reach buyers already looking', desc: 'Zentro attracts founders, agencies, and business owners actively searching for AI workers — not just browsing.' },
              { icon: '🆓', title: 'Free early exposure', desc: 'List your AI employee at no cost during our founding creator phase. No commission, no catch, no credit card.' },
              { icon: '⭐', title: 'Build trust with ratings', desc: 'Verified ratings and reviews help buyers trust your AI and drive more conversions to your product.' },
              { icon: '📈', title: 'Send traffic to your product', desc: 'Every listing links directly to your platform, signup page, or sales page. You keep 100% of the customer.' },
              { icon: '🚫', title: 'No paid ads needed', desc: 'Get organic discovery from businesses searching for exactly what you\'ve built — without spending on ads.' },
              { icon: '📊', title: 'Creator analytics (coming)', desc: 'Track views, clicks, and conversions on your listings. Know exactly how Zentro is driving business.' },
            ].map(item => (
              <div key={item.title} className="border border-gray-200 rounded-lg p-5">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-16 px-4 bg-[#f3f2f0] border-b border-gray-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How it works</h2>
          <p className="text-gray-500 mb-10">Go from submission to live listing in under 24 hours.</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Post your AI employee', desc: 'Fill out a simple form with your AI employee\'s name, description, pricing, and your external link.' },
              { step: '2', title: 'Add details', desc: 'Include what it does, who it\'s for, a demo video, pricing, and tags to help buyers find your listing.' },
              { step: '3', title: 'Get reviewed', desc: 'Our team reviews every submission within 24 hours to ensure quality. You\'ll hear back quickly.' },
              { step: '4', title: 'Get discovered', desc: 'Your listing goes live and starts getting discovered by businesses looking to hire AI employees.' },
            ].map(item => (
              <div key={item.step} className="flex gap-4">
                <div className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">{item.step}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO SHOULD LIST */}
      <section className="py-16 px-4 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Who should list?</h2>
          <p className="text-gray-500 mb-8">Zentro is built for builders of AI-powered digital workers.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: '🤖', title: 'AI SaaS builders', desc: 'Products with AI employees built-in as their core feature.' },
              { icon: '⚡', title: 'Automation agencies', desc: 'Agencies that build custom AI systems for business clients.' },
              { icon: '🛠️', title: 'AI agent creators', desc: 'Developers building autonomous agents for specific job functions.' },
              { icon: '🔧', title: 'No-code builders', desc: 'Make.com, Zapier, and Lindy experts with packaged AI solutions.' },
              { icon: '💼', title: 'Consultants', desc: 'Experts who\'ve productized their knowledge into AI systems.' },
              { icon: '🎯', title: 'Niche specialists', desc: 'Domain experts building AI workers for their specific industry.' },
            ].map(item => (
              <div key={item.title} className="flex gap-3 p-4 border border-gray-200 rounded-lg">
                <span className="text-xl shrink-0">{item.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-16 px-4 bg-[#f3f2f0] border-b border-gray-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pricing</h2>
          <p className="text-gray-500 mb-10">Simple pricing. Free to start.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-blue-700 rounded-xl p-6">
              <div className="inline-block px-3 py-1 bg-blue-700 text-white text-xs font-bold rounded-full mb-4">Founding Creator</div>
              <p className="text-3xl font-bold text-gray-900 mb-1">Free</p>
              <p className="text-sm text-gray-500 mb-6">For a limited time during our launch phase</p>
              <ul className="space-y-2.5 mb-6">
                {['List up to 5 AI employees', 'Direct link to your product', 'Visible to all buyers', 'Review and rating system', 'Basic analytics (coming soon)'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/post-ai-employee" className="block w-full text-center py-3 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition-colors text-sm">
                Post Your First AI Employee
              </Link>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full mb-4">Coming Soon</div>
              <p className="text-xl font-bold text-gray-900 mb-4">Future plans will include</p>
              <ul className="space-y-2.5">
                {['Featured listings at the top of search', 'Verified creator badges', 'Affiliate tracking and commissions', 'Creator analytics dashboard', 'Revenue share opportunities', 'Priority review and support'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4 text-gray-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 px-4 bg-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to get discovered?</h2>
          <p className="text-gray-500 mb-8">Post your AI employee for free and start reaching businesses that are actively hiring.</p>
          <Link href="/post-ai-employee" className="inline-block px-8 py-4 bg-blue-700 text-white font-bold rounded-full hover:bg-blue-800 transition-colors text-sm">
            Post an AI Employee
          </Link>
        </div>
      </section>
    </div>
  )
}
