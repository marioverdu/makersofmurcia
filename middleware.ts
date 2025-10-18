/**
 * Middleware Simplificado para Página Estática
 * 
 * Solo permite acceso a todas las rutas sin verificaciones de base de datos.
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Permitir acceso a todas las rutas
  return NextResponse.next()
}

// Configurar qué rutas ejecutan el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
