"use client"

import React, { useState, useEffect } from "react"
import { UnifiedLoading } from "@/components/ui/unified-loading"
import BookingCard from "@/components/admin/booking-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function AdminBookingPage() {
  const [proposals, setProposals] = useState<any>({ pending: [], approved: [], rejected: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProposals() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("/api/proposals")
        if (!res.ok) throw new Error("Error al cargar las reservas")
        const data = await res.json()
        setProposals(data)
      } catch (err: any) {
        setError(err.message || "Error desconocido")
      } finally {
        setLoading(false)
      }
    }
    fetchProposals()
  }, [])

  // Funciones vacías para acciones (puedes conectar con la API si lo necesitas)
  const handleStatusUpdate = async (proposalId: string, newStatus: string) => {
    // Implementar lógica de actualización si es necesario
    // await fetch(`/api/proposals/${proposalId}`, { method: "PATCH", ... })
  }
  const handleDelete = async (proposalId: string) => {
    // Implementar lógica de borrado si es necesario
    // await fetch(`/api/proposals/${proposalId}`, { method: "DELETE" })
  }

  if (loading) return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-center min-h-[400px]">
        <UnifiedLoading />
      </div>
    </div>
  )
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Gestión de Reservas</h1>
        <p className="text-gray-600">Administra las propuestas y reservas de clientes</p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            ⏳ Pendientes
            {proposals.pending.length > 0 && (
              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                {proposals.pending.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex items-center gap-2">
            ✅ Confirmadas
            {proposals.approved.length > 0 && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                {proposals.approved.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex items-center gap-2">
            ❌ Rechazadas
            {proposals.rejected.length > 0 && (
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                {proposals.rejected.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ⏳ Reservas Pendientes
                <span className="text-sm font-normal text-gray-500">
                  ({proposals.pending.length} propuestas)
                </span>
              </CardTitle>
            </CardHeader>
            <BookingCard 
              proposals={proposals.pending} 
              title="Pendientes" 
              onStatusUpdate={handleStatusUpdate} 
              onDelete={handleDelete} 
              showActions={true} 
            />
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ✅ Reservas Confirmadas
                <span className="text-sm font-normal text-gray-500">
                  ({proposals.approved.length} propuestas)
                </span>
              </CardTitle>
            </CardHeader>
            <BookingCard 
              proposals={proposals.approved} 
              title="Confirmadas" 
              onStatusUpdate={handleStatusUpdate} 
              onDelete={handleDelete} 
              showActions={false} 
            />
          </Card>
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ❌ Reservas Rechazadas
                <span className="text-sm font-normal text-gray-500">
                  ({proposals.rejected.length} propuestas)
                </span>
              </CardTitle>
            </CardHeader>
            <BookingCard 
              proposals={proposals.rejected} 
              title="Rechazadas" 
              onStatusUpdate={handleStatusUpdate} 
              onDelete={handleDelete} 
              showActions={false} 
            />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
