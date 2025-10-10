import { emitChatEvent } from "@/lib/event-utils"

// Claves de localStorage
const SYSTEM_MESSAGES_KEY = "system_messages"
const DESTINATION_MESSAGES_KEY = "chatTuentiSystemMessages"

// Mensajes por defecto
const DEFAULT_MESSAGES = {
  pending_approval: "Proyecto propuesto. Esperando confirmación del administrador. Vuelve más tarde a este mismo chat.",
  approved: "Conversación confirmada. Podemos continuar con el proceso.",
  rejected: "Proceso actualmente no disponible. Disculpa las molestias.",
  welcome: "¡Hola! Soy el asistente virtual. ¿En qué puedo ayudarte hoy?",
}

// Función para obtener todos los mensajes del sistema
export async function getAllSystemMessages(): Promise<Record<string, string>> {
  try {
    // En desarrollo, usar localStorage
    if (typeof window !== "undefined") {
      // Intentar obtener del sistema destino primero
      const destinationMessages = localStorage.getItem(DESTINATION_MESSAGES_KEY)
      if (destinationMessages) {
        return JSON.parse(destinationMessages)
      }

      // Luego intentar con nuestro sistema
      const ourMessages = localStorage.getItem(SYSTEM_MESSAGES_KEY)
      if (ourMessages) {
        const messages = JSON.parse(ourMessages)
        // Migrar al sistema destino
        localStorage.setItem(DESTINATION_MESSAGES_KEY, JSON.stringify(messages))
        return messages
      }
    }

    // En producción, usar la API
    if (process.env.NODE_ENV === "production") {
      try {
        const response = await fetch("/api/admin/system-messages")
        if (response.ok) {
          return await response.json()
        }
      } catch (error) {
        console.error("Error fetching system messages from API:", error)
      }
    }

    // Si no hay mensajes, usar los predeterminados
    if (typeof window !== "undefined") {
      localStorage.setItem(SYSTEM_MESSAGES_KEY, JSON.stringify(DEFAULT_MESSAGES))
      localStorage.setItem(DESTINATION_MESSAGES_KEY, JSON.stringify(DEFAULT_MESSAGES))
    }

    return DEFAULT_MESSAGES
  } catch (error) {
    console.error("Error getting system messages:", error)
    return DEFAULT_MESSAGES
  }
}

// Función para actualizar un mensaje del sistema
export async function updateSystemMessage(key: string, content: string): Promise<void> {
  try {
    // Obtener mensajes actuales
    const messages = await getAllSystemMessages()

    // Actualizar mensaje
    const updatedMessages = {
      ...messages,
      [key]: content,
    }

    // En desarrollo, usar localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(SYSTEM_MESSAGES_KEY, JSON.stringify(updatedMessages))
      localStorage.setItem(DESTINATION_MESSAGES_KEY, JSON.stringify(updatedMessages))
    }

    // En producción, usar la API
    if (process.env.NODE_ENV === "production") {
      try {
        await fetch("/api/admin/system-messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key, content }),
        })
      } catch (error) {
        console.error("Error updating system message in API:", error)
      }
    }

    // Emitir evento de actualización
    emitChatEvent("system-message-updated", { key, content })
  } catch (error) {
    console.error(`Error updating system message ${key}:`, error)
    throw error
  }
}
