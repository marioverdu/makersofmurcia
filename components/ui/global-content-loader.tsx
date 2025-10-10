"use client"

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { UnifiedPageLoading } from './unified-page-loading'

interface GlobalContentLoaderProps {
  children: React.ReactNode
  /**
   * Tiempo mínimo de loading para evitar parpadeos (ms)
   */
  minLoadingTime?: number
  /**
   * Si debe mostrar loading en todas las rutas o solo en rutas específicas
   */
  showOnAllRoutes?: boolean
  /**
   * Rutas específicas donde mostrar el loading (si showOnAllRoutes es false)
   */
  specificRoutes?: string[]
}

/**
 * Componente de loading global que no muestra contenido hasta que esté completamente cargado
 * Similar al comportamiento del proyecto 1.40 - production ready
 * 
 * Características:
 * - Loading instantáneo al cambiar de ruta (navegación)
 * - NO muestra loading en refresh de página
 * - Tiempo mínimo de loading para evitar parpadeos
 * - Fondo blanco que oculta completamente el contenido
 * - Z-index ultra alto para estar por encima de todo
 * - Detección automática de rutas
 */
export function GlobalContentLoader({
  children,
  minLoadingTime = 300,
  showOnAllRoutes = true,
  specificRoutes = []
}: GlobalContentLoaderProps) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [currentPath, setCurrentPath] = useState(pathname)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  // Determinar si debe mostrar loading en la ruta actual
  const shouldShowLoading = showOnAllRoutes || 
    specificRoutes.some(route => pathname?.startsWith(route))

  useEffect(() => {
    // En la carga inicial, no mostrar loading
    if (isInitialLoad) {
      setIsInitialLoad(false)
      setCurrentPath(pathname)
      return
    }

    // Solo mostrar loading si es una navegación real (no refresh)
    if (pathname !== currentPath) {
      // Mostrar loading solo brevemente para navegación
      setIsLoading(true)
      setCurrentPath(pathname)
      
      // Ocultar loading después del tiempo mínimo
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, minLoadingTime)

      return () => clearTimeout(timer)
    }
  }, [pathname, currentPath, minLoadingTime, isInitialLoad])

  // Mostrar loading si está cargando y debe mostrar en esta ruta
  if (isLoading && shouldShowLoading) {
    return <UnifiedPageLoading />
  }

  // Mostrar children cuando no está cargando o no debe mostrar loading en esta ruta
  return <>{children}</>
}

export default GlobalContentLoader
