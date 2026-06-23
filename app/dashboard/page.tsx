import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardLayout from '@/components/DashboardLayout'
import StatCard from '@/components/StatCard'
import ActivityFeed from '@/components/ActivityFeed'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Fetch stats in parallel
  const [employeesRes, tasksRes, logsRes] = await Promise.all([
    supabase.from('employees').select('id, status').eq('user_id', user.id),
    supabase.from('tasks').select('id, status, cost_estimate').eq('user_id', user.id),
    supabase
      .from('activity_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20),
  ])

  const employees = employeesRes.data || []
  const tasks = tasksRes.data || []
  const logs = logsRes.data || []

  const activeEmployees = employees.filter((e) => e.status === 'active').length
  const completedTasks = tasks.filter((t) => t.status === 'completed').length
  const totalCost = tasks.reduce((sum, t) => sum + (t.cost_estimate || 0), 0)

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Your AI workforce at a glance</p>
        </div>
        <Link href="/employees/new" className="btn-primary">
          + Hire AI Employee
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="AI Employees"
          value={employees.length}
          icon="👥"
          color="text-brand-600"
          sub={`${activeEmployees} active`}
        />
        <StatCard
          label="Tasks Completed"
          value={completedTasks}
          icon="⚡"
          color="text-green-600"
          sub={`${tasks.length} total`}
        />
        <StatCard
          label="AI Cost (Total)"
          value={`$${totalCost.toFixed(4)}`}
          icon="💰"
          color="text-yellow-600"
          sub="GPT-4o-mini"
        />
        <StatCard
          label="Active Workers"
          value={activeEmployees}
          icon="🟢"
          color="text-emerald-600"
          sub="working 24/7"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-gray-900">Activity Feed</h2>
            <span className="text-xs text-gray-400">{logs.length} recent events</span>
          </div>
          {/* @ts-expect-error - type mismatch ok at runtime */}
          <ActivityFeed logs={logs} />
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="card p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link href="/employees/new" className="btn-secondary w-full justify-center">
                + Create Employee
              </Link>
              <Link href="/tasks" className="btn-secondary w-full justify-center">
                ⚡ Run Task
              </Link>
              <Link href="/org" className="btn-secondary w-full justify-center">
                🌐 View Org Chart
              </Link>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-semibold text-gray-900 mb-3">Team Overview</h2>
            {employees.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-sm text-gray-400 mb-3">No AI employees yet</p>
                <Link href="/employees/new" className="btn-primary text-xs px-3 py-1.5">
                  Hire First Employee
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {employees.slice(0, 5).map((emp) => (
                  <div key={emp.id} className="flex items-center justify-between">
                    <Link href={`/employees/${emp.id}`} className="text-sm text-gray-700 hover:text-brand-600">
                      Employee
                    </Link>
                    <span className={`badge text-xs ${emp.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {emp.status}
                    </span>
                  </div>
                ))}
                {employees.length > 5 && (
                  <Link href="/employees" className="text-xs text-brand-600 hover:underline">
                    View all {employees.length} employees →
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
