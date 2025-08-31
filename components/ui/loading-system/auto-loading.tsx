"use client"

import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

interface AutoLoadingProps {
  /**
   * Función que retorna una promesa
   * El loading se muestra automáticamente mientras se ejecuta
   */
  promise?: () => Promise<any>
  /**
   * Estado de loading manual
   */
  isLoading?: boolean
  /**
   * Tipo de loading
   */
  type?: 'spinner' | 'fullscreen' | 'inline'
  /**
   * Altura mínima para spinner
   */
  minHeight?: string
  /**
   * Contenido a mostrar cuando no hay loading
   */
  children?: React.ReactNode
}

/**
 * Componente de loading automático
 * Detecta automáticamente cuándo mostrar loading
 * No requiere lógica manual de loading
 */
export function AutoLoading({
  promise,
  isLoading: manualLoading,
  type = 'spinner',
  minHeight = '200px',
  children
}: AutoLoadingProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    if (promise) {
      setIsLoading(true)
      promise()
        .then(result => {
          setData(result)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [promise])

  const shouldShowLoading = manualLoading !== undefined ? manualLoading : isLoading

  if (shouldShowLoading) {
    if (type === 'fullscreen') {
      return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white bg-opacity-90">
          <CircularProgress 
            size={32} 
            sx={{ color: "#000000" }} 
          />
        </div>
      )
    }

    if (type === 'inline') {
      return (
        <div className="inline-flex items-center">
          <CircularProgress 
            size={16} 
            sx={{ color: "#000000" }} 
          />
        </div>
      )
    }

    // Default: spinner
    return (
      <div className={`flex items-center justify-center min-h-[${minHeight}]`}>
        <CircularProgress 
          size={32} 
          sx={{ color: "#000000" }} 
        />
      </div>
    )
  }

  return <>{children}</>
}

export default AutoLoading
