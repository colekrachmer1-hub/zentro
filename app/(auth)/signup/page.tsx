'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Logo } from '@/components/Logo'

export default function SignupPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'signup' | 'verify'>('signup')
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: undefined,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setStep('verify')
    setLoading(false)
  }

  function handleCodeChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return // digits only
    const newCode = [...code]
    newCode[index] = value.slice(-1) // only last char if pasted
    setCode(newCode)
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleCodeKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handleCodePaste(e: React.ClipboardEvent) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length === 6) {
      setCode(pasted.split(''))
      inputRefs.current[5]?.focus()
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const token = code.join('')
    if (token.length < 6) {
      setError('Please enter the full 6-digit code.')
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'signup',
    })

    if (error) {
      setError('Invalid or expired code. Please try again.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  async function handleResend() {
    setError('')
    await supabase.auth.resend({ type: 'signup', email })
    setCode(['', '', '', '', '', ''])
    inputRefs.current[0]?.focus()
  }

  // ── Step 2: Verify code ──────────────────────────────────────────
  if (step === 'verify') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold">Z</div>
              <span className="text-xl font-semibold text-gray-900">Zentro</span>
            </Link>
            <div className="mt-6 text-4xl">📬</div>
            <h1 className="mt-3 text-2xl font-bold text-gray-900">Check your email</h1>
            <p className="mt-2 text-sm text-gray-500">
              We sent a 6-digit code to <strong>{email}</strong>
            </p>
          </div>

          <div className="card p-8">
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label className="label text-center block mb-4">Enter your code</label>
                <div className="flex gap-2 justify-center" onPaste={handleCodePaste}>
                  {code.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { inputRefs.current[i] = el }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(i, e.target.value)}
                      onKeyDown={(e) => handleCodeKeyDown(i, e)}
                      className="w-12 h-14 text-center text-xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow"
                    />
                  ))}
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn-primary w-full justify-center py-2.5"
                disabled={loading || code.join('').length < 6}
              >
                {loading ? 'Verifying...' : 'Verify & Continue →'}
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-gray-500">
              Didn&apos;t get a code?{' '}
              <button
                onClick={handleResend}
                className="text-brand-600 font-medium hover:text-brand-700"
              >
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ── Step 1: Sign up ──────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo href="/" iconSize={36} />
          <h1 className="mt-6 text-2xl font-bold text-gray-900">Create your account</h1>
          <p className="mt-1 text-sm text-gray-500">Start managing your AI workforce today</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="input"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="input"
                placeholder="Min. 8 characters"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <button type="submit" className="btn-primary w-full justify-center py-2.5" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-4 text-xs text-center text-gray-400">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>

          <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="text-brand-600 font-medium hover:text-brand-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
