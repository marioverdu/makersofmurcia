"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function RootPageClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Light CMS Template
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Una versión extremadamente ligera para desarrollo de componentes, con Design System completo y Storybook integrado.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🎨 Design System
                <Badge variant="secondary">Completo</Badge>
              </CardTitle>
              <CardDescription>
                Tokens CSS, componentes UI base y guías de estilo integradas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Sistema de diseño completo con tokens CSS dinámicos, componentes Radix UI y Storybook para documentación.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📚 Storybook
                <Badge variant="secondary">Integrado</Badge>
              </CardTitle>
              <CardDescription>
                Documentación interactiva de componentes y Design System
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Storybook configurado con addons para accesibilidad, documentación y testing de componentes.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🔐 Autenticación
                <Badge variant="secondary">NextAuth</Badge>
              </CardTitle>
              <CardDescription>
                Sistema de login y seguridad configurado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                NextAuth.js configurado con Google OAuth y sistema de sesiones para desarrollo.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ⚡ Next.js 15
                <Badge variant="secondary">App Router</Badge>
              </CardTitle>
              <CardDescription>
                Framework moderno con App Router y React 19
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Next.js 15 con App Router, React 19 y TypeScript configurado para desarrollo rápido.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🎯 Tailwind CSS
                <Badge variant="secondary">Optimizado</Badge>
              </CardTitle>
              <CardDescription>
                Sistema de estilos con tokens personalizados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Tailwind CSS con tokens personalizados, modo oscuro y utilidades optimizadas.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🧩 Componentes UI
                <Badge variant="secondary">Radix</Badge>
              </CardTitle>
              <CardDescription>
                Biblioteca completa de componentes accesibles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Componentes Radix UI con shadcn/ui para máxima accesibilidad y personalización.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="px-8">
              <Link href="/login">
                🔐 Panel de Administración
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8">
              <a href="http://localhost:6006" target="_blank" rel="noopener noreferrer">
                📚 Ver Storybook
              </a>
            </Button>
          </div>
          
          <div className="text-sm text-slate-500 dark:text-slate-400">
            <p>Para iniciar Storybook: <code className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">npm run storybook</code></p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="text-center text-slate-500 dark:text-slate-400">
            <p>Light CMS Template - Versión optimizada para desarrollo de componentes</p>
          </div>
        </div>
      </div>
    </div>
  )
}