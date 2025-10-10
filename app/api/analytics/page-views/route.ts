import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

// Devuelve el número de usuarios únicos que han visto una página
// Cómputo: COUNT(DISTINCT COALESCE(user_id, session_id)) filtrando event_type='pageview'
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page_path = searchParams.get('page_path')
    if (!page_path) {
      return NextResponse.json({ error: 'Missing page_path' }, { status: 400 })
    }

    const result = await sql`
      SELECT COUNT(DISTINCT COALESCE(user_id, session_id)) AS views
      FROM page_events
      WHERE event_type = 'pageview' AND page_path = ${page_path}
    `

    const views = Number(result.rows?.[0]?.views ?? 0)
    return NextResponse.json({ page_path, views })
  } catch (error) {
    console.error('Error fetching unique page views:', error)
    return NextResponse.json({ page_path: null, views: 0 }, { status: 200 })
  }
}

