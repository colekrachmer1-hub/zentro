import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'

export const dynamic = 'force-dynamic'

const CATEGORIES = [
  { name: 'Sales', emoji: '📞', slug: 'Sales' },
  { name: 'Marketing', emoji: '📣', slug: 'Marketing' },
  { name: 'Research', emoji: '🔍', slug: 'Research' },
  { name: 'Amazon FBA', emoji: '📦', slug: 'Amazon FBA' },
  { name: 'Recruiting', emoji: '👥', slug: 'Recruiting' },
  { name: 'Real Estate', emoji: '🏠', slug: 'Real Estate' },
  { name: 'Productivity', emoji: '⚡', slug: 'Productivity' },
  { name: 'Support', emoji: '💬', slug: 'Support' },
]

async function getFeaturedListings() {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('listings')
      .select('*')
      .eq('status', 'approved')
      .order('hire_count', { ascending: false })
      .limit(6)
    return data || []
  } catch {
    return []
  }
}

export default async function HomePage() {
  const featured = await getFeaturedListings()

  return (
    <div>
      {/* HERO */}
      <section className="py-24 px-4 text-center bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full mb-8">
            🚀 The AI Employee Marketplace
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Hire AI Employees<br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Built By Experts
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Find specialized AI workers for sales, marketing, research, recruiting, Amazon FBA, real estate, and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link href="/explore" className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-base">
              Browse AI Employees
            </Link>
            <Link href="/submit" className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-colors text-base">
              List Your AI Employee
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">B</span>
                For Buyers
              </h3>
              <div className="space-y-6">
                {[
                  { step: 1, icon: '🔍', title: 'Browse the Marketplace', desc: 'Search by category, use case, or keyword to find the right AI employee for your business.' },
                  { step: 2, icon: '👀', title: 'Review & Compare', desc: 'Read descriptions, check ratings, and compare pricing from expert AI creators.' },
                  { step: 3, icon: '🚀', title: 'Hire & Deploy', desc: "Click Hire Employee to go directly to the creator's platform and get started immediately." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-lg shrink-0 shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Step {item.step}</span>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">C</span>
                For Creators
              </h3>
              <div className="space-y-6">
                {[
                  { step: 1, icon: '✍️', title: 'Submit Your AI Employee', desc: 'Fill out a simple form describing your AI employee, its capabilities, pricing, and your link.' },
                  { step: 2, icon: '✅', title: 'Get Approved in 24 Hours', desc: "Our team reviews every submission to ensure quality. You'll hear back within one business day." },
                  { step: 3, icon: '💰', title: 'Get Discovered & Earn', desc: 'Your listing goes live to thousands of businesses actively searching for AI employees like yours.' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-lg shrink-0 shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">Step {item.step}</span>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">Browse by Category</h2>
          <p className="text-center text-gray-500 mb-12">Find the right AI employee for every role in your business</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/explore?category=${encodeURIComponent(cat.slug)}`}
                className="group flex items-center justify-between bg-white border border-gray-100 rounded-2xl p-5 hover:border-blue-200 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cat.emoji}</span>
                  <div className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">{cat.name}</div>
                </div>
                <svg className="w-4 h-4 text-gray-300 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS — only shows if real listings exist */}
      {featured.length > 0 && (
        <section className="bg-gray-50 py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured AI Employees</h2>
                <p className="text-gray-500">Top-rated AI workers trusted by businesses worldwide</p>
              </div>
              <Link href="/explore" className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm hidden md:block">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHY LIST ON ZENTRO */}
      <section className="bg-gray-950 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Sell Your AI Employee on Zentro</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Join creators earning customers by listing their AI employees on the world&apos;s first AI employee marketplace.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: '🌍', title: 'Get Discovered', desc: 'Reach business owners actively searching for AI employees like yours.' },
              { icon: '🆓', title: 'Free Early Listing', desc: 'List your AI employee at no cost during our launch phase. No commission, no catch.' },
              { icon: '⭐', title: 'Build Trust with Reviews', desc: 'Verified reviews help buyers trust your AI and drive more conversions.' },
              { icon: '📈', title: 'Earn More Customers', desc: 'Our marketplace drives qualified traffic directly to your signup or sales page.' },
            ].map((benefit) => (
              <div key={benefit.title} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <div className="text-2xl mb-4">{benefit.icon}</div>
                <h3 className="text-white font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/submit" className="inline-flex px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
              Submit Your AI Employee
            </Link>
          </div>
        </div>
      </section>

      {/* COMING SOON */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Coming Soon</h3>
          <p className="text-gray-500 text-sm mb-8">We&apos;re building the full platform. Here&apos;s what&apos;s next.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['✅ Verified AI Employees', '⭐ Reviews System', '🔗 Affiliate Tracking', '💸 Revenue Share', '📊 Creator Analytics', '🌟 Featured Listings', '🔔 Buyer Alerts', '📱 Mobile App'].map((f) => (
              <span key={f} className="px-4 py-2 bg-gray-50 border border-gray-100 text-gray-700 text-sm rounded-full font-medium">{f}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to hire your first AI employee?
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">
            Browse specialized AI workers and find the right one for your business.
          </p>
          <Link href="/explore" className="inline-flex px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors text-base">
            Browse AI Employees
          </Link>
        </div>
      </section>
    </div>
  )
}
