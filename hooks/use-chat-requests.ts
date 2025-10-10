"use client"

import { useState, useCallback, useEffect } from "react"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import type { ChatRequest, ChatRequestStatus } from "@/types/chat-approval"
import { ChatRequestService } from "@/services/chat-request-service"

/**
 * Opciones para el hook useChatRequests
 */
interface UseChatRequestsOptions {
  /**
   * Callback que se ejecuta cuando cambia el estado de una solicitud
   */
  onStatusChange?: (requestId: string, newStatus: ChatRequestStatus) => void

  /**
   * Intervalo de actualización automática en milisegundos
   * @default 30000 (30 segundos)
   */
  refreshInterval?: number
}

/**
 * Tipo de notificación
 */
interface Notification {
  message: string
  type: "success" | "error" | "warning"
}

/**
 * Hook personalizado para gestionar solicitudes de chat
 *
 * Este hook encapsula toda la lógica de estado y operaciones relacionadas
 * con las solicitudes de chat, proporcionando una interfaz limpia para los componentes.
 *
 * @param options Opciones de configuración
 * @returns Estado y funciones para gestionar solicitudes
 */
export function useChatRequests(options: UseChatRequestsOptions = {}) {
  const { onStatusChange, refreshInterval = 30000 } = options

  // Estados
  const [requests, setRequests] = useState<ChatRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notification, setNotification] = useState<Notification | null>(null)

  /**
   * Carga las solicitudes de chat
   */
  const loadRequests = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const fetchedRequests = await ChatRequestService.getRequests()
      setRequests(fetchedRequests)
    } catch (error) {
      console.error("Error loading requests:", error)
      setError(error instanceof Error ? error.message : "Error desconocido al cargar solicitudes")
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Actualiza el estado de una solicitud
   *
   * @param requestId ID de la solicitud a actualizar
   * @param newStatus Nuevo estado para la solicitud
   * @param adminMessage Mensaje opcional del administrador
   */
  const updateRequestStatus = useCallback(
    async (requestId: string, newStatus: ChatRequestStatus, adminMessage?: string) => {
      try {
        setLoading(true)

        const success = await ChatRequestService.updateRequestStatus(requestId, newStatus, adminMessage)

        if (success) {
          // Actualizar la lista local
          setRequests((prev) =>
            prev.map((req) =>
              req.id === requestId ? { ...req, status: newStatus, updatedAt: new Date().toISOString() } : req,
            ),
          )

          // Notificar al componente padre si existe
          if (onStatusChange) {
            onStatusChange(requestId, newStatus)
          }

          // Mostrar notificación
          setNotification({
            message: newStatus === "approved" ? "Solicitud aprobada correctamente" : "Solicitud denegada",
            type: newStatus === "approved" ? "success" : "warning",
          })

          // Limpiar notificación después de 3 segundos
          setTimeout(() => setNotification(null), 3000)
        }

        return success
      } catch (err) {
        console.error("Error updating request:", err)

        setNotification({
          message: "Error al procesar la solicitud: " + (err instanceof Error ? err.message : String(err)),
          type: "error",
        })

        return false
      } finally {
        setLoading(false)
      }
    },
    [onStatusChange],
  )

  /**
   * Formatea una fecha como tiempo relativo
   *
   * @param dateString Fecha en formato string
   * @returns Texto formateado (ej: "hace 5 minutos")
   */
  const formatRelativeTime = useCallback((dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: es,
      })
    } catch (e) {
      return "fecha desconocida"
    }
  }, [])

  /**
   * Obtiene las clases CSS para el color de un estado
   *
   * @param status Estado de la solicitud
   * @returns Clases CSS para el color
   */
  const getStatusColor = useCallback((status: ChatRequestStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "denied":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }, [])

  // Cargar solicitudes al montar el componente
  useEffect(() => {
    loadRequests()

    // Configurar actualización periódica
    const intervalId = setInterval(loadRequests, refreshInterval)

    return () => clearInterval(intervalId)
  }, [loadRequests, refreshInterval])

  return {
    requests,
    loading,
    error,
    notification,
    loadRequests,
    updateRequestStatus,
    formatRelativeTime,
    getStatusColor,
    setNotification,
  }
}
