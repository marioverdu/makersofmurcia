"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function NotFound() {
  useEffect(() => {
    // Any client-side effects can go here
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
      <p className="mb-8 text-lg">Lo sentimos, la página que estás buscando no existe.</p>
              <Link href="/" className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors">
        Volver al inicio
      </Link>
    </div>
  )
}
