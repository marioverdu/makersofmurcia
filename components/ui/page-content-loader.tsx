"use client"

import React, { useEffect, useState } from 'react'
import { UnifiedLoading } from './unified-loading'

interface PageContentLoaderProps {
  children: React.ReactNode
  /**
   * Si la página está cargando datos
   */
  isLoading?: boolean
  /**
   * Si la página está hidratada (para evitar hydration mismatch)
   */
  isHydrated?: boolean
  /**
   * Tiempo mínimo de loading para evitar parpadeos (ms)
   */
  minLoadingTime?: number
  /**
   * Mensaje personalizado para mostrar durante el loading
   */
  loadingMessage?: string
}

/**
 * Componente de loading específico para páginas con contenido dinámico
 * Mejora el comportamiento de loading para páginas como work-experience
 * 
 * Características:
 * - Loading unificado para datos e hidratación
 * - Tiempo mínimo de loading para evitar parpadeos
 * - Fondo blanco que oculta completamente el contenido
 * - Z-index alto para estar por encima del contenido
 * - Compatible con el sistema de loading global
 */
export function PageContentLoader({
  children,
  isLoading = false,
  isHydrated = true,
  minLoadingTime = 300,
  loadingMessage
}: PageContentLoaderProps) {
  const [showLoading, setShowLoading] = useState(false)
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null)

  // Determinar si debe mostrar loading
  const shouldShowLoading = isLoading || !isHydrated

  useEffect(() => {
    if (shouldShowLoading) {
      // Iniciar loading
      setShowLoading(true)
      setLoadingStartTime(Date.now())
    } else if (loadingStartTime) {
      // Calcular tiempo transcurrido
      const elapsedTime = Date.now() - loadingStartTime
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime)

      // Ocultar loading después del tiempo mínimo
      const timer = setTimeout(() => {
        setShowLoading(false)
        setLoadingStartTime(null)
      }, remainingTime)

      return () => clearTimeout(timer)
    }
  }, [shouldShowLoading, minLoadingTime, loadingStartTime])

  // Mostrar loading si debe mostrar
  if (showLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="text-center">
          <UnifiedLoading size={32} />
          {loadingMessage && (
            <p className="mt-4 text-sm text-gray-600">{loadingMessage}</p>
          )}
        </div>
      </div>
    )
  }

  // Mostrar children cuando no está cargando
  return <>{children}</>
}

export default PageContentLoader
