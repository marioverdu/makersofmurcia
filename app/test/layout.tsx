import type React from "react"

export default function TestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
        <p className="font-bold">Página de Test</p>
        <p>
          Esta es una página de prueba para testing y desarrollo.
        </p>
      </div>
      {children}
    </div>
  )
}
