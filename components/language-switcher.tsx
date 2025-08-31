"use client"

import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import type { Locale } from "@/types/i18n"

interface LanguageSwitcherProps {
  currentLang: Locale
  className?: string
}

export default function LanguageSwitcher({ currentLang, className = "" }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLang, setSelectedLang] = useState<Locale>(currentLang)

  // Detectar si estamos en desarrollo
  const isDevelopment = process.env.NODE_ENV === 'development' || 
                       process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production'

  // Sincronizar el estado local cuando cambie el prop currentLang
  useEffect(() => {
    setSelectedLang(currentLang)
  }, [currentLang])

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ]

  const handleLanguageChange = (newLang: Locale) => {
    setIsOpen(false)
    setSelectedLang(newLang)
    
    // Guardar preferencia en cookies
    document.cookie = `locale=${newLang}; path=/; max-age=31536000` // 1 año
    
    // En desarrollo, también cambiar el idioma
    if (isDevelopment) {
      // Remover el locale actual de la ruta
      const pathWithoutLocale = pathname.replace(`/${currentLang}`, '') || '/'
      
      // Construir la nueva ruta con el nuevo locale
      const newPath = `/${newLang}${pathWithoutLocale}`
      
      console.log(`[DEV] Changing language to: ${newLang}, path: ${newPath}`)
      router.push(newPath)
      return
    }
    
    // En producción, cambiar el idioma
    // Remover el locale actual de la ruta
    const pathWithoutLocale = pathname.replace(`/${currentLang}`, '') || '/'
    
    // Construir la nueva ruta con el nuevo locale
    const newPath = `/${newLang}${pathWithoutLocale}`
    
    router.push(newPath)
  }

  const currentLanguage = languages.find(lang => lang.code === selectedLang)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-0.5 ${className}`}
        title="Change language"
      >
        <span>{currentLanguage?.flag}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}>
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
            <div className="py-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code as Locale)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 ${
                    selectedLang === language.code ? 'bg-cyan-50 text-cyan-700' : 'text-gray-600'
                  }`}
                >
                  <span>{language.flag}</span>
                  <span>{language.name}</span>
                  {selectedLang === language.code && (
                    <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

