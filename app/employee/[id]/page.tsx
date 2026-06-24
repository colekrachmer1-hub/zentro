import { createClient } from '@/lib/supabase/server'
import { MOCK_LISTINGS, Listing } from '@/lib/mock-listings'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

function Stars({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' }) {
  const full = Math.round(rating)
  const sz = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <svg key={s} className={`${sz} ${s <= full ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  )
}

export default async function EmployeePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let listing: Listing | Record<string, any> | null = null

  // Check mock first
  const mockMatch = MOCK_LISTINGS.find(m => m.id === id)
  if (mockMatch) {
    listing = mockMatch
  } else {
    try {
      const supabase = await createClient()
      const { data } = await supabase.from('listings').select('*').eq('id', id).single()
      listing = data
    } catch {
      listing = null
    }
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-[#f3f2f0] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">🤖</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">AI Employee Not Found</h1>
          <p className="text-gray-500 mb-6">This listing may have been removed or the link is incorrect.</p>
          <Link href="/employees" className="inline-flex px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors text-sm">
            Browse AI Employees
          </Link>
        </div>
      </div>
    )
  }

  const whatItDoes: string[] = listing.what_it_does
    ? listing.what_it_does.split('\n').filter(Boolean)
    : []

  const typicalOutcomes: string[] = listing.typical_outcomes || []
  const skills: string[] = listing.skills || listing.tags || []

  let creatorHostname = ''
  if (listing.creator_website) {
    try { creatorHostname = new URL(listing.creator_website).hostname } catch { creatorHostname = listing.creator_website }
  }

  return (
    <div className="min-h-screen bg-[#f3f2f0]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/employees" className="hover:text-blue-700 transition-colors">AI Employees</Link>
          <span>›</span>
          <Link href={`/employees?category=${encodeURIComponent(listing.category)}`} className="hover:text-blue-700 transition-colors">{listing.category}</Link>
          <span>›</span>
          <span className="text-gray-900 truncate">{listing.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-5">
            {/* Header card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{listing.name}</h1>
              <p className="text-blue-700 font-medium text-sm mb-2">{listing.creator_name}</p>

              {listing.rating > 0 && (
                <div className="flex items-center gap-2 mb-3">
                  <Stars rating={listing.rating} />
                  <span className="text-sm font-semibold text-gray-800">{Number(listing.rating).toFixed(1)}</span>
                  {listing.review_count > 0 && (
                    <span className="text-sm text-blue-700">{listing.review_count} reviews</span>
                  )}
                </div>
              )}

              <div className="flex items-center gap-3 text-sm text-gray-600 mb-5">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  Remote · Online
                </span>
                {listing.pricing && (
                  <><span className="text-gray-300">·</span><span className="font-medium">{listing.pricing}</span></>
                )}
              </div>

              {listing.external_link && (
                <a
                  href={listing.external_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors text-sm"
                >
                  Hire Employee →
                </a>
              )}
            </div>

            {/* Job details */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="font-bold text-gray-900 mb-4">Job details</h2>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: 'Role', value: listing.category },
                  { label: 'Job type', value: 'AI Employee' },
                  { label: 'Remote', value: 'Yes — works online' },
                  { label: 'Experience needed', value: 'No experience needed' },
                  { label: 'Price', value: listing.pricing || 'Contact for pricing' },
                ].map(item => (
                  <div key={item.label}>
                    <p className="text-gray-500 text-xs mb-0.5">{item.label}</p>
                    <p className="font-medium text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            {listing.full_description && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="font-bold text-gray-900 mb-3">About this AI employee</h2>
                <p className="text-sm text-gray-700 leading-relaxed">{listing.full_description}</p>
              </div>
            )}

            {/* What it does */}
            {whatItDoes.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="font-bold text-gray-900 mb-4">What it does</h2>
                <ul className="space-y-2.5">
                  {whatItDoes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Who it's for */}
            {listing.who_its_for && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="font-bold text-gray-900 mb-3">Who it&apos;s for</h2>
                <p className="text-sm text-gray-700 leading-relaxed">{listing.who_its_for}</p>
              </div>
            )}

            {/* Typical outcomes */}
            {typicalOutcomes.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="font-bold text-gray-900 mb-4">Typical outcomes</h2>
                <ul className="space-y-2.5">
                  {typicalOutcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="text-green-600 font-bold mt-0.5 shrink-0">↑</span>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="font-bold text-gray-900 mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill: string) => (
                    <span key={skill} className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-full">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Hire card */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 sticky top-20">
              <p className="text-xl font-bold text-gray-900 mb-0.5">{listing.pricing || 'Contact for pricing'}</p>
              <p className="text-xs text-gray-400 mb-4">Billed through provider&apos;s platform</p>

              {listing.external_link && (
                <a
                  href={listing.external_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors text-sm mb-3"
                >
                  Hire Employee →
                </a>
              )}

              <div className="flex gap-3 text-xs text-blue-700 justify-center">
                <button className="hover:underline">Save</button>
                <span className="text-gray-300">·</span>
                <button className="hover:underline">Share</button>
              </div>

              <hr className="border-gray-100 my-4" />

              {/* Provider */}
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-2">Provider</p>
                <p className="font-semibold text-gray-900 text-sm">{listing.creator_name}</p>
                {listing.creator_website && creatorHostname && (
                  <a href={listing.creator_website} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-700 hover:underline block truncate mt-0.5">
                    {creatorHostname}
                  </a>
                )}
              </div>

              <hr className="border-gray-100 my-4" />

              {/* Tags */}
              {listing.tags && listing.tags.length > 0 && (
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-2">Tags</p>
                  <div className="flex flex-wrap gap-1.5">
                    {listing.tags.map((tag: string) => (
                      <span key={tag} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded border border-gray-100">{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {listing.demo_video_url && (
                <>
                  <hr className="border-gray-100 my-4" />
                  <a href={listing.demo_video_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-700 hover:underline">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Watch Demo
                  </a>
                </>
              )}
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-gray-400 text-center px-2">
              Zentro connects you to this provider&apos;s platform. All pricing and transactions are handled by the provider.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
