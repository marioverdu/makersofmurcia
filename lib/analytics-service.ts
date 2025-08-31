import { sql } from './db'

export interface PageEvent {
  id: number
  page_path: string
  user_agent?: string
  ip_address?: string
  referrer?: string
  session_id?: string
  user_id?: string
  event_type: string
  metadata?: any
  created_at: string
}

export interface UserMetric {
  id: number
  user_id?: string
  session_id?: string
  page_views: number
  time_spent: number
  last_activity: string
  created_at: string
  updated_at: string
}

export interface PerformanceMetric {
  id: number
  page_path: string
  load_time?: number
  dom_content_loaded?: number
  window_load?: number
  user_agent?: string
  created_at: string
}

export interface CustomEvent {
  id: number
  event_name: string
  event_category?: string
  event_label?: string
  event_value?: number
  page_path?: string
  user_id?: string
  session_id?: string
  metadata?: any
  created_at: string
}

export interface AnalyticsSummary {
  totalPageViews: number
  uniqueUsers: number
  averageSessionDuration: number
  topPages: Array<{ page: string; views: number }>
  topReferrers: Array<{ referrer: string; count: number }>
  deviceBreakdown: Array<{ device: string; count: number }>
  browserBreakdown: Array<{ browser: string; count: number }>
  recentActivity: PageEvent[]
}

export class AnalyticsService {
  // Registrar evento de página
  static async trackPageView(data: {
    page_path: string
    user_agent?: string
    ip_address?: string
    referrer?: string
    session_id?: string
    user_id?: string
    metadata?: any
  }) {
    try {
      const result = await sql`
        INSERT INTO page_events (page_path, user_agent, ip_address, referrer, session_id, user_id, metadata)
        VALUES (${data.page_path}, ${data.user_agent}, ${data.ip_address}, ${data.referrer}, ${data.session_id}, ${data.user_id}, ${data.metadata ? JSON.stringify(data.metadata) : null})
        RETURNING *
      `
      return result[0]
    } catch (error) {
      console.error('Error tracking page view:', error)
      return null
    }
  }

  // Registrar evento personalizado
  static async trackCustomEvent(data: {
    event_name: string
    event_category?: string
    event_label?: string
    event_value?: number
    page_path?: string
    user_id?: string
    session_id?: string
    metadata?: any
  }) {
    try {
      const result = await sql`
        INSERT INTO custom_events (event_name, event_category, event_label, event_value, page_path, user_id, session_id, metadata)
        VALUES (${data.event_name}, ${data.event_category}, ${data.event_label}, ${data.event_value}, ${data.page_path}, ${data.user_id}, ${data.session_id}, ${data.metadata ? JSON.stringify(data.metadata) : null})
        RETURNING *
      `
      return result[0]
    } catch (error) {
      console.error('Error tracking custom event:', error)
      return null
    }
  }

  // Registrar métrica de rendimiento
  static async trackPerformance(data: {
    page_path: string
    load_time?: number
    dom_content_loaded?: number
    window_load?: number
    user_agent?: string
  }) {
    try {
      const result = await sql`
        INSERT INTO performance_metrics (page_path, load_time, dom_content_loaded, window_load, user_agent)
        VALUES (${data.page_path}, ${data.load_time}, ${data.dom_content_loaded}, ${data.window_load}, ${data.user_agent})
        RETURNING *
      `
      return result[0]
    } catch (error) {
      console.error('Error tracking performance:', error)
      return null
    }
  }

  // Obtener resumen de analíticas
  static async getAnalyticsSummary(days: number = 30): Promise<AnalyticsSummary> {
    try {
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - days)

      // Total de vistas de página
      const pageViewsResult = await sql`
        SELECT COUNT(*) as count FROM page_events 
        WHERE created_at >= ${startDate.toISOString()}
      `
      const totalPageViews = parseInt(pageViewsResult[0]?.count || '0')

      // Usuarios únicos
      const uniqueUsersResult = await sql`
        SELECT COUNT(DISTINCT session_id) as count FROM page_events 
        WHERE created_at >= ${startDate.toISOString()}
      `
      const uniqueUsers = parseInt(uniqueUsersResult[0]?.count || '0')

      // Duración promedio de sesión
      const sessionDurationResult = await sql`
        SELECT AVG(time_spent) as avg_duration FROM user_metrics 
        WHERE updated_at >= ${startDate.toISOString()}
      `
      const averageSessionDuration = Math.round(parseFloat(sessionDurationResult[0]?.avg_duration || '0'))

      // Páginas más visitadas
      const topPagesResult = await sql`
        SELECT page_path, COUNT(*) as views 
        FROM page_events 
        WHERE created_at >= ${startDate.toISOString()}
        GROUP BY page_path 
        ORDER BY views DESC 
        LIMIT 10
      `
      const topPages = topPagesResult.map(row => ({
        page: row.page_path,
        views: parseInt(row.views)
      }))

      // Referrers principales
      const topReferrersResult = await sql`
        SELECT referrer, COUNT(*) as count 
        FROM page_events 
        WHERE created_at >= ${startDate.toISOString()} AND referrer IS NOT NULL
        GROUP BY referrer 
        ORDER BY count DESC 
        LIMIT 10
      `
      const topReferrers = topReferrersResult.map(row => ({
        referrer: row.referrer,
        count: parseInt(row.count)
      }))

      // Desglose por dispositivo
      const deviceBreakdownResult = await sql`
        SELECT 
          CASE 
            WHEN user_agent LIKE '%Mobile%' THEN 'Mobile'
            WHEN user_agent LIKE '%Tablet%' THEN 'Tablet'
            ELSE 'Desktop'
          END as device,
          COUNT(*) as count
        FROM page_events 
        WHERE created_at >= ${startDate.toISOString()}
        GROUP BY device
        ORDER BY count DESC
      `
      const deviceBreakdown = deviceBreakdownResult.map(row => ({
        device: row.device,
        count: parseInt(row.count)
      }))

      // Desglose por navegador
      const browserBreakdownResult = await sql`
        SELECT 
          CASE 
            WHEN user_agent LIKE '%Chrome%' THEN 'Chrome'
            WHEN user_agent LIKE '%Firefox%' THEN 'Firefox'
            WHEN user_agent LIKE '%Safari%' THEN 'Safari'
            WHEN user_agent LIKE '%Edge%' THEN 'Edge'
            ELSE 'Other'
          END as browser,
          COUNT(*) as count
        FROM page_events 
        WHERE created_at >= ${startDate.toISOString()}
        GROUP BY browser
        ORDER BY count DESC
      `
      const browserBreakdown = browserBreakdownResult.map(row => ({
        browser: row.browser,
        count: parseInt(row.count)
      }))

      // Actividad reciente
      const recentActivityResult = await sql`
        SELECT * FROM page_events 
        WHERE created_at >= ${startDate.toISOString()}
        ORDER BY created_at DESC 
        LIMIT 20
      `
      const recentActivity = recentActivityResult.map(row => ({
        id: row.id,
        page_path: row.page_path,
        user_agent: row.user_agent,
        ip_address: row.ip_address,
        referrer: row.referrer,
        session_id: row.session_id,
        user_id: row.user_id,
        event_type: row.event_type,
        metadata: row.metadata,
        created_at: row.created_at
      }))

      return {
        totalPageViews,
        uniqueUsers,
        averageSessionDuration,
        topPages,
        topReferrers,
        deviceBreakdown,
        browserBreakdown,
        recentActivity
      }
    } catch (error) {
      console.error('Error getting analytics summary:', error)
      return {
        totalPageViews: 0,
        uniqueUsers: 0,
        averageSessionDuration: 0,
        topPages: [],
        topReferrers: [],
        deviceBreakdown: [],
        browserBreakdown: [],
        recentActivity: []
      }
    }
  }

  // Obtener eventos de página con filtros
  static async getPageEvents(filters: {
    page_path?: string
    user_id?: string
    session_id?: string
    start_date?: string
    end_date?: string
    limit?: number
  } = {}) {
    try {
      let query = sql`SELECT * FROM page_events WHERE 1=1`
      const params: any[] = []

      if (filters.page_path) {
        query = sql`${query} AND page_path = ${filters.page_path}`
      }
      if (filters.user_id) {
        query = sql`${query} AND user_id = ${filters.user_id}`
      }
      if (filters.session_id) {
        query = sql`${query} AND session_id = ${filters.session_id}`
      }
      if (filters.start_date) {
        query = sql`${query} AND created_at >= ${filters.start_date}`
      }
      if (filters.end_date) {
        query = sql`${query} AND created_at <= ${filters.end_date}`
      }

      query = sql`${query} ORDER BY created_at DESC LIMIT ${filters.limit || 100}`

      const result = await query
      return result
    } catch (error) {
      console.error('Error getting page events:', error)
      return []
    }
  }

  // Obtener métricas de rendimiento
  static async getPerformanceMetrics(page_path?: string, days: number = 30) {
    try {
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - days)

      let query = sql`
        SELECT 
          page_path,
          AVG(load_time) as avg_load_time,
          AVG(dom_content_loaded) as avg_dom_content_loaded,
          AVG(window_load) as avg_window_load,
          COUNT(*) as total_measurements
        FROM performance_metrics 
        WHERE created_at >= ${startDate.toISOString()}
      `

      if (page_path) {
        query = sql`${query} AND page_path = ${page_path}`
      }

      query = sql`${query} GROUP BY page_path ORDER BY avg_load_time ASC`

      const result = await query
      return result.map(row => ({
        page_path: row.page_path,
        avg_load_time: Math.round(parseFloat(row.avg_load_time || '0')),
        avg_dom_content_loaded: Math.round(parseFloat(row.avg_dom_content_loaded || '0')),
        avg_window_load: Math.round(parseFloat(row.avg_window_load || '0')),
        total_measurements: parseInt(row.total_measurements)
      }))
    } catch (error) {
      console.error('Error getting performance metrics:', error)
      return []
    }
  }

  // Obtener eventos personalizados
  static async getCustomEvents(filters: {
    event_name?: string
    event_category?: string
    user_id?: string
    start_date?: string
    end_date?: string
    limit?: number
  } = {}) {
    try {
      let query = sql`SELECT * FROM custom_events WHERE 1=1`

      if (filters.event_name) {
        query = sql`${query} AND event_name = ${filters.event_name}`
      }
      if (filters.event_category) {
        query = sql`${query} AND event_category = ${filters.event_category}`
      }
      if (filters.user_id) {
        query = sql`${query} AND user_id = ${filters.user_id}`
      }
      if (filters.start_date) {
        query = sql`${query} AND created_at >= ${filters.start_date}`
      }
      if (filters.end_date) {
        query = sql`${query} AND created_at <= ${filters.end_date}`
      }

      query = sql`${query} ORDER BY created_at DESC LIMIT ${filters.limit || 100}`

      const result = await query
      return result
    } catch (error) {
      console.error('Error getting custom events:', error)
      return []
    }
  }
}
