"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UnifiedLoading } from "@/components/ui/unified-loading"
import { BarChart3, Users, Clock, TrendingUp } from "lucide-react"

interface AnalyticsSummary {
  totalPageViews: number
  uniqueUsers: number
  averageSessionDuration: number
  topPages: Array<{ page: string; views: number }>
  topReferrers: Array<{ referrer: string; count: number }>
  deviceBreakdown: Array<{ device: string; count: number }>
  browserBreakdown: Array<{ browser: string; count: number }>
  recentActivity: Array<{
    id: number
    page_path: string
    user_agent?: string
    session_id?: string
    created_at: string
  }>
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/admin/analytics?type=summary&days=30')
        if (!response.ok) {
          throw new Error('Error al cargar analytics')
        }
        const summary = await response.json()
        setData(summary)
      } catch (err) {
        console.error('Error fetching analytics:', err)
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center min-h-[60vh]">
        <UnifiedLoading />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-semibold">Error al cargar analytics</h3>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div className="text-sm text-gray-500">
          Últimos 30 días • {new Date().toLocaleString('es-ES')}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vistas</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalPageViews?.toLocaleString() || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Únicos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.uniqueUsers?.toLocaleString() || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Duración Promedio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.averageSessionDuration ? formatDuration(data.averageSessionDuration) : '0m 0s'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Páginas Populares</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.topPages?.length || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Páginas Más Vistas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data?.topPages && data.topPages.length > 0 ? (
                data.topPages.slice(0, 5).map((page, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 truncate flex-1">{page.page}</span>
                    <span className="text-sm font-semibold ml-2">{page.views} vistas</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No hay datos disponibles</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dispositivos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data?.deviceBreakdown && data.deviceBreakdown.length > 0 ? (
                data.deviceBreakdown.map((device, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 capitalize">{device.device}</span>
                    <span className="text-sm font-semibold">{device.count}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No hay datos disponibles</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data?.recentActivity && data.recentActivity.length > 0 ? (
              data.recentActivity.slice(0, 10).map((activity) => (
                <div key={activity.id} className="flex items-center justify-between text-sm border-b pb-2">
                  <span className="text-gray-600 truncate flex-1">{activity.page_path}</span>
                  <span className="text-gray-400 text-xs ml-2">
                    {new Date(activity.created_at).toLocaleString('es-ES')}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No hay actividad reciente</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
