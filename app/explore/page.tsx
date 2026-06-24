import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import ExploreFilters from '@/components/ExploreFilters'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

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
    if (error) return []
    return data || []
  } catch {
    return []
  }
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse AI Employees</h1>
          <p className="text-gray-500">
            Discover specialized AI workers built by experts — ready to hire today.
          </p>
        </div>

        <Suspense fallback={<div className="h-24 bg-white rounded-xl animate-pulse mb-8" />}>
          <ExploreFilters selectedCategory={category} searchQuery={q} />
        </Suspense>

        {listings.length > 0 && (
          <p className="text-sm text-gray-500 mb-6">
            <span className="font-semibold text-gray-900">{listings.length}</span> AI employee{listings.length !== 1 ? 's' : ''} available
            {category && category !== 'All' && (
              <span> in <span className="font-medium text-blue-600">{category}</span></span>
            )}
            {q && (
              <span> matching &ldquo;<span className="font-medium">{q}</span>&rdquo;</span>
            )}
          </p>
        )}

        {listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-28">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {q || category ? 'No matches found' : 'No listings yet'}
            </h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              {q || category
                ? 'Try a different search term or category.'
                : 'Be the first to list an AI employee on Zentro.'}
            </p>
            {q || category ? (
              <Link
                href="/explore"
                className="inline-flex px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
              >
                View All
              </Link>
            ) : (
              <Link
                href="/submit"
                className="inline-flex px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
              >
                Submit an AI Employee
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
