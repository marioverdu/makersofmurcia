import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { meetingId, userId, message, type } = await request.json()

    if (!meetingId || !userId || !message || !type) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: meetingId, userId, message, type" },
        { status: 400 },
      )
    }

    const result = await sql`
      INSERT INTO chat_notifications (meeting_id, user_id, message, type)
      VALUES (${meetingId}, ${userId}, ${message}, ${type})
      RETURNING *;
    `

    return NextResponse.json({ success: true, notification: result[0] }, { status: 201 })
  } catch (error: any) {
    console.error("Error creating meeting notification:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create meeting notification." },
      { status: 500 },
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const meetingId = searchParams.get("meetingId")

    let query = sql`SELECT * FROM chat_notifications`
    const conditions = []
    const params = []

    if (userId) {
      conditions.push(`user_id = $${params.length + 1}`)
      params.push(userId)
    }
    if (meetingId) {
      conditions.push(`meeting_id = $${params.length + 1}`)
      params.push(meetingId)
    }

    if (conditions.length > 0) {
      query = sql`SELECT * FROM chat_notifications WHERE ${sql.join(conditions, " AND ")} ORDER BY created_at DESC;`
    } else {
      query = sql`SELECT * FROM chat_notifications ORDER BY created_at DESC;`
    }

    const result = await query.values(params)

    return NextResponse.json({ success: true, notifications: result.rows })
  } catch (error: any) {
    console.error("Error fetching meeting notifications:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch meeting notifications." },
      { status: 500 },
    )
  }
}
