import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ listings: data || [] })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, category, short_description, full_description, what_it_does, who_its_for, pricing, external_link, creator_name, creator_website, demo_video_url, tags, rating, review_count } = body
    if (!name || !category || !short_description || !creator_name || !external_link) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now()
    const tagsArray = tags ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : []
    const supabase = await createClient()
    const { data, error } = await supabase.from('listings').insert({
      name, slug, category, short_description,
      full_description: full_description || null,
      what_it_does: what_it_does || null,
      who_its_for: who_its_for || null,
      pricing: pricing || 'Contact for pricing',
      external_link, creator_name,
      creator_website: creator_website || null,
      demo_video_url: demo_video_url || null,
      tags: tagsArray,
      status: 'approved',
      rating: rating || 0,
      review_count: review_count || 0,
      hire_count: 0,
    }).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true, id: data.id })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json()
    if (!id || !status) return NextResponse.json({ error: 'id and status required' }, { status: 400 })
    const supabase = await createClient()
    const { error } = await supabase.from('listings').update({ status }).eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
