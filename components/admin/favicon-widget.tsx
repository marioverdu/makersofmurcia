"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Image, Settings } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FaviconConfig {
  url: string
  lastUpdated: string
  updatedBy: string
}

export function FaviconWidget() {
  const [faviconUrl, setFaviconUrl] = useState("")
  const [currentFavicon, setCurrentFavicon] = useState("")
  const [loading, setLoading] = useState(false)
  const [updating, setUpdating] = useState(false)
  const { toast } = useToast()

  // Detectar entorno
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" || process.env.NODE_ENV === "production"

  // Cargar configuración actual del favicon
  const loadFaviconConfig = async () => {
    setLoading(true)
    try {
      console.log(`🔄 [${isProduction ? "PROD" : "DEV"}] Loading favicon config...`)

      const response = await fetch("/api/admin/favicon", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          setCurrentFavicon(data.data.url)
          setFaviconUrl(data.data.url)
          console.log(`✅ [${isProduction ? "PROD" : "DEV"}] Loaded favicon config: ${data.data.url}`)
        }
      } else {
        // Si no hay configuración, usar favicon por defecto
        setCurrentFavicon("/favicon.ico")
        setFaviconUrl("")
      }
    } catch (error) {
      console.error(`❌ [${isProduction ? "PROD" : "DEV"}] Error loading favicon config:`, error)
      // Fallback a favicon por defecto
      setCurrentFavicon("/favicon.ico")
      setFaviconUrl("")
    } finally {
      setLoading(false)
    }
  }

  // Actualizar favicon
  const updateFavicon = async () => {
    if (!faviconUrl.trim()) {
      toast({
        title: "❌ Error",
        description: "Por favor ingresa una URL válida para el favicon",
        variant: "destructive",
      })
      return
    }

    setUpdating(true)
    try {
      console.log(`🔄 [${isProduction ? "PROD" : "DEV"}] Updating favicon to: ${faviconUrl}`)

      const response = await fetch("/api/admin/favicon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: faviconUrl.trim(),
          updatedBy: "admin-panel",
        }),
      })

      const result = await response.json()

      if (result.success) {
        setCurrentFavicon(faviconUrl.trim())
        
        // Actualizar el favicon en el DOM inmediatamente
        updateFaviconInDOM(faviconUrl.trim())

        toast({
          title: "✅ Favicon actualizado",
          description: "El favicon se ha actualizado correctamente. Los archivos estáticos también se han actualizado para los buscadores.",
        })

        console.log(`✅ [${isProduction ? "PROD" : "DEV"}] Favicon updated successfully`)
      } else {
        throw new Error(result.error || "Error desconocido")
      }
    } catch (error) {
      console.error(`❌ [${isProduction ? "PROD" : "DEV"}] Error updating favicon:`, error)

      toast({
        title: "❌ Error",
        description: `Error actualizando favicon: ${error instanceof Error ? error.message : "Error desconocido"}`,
        variant: "destructive",
      })
    } finally {
      setUpdating(false)
    }
  }

  // Actualizar favicon en el DOM
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

    console.log(`🔄 [DOM] Favicon updated in DOM: ${url}`)
  }

  // Validar URL
  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  useEffect(() => {
    loadFaviconConfig()
  }, [])

  if (loading) {
    return (
      <Card className="sm:h-60 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0">
          <div className="tracking-tight text-xs sm:text-sm font-medium">Favicon</div>
          <Image className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-lg sm:text-2xl font-bold">Cargando...</div>
          <p className="text-xs text-muted-foreground">Obteniendo configuración</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="favicon-widget sm:h-60 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0">
        <div className="tracking-tight text-xs sm:text-sm font-medium">Favicon</div>
        <Image className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col flex-1 min-h-0">
        {/* Current Favicon Preview */}
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            {currentFavicon ? (
              <img 
                src={currentFavicon} 
                alt="Favicon actual"
                className="w-8 h-8 rounded border border-gray-200"
                onError={(e) => {
                  e.currentTarget.src = "/favicon.ico"
                }}
              />
            ) : (
              <div className="w-8 h-8 rounded border border-gray-200 bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                ?
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-gray-800 truncate">
              Favicon actual
            </div>
            <div className="text-xs text-gray-500 truncate">
              {currentFavicon}
            </div>
          </div>
        </div>

        {/* Input for new favicon URL */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-gray-700">
            Nueva URL del favicon
          </div>
          <Input
            type="url"
            placeholder="https://ejemplo.com/favicon.ico"
            value={faviconUrl}
            onChange={(e) => setFaviconUrl(e.target.value)}
            className="text-xs h-8"
            disabled={updating}
          />
        </div>

        {/* Update Button */}
        <div className="flex-1 flex items-end">
          <Button
            onClick={updateFavicon}
            disabled={updating || !faviconUrl.trim() || !isValidUrl(faviconUrl)}
            size="sm"
            className="w-full text-xs h-8"
          >
            {updating ? (
              <>
                <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Actualizando...
              </>
            ) : (
              <>
                <Settings className="w-3 h-3 mr-2" />
                Cambiar Favicon
              </>
            )}
          </Button>
        </div>

        {/* Secciones informativas eliminadas para un widget más compacto */}
      </CardContent>
    </Card>
  )
}
