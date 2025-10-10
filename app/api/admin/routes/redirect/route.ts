import { NextRequest, NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(request: NextRequest) {
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" || process.env.NODE_ENV === "production"

  try {
    const body = await request.json()
    const { path, redirectTo, modifiedBy } = body

    console.log(`🔄 [${isProduction ? "PROD" : "DEV"}] API POST: Updating redirect ${path} -> ${redirectTo}`)

    if (!path) {
      return NextResponse.json(
        {
          success: false,
          error: "Parámetro 'path' requerido",
          environment: isProduction ? "production" : "development",
        },
        { status: 400 },
      )
    }

    try {
      // Actualizar redirect_to en PostgreSQL
      await sql`
        UPDATE route_management 
        SET 
          redirect_to = ${redirectTo || null},
          modified_by = ${modifiedBy || "admin-panel"},
          updated_at = CURRENT_TIMESTAMP
        WHERE path = ${path}
      `
      
      console.log(`✅ [${isProduction ? "PROD" : "DEV"}] API: Redirect updated in PostgreSQL`)

      return NextResponse.json({
        success: true,
        message: redirectTo 
          ? `Ruta ${path} redirige a ${redirectTo}` 
          : `Redirección eliminada de ${path}`,
        data: { 
          path, 
          redirectTo, 
          modifiedBy, 
          timestamp: new Date().toISOString(), 
          environment: isProduction ? "production" : "development" 
        },
      })
    } catch (dbError) {
      console.error(`❌ [${isProduction ? "PROD" : "DEV"}] Error guardando redirección:`, dbError)

      return NextResponse.json(
        {
          success: false,
          error: "Error guardando en base de datos",
          details: dbError instanceof Error ? dbError.message : "Error desconocido",
          environment: isProduction ? "production" : "development",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error(`❌ [${isProduction ? "PROD" : "DEV"}] Error procesando solicitud POST:`, error)
    return NextResponse.json(
      {
        success: false,
        error: "Error interno del servidor",
        details: error instanceof Error ? error.message : "Error desconocido",
        environment: isProduction ? "production" : "development",
      },
      { status: 500 },
    )
  }
}

