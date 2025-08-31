"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AuthHeader() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm">Hola, {session.user?.name}</span>
        <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
          Cerrar Sesión
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" onClick={() => signIn("google")}>
        Iniciar Sesión
      </Button>
      <Link href="/signup">
        <Button>Registrarse</Button>
      </Link>
    </div>
  )
}
