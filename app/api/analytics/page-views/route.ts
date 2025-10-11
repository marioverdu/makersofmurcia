import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

// Caché en memoria para reducir consultas a la BD
// Expira cada 5 minutos en producción, 30 segundos en desarrollo
const cache = new Map<string, { views: number; timestamp: number }>()
const CACHE_TTL = process.env.NODE_ENV === 'production' ? 5 * 60 * 1000 : 30 * 1000 // 5min prod, 30s dev

// Devuelve el número de usuarios únicos que han visto una página
// Cómputo: COUNT(DISTINCT COALESCE(user_id, session_id)) filtrando event_type='pageview'
// 🚀 Optimizado con caché para minimizar queries a la BD
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page_path = searchParams.get('page_path')
    if (!page_path) {
      return NextResponse.json({ error: 'Missing page_path' }, { status: 400 })
    }

    // 🚀 Verificar caché primero
    const cached = cache.get(page_path)
    const now = Date.now()
    if (cached && (now - cached.timestamp) < CACHE_TTL) {
      console.log(`✅ [Analytics] Cache HIT for ${page_path}: ${cached.views} views`)
      return NextResponse.json({ 
        page_path, 
        views: cached.views,
        cached: true 
      }, {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
        }
      })
    }

    // 🔍 Cache MISS - consultar BD
    console.log(`🔄 [Analytics] Cache MISS for ${page_path}, querying DB...`)
    const result = await sql`
      SELECT COUNT(DISTINCT COALESCE(user_id, session_id)) AS views
      FROM page_events
      WHERE event_type = 'pageview' AND page_path = ${page_path}
    `

    const views = Number(result.rows?.[0]?.views ?? 0)
    
    // 💾 Guardar en caché
    cache.set(page_path, { views, timestamp: now })
    console.log(`✅ [Analytics] Cached ${page_path}: ${views} views`)
    
    // Limitar tamaño del caché (máximo 1000 entradas)
    if (cache.size > 1000) {
      const firstKey = cache.keys().next().value
      cache.delete(firstKey)
    }
    
    return NextResponse.json({ 
      page_path, 
      views,
      cached: false 
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    })
  } catch (error) {
    console.error('❌ [Analytics] Error fetching unique page views:', error)
    return NextResponse.json({ page_path: null, views: 0 }, { status: 200 })
  }
}

