'use client'
export const dynamic = 'force-dynamic'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { createClient } from '@/lib/supabase/client'
import type { Employee, Task } from '@/lib/types'
import { formatDistanceToNow } from 'date-fns'
import clsx from 'clsx'

export default function TasksPage() {
  const searchParams = useSearchParams()
  const preselectedEmployee = searchParams.get('employee')
  const supabase = createClient()

  const [employees, setEmployees] = useState<Employee[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedEmployee, setSelectedEmployee] = useState(preselectedEmployee || '')
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [result, setResult] = useState<Task | null>(null)
  const [error, setError] = useState('')

  const fetchData = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const [empRes, tasksRes] = await Promise.all([
      supabase.from('employees').select('*').eq('user_id', user.id).eq('status', 'active').order('name'),
      supabase
        .from('tasks')
        .select('*, employees(name, role)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50),
    ])

    setEmployees(empRes.data || [])
    setTasks(tasksRes.data || [])
    if (preselectedEmployee && !selectedEmployee) {
      setSelectedEmployee(preselectedEmployee)
    }
    setFetching(false)
  }, [supabase, preselectedEmployee, selectedEmployee])

  useEffect(() => { fetchData() }, [fetchData])

  async function handleRunTask(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedEmployee || !prompt.trim()) return

    setError('')
    setResult(null)
    setLoading(true)

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId: selectedEmployee, prompt }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Task failed')

      setResult(data.task)
      setPrompt('')
      fetchData() // refresh task list
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const selectedEmp = employees.find((e) => e.id === selectedEmployee)

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-sm text-gray-500 mt-1">Assign work to your AI employees</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Task Form */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-6">
            <h2 className="font-semibold text-gray-900 mb-5">Run New Task</h2>
            <form onSubmit={handleRunTask} className="space-y-4">
              <div>
                <label className="label">Assign to Employee</label>
                {fetching ? (
                  <div className="input animate-pulse bg-gray-100" />
                ) : employees.length === 0 ? (
                  <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm">
                    No active employees. <a href="/employees/new" className="underline">Create one first.</a>
                  </div>
                ) : (
                  <select
                    className="input"
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    required
                  >
                    <option value="">Select employee...</option>
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} ({emp.role})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {selectedEmp && (
                <div className="p-3 rounded-lg bg-brand-50 border border-brand-100 text-xs text-brand-800">
                  <strong>Goal:</strong> {selectedEmp.goal}
                </div>
              )}

              <div>
                <label className="label">Task Prompt</label>
                <textarea
                  className="input min-h-[120px] resize-y"
                  placeholder="What should this employee do? Be specific..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn-primary w-full justify-center py-2.5"
                disabled={loading || !selectedEmployee || employees.length === 0}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Working...
                  </span>
                ) : '⚡ Run Task'}
              </button>
            </form>
          </div>

          {/* Result */}
          {result && (
            <div className="card p-6 border-brand-200 border-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="badge bg-green-100 text-green-700">✓ Completed</span>
                <span className="text-xs text-gray-400">{result.tokens_used} tokens · ${result.cost_estimate.toFixed(5)}</span>
              </div>
              <div className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wide">AI Response</div>
              <div className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed bg-gray-50 rounded-lg p-4 border border-gray-100">
                {result.response}
              </div>
            </div>
          )}
        </div>

        {/* Task History */}
        <div className="lg:col-span-3 card p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Task History</h2>

          {fetching ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">📋</div>
              <p className="text-gray-400 text-sm">No tasks yet. Run your first task!</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {tasks.map((task) => (
                <div key={task.id} className="border border-gray-100 rounded-lg p-4 hover:border-gray-200 transition-colors">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {task.employees && (
                          <span className="text-xs font-semibold text-brand-600">
                            {task.employees.name}
                          </span>
                        )}
                        <span className="text-xs text-gray-400">
                          {formatDistanceToNow(new Date(task.created_at), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-800 font-medium line-clamp-1">{task.prompt}</p>
                    </div>
                    <span className={clsx(
                      'badge flex-shrink-0 text-xs',
                      task.status === 'completed' ? 'bg-green-100 text-green-700' :
                      task.status === 'failed' ? 'bg-red-100 text-red-600' :
                      'bg-yellow-100 text-yellow-700'
                    )}>
                      {task.status}
                    </span>
                  </div>
                  {task.response && (
                    <p className="text-xs text-gray-500 line-clamp-2 bg-gray-50 rounded p-2">
                      {task.response}
                    </p>
                  )}
                  {task.cost_estimate > 0 && (
                    <div className="mt-2 text-xs text-gray-400">
                      {task.tokens_used} tokens · ${task.cost_estimate.toFixed(5)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
