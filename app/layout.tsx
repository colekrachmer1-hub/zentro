import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zentro – AI Workforce Manager',
  description: 'Create AI employees that work 24/7. Manage your AI workforce in one dashboard.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
