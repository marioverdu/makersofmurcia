/**
 * RouteGuard - Sistema de Protección Universal de Rutas
 * 
 * Protege automáticamente cualquier ruta verificando su configuración en BD
 * y ejecutando redirecciones/bloqueos según sea necesario.
 * 
 * Uso en Server Components:
 * 
 * ```tsx
 * import { RouteGuard } from '@/lib/route-guard'
 * 
 * export default async function MyPage({ params }) {
 *   return (
 *     <RouteGuard params={params}>
 *       <MyPageContent />
 *     </RouteGuard>
 *   )
 * }
 * ```
 */

import { ReactNode } from 'react'
import { notFound, redirect } from 'next/navigation'
import { RouteManagementService } from './route-management-service'

interface RouteGuardProps {
  /**
   * Los params de Next.js (pueden incluir lang, id, slug, etc.)
   * Se usa Promise<any> para ser compatible con Next.js 15
   */
  params?: Promise<any>
  
  /**
   * Path de la ruta a verificar. Si no se provee, se auto-detecta desde la estructura.
   * Ejemplos: '/[lang]', '/[lang]/posts', '/[lang]/posts/view/[id]'
   */
  routePath?: string
  
  /**
   * Contenido a renderizar si la ruta está activa y sin redirección
   */
  children: ReactNode
  
  /**
   * Estrategia de fallback si no hay configuración en BD
   * - 'allow': Permite acceso (fail-open) - RECOMENDADO para contenido público
   * - 'block': Bloquea acceso (fail-closed) - RECOMENDADO para rutas protegidas
   */
  fallbackStrategy?: 'allow' | 'block'
}

/**
 * Detecta automáticamente el path de la ruta basándose en el stack trace
 * Esto es un helper para development, en producción es mejor especificar el path
 */
function autoDetectRoutePath(): string | null {
  try {
    const stack = new Error().stack || ''
    
    // Buscar patron app/[ruta]/page.tsx en el stack
    const match = stack.match(/app\/(.*?)\/page\.tsx/)
    if (match && match[1]) {
      const detectedPath = '/' + match[1]
      console.log(`🔍 [RouteGuard] Auto-detected path: ${detectedPath}`)
      return detectedPath
    }
    
    return null
  } catch (error) {
    console.warn('⚠️ [RouteGuard] Could not auto-detect route path:', error)
    return null
  }
}

export async function RouteGuard({
  params,
  routePath,
  children,
  fallbackStrategy = 'allow'
}: RouteGuardProps) {
  // Resolver params si es una Promise
  const resolvedParams = params ? await params : {}
  const lang = resolvedParams.lang || 'es'
  
  // Determinar el path a verificar
  const pathToCheck = routePath || autoDetectRoutePath()
  
  if (!pathToCheck) {
    console.warn('⚠️ [RouteGuard] No route path provided and could not auto-detect. Allowing access.')
    return <>{children}</>
  }
  
  console.log(`🛡️ [RouteGuard] Protecting route: ${pathToCheck}`)
  
  try {
    // Obtener configuración de la ruta desde BD
    const route = await RouteManagementService.getRoute(pathToCheck)
    
    if (!route) {
      // No hay configuración en BD
      console.log(`⚠️ [RouteGuard] No config found for ${pathToCheck}, using fallback: ${fallbackStrategy}`)
      
      if (fallbackStrategy === 'block') {
        console.log(`🚫 [RouteGuard] Blocking access to ${pathToCheck} (fail-closed)`)
        return notFound()
      }
      
      // fallbackStrategy === 'allow'
      console.log(`✅ [RouteGuard] Allowing access to ${pathToCheck} (fail-open)`)
      return <>{children}</>
    }
    
    // PRIORIDAD 1: Redirección personalizada (si está activa Y tiene redirectTo)
    if (route.is_active && route.redirect_to) {
      const redirectPath = `/${lang}${route.redirect_to}`
      console.log(`🔀 [RouteGuard] Custom redirect from ${pathToCheck} to ${redirectPath}`)
      redirect(redirectPath)
    }
    
    // PRIORIDAD 2: Bloquear si está inactiva
    if (!route.is_active) {
      console.log(`🚫 [RouteGuard] Route ${pathToCheck} is inactive, blocking access`)
      return notFound()
    }
    
    // PRIORIDAD 3: Renderizar normalmente
    console.log(`✅ [RouteGuard] Route ${pathToCheck} is active, rendering content`)
    return <>{children}</>
    
  } catch (error) {
    console.error(`❌ [RouteGuard] Error checking route ${pathToCheck}:`, error)
    
    // En caso de error, usar fallback strategy
    if (fallbackStrategy === 'block') {
      console.log(`🚫 [RouteGuard] Error occurred, blocking access (fail-closed)`)
      return notFound()
    }
    
    console.log(`✅ [RouteGuard] Error occurred, allowing access (fail-open)`)
    return <>{children}</>
  }
}

/**
 * Variante del RouteGuard con fallback 'block' por defecto
 * Útil para rutas administrativas o protegidas
 */
export async function RouteGuardStrict({
  params,
  routePath,
  children
}: Omit<RouteGuardProps, 'fallbackStrategy'>) {
  return (
    <RouteGuard
      params={params}
      routePath={routePath}
      fallbackStrategy="block"
    >
      {children}
    </RouteGuard>
  )
}

/**
 * Helper para generar el código de protección para una página
 * Útil para documentación y scaffolding
 */
export function generateRouteGuardCode(routePath: string): string {
  return `import { RouteGuard } from '@/lib/route-guard'

export default async function MyPage({ params }) {
  return (
    <RouteGuard params={params} routePath="${routePath}">
      {/* Tu contenido aquí */}
    </RouteGuard>
  )
}`
}

