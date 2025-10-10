import { NextRequest, NextResponse } from 'next/server'
import { incrementViews } from '@/lib/posts-db'

export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const idNum = Number(params.id)
    if (!idNum || Number.isNaN(idNum)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
    }

    await incrementViews(idNum)
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('Error incrementing views:', e)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}


