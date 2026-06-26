import { MOCK_AGENTS, CATEGORIES } from '@/lib/mock-agents'
import AgentsGrid from '@/components/AgentsGrid'

export const dynamic = 'force-dynamic'

interface SearchParams { q?: string; category?: string; sort?: string }

export default async function AgentsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams
  const { q = '', category = '', sort = 'popular' } = params

  let agents = [...MOCK_AGENTS]

  if (category && category !== 'All') {
    agents = agents.filter(a => a.category === category)
  }
  if (q) {
    const ql = q.toLowerCase()
    agents = agents.filter(a =>
      a.name.toLowerCase().includes(ql) ||
      a.tagline.toLowerCase().includes(ql) ||
      a.category.toLowerCase().includes(ql) ||
      a.tags.some(t => t.includes(ql))
    )
  }
  if (sort === 'rating') agents.sort((a, b) => b.rating - a.rating)
  else if (sort === 'newest') agents.sort((a, b) => (a.badge === 'New' ? -1 : 1))
  else if (sort === 'price-low') agents.sort((a, b) => a.priceMonthly - b.priceMonthly)
  else agents.sort((a, b) => b.installs - a.installs)

  return (
    <AgentsGrid
      agents={agents}
      initialQ={q}
      initialCategory={category || 'All'}
      initialSort={sort}
      categories={CATEGORIES}
    />
  )
}
