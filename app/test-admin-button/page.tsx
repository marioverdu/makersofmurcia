"use client"

import React, { useState, useEffect } from "react"
import { UnifiedLoading } from "@/components/ui/unified-loading"
import { Button } from "@/components/ui/button"
import { useAdminAuth } from '@/hooks/use-admin-auth'
import { ProfileCardWidescreens } from '@/components/profile-card'

export default function TestAdminButtonPage() {
  const { isAdmin, isLoading } = useAdminAuth()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Test - Botón de Edición</h1>
          <div className="space-y-2">
            <p><span className="font-medium">Admin:</span> {isAdmin ? '✅ Sí' : '❌ No'}</p>
            <p><span className="font-medium">Loading:</span> {isLoading ? <UnifiedLoading /> : '✅ Cargado'}</p>
            <p><span className="font-medium">Entorno:</span> {process.env.NODE_ENV === 'development' ? '🛠️ Desarrollo' : '🚀 Producción'}</p>
          </div>
        </div>

        {/* ProfileCard */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">ProfileCard con Menú Contextual</h2>
          <ProfileCardWidescreens />
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Instrucciones:</strong> Haz clic en los tres puntos junto al botón de contacto 
              para abrir el menú contextual. Deberías ver el botón "Editar contenido" si eres admin.
            </p>
          </div>
        </div>

        {/* Debug Info */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-yellow-900 mb-4">🔍 Información de Debug</h2>
          <div className="space-y-2 text-yellow-800">
            <p><strong>process.env.NODE_ENV:</strong> {process.env.NODE_ENV}</p>
            <p><strong>isAdmin:</strong> {isAdmin.toString()}</p>
            <p><strong>isLoading:</strong> {isLoading.toString()}</p>
            <p><strong>Condición de desarrollo:</strong> {(process.env.NODE_ENV === 'development').toString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
