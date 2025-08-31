import { NextResponse } from "next/server"
import { initializeDatabase } from "@/lib/db"

// Esta línea es necesaria para la exportación estática
export const dynamic = "force-static"

export async function GET() {
  console.log("Mock: Database initialization (no real database)")

  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json({
    success: true,
    message: "Mock database initialized successfully",
    timestamp: new Date().toISOString(),
  })
}

export async function POST() {
  try {
    const result = await initializeDatabase()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Database initialization error:", error)
    return NextResponse.json({ success: false, error: "Mock database initialization failed" }, { status: 500 })
  }
}
