"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"

interface UseDevAuthOptions {
  redirectTo?: string
  requireAuth?: boolean
}

export function useDevAuth(options: UseDevAuthOptions = {}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
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
    // En desarrollo o localhost, permitir acceso directo inmediatamente
    if (isDevelopment || isLocalhost) {
      console.log("🔓 [DEV] Acceso directo permitido en desarrollo")
      // Usar setTimeout con 0 para hacer la actualización en el siguiente tick
      setTimeout(() => {
        setIsAuthorized(true)
        setIsLoading(false)
      }, 0)
      return
    }

    // Solo verificar sesión si no estamos en desarrollo
    if (status === "loading") return

    // En producción, verificar autenticación
    if (!session) {
      console.log("🔒 [PROD] Redirigiendo a login - no hay sesión")
      router.push(options.redirectTo || "/login")
      return
    }

    // Verificar si es admin (solo en producción)
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL
    const isAdmin = session.user?.email === adminEmail

    if (!isAdmin) {
      console.log("🚫 [PROD] Acceso denegado - no es admin")
      router.push("/")
      return
    }

    console.log("✅ [PROD] Acceso autorizado")
    setIsAuthorized(true)
    setIsLoading(false)
  }, [session, status, router, isDevelopment, isLocalhost, options.redirectTo])

  return {
    session: isDevelopment || isLocalhost ? { user: { name: "Desarrollador", email: "dev@localhost" } } : session,
    status,
    isAuthorized,
    isLoading,
    isDevelopment: isDevelopment || isLocalhost
  }
}
