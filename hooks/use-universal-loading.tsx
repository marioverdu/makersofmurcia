"use client"

import { useState, useCallback } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

/**
 * Hook universal para loading automático
 * Proporciona loading consistente en toda la aplicación
 * No requiere importar UnifiedLoading en cada archivo
 */
export function useUniversalLoading() {
  const [isLoading, setIsLoading] = useState(false)

  const startLoading = useCallback(() => setIsLoading(true), [])
  const stopLoading = useCallback(() => setIsLoading(false), [])

  const LoadingSpinner = () => {
    if (!isLoading) return null
    
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <CircularProgress 
          size={32} 
          sx={{ color: "#000000" }} 
        />
      </div>
    )
  }

  const FullScreenLoading = () => {
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

  return {
    isLoading,
    startLoading,
    stopLoading,
    LoadingSpinner,
    FullScreenLoading
  }
}

export default useUniversalLoading
