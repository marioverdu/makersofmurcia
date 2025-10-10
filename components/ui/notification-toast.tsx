"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

/**
 * Props para el componente NotificationToast
 */
interface NotificationToastProps {
  /**
   * Mensaje a mostrar
   */
  message: string

  /**
   * Tipo de notificación
   */
  type: "success" | "error" | "warning"

  /**
   * Función para cerrar la notificación
   */
  onClose: () => void

  /**
   * Duración en milisegundos antes de cerrar automáticamente
   * @default 3000
   */
  duration?: number
}

/**
 * Componente que muestra una notificación toast
 */
export function NotificationToast({ message, type, onClose, duration = 3000 }: NotificationToastProps) {
  // Cerrar automáticamente después de la duración especificada
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  // Determinar clases según el tipo
  const getTypeClasses = () => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200"
      case "error":
        return "bg-red-100 text-red-800 border-red-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div
      className={`fixed bottom-4 right-4 p-3 rounded-md shadow-md text-sm border ${getTypeClasses()} max-w-md z-50 animate-fade-in`}
      role="alert"
    >
      <div className="flex items-center justify-between">
        <div>{message}</div>
        <button
          onClick={onClose}
          className="ml-4 text-current opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Cerrar notificación"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
