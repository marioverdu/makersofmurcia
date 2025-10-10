import { NextResponse } from "next/server"
import { ServerRouteScanner } from "@/lib/server-route-scanner"
import { RouteVisibilityManager } from "@/lib/route-visibility"

export async function GET() {
  try {
    const scanner = new ServerRouteScanner()
    const filesystemStats = await scanner.getRouteStats()
    const visibilityStats = await RouteVisibilityManager.getStats()

    return NextResponse.json({
      success: true,
      data: {
        filesystem: filesystemStats,
        visibility: visibilityStats,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Error getting route stats:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
