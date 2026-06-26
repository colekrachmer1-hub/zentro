'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AIAgent } from '@/lib/mock-agents'

function StarIcon({ filled = true, size = 'sm' }: { filled?: boolean; size?: 'sm' | 'md' }) {
  const sz = size === 'md' ? 'w-5 h-5' : 'w-4 h-4'
  return (
    <svg className={`${sz} ${filled ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function Check() {
  return (
    <svg className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

const TABS = ['Overview', 'Features', 'Integrations', 'Reviews', 'FAQ']

export default function AgentDetailClient({ agent }: { agent: AIAgent }) {
  const [activeTab, setActiveTab] = useState('Overview')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-5 py-4">
          <nav className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/agents" className="hover:text-gray-700 transition-colors">Agents</Link>
            <span>/</span>
            <Link href={`/agents?category=${encodeURIComponent(agent.category)}`} className="hover:text-gray-700 transition-colors">{agent.category}</Link>
            <span>/</span>
            <span className="text-gray-700 font-medium">{agent.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-5 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left — main content */}
          <div className="lg:col-span-2">

            {/* Header */}
            <div className="flex items-start gap-5 mb-8">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center text-4xl shadow-md shrink-0`}>
                {agent.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h1 className="text-2xl font-bold text-gray-900">{agent.name}</h1>
                  {agent.badge && (
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      agent.badge === 'Popular' ? 'bg-blue-50 text-blue-600' :
                      agent.badge === 'New' ? 'bg-emerald-50 text-emerald-600' :
                      agent.badge === 'Featured' ? 'bg-violet-50 text-violet-600' :
                      'bg-orange-50 text-orange-600'
                    }`}>{agent.badge}</span>
                  )}
                </div>
                <p className="text-gray-500 mb-3">{agent.tagline}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < Math.round(agent.rating)} />)}
                    <span className="font-semibold text-gray-900 ml-1">{agent.rating}</span>
                    <span className="text-gray-400">({agent.reviewCount} reviews)</span>
                  </div>
                  <span className="text-gray-300">·</span>
                  <span className="text-gray-500">{agent.installs.toLocaleString()} installs</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-gray-500">⏱ {agent.setupTime} setup</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <div className="flex gap-6">
                {TABS.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
                      activeTab === tab
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            {activeTab === 'Overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">About this agent</h2>
                  <p className="text-gray-600 leading-relaxed">{agent.longDescription}</p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">What it does</h2>
                  <ul className="space-y-3">
                    {agent.whatItDoes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                        <Check />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Who it&apos;s for</h2>
                  <ul className="space-y-2">
                    {agent.whoItsFor.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="text-indigo-400 shrink-0 mt-0.5">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Example conversation */}
                {agent.conversationExamples.length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Example conversation</h2>
                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-3">
                      {agent.conversationExamples[0].map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs lg:max-w-sm px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                            msg.role === 'user'
                              ? 'bg-gray-900 text-white rounded-br-sm'
                              : `bg-gradient-to-br ${agent.gradient} text-white rounded-bl-sm`
                          }`}>
                            {msg.message}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'Features' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">All features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {agent.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Integrations' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Connected integrations</h2>
                <p className="text-sm text-gray-400 mb-6">All integrations are configured automatically during setup. No API keys to manage.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {agent.integrations.map(name => (
                    <div key={name} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-sm shadow-sm">🔗</div>
                      <span className="text-sm font-medium text-gray-700">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Reviews' && (
              <div className="space-y-5">
                <div className="flex items-center gap-6 p-5 bg-gray-50 rounded-2xl border border-gray-100 mb-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-gray-900">{agent.rating}</p>
                    <div className="flex justify-center gap-0.5 my-1">
                      {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < Math.round(agent.rating)} size="md" />)}
                    </div>
                    <p className="text-xs text-gray-400">{agent.reviewCount} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5, 4, 3, 2, 1].map(star => (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 w-3">{star}</span>
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full"
                            style={{ width: star === 5 ? '78%' : star === 4 ? '15%' : star === 3 ? '5%' : '2%' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {agent.reviews.map((review, i) => (
                  <div key={i} className="pb-5 border-b border-gray-100 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${agent.gradient} flex items-center justify-center text-white text-xs font-bold`}>
                          {review.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{review.author}</p>
                          <p className="text-xs text-gray-400">{review.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, s) => <StarIcon key={s} filled={s < review.rating} />)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed pl-12">{review.comment}</p>
                    <p className="text-xs text-gray-400 pl-12 mt-1">{review.date}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'FAQ' && (
              <div className="space-y-3">
                {agent.faqs.map((faq, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
                    >
                      <span className="text-sm font-medium text-gray-900">{faq.q}</span>
                      <svg
                        className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-4 border-t border-gray-100">
                        <p className="text-sm text-gray-600 leading-relaxed pt-3">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-24 space-y-4">
              {/* Purchase card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="mb-4">
                  <p className="text-3xl font-bold text-gray-900">{agent.price}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Billed monthly · Cancel anytime</p>
                </div>

                <Link
                  href={`/setup/${agent.id}`}
                  className="block w-full text-center py-3.5 px-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors text-sm mb-3 shadow-lg shadow-indigo-200"
                >
                  Use This Template →
                </Link>

                <button className="w-full text-center py-3 px-4 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm mb-4">
                  Watch Demo
                </button>

                <ul className="space-y-2.5 text-sm text-gray-600">
                  {[
                    `Setup in ${agent.setupTime}`,
                    'No technical knowledge needed',
                    'Cancel anytime',
                    '14-day free trial',
                    '24/7 support included',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2.5">
                      <Check />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick stats */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">At a glance</p>
                <div className="space-y-3 text-sm">
                  {[
                    { label: 'Category', value: agent.category },
                    { label: 'Setup time', value: agent.setupTime },
                    { label: 'Installs', value: agent.installs.toLocaleString() },
                    { label: 'Rating', value: `${agent.rating} / 5.0` },
                    { label: 'Reviews', value: agent.reviewCount.toLocaleString() },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-gray-400">{label}</span>
                      <span className="font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {agent.tags.map(tag => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-gray-100 bg-gray-50 py-12 px-5 mt-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to deploy {agent.name}?</h2>
          <p className="text-gray-500 mb-6 text-sm">Set up in {agent.setupTime}. No technical knowledge needed. 14-day free trial.</p>
          <Link
            href={`/setup/${agent.id}`}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors text-sm shadow-lg shadow-indigo-200"
          >
            Use This Template
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
