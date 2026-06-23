export type EmployeeRole = 'SDR' | 'Research' | 'Support' | 'Analyst'
export type EmployeeStatus = 'active' | 'inactive'
export type EmployeeModel = 'openai' | 'claude' | 'serpapi'
export type TaskStatus = 'pending' | 'completed' | 'failed'
export type LogType = 'info' | 'task' | 'system' | 'error'

export interface Employee {
  id: string
  user_id: string
  name: string
  role: EmployeeRole
  goal: string
  system_prompt: string
  model: EmployeeModel
  status: EmployeeStatus
  performance_score: number
  created_at: string
}

export interface Task {
  id: string
  employee_id: string
  user_id: string
  prompt: string
  response: string | null
  status: TaskStatus
  cost_estimate: number
  tokens_used: number
  created_at: string
  employees?: { name: string; role: string }
}

export interface ActivityLog {
  id: string
  user_id: string
  employee_id: string | null
  employee_name: string | null
  message: string
  type: LogType
  created_at: string
}
