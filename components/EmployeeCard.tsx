import Link from 'next/link'
import type { Employee } from '@/lib/types'
import clsx from 'clsx'

const roleColors: Record<string, string> = {
  SDR: 'bg-blue-100 text-blue-700',
  Research: 'bg-purple-100 text-purple-700',
  Support: 'bg-green-100 text-green-700',
  Analyst: 'bg-orange-100 text-orange-700',
}

const roleIcons: Record<string, string> = {
  SDR: '📞',
  Research: '🔍',
  Support: '💬',
  Analyst: '📈',
}

export default function EmployeeCard({ employee }: { employee: Employee }) {
  const score = Math.round(employee.performance_score)
  const scoreColor = score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-500'

  return (
    <Link href={`/employees/${employee.id}`} className="card p-5 hover:shadow-md hover:border-gray-300 transition-all block">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-semibold">
            {employee.name[0].toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-sm">{employee.name}</div>
            <div className="text-xs text-gray-500">{roleIcons[employee.role]} {employee.role}</div>
          </div>
        </div>
        <span className={clsx(
          'badge',
          employee.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
        )}>
          {employee.status === 'active' ? '● Active' : '○ Inactive'}
        </span>
      </div>

      <p className="text-xs text-gray-500 mb-4 line-clamp-2">{employee.goal}</p>

      <div className="flex items-center justify-between">
        <span className={clsx('badge', roleColors[employee.role])}>
          {employee.role}
        </span>
        <div className="flex items-center gap-1.5">
          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-500 rounded-full"
              style={{ width: `${Math.min(score, 100)}%` }}
            />
          </div>
          <span className={clsx('text-xs font-medium', scoreColor)}>{score}%</span>
        </div>
      </div>
    </Link>
  )
}
