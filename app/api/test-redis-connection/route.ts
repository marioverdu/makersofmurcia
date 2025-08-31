import { NextResponse } from "next/server"
import { RouteVisibilityManager } from "@/lib/route-visibility"

export async function GET() {
  try {
    console.log("🧪 Testing Redis connection...")

    const result = await RouteVisibilityManager.testConnection()

    return NextResponse.json({
      success: result.connected,
      data: result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Error testing Redis connection:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    })
  }
}
