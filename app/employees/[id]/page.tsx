'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import ActivityFeed from '@/components/ActivityFeed'
import { createClient } from '@/lib/supabase/client'
import type { Employee, Task, ActivityLog } from '@/lib/types'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import clsx from 'clsx'

const roleColors: Record<string, string> = {
  SDR: 'bg-blue-100 text-blue-700',
  Research: 'bg-purple-100 text-purple-700',
  Support: 'bg-green-100 text-green-700',
  Analyst: 'bg-orange-100 text-orange-700',
}

export default function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const supabase = createClient()

  const [employee, setEmployee] = useState<Employee | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [logs, setLogs] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)
  const [statusUpdating, setStatusUpdating] = useState(false)

  const fetchData = useCallback(async () => {
    const [empRes, tasksRes, logsRes] = await Promise.all([
      supabase.from('employees').select('*').eq('id', id).single(),
      supabase.from('tasks').select('*').eq('employee_id', id).order('created_at', { ascending: false }).limit(20),
      supabase.from('activity_logs').select('*').eq('employee_id', id).order('created_at', { ascending: false }).limit(30),
    ])
    setEmployee(empRes.data)
    setTasks(tasksRes.data || [])
    setLogs(logsRes.data || [])
    setLoading(false)
  }, [id, supabase])

  useEffect(() => { fetchData() }, [fetchData])

  async function toggleStatus() {
    if (!employee) return
    setStatusUpdating(true)
    const newStatus = employee.status === 'active' ? 'inactive' : 'active'
    await supabase.from('employees').update({ status: newStatus }).eq('id', id)
    setEmployee({ ...employee, status: newStatus })
    setStatusUpdating(false)
  }

  async function deleteEmployee() {
    if (!confirm(`Delete ${employee?.name}? This cannot be undone.`)) return
    await supabase.from('employees').delete().eq('id', id)
    router.push('/employees')
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48" />
          <div className="h-32 bg-gray-200 rounded" />
        </div>
      </DashboardLayout>
    )
  }

  if (!employee) {
    return (
      <DashboardLayout>
        <div className="text-center py-16">
          <p className="text-gray-500">Employee not found.</p>
          <Link href="/employees" className="btn-primary mt-4 inline-block">Back to Employees</Link>
        </div>
      </DashboardLayout>
    )
  }

  const completedTasks = tasks.filter((t) => t.status === 'completed').length
  const totalCost = tasks.reduce((sum, t) => sum + (t.cost_estimate || 0), 0)
  const score = Math.round(employee.performance_score)

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/employees" className="btn-ghost text-sm">← Employees</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Profile */}
        <div className="space-y-4">
          <div className="card p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-xl">
                {employee.name[0].toUpperCase()}
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{employee.name}</h1>
                <span className={clsx('badge', roleColors[employee.role])}>{employee.role}</span>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Status</div>
                <span className={clsx('badge', employee.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500')}>
                  {employee.status === 'active' ? '● Active' : '○ Inactive'}
                </span>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Goal</div>
                <p className="text-gray-700">{employee.goal}</p>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Hired</div>
                <p className="text-gray-600">{formatDistanceToNow(new Date(employee.created_at), { addSuffix: true })}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">Performance Score</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-500 rounded-full transition-all"
                    style={{ width: `${Math.min(score, 100)}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-brand-600">{score}%</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              <Link href={`/tasks?employee=${id}`} className="btn-primary w-full justify-center">
                ⚡ Run Task
              </Link>
              <button
                onClick={toggleStatus}
                disabled={statusUpdating}
                className="btn-secondary w-full justify-center"
              >
                {employee.status === 'active' ? 'Deactivate' : 'Activate'}
              </button>
              <button
                onClick={deleteEmployee}
                className="w-full text-center text-xs text-red-500 hover:text-red-700 py-1 transition-colors"
              >
                Delete Employee
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Stats</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xl font-bold text-brand-600">{tasks.length}</div>
                <div className="text-xs text-gray-500">Total Tasks</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xl font-bold text-green-600">{completedTasks}</div>
                <div className="text-xs text-gray-500">Completed</div>
              </div>
              <div className="col-span-2 text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xl font-bold text-yellow-600">${totalCost.toFixed(4)}</div>
                <div className="text-xs text-gray-500">Total AI Cost</div>
              </div>
            </div>
          </div>

          {/* System prompt */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">System Prompt</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{employee.system_prompt}</p>
          </div>
        </div>

        {/* Right: Tasks + Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Task History */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-gray-900">Task History</h2>
              <Link href={`/tasks?employee=${id}`} className="text-xs text-brand-600 hover:underline">
                + New Task
              </Link>
            </div>

            {tasks.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-3xl mb-2">📋</div>
                <p className="text-sm text-gray-400 mb-3">No tasks yet</p>
                <Link href={`/tasks?employee=${id}`} className="btn-primary text-xs px-3 py-1.5">
                  Run First Task
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="border border-gray-100 rounded-lg p-4 hover:border-gray-200 transition-colors">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <p className="text-sm font-medium text-gray-800 line-clamp-1">{task.prompt}</p>
                      <span className={clsx(
                        'badge flex-shrink-0',
                        task.status === 'completed' ? 'bg-green-100 text-green-700' :
                        task.status === 'failed' ? 'bg-red-100 text-red-600' :
                        'bg-yellow-100 text-yellow-700'
                      )}>
                        {task.status}
                      </span>
                    </div>
                    {task.response && (
                      <p className="text-xs text-gray-500 line-clamp-2 mb-2">{task.response}</p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span>{formatDistanceToNow(new Date(task.created_at), { addSuffix: true })}</span>
                      {task.cost_estimate > 0 && <span>· ${task.cost_estimate.toFixed(5)}</span>}
                      {task.tokens_used > 0 && <span>· {task.tokens_used} tokens</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Activity Log */}
          <div className="card p-6">
            <h2 className="font-semibold text-gray-900 mb-5">Activity Log</h2>
            {/* @ts-expect-error - type mismatch ok at runtime */}
            <ActivityFeed logs={logs} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
