import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const SAMPLE_LISTINGS = [
  {
    id: 'sample-1',
    name: 'SalesBot Pro',
    category: 'Sales',
    short_description: 'AI-powered cold outreach specialist that books qualified meetings on autopilot for B2B companies.',
    full_description: 'SalesBot Pro is the most advanced AI cold outreach specialist on the market. It researches prospects, personalizes emails at scale, handles follow-ups automatically, and books meetings directly into your calendar. Built for B2B sales teams who need consistent pipeline without hiring more SDRs.',
    what_it_does: 'Research and qualify prospects from LinkedIn and company databases\nWrite personalized cold emails using company-specific context\nAutomate multi-step follow-up sequences\nHandle objections with AI-generated responses\nBook meetings directly into your calendar\nTrack open rates, reply rates, and booked meetings',
    who_its_for: 'B2B founders, sales teams, SDRs, and growth hackers who need to generate consistent pipeline without scaling headcount.',
    creator_name: 'GrowthLabs AI',
    creator_website: 'https://growthlabs.ai',
    rating: 4.9,
    review_count: 128,
    pricing: '$97/mo',
    external_link: 'https://growthlabs.ai/salesbot',
    demo_video_url: null,
    tags: ['Cold Email', 'B2B', 'Outreach'],
  },
  {
    id: 'sample-2',
    name: 'ContentGenius',
    category: 'Marketing',
    short_description: 'Generates high-converting blog posts, social content, and ad copy tuned to your brand voice.',
    full_description: 'ContentGenius learns your brand voice, studies your competitors, and produces SEO-optimized content at scale. From long-form blog posts to Twitter threads to Facebook ads, it handles every content format your marketing team needs.',
    what_it_does: 'Write SEO-optimized blog posts with keyword research built in\nGenerate social media content for LinkedIn, Twitter, Instagram\nCreate high-converting ad copy for Meta and Google\nRepurpose long-form content into multiple formats\nMaintain consistent brand voice across all content\nTrack content performance and iterate',
    who_its_for: 'Marketing teams, content agencies, and solo founders who need high-quality content at scale without hiring a full content team.',
    creator_name: 'Spark Creative Studio',
    creator_website: 'https://sparkcreative.io',
    rating: 4.8,
    review_count: 94,
    pricing: '$79/mo',
    external_link: 'https://sparkcreative.io/contentgenius',
    demo_video_url: null,
    tags: ['SEO', 'Copywriting', 'Social Media'],
  },
  {
    id: 'sample-3',
    name: 'FBA Scout AI',
    category: 'Amazon FBA',
    short_description: 'Finds profitable product opportunities, analyzes competition, and tracks margins for Amazon sellers.',
    full_description: 'FBA Scout AI scans millions of Amazon listings daily to surface high-demand, low-competition product opportunities with healthy margins. It does the product research that used to take you 40 hours per week in minutes.',
    what_it_does: 'Scan Amazon for high-demand, low-competition products\nAnalyze competitor listings and review counts\nCalculate accurate FBA margins including all fees\nTrack seasonal trends and demand patterns\nMonitor competitor price changes\nGenerate sourcing recommendations',
    who_its_for: 'Amazon FBA sellers at all levels — from beginners finding their first product to 7-figure sellers expanding their catalog.',
    creator_name: 'SellerEdge Tools',
    creator_website: 'https://selleredge.io',
    rating: 4.7,
    review_count: 211,
    pricing: '$149/mo',
    external_link: 'https://selleredge.io/fba-scout',
    demo_video_url: null,
    tags: ['Product Research', 'Amazon', 'FBA'],
  },
  {
    id: 'sample-4',
    name: 'TalentMatcher AI',
    category: 'Recruiting',
    short_description: 'Screens resumes, ranks candidates, and drafts outreach messages to fill roles 5x faster.',
    full_description: 'TalentMatcher AI eliminates the painful parts of recruiting — reading hundreds of resumes, writing outreach messages, and tracking applicants. It surfaces the best candidates and keeps your pipeline moving.',
    what_it_does: 'Parse and score resumes against your job requirements\nRank candidates with detailed match explanations\nDraft personalized outreach messages for top candidates\nSchedule screening calls automatically\nTrack candidate pipeline status\nGenerate interview question suggestions',
    who_its_for: 'HR teams, recruiters, and founders who are drowning in applicants and need to find the best candidates faster.',
    creator_name: 'HireIQ Systems',
    creator_website: 'https://hireiq.ai',
    rating: 4.8,
    review_count: 67,
    pricing: '$199/mo',
    external_link: 'https://hireiq.ai/talentmatcher',
    demo_video_url: null,
    tags: ['Resume Screening', 'Recruiting', 'HR'],
  },
  {
    id: 'sample-5',
    name: 'DealFinder Real Estate AI',
    category: 'Real Estate',
    short_description: 'Analyzes MLS data, identifies undervalued properties, and generates investment reports instantly.',
    full_description: 'DealFinder AI connects to MLS data and public records to surface investment opportunities before they hit the mainstream market. It generates detailed investment analysis reports in seconds.',
    what_it_does: 'Connect to MLS data and scan for undervalued properties\nCalculate cap rates, cash-on-cash returns, and IRR\nGenerate professional investment analysis reports\nMonitor neighborhoods for price movement\nIdentify distressed properties and motivated sellers\nTrack your deal pipeline',
    who_its_for: 'Real estate investors, wholesalers, and agents who want to find more deals with less manual research.',
    creator_name: 'PropTech Labs',
    creator_website: 'https://proptechlabs.co',
    rating: 4.6,
    review_count: 45,
    pricing: '$129/mo',
    external_link: 'https://proptechlabs.co/dealfinder',
    demo_video_url: null,
    tags: ['MLS Analysis', 'Investment', 'Real Estate'],
  },
  {
    id: 'sample-6',
    name: 'DeepResearch AI',
    category: 'Research',
    short_description: 'Synthesizes academic papers, market reports, and web sources into clear executive summaries.',
    full_description: 'DeepResearch AI reads hundreds of sources so you don\'t have to. It synthesizes academic papers, market research reports, news articles, and competitor content into clear, actionable executive summaries.',
    what_it_does: 'Ingest and analyze academic papers and market reports\nSynthesize multiple sources into coherent summaries\nExtract key statistics and findings with citations\nCompare competing viewpoints on a topic\nGenerate literature reviews and state-of-field reports\nAnswer specific research questions with cited sources',
    who_its_for: 'Consultants, analysts, academics, investors, and executives who need deep research without spending days in the library.',
    creator_name: 'Synthesis AI',
    creator_website: 'https://synthesis.ai',
    rating: 4.9,
    review_count: 83,
    pricing: '$59/mo',
    external_link: 'https://synthesis.ai/deepresearch',
    demo_video_url: null,
    tags: ['Research', 'Summarization', 'Analysis'],
  },
  {
    id: 'sample-7',
    name: 'InboxZero AI',
    category: 'Productivity',
    short_description: 'Manages your email inbox, drafts replies, unsubscribes from junk, and keeps you at inbox zero every day.',
    full_description: 'InboxZero AI sits in your inbox and handles the flood of email so you can focus on high-value work. It drafts replies, categorizes messages, unsubscribes from newsletters, and ensures nothing important falls through the cracks.',
    what_it_does: 'Categorize and prioritize incoming emails automatically\nDraft replies in your writing style for your approval\nUnsubscribe from marketing emails and newsletters\nSummarize long email threads into key points\nFlag urgent messages that need your attention\nSchedule send times for optimal reply rates',
    who_its_for: 'Executives, founders, and anyone who spends more than 2 hours per day managing email.',
    creator_name: 'FlowState Apps',
    creator_website: 'https://flowstate.app',
    rating: 4.7,
    review_count: 156,
    pricing: '$49/mo',
    external_link: 'https://flowstate.app/inboxzero',
    demo_video_url: null,
    tags: ['Email', 'Productivity', 'Automation'],
  },
  {
    id: 'sample-8',
    name: 'SupportGenie AI',
    category: 'Support',
    short_description: 'Handles 80% of customer support tickets automatically with accurate, on-brand responses 24/7.',
    full_description: 'SupportGenie AI trains on your knowledge base, past tickets, and product documentation to handle customer questions with the accuracy and tone of your best support rep — at any hour, at any volume.',
    what_it_does: 'Train on your knowledge base and past support tickets\nRespond to customer questions 24/7 automatically\nEscalate complex issues to human agents\nLearn from every interaction to improve over time\nGenerate weekly support analytics reports\nDraft suggested responses for human review',
    who_its_for: 'SaaS companies, e-commerce brands, and any business getting more support tickets than their team can handle.',
    creator_name: 'CX Innovations',
    creator_website: 'https://cxinnovations.io',
    rating: 4.8,
    review_count: 302,
    pricing: '$149/mo',
    external_link: 'https://cxinnovations.io/supportgenie',
    demo_video_url: null,
    tags: ['Customer Support', 'Helpdesk', 'Automation'],
  },
  {
    id: 'sample-9',
    name: 'LinkedInLeads AI',
    category: 'Sales',
    short_description: 'Automates LinkedIn prospecting, connection requests, and follow-up sequences for consistent pipeline growth.',
    full_description: 'LinkedInLeads AI builds your LinkedIn pipeline on autopilot. It identifies your ideal prospects, sends personalized connection requests, and runs nurture sequences that convert connections into calls.',
    what_it_does: 'Identify ideal prospects using LinkedIn Sales Navigator filters\nSend personalized connection requests at scale\nAutomate follow-up message sequences\nTrack connection and reply rates by sequence\nIntegrate with your CRM to push qualified leads\nA/B test message copy to maximize conversion',
    who_its_for: 'B2B sales teams, consultants, coaches, and anyone who sells to professionals and wants more pipeline from LinkedIn.',
    creator_name: 'ProspectHQ',
    creator_website: 'https://prospecthq.com',
    rating: 4.6,
    review_count: 89,
    pricing: '$79/mo',
    external_link: 'https://prospecthq.com/linkedin-leads',
    demo_video_url: null,
    tags: ['LinkedIn', 'Prospecting', 'Sales'],
  },
  {
    id: 'sample-10',
    name: 'AdOptimizer AI',
    category: 'Marketing',
    short_description: 'Continuously tests and optimizes your Meta and Google ad creatives to maximize ROAS automatically.',
    full_description: 'AdOptimizer AI connects to your Meta and Google Ads accounts and continuously tests creative variations, audiences, and bidding strategies to maximize your return on ad spend without requiring a dedicated media buyer.',
    what_it_does: 'Analyze existing ad performance and identify opportunities\nGenerate new creative variations for split testing\nAutomate audience segmentation and expansion\nOptimize bidding strategies in real-time\nPause underperforming ads automatically\nGenerate weekly performance reports with insights',
    who_its_for: 'E-commerce brands, DTC companies, and performance marketers who want to maximize ROAS without a full-time media buyer.',
    creator_name: 'PaidGrowth Labs',
    creator_website: 'https://paidgrowth.io',
    rating: 4.7,
    review_count: 71,
    pricing: '$199/mo',
    external_link: 'https://paidgrowth.io/adopter',
    demo_video_url: null,
    tags: ['Meta Ads', 'Google Ads', 'ROAS'],
  },
  {
    id: 'sample-11',
    name: 'ListingPro AI',
    category: 'Real Estate',
    short_description: 'Creates compelling MLS listings, virtual tour scripts, and buyer follow-up sequences for realtors.',
    full_description: 'ListingPro AI is built for real estate agents who want to spend less time writing and more time selling. It creates MLS listings that attract buyers, writes virtual tour scripts, and handles follow-up email sequences automatically.',
    what_it_does: 'Write compelling MLS property descriptions in minutes\nGenerate virtual tour narration scripts\nCreate social media posts for new listings\nWrite buyer and seller follow-up email sequences\nDraft offer letters and negotiation emails\nGenerate neighborhood and market reports for clients',
    who_its_for: 'Real estate agents and brokers who want to close more deals without drowning in paperwork and writing.',
    creator_name: 'RealtyAI',
    creator_website: 'https://realty.ai',
    rating: 4.5,
    review_count: 38,
    pricing: '$89/mo',
    external_link: 'https://realty.ai/listingpro',
    demo_video_url: null,
    tags: ['MLS Listings', 'Real Estate', 'Copywriting'],
  },
  {
    id: 'sample-12',
    name: 'InventoryIQ',
    category: 'Amazon FBA',
    short_description: 'Predicts restock needs, monitors competitor pricing, and automates repricing to protect your Buy Box.',
    full_description: 'InventoryIQ is the all-in-one inventory intelligence system for Amazon sellers. It predicts when you\'ll run out of stock before you actually do, monitors competitor pricing 24/7, and automatically reprices your listings to protect your Buy Box.',
    what_it_does: 'Predict restock dates based on sales velocity and lead times\nMonitor competitor prices in real-time\nAutomate repricing to win and protect the Buy Box\nAlert you to sudden demand spikes or drops\nTrack inventory across multiple warehouses and FBA\nGenerate inventory health reports weekly',
    who_its_for: 'Amazon FBA sellers with active product catalogs who are losing the Buy Box or constantly running out of inventory.',
    creator_name: 'FBA Mastery Tools',
    creator_website: 'https://fbamastery.io',
    rating: 4.8,
    review_count: 142,
    pricing: '$99/mo',
    external_link: 'https://fbamastery.io/inventoryiq',
    demo_video_url: null,
    tags: ['Inventory', 'Repricing', 'Amazon'],
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

const categoryColors: Record<string, string> = {
  Sales: 'bg-blue-100 text-blue-700',
  Marketing: 'bg-pink-100 text-pink-700',
  Research: 'bg-purple-100 text-purple-700',
  'Amazon FBA': 'bg-orange-100 text-orange-700',
  Recruiting: 'bg-green-100 text-green-700',
  'Real Estate': 'bg-yellow-100 text-yellow-700',
  Productivity: 'bg-indigo-100 text-indigo-700',
  Support: 'bg-teal-100 text-teal-700',
}

type Listing = typeof SAMPLE_LISTINGS[0]

async function getListing(id: string): Promise<Listing | null> {
  // First try sample listings
  const sample = SAMPLE_LISTINGS.find((l) => l.id === id)
  if (sample) return sample

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', id)
      .single()
    if (error || !data) return null
    return data as Listing
  } catch {
    return null
  }
}

export default async function EmployeePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const listing = await getListing(id)

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🤖</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">AI Employee Not Found</h1>
          <p className="text-gray-500 mb-6">
            This listing may have been removed or the URL is incorrect.
          </p>
          <Link
            href="/explore"
            className="inline-flex px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
          >
            Browse All AI Employees
          </Link>
        </div>
      </div>
    )
  }

  const badgeColor = categoryColors[listing.category] || 'bg-gray-100 text-gray-700'
  const whatItDoesBullets = listing.what_it_does
    ? listing.what_it_does.split('\n').filter(Boolean)
    : []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/explore" className="hover:text-blue-600 transition-colors">Explore</Link>
          <span>›</span>
          <Link href={`/explore?category=${encodeURIComponent(listing.category)}`} className="hover:text-blue-600 transition-colors">
            {listing.category}
          </Link>
          <span>›</span>
          <span className="text-gray-900 font-medium truncate">{listing.name}</span>
        </nav>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${badgeColor}`}>
                  {listing.category}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.name}</h1>
              <p className="text-gray-500 mb-4">
                Built by{' '}
                {listing.creator_website ? (
                  <a
                    href={listing.creator_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {listing.creator_name}
                  </a>
                ) : (
                  <span className="font-medium text-gray-700">{listing.creator_name}</span>
                )}
              </p>
              {listing.rating > 0 && (
                <div className="flex items-center gap-2">
                  <StarRating rating={listing.rating} />
                  <span className="font-semibold text-gray-900">{listing.rating.toFixed(1)}</span>
                  <span className="text-gray-500 text-sm">({listing.review_count} review{listing.review_count !== 1 ? 's' : ''})</span>
                </div>
              )}
            </div>

            {/* About */}
            {listing.full_description && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3">About This AI Employee</h2>
                <p className="text-gray-600 leading-relaxed">{listing.full_description}</p>
              </div>
            )}

            {/* What It Does */}
            {whatItDoesBullets.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">What It Does</h2>
                <ul className="space-y-3">
                  {whatItDoesBullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600 text-sm">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Who It's For */}
            {listing.who_its_for && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Who It&apos;s For</h2>
                <p className="text-gray-600 leading-relaxed">{listing.who_its_for}</p>
              </div>
            )}

            {/* Example Outcomes */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Example Outcomes</h2>
              <ul className="space-y-3">
                {[
                  'Teams report saving 10+ hours per week after deploying this AI employee',
                  'Most customers see measurable ROI within the first 30 days',
                  'Scales to handle more volume without additional cost or headcount',
                ].map((outcome, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-green-500 font-bold mt-0.5">✓</span>
                    <span className="text-gray-600 text-sm">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Reviews
                {listing.review_count > 0 && (
                  <span className="ml-2 text-sm font-normal text-gray-500">({listing.review_count})</span>
                )}
              </h2>
              <div className="text-center py-8 text-gray-400">
                <svg className="w-10 h-10 mx-auto mb-3 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-sm">No reviews yet. Be the first to review this AI employee.</p>
                <p className="text-xs mt-2 text-gray-300">Reviews coming soon.</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="mt-8 lg:mt-0">
            <div className="sticky top-8 bg-white border border-gray-100 rounded-2xl p-6 space-y-5 shadow-sm">
              {/* Price */}
              <div>
                <div className="text-3xl font-bold text-gray-900">{listing.pricing}</div>
                <p className="text-xs text-gray-400 mt-1">Billed through creator&apos;s platform</p>
              </div>

              {/* Hire CTA */}
              {listing.external_link && (
                <a
                  href={listing.external_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Hire This Employee →
                </a>
              )}

              <div className="border-t border-gray-50 pt-4 space-y-4">
                {/* Creator */}
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Built by</p>
                  <p className="font-semibold text-gray-900">{listing.creator_name}</p>
                  {listing.creator_website && (
                    <a
                      href={listing.creator_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {listing.creator_website.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                </div>

                {/* Tags */}
                {listing.tags && listing.tags.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-2">Tags</p>
                    <div className="flex flex-wrap gap-1.5">
                      {listing.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-50 text-gray-600 px-2.5 py-1 rounded-full border border-gray-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Demo video */}
                {listing.demo_video_url && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-2">Demo</p>
                    <a
                      href={listing.demo_video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Watch Demo Video
                    </a>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-50 pt-4">
                <p className="text-xs text-gray-400 text-center">
                  Zentro connects you to this creator&apos;s platform. All transactions are handled by the creator.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
