"use client"
import { DevRedirect } from "@/components/dev-redirect"

export default function PostsAdminRedirect() {
  return (
    <DevRedirect targetPath="/posts/admin">
      <div>Redirigiendo a gestión de posts...</div>
    </DevRedirect>
  )
}
