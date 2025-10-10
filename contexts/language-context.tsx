"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import type { Locale } from '@/types/i18n'

interface LanguageContextType {
  currentLanguage: Locale
  setLanguage: (lang: Locale) => void
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: React.ReactNode
  initialLanguage?: Locale
}

export function LanguageProvider({ children, initialLanguage = 'es' }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Locale>(initialLanguage)
  const [isLoading, setIsLoading] = useState(true)

  // Función para establecer cookie de idioma
  const setLanguageCookie = (lang: Locale) => {
    document.cookie = `locale=${lang}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax` // 30 días
  }

  // Función para leer cookie de idioma
  const getLanguageCookie = (): Locale | null => {
    if (typeof document === 'undefined') return null
    
    const cookies = document.cookie.split(';')
    const localeCookie = cookies.find(cookie => cookie.trim().startsWith('locale='))
    
    if (localeCookie) {
      const lang = localeCookie.split('=')[1]?.trim()
      if (lang === 'es' || lang === 'en') {
        return lang as Locale
      }
    }
    return null
  }

  // Función para cambiar idioma
  const setLanguage = (lang: Locale) => {
    setCurrentLanguage(lang)
    setLanguageCookie(lang)
    
    // Recargar la página para aplicar el nuevo idioma
    window.location.href = `/${lang}`
  }

  // Inicializar idioma desde cookie o parámetro inicial
  useEffect(() => {
    const cookieLanguage = getLanguageCookie()
    
    // Detectar idioma desde la URL
    const urlLanguage = window.location.pathname.split('/')[1] as Locale
    
    console.log('🌍 [LanguageContext] Detecting language:', {
      cookieLanguage,
      urlLanguage,
      pathname: window.location.pathname,
      initialLanguage
    })
    
    if (cookieLanguage) {
      console.log('🌍 [LanguageContext] Using cookie language:', cookieLanguage)
      setCurrentLanguage(cookieLanguage)
    } else if (urlLanguage && (urlLanguage === 'es' || urlLanguage === 'en')) {
      console.log('🌍 [LanguageContext] Using URL language:', urlLanguage)
      setCurrentLanguage(urlLanguage)
      setLanguageCookie(urlLanguage)
    } else if (initialLanguage) {
      console.log('🌍 [LanguageContext] Using initial language:', initialLanguage)
      setCurrentLanguage(initialLanguage)
      setLanguageCookie(initialLanguage)
    }
    
    setIsLoading(false)
  }, [initialLanguage])

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    isLoading
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
