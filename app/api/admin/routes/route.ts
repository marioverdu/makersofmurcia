import { type NextRequest, NextResponse } from "next/server"
import { DynamicRouteScanner } from "@/lib/dynamic-route-scanner"
import { RouteManagementService } from "@/lib/route-management-service"
import { RouteVisibilityManager } from "@/lib/route-visibility"

export async function GET(request: NextRequest) {
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" || process.env.NODE_ENV === "production"

  try {
    console.log(`🔄 [${isProduction ? "PROD" : "DEV"}] API: Obteniendo rutas dinámicamente...`)

    // Test database connection first
    const dbConnected = await RouteManagementService.testConnection()
    console.log(`🔌 [${isProduction ? "PROD" : "DEV"}] DB Connection: ${dbConnected ? "✅" : "❌"}`)

    // Obtener rutas del escáner dinámico (generadas automáticamente)
    const routes = await DynamicRouteScanner.scanRoutes()
    console.log(`✅ [${isProduction ? "PROD" : "DEV"}] API: ${routes.length} rutas encontradas`)

    // Obtener configuraciones de rutas desde la base de datos
    let routeSettings = []
    try {
      routeSettings = await RouteManagementService.getAllRoutes()
      console.log(
        `📊 [${isProduction ? "PROD" : "DEV"}] API: ${routeSettings.length} configuraciones de rutas`,
      )
    } catch (routeError) {
      console.warn(
        `⚠️ [${isProduction ? "PROD" : "DEV"}] Error obteniendo configuraciones, usando valores por defecto:`,
        routeError,
      )
    }

    // Combinar información de rutas con configuraciones de la base de datos
    const routesWithSettings = routes.map((route) => {
      const routeSetting = routeSettings.find((r) => r.path === route.path)
      return {
        ...route,
        isVisible: routeSetting?.is_active ?? true, // Por defecto visible
        isIndexable: routeSetting?.is_indexable ?? true,
        seoTitle: routeSetting?.seo_title,
        seoDescription: routeSetting?.seo_description,
        seoKeywords: routeSetting?.seo_keywords,
        robotsAllow: routeSetting?.robots_allow ?? true,
        sitemapInclude: routeSetting?.sitemap_include ?? true,
        category: routeSetting?.category || route.category,
        priority: routeSetting?.priority || 0,
        lastModified: routeSetting?.updated_at,
        modifiedBy: routeSetting?.modified_by,
        accessCount: routeSetting?.access_count || 0,
        lastAccessed: routeSetting?.last_accessed,
        redirectTo: routeSetting?.redirect_to || null,
      }
    })

    // Obtener estadísticas
    let stats
    try {
      stats = await RouteManagementService.getStats()
    } catch (statsError) {
      console.warn(`⚠️ [${isProduction ? "PROD" : "DEV"}] Error obteniendo stats:`, statsError)
      stats = {
        total_routes: routes.length,
        active_routes: routesWithSettings.filter((r) => r.isVisible).length,
        inactive_routes: routesWithSettings.filter((r) => !r.isVisible).length,
        indexable_routes: routesWithSettings.filter((r) => r.isIndexable).length,
        non_indexable_routes: routesWithSettings.filter((r) => !r.isIndexable).length,
        sitemap_routes: routesWithSettings.filter((r) => r.sitemapInclude).length,
        robots_allowed_routes: routesWithSettings.filter((r) => r.robotsAllow).length,
        last_updated: new Date().toISOString(),
      }
    }

    const response = {
      success: true,
      data: {
        routes: routesWithSettings,
        stats: {
          total: stats.total_routes,
          visible: stats.active_routes,
          hidden: stats.inactive_routes,
          protected: routesWithSettings.filter((r) => r.isProtected).length,
          indexable: stats.indexable_routes,
          nonIndexable: stats.non_indexable_routes,
          sitemap: stats.sitemap_routes,
          robotsAllowed: stats.robots_allowed_routes,
          lastUpdated: stats.last_updated,
        },
        categories: {
          pages: routesWithSettings.filter((r) => r.type === "page").length,
          api: routesWithSettings.filter((r) => r.type === "api").length,
          admin: routesWithSettings.filter((r) => r.category === "admin").length,
          styleguide: routesWithSettings.filter((r) => r.category === "styleguide").length,
        },
        meta: {
          generatedAt: new Date().toISOString(),
          source: "dynamic-scanner",
          environment: isProduction ? "production" : "development",
          dbConnected,
        },
      },
    }

    console.log(`✅ [${isProduction ? "PROD" : "DEV"}] API response prepared successfully`)
    return NextResponse.json(response)
  } catch (error) {
    console.error(`❌ [${isProduction ? "PROD" : "DEV"}] Error en API routes:`, error)

    return NextResponse.json(
      {
        success: false,
        error: "Error obteniendo rutas",
        details: error instanceof Error ? error.message : "Error desconocido",
        timestamp: new Date().toISOString(),
        environment: isProduction ? "production" : "development",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" || process.env.NODE_ENV === "production"

  try {
    const body = await request.json()
    const { path, isVisible, modifiedBy } = body

    console.log(`🔄 [${isProduction ? "PROD" : "DEV"}] API POST: Updating ${path} -> ${isVisible}`)

    if (!path || typeof isVisible !== "boolean") {
      return NextResponse.json(
        {
          success: false,
          error: "Parámetros inválidos. Se requiere path (string) e isVisible (boolean)",
          environment: isProduction ? "production" : "development",
        },
        { status: 400 },
      )
    }

    try {
      // 1) Persistencia en SQL
      await RouteManagementService.setRouteVisibility(path, isVisible, modifiedBy || "anonymous")
      // 2) Replicación inmediata en KV para enforcement en el borde
      await RouteVisibilityManager.setRouteVisibility(path, isVisible, modifiedBy || "admin-panel")
      console.log(`✅ [${isProduction ? "PROD" : "DEV"}] API: Route visibility updated (SQL + KV) successfully`)
    } catch (routeError) {
      console.error(`❌ [${isProduction ? "PROD" : "DEV"}] Error guardando configuración:`, routeError)

      // En production, si falla la BD, devolver error
      if (isProduction) {
        return NextResponse.json(
          {
            success: false,
            error: "Error guardando en base de datos de producción",
            details: routeError instanceof Error ? routeError.message : "Error desconocido",
            environment: "production",
          },
          { status: 500 },
        )
      }

      // En development, continuar
      console.warn(`⚠️ [DEV] Database failed but continuing`)
    }

    return NextResponse.json({
      success: true,
      message: `Ruta ${path} ${isVisible ? "mostrada" : "ocultada"} correctamente`,
      data: {
        path,
        isVisible,
        modifiedBy,
        timestamp: new Date().toISOString(),
        environment: isProduction ? "production" : "development",
      },
    })
  } catch (error) {
    console.error(`❌ [${isProduction ? "PROD" : "DEV"}] Error actualizando visibilidad:`, error)

    return NextResponse.json(
      {
        success: false,
        error: "Error actualizando visibilidad de ruta",
        details: error instanceof Error ? error.message : "Error desconocido",
        environment: isProduction ? "production" : "development",
      },
      { status: 500 },
    )
  }
}
