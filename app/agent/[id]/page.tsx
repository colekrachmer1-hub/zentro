import { MOCK_AGENTS } from '@/lib/mock-agents'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import AgentDetailClient from '@/components/AgentDetailClient'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const agent = MOCK_AGENTS.find(a => a.id === id)
  if (!agent) return { title: 'Agent Not Found | Zentro' }
  return {
    title: `${agent.name} – ${agent.tagline} | Zentro`,
    description: agent.description,
    keywords: [agent.name, agent.category, 'AI agent', ...agent.tags],
    openGraph: { title: `${agent.name} | Zentro`, description: agent.description, siteName: 'Zentro', url: `https://hirezentro.com/agent/${id}` },
    alternates: { canonical: `https://hirezentro.com/agent/${id}` },
  }
}

export default async function AgentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const agent = MOCK_AGENTS.find(a => a.id === id)
  if (!agent) notFound()
  return <AgentDetailClient agent={agent} />
}
