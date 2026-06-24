import { NextResponse } from 'next/server'
export async function GET() {
  return NextResponse.json({ message: 'Deprecated. Use /api/listings instead.' }, { status: 301 })
}
