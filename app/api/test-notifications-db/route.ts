import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Test connection by querying a known table or performing a simple operation
    await sql`SELECT 1;`

    // Test if 'meetings' table exists and has the correct schema
    const meetingsTableCheck = await sql`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = current_schema()
      AND table_name = 'meetings'
      AND column_name IN ('meeting_id', 'proposal_id', 'user_id', 'meeting_date', 'meeting_time', 'notes', 'created_at');
    `
    const meetingsColumns = meetingsTableCheck.map((row: any) => row.column_name)
    const expectedMeetingsColumns = [
      "meeting_id",
      "proposal_id",
      "user_id",
      "meeting_date",
      "meeting_time",
      "notes",
      "created_at",
    ]
    const meetingsSchemaOk = expectedMeetingsColumns.every((col) => meetingsColumns.includes(col))

    // Test if 'chat_notifications' table exists and has the correct schema
    const chatNotificationsTableCheck = await sql`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = current_schema()
      AND table_name = 'chat_notifications'
      AND column_name IN ('notification_id', 'meeting_id', 'user_id', 'message', 'type', 'created_at');
    `
    const chatNotificationsColumns = chatNotificationsTableCheck.map((row: any) => row.column_name)
    const expectedChatNotificationsColumns = [
      "notification_id",
      "meeting_id",
      "user_id",
      "message",
      "type",
      "created_at",
    ]
    const chatNotificationsSchemaOk = expectedChatNotificationsColumns.every((col) =>
      chatNotificationsColumns.includes(col)
    )

    return NextResponse.json({
      success: true,
      message: "Database connection and schema checks successful.",
      meetingsTable: {
        exists: meetingsTableCheck.length > 0,
        schemaOk: meetingsSchemaOk,
        columns: meetingsTableCheck,
      },
      chatNotificationsTable: {
        exists: chatNotificationsTableCheck.length > 0,
        schemaOk: chatNotificationsSchemaOk,
        columns: chatNotificationsTableCheck,
      },
    })
  } catch (error: any) {
    console.error("Database connection or schema check failed:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Database connection or schema check failed.",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
