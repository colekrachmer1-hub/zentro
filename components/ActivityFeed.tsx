import type { ActivityLog } from '@/lib/types'
import { formatDistanceToNow } from 'date-fns'
import clsx from 'clsx'

const typeConfig = {
  info: { icon: 'ℹ️', color: 'text-blue-600 bg-blue-50' },
  task: { icon: '⚡', color: 'text-brand-600 bg-brand-50' },
  system: { icon: '⚙️', color: 'text-gray-600 bg-gray-100' },
  error: { icon: '⚠️', color: 'text-red-600 bg-red-50' },
}

export default function ActivityFeed({ logs }: { logs: ActivityLog[] }) {
  if (logs.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <div className="text-3xl mb-2">📭</div>
        <p className="text-sm">No activity yet. Create an employee and run a task to get started.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {logs.map((log) => {
        const config = typeConfig[log.type] || typeConfig.info
        const timeAgo = formatDistanceToNow(new Date(log.created_at), { addSuffix: true })

        return (
          <div key={log.id} className="flex items-start gap-3">
            <div className={clsx('w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5', config.color)}>
              {config.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                {log.employee_name && (
                  <span className="text-xs font-semibold text-gray-700">{log.employee_name}</span>
                )}
                <span className="text-xs text-gray-600">{log.message}</span>
              </div>
              <div className="text-xs text-gray-400 mt-0.5">{timeAgo}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
