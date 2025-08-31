"use client"

import { useDevAuth } from "@/hooks/use-dev-auth"
import { UnifiedLoading } from "@/components/ui/unified-loading"

interface AdminGateProps {
  children: React.ReactNode
}

export function AdminGate({ children }: AdminGateProps) {
  const { isAuthorized, isLoading, isDevelopment } = useDevAuth({
    requireAuth: true,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <UnifiedLoading />
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-800 mb-4">
            Acceso Denegado
          </h1>
          <p className="text-red-600 mb-4">
            No tienes permisos para acceder a esta área.
          </p>
          {!isDevelopment && (
            <p className="text-sm text-red-500">
              Esta área solo está disponible en desarrollo.
            </p>
          )}
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default AdminGate
