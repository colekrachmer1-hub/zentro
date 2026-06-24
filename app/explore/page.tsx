import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import ExploreFilters from '@/components/ExploreFilters'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const SAMPLE_LISTINGS = [
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
  {
    id: 'sample-7',
    name: 'InboxZero AI',
    category: 'Productivity',
    short_description: 'Manages your email inbox, drafts replies, unsubscribes from junk, and keeps you at inbox zero every day.',
    creator_name: 'FlowState Apps',
    rating: 4.7,
    review_count: 156,
    pricing: '$49/mo',
    tags: ['Email', 'Productivity', 'Automation'],
  },
  {
    id: 'sample-8',
    name: 'SupportGenie AI',
    category: 'Support',
    short_description: 'Handles 80% of customer support tickets automatically with accurate, on-brand responses 24/7.',
    creator_name: 'CX Innovations',
    rating: 4.8,
    review_count: 302,
    pricing: '$149/mo',
    tags: ['Customer Support', 'Helpdesk', 'Automation'],
  },
  {
    id: 'sample-9',
    name: 'LinkedInLeads AI',
    category: 'Sales',
    short_description: 'Automates LinkedIn prospecting, connection requests, and follow-up sequences for consistent pipeline growth.',
    creator_name: 'ProspectHQ',
    rating: 4.6,
    review_count: 89,
    pricing: '$79/mo',
    tags: ['LinkedIn', 'Prospecting', 'Sales'],
  },
  {
    id: 'sample-10',
    name: 'AdOptimizer AI',
    category: 'Marketing',
    short_description: 'Continuously tests and optimizes your Meta and Google ad creatives to maximize ROAS automatically.',
    creator_name: 'PaidGrowth Labs',
    rating: 4.7,
    review_count: 71,
    pricing: '$199/mo',
    tags: ['Meta Ads', 'Google Ads', 'ROAS'],
  },
  {
    id: 'sample-11',
    name: 'ListingPro AI',
    category: 'Real Estate',
    short_description: 'Creates compelling MLS listings, virtual tour scripts, and buyer follow-up sequences for realtors.',
    creator_name: 'RealtyAI',
    rating: 4.5,
    review_count: 38,
    pricing: '$89/mo',
    tags: ['MLS Listings', 'Real Estate', 'Copywriting'],
  },
  {
    id: 'sample-12',
    name: 'InventoryIQ',
    category: 'Amazon FBA',
    short_description: 'Predicts restock needs, monitors competitor pricing, and automates repricing to protect your Buy Box.',
    creator_name: 'FBA Mastery Tools',
    rating: 4.8,
    review_count: 142,
    pricing: '$99/mo',
    tags: ['Inventory', 'Repricing', 'Amazon'],
  },
]

interface SearchParams {
  category?: string
  q?: string
  sort?: string
}

async function getListings(searchParams: SearchParams) {
  const { category, q, sort } = searchParams
  try {
    const supabase = await createClient()
    let query = supabase.from('listings').select('*').eq('status', 'approved')
    if (category && category !== 'All') query = query.eq('category', category)
    if (q) query = query.ilike('name', `%${q}%`)
    if (sort === 'newest') query = query.order('created_at', { ascending: false })
    else if (sort === 'rating') query = query.order('rating', { ascending: false })
    else query = query.order('hire_count', { ascending: false })
    const { data, error } = await query
    if (error || !data?.length) {
      return filterSamples(SAMPLE_LISTINGS, category, q)
    }
    return data
  } catch {
    return filterSamples(SAMPLE_LISTINGS, category, q)
  }
}

function filterSamples(
  listings: typeof SAMPLE_LISTINGS,
  category?: string,
  q?: string
) {
  let filtered = listings
  if (category && category !== 'All') {
    filtered = filtered.filter((l) => l.category === category)
  }
  if (q) {
    const lower = q.toLowerCase()
    filtered = filtered.filter(
      (l) =>
        l.name.toLowerCase().includes(lower) ||
        l.short_description.toLowerCase().includes(lower) ||
        l.tags.some((t) => t.toLowerCase().includes(lower))
    )
  }
  return filtered
}

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const { category = '', q = '', sort = 'popular' } = params
  const listings = await getListings({ category, q, sort })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse AI Employees</h1>
          <p className="text-gray-500">
            Discover specialized AI workers built by experts — ready to hire today.
          </p>
        </div>

        {/* Filters — wrapped in Suspense for useSearchParams */}
        <Suspense fallback={<div className="h-24 bg-white rounded-xl animate-pulse mb-8" />}>
          <ExploreFilters selectedCategory={category} searchQuery={q} />
        </Suspense>

        {/* Result count */}
        <p className="text-sm text-gray-500 mb-6">
          <span className="font-semibold text-gray-900">{listings.length}</span> AI employee{listings.length !== 1 ? 's' : ''} available
          {category && category !== 'All' && (
            <span> in <span className="font-medium text-blue-600">{category}</span></span>
          )}
          {q && (
            <span> matching &ldquo;<span className="font-medium">{q}</span>&rdquo;</span>
          )}
        </p>

        {/* Grid */}
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No AI employees found</h3>
            <p className="text-gray-500 mb-6">
              Try a different search term or category.
            </p>
            <Link
              href="/explore"
              className="inline-flex px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
            >
              View All AI Employees
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
