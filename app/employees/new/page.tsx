'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

const employeeTypes = [
  { role: 'SDR', label: 'Sales AI', icon: '📞', desc: 'Books meetings, generates leads, writes outreach.', color: 'border-blue-200 bg-blue-50', activeColor: 'border-blue-500 bg-blue-50 ring-2 ring-blue-500/20' },
  { role: 'Research', label: 'Research AI', icon: '🔍', desc: 'Analyzes competitors and surfaces market opportunities.', color: 'border-purple-200 bg-purple-50', activeColor: 'border-purple-500 bg-purple-50 ring-2 ring-purple-500/20' },
  { role: 'Support', label: 'Support AI', icon: '💬', desc: 'Handles customer questions and creates documentation.', color: 'border-emerald-200 bg-emerald-50', activeColor: 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20' },
  { role: 'Analyst', label: 'Executive Assistant AI', icon: '📋', desc: 'Organizes tasks, summarizes information, prepares reports.', color: 'border-orange-200 bg-orange-50', activeColor: 'border-orange-500 bg-orange-50 ring-2 ring-orange-500/20' },
]

const models = [
  { id: 'openai', label: 'OpenAI', sublabel: 'GPT-4o', icon: '🟢', desc: 'Best for tasks requiring broad knowledge and fast execution.', available: true },
  { id: 'claude', label: 'Claude', sublabel: 'Claude 3.5 Sonnet', icon: '🟣', desc: 'Best for analysis, writing, and nuanced reasoning tasks.', available: true },
  { id: 'gemini', label: 'Gemini', sublabel: 'Coming soon', icon: '🔵', desc: 'Google\'s latest model. Available soon.', available: false },
]

const roleDefaults: Record<string, { goal: string; prompt: string }> = {
  SDR: {
    goal: 'Generate qualified leads and book 10 sales meetings per month',
    prompt: 'You are a Sales Development Representative (SDR). Your job is to identify potential customers, craft compelling outreach messages, and help the team generate pipeline. Be concise, persuasive, and professional. Always focus on the prospect\'s pain points and how the product solves them.',
  },
  Research: {
    goal: 'Conduct weekly market research and competitive analysis',
    prompt: 'You are a Research Analyst. Your job is to gather and synthesize information, identify trends, and provide clear, structured reports. Be thorough, accurate, and cite your reasoning clearly. Deliver insights that are actionable and specific.',
  },
  Support: {
    goal: 'Resolve customer inquiries within 2 hours and maintain 95% satisfaction',
    prompt: 'You are a Customer Support Agent. Your job is to handle customer questions, resolve issues, and ensure a great experience. Be empathetic, clear, and solution-focused. Always confirm the issue is fully resolved before closing.',
  },
  Analyst: {
    goal: 'Generate weekly executive summaries and track key business metrics',
    prompt: 'You are an Executive Assistant and Business Analyst. Your job is to organize information, prepare summaries, and surface key insights for leadership. Be precise, efficient, and always structure your outputs clearly with headers and bullet points.',
  },
}

const STEPS = ['Choose Type', 'Choose Brain', 'Define Goal', 'Review & Create']

export default function NewEmployeePage() {
  const router = useRouter()
  const supabase = createClient()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    role: '' as string,
    model: 'openai',
    goal: '',
    system_prompt: '',
  })

  function selectRole(role: string) {
    setForm(f => ({
      ...f,
      role,
      goal: roleDefaults[role]?.goal || '',
      system_prompt: roleDefaults[role]?.prompt || '',
    }))
    setStep(1)
  }

  function selectModel(modelId: string) {
    setForm(f => ({ ...f, model: modelId }))
    setStep(2)
  }

  async function handleCreate() {
    if (!form.name.trim()) { setError('Please enter a name for your AI employee.'); return }
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
        model: form.model,
        goal: form.goal,
        system_prompt: form.system_prompt,
        status: 'active',
        performance_score: 75 + Math.random() * 20,
      })
      .select()
      .single()

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    await supabase.from('activity_logs').insert({
      user_id: user.id,
      employee_id: employee.id,
      employee_name: form.name,
      message: `was added as ${form.role} (powered by ${form.model === 'openai' ? 'GPT-4o' : 'Claude'})`,
      type: 'system',
    })

    router.push(`/employees/${employee.id}`)
  }

  const selectedType = employeeTypes.find(t => t.role === form.role)
  const selectedModel = models.find(m => m.id === form.model)

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/employees" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">← Back</Link>
          <div className="h-4 w-px bg-gray-200" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add AI Worker</h1>
            <p className="text-sm text-gray-500 mt-0.5">Create a new AI employee for your workforce</p>
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 text-sm font-medium ${i === step ? 'text-blue-600' : i < step ? 'text-gray-400' : 'text-gray-300'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  i === step ? 'bg-blue-600 text-white' : i < step ? 'bg-gray-200 text-gray-500' : 'bg-gray-100 text-gray-400'
                }`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className="hidden sm:block">{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`h-px w-8 ${i < step ? 'bg-gray-300' : 'bg-gray-100'}`} />}
            </div>
          ))}
        </div>

        {/* STEP 0: Choose Type */}
        {step === 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">What type of AI employee do you need?</h2>
            <p className="text-sm text-gray-500 mb-6">Each type comes with a pre-configured role, goal, and system prompt — fully customizable.</p>
            <div className="space-y-3">
              {employeeTypes.map((type) => (
                <button
                  key={type.role}
                  onClick={() => selectRole(type.role)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all hover:shadow-sm ${
                    form.role === type.role ? type.activeColor : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <span className="text-2xl">{type.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{type.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{type.desc}</div>
                  </div>
                  <div className="ml-auto text-gray-300">→</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 1: Choose Brain */}
        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Choose a brain for your {selectedType?.label}</h2>
            <p className="text-sm text-gray-500 mb-6">This is the AI model that will power your employee. You can use your own API keys.</p>
            <div className="space-y-3">
              {models.map((model) => (
                <button
                  key={model.id}
                  onClick={() => model.available && selectModel(model.id)}
                  disabled={!model.available}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                    !model.available
                      ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                      : form.model === model.id
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500/20'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <span className="text-2xl">{model.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 text-sm">{model.label}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{model.sublabel}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{model.desc}</div>
                  </div>
                  {model.available && <div className="ml-auto text-gray-300">→</div>}
                </button>
              ))}
            </div>
            <button onClick={() => setStep(0)} className="mt-4 text-sm text-gray-400 hover:text-gray-600">← Back</button>
          </div>
        )}

        {/* STEP 2: Define Goal */}
        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Name your employee and set their goal</h2>
            <p className="text-sm text-gray-500 mb-6">Give your AI employee a name and a clear objective they&apos;ll work toward.</p>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Employee Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={`e.g. ${form.role === 'SDR' ? 'Aria' : form.role === 'Research' ? 'Max' : form.role === 'Support' ? 'Nova' : 'Rex'}`}
                  value={form.name}
                  onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Goal</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What should this employee achieve?"
                  value={form.goal}
                  onChange={(e) => setForm(f => ({ ...f, goal: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  System Prompt
                  <span className="text-xs font-normal text-gray-400 ml-2">Defines personality & behavior</span>
                </label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                  rows={4}
                  value={form.system_prompt}
                  onChange={(e) => setForm(f => ({ ...f, system_prompt: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(3)}
                disabled={!form.name.trim() || !form.goal.trim()}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Review →
              </button>
              <button onClick={() => setStep(1)} className="px-4 py-3 text-sm text-gray-400 hover:text-gray-600">← Back</button>
            </div>
          </div>
        )}

        {/* STEP 3: Review & Create */}
        {step === 3 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Review your AI employee</h2>
            <p className="text-sm text-gray-500 mb-6">Everything looks good? Create your employee and they&apos;ll be ready to run tasks immediately.</p>

            <div className="rounded-2xl border border-gray-200 overflow-hidden mb-6">
              <div className="bg-gray-50 px-5 py-4 border-b border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                  {form.name ? form.name[0].toUpperCase() : '?'}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{form.name || 'Unnamed'}</div>
                  <div className="text-xs text-gray-500">{selectedType?.label}</div>
                </div>
              </div>
              <div className="divide-y divide-gray-50">
                <div className="px-5 py-3 flex items-start gap-4">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-20 flex-shrink-0 pt-0.5">Brain</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-900">{selectedModel?.label}</span>
                    <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">{selectedModel?.sublabel}</span>
                  </div>
                </div>
                <div className="px-5 py-3 flex items-start gap-4">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-20 flex-shrink-0 pt-0.5">Goal</span>
                  <span className="text-sm text-gray-700">{form.goal}</span>
                </div>
                <div className="px-5 py-3 flex items-start gap-4">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-20 flex-shrink-0 pt-0.5">Status</span>
                  <span className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Active on creation
                  </span>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleCreate}
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
              >
                {loading ? 'Creating...' : '✓ Create AI Employee'}
              </button>
              <button onClick={() => setStep(2)} className="px-4 py-3 text-sm text-gray-400 hover:text-gray-600">← Back</button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
