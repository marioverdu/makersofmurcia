import { type NextRequest, NextResponse } from "next/server"
import { RouteVisibilityManager } from "@/lib/route-visibility"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get("path")

  if (!path) {
    return NextResponse.json({ success: false, error: "Path parameter is required" }, { status: 400 })
  }

  try {
    const isVisible = await RouteVisibilityManager.getRouteVisibility(path)

    return NextResponse.json({
      success: true,
      data: {
        path,
        isVisible,
      },
    })
  } catch (error) {
    console.error("Error checking route visibility:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
