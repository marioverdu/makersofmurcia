import { NextRequest, NextResponse } from 'next/server'
import { AnalyticsService } from '@/lib/analytics-service'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '30')
    const type = searchParams.get('type') || 'summary'

    switch (type) {
      case 'summary':
        const summary = await AnalyticsService.getAnalyticsSummary(days)
        return NextResponse.json(summary)

      case 'page-events':
        const pageEvents = await AnalyticsService.getPageEvents({
          page_path: searchParams.get('page_path') || undefined,
          user_id: searchParams.get('user_id') || undefined,
          session_id: searchParams.get('session_id') || undefined,
          start_date: searchParams.get('start_date') || undefined,
          end_date: searchParams.get('end_date') || undefined,
          limit: parseInt(searchParams.get('limit') || '100')
        })
        return NextResponse.json(pageEvents)

      case 'performance':
        const performance = await AnalyticsService.getPerformanceMetrics(
          searchParams.get('page_path') || undefined,
          days
        )
        return NextResponse.json(performance)

      case 'custom-events':
        const customEvents = await AnalyticsService.getCustomEvents({
          event_name: searchParams.get('event_name') || undefined,
          event_category: searchParams.get('event_category') || undefined,
          user_id: searchParams.get('user_id') || undefined,
          start_date: searchParams.get('start_date') || undefined,
          end_date: searchParams.get('end_date') || undefined,
          limit: parseInt(searchParams.get('limit') || '100')
        })
        return NextResponse.json(customEvents)

      default:
        return NextResponse.json({ error: 'Tipo de analítica no válido' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error en API de analíticas:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data } = body

    switch (type) {
      case 'pageview':
        const pageView = await AnalyticsService.trackPageView(data)
        return NextResponse.json(pageView)

      case 'custom-event':
        const customEvent = await AnalyticsService.trackCustomEvent(data)
        return NextResponse.json(customEvent)

      case 'performance':
        const performance = await AnalyticsService.trackPerformance(data)
        return NextResponse.json(performance)

      default:
        return NextResponse.json({ error: 'Tipo de evento no válido' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error en API de analíticas:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
