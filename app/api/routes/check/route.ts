/**
 * API auxiliar para verificar configuración de rutas
 * Usado por el middleware para evitar problemas de Edge Runtime
 */

import { NextRequest, NextResponse } from 'next/server'
import { RouteManagementService } from '@/lib/route-management-service'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path')
  
  if (!path) {
    return NextResponse.json({ error: 'Path is required' }, { status: 400 })
  }
  
  try {
    // Buscar la ruta en BD
    const route = await RouteManagementService.getRoute(path)
    
    if (!route) {
      // Si no existe, buscar patrones alternativos
      const patterns = generatePatterns(path)
      
      for (const pattern of patterns) {
        const altRoute = await RouteManagementService.getRoute(pattern)
        if (altRoute) {
          return NextResponse.json({
            found: true,
            route: {
              path: altRoute.path,
              is_active: altRoute.is_active,
              redirect_to: altRoute.redirect_to || null,
              priority: altRoute.priority
            }
          })
        }
      }
      
      // No se encontró ninguna configuración
      return NextResponse.json({ found: false })
    }
    
    // Retornar configuración encontrada
    return NextResponse.json({
      found: true,
      route: {
        path: route.path,
        is_active: route.is_active,
        redirect_to: route.redirect_to || null,
        priority: route.priority
      }
    })
    
  } catch (error) {
    console.error('Error checking route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Generar patrones alternativos para buscar
function generatePatterns(path: string): string[] {
  const patterns: string[] = []
  
  // Con /[lang] al inicio
  patterns.push(`/[lang]${path}`)
  
  // Reemplazar números por [id]
  const withId = path.replace(/\/\d+/g, '/[id]')
  if (withId !== path) {
    patterns.push(`/[lang]${withId}`)
    patterns.push(withId)
  }
  
  // Reemplazar slugs por [slug]
  const withSlug = path.replace(/\/[a-z0-9-]+$/i, '/[slug]')
  if (withSlug !== path) {
    patterns.push(`/[lang]${withSlug}`)
    patterns.push(withSlug)
  }
  
  return [...new Set(patterns)]
}

