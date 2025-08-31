import { type NextRequest, NextResponse } from "next/server"
import { RouteVisibilityManager } from "@/lib/route-visibility"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { updates, modifiedBy, action } = body

    if (!Array.isArray(updates) || updates.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Se requiere un array de actualizaciones no vacío",
        },
        { status: 400 },
      )
    }

    // Validar formato de cada actualización
    for (const update of updates) {
      if (!update.path || typeof update.isVisible !== "boolean") {
        return NextResponse.json(
          {
            success: false,
            error: "Cada actualización debe tener path (string) e isVisible (boolean)",
          },
          { status: 400 },
        )
      }
    }

    console.log(`🔄 Procesando ${updates.length} actualizaciones masivas...`)

    let processed = 0
    let errors = 0

    // Procesar cada actualización
    for (const update of updates) {
      try {
        await RouteVisibilityManager.setRouteVisibility(update.path, update.isVisible, modifiedBy || "bulk-admin")
        processed++
      } catch (error) {
        console.warn(`⚠️ Error actualizando ${update.path}:`, error)
        errors++
      }
    }

    console.log(`✅ Procesadas ${processed} actualizaciones, ${errors} errores`)

    return NextResponse.json({
      success: true,
      message: `Actualizaciones masivas completadas: ${processed} exitosas, ${errors} errores`,
      data: {
        processed,
        errors,
        total: updates.length,
        action,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("❌ Error en actualizaciones masivas:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Error procesando actualizaciones masivas",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}
