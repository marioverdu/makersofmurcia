import { NextResponse } from "next/server"

export async function GET() {
  // Verificar variables de entorno (solo mostrar si existen, no sus valores)
  const envVars = {
    NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: !!process.env.GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_VERCEL_URL: !!process.env.NEXT_PUBLIC_VERCEL_URL,
  }

  // Calcular la URL de callback esperada
  const baseUrl =
    process.env.NEXTAUTH_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : "URL_BASE_DESCONOCIDA")

  const callbackUrl = `${baseUrl}/api/auth/callback/google`

  return NextResponse.json({
    envVars,
    callbackUrl,
    timestamp: new Date().toISOString(),
  })
}
