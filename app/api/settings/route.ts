import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data } = await supabase
    .from('user_settings')
    .select('openai_key, anthropic_key')
    .eq('user_id', user.id)
    .single()

  // Mask keys — only return last 4 chars so UI can show "connected"
  return NextResponse.json({
    openai_key: data?.openai_key ? '••••••••' + data.openai_key.slice(-4) : null,
    anthropic_key: data?.anthropic_key ? '••••••••' + data.anthropic_key.slice(-4) : null,
  })
}

export async function POST(req: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { openai_key, anthropic_key } = await req.json()

  const updates: Record<string, string> = {}
  if (openai_key && !openai_key.includes('•')) updates.openai_key = openai_key.trim()
  if (anthropic_key && !anthropic_key.includes('•')) updates.anthropic_key = anthropic_key.trim()

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ message: 'No changes' })
  }

  const { error } = await supabase
    .from('user_settings')
    .upsert({ user_id: user.id, ...updates }, { onConflict: 'user_id' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ message: 'saved' })
}
