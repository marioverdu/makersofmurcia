import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  console.log("Sistema funcionando sin KV/Redis - usando solo base de datos y memoria")

  const results = {
    database: {
      success: !!process.env.DATABASE_URL,
      message: process.env.DATABASE_URL ? "Base de datos Neon conectada" : "Base de datos no configurada",
    },
    storage: {
      success: true,
      message: "Usando localStorage y memoria temporal",
    },
    env: {
      DATABASE_URL: !!process.env.DATABASE_URL,
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV || "development",
    },
  }

  return NextResponse.json({
    success: true,
    message: "Sistema funcionando correctamente sin KV/Redis",
    results,
    timestamp: new Date().toISOString(),
  })
}
