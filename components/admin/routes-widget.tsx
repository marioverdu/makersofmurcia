"use client"

import React, { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Database, Route, RefreshCw, AlertTriangle } from "lucide-react"
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
  redirectTo?: string | null
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
  data?: {
    routes: Route[]
    stats: RouteStats
    meta: {
      generatedAt: string
      environment: string
      dbConnected: boolean
    }
  }
  error?: string
}

export function RoutesWidget() {
  const [routes, setRoutes] = useState<Route[]>([])
  const [stats, setStats] = useState<RouteStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [dbConnected, setDbConnected] = useState(false)
  const [environment, setEnvironment] = useState<string>("development")
  // Dev rewrites desactivados para simplificar UI
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<string>('__ALL__')

  // Texto con desplazamiento horizontal en hover si hay overflow
  function RoutePathText({ text }: { text: string }) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const contentRef = useRef<HTMLDivElement | null>(null)
    const [isOverflowing, setIsOverflowing] = useState(false)

    useEffect(() => {
      const container = containerRef.current
      const content = contentRef.current
      if (!container || !content) return
      // pequeño timeout para asegurar layout calculado
      const id = window.requestAnimationFrame(() => {
        setIsOverflowing(content.scrollWidth > container.clientWidth + 2)
      })
      return () => window.cancelAnimationFrame(id)
    }, [text])

    const handleMouseEnter = () => {
      const container = containerRef.current
      const content = contentRef.current
      if (!container || !content) return
      const overflow = content.scrollWidth - container.clientWidth
      if (overflow > 4) {
        // velocidad consistente: ~140px/seg, con límites 1s–4s
        const pixelsPerSecond = 140
        const duration = Math.max(1, Math.min(4, overflow / pixelsPerSecond))
        content.style.transition = `transform ${duration}s linear`
        content.style.transform = `translateX(-${overflow}px)`
      }
    }

    const handleMouseLeave = () => {
      const content = contentRef.current
      if (!content) return
      content.style.transition = 'transform 0.3s ease-out'
      content.style.transform = 'translateX(0)'
    }

    return (
      <div
        ref={containerRef}
        className="relative overflow-hidden max-w-full"
        title={text}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={contentRef} className={`font-mono ${isOverflowing ? '' : 'truncate'} block`}>
          {text}
        </div>
      </div>
    )
  }

  // Detectar entorno
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" || process.env.NODE_ENV === "production"

  const loadRoutes = async (retry = false) => {
    if (retry) {
      setRetryCount(prev => prev + 1)
    }
    
    setLoading(true)
    setError(null)
    
    try {
      console.log(`🔄 [${isProduction ? "PROD" : "DEV"}] Loading routes from API... (attempt ${retryCount + 1})`)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 segundos timeout

      const response = await fetch("/api/admin/routes", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data: ApiResponse = await response.json()

      if (data.success && data.data) {
        setRoutes(data.data.routes)
        setStats(data.data.stats)
        setDbConnected(data.data.meta.dbConnected)
        setEnvironment(data.data.meta.environment)
        setError(null)

        console.log(`✅ [${isProduction ? "PROD" : "DEV"}] Loaded ${data.data.routes.length} routes`)

        toast({
          title: "✅ Rutas cargadas",
          description: `${data.data.routes.length} rutas encontradas`,
        })
      } else {
        throw new Error(data.error || "Invalid API response format")
      }
    } catch (error) {
      console.error(`❌ [${isProduction ? "PROD" : "DEV"}] Error loading routes:`, error)
      
      let errorMessage = "Error desconocido"
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = "Timeout: La API tardó demasiado en responder"
        } else {
          errorMessage = error.message
        }
      }
      
      setError(errorMessage)

      toast({
        title: "❌ Error",
        description: `Error cargando rutas: ${errorMessage}`,
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

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 segundos timeout

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
        signal: controller.signal
      })

      clearTimeout(timeoutId)

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

        // Eliminado: dependencia de localStorage en desarrollo

        toast({
          title: "✅ Actualizado",
          description: `Ruta ${path} ${isVisible ? "activada" : "desactivada"}`,
        })
      } else {
        throw new Error(result.error || "Error desconocido")
      }
    } catch (error) {
      console.error(`❌ [${isProduction ? "PROD" : "DEV"}] Error toggling route:`, error)

      let errorMessage = "Error desconocido"
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = "Timeout: La operación tardó demasiado"
        } else {
          errorMessage = error.message
        }
      }

      toast({
        title: "❌ Error",
        description: `Error actualizando ruta: ${errorMessage}`,
        variant: "destructive",
      })
    } finally {
      setUpdating(null)
    }
  }

  const updateRedirect = async (path: string, redirectTo: string | null) => {
    try {
      console.log(`🔄 [${isProduction ? "PROD" : "DEV"}] Updating redirect ${path} -> ${redirectTo}`)

      const response = await fetch("/api/admin/routes/redirect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path,
          redirectTo: redirectTo === "none" ? null : redirectTo,
          modifiedBy: "admin-panel",
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Actualizar estado local
        setRoutes((prev) =>
          prev.map((route) =>
            route.path === path
              ? { ...route, redirectTo: redirectTo === "none" ? null : redirectTo }
              : route,
          ),
        )

        toast({
          title: "✅ Redirección actualizada",
          description: redirectTo === "none" 
            ? `Sin redirección en ${path}` 
            : `${path} → ${redirectTo}`,
        })
      } else {
        throw new Error(result.error || "Error desconocido")
      }
    } catch (error) {
      console.error(`❌ [${isProduction ? "PROD" : "DEV"}] Error updating redirect:`, error)

      toast({
        title: "❌ Error",
        description: `Error actualizando redirección`,
        variant: "destructive",
      })
    }
  }

  // Rewrites deshabilitados

  useEffect(() => {
    loadRoutes()
  }, [])

  // Rewrites deshabilitados

  const allRoutes = React.useMemo(() => {
    const sorted = [...routes].sort((a, b) => a.path.localeCompare(b.path))
    // Insertar item "Activar todas" al inicio (pseudo-ruta)
    return [
      {
        path: '__ALL__',
        type: 'meta',
        category: 'admin',
        isVisible: false,
        isIndexable: false,
        isProtected: false,
        robotsAllow: false,
        sitemapInclude: false,
        priority: -1,
        accessCount: 0,
        lastModified: undefined,
        modifiedBy: undefined,
        lastAccessed: undefined
      } as any,
      ...sorted,
    ]
  }, [routes])

  // Tabs: "Todas" + slugs de páginas de producción (excluye /api, /admin, assets, y tipos no page)
  const productionPageSlugs = React.useMemo(() => {
    const pages = routes
      .filter(r => r.type === 'page' && !r.path.startsWith('/api') && !r.path.startsWith('/admin'))
      .map(r => {
        // slug base sin locale, tomar primer segmento significativo
        const parts = r.path.split('/').filter(Boolean)
        // ejemplos: '/', '/work-experience', '/posts', '/[lang]/work-experience'
        if (r.path === '/') return 'root'
        if (parts[0] === '[lang]' && parts[1]) return parts[1]
        return parts[0] || 'root'
      })
      .filter(Boolean)

    const unique = Array.from(new Set(pages))
    unique.sort()
    return ['__ALL__', ...unique]
  }, [routes])

  const filteredRoutes = React.useMemo(() => {
    if (activeTab === '__ALL__') return allRoutes
    return allRoutes.filter(r => {
      if (r.path === '__ALL__') return false
      if (r.type !== 'page') return false
      const parts = r.path.split('/').filter(Boolean)
      if (r.path === '/' && activeTab === 'root') return true
      if (parts[0] === '[lang]' && parts[1]) return parts[1] === activeTab
      return parts[0] === activeTab
    })
  }, [allRoutes, activeTab])

  if (loading && !routes.length) {
    return (
      <Card className="sm:h-60 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between pb-2 flex-shrink-0">
          <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-2">
            <Route className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            Rutas
          </CardTitle>
          <div className="flex items-center gap-2">
            <RefreshCw className="h-3 w-3 animate-spin text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-center flex-1">
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-2">Cargando rutas...</div>
            <div className="text-xs text-gray-400">Obteniendo datos de la API</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="sm:h-60 flex flex-col">
      {/* Tabs arriba del header (encima de "Rutas" y DB) */}
      <div className="flex items-center gap-1 px-6 pt-4">
        <button
          className="h-5 w-5 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50"
          onClick={() => {
            const idx = productionPageSlugs.indexOf(activeTab)
            const prev = Math.max(0, idx - 1)
            setActiveTab(productionPageSlugs[prev])
          }}
          aria-label="Anterior"
        >
          ‹
        </button>
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {productionPageSlugs.map(slug => (
              <button
                key={slug}
                onClick={() => setActiveTab(slug)}
                className={`px-2 py-0.5 text-xs rounded border ${activeTab === slug ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                title={slug === '__ALL__' ? 'Todas' : `/${slug === 'root' ? '' : slug}`}
              >
                {slug === '__ALL__' ? 'Todas' : (slug === 'root' ? '/' : `/${slug}`)}
              </button>
            ))}
          </div>
        </div>
        <button
          className="h-5 w-5 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50"
          onClick={() => {
            const idx = productionPageSlugs.indexOf(activeTab)
            const next = Math.min(productionPageSlugs.length - 1, idx + 1)
            setActiveTab(productionPageSlugs[next])
          }}
          aria-label="Siguiente"
        >
          ›
        </button>
      </div>
      <CardHeader className="flex flex-row items-center justify-between pb-2 flex-shrink-0">
        <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-2">
          <Route className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          Rutas
          {error && (
            <AlertTriangle className="h-3 w-3 text-red-500" />
          )}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant={dbConnected ? "default" : "secondary"} className="text-xs">
            <Database className="h-2 w-2 mr-1" />
            {dbConnected ? "DB" : "No DB"}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => loadRoutes(true)}
            disabled={loading}
            className="h-6 w-6 p-0"
          >
            <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex flex-col justify-between flex-1 min-h-0">
        {/* Stats removidos para priorizar la lista de rutas */}

        {/* Routes List - Compact */}
        <div className="flex-1 min-h-0">
          {loading && !routes.length ? (
            <div className="text-center py-4">
              <div className="text-sm text-gray-500">Cargando rutas...</div>
            </div>
          ) : (
            <div className="space-y-1 max-h-32 overflow-y-auto overflow-x-hidden pr-1">
              {filteredRoutes.map((route) => (
                <div key={`${route.path}-${route.type}`} className="flex w-full items-center gap-1.5 p-1.5 bg-gray-50 rounded text-xs overflow-hidden">
                  {/* Indicador de estado */}
                  <div className={`h-1 w-1 rounded-full flex-shrink-0 ${route.isVisible ? "bg-green-500" : "bg-red-500"}`} />
                  
                  {/* Nombre de ruta con efecto rollover - MÁXIMA PRIORIDAD VISUAL */}
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <RoutePathText text={route.path === '__ALL__' ? 'Activar todas las rutas' : route.path} />
                  </div>
                  
                  {/* Badge de protección */}
                  {route.isProtected && (
                    <Badge variant="secondary" className="text-xs px-1 py-0 flex-shrink-0">
                      A
                    </Badge>
                  )}
                  
                  {/* Dropdown de redirección - SIEMPRE visible para configurar redirecciones */}
                  {route.path !== '__ALL__' && (
                    <Select
                      value={route.redirectTo || "none"}
                      onValueChange={(value) => updateRedirect(route.path, value)}
                    >
                      <SelectTrigger className="h-5 w-6 text-xs border-gray-300 px-0.5 flex-shrink-0">
                        <SelectValue>
                          <span className="text-[10px]">→</span>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        <SelectItem value="none" className="text-xs">
                          <span className="flex items-center gap-1">
                            <span className="text-gray-400">—</span>
                            <span>Sin redirección</span>
                          </span>
                        </SelectItem>
                        {/* Deduplicar rutas por path antes de renderizar */}
                        {Array.from(
                          new Map(
                            routes
                              .filter(r => 
                                r.path !== route.path && 
                                r.path !== '__ALL__' && 
                                !r.path.startsWith('/api') && 
                                !r.path.startsWith('/admin') &&
                                !r.path.includes('[') && // Excluir rutas dinámicas como /[lang], /[id], etc.
                                !r.path.includes(']')
                              )
                              .map(r => [r.path, r])
                          ).values()
                        )
                          .slice(0, 25)
                          .map(r => (
                            <SelectItem key={r.path} value={r.path} className="text-xs font-mono">
                              {r.path}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  )}
                  
                  {/* Switch - DERECHA */}
                  <div className="flex items-center flex-shrink-0">
                    {/* Dev rewrite select eliminado para reducir ruido visual */}
                     <Switch
                       checked={route.path === '__ALL__' ? false : route.isVisible}
                       onCheckedChange={async (checked) => {
                         if (route.path === '__ALL__') {
                           setUpdating('__ALL__')
                           try {
                             const controller = new AbortController()
                             const timeoutId = setTimeout(() => controller.abort(), 10000)
                             const resp = await fetch('/api/admin/routes/bulk', {
                               method: 'POST',
                               headers: { 'Content-Type': 'application/json' },
                               body: JSON.stringify({ isVisible: true, modifiedBy: 'admin-panel' }),
                               signal: controller.signal
                             })
                             clearTimeout(timeoutId)
                             const json = await resp.json()
                             if (!resp.ok || !json.success) throw new Error(json.error || 'Bulk failed')
                             // Refrescar lista
                             await loadRoutes(true)
                             toast({ title: '✅ Rutas activadas', description: `Se activaron ${json.total} rutas` })
                           } catch (e: any) {
                             toast({ title: '❌ Error', description: e?.message || 'No se pudo activar', variant: 'destructive' })
                           } finally {
                             setUpdating(null)
                           }
                           return
                         }
                         toggleRouteVisibility(route.path, checked)
                       }}
                       disabled={updating === route.path}
                     />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}