'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

export default function SettingsPage() {
  const [openaiKey, setOpenaiKey] = useState('')
  const [anthropicKey, setAnthropicKey] = useState('')
  const [serpapiKey, setSerpapiKey] = useState('')
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(d => {
        if (d.openai_key) setOpenaiKey(d.openai_key)
        if (d.anthropic_key) setAnthropicKey(d.anthropic_key)
        if (d.serpapi_key) setSerpapiKey(d.serpapi_key)
      })
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setStatus('saving')
    setMessage('')

    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        openai_key: openaiKey,
        anthropic_key: anthropicKey,
        serpapi_key: serpapiKey,
      }),
    })
    const data = await res.json()

    if (res.ok) {
      setStatus('saved')
      setMessage('API keys saved.')
      setTimeout(() => setStatus('idle'), 3000)
    } else {
      setStatus('error')
      setMessage(data.error || 'Failed to save.')
    }
  }

  const openaiConnected = openaiKey.includes('•')
  const anthropicConnected = anthropicKey.includes('•')
  const serpapiConnected = serpapiKey.includes('•')

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account and API keys</p>
      </div>

      <div className="max-w-xl space-y-5">
        <form onSubmit={handleSave} className="card p-6">
          <h2 className="font-semibold text-gray-900 mb-1">AI Model API Keys</h2>
          <p className="text-sm text-gray-500 mb-6">
            Your keys are stored securely and used to power your AI workers. Keys are never shared.
          </p>

          <div className="space-y-5">
            {/* OpenAI */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-700">OpenAI API Key</label>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${openaiConnected ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-400'}`}>
                  {openaiConnected ? '● Connected' : '○ Not set'}
                </span>
              </div>
              <input
                type="password"
                className="input font-mono text-sm"
                placeholder="sk-..."
                value={openaiKey}
                onChange={e => setOpenaiKey(e.target.value)}
                autoComplete="off"
              />
              <p className="text-xs text-gray-400 mt-1">
                Get your key at{' '}
                <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  platform.openai.com/api-keys
                </a>
              </p>
            </div>

            {/* Anthropic */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-700">Anthropic (Claude) API Key</label>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${anthropicConnected ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-400'}`}>
                  {anthropicConnected ? '● Connected' : '○ Not set'}
                </span>
              </div>
              <input
                type="password"
                className="input font-mono text-sm"
                placeholder="sk-ant-..."
                value={anthropicKey}
                onChange={e => setAnthropicKey(e.target.value)}
                autoComplete="off"
              />
              <p className="text-xs text-gray-400 mt-1">
                Get your key at{' '}
                <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  console.anthropic.com
                </a>
              </p>
            </div>

            {/* SerpAPI */}
            <div className="pt-5 border-t border-gray-100">
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <label className="text-sm font-medium text-gray-700">SerpAPI Key</label>
                  <span className="ml-2 text-xs px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full font-medium">Web Search</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${serpapiConnected ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-400'}`}>
                  {serpapiConnected ? '● Connected' : '○ Not set'}
                </span>
              </div>
              <input
                type="password"
                className="input font-mono text-sm"
                placeholder="your-serpapi-key..."
                value={serpapiKey}
                onChange={e => setSerpapiKey(e.target.value)}
                autoComplete="off"
              />
              <p className="text-xs text-gray-400 mt-1">
                Enables your Research AI to search the web in real time. Get a key at{' '}
                <a href="https://serpapi.com/manage-api-key" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  serpapi.com
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-100">
            <button
              type="submit"
              disabled={status === 'saving'}
              className="btn-primary px-5 py-2.5 disabled:opacity-60"
            >
              {status === 'saving' ? 'Saving...' : 'Save API Keys'}
            </button>
            {message && (
              <span className={`text-sm font-medium ${status === 'saved' ? 'text-emerald-600' : 'text-red-500'}`}>
                {status === 'saved' ? '✓ ' : ''}{message}
              </span>
            )}
          </div>
        </form>

        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
          <strong>How it works:</strong> When you run a task, Zentro uses your saved API keys directly. SerpAPI lets Research AI workers search the web before responding. You pay providers directly — Zentro never marks up usage.
        </div>
      </div>
    </DashboardLayout>
  )
}
