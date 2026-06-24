import { MOCK_LISTINGS, Listing } from '@/lib/mock-listings'
import { createClient } from '@/lib/supabase/server'
import EmployeesView from '@/components/EmployeesView'

export const dynamic = 'force-dynamic'

interface SearchParams {
  q?: string
  category?: string
}

async function getListings(params: SearchParams): Promise<Listing[]> {
  const { q, category } = params
  try {
    const supabase = await createClient()
    let query = supabase.from('listings').select('*').eq('status', 'approved')
    if (category && category !== 'All') query = query.eq('category', category)
    if (q) query = query.ilike('name', `%${q}%`)
    query = query.order('hire_count', { ascending: false })
    const { data, error } = await query
    if (error || !data || data.length === 0) return getMockFiltered(params)
    return data
  } catch {
    return getMockFiltered(params)
  }
}

function getMockFiltered({ q, category }: SearchParams): Listing[] {
  let results = MOCK_LISTINGS
  if (category && category !== 'All') {
    results = results.filter(l => l.category.toLowerCase() === category.toLowerCase())
  }
  if (q) {
    const qLower = q.toLowerCase()
    results = results.filter(l =>
      l.name.toLowerCase().includes(qLower) ||
      l.creator_name.toLowerCase().includes(qLower) ||
      l.category.toLowerCase().includes(qLower) ||
      l.short_description.toLowerCase().includes(qLower) ||
      l.tags.some(t => t.toLowerCase().includes(qLower))
    )
  }
  return results
}

export default async function EmployeesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const listings = await getListings(params)

  return (
    <EmployeesView
      listings={listings}
      initialQ={params.q || ''}
      initialCategory={params.category || ''}
    />
  )
}
