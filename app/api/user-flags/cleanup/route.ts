import { NextResponse } from "next/server"
import { cleanExpiredFlags } from "@/lib/user-flagging-service"

export async function POST() {
  try {
    await cleanExpiredFlags()
    return NextResponse.json({ success: true, message: "Expired flags cleaned up successfully" })
  } catch (error) {
    console.error("Error cleaning up expired flags:", error)
    return NextResponse.json({ error: "Failed to clean up expired flags" }, { status: 500 })
  }
}

export async function GET() {
  try {
    await cleanExpiredFlags()
    return NextResponse.json({ success: true, message: "Expired flags cleaned up successfully" })
  } catch (error) {
    console.error("Error cleaning up expired flags:", error)
    return NextResponse.json({ error: "Failed to clean up expired flags" }, { status: 500 })
  }
}
