"use client"

import { useState, useEffect, useRef } from "react"

export interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  type: "text" | "quick-reply"
  metadata?: {
    options: Array<{
      id: string
      text: string
      action: string
    }>
  }
}

export function useBookingFlow() {
  const [systemStatus, setSystemStatus] = useState("initial")
  const lastStatusRef = useRef(systemStatus)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Function to check current status from the API with error handling
  const checkCurrentStatus = async () => {
    try {
      const response = await fetch("/api/booking-status", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })

      if (!response.ok) {
        console.warn(`Status check failed: HTTP ${response.status}`)
        return "initial" // Fallback status
      }

      const result = await response.json()
      return result.status || "initial"
    } catch (error) {
      console.error("Error checking status:", error)
      return "initial" // Fallback status
    }
  }

  // Polling function with error handling
  const startPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(async () => {
      try {
        const currentStatus = await checkCurrentStatus()
        if (currentStatus !== lastStatusRef.current) {
          console.log(`Status changed: ${lastStatusRef.current} -> ${currentStatus}`)
          setSystemStatus(currentStatus)
          lastStatusRef.current = currentStatus
        }
      } catch (error) {
        console.error("Error polling status:", error)
        // No cambiar el estado si hay error, mantener el último conocido
      }
    }, 5000) // Aumentar intervalo a 5 segundos para evitar rate limiting
  }

  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  // Initialize polling on mount
  useEffect(() => {
    lastStatusRef.current = systemStatus
    startPolling()

    return () => {
      stopPolling()
    }
  }, []) // Only run once on mount

  return {
    systemStatus,
    startPolling,
    checkCurrentStatus,
  }
}
