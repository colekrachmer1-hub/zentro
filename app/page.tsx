import Link from 'next/link'

export const dynamic = 'force-dynamic'

const CATEGORIES = [
  { name: 'Sales', emoji: '📞' },
  { name: 'Marketing', emoji: '📣' },
  { name: 'Research', emoji: '🔍' },
  { name: 'Amazon FBA', emoji: '📦' },
  { name: 'Recruiting', emoji: '👥' },
  { name: 'Customer Support', emoji: '💬' },
  { name: 'Real Estate', emoji: '🏠' },
  { name: 'Productivity', emoji: '⚡' },
  { name: 'Finance', emoji: '💰' },
  { name: 'Operations', emoji: '⚙️' },
]

const RECENT_JOBS = [
  { title: 'AI Sales Development Representative', company: 'Acme Corp', industry: 'B2B SaaS', budget: '$200–400/mo', id: 'job-1' },
  { title: 'AI Lead Agent', company: 'GrowthHQ', industry: 'Marketing Agency', budget: '$100–200/mo', id: 'job-2' },
  { title: 'AI Customer Support Agent', company: 'ShopFast', industry: 'E-commerce', budget: '$75–150/mo', id: 'job-3' },
  { title: 'AI Amazon Product Scout', company: 'FBA Kings LLC', industry: 'Amazon FBA', budget: '$100–200/mo', id: 'job-4' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO — light blue gradient like Indeed */}
      <section
        className="px-4 pt-10 pb-14"
        style={{
          background: 'linear-gradient(135deg, #dce8ff 0%, #eaf1ff 35%, #f5f8ff 65%, #ffffff 100%)',
        }}
      >
        <div className="max-w-3xl mx-auto">
          {/* Search bar */}
          <form action="/jobs" method="GET">
            <div className="flex flex-col sm:flex-row bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
              <div className="flex items-center flex-1 px-4 py-3.5 gap-3 border-b sm:border-b-0 sm:border-r border-gray-200">
                <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
                </svg>
                <input
                  name="q"
                  type="text"
                  placeholder="AI role, skill, or company"
                  className="flex-1 outline-none text-gray-900 text-sm bg-transparent placeholder-gray-400"
                />
              </div>
              <div className="flex items-center flex-1 px-4 py-3.5 gap-3">
                <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-gray-500 flex-1 text-left">Remote / Online</span>
              </div>
              <button type="submit" className="bg-blue-700 text-white px-7 py-3.5 font-semibold hover:bg-blue-800 transition-colors text-sm shrink-0">
                Search
              </button>
            </div>
          </form>

          {/* Suggested */}
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
            <span className="text-gray-500">Popular:</span>
            {['AI SDR', 'AI Lead Agent', 'AI Recruiter', 'AI Content Creator', 'AI Support Agent'].map(s => (
              <Link key={s} href={`/jobs?q=${encodeURIComponent(s)}`} className="text-blue-700 hover:underline">
                {s}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN JOBS SECTION — "Based on your activity" style */}
      <section className="px-4 py-10 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-gray-900">Open AI employee jobs</h2>
            <Link href="/jobs" className="text-sm text-blue-700 hover:underline">See all jobs</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {RECENT_JOBS.map(job => (
              <Link
                key={job.id}
                href="/jobs"
                className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-blue-700 leading-snug mb-0.5">{job.title}</p>
                    <p className="text-sm text-gray-700">{job.company}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{job.industry}</p>
                    <div className="flex flex-wrap gap-2 mt-2.5">
                      <span className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded">Remote</span>
                      <span className="text-xs bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded">{job.budget}</span>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-200 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-4 py-10 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Explore by category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={`/jobs?category=${encodeURIComponent(cat.name)}`}
                className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all text-center group"
              >
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700 transition-colors">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* POST A JOB CTA — Like Indeed's "Employers / Post Job" */}
      <section className="px-4 py-10 border-b border-gray-100" style={{ background: 'linear-gradient(135deg, #dce8ff 0%, #eaf1ff 60%, #f5f8ff 100%)' }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">For Businesses</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Need an AI employee?<br />Post the job — free.</h2>
            <p className="text-gray-600 mb-6 leading-relaxed text-sm">Tell AI creators what you need. They'll apply with the perfect AI employee for your business. Works just like LinkedIn — but for AI workers.</p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/post-job" className="px-5 py-2.5 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors text-sm">
                Post an AI Employee Job
              </Link>
              <Link href="/jobs" className="px-5 py-2.5 border border-blue-700 text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-sm">
                Browse Open Jobs
              </Link>
            </div>
          </div>
          <div className="md:w-72 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <p className="font-semibold text-gray-900 mb-1 text-sm">Post your AI employee</p>
            <p className="text-xs text-gray-500 mb-4">Built an AI employee? List it so businesses can hire you.</p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">AI employee name or role</label>
                <div className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-300 bg-gray-50">e.g. AI SDR, AI Support Agent</div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Where does it run?</label>
                <div className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-300 bg-gray-50">Platform or website URL</div>
              </div>
              <Link href="/post-ai-employee" className="block w-full text-center py-2.5 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors text-sm">
                List AI Employee →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-12 px-4 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-bold text-gray-900 mb-8">How Zentro works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Businesses post jobs', desc: 'Companies post what AI employee role they need filled — just like a regular job listing.' },
              { step: '2', title: 'Creators apply', desc: 'AI creators and SaaS builders browse postings and apply with their AI employee product.' },
              { step: '3', title: 'Match made', desc: 'The business gets connected to the right AI employee and hires it for their team.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-9 h-9 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">{item.step}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { stat: '500+', label: 'AI employees listed' },
              { stat: '10,000+', label: 'Businesses searching' },
              { stat: '100%', label: 'Free to browse' },
              { stat: '24hrs', label: 'Average review time' },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-2xl font-bold text-blue-700">{item.stat}</div>
                <div className="text-sm text-gray-500 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
