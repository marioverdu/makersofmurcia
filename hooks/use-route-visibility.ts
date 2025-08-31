"use client"

import { useState, useEffect } from "react"
import { RouteVisibilityService, type RouteVisibilityConfig } from "@/lib/route-visibility"

export function useRouteVisibility() {
  const [config, setConfig] = useState<RouteVisibilityConfig>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const visibilityService = new RouteVisibilityService()

  const loadConfig = async () => {
    try {
      setLoading(true)
      setError(null)
      const newConfig = await visibilityService.getVisibilityConfig()
      setConfig(newConfig)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error cargando configuración")
    } finally {
      setLoading(false)
    }
  }

  const updateRouteVisibility = async (
    routePath: string,
    visible: boolean,
    userInfo: { ip: string; userAgent: string },
  ) => {
    try {
      const success = await visibilityService.setRouteVisibility(routePath, visible, userInfo)
      if (success) {
        await loadConfig() // Recargar configuración
      }
      return success
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error actualizando visibilidad")
      return false
    }
  }

  const isRouteVisible = async (routePath: string): Promise<boolean> => {
    try {
      return await visibilityService.isRouteVisible(routePath)
    } catch (err) {
      console.error("Error verificando visibilidad:", err)
      return true // Fail-safe: permitir acceso en caso de error
    }
  }

  useEffect(() => {
    loadConfig()
  }, [])

  return {
    config,
    loading,
    error,
    loadConfig,
    updateRouteVisibility,
    isRouteVisible,
  }
}
