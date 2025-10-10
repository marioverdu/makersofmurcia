import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Verificar si las variables de entorno están disponibles
    const hasKvUrl = !!process.env.KV_URL
    const hasKvToken = !!process.env.KV_REST_API_TOKEN

    // Obtener versiones seguras (parciales) de las variables para mostrar
    const kvUrlSafe = process.env.KV_URL ? `${process.env.KV_URL.substring(0, 15)}...` : "No disponible"

    const kvTokenSafe = process.env.KV_REST_API_TOKEN
      ? `${process.env.KV_REST_API_TOKEN.substring(0, 5)}...`
      : "No disponible"

    return NextResponse.json({
      success: true,
      hasKvUrl,
      hasKvToken,
      kvUrlSafe,
      kvTokenSafe,
      allVariablesAvailable: hasKvUrl && hasKvToken,
      message:
        hasKvUrl && hasKvToken
          ? "¡Todas las variables de entorno necesarias están disponibles!"
          : "Faltan algunas variables de entorno necesarias.",
    })
  } catch (error) {
    console.error("Error testing environment variables:", error)
    return NextResponse.json(
      {
        success: false,
        error: String(error),
        message: "Error al verificar las variables de entorno",
      },
      { status: 500 },
    )
  }
}
