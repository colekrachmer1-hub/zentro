import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name, category, short_description, full_description,
      what_it_does, who_its_for, pricing, external_link,
      creator_name, creator_website, demo_video_url, tags,
    } = body

    if (!name || !category || !short_description || !creator_name || !external_link) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const slug =
      name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') +
      '-' +
      Date.now()

    const tagsArray = tags
      ? tags.split(',').map((t: string) => t.trim()).filter(Boolean)
      : []

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('listings')
      .insert({
        name,
        slug,
        category,
        short_description,
        full_description,
        what_it_does,
        who_its_for,
        pricing: pricing || 'Contact for pricing',
        external_link,
        creator_name,
        creator_website,
        demo_video_url,
        tags: tagsArray,
        status: 'pending_review',
      })
      .select()
      .single()

    if (error) {
      console.error('Submit error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data.id })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
