"use client"

import React, { useState, useEffect } from "react"
import { UnifiedLoading } from "@/components/ui/unified-loading"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle } from "lucide-react"

export default function ResendTestPage() {
  const [message, setMessage] = useState("")
  const [subject, setSubject] = useState("Test desde página de Resend")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    message: string
    details?: any
  } | null>(null)

  const handleSendEmail = async () => {
    if (!message.trim()) {
      setResult({
        success: false,
        message: "Por favor, escribe un mensaje"
      })
      return
    }

    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          subject: subject
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setResult({
          success: true,
          message: "Email enviado correctamente",
          details: data
        })
      } else {
        setResult({
          success: false,
          message: data.error || "Error al enviar el email",
          details: data
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: "Error de conexión",
        details: error
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleTestResend = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/test-resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setResult({
          success: true,
          message: "Test de Resend exitoso",
          details: data
        })
      } else {
        setResult({
          success: false,
          message: data.error || "Error en el test de Resend",
          details: data
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: "Error de conexión en test de Resend",
        details: error
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Test de Resend</h1>
        <p className="text-muted-foreground">
          Página para probar el funcionamiento del servicio de emails con Resend
        </p>
      </div>

      <div className="space-y-6">
        {/* Test Directo de Resend */}
        <Card>
          <CardHeader>
            <CardTitle>Test Directo de Resend</CardTitle>
            <CardDescription>
              Prueba la conexión directa con Resend sin pasar por el chat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleTestResend} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <UnifiedLoading />
                  Probando...
                </>
              ) : (
                "Probar Conexión Resend"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Test de API del Chat */}
        <Card>
          <CardHeader>
            <CardTitle>Test de API del Chat</CardTitle>
            <CardDescription>
              Prueba el envío de emails a través de la API del chat
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="subject">Asunto</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Asunto del email"
              />
            </div>
            <div>
              <Label htmlFor="message">Mensaje</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe tu mensaje aquí..."
                rows={4}
              />
            </div>
            <Button 
              onClick={handleSendEmail} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <UnifiedLoading />
                  Enviando...
                </>
              ) : (
                "Enviar Email"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Resultado */}
        {result && (
          <Alert className={result.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
            {result.success ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={result.success ? "text-green-800" : "text-red-800"}>
              <div className="font-medium">{result.message}</div>
              {result.details && (
                <pre className="mt-2 text-xs bg-white p-2 rounded border overflow-auto">
                  {JSON.stringify(result.details, null, 2)}
                </pre>
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Información */}
        <Card>
          <CardHeader>
            <CardTitle>Información</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><strong>Remitente:</strong> chat@marioverdu.com</p>
            <p><strong>Destinatario:</strong> marioverdugambin@gmail.com</p>
            <p><strong>API Key:</strong> Configurada (solo visible en servidor)</p>
            <p><strong>Dominio:</strong> marioverdu.com (verificado)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
