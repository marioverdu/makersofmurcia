import { kv } from "@vercel/kv"

interface RouteVisibilityRecord {
  path: string
  isVisible: boolean
  lastModified: string
  modifiedBy: string
}

interface RouteAccessLog {
  path: string
  ip: string
  userAgent: string
  allowed: boolean
  reason: string
  timestamp: string
}

export class RouteVisibilityManager {
  private static readonly VISIBILITY_PREFIX = "route_visibility:"
  private static readonly LOG_PREFIX = "route_access_log:"
  private static readonly STATS_KEY = "route_visibility_stats"

  // Detectar si estamos en production
  private static isProduction(): boolean {
    return (
      process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ||
      process.env.NODE_ENV === "production" ||
      process.env.VERCEL_ENV === "production"
    )
  }

  // Test KV connection
  static async testConnection(): Promise<boolean> {
    try {
      const testKey = "test_connection_" + Date.now()
      await kv.set(testKey, "test", { ex: 10 })
      const result = await kv.get(testKey)
      await kv.del(testKey)
      const isConnected = result === "test"
      console.log(
        `🔌 [${this.isProduction() ? "PROD" : "DEV"}] KV Connection test: ${isConnected ? "✅ Connected" : "❌ Failed"}`,
      )
      return isConnected
    } catch (error) {
      console.error("❌ KV connection test failed:", error)
      return false
    }
  }

  // Obtener visibilidad de una ruta específica
  static async getRouteVisibility(path: string): Promise<boolean> {
    try {
      const key = `${this.VISIBILITY_PREFIX}${path}`

      // Intentar obtener desde KV store
      try {
        const record = await kv.get<RouteVisibilityRecord>(key)
        const visibility = record?.isVisible ?? true
        console.log(`🔍 [${this.isProduction() ? "PROD" : "DEV"}] KV visibility for ${path}: ${visibility}`)
        return visibility
      } catch (kvError) {
        console.warn(`⚠️ [${this.isProduction() ? "PROD" : "DEV"}] KV failed for ${path}:`, kvError)

        // En production, si KV falla, devolver true (fail-safe)
        if (this.isProduction()) {
          console.log(`🔒 [PROD] KV failed, defaulting to visible for ${path}`)
          return true
        }

        // En development, intentar localStorage como fallback
        if (typeof window !== "undefined") {
          try {
            const localData = localStorage.getItem("routesVisibility")
            if (localData) {
              const visibility = JSON.parse(localData)
              const localVisibility = visibility[path] ?? true
              console.log(`📱 [DEV] localStorage fallback for ${path}: ${localVisibility}`)
              return localVisibility
            }
          } catch (localError) {
            console.warn(`⚠️ [DEV] localStorage fallback failed:`, localError)
          }
        }

        // Último recurso: devolver true
        return true
      }
    } catch (error) {
      console.warn(`⚠️ Error obteniendo visibilidad para ${path}:`, error)
      return true // fail-safe
    }
  }

  // Establecer visibilidad de una ruta
  static async setRouteVisibility(path: string, isVisible: boolean, modifiedBy = "system"): Promise<void> {
    const key = `${this.VISIBILITY_PREFIX}${path}`
    const record: RouteVisibilityRecord = {
      path,
      isVisible,
      lastModified: new Date().toISOString(),
      modifiedBy,
    }

    try {
      // Siempre intentar guardar en KV store primero
      await kv.set(key, record)
      console.log(`✅ [${this.isProduction() ? "PROD" : "DEV"}] KV updated: ${path} -> ${isVisible}`)

      // Actualizar estadísticas
      await this.updateStats()
    } catch (kvError) {
      console.error(`❌ [${this.isProduction() ? "PROD" : "DEV"}] KV save failed for ${path}:`, kvError)

      // En production, si KV falla, lanzar error
      if (this.isProduction()) {
        throw new Error(`Failed to save route visibility in production: ${kvError.message}`)
      }

      // En development, usar localStorage como fallback
      console.warn(`⚠️ [DEV] Using localStorage fallback for ${path}`)
    }

    // En development, también actualizar localStorage (siempre, como backup)
    if (!this.isProduction() && typeof window !== "undefined") {
      try {
        const localData = localStorage.getItem("routesVisibility") || "{}"
        const visibility = JSON.parse(localData)
        visibility[path] = isVisible
        localStorage.setItem("routesVisibility", JSON.stringify(visibility))
        console.log(`📱 [DEV] localStorage updated: ${path} -> ${isVisible}`)
      } catch (localError) {
        console.warn(`⚠️ [DEV] localStorage update failed:`, localError)
      }
    }
  }

  // Obtener todas las configuraciones de visibilidad
  static async getAllRouteVisibility(): Promise<RouteVisibilityRecord[]> {
    try {
      const keys = await kv.keys(`${this.VISIBILITY_PREFIX}*`)
      console.log(`🔍 [${this.isProduction() ? "PROD" : "DEV"}] Found ${keys.length} visibility keys in KV`)

      if (keys.length === 0) {
        console.log(`📋 [${this.isProduction() ? "PROD" : "DEV"}] No routes found in KV store`)
        return []
      }

      const records = await kv.mget<RouteVisibilityRecord[]>(...keys)
      const validRecords = records.filter(Boolean) as RouteVisibilityRecord[]
      console.log(
        `📋 [${this.isProduction() ? "PROD" : "DEV"}] Returning ${validRecords.length} valid route records from KV`,
      )

      return validRecords
    } catch (error) {
      console.error(`❌ [${this.isProduction() ? "PROD" : "DEV"}] Error getting all visibilities from KV:`, error)

      // En development, intentar localStorage como fallback
      if (!this.isProduction() && typeof window !== "undefined") {
        console.warn("⚠️ [DEV] KV failed, trying localStorage fallback")
        try {
          const localData = localStorage.getItem("routesVisibility")
          if (localData) {
            const visibility = JSON.parse(localData)
            const records = Object.entries(visibility).map(([path, isVisible]) => ({
              path,
              isVisible: isVisible as boolean,
              lastModified: new Date().toISOString(),
              modifiedBy: "localStorage-fallback",
            }))
            console.log(`📱 [DEV] localStorage fallback returned ${records.length} records`)
            return records
          }
        } catch (localError) {
          console.error("❌ [DEV] localStorage fallback also failed:", localError)
        }
      }

      return []
    }
  }

  // Actualización masiva de visibilidad
  static async bulkSetRouteVisibility(
    updates: Array<{ path: string; isVisible: boolean }>,
    modifiedBy = "system",
  ): Promise<{ success: number; errors: number }> {
    let success = 0
    let errors = 0

    console.log(`🔄 [${this.isProduction() ? "PROD" : "DEV"}] Starting bulk update for ${updates.length} routes`)

    for (const update of updates) {
      try {
        await this.setRouteVisibility(update.path, update.isVisible, modifiedBy)
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

  // Registrar acceso a ruta
  static async logRouteAccess(
    path: string,
    ip: string,
    userAgent: string,
    allowed: boolean,
    reason: string,
  ): Promise<void> {
    try {
      const timestamp = new Date().toISOString()
      const logKey = `${this.LOG_PREFIX}${timestamp}_${Math.random().toString(36).substr(2, 9)}`

      const logEntry: RouteAccessLog = {
        path,
        ip,
        userAgent,
        allowed,
        reason,
        timestamp,
      }

      await kv.set(logKey, logEntry, { ex: 86400 * 7 }) // Expirar en 7 días
      console.log(`📝 [${this.isProduction() ? "PROD" : "DEV"}] Access logged: ${path} -> ${allowed}`)
    } catch (error) {
      console.warn("⚠️ Error registrando acceso:", error)
      // No lanzar error para no interrumpir el flujo principal
    }
  }

  // Obtener estadísticas
  static async getStats(): Promise<{
    total: number
    visible: number
    hidden: number
    lastUpdated: string
  }> {
    try {
      const stats = await kv.get(this.STATS_KEY)

      if (stats) {
        return stats as any
      }

      // Si no hay stats, calcularlas
      return await this.calculateStats()
    } catch (error) {
      console.warn("⚠️ Error obteniendo estadísticas:", error)
      return {
        total: 0,
        visible: 0,
        hidden: 0,
        lastUpdated: new Date().toISOString(),
      }
    }
  }

  // Calcular estadísticas
  private static async calculateStats() {
    try {
      const allRecords = await this.getAllRouteVisibility()

      const stats = {
        total: allRecords.length,
        visible: allRecords.filter((r) => r.isVisible).length,
        hidden: allRecords.filter((r) => !r.isVisible).length,
        lastUpdated: new Date().toISOString(),
      }

      await kv.set(this.STATS_KEY, stats, { ex: 300 }) // Cache por 5 minutos
      console.log(`📊 [${this.isProduction() ? "PROD" : "DEV"}] Stats calculated:`, stats)
      return stats
    } catch (error) {
      console.error("❌ Error calculando estadísticas:", error)
      return {
        total: 0,
        visible: 0,
        hidden: 0,
        lastUpdated: new Date().toISOString(),
      }
    }
  }

  // Actualizar estadísticas
  private static async updateStats(): Promise<void> {
    try {
      await this.calculateStats()
    } catch (error) {
      console.warn("⚠️ Error actualizando estadísticas:", error)
    }
  }

  // Limpiar registros antiguos
  static async cleanupOldLogs(): Promise<void> {
    try {
      const keys = await kv.keys(`${this.LOG_PREFIX}*`)
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - 7) // 7 días atrás

      for (const key of keys) {
        const log = await kv.get<RouteAccessLog>(key)
        if (log && new Date(log.timestamp) < cutoffDate) {
          await kv.del(key)
        }
      }
      console.log(`🧹 [${this.isProduction() ? "PROD" : "DEV"}] Cleaned up old logs`)
    } catch (error) {
      console.warn("⚠️ Error limpiando logs antiguos:", error)
    }
  }
}

// Alias para compatibilidad
export const RouteVisibilityService = RouteVisibilityManager
