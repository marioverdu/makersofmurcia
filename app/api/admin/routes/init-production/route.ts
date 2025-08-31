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
