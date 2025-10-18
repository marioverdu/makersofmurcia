"use client"

import { Suspense } from "react"
import AdminPageContent from "./admin-content"

// Forzar renderizado dinámico para evitar prerender
export const dynamic = 'force-dynamic'

export default function AdminPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Cargando...</p>
        </div>
      </div>
    }>
      <AdminPageContent />
    </Suspense>
  )
}
