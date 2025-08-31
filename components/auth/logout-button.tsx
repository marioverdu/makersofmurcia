"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

const LogoutButton = () => {
  return (
    <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
      Cerrar Sesión
    </Button>
  )
}

export default LogoutButton
export { LogoutButton }
