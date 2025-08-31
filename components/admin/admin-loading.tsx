"use client"

import { useMemo } from "react"
import { UnifiedLoading } from "@/components/ui/unified-loading"

interface AdminLoadingProps {
  message?: string
}

export function AdminLoading({ message = "Verificando acceso..." }: AdminLoadingProps) {
  // Detectar entorno de desarrollo de forma memoizada para mayor velocidad
  const isDevelopment = useMemo(() => {
    return process.env.NODE_ENV === "development"
  }, [])
  
  const isLocalhost = useMemo(() => {
    if (typeof window === "undefined") return false
    return (
      window.location.hostname === "localhost" || 
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.startsWith("192.168.")
    )
  }, [])

  if (isDevelopment || isLocalhost) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <UnifiedLoading />
          <div className="text-sm text-gray-600 mt-4">{message}</div>
          <div className="text-xs text-gray-400 mt-2">Modo desarrollo detectado</div>
        </div>
      </div>
    )
  }

  return null
}
