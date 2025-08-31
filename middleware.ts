import { NextRequest, NextResponse } from 'next/server'
import type { Locale } from '@/types/i18n'

const locales: Locale[] = ['es', 'en']
const defaultLocale: Locale = 'es'

// Función para obtener el locale preferido del navegador
function getLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language')
  const userAgent = request.headers.get('user-agent') || ''
  const cookies = request.headers.get('cookie') || ''
  const host = request.headers.get('host') || ''
  
  // Log para debugging (solo en desarrollo)
  const isDevelopment = process.env.NODE_ENV === 'development' || 
                       process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production' ||
                       host.includes('localhost') ||
                       host.includes('127.0.0.1')
  
  if (isDevelopment) {
    console.log(`🔍 [Middleware] Accept-Language header: ${acceptLanguage || 'NO ENVIADO'}`)
    console.log(`🔍 [Middleware] User-Agent: ${userAgent}`)
    console.log(`🔍 [Middleware] Host: ${host}`)
    console.log(`🔍 [Middleware] Cookies: ${cookies}`)
  }
  
  // 1. Intentar detectar desde cookies del servidor (preferencia del usuario)
  const cookieMatch = cookies.match(/locale=([a-z]{2})/)
  if (cookieMatch && locales.includes(cookieMatch[1] as Locale)) {
    if (isDevelopment) {
      console.log(`🌍 [Middleware] Idioma detectado desde locale cookie: ${cookieMatch[1]}`)
    }
    return cookieMatch[1] as Locale
  }
  
  // 2. Intentar detectar desde Accept-Language header
  if (acceptLanguage) {
    // Parsear el header accept-language con prioridades
    const languages = acceptLanguage
      .split(',')
      .map(lang => {
        const [code, quality = 'q=1.0'] = lang.split(';')
        const langCode = code.trim().split('-')[0].toLowerCase()
        const qValue = parseFloat(quality.replace('q=', '')) || 1.0
        return { code: langCode, quality: qValue }
      })
      .filter(lang => locales.includes(lang.code as Locale))
      .sort((a, b) => b.quality - a.quality) // Ordenar por prioridad

    // Si encontramos idiomas soportados, usar el de mayor prioridad
    if (languages.length > 0) {
      if (isDevelopment) {
        console.log(`🌍 [Middleware] Idioma detectado desde Accept-Language: ${languages[0].code} (prioridad: ${languages[0].quality})`)
      }
      return languages[0].code as Locale
    }
  }
  
  // 3. Fallback inteligente para DuckDuckGo y navegadores que no envían Accept-Language
  if (userAgent) {
    const userAgentLower = userAgent.toLowerCase()
    
    // Detectar DuckDuckGo específicamente
    if (userAgentLower.includes('duckduckgo') || userAgentLower.includes('ddg')) {
      // Para DuckDuckGo, usar un fallback más inteligente
      if (isDevelopment) {
        console.log(`🌍 [Middleware] DuckDuckGo detectado, usando fallback inteligente`)
      }
      
      // Intentar detectar desde User-Agent con patrones más específicos
      if (userAgentLower.includes('en-us') || 
          userAgentLower.includes('en-gb') || 
          userAgentLower.includes('en;') ||
          userAgentLower.includes('en/') ||
          userAgentLower.includes('en_')) {
        if (isDevelopment) {
          console.log(`🌍 [Middleware] Idioma inglés detectado desde User-Agent de DuckDuckGo`)
        }
        return 'en'
      }
      
      if (userAgentLower.includes('es-es') || 
          userAgentLower.includes('es;') ||
          userAgentLower.includes('es/') ||
          userAgentLower.includes('es_')) {
        if (isDevelopment) {
          console.log(`🌍 [Middleware] Idioma español detectado desde User-Agent de DuckDuckGo`)
        }
        return 'es'
      }
      
      // Para DuckDuckGo sin indicadores específicos, usar inglés por defecto
      // (la mayoría de usuarios de DuckDuckGo son anglófonos)
      if (isDevelopment) {
        console.log(`🌍 [Middleware] DuckDuckGo sin indicadores específicos, usando inglés por defecto`)
      }
      return 'en'
    }
    
    // Detectar otros navegadores con patrones específicos
    if (userAgentLower.includes('en-us') || 
        userAgentLower.includes('en-gb') || 
        userAgentLower.includes('en;') ||
        userAgentLower.includes('en/') ||
        userAgentLower.includes('en_')) {
      if (isDevelopment) {
        console.log(`🌍 [Middleware] Idioma inglés detectado desde User-Agent: en`)
      }
      return 'en'
    }
    
    if (userAgentLower.includes('es-es') || 
        userAgentLower.includes('es;') ||
        userAgentLower.includes('es/') ||
        userAgentLower.includes('es_')) {
      if (isDevelopment) {
        console.log(`🌍 [Middleware] Idioma español detectado desde User-Agent: es`)
      }
      return 'es'
    }
    
    // Detectar navegadores móviles y sus preferencias
    if (userAgentLower.includes('mobile') || userAgentLower.includes('android') || userAgentLower.includes('iphone')) {
      // Para móviles, usar el idioma del sistema operativo si es detectable
      if (userAgentLower.includes('en')) {
        if (isDevelopment) {
          console.log(`🌍 [Middleware] Móvil con idioma inglés detectado`)
        }
        return 'en'
      }
      
      if (userAgentLower.includes('es')) {
        if (isDevelopment) {
          console.log(`🌍 [Middleware] Móvil con idioma español detectado`)
        }
        return 'es'
      }
    }
  }
  
  // 4. Fallback final: usar inglés para localhost (más común en desarrollo)
  if (host.includes('localhost') || host.includes('127.0.0.1')) {
    if (isDevelopment) {
      console.log(`🌍 [Middleware] Localhost detectado, usando inglés por defecto`)
    }
    return 'en'
  }
  
  if (isDevelopment) {
    console.log(`🌍 [Middleware] Usando idioma por defecto: ${defaultLocale}`)
  }
  
  return defaultLocale
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Permitir acceso completo a archivos estáticos, APIs internas y rutas esenciales
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/auth/") || // Permitir rutas de NextAuth
    pathname.startsWith("/api/") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/site.webmanifest") ||
    pathname.includes(".") || // archivos con extensión
    pathname.startsWith("/styleguide") // Asegura que /styleguide siempre sea accesible
  ) {
    return NextResponse.next()
  }

  // Verificar si estamos en desarrollo
  const isDevelopment = process.env.NODE_ENV === 'development' || 
                       process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production' ||
                       request.headers.get("host")?.includes('localhost') ||
                       request.headers.get("host")?.includes('127.0.0.1')

  // En desarrollo, usar rutas simples sin locales
  if (isDevelopment) {
    // Admin nunca se toca
    if (pathname.startsWith('/admin')) {
      return NextResponse.next()
    }

    // Permitir que posts y work-experience funcionen directamente sin redirección
    // PERO aplicar rewrites si están configurados
    if (pathname === '/posts' || pathname === '/work-experience' || pathname === '/work-experience-fix') {
      // Aplicar rewrites dinámicos para estas rutas
      try {
        const cookie = request.cookies.get('dev_rewrites')?.value
        if (cookie) {
          const map = JSON.parse(cookie) as Record<string, string>
          if (map && typeof map === 'object') {
            const destination = map[pathname]
            if (destination && typeof destination === 'string') {
              const rewriteUrl = request.nextUrl.clone()
              const destPath = destination.startsWith('/') ? destination : `/${destination}`
              rewriteUrl.pathname = destPath
              console.log(`🔁 [DEV Rewrite] ${pathname} -> ${rewriteUrl.pathname}`)
              return NextResponse.rewrite(rewriteUrl)
            }
          }
        }
      } catch {
        // Ignorar errores de parseo de cookie
      }
      return NextResponse.next()
    }

    // 1) Asegurar prefijo de locale en dev
    const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
    if (!hasLocale) {
      const locale = getLocale(request)
      const newUrl = new URL(`/${locale}${pathname}`, request.url)
      console.log(`🌍 [Middleware DEV] Redirect ${pathname} -> /${locale}${pathname}`)
      return NextResponse.redirect(newUrl)
    }

    // 2) Aplicar rewrites dinámicos (cookie dev_rewrites) ya con locale presente
    try {
      const cookie = request.cookies.get('dev_rewrites')?.value
      if (cookie) {
        const map = JSON.parse(cookie) as Record<string, string>
        if (map && typeof map === 'object') {
          // Extraer locale y normalizar pathname sin locale
          const matched = locales.find((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)) as Locale | undefined
          const activeLocale = matched || defaultLocale
          const withoutLocale = pathname.replace(new RegExp(`^/${activeLocale}`), '') || '/'
          const destination = map[withoutLocale]
          if (destination && typeof destination === 'string') {
            const rewriteUrl = request.nextUrl.clone()
            const destPath = destination.startsWith('/') ? destination : `/${destination}`
            rewriteUrl.pathname = `/${activeLocale}${destPath}`
            console.log(`🔁 [DEV Rewrite] ${pathname} -> ${rewriteUrl.pathname}`)
            return NextResponse.rewrite(rewriteUrl)
          }
        }
      }
    } catch {
      // Ignorar errores de parseo de cookie
    }

    // Sin rewrite
    return NextResponse.next()
  }

  // EN PRODUCCIÓN: Lógica de internacionalización completa
  // Verificar si la ruta ya tiene un locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // Si ya tiene locale, continuar
  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Solo excluir rutas de admin (todas las demás aplican internacionalización)
  if (pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Para TODAS las demás rutas en producción, detectar idioma del navegador y redirigir
  const locale = getLocale(request)
  const newUrl = new URL(`/${locale}${pathname}`, request.url)
  
  // Log para debugging (solo en desarrollo)
  if (isDevelopment) {
    console.log(`🌍 [Middleware PROD] Redirecting ${pathname} to /${locale}${pathname} (browser language detected)`)
  }
  
  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
