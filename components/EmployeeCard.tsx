import Link from 'next/link'
import type { Employee } from '@/lib/types'
import clsx from 'clsx'

const roleConfig: Record<string, { color: string; bg: string; icon: string; label: string }> = {
  SDR:      { color: 'text-blue-700',    bg: 'bg-blue-50',    icon: '📞', label: 'Sales AI' },
  Research: { color: 'text-purple-700',  bg: 'bg-purple-50',  icon: '🔍', label: 'Research AI' },
  Support:  { color: 'text-emerald-700', bg: 'bg-emerald-50', icon: '💬', label: 'Support AI' },
  Analyst:  { color: 'text-orange-700',  bg: 'bg-orange-50',  icon: '📋', label: 'Assistant AI' },
}

export default function EmployeeCard({ employee }: { employee: Employee }) {
  const score = Math.round(employee.performance_score)
  const cfg = roleConfig[employee.role] || { color: 'text-gray-700', bg: 'bg-gray-50', icon: '🤖', label: employee.role }

  return (
    <Link href={`/employees/${employee.id}`} className="block rounded-2xl border border-gray-100 bg-white p-5 hover:border-gray-200 hover:shadow-sm transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={clsx('w-11 h-11 rounded-xl flex items-center justify-center text-xl', cfg.bg)}>
            {cfg.icon}
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-sm">{employee.name}</div>
            <div className={clsx('text-xs font-medium', cfg.color)}>{cfg.label}</div>
          </div>
        </div>
        <span className={clsx(
          'text-xs px-2 py-1 rounded-full font-medium',
          employee.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-400'
        )}>
          {employee.status === 'active' ? '● Active' : '○ Inactive'}
        </span>
      </div>

      {/* Goal */}
      <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">{employee.goal}</p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <span>🧠</span>
          <span>{employee.model === 'claude' ? 'Claude' : employee.model === 'serpapi' ? 'SerpAPI' : 'GPT-4o'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(score, 100)}%` }} />
          </div>
          <span className="text-xs font-medium text-gray-500">{score}%</span>
        </div>
      </div>
    </Link>
  )
}
