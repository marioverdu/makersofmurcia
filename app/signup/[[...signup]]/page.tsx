"use client"

import React, { useState, useEffect } from "react"
import { UnifiedLoading } from "@/components/ui/unified-loading"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn("google", { callbackUrl: "/admin" })
    } catch (error) {
      console.error("Error de inicio de sesión:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Registro Admin</CardTitle>
          <CardDescription>
            Inicia sesión con tu cuenta de Google para acceder al área de administración.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4">Solo los administradores autorizados pueden acceder a esta área.</p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleGoogleSignIn} disabled={isLoading} className="w-full">
                            {isLoading ? <UnifiedLoading /> : "Continuar con Google"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
