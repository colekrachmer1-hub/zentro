import Link from 'next/link'

export const dynamic = 'force-dynamic'

const CATEGORIES = [
  { name: 'Sales', emoji: '📞' },
  { name: 'Marketing', emoji: '📣' },
  { name: 'Research', emoji: '🔍' },
  { name: 'Amazon FBA', emoji: '📦' },
  { name: 'Recruiting', emoji: '👥' },
  { name: 'Customer Support', emoji: '💬' },
  { name: 'Real Estate', emoji: '🏠' },
  { name: 'Productivity', emoji: '⚡' },
  { name: 'Finance', emoji: '💰' },
  { name: 'Operations', emoji: '⚙️' },
]

const SUGGESTED = ['AI SDR', 'AI Lead Agent', 'AI Product Scout', 'AI Content Creator', 'AI Recruiter', 'AI Research Analyst']

const EXPLORE_ROLES = [
  { title: 'AI Sales Development Rep', sub: 'Outbound prospecting and meeting booking', href: '/jobs?q=SDR' },
  { title: 'AI Lead Agent', sub: 'Pipeline management and lead qualification', href: '/jobs?q=Lead+Agent' },
  { title: 'AI Content Creator', sub: 'Social media, blogs, and ad copy at scale', href: '/jobs?q=Content+Creator' },
  { title: 'AI Product Researcher', sub: 'Amazon FBA sourcing and opportunity analysis', href: '/jobs?category=Amazon+FBA' },
  { title: 'AI Recruiter', sub: 'Sourcing, screening, and scheduling candidates', href: '/jobs?category=Recruiting' },
  { title: 'AI Research Analyst', sub: 'Market research and competitive intelligence', href: '/jobs?category=Research' },
  { title: 'AI Customer Support Agent', sub: '24/7 ticket resolution and customer service', href: '/jobs?category=Customer+Support' },
  { title: 'AI Real Estate Scout', sub: 'Deal finding, comps, and investment analysis', href: '/jobs?category=Real+Estate' },
  { title: 'AI Operations Manager', sub: 'Workflow automation and process management', href: '/jobs?category=Operations' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="bg-[#f3f2f0] border-b border-gray-200 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
            Find AI Employees For Your Business
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Search specialized AI workers for sales, marketing, research, recruiting, Amazon FBA, customer support, real estate, and more.
          </p>

          {/* Search bar */}
          <form action="/jobs" method="GET">
            <div className="flex flex-col sm:flex-row bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
              <div className="flex items-center flex-1 px-4 py-3 gap-3 border-b sm:border-b-0 sm:border-r border-gray-200">
                <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
                </svg>
                <input
                  name="q"
                  type="text"
                  placeholder="AI role, skill, or company"
                  className="flex-1 outline-none text-gray-900 text-sm bg-transparent placeholder-gray-400"
                />
              </div>
              <div className="flex items-center flex-1 px-4 py-3 gap-3">
                <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-gray-500 flex-1 text-left">Remote / Online</span>
              </div>
              <button type="submit" className="bg-blue-700 text-white px-8 py-3 font-semibold hover:bg-blue-800 transition-colors text-sm shrink-0">
                Search
              </button>
            </div>
          </form>

          {/* Suggested searches */}
          <div className="mt-5 text-left">
            <p className="text-xs text-gray-500 mb-2">Suggested:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED.map((s) => (
                <Link key={s} href={`/jobs?q=${encodeURIComponent(s)}`} className="text-sm text-blue-700 hover:underline bg-white border border-gray-200 px-3 py-1 rounded-full hover:border-blue-300 transition-colors">
                  {s}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-12 px-4 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Welcome to Zentro</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {CATEGORIES.map((cat) => (
              <Link key={cat.name} href={`/jobs?category=${encodeURIComponent(cat.name)}`} className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all text-center group">
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700 transition-colors">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-14 px-4 bg-[#f3f2f0] border-b border-gray-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How Zentro works</h2>
          <p className="text-gray-500 mb-10">Find and hire AI employees in three steps.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Search AI employees', desc: 'Browse by role, category, or keyword. Filter by price, rating, and use case to find the right AI worker for your business.' },
              { step: '2', title: 'Review & compare', desc: 'Read full descriptions, check ratings, see what each AI employee does, who it\'s for, and how much it costs.' },
              { step: '3', title: 'Hire & deploy', desc: 'Click "View AI Employee" to go directly to the provider\'s platform and get started immediately.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">{item.step}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE ROLES */}
      <section className="py-14 px-4 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Explore AI employee roles</h2>
          <p className="text-gray-500 mb-8">Specialized AI workers for every function in your business.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXPLORE_ROLES.map((role) => (
              <Link key={role.title} href={role.href} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all group">
                <div>
                  <div className="font-semibold text-sm text-gray-900 group-hover:text-blue-700 transition-colors">{role.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{role.sub}</div>
                </div>
                <svg className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/jobs" className="text-blue-700 font-medium text-sm hover:underline">Browse all AI employees →</Link>
          </div>
        </div>
      </section>

      {/* FOR EMPLOYERS */}
      <section className="py-14 px-4 bg-[#f3f2f0] border-b border-gray-200">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">Zentro For Employers</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Reach businesses looking to hire AI employees</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">Post your AI employee on Zentro and get discovered by founders, agencies, consultants, and business owners. Free during our founding creator phase.</p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/employers" className="px-5 py-2.5 bg-blue-700 text-white font-semibold rounded-full hover:bg-blue-800 transition-colors text-sm">Learn more</Link>
              <Link href="/post-ai-employee" className="px-5 py-2.5 border-2 border-blue-700 text-blue-700 font-semibold rounded-full hover:bg-blue-50 transition-colors text-sm">Post AI Employee</Link>
            </div>
          </div>
          <div className="md:w-72 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <p className="font-semibold text-gray-900 mb-4 text-sm">The businesses you&apos;re looking for are here.</p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">What AI employee are you listing?</label>
                <div className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-400 bg-gray-50">AI employee name or role</div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Where does it run?</label>
                <div className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-400 bg-gray-50">Platform, website, or link</div>
              </div>
              <Link href="/post-ai-employee" className="block w-full text-center py-2.5 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors text-sm">Post AI Employee</Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { stat: '500+', label: 'AI employees listed' },
              { stat: '10,000+', label: 'Businesses searching' },
              { stat: '100%', label: 'Free to browse' },
              { stat: '24hrs', label: 'Average review time' },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-2xl font-bold text-blue-700">{item.stat}</div>
                <div className="text-sm text-gray-500 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
