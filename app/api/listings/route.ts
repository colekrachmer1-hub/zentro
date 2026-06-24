import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const SAMPLE_LISTINGS = [
  { id: 'sample-1', name: 'SalesBot Pro', category: 'Sales', short_description: 'AI-powered cold outreach specialist that books qualified meetings on autopilot for B2B companies.', creator_name: 'GrowthLabs AI', rating: 4.9, review_count: 128, hire_count: 340, pricing: '$97/mo', tags: ['Cold Email', 'B2B', 'Outreach'], status: 'approved' },
  { id: 'sample-2', name: 'ContentGenius', category: 'Marketing', short_description: 'Generates high-converting blog posts, social content, and ad copy tuned to your brand voice.', creator_name: 'Spark Creative Studio', rating: 4.8, review_count: 94, hire_count: 210, pricing: '$79/mo', tags: ['SEO', 'Copywriting', 'Social Media'], status: 'approved' },
  { id: 'sample-3', name: 'FBA Scout AI', category: 'Amazon FBA', short_description: 'Finds profitable product opportunities, analyzes competition, and tracks margins for Amazon sellers.', creator_name: 'SellerEdge Tools', rating: 4.7, review_count: 211, hire_count: 480, pricing: '$149/mo', tags: ['Product Research', 'Amazon', 'FBA'], status: 'approved' },
  { id: 'sample-4', name: 'TalentMatcher AI', category: 'Recruiting', short_description: 'Screens resumes, ranks candidates, and drafts outreach messages to fill roles 5x faster.', creator_name: 'HireIQ Systems', rating: 4.8, review_count: 67, hire_count: 150, pricing: '$199/mo', tags: ['Resume Screening', 'Recruiting', 'HR'], status: 'approved' },
  { id: 'sample-5', name: 'DealFinder Real Estate AI', category: 'Real Estate', short_description: 'Analyzes MLS data, identifies undervalued properties, and generates investment reports instantly.', creator_name: 'PropTech Labs', rating: 4.6, review_count: 45, hire_count: 90, pricing: '$129/mo', tags: ['MLS Analysis', 'Investment', 'Real Estate'], status: 'approved' },
  { id: 'sample-6', name: 'DeepResearch AI', category: 'Research', short_description: 'Synthesizes academic papers, market reports, and web sources into clear executive summaries.', creator_name: 'Synthesis AI', rating: 4.9, review_count: 83, hire_count: 200, pricing: '$59/mo', tags: ['Research', 'Summarization', 'Analysis'], status: 'approved' },
  { id: 'sample-7', name: 'InboxZero AI', category: 'Productivity', short_description: 'Manages your email inbox, drafts replies, unsubscribes from junk, and keeps you at inbox zero every day.', creator_name: 'FlowState Apps', rating: 4.7, review_count: 156, hire_count: 390, pricing: '$49/mo', tags: ['Email', 'Productivity', 'Automation'], status: 'approved' },
  { id: 'sample-8', name: 'SupportGenie AI', category: 'Support', short_description: 'Handles 80% of customer support tickets automatically with accurate, on-brand responses 24/7.', creator_name: 'CX Innovations', rating: 4.8, review_count: 302, hire_count: 620, pricing: '$149/mo', tags: ['Customer Support', 'Helpdesk', 'Automation'], status: 'approved' },
  { id: 'sample-9', name: 'LinkedInLeads AI', category: 'Sales', short_description: 'Automates LinkedIn prospecting, connection requests, and follow-up sequences for consistent pipeline growth.', creator_name: 'ProspectHQ', rating: 4.6, review_count: 89, hire_count: 175, pricing: '$79/mo', tags: ['LinkedIn', 'Prospecting', 'Sales'], status: 'approved' },
  { id: 'sample-10', name: 'AdOptimizer AI', category: 'Marketing', short_description: 'Continuously tests and optimizes your Meta and Google ad creatives to maximize ROAS automatically.', creator_name: 'PaidGrowth Labs', rating: 4.7, review_count: 71, hire_count: 140, pricing: '$199/mo', tags: ['Meta Ads', 'Google Ads', 'ROAS'], status: 'approved' },
  { id: 'sample-11', name: 'ListingPro AI', category: 'Real Estate', short_description: 'Creates compelling MLS listings, virtual tour scripts, and buyer follow-up sequences for realtors.', creator_name: 'RealtyAI', rating: 4.5, review_count: 38, hire_count: 70, pricing: '$89/mo', tags: ['MLS Listings', 'Real Estate', 'Copywriting'], status: 'approved' },
  { id: 'sample-12', name: 'InventoryIQ', category: 'Amazon FBA', short_description: 'Predicts restock needs, monitors competitor pricing, and automates repricing to protect your Buy Box.', creator_name: 'FBA Mastery Tools', rating: 4.8, review_count: 142, hire_count: 300, pricing: '$99/mo', tags: ['Inventory', 'Repricing', 'Amazon'], status: 'approved' },
]

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const q = searchParams.get('q')
  const sort = searchParams.get('sort') || 'popular'

  try {
    const supabase = await createClient()
    let query = supabase.from('listings').select('*').eq('status', 'approved')
    if (category && category !== 'All') query = query.eq('category', category)
    if (q) query = query.ilike('name', `%${q}%`)
    if (sort === 'newest') query = query.order('created_at', { ascending: false })
    else if (sort === 'rating') query = query.order('rating', { ascending: false })
    else query = query.order('hire_count', { ascending: false })
    const { data, error } = await query
    if (error || !data?.length) return NextResponse.json({ listings: SAMPLE_LISTINGS })
    return NextResponse.json({ listings: data })
  } catch {
    return NextResponse.json({ listings: SAMPLE_LISTINGS })
  }
}
