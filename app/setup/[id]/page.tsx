'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { MOCK_AGENTS, AIAgent } from '@/lib/mock-agents'

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  businessName: string
  logo: File | null
  logoPreview: string
  businessDescription: string
  websiteUrl: string
  phoneNumber: string
  brandVoice: string
  aiPersonality: string
  integrations: string[]
}

// ─── Constants ────────────────────────────────────────────────────────────────

const BRAND_VOICES = [
  { id: 'professional', label: 'Professional', desc: 'Formal, precise, business-focused', emoji: '💼' },
  { id: 'friendly', label: 'Friendly', desc: 'Warm, conversational, approachable', emoji: '😊' },
  { id: 'luxury', label: 'Luxury', desc: 'Sophisticated, elegant, premium', emoji: '✨' },
  { id: 'funny', label: 'Funny', desc: 'Witty, playful, memorable', emoji: '😄' },
  { id: 'casual', label: 'Casual', desc: 'Relaxed, down-to-earth, human', emoji: '👋' },
]

const AI_PERSONALITIES = [
  { id: 'alex', name: 'Alex', desc: 'Efficient and precise. Gets straight to the point.', emoji: '🤖' },
  { id: 'jordan', name: 'Jordan', desc: 'Warm and empathetic. Makes customers feel heard.', emoji: '💙' },
  { id: 'riley', name: 'Riley', desc: 'Energetic and enthusiastic. Radiates positivity.', emoji: '⚡' },
  { id: 'morgan', name: 'Morgan', desc: 'Sophisticated and refined. Projects authority.', emoji: '🎯' },
]

const INTEGRATIONS = [
  { id: 'google-calendar', name: 'Google Calendar', emoji: '📅' },
  { id: 'gmail', name: 'Gmail', emoji: '✉️' },
  { id: 'slack', name: 'Slack', emoji: '💬' },
  { id: 'hubspot', name: 'HubSpot', emoji: '🔶' },
  { id: 'twilio', name: 'Twilio', emoji: '📞' },
  { id: 'stripe', name: 'Stripe', emoji: '💳' },
  { id: 'notion', name: 'Notion', emoji: '📝' },
  { id: 'zapier', name: 'Zapier', emoji: '⚡' },
  { id: 'calendly', name: 'Calendly', emoji: '🗓️' },
  { id: 'microsoft-365', name: 'Microsoft 365', emoji: '🪟' },
]

const BUILD_STEPS = [
  'Creating workflow',
  'Personalizing prompts',
  'Connecting integrations',
  'Branding assistant',
  'Finalizing deployment',
]

// ─── Step Components ──────────────────────────────────────────────────────────

function StepBusinessName({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">What&apos;s your business name?</label>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="e.g. Bloom Dental, Acme Corp"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
          autoFocus
        />
      </div>
      <p className="text-xs text-gray-400">Your AI agent will introduce itself as part of your business.</p>
    </div>
  )
}

function StepLogo({ preview, onChange }: { preview: string; onChange: (file: File, preview: string) => void }) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => onChange(file, reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">Upload your logo</label>
      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group">
        {preview ? (
          <img src={preview} alt="Logo preview" className="max-h-32 max-w-48 object-contain rounded-xl" />
        ) : (
          <div className="text-center">
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📷</div>
            <p className="text-sm font-medium text-gray-600">Click to upload logo</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, SVG up to 10MB</p>
          </div>
        )}
        <input type="file" className="hidden" accept="image/*" onChange={handleFile} />
      </label>
      <p className="text-xs text-gray-400">Your logo will appear in agent responses and the customer-facing interface.</p>
    </div>
  )
}

function StepDescription({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Describe your business</label>
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="e.g. We're a family dental practice in Austin, TX specializing in cosmetic dentistry and implants. We've been serving patients for 15 years..."
          rows={5}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all resize-none"
          autoFocus
        />
      </div>
      <p className="text-xs text-gray-400">The more detail you provide, the better your AI agent will represent your business.</p>
    </div>
  )
}

function StepWebsite({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Your website URL</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">https://</span>
          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="yourwebsite.com"
            className="w-full pl-20 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
            autoFocus
          />
        </div>
      </div>
      <p className="text-xs text-gray-400">We&apos;ll scan your website to build a knowledge base for your AI agent.</p>
    </div>
  )
}

function StepPhone({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Business phone number</label>
        <input
          type="tel"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="+1 (555) 000-0000"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
          autoFocus
        />
      </div>
      <p className="text-xs text-gray-400">Used for call routing and SMS follow-ups. You can change this later.</p>
    </div>
  )
}

function StepBrandVoice({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500 mb-4">How should your AI agent communicate with customers?</p>
      {BRAND_VOICES.map(voice => (
        <label key={voice.id} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
          value === voice.id ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
        }`}>
          <input type="radio" name="brandVoice" value={voice.id} checked={value === voice.id} onChange={() => onChange(voice.id)} className="hidden" />
          <span className="text-2xl">{voice.emoji}</span>
          <div className="flex-1">
            <p className="font-medium text-gray-900 text-sm">{voice.label}</p>
            <p className="text-xs text-gray-400">{voice.desc}</p>
          </div>
          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
            value === voice.id ? 'border-indigo-600' : 'border-gray-300'
          }`}>
            {value === voice.id && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
          </div>
        </label>
      ))}
    </div>
  )
}

function StepPersonality({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {AI_PERSONALITIES.map(p => (
        <label key={p.id} className={`flex flex-col items-start p-4 rounded-xl border cursor-pointer transition-all ${
          value === p.id ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
        }`}>
          <input type="radio" name="personality" value={p.id} checked={value === p.id} onChange={() => onChange(p.id)} className="hidden" />
          <span className="text-3xl mb-2">{p.emoji}</span>
          <p className="font-semibold text-gray-900 text-sm mb-1">{p.name}</p>
          <p className="text-xs text-gray-400 leading-relaxed">{p.desc}</p>
        </label>
      ))}
    </div>
  )
}

function StepIntegrations({ value, onChange, agentIntegrations }: { value: string[]; onChange: (v: string[]) => void; agentIntegrations: string[] }) {
  const toggle = (id: string) => {
    onChange(value.includes(id) ? value.filter(i => i !== id) : [...value, id])
  }

  const recommended = INTEGRATIONS.filter(i => agentIntegrations.includes(i.name))
  const others = INTEGRATIONS.filter(i => !agentIntegrations.includes(i.name))

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">Connect the tools your agent will use. Recommended integrations are pre-selected.</p>

      {recommended.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-2">Recommended</p>
          <div className="grid grid-cols-2 gap-2">
            {recommended.map(integration => (
              <label key={integration.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                value.includes(integration.id) ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input type="checkbox" checked={value.includes(integration.id)} onChange={() => toggle(integration.id)} className="hidden" />
                <span>{integration.emoji}</span>
                <span className="text-sm font-medium text-gray-700">{integration.name}</span>
                <div className={`ml-auto w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                  value.includes(integration.id) ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'
                }`}>
                  {value.includes(integration.id) && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {others.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Also available</p>
          <div className="grid grid-cols-2 gap-2">
            {others.map(integration => (
              <label key={integration.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                value.includes(integration.id) ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input type="checkbox" checked={value.includes(integration.id)} onChange={() => toggle(integration.id)} className="hidden" />
                <span>{integration.emoji}</span>
                <span className="text-sm text-gray-600">{integration.name}</span>
                <div className={`ml-auto w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                  value.includes(integration.id) ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'
                }`}>
                  {value.includes(integration.id) && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function StepReview({ data, agent }: { data: FormData; agent: AIAgent }) {
  const rows = [
    { label: 'Business', value: data.businessName || '—' },
    { label: 'Website', value: data.websiteUrl ? `https://${data.websiteUrl}` : '—' },
    { label: 'Phone', value: data.phoneNumber || '—' },
    { label: 'Brand voice', value: BRAND_VOICES.find(v => v.id === data.brandVoice)?.label || '—' },
    { label: 'AI personality', value: AI_PERSONALITIES.find(p => p.id === data.aiPersonality)?.name || '—' },
    { label: 'Integrations', value: data.integrations.length > 0 ? data.integrations.join(', ') : 'None selected' },
  ]

  return (
    <div className="space-y-4">
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center text-3xl mb-2`}>{agent.icon}</div>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Deploying</p>
        <p className="text-lg font-bold text-gray-900">{agent.name}</p>
        <p className="text-sm text-gray-400">{agent.price}</p>
      </div>
      <div className="border border-gray-100 rounded-xl overflow-hidden">
        {rows.map(({ label, value }, i) => (
          <div key={label} className={`flex gap-4 px-4 py-3 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <span className="text-gray-400 w-32 shrink-0">{label}</span>
            <span className="text-gray-900 font-medium">{value}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400">You can change all of these settings from your dashboard after launch.</p>
    </div>
  )
}

// ─── Build Screen ─────────────────────────────────────────────────────────────

function BuildScreen({ agent, onDone }: { agent: AIAgent; onDone: () => void }) {
  const [completed, setCompleted] = useState<number[]>([])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []
    BUILD_STEPS.forEach((_, i) => {
      const t = setTimeout(() => {
        setCurrent(i)
        setCompleted(prev => [...prev, i])
      }, 1200 * (i + 1))
      timers.push(t)
    })
    const done = setTimeout(onDone, 1200 * (BUILD_STEPS.length + 1.5))
    return () => { timers.forEach(clearTimeout); clearTimeout(done) }
  }, [onDone])

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center text-4xl mb-8 shadow-lg`}
        style={{ animation: 'pulse 2s infinite' }}>
        {agent.icon}
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Building your AI...</h2>
      <p className="text-gray-400 text-sm mb-10">This takes about 30 seconds</p>

      <div className="w-full max-w-sm space-y-3 text-left">
        {BUILD_STEPS.map((step, i) => {
          const done = completed.includes(i)
          const active = current === i && !done
          return (
            <div key={i} className={`flex items-center gap-3 transition-all duration-500 ${
              done ? 'opacity-100' : active ? 'opacity-100' : 'opacity-30'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                done ? 'bg-emerald-500' : active ? 'bg-indigo-100 animate-pulse' : 'bg-gray-100'
              }`}>
                {done ? (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : active ? (
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                )}
              </div>
              <span className={`text-sm font-medium ${done ? 'text-emerald-600' : active ? 'text-gray-900' : 'text-gray-400'}`}>
                {done ? '✓ ' : ''}{step}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-10 w-full max-w-sm bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-1000"
          style={{ width: `${(completed.length / BUILD_STEPS.length) * 100}%` }}
        />
      </div>
    </div>
  )
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function SuccessScreen({ agent, businessName }: { agent: AIAgent; businessName: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-4xl mb-6">🎉</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">Your AI is Ready!</h2>
      <p className="text-gray-500 mb-2">
        <span className="font-semibold text-gray-900">{agent.name}</span> has been deployed for{' '}
        <span className="font-semibold text-gray-900">{businessName || 'your business'}</span>.
      </p>
      <p className="text-sm text-gray-400 mb-10">It&apos;s already live and waiting for its first customer interaction.</p>

      <div className="grid grid-cols-3 gap-4 w-full max-w-sm mb-10">
        {[
          { emoji: '⚡', label: 'Status', value: 'Live' },
          { emoji: '🕐', label: 'Set up in', value: agent.setupTime },
          { emoji: '📊', label: 'Messages', value: '0' },
        ].map(({ emoji, label, value }) => (
          <div key={label} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <p className="text-xl mb-1">{emoji}</p>
            <p className="text-xs text-gray-400">{label}</p>
            <p className="text-sm font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        <Link href="/dashboard" className="flex-1 text-center py-3 px-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors text-sm">
          Open Dashboard →
        </Link>
        <Link href="/agents" className="flex-1 text-center py-3 px-4 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm">
          Browse More Agents
        </Link>
      </div>
    </div>
  )
}

// ─── Main Setup Wizard ────────────────────────────────────────────────────────

const STEP_CONFIG = [
  { title: 'Business name', subtitle: 'What should we call your business?' },
  { title: 'Upload logo', subtitle: 'Give your AI agent a face' },
  { title: 'Business description', subtitle: 'Tell us about your business' },
  { title: 'Website URL', subtitle: 'We\'ll scan it to build a knowledge base' },
  { title: 'Phone number', subtitle: 'For calls and SMS follow-ups' },
  { title: 'Brand voice', subtitle: 'How should your AI communicate?' },
  { title: 'AI personality', subtitle: 'Choose your agent\'s character' },
  { title: 'Connect integrations', subtitle: 'Plug in your tools' },
  { title: 'Review & launch', subtitle: 'Everything looks good?' },
]

export default function SetupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const agent = MOCK_AGENTS.find(a => a.id === id)

  const [step, setStep] = useState(0)
  const [building, setBuilding] = useState(false)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    logo: null,
    logoPreview: '',
    businessDescription: '',
    websiteUrl: '',
    phoneNumber: '',
    brandVoice: '',
    aiPersonality: '',
    integrations: agent ? agent.integrations.slice(0, 2).map(n =>
      INTEGRATIONS.find(i => i.name === n)?.id || ''
    ).filter(Boolean) : [],
  })

  const update = (key: keyof FormData) => (value: string | string[] | File) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const totalSteps = STEP_CONFIG.length
  const progress = ((step + 1) / totalSteps) * 100

  const handleNext = () => {
    if (step === totalSteps - 1) {
      setBuilding(true)
    } else {
      setStep(s => s + 1)
    }
  }

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Agent not found.</p>
          <Link href="/agents" className="text-indigo-600 hover:underline text-sm">Browse agents →</Link>
        </div>
      </div>
    )
  }

  if (building && !success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5">
        <div className="w-full max-w-md">
          <BuildScreen agent={agent} onDone={() => { setBuilding(false); setSuccess(true) }} />
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5">
        <div className="w-full max-w-md">
          <SuccessScreen agent={agent} businessName={formData.businessName} />
        </div>
      </div>
    )
  }

  const currentConfig = STEP_CONFIG[step]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top bar */}
      <div className="border-b border-gray-100 px-5 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href={`/agent/${agent.id}`} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${agent.gradient} flex items-center justify-center text-sm`}>{agent.icon}</div>
            <span className="text-sm font-medium text-gray-900">{agent.name}</span>
          </div>
          <span className="text-xs text-gray-400">{step + 1} of {totalSteps}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-gray-100">
        <div
          className="h-full bg-indigo-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center px-5 py-10">
        <div className="w-full max-w-lg">
          {/* Step header */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">
              Step {step + 1} of {totalSteps}
            </p>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{currentConfig.title}</h1>
            <p className="text-gray-400 text-sm">{currentConfig.subtitle}</p>
          </div>

          {/* Step body */}
          <div className="mb-8">
            {step === 0 && <StepBusinessName value={formData.businessName} onChange={v => setFormData(p => ({ ...p, businessName: v }))} />}
            {step === 1 && <StepLogo preview={formData.logoPreview} onChange={(file, preview) => setFormData(p => ({ ...p, logo: file, logoPreview: preview }))} />}
            {step === 2 && <StepDescription value={formData.businessDescription} onChange={v => setFormData(p => ({ ...p, businessDescription: v }))} />}
            {step === 3 && <StepWebsite value={formData.websiteUrl} onChange={v => setFormData(p => ({ ...p, websiteUrl: v }))} />}
            {step === 4 && <StepPhone value={formData.phoneNumber} onChange={v => setFormData(p => ({ ...p, phoneNumber: v }))} />}
            {step === 5 && <StepBrandVoice value={formData.brandVoice} onChange={v => setFormData(p => ({ ...p, brandVoice: v }))} />}
            {step === 6 && <StepPersonality value={formData.aiPersonality} onChange={v => setFormData(p => ({ ...p, aiPersonality: v }))} />}
            {step === 7 && <StepIntegrations value={formData.integrations} onChange={v => setFormData(p => ({ ...p, integrations: v }))} agentIntegrations={agent.integrations} />}
            {step === 8 && <StepReview data={formData} agent={agent} />}
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            {step > 0 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="px-5 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 py-3 px-5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors text-sm shadow-md shadow-indigo-200"
            >
              {step === totalSteps - 1 ? '🚀 Launch My AI Agent' : 'Continue →'}
            </button>
          </div>

          {/* Skip option for optional steps */}
          {[1, 3, 4].includes(step) && (
            <button
              onClick={() => setStep(s => s + 1)}
              className="w-full mt-3 text-center text-xs text-gray-400 hover:text-gray-600 transition-colors py-1"
            >
              Skip for now
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
