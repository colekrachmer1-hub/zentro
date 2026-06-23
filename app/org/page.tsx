'use client'

import { useEffect, useState, useCallback } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { createClient } from '@/lib/supabase/client'
import type { Employee } from '@/lib/types'
import ReactFlow, {
  type Node,
  type Edge,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
} from 'reactflow'
import 'reactflow/dist/style.css'

const roleColors: Record<string, { bg: string; border: string; text: string }> = {
  SDR: { bg: '#eff6ff', border: '#3b82f6', text: '#1d4ed8' },
  Research: { bg: '#f5f3ff', border: '#8b5cf6', text: '#6d28d9' },
  Support: { bg: '#f0fdf4', border: '#22c55e', text: '#15803d' },
  Analyst: { bg: '#fff7ed', border: '#f97316', text: '#c2410c' },
}

const rolePositions: Record<string, [number, number]> = {
  SDR: [200, 200],
  Research: [450, 200],
  Support: [700, 200],
  Analyst: [950, 200],
}

function buildOrgChart(employees: Employee[]): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = []
  const edges: Edge[] = []

  // Owner node
  nodes.push({
    id: 'owner',
    type: 'default',
    position: { x: 450, y: 50 },
    data: { label: '👤 You (Owner)' },
    style: {
      background: '#1e293b',
      color: '#f8fafc',
      border: '2px solid #334155',
      borderRadius: '10px',
      fontSize: '13px',
      fontWeight: '600',
      padding: '10px 16px',
      minWidth: '140px',
    },
  })

  // Group employees by role
  const byRole: Record<string, Employee[]> = {}
  employees.forEach((emp) => {
    if (!byRole[emp.role]) byRole[emp.role] = []
    byRole[emp.role].push(emp)
  })

  const roles = Object.keys(byRole)
  const roleXPositions = roles.map((_, i) => 100 + i * 280)

  roles.forEach((role, roleIdx) => {
    const roleX = roleXPositions[roleIdx]
    const colors = roleColors[role] || { bg: '#f9fafb', border: '#d1d5db', text: '#374151' }

    // Role group node
    const roleNodeId = `role-${role}`
    nodes.push({
      id: roleNodeId,
      type: 'default',
      position: { x: roleX, y: 180 },
      data: { label: `${role}s` },
      style: {
        background: colors.bg,
        color: colors.text,
        border: `2px solid ${colors.border}`,
        borderRadius: '10px',
        fontSize: '12px',
        fontWeight: '600',
        padding: '8px 14px',
        minWidth: '100px',
      },
    })

    edges.push({
      id: `owner-${roleNodeId}`,
      source: 'owner',
      target: roleNodeId,
      style: { stroke: '#94a3b8', strokeWidth: 1.5 },
      type: 'smoothstep',
    })

    // Employee nodes under each role
    byRole[role].forEach((emp, empIdx) => {
      const empNodeId = `emp-${emp.id}`
      const empX = roleX - (byRole[role].length - 1) * 70 + empIdx * 140
      nodes.push({
        id: empNodeId,
        type: 'default',
        position: { x: empX, y: 330 },
        data: {
          label: (
            <div className="text-center">
              <div className="font-semibold text-xs">{emp.name}</div>
              <div className="text-[10px] opacity-70 mt-0.5">{emp.role}</div>
              {emp.status === 'inactive' && (
                <div className="text-[10px] text-gray-400 mt-0.5">inactive</div>
              )}
            </div>
          ),
        },
        style: {
          background: emp.status === 'active' ? colors.bg : '#f9fafb',
          color: emp.status === 'active' ? colors.text : '#9ca3af',
          border: `1.5px solid ${emp.status === 'active' ? colors.border : '#e5e7eb'}`,
          borderRadius: '10px',
          fontSize: '12px',
          padding: '8px 12px',
          minWidth: '110px',
          opacity: emp.status === 'active' ? 1 : 0.7,
        },
      })

      edges.push({
        id: `${roleNodeId}-${empNodeId}`,
        source: roleNodeId,
        target: empNodeId,
        style: { stroke: colors.border, strokeWidth: 1.5, opacity: 0.6 },
        type: 'smoothstep',
      })
    })
  })

  return { nodes, edges }
}

export default function OrgChartPage() {
  const supabase = createClient()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])

  const fetchEmployees = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from('employees')
      .select('*')
      .eq('user_id', user.id)
      .order('role')

    const emps = data || []
    setEmployees(emps)
    const chart = buildOrgChart(emps)
    setNodes(chart.nodes)
    setEdges(chart.edges)
    setLoading(false)
  }, [supabase])

  useEffect(() => { fetchEmployees() }, [fetchEmployees])

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Org Chart</h1>
          <p className="text-sm text-gray-500 mt-1">
            {employees.length} AI employees · Drag to explore
          </p>
        </div>
      </div>

      {loading ? (
        <div className="card h-[500px] animate-pulse bg-gray-100" />
      ) : employees.length === 0 ? (
        <div className="card h-[400px] flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4">🌐</div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">No employees yet</h2>
            <p className="text-sm text-gray-400 mb-4">Create AI employees to see your org chart</p>
            <a href="/employees/new" className="btn-primary">+ Hire First Employee</a>
          </div>
        </div>
      ) : (
        <div className="card overflow-hidden" style={{ height: '600px' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            attributionPosition="bottom-right"
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#e5e7eb" />
            <Controls />
            <MiniMap
              style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            />
          </ReactFlow>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex items-center gap-6 flex-wrap">
        {Object.entries(roleColors).map(([role, colors]) => (
          <div key={role} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ background: colors.border }} />
            <span className="text-xs text-gray-600">{role}</span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-300" />
          <span className="text-xs text-gray-600">Inactive</span>
        </div>
      </div>
    </DashboardLayout>
  )
}
