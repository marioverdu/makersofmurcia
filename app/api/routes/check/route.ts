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
      
      // 🔄 HERENCIA DE PERMISOS: Si no se encuentra, buscar rutas padre
      const parentRoutes = getParentRoutes(path)
      for (const parentPath of parentRoutes) {
        const parentRoute = await RouteManagementService.getRoute(parentPath)
        if (parentRoute) {
          console.log(`✅ [RouteCheck] Found parent route for ${path}: ${parentPath} (active: ${parentRoute.is_active})`)
          return NextResponse.json({
            found: true,
            route: {
              path: parentRoute.path,
              is_active: parentRoute.is_active,
              redirect_to: parentRoute.redirect_to || null,
              priority: parentRoute.priority,
              inherited: true // Indicar que es heredado
            }
          })
        }
      }
      
      // No se encontró ninguna configuración
      console.log(`⚠️ [RouteCheck] No route config found for ${path} (allowing access by default)`)
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
    console.error('❌ [RouteCheck] Error checking route:', error)
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

// 🔄 Obtener rutas padre para herencia de permisos
// Ejemplo: /posts/view/42 → ['/posts/view', '/posts']
function getParentRoutes(path: string): string[] {
  const parents: string[] = []
  const segments = path.split('/').filter(Boolean) // ['posts', 'view', '42']
  
  // Construir rutas padre de más específica a menos específica
  for (let i = segments.length - 1; i > 0; i--) {
    const parentPath = '/' + segments.slice(0, i).join('/')
    parents.push(parentPath)
  }
  
  return parents
}

// Ejemplo:
// getParentRoutes('/posts/view/42') → ['/posts/view', '/posts']
// getParentRoutes('/work-experience/detail/5') → ['/work-experience/detail', '/work-experience']

