"use client"

import { useSession, signOut } from "next-auth/react"

// Forzar renderizado dinámico para evitar prerender
export const dynamic = 'force-dynamic'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Aún cargando
    if (!session) {
      router.push("/login")
    }
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Panel de Administración
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Bienvenido, {session.user?.name || session.user?.email}
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/">🏠 Inicio</Link>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Cerrar Sesión
            </Button>
          </div>
        </div>

        {/* Admin Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📚 Storybook
                <Badge variant="secondary">Disponible</Badge>
              </CardTitle>
              <CardDescription>
                Documentación del Design System
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Accede a la documentación completa del Design System y componentes.
              </p>
              <Button asChild className="w-full">
                <a href="http://localhost:6006" target="_blank" rel="noopener noreferrer">
                  Abrir Storybook
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🎨 Design System
                <Badge variant="secondary">Completo</Badge>
              </CardTitle>
              <CardDescription>
                Tokens y componentes base
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Sistema de diseño con tokens CSS y componentes Radix UI.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/">Ver Componentes</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ⚙️ Configuración
                <Badge variant="secondary">Básica</Badge>
              </CardTitle>
              <CardDescription>
                Configuración del proyecto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Configuración de autenticación y variables de entorno.
              </p>
              <Button variant="outline" className="w-full" disabled>
                Próximamente
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>ℹ️ Información del Proyecto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Características:</h4>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                    <li>• Next.js 15 con App Router</li>
                    <li>• React 19 y TypeScript</li>
                    <li>• Tailwind CSS con tokens personalizados</li>
                    <li>• Radix UI para componentes accesibles</li>
                    <li>• NextAuth.js para autenticación</li>
                    <li>• Storybook para documentación</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Comandos útiles:</h4>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                    <li>• <code>npm run dev</code> - Desarrollo</li>
                    <li>• <code>npm run storybook</code> - Storybook</li>
                    <li>• <code>npm run build</code> - Build</li>
                    <li>• <code>npm run lint</code> - Linting</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
