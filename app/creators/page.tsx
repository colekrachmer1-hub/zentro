import Link from 'next/link'

const BENEFITS = [
  { icon: '👥', title: 'Get customers', desc: 'Reach businesses actively searching for AI employees — no cold outreach needed.' },
  { icon: '📣', title: 'Get exposure', desc: 'Appear in front of founders, agencies, Amazon sellers, consultants, and operators every day.' },
  { icon: '⭐', title: 'Get reviews', desc: 'Build your reputation through verified ratings and reviews from real business users.' },
  { icon: '🏆', title: 'Build credibility', desc: 'A Zentro listing signals legitimacy. Customers trust listed AI employees more.' },
  { icon: '🎯', title: 'Reach buyers already searching', desc: 'These aren\'t window shoppers — they\'re businesses actively looking to hire.' },
  { icon: '🆓', title: 'No audience required', desc: 'Free to list during our founding creator phase. No followers, no ad spend needed.' },
]

const WHO_SHOULD_LIST = [
  'AI agent builders', 'SaaS founders with AI products', 'No-code automation builders',
  'Freelancers who built AI tools', 'AI consultants', 'Indie hackers with AI products',
]

export default function CreatorsPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="border-b border-gray-100" style={{ background: 'linear-gradient(135deg, #dce9ff 0%, #eaf2ff 40%, #f5f9ff 70%, #ffffff 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-3">For AI Employee Creators</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              List Your<br />AI Employee
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Reach founders, agencies, consultants, Amazon sellers, recruiters, and business owners looking to hire AI workers. Free to list. No audience required.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/submit" className="px-7 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors text-sm">
                Submit AI Employee
              </Link>
              <Link href="/employees" className="px-7 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm">
                Browse the Marketplace
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { stat: '10,000+', label: 'Businesses searching monthly' },
              { stat: '8', label: 'Categories with active buyers' },
              { stat: '100%', label: 'Free to list' },
              { stat: '24hr', label: 'Average review time' },
            ].map(item => (
              <div key={item.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-center">
                <p className="text-2xl font-bold text-blue-700 mb-1">{item.stat}</p>
                <p className="text-xs text-gray-500 leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 py-14 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Why creators list on Zentro</h2>
          <p className="text-gray-500 text-sm mb-10">Everything you need to turn your AI employee into a business.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map(b => (
              <div key={b.title} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <span className="text-3xl block mb-3">{b.icon}</span>
                <h3 className="font-bold text-gray-900 mb-1.5 text-sm">{b.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-14 border-b border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How it works</h2>
          <p className="text-gray-500 text-sm mb-10">Get listed in minutes.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Submit your AI employee', desc: 'Fill out the listing form with your AI employee\'s details, pricing, and a link to your platform.' },
              { step: '2', title: 'We review it', desc: 'Our team reviews your submission within 24 hours to ensure quality and accuracy.' },
              { step: '3', title: 'Go live', desc: 'Your AI employee appears in search results, category pages, and is discoverable by businesses.' },
              { step: '4', title: 'Get hired', desc: 'Businesses find your listing, click "Hire Employee", and land on your platform ready to buy.' },
            ].map(item => (
              <div key={item.step} className="flex gap-4">
                <div className="w-9 h-9 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1.5 text-sm">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who should list */}
      <section className="px-4 py-14 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Who should list</h2>
          <p className="text-gray-500 text-sm mb-8">If you&apos;ve built an AI employee, Zentro is for you.</p>
          <div className="flex flex-wrap gap-3">
            {WHO_SHOULD_LIST.map(w => (
              <span key={w} className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-sm font-medium">
                {w}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 py-14 border-b border-gray-100 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pricing</h2>
          <p className="text-gray-500 text-sm mb-10">Simple and transparent.</p>
          <div className="bg-white border-2 border-blue-700 rounded-2xl p-8 shadow-sm max-w-sm mx-auto">
            <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-2">Founding Creator</p>
            <p className="text-5xl font-bold text-gray-900 mb-1">Free</p>
            <p className="text-sm text-gray-500 mb-6">Forever, for early creators</p>
            <ul className="text-sm text-gray-700 space-y-2.5 text-left mb-7">
              {['Full marketplace listing', 'Appear in all search results', 'Ratings and reviews', 'Direct link to your platform', 'Category page placement', 'Priority review within 24hrs'].map(f => (
                <li key={f} className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/submit" className="block w-full text-center py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors text-sm">
              Submit AI Employee
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to get discovered?</h2>
          <p className="text-gray-600 mb-8">Join the AI employee marketplace and start getting customers today.</p>
          <Link href="/submit" className="inline-block px-10 py-3.5 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors">
            Submit Your AI Employee →
          </Link>
        </div>
      </section>

    </div>
  )
}
