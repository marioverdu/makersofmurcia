import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const ogUrl = (await kv.get<string>('og_image_url')) || `${process.env.NEXT_PUBLIC_SITE_URL || 'https://marioverdu.com'}/og-image.jpg`

    const res = await fetch(ogUrl, { cache: 'no-store' })
    if (!res.ok) {
      return new NextResponse('Not Found', { status: 404 })
    }

    const buf = await res.arrayBuffer()
    const contentType = res.headers.get('content-type') || 'image/jpeg'
    return new NextResponse(Buffer.from(buf), {
      status: 200,
      headers: { 'Content-Type': contentType, 'Cache-Control': 'no-store' },
    })
  } catch (e) {
    return new NextResponse('Error', { status: 500 })
  }
}


