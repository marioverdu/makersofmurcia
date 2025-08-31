import { neon } from "@neondatabase/serverless"
import { v4 as uuidv4 } from "uuid"
import type { Message } from "@/types/message"

const sql = neon(process.env.DATABASE_URL!)

interface Conversation {
  id: string
  created_at: string
  updated_at: string
  last_activity: string
  flow_state: any // JSONB type
}

export async function testDatabaseConnection(): Promise<boolean> {
  try {
    await sql`SELECT 1`
    console.log("Database connection successful.")
    return true
  } catch (error) {
    console.error("Database connection failed:", error)
    return false
  }
}

export async function checkTablesExist(): Promise<{
  conversations: boolean
  messages: boolean
}> {
  try {
    const conversationsTable = await sql`
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_name = 'conversations'
      );
    `
    const messagesTable = await sql`
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_name = 'messages'
      );
    `
    return {
      conversations: conversationsTable[0].exists,
      messages: messagesTable[0].exists,
    }
  } catch (error) {
    console.error("Error checking table existence:", error)
    return { conversations: false, messages: false }
  }
}

export async function createConversation(flowState: any = {}): Promise<Conversation> {
  const conversationId = `conv_${Date.now()}_${uuidv4().substring(0, 7)}`
  try {
    const result = await sql`
      INSERT INTO conversations (id, flow_state)
      VALUES (${conversationId}, ${JSON.stringify(flowState)}::jsonb)
      RETURNING id, created_at, updated_at, last_activity, flow_state
    `
    if (result.length === 0) {
      throw new Error("Failed to create conversation, no rows returned.")
    }
    return result[0] as Conversation
  } catch (error: any) {
    console.error("Error creating conversation:", error)
    throw new Error(`Failed to create conversation: ${error.message}`)
  }
}

export async function getConversation(conversationId: string): Promise<Conversation | null> {
  try {
    const result = await sql`
      SELECT id, created_at, updated_at, last_activity, flow_state
      FROM conversations
      WHERE id = ${conversationId}
    `
    return result.length > 0 ? (result[0] as Conversation) : null
  } catch (error: any) {
    console.error(`Error fetching conversation ${conversationId}:`, error)
    throw new Error(`Failed to fetch conversation: ${error.message}`)
  }
}

export async function updateConversationFlowState(conversationId: string, flowState: any): Promise<Conversation> {
  try {
    const result = await sql`
      UPDATE conversations
      SET flow_state = ${JSON.stringify(flowState)}::jsonb, last_activity = NOW()
      WHERE id = ${conversationId}
      RETURNING id, created_at, updated_at, last_activity, flow_state
    `
    if (result.length === 0) {
      throw new Error(`Conversation ${conversationId} not found for update.`)
    }
    return result[0] as Conversation
  } catch (error: any) {
    console.error(`Error updating conversation ${conversationId} flow state:`, error)
    throw new Error(`Failed to update conversation flow state: ${error.message}`)
  }
}

export async function addMessageToConversation(
  conversationId: string,
  content: string,
  sender: string,
  type = "text",
  timestamp?: string, // Optional, DB will set default
): Promise<Message> {
  try {
    // Ensure conversation exists before adding message
    let conversation = await getConversation(conversationId)
    if (!conversation) {
      console.warn(`Conversation ${conversationId} not found. Creating a new one.`)
      conversation = await createConversation({ initial: true }) // Create with a basic initial state
    }

    const messageId = `msg_${Date.now()}_${uuidv4().substring(0, 7)}`
    const result = await sql`
      INSERT INTO messages (id, conversation_id, sender, content, type, timestamp)
      VALUES (${messageId}, ${conversationId}, ${sender}, ${content}, ${type}, ${
        timestamp ? timestamp : new Date().toISOString()
      })
      RETURNING id, conversation_id, sender, content, type, timestamp
    `
    if (result.length === 0) {
      throw new Error("Failed to add message, no rows returned.")
    }

    // Update last_activity of the conversation
    await sql`
      UPDATE conversations
      SET last_activity = NOW()
      WHERE id = ${conversationId}
    `

    return result[0] as Message
  } catch (error: any) {
    console.error(`Error adding message to conversation ${conversationId}:`, error)
    throw new Error(`Error adding message to conversation: ${error.message}`)
  }
}

export async function getConversationMessages(conversationId: string): Promise<Message[]> {
  try {
    const messages = await sql`
      SELECT id, conversation_id, sender, content, type, timestamp
      FROM messages
      WHERE conversation_id = ${conversationId}
      ORDER BY timestamp ASC
    `
    return messages as Message[]
  } catch (error: any) {
    console.error(`Error fetching messages for conversation ${conversationId}:`, error)
    throw new Error(`Failed to fetch conversation messages: ${error.message}`)
  }
}

export async function getAllConversations(): Promise<Conversation[]> {
  try {
    const conversations = await sql`
      SELECT id, created_at, updated_at, last_activity, flow_state
      FROM conversations
      ORDER BY last_activity DESC
    `
    return conversations as Conversation[]
  } catch (error: any) {
    console.error("Error fetching all conversations:", error)
    throw new Error(`Failed to fetch all conversations: ${error.message}`)
  }
}

export async function deleteConversation(conversationId: string): Promise<void> {
  try {
    // Delete messages first due to foreign key constraint
    await sql`DELETE FROM messages WHERE conversation_id = ${conversationId}`
    await sql`DELETE FROM conversations WHERE id = ${conversationId}`
  } catch (error: any) {
    console.error(`Error deleting conversation ${conversationId}:`, error)
    throw new Error(`Failed to delete conversation: ${error.message}`)
  }
}
