"use client"

import { useState, useEffect } from 'react'

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // En desarrollo, siempre permitir acceso de admin
    if (process.env.NODE_ENV === 'development') {
      setIsAdmin(true)
      setIsLoading(false)
      return
    }

    // En producción, verificar el email
    const checkAdminStatus = async () => {
      try {
        // Aquí iría la lógica real de verificación
        setIsAdmin(true)
      } catch (error) {
        console.error('Error checking admin status:', error)
        setIsAdmin(false)
      }
      setIsLoading(false)
    }

    checkAdminStatus()
  }, [])

  return { isAdmin, isLoading }
}
