"use client"
import { signIn, getSession } from "next-auth/react"
import React, { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UnifiedLoading } from "@/components/ui/unified-loading"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Detectar si estamos en producción
  const isProduction = process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_VERCEL_ENV === "production"

  useEffect(() => {
    // Redirección automática a /admin en localhost
    if (typeof window !== 'undefined') {
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      if (isLocalhost) {
        window.location.href = '/admin';
        return;
      }
    }
    // Verificar errores en la URL
    const urlError = searchParams?.get("error")
    if (urlError) {
      switch (urlError) {
        case "Configuration":
          setError("Error de configuración del servidor. Verifica las variables de entorno.")
          break
        case "AccessDenied":
          setError("Acceso denegado. Solo el administrador puede acceder.")
          break
        case "Verification":
          setError("Error de verificación. Inténtalo de nuevo.")
          break
        default:
          setError(`Error: ${urlError}`)
      }
    }

    // Verificar si ya está autenticado
    const checkSession = async () => {
      try {
        const session = await getSession()
        if (session) {
          router.push("/admin")
        }
      } catch (error) {
        console.error("Error checking session:", error)
      }
    }
    checkSession()

    // Cargar información de debug en desarrollo
    if (!isProduction) {
      fetch("/api/auth/debug")
        .then((res) => res.json())
        .then((data) => setDebugInfo(data))
        .catch((err) => console.error("Debug info error:", err))
    }
  }, [router, searchParams, isProduction])

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      setError("")

      console.log("🔐 Attempting Google sign in...")

      const result = await signIn("google", {
        callbackUrl: "/admin",
        redirect: false,
      })

      console.log("🔐 Sign in result:", result)

      if (result?.error) {
        console.error("Sign in error:", result.error)
        switch (result.error) {
          case "AccessDenied":
            setError("Acceso denegado. Solo el administrador puede acceder.")
            break
          case "Configuration":
            setError("Error de configuración. Contacta al administrador.")
            break
          default:
            setError(`Error al iniciar sesión: ${result.error}`)
        }
      } else if (result?.url) {
        console.log("🔐 Redirecting to:", result.url)
        router.push(result.url)
      }
    } catch (error) {
      console.error("Error signing in:", error)
      setError("Error al iniciar sesión. Inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Panel de Administración</CardTitle>
            <CardDescription>
              {isProduction
                ? "Inicia sesión para acceder al panel de administración"
                : "Modo desarrollo - Autenticación simplificada"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isProduction ? (
              <Button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-transparent"
                variant="outline"
              >
                {loading ? (
                  <UnifiedLoading />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                )}
                {loading ? "Iniciando sesión..." : "Continuar con Google"}
              </Button>
            ) : (
              <div className="space-y-4">
                <Alert>
                  <AlertDescription>Modo desarrollo activo. La autenticación está desactivada.</AlertDescription>
                </Alert>
                <Button onClick={() => router.push("/admin")} className="w-full">
                  Acceder al Panel (Desarrollo)
                </Button>
              </div>
            )}

            <div className="text-center">
              <a href="/" className="text-sm text-gray-600 hover:text-gray-800 underline">
                ← Volver al inicio
              </a>
            </div>

            <div className="text-xs text-gray-500 text-center space-y-1">
              <p>Entorno: {isProduction ? "Producción" : "Desarrollo"}</p>
              {isProduction && <p>Solo el administrador autorizado puede acceder</p>}
            </div>
          </CardContent>
        </Card>

        {/* Debug info en desarrollo */}
        {!isProduction && debugInfo && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Debug Info</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">{JSON.stringify(debugInfo, null, 2)}</pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
