import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    // Test de conexión
    const result = await sql`SELECT NOW() as current_time`

    // Test de tabla proposals
    const tableCheck = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_name = 'proposals'
    `

    // Contar propuestas
    const count = await sql`SELECT COUNT(*) as total FROM proposals`

    return NextResponse.json({
      success: true,
      database_time: result[0].current_time,
      proposals_table_exists: tableCheck.length > 0,
      total_proposals: count[0].total,
      message: "Base de datos conectada correctamente",
    })
  } catch (error) {
    console.error("Database test error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}
