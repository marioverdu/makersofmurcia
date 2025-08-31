"use client"

import { useState, useEffect, useCallback } from "react"

interface ProposalNotification {
  id: number
  notification_id: string
  proposal_id: string
  message: string
  status: string
  conversation_data: any
  created_at: string
  read_at: string | null
  read: boolean
}

interface UseProposalNotificationsReturn {
  notifications: ProposalNotification[]
  isLoading: boolean
  error: string | null
  hasNotifications: boolean
  clearNotifications: () => void
  markAsRead: () => Promise<void>
}

export function useProposalNotifications(proposalId?: string): UseProposalNotificationsReturn {
  const [notifications, setNotifications] = useState<ProposalNotification[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchNotifications = useCallback(async () => {
    if (!proposalId) {
      console.log("🔔 Hook: No proposalId provided, cleaning up")
      setNotifications([])
      setError(null)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      console.log("🔔 Hook: Checking notifications for proposal:", proposalId)

      const response = await fetch(`/api/chat-notifications?proposalId=${proposalId}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        // Filtrar solo notificaciones no leídas
        const unreadNotifications = data.notifications.filter((n: ProposalNotification) => !n.read)
        setNotifications(unreadNotifications)
        console.log("🔔 Hook: Found unread notifications:", unreadNotifications.length)
      } else {
        throw new Error(data.error || "Failed to fetch notifications")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error"
      console.error("🔔 Hook: Error fetching notifications:", err)
      setError(errorMessage)
      setNotifications([])
    } finally {
      setIsLoading(false)
    }
  }, [proposalId])

  const markAsRead = useCallback(async () => {
    if (!proposalId) return

    try {
      const response = await fetch("/api/chat-notifications", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          proposalId,
          markAsRead: true,
        }),
      })

      if (response.ok) {
        console.log("🔔 Hook: Notifications marked as read")
        // Refetch para actualizar el estado
        await fetchNotifications()
      }
    } catch (err) {
      console.error("🔔 Hook: Error marking notifications as read:", err)
    }
  }, [proposalId, fetchNotifications])

  const clearNotifications = useCallback(() => {
    setNotifications([])
    setError(null)
  }, [])

  // Polling para verificar nuevas notificaciones
  useEffect(() => {
    if (!proposalId) {
      console.log("🔔 Hook: No proposalId provided, cleaning up")
      setNotifications([])
      return
    }

    console.log("🔔 Hook: Setting up notifications polling for proposal:", proposalId)

    // Fetch inicial
    fetchNotifications()

    // Polling cada 2 segundos
    const interval = setInterval(fetchNotifications, 2000)

    return () => {
      console.log("🔔 Hook: Cleaning up polling for proposal:", proposalId)
      clearInterval(interval)
    }
  }, [proposalId, fetchNotifications])

  return {
    notifications,
    isLoading,
    error,
    hasNotifications: notifications.length > 0,
    clearNotifications,
    markAsRead,
  }
}
