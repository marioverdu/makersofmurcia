import { NextResponse } from "next/server"
import { testDatabaseConnection, checkTablesExist } from "@/lib/conversations-service"
import { neon } from "@neondatabase/serverless"

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!)

    const diagnostics = {
      timestamp: new Date().toISOString(),
      databaseUrl: process.env.DATABASE_URL ? "Present" : "Missing",
      databaseUrlPrefix: process.env.DATABASE_URL?.substring(0, 30) + "...",
    }

    // Test basic connection
    console.log("Testing database connection...")
    const connectionTest = await testDatabaseConnection()
    diagnostics.connectionTest = connectionTest

    // Check if tables exist
    console.log("Checking tables...")
    const tablesExist = await checkTablesExist()
    diagnostics.tablesExist = tablesExist

    // Get table schemas
    console.log("Getting table schemas...")
    try {
      const conversationsSchema = await sql`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_name = 'chat_conversations'
        ORDER BY ordinal_position
      `
      diagnostics.conversationsSchema = conversationsSchema

      const messagesSchema = await sql`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_name = 'chat_messages'
        ORDER BY ordinal_position
      `
      diagnostics.messagesSchema = messagesSchema
    } catch (schemaError: any) {
      diagnostics.schemaError = schemaError.message
    }

    // Try to get sample data
    console.log("Getting sample data...")
    try {
      const sampleConversations = await sql`
        SELECT id, user_id, created_at 
        FROM chat_conversations 
        LIMIT 5
      `
      diagnostics.sampleConversations = sampleConversations

      const sampleMessages = await sql`
        SELECT id, conversation_id, sender, LEFT(content, 50) as content_preview
        FROM chat_messages 
        LIMIT 5
      `
      diagnostics.sampleMessages = sampleMessages
    } catch (dataError: any) {
      diagnostics.dataError = dataError.message
    }

    return NextResponse.json(diagnostics)
  } catch (error: any) {
    console.error("Database diagnostics error:", error)
    return NextResponse.json(
      {
        error: error.message,
        timestamp: new Date().toISOString(),
        databaseUrl: process.env.DATABASE_URL ? "Present" : "Missing",
      },
      { status: 500 },
    )
  }
}
