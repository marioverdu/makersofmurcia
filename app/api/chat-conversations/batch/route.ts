import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const { conversationIds } = await request.json()

    if (!Array.isArray(conversationIds) || conversationIds.length === 0) {
      return NextResponse.json({ error: "conversationIds array is required" }, { status: 400 })
    }

    const conversations = await sql`
      SELECT id, created_at, updated_at, last_activity, flow_state
      FROM conversations
      WHERE id IN (${sql.array(conversationIds)})
    `

    return NextResponse.json(conversations)
  } catch (error: any) {
    console.error("Error fetching batch conversations:", error)
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 })
  }
}
