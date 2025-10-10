"use client"

import { useEffect } from 'react'

interface FaviconConfig {
  url: string
  lastUpdated: string
  updatedBy: string
}

export function FaviconLoader() {
  useEffect(() => {
    const loadFavicon = async () => {
      try {
        // Cargar configuración del favicon desde la API
        const response = await fetch('/api/admin/favicon', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        })

        if (response.ok) {
          const data = await response.json()
          if (data.success && data.data && data.data.url) {
            updateFaviconInDOM(data.data.url)
          }
        }
      } catch (error) {
        console.warn('⚠️ [FaviconLoader] Could not load favicon config:', error)
        // Mantener favicon por defecto
      }
    }

    loadFavicon()
  }, [])

  const updateFaviconInDOM = (url: string) => {
    if (typeof window === "undefined") return

    // Remover favicons existentes
    const existingFavicons = document.querySelectorAll('link[rel*="icon"]')
    existingFavicons.forEach(link => link.remove())

    // Crear nuevo favicon
    const link = document.createElement('link')
    link.rel = 'icon'
    link.type = 'image/x-icon'
    link.href = url
    document.head.appendChild(link)

    // También agregar para diferentes tamaños
    const sizes = [16, 32, 48, 64, 128, 256]
    sizes.forEach(size => {
      const link = document.createElement('link')
      link.rel = 'icon'
      link.type = 'image/png'
      link.sizes = `${size}x${size}`
      link.href = url
      document.head.appendChild(link)
    })

    console.log(`🔄 [FaviconLoader] Favicon loaded: ${url}`)
  }

  return null // Este componente no renderiza nada visualmente
}
