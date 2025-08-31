import { type NextRequest, NextResponse } from "next/server"
import { cleanDatabase } from "@/lib/db"
import { kv } from "@vercel/kv"
import { sql } from "@vercel/postgres" // Declare the sql variable

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cleanConversations = true, cleanCalendars = true, cleanAll = false } = body

    let conversationsRemoved = 0
    let calendarsRemoved = 0
    const keysRemoved = 0

    // Si cleanAll es true, realizar una limpieza completa de todas las bases de datos
    if (cleanAll) {
      const result = await cleanDatabase()
      return NextResponse.json(result)
    }

    // Limpieza normal (no completa)
    // Obtener todas las conversaciones pendientes
    const pendingRequestsKeys = await kv.keys("chatTuentiRequestStatus_*")
    const pendingConversationIds: string[] = []

    // Recopilar IDs de conversaciones con estado pendiente o denegado
    for (const key of pendingRequestsKeys) {
      const status = await kv.get(key)
      const conversationId = key.replace("chatTuentiRequestStatus_", "")

      if (status === "pending" || status === "denied") {
        pendingConversationIds.push(conversationId)
      }
    }

    console.log(`Found ${pendingConversationIds.length} pending/denied conversations`)

    // Limpiar conversaciones no confirmadas si se solicita
    if (cleanConversations && pendingConversationIds.length > 0) {
      try {
        // Eliminar conversaciones de la base de datos SQL
        if (process.env.DATABASE_URL) {
          // Eliminar en lotes para evitar consultas demasiado grandes
          const batchSize = 10
          for (let i = 0; i < pendingConversationIds.length; i += batchSize) {
            const batch = pendingConversationIds.slice(i, i + batchSize)

            // Convertir array a formato para consulta SQL
            const placeholders = batch.map((_, idx) => `$${idx + 1}`).join(", ")

            // Eliminar mensajes primero (debido a restricciones de clave foránea)
            await sql`
              DELETE FROM chat_messages 
              WHERE conversation_id IN (${sql.unsafe(placeholders)})
            `.values(...batch)

            // Luego eliminar las conversaciones
            await sql`
              DELETE FROM chat_conversations 
              WHERE id IN (${sql.unsafe(placeholders)})
            `.values(...batch)
          }
        }

        // Eliminar conversaciones de KV
        for (const conversationId of pendingConversationIds) {
          await kv.del(`chat:conversation:${conversationId}`)
          await kv.del(`chat:messages:${conversationId}`)
        }

        conversationsRemoved = pendingConversationIds.length
      } catch (error) {
        console.error("Error cleaning conversations:", error)
      }
    }

    // Limpiar calendarios agendados si se solicita
    if (cleanCalendars) {
      try {
        // Obtener todas las claves de calendarios
        const calendarKeys = await kv.keys("chatTuentiUserBookings_*")

        for (const key of calendarKeys) {
          const userId = key.replace("chatTuentiUserBookings_", "")

          // Verificar si esta conversación está pendiente o denegada
          const status = await kv.get(`chatTuentiRequestStatus_${userId}`)

          if (status === "pending" || status === "denied") {
            // Eliminar calendario
            await kv.del(key)
            calendarsRemoved++
          }
        }
      } catch (error) {
        console.error("Error cleaning calendars:", error)
      }
    }

    console.log("Mock: Database cleanup (no real database)")

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: `Limpieza completada: ${conversationsRemoved} conversaciones y ${calendarsRemoved} calendarios eliminados`,
      conversationsRemoved: cleanAll ? "all" : conversationsRemoved,
      calendarsRemoved: cleanAll ? "all" : calendarsRemoved,
      keysRemoved: cleanAll ? keysRemoved : 0,
    })
  } catch (error) {
    console.error("Mock: Error in cleanup:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Mock cleanup error",
      },
      { status: 500 },
    )
  }
}
