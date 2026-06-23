'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

const roles = ['SDR', 'Research', 'Support', 'Analyst'] as const

const roleDefaults: Record<string, { goal: string; prompt: string }> = {
  SDR: {
    goal: 'Generate qualified leads and book sales meetings',
    prompt: 'You are a Sales Development Representative (SDR). Your job is to identify potential customers, craft compelling outreach messages, and help the team generate pipeline. Be concise, persuasive, and professional.',
  },
  Research: {
    goal: 'Conduct market research and competitive analysis',
    prompt: 'You are a Research Analyst. Your job is to gather and synthesize information, identify trends, and provide clear, structured reports. Be thorough, accurate, and cite your reasoning clearly.',
  },
  Support: {
    goal: 'Resolve customer inquiries and improve satisfaction',
    prompt: 'You are a Customer Support Agent. Your job is to handle customer questions, resolve issues, and ensure a great experience. Be empathetic, clear, and solution-focused.',
  },
  Analyst: {
    goal: 'Analyze data and generate actionable insights',
    prompt: 'You are a Data Analyst. Your job is to analyze information, identify patterns, and produce structured reports with clear recommendations. Be precise, logical, and data-driven.',
  },
}

export default function NewEmployeePage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    role: 'SDR' as typeof roles[number],
    goal: roleDefaults.SDR.goal,
    system_prompt: roleDefaults.SDR.prompt,
  })

  function handleRoleChange(role: typeof roles[number]) {
    setForm((f) => ({
      ...f,
      role,
      goal: roleDefaults[role].goal,
      system_prompt: roleDefaults[role].prompt,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }

    const { data: employee, error: insertError } = await supabase
      .from('employees')
      .insert({
        user_id: user.id,
        name: form.name,
        role: form.role,
        goal: form.goal,
        system_prompt: form.system_prompt,
        status: 'active',
        performance_score: 75 + Math.random() * 20, // starter score
      })
      .select()
      .single()

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    // Log activity
    await supabase.from('activity_logs').insert({
      user_id: user.id,
      employee_id: employee.id,
      employee_name: form.name,
      message: `was hired as ${form.role}`,
      type: 'system',
    })

    router.push(`/employees/${employee.id}`)
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/employees" className="btn-ghost text-sm">← Back</Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hire AI Employee</h1>
            <p className="text-sm text-gray-500 mt-1">Configure your new AI team member</p>
          </div>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="label" htmlFor="name">Employee Name</label>
              <input
                id="name"
                type="text"
                className="input"
                placeholder="e.g. Aria, Max, Nova..."
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
              />
            </div>

            {/* Role */}
            <div>
              <label className="label">Role</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {roles.map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRoleChange(role)}
                    className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                      form.role === role
                        ? 'border-brand-500 bg-brand-50 text-brand-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Goal */}
            <div>
              <label className="label" htmlFor="goal">Goal</label>
              <input
                id="goal"
                type="text"
                className="input"
                placeholder="What should this employee achieve?"
                value={form.goal}
                onChange={(e) => setForm((f) => ({ ...f, goal: e.target.value }))}
                required
              />
            </div>

            {/* System Prompt */}
            <div>
              <label className="label" htmlFor="prompt">System Prompt</label>
              <textarea
                id="prompt"
                className="input min-h-[140px] resize-y"
                placeholder="Describe how this AI employee should behave..."
                value={form.system_prompt}
                onChange={(e) => setForm((f) => ({ ...f, system_prompt: e.target.value }))}
                required
              />
              <p className="text-xs text-gray-400 mt-1">This defines your AI employee&apos;s personality, expertise, and behavior.</p>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button type="submit" className="btn-primary px-6 py-2.5" disabled={loading}>
                {loading ? 'Hiring...' : '🤖 Hire Employee'}
              </button>
              <Link href="/employees" className="btn-secondary">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}
