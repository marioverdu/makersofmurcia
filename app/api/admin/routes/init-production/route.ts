import { NextResponse } from 'next/server'
import { RouteManagementService } from '@/lib/route-management-service'
import { RouteVisibilityManager } from '@/lib/route-visibility'

export const dynamic = 'force-dynamic'

export async function POST() {
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production'

  try {
    // Obtener todas las rutas conocidas desde la BD (si disponible)
    let routes: { path: string; is_active: boolean }[] = []
    try {
      routes = await RouteManagementService.getAllRoutes()
    } catch (e) {
      // Si no hay BD disponible, no abortamos; simplemente devolvemos info
      routes = [] as any
    }

    // Aplicar defaults de producción en KV para enforcement inmediato
    let updated = 0
    for (const r of routes) {
      await RouteVisibilityManager.setRouteVisibility(r.path, r.is_active, 'init-production')
      updated++
    }

    return NextResponse.json({
      success: true,
      environment: isProduction ? 'production' : 'development',
      updated,
      total: routes.length,
      message: 'KV sincronizado con estado actual de rutas (BD)'
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from "next/server"
import { RouteManagementService } from "@/lib/route-management-service"

export async function POST(request: NextRequest) {
  try {
    console.log("🚀 [API] Initializing production defaults for routes")
    
    // Verificar que estamos en producción
    const isProduction = process.env.NODE_ENV === "production" || 
                        process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ||
                        process.env.VERCEL_ENV === "production"
    
    if (!isProduction) {
      return NextResponse.json({
        success: false,
        message: "Esta función solo está disponible en producción",
        environment: process.env.NODE_ENV
      }, { status: 400 })
    }

    // Inicializar configuración de producción
    await RouteManagementService.initializeProductionDefaults()
    
    // Obtener estadísticas actualizadas
    const stats = await RouteManagementService.getStats()
    const defaultRoutes = RouteManagementService.getDefaultActiveRoutes()
    
    return NextResponse.json({
      success: true,
      message: "Configuración de producción inicializada correctamente",
      stats,
      defaultActiveRoutes: defaultRoutes,
      environment: "production"
    })
    
  } catch (error) {
    console.error("❌ [API] Error initializing production defaults:", error)
    
    return NextResponse.json({
      success: false,
      message: "Error al inicializar configuración de producción",
      error: error instanceof Error ? error.message : "Error desconocido"
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const isProduction = process.env.NODE_ENV === "production" || 
                        process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ||
                        process.env.VERCEL_ENV === "production"
    
    const defaultRoutes = RouteManagementService.getDefaultActiveRoutes()
    const stats = await RouteManagementService.getStats()
    
    return NextResponse.json({
      success: true,
      isProduction,
      defaultActiveRoutes: defaultRoutes,
      stats,
      message: "Información de configuración de producción obtenida"
    })
    
  } catch (error) {
    console.error("❌ [API] Error getting production info:", error)
    
    return NextResponse.json({
      success: false,
      message: "Error al obtener información de producción",
      error: error instanceof Error ? error.message : "Error desconocido"
    }, { status: 500 })
  }
}
