"use client"

import { useEffect } from "react"
import { CHAT_CONFIG } from "../constants/chat-constants"

export function useNotification(hasInteracted: boolean, setIsBlinking: (blinking: boolean) => void) {
  useEffect(() => {
    const notificationDelay =
      process.env.NODE_ENV === "development"
        ? CHAT_CONFIG.NOTIFICATION_DELAY.development
        : CHAT_CONFIG.NOTIFICATION_DELAY.production
    const isDev = process.env.NODE_ENV === "development"

    if (!hasInteracted) {
      const lastNotification = localStorage.getItem("lastChatNotification")
      const shouldNotify =
        !lastNotification ||
        Date.now() - Number.parseInt(lastNotification) > (isDev ? 0 : CHAT_CONFIG.RESTRICTION_HOURS * 60 * 60 * 1000)

      if (shouldNotify) {
        const timer = setTimeout(() => {
          setIsBlinking(true)
          localStorage.setItem("lastChatNotification", Date.now().toString())
        }, notificationDelay)

        return () => clearTimeout(timer)
      }
    }
  }, [hasInteracted, setIsBlinking])
}
