import { type NextRequest, NextResponse } from "next/server"
import {
  getConversationMessages,
  testDatabaseConnection,
  checkTablesExist,
  addMessageToConversation,
} from "@/lib/conversations-service"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const conversationId = params.id

  console.log(`=== API Request Debug Info ===`)
  console.log(`Conversation ID: "${conversationId}"`)
  console.log(`ID Type: ${typeof conversationId}`)
  console.log(`ID Length: ${conversationId?.length}`)
  console.log(`DATABASE_URL exists: ${!!process.env.DATABASE_URL}`)
  console.log(`DATABASE_URL starts with: ${process.env.DATABASE_URL?.substring(0, 20)}...`)

  if (!conversationId) {
    console.error("No conversation ID provided")
    return NextResponse.json({ error: "Conversation ID is required" }, { status: 400 })
  }

  try {
    // Test database connection first
    const connectionTest = await testDatabaseConnection()
    if (!connectionTest) {
      throw new Error("Database connection failed")
    }

    // Check if tables exist
    const tablesExist = await checkTablesExist()
    if (!tablesExist.conversations || !tablesExist.messages) {
      throw new Error(
        `Required tables missing. Conversations: ${tablesExist.conversations}, Messages: ${tablesExist.messages}`,
      )
    }

    console.log(`Attempting to fetch messages for conversation: "${conversationId}"`)
    const messages = await getConversationMessages(conversationId)

    console.log(`Successfully fetched ${messages.length} messages`)
    return NextResponse.json(messages)
  } catch (error: any) {
    console.error(`=== API Error Details ===`)
    console.error(`Conversation ID: "${conversationId}"`)
    console.error(`Error message: ${error.message}`)
    console.error(`Error code: ${error.code}`)
    console.error(`Error detail: ${error.detail}`)
    console.error(`Full error:`, error)

    return NextResponse.json(
      {
        error: `Error fetching conversation messages: ${error.message || "Unknown error"}`,
        conversationId,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const conversationId = params.id
  if (!conversationId) {
    return NextResponse.json({ error: "Conversation ID is required" }, { status: 400 })
  }
  try {
    const { sender, content, type, timestamp } = await request.json()
    if (!sender || !content) {
      return NextResponse.json({ error: "Sender and content are required" }, { status: 400 })
    }
    // The addMessageToConversation function now handles conversation existence check
    const message = await addMessageToConversation(conversationId, content, sender, type || "text", timestamp)
    return NextResponse.json(message)
  } catch (error: any) {
    console.error(`Error in POST /api/chat-conversations/${conversationId}:`, error)
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 })
  }
}
