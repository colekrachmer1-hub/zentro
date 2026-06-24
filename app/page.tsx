import Link from 'next/link'

export const dynamic = 'force-dynamic'

const HERO_CARDS = [
  { name: 'AI SDR', provider: 'Built by Lindy AI', category: 'Sales', rating: 4.7, price: '$79/mo' },
  { name: 'AI Lead Agent', provider: 'Built by Monday CRM', category: 'Sales', rating: 4.8, price: '$49/mo' },
  { name: 'AI Product Scout', provider: 'Built by SellerOps', category: 'Amazon FBA', rating: 4.9, price: '$99/mo' },
  { name: 'AI Recruiter', provider: 'Built by HirePilot', category: 'Recruiting', rating: 4.7, price: '$129/mo' },
]

const CATEGORIES = [
  { name: 'Sales', emoji: '📞', count: 24 },
  { name: 'Marketing', emoji: '📣', count: 18 },
  { name: 'Research', emoji: '🔍', count: 15 },
  { name: 'Amazon FBA', emoji: '📦', count: 12 },
  { name: 'Recruiting', emoji: '👥', count: 9 },
  { name: 'Customer Support', emoji: '💬', count: 21 },
  { name: 'Operations', emoji: '⚙️', count: 11 },
  { name: 'Finance', emoji: '💰', count: 8 },
  { name: 'Real Estate', emoji: '🏠', count: 7 },
  { name: 'Productivity', emoji: '⚡', count: 13 },
  { name: 'AI Assistants', emoji: '🤖', count: 0 },
  { name: 'Lead Generation', emoji: '🎯', count: 0 },
  { name: 'Content Creation', emoji: '✍️', count: 0 },
]

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating)
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <svg key={s} className={`w-3.5 h-3.5 ${s <= full ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="border-b border-gray-100" style={{ background: 'linear-gradient(135deg, #dce9ff 0%, #eaf2ff 40%, #f5f9ff 70%, #ffffff 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: copy + search */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Find AI Employees<br />For Your Business
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Hire specialized AI workers for sales, marketing, recruiting, research, Amazon FBA, customer support, operations, and more.
            </p>

            {/* Search bar */}
            <form action="/employees" method="GET">
              <div className="flex bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
                <div className="flex items-center flex-1 px-4 py-3.5 gap-3">
                  <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
                  </svg>
                  <input
                    name="q"
                    type="text"
                    placeholder="Search AI roles, skills, or companies"
                    className="flex-1 outline-none text-gray-900 text-sm bg-transparent placeholder-gray-400"
                  />
                </div>
                <button type="submit" className="bg-blue-700 text-white px-7 py-3.5 font-semibold hover:bg-blue-800 transition-colors text-sm shrink-0">
                  Search
                </button>
              </div>
            </form>

            {/* Creator CTA */}
            <div className="mt-4 flex items-center gap-3">
              <p className="text-sm text-gray-500">Built an AI employee?</p>
              <Link href="/submit" className="text-sm font-semibold text-blue-700 hover:underline">
                List it for free →
              </Link>
            </div>
          </div>

          {/* Right: preview cards */}
          <div className="hidden lg:flex flex-col gap-3">
            {HERO_CARDS.map(card => (
              <div key={card.name} className="bg-white border border-gray-200 rounded-lg px-5 py-4 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-gray-900 text-sm">{card.name}</p>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">{card.category}</span>
                  </div>
                  <p className="text-xs text-gray-500">{card.provider}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Stars rating={card.rating} />
                    <span className="text-xs font-semibold text-gray-700">{card.rating}</span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-bold text-gray-900 text-sm">{card.price}</p>
                  <span className="text-xs text-green-600 font-medium">Remote</span>
                </div>
              </div>
            ))}
            <Link href="/employees" className="text-center text-xs text-blue-700 hover:underline mt-1">
              View all AI employees →
            </Link>
          </div>
        </div>
      </section>


      {/* ── EXPLORE BY CATEGORY ── */}
      <section className="px-4 py-12 border-b border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Explore by Category</h2>
          <p className="text-sm text-gray-500 mb-7">Find the right AI employee for every function in your business.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.name}
                href={`/employees?category=${encodeURIComponent(cat.name)}`}
                className="flex flex-col items-center gap-2 p-5 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-sm transition-all text-center group"
              >
                <span className="text-3xl">{cat.emoji}</span>
                <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">{cat.name}</span>
                <span className="text-xs text-gray-400">{cat.count} employees</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW HIRING WORKS ── */}
      <section className="px-4 py-14 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How Hiring Works</h2>
          <p className="text-sm text-gray-500 mb-10">From search to hire in four steps.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Search for the role you need', desc: 'Browse by role, category, or keyword — just like searching for a job candidate.' },
              { step: '2', title: 'Compare AI employees', desc: 'Side-by-side comparison of providers, pricing, ratings, and capabilities.' },
              { step: '3', title: 'Review demos, pricing, and outcomes', desc: 'Read what the AI employee does, who it\'s for, and what results businesses are seeing.' },
              { step: '4', title: 'Hire the best AI employee', desc: 'Click "Hire Employee" and you\'re taken directly to the provider\'s platform to get started.' },
            ].map(item => (
              <div key={item.step} className="flex gap-4">
                <div className="w-9 h-9 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1.5 text-sm leading-snug">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR AI EMPLOYEE CREATORS ── */}
      <section className="px-4 py-16" style={{ background: 'linear-gradient(135deg, #dce9ff 0%, #eaf2ff 50%, #f5f9ff 100%)' }}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 max-w-xl">
            <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-3">For AI Employee Creators</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built an AI Employee?</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Get discovered by founders, agencies, consultants, Amazon sellers, and business owners actively searching for AI workers. No audience required — just list your AI employee and start getting customers.
            </p>
            <div className="space-y-3 mb-8">
              {['Get customers without building an audience', 'Appear in front of buyers already searching', 'Build credibility through ratings and reviews', 'Free to list during our founding creator phase'].map(b => (
                <div key={b} className="flex items-center gap-3 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {b}
                </div>
              ))}
            </div>
            <Link
              href="/submit"
              className="inline-block px-7 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors text-sm"
            >
              List Your AI Employee →
            </Link>
          </div>

          {/* Stats card */}
          <div className="lg:w-80 bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <p className="font-bold text-gray-900 text-lg mb-6">Why creators choose Zentro</p>
            <div className="grid grid-cols-2 gap-5 mb-7">
              {[
                { stat: '10,000+', label: 'Businesses searching monthly' },
                { stat: 'Free', label: 'Always free to list' },
                { stat: '10', label: 'Categories with active buyers' },
                { stat: '24hr', label: 'Average listing review time' },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-2xl font-bold text-blue-700 leading-none mb-1">{item.stat}</p>
                  <p className="text-xs text-gray-500 leading-snug">{item.label}</p>
                </div>
              ))}
            </div>
            <Link href="/submit" className="block w-full text-center py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors text-sm">
              List Your AI Employee
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
