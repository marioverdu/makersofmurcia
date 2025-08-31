"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { UnifiedLoading } from '@/components/ui/unified-loading'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  BarChart, 
  Users, 
  Eye, 
  Clock, 
  TrendingUp, 
  Globe, 
  Monitor, 
  Activity,
  RefreshCw
} from 'lucide-react'

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
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [days, setDays] = useState(30)

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/admin/analytics?days=${days}`)
      
      if (!response.ok) {
        throw new Error(`Error al cargar las analíticas: ${response.status}`)
      }
      
      const data = await response.json()
      setSummary(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }, [days])

  useEffect(() => {
    fetchAnalytics()
  }, [fetchAnalytics])

  // Mostrar loading mientras se cargan los datos
  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <UnifiedLoading />
        </div>
      </div>
    )
  }

  // Mostrar error si hay algún problema
  if (error) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Analíticas</h1>
            <Button variant="outline" size="sm" onClick={fetchAnalytics}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-64">
              <div className="text-center">
                <div className="text-2xl mb-2">⚠️</div>
                <h3 className="text-lg font-semibold mb-2">Error al cargar analíticas</h3>
                <p className="text-muted-foreground mb-4">{error}</p>
                <Button onClick={fetchAnalytics}>Reintentar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Mostrar datos si todo está bien
  if (!summary) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Analíticas</h1>
            <Button variant="outline" size="sm" onClick={fetchAnalytics}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-64">
              <div className="text-center">
                <div className="text-2xl mb-2">📊</div>
                <h3 className="text-lg font-semibold mb-2">No hay datos disponibles</h3>
                <p className="text-muted-foreground mb-4">No se encontraron datos de analíticas para mostrar.</p>
                <Button onClick={fetchAnalytics}>Cargar datos</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Analíticas</h1>
          <div className="flex items-center gap-2">
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
            >
              <option value={7}>Últimos 7 días</option>
              <option value={30}>Últimos 30 días</option>
              <option value={90}>Últimos 90 días</option>
            </select>
            <Button variant="outline" size="sm" onClick={fetchAnalytics}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Resumen de métricas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vistas Totales</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.totalPageViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{Math.round((summary.totalPageViews / days) * 100) / 100} por día
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuarios Únicos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.uniqueUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((summary.uniqueUsers / summary.totalPageViews) * 100)}% de retención
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Duración Promedio</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(summary.averageSessionDuration / 60)}m</div>
              <p className="text-xs text-muted-foreground">
                {summary.averageSessionDuration % 60}s por sesión
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tendencia</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12%</div>
              <p className="text-xs text-muted-foreground">
                vs período anterior
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs con datos detallados */}
        <Tabs defaultValue="pages" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pages">Páginas Populares</TabsTrigger>
            <TabsTrigger value="referrers">Referencias</TabsTrigger>
            <TabsTrigger value="devices">Dispositivos</TabsTrigger>
            <TabsTrigger value="browsers">Navegadores</TabsTrigger>
            <TabsTrigger value="activity">Actividad Reciente</TabsTrigger>
          </TabsList>

          <TabsContent value="pages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Páginas Más Visitadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {summary.topPages.map((page, index) => (
                    <div key={page.page} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{index + 1}</Badge>
                        <span className="font-medium">{page.page}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {page.views.toLocaleString()} vistas
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="referrers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Principales Referencias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {summary.topReferrers.map((referrer, index) => (
                    <div key={referrer.referrer} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{index + 1}</Badge>
                        <span className="font-medium truncate max-w-[300px]">
                          {referrer.referrer || 'Directo'}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {referrer.count} visitas
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="devices" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Distribución por Dispositivos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {summary.deviceBreakdown.map((device) => (
                    <div key={device.device} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Monitor className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{device.device}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {device.count.toLocaleString()} ({Math.round((device.count / summary.totalPageViews) * 100)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="browsers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Distribución por Navegadores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {summary.browserBreakdown.map((browser) => (
                    <div key={browser.browser} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{browser.browser}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {browser.count.toLocaleString()} ({Math.round((browser.count / summary.totalPageViews) * 100)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {summary.recentActivity.slice(0, 10).map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{activity.page_path}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(activity.created_at).toLocaleString('es-ES')}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {activity.session_id ? 'Sesión' : 'Visitante'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
