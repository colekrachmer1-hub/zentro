import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardLayout from '@/components/DashboardLayout'
import EmployeeCard from '@/components/EmployeeCard'
import Link from 'next/link'

export default async function EmployeesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: employees } = await supabase
    .from('employees')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const activeCount = (employees || []).filter((e) => e.status === 'active').length

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Workers</h1>
          <p className="text-sm text-gray-500 mt-1">
            {employees?.length || 0} workers · {activeCount} active
          </p>
        </div>
        <Link href="/employees/new" className="btn-primary">
          + Add AI Worker
        </Link>
      </div>

      {(!employees || employees.length === 0) ? (
        <div className="card p-16 text-center">
          <div className="text-5xl mb-4">👥</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No AI workers yet</h2>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            Add your first AI worker and assign them a goal to get started.
          </p>
          <Link href="/employees/new" className="btn-primary">
            + Add First AI Worker
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((emp) => (
            <EmployeeCard key={emp.id} employee={emp} />
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}
