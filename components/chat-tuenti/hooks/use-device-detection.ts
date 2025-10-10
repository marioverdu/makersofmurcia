"use client"

import { useState, useEffect } from "react"
import type { DeviceType } from "../types"
import { CHAT_CONFIG } from "../constants/chat-constants"

export function useDeviceDetection() {
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop")
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width <= CHAT_CONFIG.DEVICE_BREAKPOINTS.phone) {
        setDeviceType("phone")
      } else if (width <= CHAT_CONFIG.DEVICE_BREAKPOINTS.tablet) {
        setDeviceType("tablet")
      } else {
        setDeviceType("desktop")
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (deviceType !== "phone") return

    const visualViewport = window.visualViewport
    if (!visualViewport) return

    const handleViewportResize = () => {
      const windowHeight = window.innerHeight
      const viewportHeight = visualViewport.height
      const heightDifference = windowHeight - viewportHeight
      const keyboardThreshold = windowHeight * CHAT_CONFIG.KEYBOARD_THRESHOLD

      setIsKeyboardOpen(heightDifference > keyboardThreshold)
    }

    visualViewport.addEventListener("resize", handleViewportResize)
    return () => visualViewport.removeEventListener("resize", handleViewportResize)
  }, [deviceType])

  return { deviceType, isKeyboardOpen }
}
