"use client"

import React from 'react'
import { UnifiedLoading } from './unified-loading'

/**
 * Loading unificado para todas las páginas
 * Diseño consistente en toda la aplicación
 * 
 * Características:
 * - Mismo diseño en todas las páginas
 * - Fondo blanco limpio
 * - UnifiedLoading de 32px
 * - Sin copy personalizado
 * - Centrado perfecto
 * - Z-index alto para estar por encima de todo
 */
export function UnifiedPageLoading() {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-white">
      <div className="text-center">
        <UnifiedLoading size={32} />
      </div>
    </div>
  )
}

/**
 * Loading unificado para páginas con contenido dinámico
 * Para páginas que necesitan cargar datos específicos
 * 
 * Características:
 * - Mismo diseño que UnifiedPageLoading
 * - Compatible con estados de carga
 * - Tiempo mínimo configurable
 */
export function UnifiedContentLoading({
  isLoading = false,
  isHydrated = true,
  minLoadingTime = 300,
  children
}: {
  isLoading?: boolean
  isHydrated?: boolean
  minLoadingTime?: number
  children: React.ReactNode
}) {
  const [showLoading, setShowLoading] = React.useState(false)
  const [loadingStartTime, setLoadingStartTime] = React.useState<number | null>(null)

  // Determinar si debe mostrar loading
  const shouldShowLoading = isLoading || !isHydrated

  React.useEffect(() => {
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
    return <UnifiedPageLoading />
  }

  // Mostrar children cuando no está cargando
  return <>{children}</>
}

export default UnifiedPageLoading
