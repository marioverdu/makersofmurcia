"use client"

import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'

/**
 * HOC (Higher Order Component) para loading automático
 * Envuelve cualquier componente con loading consistente
 * No requiere modificar el componente original
 */
export function withLoading<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    loadingType?: 'spinner' | 'fullscreen'
    minHeight?: string
  } = {}
) {
  const { loadingType = 'spinner', minHeight = '200px' } = options

  return function WithLoadingComponent(props: P & { isLoading?: boolean }) {
    const { isLoading, ...componentProps } = props

    if (isLoading) {
      if (loadingType === 'fullscreen') {
        return (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white bg-opacity-90">
            <CircularProgress 
              size={32} 
              sx={{ color: "#000000" }} 
            />
          </div>
        )
      }

      return (
        <div className={`flex items-center justify-center min-h-[${minHeight}]`}>
          <CircularProgress 
            size={32} 
            sx={{ color: "#000000" }} 
          />
        </div>
      )
    }

    return <Component {...(componentProps as P)} />
  }
}

export default withLoading
