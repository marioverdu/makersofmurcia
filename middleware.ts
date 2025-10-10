/**
 * Middleware Universal de Protección de Rutas
 * 
 * Protege TODAS las rutas automáticamente verificando su configuración en BD
 * y ejecutando redirecciones según sea necesario.
 * 
 * Este middleware se ejecuta ANTES de renderizar cualquier página.
 * Usa una API interna para consultar la BD y evitar problemas de Edge Runtime.
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isProduction = process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'

// Rutas que NUNCA deben ser bloqueadas por el middleware
// Estas rutas tienen su propia protección (NextAuth, etc.)
const ALLOWED_PATHS = [
  '/api/',           // Todas las APIs (incluye /api/auth/*)
  '/_next/',         // Assets de Next.js
  '/favicon.ico',    // Favicon
  '/robots.txt',     // SEO
  '/sitemap.xml',    // SEO
  '/admin',          // Panel admin (protegido por NextAuth)
  '/login',          // Página de login ⚠️ CRÍTICO para acceso
  '/signup',         // Página de registro
  '/es/login',       // Login localizado español
  '/en/login',       // Login localizado inglés
  '/es/signup',      // Signup localizado español
  '/en/signup',      // Signup localizado inglés
]

// Extraer el locale de la URL
function extractLocale(pathname: string): { locale: string; cleanPath: string } {
  const match = pathname.match(/^\/(es|en)(\/.*)?$/)
  if (match) {
    return {
      locale: match[1],
      cleanPath: match[2] || '/'
    }
  }
  return {
    locale: 'es',
    cleanPath: pathname
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Permitir rutas especiales sin verificar
  if (ALLOWED_PATHS.some(allowed => pathname.startsWith(allowed))) {
    return NextResponse.next()
  }
  
  // Extraer locale y path limpio
  const { locale, cleanPath } = extractLocale(pathname)
  
  console.log(`🛡️ [Middleware] Checking: ${pathname} (cleanPath: ${cleanPath})`)
  
  try {
    // Consultar API interna para obtener configuración
    const checkUrl = new URL('/api/routes/check', request.url)
    checkUrl.searchParams.set('path', cleanPath)
    
    const response = await fetch(checkUrl.toString())
    const data = await response.json()
    
    // Si no hay configuración, permitir acceso (fail-open para contenido público)
    if (!data.found) {
      console.log(`⚠️ [Middleware] No config found for ${pathname}, allowing access`)
      return NextResponse.next()
    }
    
    const route = data.route
    console.log(`✅ [Middleware] Found config:`, route)
    
    // PRIORIDAD 1: Redirección personalizada (si está activa Y tiene redirectTo)
    if (route.is_active && route.redirect_to) {
      const redirectUrl = new URL(`/${locale}${route.redirect_to}`, request.url)
      console.log(`🔀 [Middleware] Redirecting ${pathname} to ${redirectUrl.pathname}`)
      return NextResponse.redirect(redirectUrl)
    }
    
    // PRIORIDAD 2: Bloquear si está inactiva
    if (!route.is_active) {
      console.log(`🚫 [Middleware] Route ${pathname} is inactive, blocking`)
      
      // Por ahora, permitir acceso y dejar que RouteGuard maneje el fallback
      // (evita loops infinitos en el middleware)
      return NextResponse.next()
    }
    
    // PRIORIDAD 3: Permitir acceso
    console.log(`✅ [Middleware] Route ${pathname} is active, allowing access`)
    return NextResponse.next()
    
  } catch (error) {
    console.error(`❌ [Middleware] Error checking route ${pathname}:`, error)
    // En caso de error, permitir acceso (fail-open)
    return NextResponse.next()
  }
}

// Configurar qué rutas ejecutan el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
