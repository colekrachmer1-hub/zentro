import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

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

export default async function EmployeePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let listing: Record<string, any> | null = null
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('listings')
      .select('*')
      .eq('id', id)
      .single()
    listing = data
  } catch {
    listing = null
  }

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
  const whatItDoesBullets: string[] = listing.what_it_does
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
          <div className="lg:col-span-2 space-y-6">
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
                  <a href={listing.creator_website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                    {listing.creator_name}
                  </a>
                ) : (
                  <span className="font-medium text-gray-700">{listing.creator_name}</span>
                )}
              </p>
              {listing.rating > 0 && (
                <div className="flex items-center gap-2">
                  <StarRating rating={listing.rating} />
                  <span className="font-semibold text-gray-900">{Number(listing.rating).toFixed(1)}</span>
                  <span className="text-gray-500 text-sm">({listing.review_count} review{listing.review_count !== 1 ? 's' : ''})</span>
                </div>
              )}
            </div>

            {listing.full_description && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3">About This AI Employee</h2>
                <p className="text-gray-600 leading-relaxed">{listing.full_description}</p>
              </div>
            )}

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

            {listing.who_its_for && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Who It&apos;s For</h2>
                <p className="text-gray-600 leading-relaxed">{listing.who_its_for}</p>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Reviews</h2>
              <div className="text-center py-8 text-gray-400">
                <svg className="w-10 h-10 mx-auto mb-3 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-sm">No reviews yet. Reviews coming soon.</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="mt-8 lg:mt-0">
            <div className="sticky top-8 bg-white border border-gray-100 rounded-2xl p-6 space-y-5 shadow-sm">
              <div>
                <div className="text-3xl font-bold text-gray-900">{listing.pricing || 'Contact for pricing'}</div>
                <p className="text-xs text-gray-400 mt-1">Billed through creator&apos;s platform</p>
              </div>

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
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Built by</p>
                  <p className="font-semibold text-gray-900">{listing.creator_name}</p>
                  {listing.creator_website && (
                    <a href={listing.creator_website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                      {listing.creator_website.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                </div>

                {listing.tags && listing.tags.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-2">Tags</p>
                    <div className="flex flex-wrap gap-1.5">
                      {listing.tags.map((tag: string) => (
                        <span key={tag} className="text-xs bg-gray-50 text-gray-600 px-2.5 py-1 rounded-full border border-gray-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {listing.demo_video_url && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-2">Demo</p>
                    <a href={listing.demo_video_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Watch Demo
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
