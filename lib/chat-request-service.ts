import type { ChatRequest, ChatRequestStatus } from "@/types/chat-approval"

/**
 * Servicio para gestionar solicitudes de chat
 *
 * Esta clase proporciona métodos para interactuar con las solicitudes de chat,
 * abstrayendo la lógica de almacenamiento y comunicación.
 */
export class ChatRequestService {
  /**
   * Clave para almacenar solicitudes en localStorage
   */
  private static STORAGE_KEY = "chat_requests_db"

  /**
   * Obtiene todas las solicitudes de chat
   *
   * @returns Promise con las solicitudes de chat
   */
  static async getRequests(): Promise<ChatRequest[]> {
    // En producción, usar la API
    if (process.env.NODE_ENV === "production" && process.env.DATABASE_URL) {
      try {
        const response = await fetch("/api/admin/chat-requests", {
          headers: {
            "Cache-Control": "no-cache",
          },
        })

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()
        return data.requests || []
      } catch (error) {
        console.error("Error fetching requests from API:", error)
        // Fallback a localStorage en caso de error
        return this.getLocalRequests()
      }
    }

    // En desarrollo, usar localStorage
    return this.getLocalRequests()
  }

  /**
   * Actualiza el estado de una solicitud de chat
   *
   * @param requestId ID de la solicitud a actualizar
   * @param status Nuevo estado para la solicitud
   * @param adminMessage Mensaje opcional del administrador
   * @returns Promise que se resuelve cuando la actualización se completa
   */
  static async updateRequestStatus(
    requestId: string,
    status: ChatRequestStatus,
    adminMessage?: string,
  ): Promise<boolean> {
    // En producción, usar la API
    if (process.env.NODE_ENV === "production" && process.env.DATABASE_URL) {
      try {
        const response = await fetch(`/api/admin/chat-requests/${requestId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status, adminMessage }),
        })

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }

        // Notificar mediante evento
        this.notifyStatusChange(requestId, status, adminMessage)

        return true
      } catch (error) {
        console.error("Error updating request status via API:", error)
        // Fallback a localStorage en caso de error
        return this.updateLocalRequestStatus(requestId, status, adminMessage)
      }
    }

    // En desarrollo, usar localStorage
    return this.updateLocalRequestStatus(requestId, status, adminMessage)
  }

  /**
   * Obtiene solicitudes desde localStorage
   *
   * @returns Array de solicitudes de chat
   */
  private static getLocalRequests(): ChatRequest[] {
    try {
      // Intentar obtener de chat_requests_db
      const chatRequestsDb = localStorage.getItem(this.STORAGE_KEY)
      if (chatRequestsDb) {
        return JSON.parse(chatRequestsDb)
      }

      // Si no existe, buscar en claves individuales
      const localStorageKeys = Object.keys(localStorage)
      const requestKeys = localStorageKeys.filter(
        (key) => key.startsWith("chat:request:") || key.includes("chat_requests"),
      )

      const requests = requestKeys
        .map((key) => {
          try {
            return JSON.parse(localStorage.getItem(key) || "null")
          } catch (e) {
            return null
          }
        })
        .filter(Boolean) as ChatRequest[]

      return requests
    } catch (error) {
      console.error("Error reading from localStorage:", error)
      return []
    }
  }

  /**
   * Actualiza el estado de una solicitud en localStorage
   *
   * @param requestId ID de la solicitud a actualizar
   * @param status Nuevo estado para la solicitud
   * @param adminMessage Mensaje opcional del administrador
   * @returns true si la actualización fue exitosa, false en caso contrario
   */
  private static updateLocalRequestStatus(
    requestId: string,
    status: ChatRequestStatus,
    adminMessage?: string,
  ): boolean {
    try {
      // Obtener solicitudes actuales
      const chatRequestsDb = localStorage.getItem(this.STORAGE_KEY)
      if (!chatRequestsDb) return false

      // Actualizar la solicitud específica
      const requests = JSON.parse(chatRequestsDb)
      const updatedRequests = requests.map((req: ChatRequest) =>
        req.id === requestId
          ? {
              ...req,
              status,
              adminMessage: adminMessage || req.adminMessage,
              updatedAt: new Date().toISOString(),
            }
          : req,
      )

      // Guardar cambios
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedRequests))

      // Notificar mediante evento
      this.notifyStatusChange(requestId, status, adminMessage)

      return true
    } catch (error) {
      console.error("Error updating request in localStorage:", error)
      return false
    }
  }

  /**
   * Notifica cambios de estado mediante eventos del DOM
   *
   * @param requestId ID de la solicitud actualizada
   * @param status Nuevo estado de la solicitud
   * @param adminMessage Mensaje opcional del administrador
   */
  private static notifyStatusChange(requestId: string, status: ChatRequestStatus, adminMessage?: string): void {
    // Buscar la solicitud para obtener el conversationId
    const requests = this.getLocalRequests()
    const request = requests.find((req) => req.id === requestId)
    const conversationId = request?.userId || ""

    // Crear y disparar evento
    const event = new CustomEvent("chat-request-updated", {
      detail: {
        requestId,
        status,
        conversationId,
        adminMessage:
          adminMessage ||
          (status === "approved"
            ? "Conversación confirmada. Podemos continuar con el proceso."
            : "Proceso actualmente no disponible. Disculpa las molestias."),
      },
    })

    window.dispatchEvent(event)

    // Actualizar también en chatTuentiConversations si existe
    try {
      if (typeof window !== "undefined" && conversationId) {
        const conversations = JSON.parse(localStorage.getItem("chatTuentiConversations") || "{}")

        if (conversations[conversationId]) {
          // Añadir mensaje de sistema
          conversations[conversationId].push({
            id: `status_${Date.now()}`,
            conversationId,
            content:
              status === "approved"
                ? "Conversación confirmada. Podemos continuar con el proceso."
                : "Proceso actualmente no disponible. Disculpa las molestias.",
            type: "system",
            timestamp: new Date().toISOString(),
            isUser: false,
            status,
          })

          localStorage.setItem("chatTuentiConversations", JSON.stringify(conversations))
        }
      }
    } catch (e) {
      console.error("Error updating chatTuentiConversations:", e)
    }
  }
}
