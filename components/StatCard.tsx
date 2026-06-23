import clsx from 'clsx'

interface StatCardProps {
  label: string
  value: string | number
  icon: string
  color?: string
  sub?: string
}

export default function StatCard({ label, value, icon, color = 'text-brand-600', sub }: StatCardProps) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        <span className={clsx('text-2xl font-bold', color)}>{value}</span>
      </div>
      <div className="text-sm font-medium text-gray-700">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
    </div>
  )
}
