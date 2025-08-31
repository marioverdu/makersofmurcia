import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function DebugPage() {
  const session = await getServerSession(authOptions)

  // Verificar variables de entorno (solo mostrar si existen, no sus valores)
  const envVars = {
    NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: !!process.env.GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_VERCEL_URL: !!process.env.NEXT_PUBLIC_VERCEL_URL,
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Página de Diagnóstico</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Variables de Entorno</h2>
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(envVars, null, 2)}</pre>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Información de Sesión</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(
            {
              autenticado: !!session,
              usuario: session?.user
                ? {
                    nombre: session.user.name,
                    email: session.user.email,
                    isAdmin: session.user.isAdmin,
                  }
                : null,
            },
            null,
            2,
          )}
        </pre>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">URLs de Callback</h2>
        <p className="mb-2">URL de callback esperada para Google:</p>
        <code className="bg-gray-100 p-2 block">
          {`${process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : "URL_BASE"}/api/auth/callback/google`}
        </code>
      </div>
    </div>
  )
}
