"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Database, Route } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Route {
  path: string
  type: string
  category: string
  isVisible: boolean
  isIndexable: boolean
  isProtected: boolean
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  robotsAllow: boolean
  sitemapInclude: boolean
  priority: number
  accessCount: number
  lastModified?: string
  modifiedBy?: string
  lastAccessed?: string
}

interface RouteStats {
  total: number
  visible: number
  hidden: number
  protected: number
  indexable: number
  nonIndexable: number
  sitemap: number
  robotsAllowed: number
  lastUpdated: string
}

interface ApiResponse {
  success: boolean
  data: {
    routes: Route[]
    stats: RouteStats
    meta: {
      generatedAt: string
      environment: string
      dbConnected: boolean
    }
  }
}

export function RoutesWidget() {
  const [routes, setRoutes] = useState<Route[]>([])
  const [stats, setStats] = useState<RouteStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [dbConnected, setDbConnected] = useState(false)
  const [environment, setEnvironment] = useState<string>("development")
  const [devRewriteMap, setDevRewriteMap] = useState<Record<string, string>>({})
  const { toast } = useToast()

  // Detectar entorno
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" || process.env.NODE_ENV === "production"

  const loadRoutes = async () => {
    setLoading(true)
    try {
      console.log(`🔄 [${isProduction ? "PROD" : "DEV"}] Loading routes from API...`)

      const response = await fetch("/api/admin/routes", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data: ApiResponse = await response.json()

      if (data.success && data.data) {
        setRoutes(data.data.routes)
        setStats(data.data.stats)
        setDbConnected(data.data.meta.dbConnected)
        setEnvironment(data.data.meta.environment)

        console.log(`✅ [${isProduction ? "PROD" : "DEV"}] Loaded ${data.data.routes.length} routes`)

        toast({
          title: "✅ Rutas cargadas",
          description: `${data.data.routes.length} rutas encontradas`,
        })
      } else {
        throw new Error("Invalid API response format")
      }
    } catch (error) {
      console.error(`❌ [${isProduction ? "PROD" : "DEV"}] Error loading routes:`, error)

      toast({
        title: "❌ Error",
        description: `Error cargando rutas: ${error instanceof Error ? error.message : "Error desconocido"}`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const toggleRouteVisibility = async (path: string, isVisible: boolean) => {
    setUpdating(path)

    try {
      console.log(`🔄 [${isProduction ? "PROD" : "DEV"}] Toggling ${path} -> ${isVisible}`)

      const response = await fetch("/api/admin/routes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path,
          isVisible,
          modifiedBy: "admin-panel",
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Actualizar estado local
        setRoutes((prev) =>
          prev.map((route) =>
            route.path === path
              ? { ...route, isVisible, lastModified: new Date().toISOString(), modifiedBy: "admin-panel" }
              : route,
          ),
        )

        // Actualizar stats
        setStats((prev) => {
          if (!prev) return prev
          const visibleDelta = isVisible ? 1 : -1
          return {
            ...prev,
            visible: prev.visible + visibleDelta,
            hidden: prev.hidden - visibleDelta,
            lastUpdated: new Date().toISOString(),
          }
        })

        // En development, también actualizar localStorage
        if (!isProduction && typeof window !== "undefined") {
          const localData = localStorage.getItem("routesVisibility") || "{}"
          const visibility = JSON.parse(localData)
          visibility[path] = isVisible
          localStorage.setItem("routesVisibility", JSON.stringify(visibility))
          console.log(`📱 [DEV] Updated localStorage: ${path} -> ${isVisible}`)
        }

        toast({
          title: "✅ Actualizado",
          description: `Ruta ${path} ${isVisible ? "activada" : "desactivada"}`,
        })
      } else {
        throw new Error(result.error || "Error desconocido")
      }
    } catch (error) {
      console.error(`❌ [${isProduction ? "PROD" : "DEV"}] Error toggling route:`, error)

      toast({
        title: "❌ Error",
        description: `Error actualizando ruta: ${error instanceof Error ? error.message : "Error desconocido"}`,
        variant: "destructive",
      })
    } finally {
      setUpdating(null)
    }
  }

  useEffect(() => {
    loadRoutes()
  }, [])

  // Cargar rewrites desde cookie en desarrollo
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (process.env.NODE_ENV !== 'development') return
    try {
      const cookie = document.cookie.split('; ').find(c => c.startsWith('dev_rewrites='))
      if (cookie) {
        const value = decodeURIComponent(cookie.split('=')[1])
        const parsed = JSON.parse(value)
        if (parsed && typeof parsed === 'object') {
          setDevRewriteMap(parsed)
        }
      }
    } catch (e) {
      console.warn('No se pudo cargar dev_rewrites cookie')
    }
  }, [])

  const persistDevRewrites = (map: Record<string, string>) => {
    if (typeof window === 'undefined') return
    try {
      const value = encodeURIComponent(JSON.stringify(map))
      // Cookie por sesión (sin expires), sólo en dev
      document.cookie = `dev_rewrites=${value}; path=/`;
      // Aviso visual
      toast({ title: '🔁 Rewrites (dev) actualizados', description: 'Actualiza la página destino para ver el efecto.' })
    } catch (e) {
      console.error('Error guardando cookie dev_rewrites', e)
    }
  }

  const handleRewriteChange = (sourcePath: string, destinationPath: string) => {
    const next = { ...devRewriteMap }
    if (!destinationPath) {
      delete next[sourcePath]
    } else {
      next[sourcePath] = destinationPath
    }
    setDevRewriteMap(next)
    persistDevRewrites(next)
  }

  // Todas las rutas van en la sección principal
  const allRoutes = routes

  if (loading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="tracking-tight text-xs sm:text-sm font-medium">Rutas</div>
          <Route className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-lg sm:text-2xl font-bold">Cargando...</div>
          <p className="text-xs text-muted-foreground">Obteniendo datos de rutas</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="routes-widget sm:h-60 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0">
        <div className="tracking-tight text-xs sm:text-sm font-medium">Rutas</div>
        <Route className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col flex-1 min-h-0">
        {/* Compact Single Line Layout */}
        <div className="flex items-center justify-between gap-3">
          {/* Stats */}
          {stats && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded text-xs">
                <div className="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
                <span className="text-green-700 font-medium">{stats.visible}</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-red-50 rounded text-xs">
                <div className="h-1.5 w-1.5 bg-red-500 rounded-full"></div>
                <span className="text-red-700 font-medium">{stats.hidden}</span>
              </div>
            </div>
          )}
          
          {/* Routes Count */}
          <div className="text-xs text-gray-600 font-medium">
            {allRoutes.length} rutas
          </div>
          
          {/* System Info */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>DB: {dbConnected ? "✅" : "❌"}</span>
            <span>{environment}</span>
          </div>
        </div>

        {/* Routes List - Compact */}
        <div className="flex-1 min-h-0">
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {allRoutes.map((route) => (
              <div key={`${route.path}-${route.type}`} className="flex items-center justify-between p-1.5 bg-gray-50 rounded text-xs">
                <div className="flex items-center gap-1 min-w-0 flex-1">
                  <div className={`h-1 w-1 rounded-full flex-shrink-0 ${route.isVisible ? "bg-green-500" : "bg-red-500"}`} />
                  <span className="font-mono truncate">{route.path}</span>
                  {route.isProtected && (
                    <Badge variant="secondary" className="text-xs px-1 py-0">
                      A
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {process.env.NODE_ENV === 'development' && (
                    <select
                      className="text-xs border border-gray-200 rounded px-1 py-0 bg-white/60 text-gray-800 w-12"
                      value={devRewriteMap[route.path] || ''}
                      onChange={(e) => handleRewriteChange(route.path, e.target.value)}
                    >
                      <option value="">—</option>
                      {routes.map(r => (
                        <option key={`${r.path}-${r.type}`} value={r.path} className="truncate">{r.path}</option>
                      ))}
                    </select>
                  )}
                  <Switch
                    checked={route.isVisible}
                    onCheckedChange={(checked) => toggleRouteVisibility(route.path, checked)}
                    disabled={updating === route.path}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
