"use client"

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

interface LoadingContextType {
  isLoading: boolean
  startLoading: () => void
  stopLoading: () => void
  LoadingSpinner: () => React.ReactElement | null
  FullScreenLoading: () => React.ReactElement | null
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

interface LoadingProviderProps {
  children: ReactNode
}

/**
 * Provider global para loading automático
 * Proporciona loading consistente en toda la aplicación
 * No requiere importar nada en los componentes hijos
 */
export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false)

  const startLoading = useCallback(() => setIsLoading(true), [])
  const stopLoading = useCallback(() => setIsLoading(false), [])

  const LoadingSpinner = useCallback(() => {
    if (!isLoading) return null
    
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <CircularProgress 
          size={32} 
          sx={{ color: "#000000" }} 
        />
      </div>
    )
  }, [isLoading])

  const FullScreenLoading = useCallback(() => {
    if (!isLoading) return null
    
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white bg-opacity-90">
        <CircularProgress 
          size={32} 
          sx={{ color: "#000000" }} 
        />
      </div>
    )
  }, [isLoading])

  const value: LoadingContextType = {
    isLoading,
    startLoading,
    stopLoading,
    LoadingSpinner,
    FullScreenLoading
  }

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {/* Loading global automático */}
      <FullScreenLoading />
    </LoadingContext.Provider>
  )
}

/**
 * Hook para usar el context de loading
 * No requiere importar UnifiedLoading
 */
export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

export default LoadingProvider
