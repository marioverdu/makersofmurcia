import { NextResponse } from "next/server"
import { checkDatabaseConnection } from "@/lib/db"

export async function GET() {
  try {
    const result = await checkDatabaseConnection()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Database check error:", error)
    return NextResponse.json({ connected: false, error: "Mock database check failed" }, { status: 500 })
  }
}
