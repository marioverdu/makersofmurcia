import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const proposalId = searchParams.get("proposalId")

    if (!proposalId) {
      return NextResponse.json({ error: "proposalId is required" }, { status: 400 })
    }

    console.log("🔔 API GET: Fetching notifications for proposal:", proposalId)

    // Usar sql template literals para consultas con parámetros
    const notifications = await sql`
      SELECT 
        id,
        notification_id,
        proposal_id,
        message,
        status,
        conversation_data,
        created_at,
        read_at,
        CASE WHEN read_at IS NULL THEN false ELSE true END as read
      FROM chat_notifications 
      WHERE proposal_id = ${proposalId}
      ORDER BY created_at DESC
    `

    console.log("🔔 API GET: Found notifications:", notifications.length)

    return NextResponse.json({
      success: true,
      notifications: notifications,
      count: notifications.length,
    })
  } catch (error) {
    console.error("🔔 API GET Error:", error)
    return NextResponse.json(
      {
        error: "Error fetching notifications",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { proposalId, message, status = "info", conversationData = null } = body

    if (!proposalId || !message) {
      return NextResponse.json({ error: "proposalId and message are required" }, { status: 400 })
    }

    const notificationId = `notif_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

    console.log("🔔 API POST: Creating notification:", { proposalId, message, status })

    // Usar sql template literals para INSERT con parámetros
    const result = await sql`
      INSERT INTO chat_notifications (
        notification_id, 
        proposal_id, 
        message, 
        status, 
        conversation_data,
        read_at
      ) VALUES (${notificationId}, ${proposalId}, ${message}, ${status}, ${conversationData}, ${null})
      RETURNING *
    `

    console.log("🔔 API POST: Notification created:", result[0])

    return NextResponse.json({
      success: true,
      notification: result[0],
    })
  } catch (error) {
    console.error("🔔 API POST Error:", error)
    return NextResponse.json(
      {
        error: "Error creating notification",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { proposalId, markAsRead = true } = body

    if (!proposalId) {
      return NextResponse.json({ error: "proposalId is required" }, { status: 400 })
    }

    console.log("🔔 API PATCH: Marking notifications as read for proposal:", proposalId)

    // Usar sql template literals para UPDATE con parámetros
    const result = await sql`
      UPDATE chat_notifications 
       SET read_at = ${markAsRead ? new Date().toISOString() : null}
       WHERE proposal_id = ${proposalId} AND read_at IS NULL
       RETURNING *
    `

    console.log("🔔 API PATCH: Updated notifications:", result.length)

    return NextResponse.json({
      success: true,
      updatedCount: result.length,
      notifications: result,
    })
  } catch (error) {
    console.error("🔔 API PATCH Error:", error)
    return NextResponse.json(
      {
        error: "Error updating notifications",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
