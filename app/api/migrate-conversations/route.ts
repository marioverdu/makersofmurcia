import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { randomUUID } from "crypto"

// Create a SQL query function using neon
const sql = neon(process.env.DATABASE_URL || "")

export async function POST(request: NextRequest) {
  try {
    const { conversations } = await request.json()

    if (!conversations || !Array.isArray(conversations)) {
      return NextResponse.json({ error: "Invalid conversations data" }, { status: 400 })
    }

    // Ensure the table exists
    await sql`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id TEXT PRIMARY KEY,
        conversation_id TEXT NOT NULL,
        content TEXT NOT NULL,
        is_user BOOLEAN NOT NULL,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_conversation_id ON chat_messages(conversation_id);
    `

    let migratedCount = 0

    // Process each message
    for (const message of conversations) {
      // Skip if missing required fields
      if (!message.conversationId || !message.content) continue

      const id = message.id || randomUUID()
      const isUser = message.isUser !== undefined ? message.isUser : message.sender === "user"
      const timestamp = message.timestamp ? new Date(message.timestamp) : new Date()

      // Insert message into database
      await sql`
        INSERT INTO chat_messages (
          id, conversation_id, content, is_user, timestamp
        ) VALUES (
          ${id}, ${message.conversationId}, ${message.content}, ${isUser}, ${timestamp}
        )
        ON CONFLICT (id) DO NOTHING
      `

      migratedCount++
    }

    return NextResponse.json({
      success: true,
      migratedCount,
      message: `Successfully migrated ${migratedCount} messages`,
    })
  } catch (error) {
    console.error("Error migrating conversations:", error)
    return NextResponse.json({ error: "Error migrating conversations" }, { status: 500 })
  }
}
