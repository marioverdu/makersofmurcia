"use client"

// 🚨 TEMPORAL: Componente sin NextAuth para evitar errores
// Para reactivar NextAuth: reemplazar con el código comentado abajo

export default function SessionStatus() {
  return (
    <div className="text-sm">
      <p>Modo: Producción</p>
      <p>Rol: Usuario</p>
      <div className="mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">NextAuth desactivado</div>
    </div>
  )
}

/* 🔒 CÓDIGO ORIGINAL CON NEXTAUTH (comentado temporalmente)
// Para reactivar: reemplazar el componente de arriba con este código

"use client"

import { useSession } from "next-auth/react"

export default function SessionStatus() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Cargando...</div>
  }

  if (status === "authenticated") {
    return (
      <div className="text-sm">
        <p>Conectado como: {session.user?.email}</p>
        <p>Rol: {session.user?.isAdmin ? "Administrador" : "Usuario"}</p>
      </div>
    )
  }

  return <div>No autenticado</div>
}
*/
