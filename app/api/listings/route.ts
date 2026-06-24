import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

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
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ listings: data || [] })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
