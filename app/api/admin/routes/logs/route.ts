import { type NextRequest, NextResponse } from "next/server"
import { RouteVisibilityManager } from "@/lib/route-visibility"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = Number.parseInt(searchParams.get("limit") || "100")

  try {
    const logs = await RouteVisibilityManager.getAccessLogs(limit)

    return NextResponse.json({
      success: true,
      data: {
        logs,
        count: logs.length,
      },
    })
  } catch (error) {
    console.error("Error getting access logs:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
