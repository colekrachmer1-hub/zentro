import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardLayout from '@/components/DashboardLayout'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account and AI worker configuration</p>
      </div>

      <div className="max-w-2xl space-y-4">
        {/* Account */}
        <div className="card p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Account</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">Email</span>
              <span className="text-gray-900 font-medium">{user.email}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">Plan</span>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">Early Access</span>
            </div>
          </div>
        </div>

        {/* API Keys */}
        <div className="card p-6">
          <h2 className="font-semibold text-gray-900 mb-2">AI Model API Keys</h2>
          <p className="text-sm text-gray-500 mb-4">Connect your own API keys to power your AI workers.</p>
          <div className="space-y-3">
            {[
              { label: 'OpenAI API Key', placeholder: 'sk-...', connected: true },
              { label: 'Anthropic (Claude) API Key', placeholder: 'sk-ant-...', connected: false },
            ].map(key => (
              <div key={key.label} className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="text-xs font-medium text-gray-700 block mb-1">{key.label}</label>
                  <input
                    type="password"
                    placeholder={key.placeholder}
                    className="input text-sm"
                    disabled
                  />
                </div>
                <div className="pt-5">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${key.connected ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-400'}`}>
                    {key.connected ? 'Connected' : 'Not set'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">API key management coming in the next release.</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
