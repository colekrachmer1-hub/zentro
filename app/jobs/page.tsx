import { MOCK_JOB_POSTINGS, JobPosting } from '@/lib/mock-job-postings'
import JobsView from '@/components/JobsView'

export const dynamic = 'force-dynamic'

interface SearchParams {
  q?: string
  category?: string
}

function getPostings({ q, category }: SearchParams): JobPosting[] {
  let results = MOCK_JOB_POSTINGS.filter(p => p.status === 'open')

  if (category && category !== 'All') {
    results = results.filter(p => p.category.toLowerCase() === category.toLowerCase())
  }

  if (q) {
    const qLower = q.toLowerCase()
    results = results.filter(p =>
      p.title.toLowerCase().includes(qLower) ||
      p.company.toLowerCase().includes(qLower) ||
      p.industry.toLowerCase().includes(qLower) ||
      p.description.toLowerCase().includes(qLower) ||
      p.tags.some(t => t.toLowerCase().includes(qLower))
    )
  }

  return results
}

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const postings = getPostings(params)

  return (
    <JobsView
      postings={postings}
      initialQ={params.q || ''}
      initialCategory={params.category || ''}
    />
  )
}
