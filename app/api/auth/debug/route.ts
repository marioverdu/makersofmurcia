import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await getServerSession(authOptions)

  // No exponer valores sensibles de las variables de entorno
  const envInfo = {
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET, // Solo si está presente
    GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID, // Solo si está presente
    GOOGLE_CLIENT_SECRET: !!process.env.GOOGLE_CLIENT_SECRET, // Solo si está presente
    VERCEL_URL: process.env.VERCEL_URL,
    NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL, // Mostrar el email admin para depuración
  }

  return NextResponse.json({
    message: "NextAuth Debug Info",
    environment: envInfo,
    session: session ? { user: session.user, expires: session.expires } : null,
    timestamp: new Date().toISOString(),
  })
}
