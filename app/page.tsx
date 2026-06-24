import Link from 'next/link'
import ListingCard from '@/components/ListingCard'

const FEATURED_LISTINGS = [
  {
    id: 'sample-1',
    name: 'SalesBot Pro',
    category: 'Sales',
    short_description: 'AI-powered cold outreach specialist that books qualified meetings on autopilot for B2B companies.',
    creator_name: 'GrowthLabs AI',
    rating: 4.9,
    review_count: 128,
    pricing: '$97/mo',
    tags: ['Cold Email', 'B2B', 'Outreach'],
  },
  {
    id: 'sample-2',
    name: 'ContentGenius',
    category: 'Marketing',
    short_description: 'Generates high-converting blog posts, social content, and ad copy tuned to your brand voice.',
    creator_name: 'Spark Creative Studio',
    rating: 4.8,
    review_count: 94,
    pricing: '$79/mo',
    tags: ['SEO', 'Copywriting', 'Social Media'],
  },
  {
    id: 'sample-3',
    name: 'FBA Scout AI',
    category: 'Amazon FBA',
    short_description: 'Finds profitable product opportunities, analyzes competition, and tracks margins for Amazon sellers.',
    creator_name: 'SellerEdge Tools',
    rating: 4.7,
    review_count: 211,
    pricing: '$149/mo',
    tags: ['Product Research', 'Amazon', 'FBA'],
  },
  {
    id: 'sample-4',
    name: 'TalentMatcher AI',
    category: 'Recruiting',
    short_description: 'Screens resumes, ranks candidates, and drafts outreach messages to fill roles 5x faster.',
    creator_name: 'HireIQ Systems',
    rating: 4.8,
    review_count: 67,
    pricing: '$199/mo',
    tags: ['Resume Screening', 'Recruiting', 'HR'],
  },
  {
    id: 'sample-5',
    name: 'DealFinder Real Estate AI',
    category: 'Real Estate',
    short_description: 'Analyzes MLS data, identifies undervalued properties, and generates investment reports instantly.',
    creator_name: 'PropTech Labs',
    rating: 4.6,
    review_count: 45,
    pricing: '$129/mo',
    tags: ['MLS Analysis', 'Investment', 'Real Estate'],
  },
  {
    id: 'sample-6',
    name: 'DeepResearch AI',
    category: 'Research',
    short_description: 'Synthesizes academic papers, market reports, and web sources into clear executive summaries.',
    creator_name: 'Synthesis AI',
    rating: 4.9,
    review_count: 83,
    pricing: '$59/mo',
    tags: ['Research', 'Summarization', 'Analysis'],
  },
]

const CATEGORIES = [
  { name: 'Sales', emoji: '📞', count: 48, slug: 'Sales' },
  { name: 'Marketing', emoji: '📣', count: 62, slug: 'Marketing' },
  { name: 'Research', emoji: '🔍', count: 35, slug: 'Research' },
  { name: 'Amazon FBA', emoji: '📦', count: 29, slug: 'Amazon FBA' },
  { name: 'Recruiting', emoji: '👥', count: 41, slug: 'Recruiting' },
  { name: 'Real Estate', emoji: '🏠', count: 23, slug: 'Real Estate' },
  { name: 'Productivity', emoji: '⚡', count: 57, slug: 'Productivity' },
  { name: 'Support', emoji: '💬', count: 38, slug: 'Support' },
]

const MOCK_PREVIEW_CARDS = [
  {
    name: 'ColdEmail AI',
    category: 'Sales',
    tagline: 'Books 30+ meetings/mo on autopilot',
    price: '$97/mo',
    rating: 4.9,
    badge: 'bg-blue-100 text-blue-700',
  },
  {
    name: 'SEO Writer Pro',
    category: 'Marketing',
    tagline: 'Publishes 20 optimized posts/week',
    price: '$79/mo',
    rating: 4.8,
    badge: 'bg-pink-100 text-pink-700',
  },
  {
    name: 'FBA Scout AI',
    category: 'Amazon FBA',
    tagline: 'Find $10k/mo product opportunities',
    price: '$149/mo',
    rating: 4.7,
    badge: 'bg-orange-100 text-orange-700',
  },
]

export default function HomePage() {
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
            <Link
              href="/explore"
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-base"
            >
              Browse AI Employees
            </Link>
            <Link
              href="/submit"
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-colors text-base"
            >
              List Your AI Employee
            </Link>
          </div>

          <p className="text-sm text-gray-400">
            500+ AI employees listed · Trusted by 10,000+ businesses
          </p>

          {/* Hero visual: mock preview cards */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {MOCK_PREVIEW_CARDS.map((card, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-lg text-left"
                style={{ transform: i === 1 ? 'translateY(-8px)' : undefined }}
              >
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${card.badge}`}>
                  {card.category}
                </span>
                <h3 className="font-semibold text-gray-900 mt-3 mb-1">{card.name}</h3>
                <p className="text-xs text-gray-500 mb-3">{card.tagline}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-gray-900">{card.price}</span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span className="text-yellow-400">★</span>
                    {card.rating}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* For Buyers */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">B</span>
                For Buyers
              </h3>
              <div className="space-y-6">
                {[
                  { step: 1, icon: '🔍', title: 'Browse the Marketplace', desc: 'Search by category, use case, or keyword to find the right AI employee for your business.' },
                  { step: 2, icon: '👀', title: 'Review & Compare', desc: 'Read descriptions, check ratings, and compare pricing from expert AI creators.' },
                  { step: 3, icon: '🚀', title: 'Hire & Deploy', desc: 'Click Hire Employee to go directly to the creator\'s platform and get started immediately.' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-lg shrink-0 shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Step {item.step}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* For Creators */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">C</span>
                For Creators
              </h3>
              <div className="space-y-6">
                {[
                  { step: 1, icon: '✍️', title: 'Submit Your AI Employee', desc: 'Fill out a simple form describing your AI employee, its capabilities, pricing, and your external link.' },
                  { step: 2, icon: '✅', title: 'Get Approved in 24 Hours', desc: 'Our team reviews every submission to ensure quality. You\'ll hear back within one business day.' },
                  { step: 3, icon: '💰', title: 'Get Discovered & Earn', desc: 'Your listing goes live to thousands of businesses actively searching for AI employees like yours.' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-lg shrink-0 shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">Step {item.step}</span>
                      </div>
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
                  <div>
                    <div className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">{cat.name}</div>
                    <div className="text-xs text-gray-400">{cat.count} employees</div>
                  </div>
                </div>
                <svg className="w-4 h-4 text-gray-300 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured AI Employees</h2>
              <p className="text-gray-500">Top-rated AI workers trusted by thousands of businesses</p>
            </div>
            <Link href="/explore" className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm hidden md:block">
              View All AI Employees →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURED_LISTINGS.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link href="/explore" className="text-blue-600 font-medium hover:text-blue-700">
              View All AI Employees →
            </Link>
          </div>
        </div>
      </section>

      {/* WHY LIST ON ZENTRO */}
      <section className="bg-gray-950 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Sell Your AI Employee on Zentro</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Join hundreds of creators earning customers by listing their AI employees on the world&apos;s first AI employee marketplace.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: '🌍', title: 'Get Discovered', desc: 'Reach 10,000+ business owners actively searching for AI employees like yours.' },
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
            <Link
              href="/submit"
              className="inline-flex px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              Submit Your AI Employee
            </Link>
          </div>
        </div>
      </section>

      {/* COMING SOON */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Coming Soon</h3>
          <p className="text-gray-500 text-sm mb-8">We&apos;re building the full platform. Here&apos;s what&apos;s coming next.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              '✅ Verified AI Employees',
              '⭐ Reviews System',
              '🔗 Affiliate Tracking',
              '💸 Revenue Share',
              '📊 Creator Analytics',
              '🌟 Featured Listings',
              '🔔 Buyer Alerts',
              '📱 Mobile App',
            ].map((feature) => (
              <span
                key={feature}
                className="px-4 py-2 bg-gray-50 border border-gray-100 text-gray-700 text-sm rounded-full font-medium"
              >
                {feature}
              </span>
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
            Browse hundreds of specialized AI workers and find the right one for your business.
          </p>
          <Link
            href="/explore"
            className="inline-flex px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors text-base"
          >
            Browse AI Employees
          </Link>
        </div>
      </section>
    </div>
  )
}
