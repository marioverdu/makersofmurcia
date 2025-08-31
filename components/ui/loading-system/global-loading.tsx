"use client"

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

/**
 * Sistema de loading global automático
 * Se muestra automáticamente en todas las páginas durante la navegación
 * No requiere importar en cada archivo
 */
export function GlobalLoading() {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Mostrar loading al cambiar de ruta
    setIsLoading(true)
    
    // Ocultar loading después de un breve delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white bg-opacity-90">
      <CircularProgress 
        size={32} 
        sx={{ color: "#000000" }} 
      />
    </div>
  )
}

export default GlobalLoading
