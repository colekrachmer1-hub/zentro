import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createClient } from '@/lib/supabase/server'

// GPT-4o-mini pricing (per 1M tokens, as of 2024)
const INPUT_COST_PER_TOKEN = 0.15 / 1_000_000
const OUTPUT_COST_PER_TOKEN = 0.60 / 1_000_000

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { employeeId, prompt } = body

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

    // Call OpenAI
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const systemPrompt = `You are an AI employee with the following profile:

NAME: ${employee.name}
ROLE: ${employee.role}
GOAL: ${employee.goal}

${employee.system_prompt}

Complete the task given by the user. Return a clear, structured, and actionable response. Be concise but thorough.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt.trim() },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    })

    const response = completion.choices[0]?.message?.content || ''
    const inputTokens = completion.usage?.prompt_tokens || 0
    const outputTokens = completion.usage?.completion_tokens || 0
    const totalTokens = completion.usage?.total_tokens || 0
    const costEstimate = (inputTokens * INPUT_COST_PER_TOKEN) + (outputTokens * OUTPUT_COST_PER_TOKEN)

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

    // Update employee performance score (rolling average toward 100 as tasks complete)
    const newScore = Math.min(
      100,
      employee.performance_score + (100 - employee.performance_score) * 0.05
    )
    await supabase
      .from('employees')
      .update({ performance_score: newScore })
      .eq('id', employeeId)

    // Log activity
    await supabase.from('activity_logs').insert({
      user_id: user.id,
      employee_id: employeeId,
      employee_name: employee.name,
      message: `completed task: "${prompt.trim().slice(0, 80)}${prompt.length > 80 ? '...' : ''}"`,
      type: 'task',
    })

    return NextResponse.json({ task: updatedTask || { ...task, response, status: 'completed', cost_estimate: costEstimate, tokens_used: totalTokens } })
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

    if (employeeId) {
      query = query.eq('employee_id', employeeId)
    }

    const { data, error } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ tasks: data })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
