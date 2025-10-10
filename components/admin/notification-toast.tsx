"use client"

import { useEffect, useState } from "react"

interface NotificationToastProps {
  message: string
  type: "success" | "warning" | "error"
  onClose: () => void
  duration?: number
}

export default function NotificationToast({ message, type, onClose, duration = 3000 }: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Allow time for fade-out animation
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div
      className={`fixed bottom-4 right-4 p-3 rounded-md shadow-md text-sm transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${
        type === "success"
          ? "bg-green-100 text-green-800"
          : type === "warning"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-red-100 text-red-800"
      }`}
    >
      {message}
    </div>
  )
}
