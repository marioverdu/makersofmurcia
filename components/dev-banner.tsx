"use client"

import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function DevBanner() {
  const isDevelopment = process.env.NODE_ENV === "development"
  const isLocalhost = typeof window !== "undefined" && (
    window.location.hostname === "localhost" || 
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname.startsWith("192.168.")
  )

  if (!isDevelopment && !isLocalhost) {
    return null
  }

  return (
    <Alert className="border-yellow-200 bg-yellow-50">
      <AlertTriangle className="h-4 w-4 text-yellow-600" />
      <AlertDescription className="text-yellow-800 text-sm">
        <strong>Modo Desarrollo:</strong> Acceso directo habilitado. En producción se requerirá autenticación.
      </AlertDescription>
    </Alert>
  )
}
