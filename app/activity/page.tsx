import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardLayout from '@/components/DashboardLayout'
import ActivityFeed from '@/components/ActivityFeed'

export const dynamic = 'force-dynamic'

export default async function ActivityPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: logs } = await supabase
    .from('activity_logs')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Activity</h1>
        <p className="text-sm text-gray-500 mt-1">Everything your AI workforce has done</p>
      </div>

      <div className="card p-6 max-w-3xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-gray-900">Activity Log</h2>
          <span className="text-xs text-gray-400">{logs?.length || 0} events</span>
        </div>
        <ActivityFeed logs={logs || []} />
      </div>
    </DashboardLayout>
  )
}
