// import { Header } from "@/components/ui/header"
import type { ReactNode } from "react"

export default function PostsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      {/* Header eliminado para la página de posts */}
      <main>{children}</main>
    </>
  )
}
