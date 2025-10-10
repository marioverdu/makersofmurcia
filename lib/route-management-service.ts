import { sql } from "@/lib/db"

export interface RouteRecord {
  id: number
  path: string
  is_active: boolean
  is_indexable: boolean
  seo_title?: string
  seo_description?: string
  seo_keywords?: string
  robots_allow: boolean
  sitemap_include: boolean
  created_at: string
  updated_at: string
  modified_by: string
  category: string
  priority: number
  last_accessed?: string
  access_count: number
  redirect_to?: string | null
}

export interface RouteAccessLog {
  id: number
  route_path: string
  ip_address?: string
  user_agent?: string
  access_allowed: boolean
  reason: string
  accessed_at: string
  response_time_ms?: number
  status_code?: number
}

export interface RouteStats {
  total_routes: number
  active_routes: number
  inactive_routes: number
  indexable_routes: number
  non_indexable_routes: number
  sitemap_routes: number
  robots_allowed_routes: number
  last_updated: string
}

export class RouteManagementService {
  private static isProduction(): boolean {
    return (
      process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ||
      process.env.NODE_ENV === "production" ||
      process.env.VERCEL_ENV === "production"
    )
  }

  // Verificar si la base de datos está disponible
  private static isDatabaseAvailable(): boolean {
    return sql !== null
  }

  // Test database connection
  static async testConnection(): Promise<boolean> {
    if (!this.isDatabaseAvailable()) {
      console.log(`🔌 [${this.isProduction() ? "PROD" : "DEV"}] DB Connection test: ❌ No database available`)
      return false
    }

    try {
      const result = await sql`SELECT 1 as test`
      const isConnected = result.length > 0 && result[0].test === 1
      console.log(
        `🔌 [${this.isProduction() ? "PROD" : "DEV"}] DB Connection test: ${isConnected ? "✅ Connected" : "❌ Failed"}`,
      )
      return isConnected
    } catch (error) {
      console.error("❌ Database connection test failed:", error)
      return false
    }
  }

  // Obtener una ruta específica
  static async getRoute(path: string): Promise<RouteRecord | null> {
    if (!this.isDatabaseAvailable()) {
      console.log(`🔍 [${this.isProduction() ? "PROD" : "DEV"}] No database available, returning null for route: ${path}`)
      return null
    }

    try {
      const result = await sql<RouteRecord[]>`
        SELECT * FROM route_management 
        WHERE path = ${path}
        LIMIT 1
      `
      
      if (result.length === 0) {
        console.log(`🔍 [${this.isProduction() ? "PROD" : "DEV"}] Route not found: ${path}`)
        return null
      }

      const route = result[0]
      console.log(`🔍 [${this.isProduction() ? "PROD" : "DEV"}] Route found: ${path} (active: ${route.is_active}, indexable: ${route.is_indexable})`)
      return route
    } catch (error) {
      console.error(`❌ [${this.isProduction() ? "PROD" : "DEV"}] Error getting route ${path}:`, error)
      return null
    }
  }

  // Obtener visibilidad de una ruta (compatibilidad con sistema anterior)
  static async getRouteVisibility(path: string): Promise<boolean> {
    if (!this.isDatabaseAvailable()) {
      console.log(`🔍 [${this.isProduction() ? "PROD" : "DEV"}] No database available, allowing access to: ${path}`)
      return true // En modo sin BD, permitir acceso
    }

    try {
      const route = await this.getRoute(path)
      if (!route) {
        // Si la ruta no existe en la BD, crear un registro por defecto
        await this.createDefaultRoute(path)
        // Obtener la ruta recién creada para verificar su estado
        const newRoute = await this.getRoute(path)
        return newRoute ? newRoute.is_active : this.shouldRouteBeActiveByDefault(path, this.isProduction())
      }
      return route.is_active
    } catch (error) {
      console.error(`❌ [${this.isProduction() ? "PROD" : "DEV"}] Error getting visibility for ${path}:`, error)
      return true // fail-safe
    }
  }

  // Crear ruta por defecto si no existe
  static async createDefaultRoute(path: string): Promise<void> {
    if (!this.isDatabaseAvailable()) {
      console.log(`⚠️ [${this.isProduction() ? "PROD" : "DEV"}] No database available, skipping default route creation for: ${path}`)
      return
    }

    try {
      const category = this.getCategoryFromPath(path)
      const priority = this.getPriorityFromPath(path)
      
      // En producción, solo activar rutas de admin y work-experience por defecto
      const isProduction = this.isProduction()
      const shouldBeActiveByDefault = this.shouldRouteBeActiveByDefault(path, isProduction)
      
      await sql`
        INSERT INTO route_management (path, is_active, is_indexable, category, priority, modified_by)
        VALUES (${path}, ${shouldBeActiveByDefault}, ${shouldBeActiveByDefault}, ${category}, ${priority}, 'system')
        ON CONFLICT (path) DO NOTHING
      `
      console.log(`✅ [${this.isProduction() ? "PROD" : "DEV"}] Created default route: ${path} (active: ${shouldBeActiveByDefault})`)
    } catch (error) {
      console.error(`❌ [${this.isProduction() ? "PROD" : "DEV"}] Error creating default route ${path}:`, error)
    }
  }

  // Determinar si una ruta debe estar activa por defecto
  private static shouldRouteBeActiveByDefault(path: string, isProduction: boolean): boolean {
    // En desarrollo, todas las rutas están activas por defecto
    if (!isProduction) {
      return true
    }
    
    // En producción, solo activar rutas específicas
    const allowedPaths = [
      '/', // Página principal
      '/admin', // Panel de administración
      '/work-experience', // Experiencia de trabajo
    ]
    
    // Permitir todas las subrutas de admin
    if (path.startsWith('/admin')) {
      return true
    }
    
    // Verificar si la ruta está en la lista de permitidas
    return allowedPaths.includes(path)
  }

  // Obtener categoría basada en la ruta
  private static getCategoryFromPath(path: string): string {
    if (path.startsWith('/admin')) return 'admin'
    if (path.startsWith('/api')) return 'api'
    if (path.startsWith('/posts')) return 'content'
    if (path.startsWith('/work-experience')) return 'content'
    if (path.startsWith('/contact')) return 'contact'
    if (path.startsWith('/styleguide')) return 'development'
    if (path === '/') return 'main'
    return 'general'
  }

  // Obtener prioridad basada en la ruta
  private static getPriorityFromPath(path: string): number {
    if (path === '/') return 1
    if (path === '/posts') return 2
    if (path === '/work-experience') return 3
    if (path === '/contact') return 4
    if (path.startsWith('/admin')) return 0
    return 5
  }

  // Establecer visibilidad de una ruta
  static async setRouteVisibility(path: string, isVisible: boolean, modifiedBy = "system"): Promise<void> {
    if (!this.isDatabaseAvailable()) {
      console.log(`⚠️ [${this.isProduction() ? "PROD" : "DEV"}] No database available, skipping visibility update for: ${path}`)
      return
    }

    try {
      // Primero verificar si la ruta existe
      let route = await this.getRoute(path)
      
      if (!route) {
        // Crear la ruta si no existe
        await this.createDefaultRoute(path)
        route = await this.getRoute(path)
      }

      if (route) {
        await sql`
          UPDATE route_management 
          SET 
            is_active = ${isVisible},
            updated_at = CURRENT_TIMESTAMP,
            modified_by = ${modifiedBy}
          WHERE path = ${path}
        `
        console.log(`✅ [${this.isProduction() ? "PROD" : "DEV"}] Route visibility updated: ${path} -> ${isVisible}`)
      }
    } catch (error) {
      console.error(`❌ [${this.isProduction() ? "PROD" : "DEV"}] Error setting visibility for ${path}:`, error)
      throw error
    }
  }

  // Obtener todas las rutas
  static async getAllRoutes(): Promise<RouteRecord[]> {
    if (!this.isDatabaseAvailable()) {
      console.log(`📋 [${this.isProduction() ? "PROD" : "DEV"}] No database available, returning empty routes`)
      return []
    }

    try {
      const result = await sql<RouteRecord[]>`
        SELECT * FROM route_management 
        ORDER BY priority ASC, path ASC
      `
      console.log(`📋 [${this.isProduction() ? "PROD" : "DEV"}] Retrieved ${result.length} routes from database`)
      return result
    } catch (error) {
      console.error(`❌ [${this.isProduction() ? "PROD" : "DEV"}] Error getting all routes:`, error)
      return []
    }
  }

  // Obtener rutas activas para sitemap
  static async getSitemapRoutes(): Promise<RouteRecord[]> {
    if (!this.isDatabaseAvailable()) {
      console.log(`🗺️ [${this.isProduction() ? "PROD" : "DEV"}] No database available, returning empty sitemap routes`)
      return []
    }

    try {
      const result = await sql<RouteRecord[]>`
        SELECT * FROM route_management 
        WHERE is_active = true AND sitemap_include = true
        ORDER BY priority ASC, path ASC
      `
      console.log(`🗺️ [${this.isProduction() ? "PROD" : "DEV"}] Retrieved ${result.length} sitemap routes`)
      return result
    } catch (error) {
      console.error(`❌ [${this.isProduction() ? "PROD" : "DEV"}] Error getting sitemap routes:`, error)
      return []
    }
  }

  // Obtener rutas para robots.txt
  static async getRobotsRoutes(): Promise<{ allow: string[], disallow: string[] }> {
    if (!this.isDatabaseAvailable()) {
      console.log(`🤖 [${this.isProduction() ? "PROD" : "DEV"}] No database available, returning empty robots routes`)
      return { allow: [], disallow: [] }
    }

    try {
      const allowedRoutes = await sql<{ path: string }[]>`
        SELECT path FROM route_management 
        WHERE is_active = true AND robots_allow = true
      `
      
      const disallowedRoutes = await sql<{ path: string }[]>`
        SELECT path FROM route_management 
        WHERE is_active = false OR robots_allow = false
      `

      return {
        allow: allowedRoutes.map((r: { path: string }) => r.path),
        disallow: disallowedRoutes.map((r: { path: string }) => r.path)
      }
    } catch (error) {
      console.error(`❌ [${this.isProduction() ? "PROD" : "DEV"}] Error getting robots routes:`, error)
      return { allow: [], disallow: [] }
    }
  }

  // Actualizar ruta completa
  static async updateRoute(path: string, updates: Partial<RouteRecord>, modifiedBy = "system"): Promise<void> {
    if (!this.isDatabaseAvailable()) {
      console.log(`⚠️ [${this.isProduction() ? "PROD" : "DEV"}] No database available, skipping route update for: ${path}`)
      return
    }

    try {
      // Para simplificar, actualizar solo los campos más importantes
      if (updates.is_active !== undefined) {
        await sql`
          UPDATE route_management 
          SET is_active = ${updates.is_active}, updated_at = CURRENT_TIMESTAMP, modified_by = ${modifiedBy}
          WHERE path = ${path}
        `
      }
      
      if (updates.is_indexable !== undefined) {
        await sql`
          UPDATE route_management 
          SET is_indexable = ${updates.is_indexable}, updated_at = CURRENT_TIMESTAMP, modified_by = ${modifiedBy}
          WHERE path = ${path}
        `
      }
      
      if (updates.robots_allow !== undefined) {
        await sql`
          UPDATE route_management 
          SET robots_allow = ${updates.robots_allow}, updated_at = CURRENT_TIMESTAMP, modified_by = ${modifiedBy}
          WHERE path = ${path}
        `
      }
      
      if (updates.sitemap_include !== undefined) {
        await sql`
          UPDATE route_management 
          SET sitemap_include = ${updates.sitemap_include}, updated_at = CURRENT_TIMESTAMP, modified_by = ${modifiedBy}
          WHERE path = ${path}
        `
      }
      
      if (updates.seo_title !== undefined) {
        await sql`
          UPDATE route_management 
          SET seo_title = ${updates.seo_title}, updated_at = CURRENT_TIMESTAMP, modified_by = ${modifiedBy}
          WHERE path = ${path}
        `
      }
      
      if (updates.seo_description !== undefined) {
        await sql`
          UPDATE route_management 
          SET seo_description = ${updates.seo_description}, updated_at = CURRENT_TIMESTAMP, modified_by = ${modifiedBy}
          WHERE path = ${path}
        `
      }
      
      if (updates.seo_keywords !== undefined) {
        await sql`
          UPDATE route_management 
          SET seo_keywords = ${updates.seo_keywords}, updated_at = CURRENT_TIMESTAMP, modified_by = ${modifiedBy}
          WHERE path = ${path}
        `
      }
      
      if (updates.priority !== undefined) {
        await sql`
          UPDATE route_management 
          SET priority = ${updates.priority}, updated_at = CURRENT_TIMESTAMP, modified_by = ${modifiedBy}
          WHERE path = ${path}
        `
      }
      
      if (updates.category !== undefined) {
        await sql`
          UPDATE route_management 
          SET category = ${updates.category}, updated_at = CURRENT_TIMESTAMP, modified_by = ${modifiedBy}
          WHERE path = ${path}
        `
      }
      
      console.log(`✅ [${this.isProduction() ? "PROD" : "DEV"}] Route updated: ${path}`)
    } catch (error) {
      console.error(`❌ [${this.isProduction() ? "PROD" : "DEV"}] Error updating route ${path}:`, error)
      throw error
    }
  }

  // Registrar acceso a ruta
  static async logRouteAccess(
    path: string,
    ip: string,
    userAgent: string,
    allowed: boolean,
    reason: string,
    responseTimeMs?: number,
    statusCode?: number
  ): Promise<void> {
    if (!this.isDatabaseAvailable()) {
      console.warn(`⚠️ [${this.isProduction() ? "PROD" : "DEV"}] No database available, skipping access logging for: ${path}`)
      return
    }

    try {
      await sql`
        INSERT INTO route_access_logs (
          route_path, ip_address, user_agent, access_allowed, reason, response_time_ms, status_code
        ) VALUES (
          ${path}, ${ip}, ${userAgent}, ${allowed}, ${reason}, ${responseTimeMs || null}, ${statusCode || null}
        )
      `
      
      // Actualizar contador de acceso en la ruta
      if (allowed) {
        await sql`
          UPDATE route_management 
          SET 
            access_count = access_count + 1,
            last_accessed = CURRENT_TIMESTAMP
          WHERE path = ${path}
        `
      }
      
      console.log(`📝 [${this.isProduction() ? "PROD" : "DEV"}] Access logged: ${path} -> ${allowed}`)
    } catch (error) {
      console.warn(`⚠️ [${this.isProduction() ? "PROD" : "DEV"}] Error logging access:`, error)
      // No lanzar error para no interrumpir el flujo principal
    }
  }

  // Obtener estadísticas
  static async getStats(): Promise<RouteStats> {
    if (!this.isDatabaseAvailable()) {
      console.warn(`⚠️ [${this.isProduction() ? "PROD" : "DEV"}] No database available, returning default stats`)
      return {
        total_routes: 0,
        active_routes: 0,
        inactive_routes: 0,
        indexable_routes: 0,
        non_indexable_routes: 0,
        sitemap_routes: 0,
        robots_allowed_routes: 0,
        last_updated: new Date().toISOString()
      }
    }

    try {
      const result = await sql<RouteStats[]>`
        SELECT * FROM route_stats
        LIMIT 1
      `
      
      if (result.length > 0) {
        return result[0]
      }
      
      // Si no hay stats, calcularlas manualmente
      return await this.calculateStats()
    } catch (error) {
      console.warn(`⚠️ [${this.isProduction() ? "PROD" : "DEV"}] Error getting stats:`, error)
      return {
        total_routes: 0,
        active_routes: 0,
        inactive_routes: 0,
        indexable_routes: 0,
        non_indexable_routes: 0,
        sitemap_routes: 0,
        robots_allowed_routes: 0,
        last_updated: new Date().toISOString()
      }
    }
  }

  // Calcular estadísticas manualmente
  private static async calculateStats(): Promise<RouteStats> {
    if (!this.isDatabaseAvailable()) {
      console.warn(`⚠️ [${this.isProduction() ? "PROD" : "DEV"}] No database available, returning default stats`)
      return {
        total_routes: 0,
        active_routes: 0,
        inactive_routes: 0,
        indexable_routes: 0,
        non_indexable_routes: 0,
        sitemap_routes: 0,
        robots_allowed_routes: 0,
        last_updated: new Date().toISOString()
      }
    }

    try {
      const result = await sql`
        SELECT 
          COUNT(*) as total_routes,
          COUNT(*) FILTER (WHERE is_active = true) as active_routes,
          COUNT(*) FILTER (WHERE is_active = false) as inactive_routes,
          COUNT(*) FILTER (WHERE is_indexable = true) as indexable_routes,
          COUNT(*) FILTER (WHERE is_indexable = false) as non_indexable_routes,
          COUNT(*) FILTER (WHERE sitemap_include = true) as sitemap_routes,
          COUNT(*) FILTER (WHERE robots_allow = true) as robots_allowed_routes,
          MAX(updated_at) as last_updated
        FROM route_management
      `
      
      return result[0] as RouteStats
    } catch (error) {
      console.error(`❌ [${this.isProduction() ? "PROD" : "DEV"}] Error calculating stats:`, error)
      return {
        total_routes: 0,
        active_routes: 0,
        inactive_routes: 0,
        indexable_routes: 0,
        non_indexable_routes: 0,
        sitemap_routes: 0,
        robots_allowed_routes: 0,
        last_updated: new Date().toISOString()
      }
    }
  }

  // Actualización masiva
  static async bulkUpdateRoutes(
    updates: Array<{ path: string; is_active: boolean; is_indexable?: boolean }>,
    modifiedBy = "system"
  ): Promise<{ success: number; errors: number }> {
    if (!this.isDatabaseAvailable()) {
      console.warn(`⚠️ [${this.isProduction() ? "PROD" : "DEV"}] No database available, skipping bulk update`)
      return { success: 0, errors: 0 }
    }

    let success = 0
    let errors = 0

    console.log(`🔄 [${this.isProduction() ? "PROD" : "DEV"}] Starting bulk update for ${updates.length} routes`)

    for (const update of updates) {
      try {
        await this.updateRoute(update.path, update, modifiedBy)
        success++
      } catch (error) {
        console.error(`❌ Error en actualización masiva para ${update.path}:`, error)
        errors++
      }
    }

    console.log(
      `✅ [${this.isProduction() ? "PROD" : "DEV"}] Bulk update complete: ${success} successful, ${errors} errors`,
    )
    return { success, errors }
  }

  // Limpiar logs antiguos (más de 30 días)
  static async cleanupOldLogs(): Promise<void> {
    if (!this.isDatabaseAvailable()) {
      console.warn(`⚠️ [${this.isProduction() ? "PROD" : "DEV"}] No database available, skipping old logs cleanup`)
      return
    }

    try {
      const result = await sql`
        DELETE FROM route_access_logs 
        WHERE accessed_at < CURRENT_TIMESTAMP - INTERVAL '30 days'
      `
      console.log(`🧹 [${this.isProduction() ? "PROD" : "DEV"}] Cleaned up old logs`)
    } catch (error) {
      console.warn(`⚠️ [${this.isProduction() ? "PROD" : "DEV"}] Error cleaning up old logs:`, error)
    }
  }

  // Sincronizar rutas desde el escáner dinámico
  static async syncRoutesFromScanner(scannedRoutes: Array<{ path: string; type: string; category: string }>): Promise<void> {
    if (!this.isDatabaseAvailable()) {
      console.warn(`⚠️ [${this.isProduction() ? "PROD" : "DEV"}] No database available, skipping route sync from scanner`)
      return
    }

    try {
      console.log(`🔄 [${this.isProduction() ? "PROD" : "DEV"}] Syncing ${scannedRoutes.length} routes from scanner`)
      
      for (const scannedRoute of scannedRoutes) {
        const category = this.getCategoryFromPath(scannedRoute.path)
        const priority = this.getPriorityFromPath(scannedRoute.path)
        const isProduction = this.isProduction()
        const shouldBeActive = this.shouldRouteBeActiveByDefault(scannedRoute.path, isProduction)
        
        await sql`
          INSERT INTO route_management (path, is_active, is_indexable, category, priority, modified_by)
          VALUES (${scannedRoute.path}, ${shouldBeActive}, ${shouldBeActive}, ${category}, ${priority}, 'scanner')
          ON CONFLICT (path) DO UPDATE SET
            category = EXCLUDED.category,
            priority = EXCLUDED.priority,
            updated_at = CURRENT_TIMESTAMP,
            modified_by = 'scanner'
        `
      }
      
      console.log(`✅ [${this.isProduction() ? "PROD" : "DEV"}] Routes synced successfully`)
    } catch (error) {
      console.error(`❌ [${this.isProduction() ? "PROD" : "DEV"}] Error syncing routes:`, error)
    }
  }

  // Inicializar configuración de producción para rutas existentes
  static async initializeProductionDefaults(): Promise<void> {
    if (!this.isDatabaseAvailable()) {
      console.warn(`⚠️ [${this.isProduction() ? "PROD" : "DEV"}] No database available, skipping production initialization`)
      return
    }

    if (!this.isProduction()) {
      console.log(`🔧 [DEV] Skipping production initialization in development mode`)
      return
    }

    try {
      console.log(`🚀 [PROD] Initializing production defaults for routes`)
      
      // Obtener todas las rutas existentes
      const allRoutes = await this.getAllRoutes()
      
      for (const route of allRoutes) {
        const shouldBeActive = this.shouldRouteBeActiveByDefault(route.path, true)
        
        // Solo actualizar si el estado actual no coincide con el deseado
        if (route.is_active !== shouldBeActive) {
          await sql`
            UPDATE route_management 
            SET 
              is_active = ${shouldBeActive},
              is_indexable = ${shouldBeActive},
              updated_at = CURRENT_TIMESTAMP,
              modified_by = 'production-init'
            WHERE path = ${route.path}
          `
          console.log(`🔄 [PROD] Updated route ${route.path}: active = ${shouldBeActive}`)
        }
      }
      
      console.log(`✅ [PROD] Production defaults initialized successfully`)
    } catch (error) {
      console.error(`❌ [PROD] Error initializing production defaults:`, error)
    }
  }

  // Obtener rutas que están activas por defecto en producción
  static getDefaultActiveRoutes(): string[] {
    return [
      '/', // Página principal
      '/admin', // Panel de administración
      '/work-experience', // Experiencia de trabajo
    ]
  }
}

// Alias para compatibilidad con el sistema anterior
export const RouteVisibilityManager = RouteManagementService
