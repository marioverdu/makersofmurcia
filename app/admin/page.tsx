"use client"

import { useDevAuth } from "@/hooks/use-dev-auth"
import { AdminGate } from "@/components/admin/admin-gate"
import { DevBanner } from "@/components/dev-banner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UnifiedLoading } from "@/components/ui/unified-loading"
import { CalendarDays, Route, Users, MessageSquare, BarChart } from "lucide-react"
import { RoutesWidget } from "@/components/admin/routes-widget"
import { FaviconWidget } from "@/components/admin/favicon-widget"
import Link from "next/link"

export default function AdminDashboardPage() {
  const { session, isLoading, isDevelopment } = useDevAuth({
    redirectTo: "/login"
  })

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <UnifiedLoading />
        </div>
      </div>
    )
  }

  return (
    <AdminGate routePath="/admin">
      <div className="space-y-6">
        <div className="w-full flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">🏠 Dashboard</h1>
            <p className="text-gray-600 mt-2">Bienvenido, {session?.user?.name || "Administrador"}!</p>
          </div>
          <div className="flex-shrink-0">
            <DevBanner />
          </div>
        </div>

        <div className="admin-dashboard grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card className="sm:h-60 flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2 flex-shrink-0">
              <CardTitle className="text-xs sm:text-sm font-medium">Panel de Control</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between flex-1 min-h-0">
              <div className="flex-shrink-0">
                <div className="text-lg sm:text-2xl font-bold">Gestionar</div>
                <p className="text-xs text-muted-foreground">Desde aquí puedes gestionar el contenido y las funcionalidades de tu sitio.</p>
              </div>
              <Link href="/admin/posts" className="flex-shrink-0">
                <Button variant="link" className="p-0 h-auto text-xs sm:text-sm mt-2">
                  Gestionar Posts
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="sm:h-60 flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2 flex-shrink-0">
              <CardTitle className="text-xs sm:text-sm font-medium">Reservas</CardTitle>
              <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col justify-between flex-1 min-h-0">
              <div className="flex-shrink-0">
                <div className="text-lg sm:text-2xl font-bold">Próximas</div>
                <p className="text-xs text-muted-foreground">Ver y gestionar citas</p>
              </div>
              <Link href="/admin/booking" className="flex-shrink-0">
                <Button variant="link" className="p-0 h-auto text-xs sm:text-sm mt-2">
                  Ir a Reservas
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <RoutesWidget />
          
          <FaviconWidget />
          
          <Card className="sm:h-60 flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2 flex-shrink-0">
              <CardTitle className="text-xs sm:text-sm font-medium">Posts</CardTitle>
              <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col justify-between flex-1 min-h-0">
              <div className="flex-shrink-0">
                <div className="text-lg sm:text-2xl font-bold">Gestionar</div>
                <p className="text-xs text-muted-foreground">Administra el contenido del blog</p>
              </div>
              <Link href="/admin/posts" className="flex-shrink-0">
                <Button variant="link" className="p-0 h-auto text-xs sm:text-sm mt-2">
                  Ir a Posts
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="sm:h-60 flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2 flex-shrink-0">
              <CardTitle className="text-xs sm:text-sm font-medium">Analíticas</CardTitle>
              <BarChart className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col justify-between flex-1 min-h-0">
              <div className="flex-shrink-0">
                <div className="text-lg sm:text-2xl font-bold">Métricas</div>
                <p className="text-xs text-muted-foreground">Estadísticas y métricas del sitio</p>
              </div>
              <Link href="/admin/analytics" className="flex-shrink-0">
                <Button variant="link" className="p-0 h-auto text-xs sm:text-sm mt-2">
                  Ver Analíticas
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="sm:h-60 flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2 flex-shrink-0">
              <CardTitle className="text-xs sm:text-sm font-medium">Usuarios</CardTitle>
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col justify-between flex-1 min-h-0">
              <div className="flex-shrink-0">
                <div className="text-lg sm:text-2xl font-bold">Gestionar</div>
                <p className="text-xs text-muted-foreground">Ver y gestionar usuarios</p>
              </div>
              <Button variant="link" className="p-0 h-auto text-xs sm:text-sm mt-2 flex-shrink-0" disabled>
                Próximamente
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminGate>
  )
}
