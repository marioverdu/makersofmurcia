/**
 * Hook para gestionar redirecciones personalizadas y sistema de fallback
 * 
 * Uso en componentes cliente:
 * 
 * ```tsx
 * import { useRouteRedirection } from '@/hooks/use-route-redirection'
 * 
 * export default function MyPageClient({ lang }: { lang: Locale }) {
 *   const { isChecking, showMaintenance } = useRouteRedirection('/my-route', lang)
 *   
 *   if (isChecking) return <UnifiedPageLoading />
 *   if (showMaintenance) return <MaintenancePage />
 *   
 *   // Renderizar contenido normal
 *   return <div>...</div>
 * }
 * ```
 */

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Locale } from '@/types/i18n'

interface RouteConfig {
  path: string
  isVisible: boolean
  redirectTo: string | null
  priority: number
}

interface UseRouteRedirectionResult {
  isChecking: boolean
  showMaintenance: boolean
}

export function useRouteRedirection(
  currentPath: string,
  lang: Locale
): UseRouteRedirectionResult {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
  const [showMaintenance, setShowMaintenance] = useState(false)

  const isProduction =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ||
    process.env.NODE_ENV === 'production'

  useEffect(() => {
    const checkRouteSettings = async () => {
      setIsChecking(true)
      console.log(`🔄 [${isProduction ? 'PROD' : 'DEV'}] Checking route settings for ${currentPath}...`)

      try {
        // Obtener todas las rutas con sus configuraciones
        const res = await fetch('/api/admin/routes')
        const data = await res.json()

        if (data?.data?.routes) {
          const routes = data.data.routes as RouteConfig[]
          const currentRoute = routes.find((r) => r.path === currentPath)

          if (currentRoute) {
            console.log(`📋 [${isProduction ? 'PROD' : 'DEV'}] Route config for ${currentPath}:`, {
              path: currentRoute.path,
              isVisible: currentRoute.isVisible,
              redirectTo: currentRoute.redirectTo,
              priority: currentRoute.priority,
            })

            // PRIORIDAD 1: Si la ruta está activa Y tiene redirectTo, redirigir
            if (currentRoute.isVisible && currentRoute.redirectTo) {
              console.log(
                `🔀 [${isProduction ? 'PROD' : 'DEV'}] Custom redirect to ${currentRoute.redirectTo}`
              )
              router.replace(`/${lang}${currentRoute.redirectTo}`)
              return
            }

            // PRIORIDAD 2: Si la ruta está inactiva, usar sistema de fallback
            if (!currentRoute.isVisible) {
              console.log(
                `🚫 [${isProduction ? 'PROD' : 'DEV'}] Route ${currentPath} is inactive, finding fallback...`
              )

              // Ordenar rutas por prioridad y encontrar la primera activa (excluyendo la actual)
              const sortedRoutes = routes
                .filter(
                  (r) =>
                    r.path !== currentPath &&
                    r.path !== '__ALL__' &&
                    !r.path.startsWith('/api') &&
                    !r.path.startsWith('/admin') &&
                    !r.path.includes('[') &&
                    !r.path.includes(']')
                )
                .sort((a, b) => a.priority - b.priority)

              const fallbackRoute = sortedRoutes.find((r) => r.isVisible)

              if (fallbackRoute) {
                console.log(
                  `✅ [${isProduction ? 'PROD' : 'DEV'}] Redirecting to fallback ${fallbackRoute.path}`
                )
                router.replace(`/${lang}${fallbackRoute.path}`)
                return
              } else {
                console.log(
                  `🚧 [${isProduction ? 'PROD' : 'DEV'}] No active routes, showing maintenance`
                )
                setShowMaintenance(true)
              }
            }

            // Si llegamos aquí, la ruta está activa y no tiene redirect personalizado
            console.log(
              `✅ [${isProduction ? 'PROD' : 'DEV'}] Route ${currentPath} is active, no custom redirect, proceeding`
            )
          } else {
            console.warn(
              `⚠️ [${isProduction ? 'PROD' : 'DEV'}] No config found for ${currentPath}, allowing access`
            )
          }
        }
      } catch (error) {
        console.error(
          `❌ [${isProduction ? 'PROD' : 'DEV'}] Error checking route settings for ${currentPath}:`,
          error
        )
        // En caso de error, permitir acceso
      }

      setIsChecking(false)
    }

    checkRouteSettings()
  }, [currentPath, lang, router, isProduction])

  return {
    isChecking,
    showMaintenance,
  }
}

