"use client"

import { LanguageProvider } from "@/contexts/language-context"
import type { Locale } from "@/types/i18n"

interface LanguageProviderWrapperProps {
  children: React.ReactNode
}

export function LanguageProviderWrapper({ children }: LanguageProviderWrapperProps) {
  // Detectar idioma desde la URL
  const detectLanguageFromURL = (): Locale => {
    if (typeof window === 'undefined') return 'es'
    
    const pathname = window.location.pathname
    if (pathname.startsWith('/en/') || pathname === '/en') {
      return 'en'
    }
    if (pathname.startsWith('/es/') || pathname === '/es') {
      return 'es'
    }
    return 'es' // default
  }

  const initialLanguage = detectLanguageFromURL()

  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      {children}
    </LanguageProvider>
  )
}
