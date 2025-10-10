import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Log the test request
    console.log("Email API test request received:", data)

    return NextResponse.json({
      success: true,
      message: "API endpoint is working correctly (no email service configured)",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      requestData: {
        ...data,
        // Don't log potentially sensitive information
        userId: data.userId ? "✓" : "✗",
      },
    })
  } catch (error) {
    console.error("Error in send-email test API route:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
      },
      { status: 500 },
    )
  }
}
