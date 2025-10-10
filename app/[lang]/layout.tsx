import type React from "react"
import type { Locale } from "@/types/i18n"

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}

export default async function LangLayout({ children, params }: LayoutProps) {
  const { lang } = await params
  
  return (
    <div data-lang={lang}>
      {children}
    </div>
  )
}