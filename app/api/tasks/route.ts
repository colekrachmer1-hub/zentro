import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'

const OPENAI_INPUT_COST  = 0.15  / 1_000_000   // gpt-4o-mini
const OPENAI_OUTPUT_COST = 0.60  / 1_000_000
const CLAUDE_INPUT_COST  = 3.00  / 1_000_000   // claude-3-5-haiku
const CLAUDE_OUTPUT_COST = 15.00 / 1_000_000

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { employeeId, prompt } = await req.json()
    if (!employeeId || !prompt?.trim()) {
      return NextResponse.json({ error: 'employeeId and prompt are required' }, { status: 400 })
    }

    // Fetch employee (verify ownership)
    const { data: employee, error: empError } = await supabase
      .from('employees')
      .select('*')
      .eq('id', employeeId)
      .eq('user_id', user.id)
      .single()

    if (empError || !employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
    }

    // Fetch user's API keys
    const { data: settings } = await supabase
      .from('user_settings')
      .select('openai_key, anthropic_key')
      .eq('user_id', user.id)
      .single()

    const model: string = employee.model || 'openai'

    // Resolve which API key to use
    const openaiKey    = settings?.openai_key    || process.env.OPENAI_API_KEY
    const anthropicKey = settings?.anthropic_key || process.env.ANTHROPIC_API_KEY

    if (model === 'openai' && !openaiKey) {
      return NextResponse.json({
        error: 'No OpenAI API key found. Add your key in Settings → AI Model API Keys.'
      }, { status: 400 })
    }
    if (model === 'claude' && !anthropicKey) {
      return NextResponse.json({
        error: 'No Anthropic API key found. Add your key in Settings → AI Model API Keys.'
      }, { status: 400 })
    }

    // Create pending task record
    const { data: task, error: taskError } = await supabase
      .from('tasks')
      .insert({
        employee_id: employeeId,
        user_id: user.id,
        prompt: prompt.trim(),
        status: 'pending',
        cost_estimate: 0,
        tokens_used: 0,
      })
      .select()
      .single()

    if (taskError || !task) {
      return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
    }

    const systemPrompt = `You are an AI employee with the following profile:

NAME: ${employee.name}
ROLE: ${employee.role}
GOAL: ${employee.goal}

${employee.system_prompt}

Complete the task given by the user. Return a clear, structured, and actionable response. Be specific and thorough.`

    let response = ''
    let inputTokens = 0
    let outputTokens = 0
    let costEstimate = 0

    // ── OpenAI ──────────────────────────────────────────────
    if (model === 'openai') {
      const openai = new OpenAI({ apiKey: openaiKey })
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt.trim() },
        ],
        max_tokens: 2000,
        temperature: 0.7,
      })
      response      = completion.choices[0]?.message?.content || ''
      inputTokens   = completion.usage?.prompt_tokens     || 0
      outputTokens  = completion.usage?.completion_tokens || 0
      costEstimate  = inputTokens * OPENAI_INPUT_COST + outputTokens * OPENAI_OUTPUT_COST
    }

    // ── Claude ──────────────────────────────────────────────
    if (model === 'claude') {
      const anthropic = new Anthropic({ apiKey: anthropicKey })
      const message = await anthropic.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2000,
        system: systemPrompt,
        messages: [{ role: 'user', content: prompt.trim() }],
      })
      const block = message.content[0]
      response     = block.type === 'text' ? block.text : ''
      inputTokens  = message.usage.input_tokens
      outputTokens = message.usage.output_tokens
      costEstimate = inputTokens * CLAUDE_INPUT_COST + outputTokens * CLAUDE_OUTPUT_COST
    }

    const totalTokens = inputTokens + outputTokens

    // Update task with result
    const { data: updatedTask } = await supabase
      .from('tasks')
      .update({
        response,
        status: 'completed',
        cost_estimate: costEstimate,
        tokens_used: totalTokens,
      })
      .eq('id', task.id)
      .select()
      .single()

    // Update employee performance score
    const newScore = Math.min(100, employee.performance_score + (100 - employee.performance_score) * 0.05)
    await supabase
      .from('employees')
      .update({ performance_score: newScore })
      .eq('id', employeeId)

    // Log activity
    const modelLabel = model === 'claude' ? 'Claude' : 'GPT-4o-mini'
    await supabase.from('activity_logs').insert({
      user_id: user.id,
      employee_id: employeeId,
      employee_name: employee.name,
      message: `completed: "${prompt.trim().slice(0, 80)}${prompt.length > 80 ? '...' : ''}" via ${modelLabel}`,
      type: 'task',
    })

    return NextResponse.json({
      task: updatedTask || { ...task, response, status: 'completed', cost_estimate: costEstimate, tokens_used: totalTokens }
    })

  } catch (err: unknown) {
    console.error('Task API error:', err)
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const employeeId = searchParams.get('employeeId')

    let query = supabase
      .from('tasks')
      .select('*, employees(name, role)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50)

    if (employeeId) query = query.eq('employee_id', employeeId)

    const { data, error } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ tasks: data })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
