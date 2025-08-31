"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AdminLoading } from "./admin/admin-loading"
import { UnifiedLoading } from "@/components/ui/unified-loading"

interface DevRedirectProps {
  targetPath: string
  children?: React.ReactNode
}

export function DevRedirect({ targetPath, children }: DevRedirectProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isRedirecting, setIsRedirecting] = useState(false)
  
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

  useEffect(() => {
    if ((isDevelopment || isLocalhost) && pathname !== targetPath) {
      console.log(`🔓 [DEV] Redirigiendo automáticamente de ${pathname} a ${targetPath}`)
      setIsRedirecting(true)
      // Usar setTimeout con 0 para hacer la redirección en el siguiente tick
      setTimeout(() => {
        router.replace(targetPath)
      }, 0)
    }
  }, [isDevelopment, isLocalhost, pathname, targetPath, router])

  // En desarrollo, mostrar loading inmediatamente mientras redirige
  if (isDevelopment || isLocalhost || isRedirecting) {
    return <AdminLoading message="Redirigiendo en desarrollo..." />
  }

  // En producción, mostrar contenido normal
  return <>{children}</>
}
