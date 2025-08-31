"use client"

import React, { useState } from "react"
import type { Locale } from "@/types/i18n"

interface HeaderContextualMenuProps {
  currentLang: Locale
  className?: string
  onLanguageChange?: (newLang: Locale) => void
  hidden?: boolean // Nueva prop para ocultar el botón
}

export function HeaderContextualMenu({ 
  currentLang, 
  className = "",
  onLanguageChange,
  hidden = false
}: HeaderContextualMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLang, setSelectedLang] = useState<Locale>(currentLang)
  const [isDarkMode, setIsDarkMode] = useState(false) // Estado local para el toggle

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ]

  const handleLanguageChange = (newLang: Locale) => {
    setIsOpen(false)
    setSelectedLang(newLang)
    
    // Llamar al callback si se proporciona
    if (onLanguageChange) {
      onLanguageChange(newLang)
    }
    
    // Log para debugging
    console.log(`[HeaderContextualMenu] Language changed to: ${newLang}`)
  }

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode)
    console.log(`[HeaderContextualMenu] Theme toggle clicked: ${!isDarkMode ? 'dark' : 'light'}`)
    // No se cambia el tema global, solo feedback visual
  }

  const currentLanguage = languages.find(lang => lang.code === selectedLang)

  // Si hidden es true, no renderizar nada
  if (hidden) {
    return null
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center h-[28px] px-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${className}`}
        title="Change language"
        style={{
          width: '28px',  // Mismo tamaño que el avatar
          height: '28px', // Mismo tamaño que el avatar
          minWidth: '28px',
          minHeight: '28px'
        }}
      >
        {/* Icono de engranaje/settings - SVG personalizado con relleno - ESCALADO A 32×32 */}
        <svg
          className="w-8 h-8 text-gray-600"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.5-0.24,0.96-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}>
          <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-300 rounded-md shadow-lg z-50">
            {/* Sección IDIOMA */}
            <div className="py-3">
              {/* Encabezado de sección en mayúsculas */}
              <div className="px-4 py-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  IDIOMA
                </h3>
              </div>
              
              {/* Opciones de idioma */}
              <div className="py-1">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code as Locale)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 transition-colors ${
                      selectedLang === language.code ? 'bg-cyan-50 text-cyan-700' : 'text-gray-600'
                    }`}
                  >
                    <span className="text-lg">{language.flag}</span>
                    <span className="font-medium">{language.name}</span>
                    {selectedLang === language.code && (
                      <svg className="w-4 h-4 ml-auto text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Separador visual */}
            <div className="border-t border-gray-200 mx-4"></div>

            {/* Footer con Dark Mode Toggle - TEMPORALMENTE OCULTO */}
            {/* <div className="py-3 px-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-600">Tema</span>
                <button
                  onClick={handleThemeToggle}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  } focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-1`}
                  title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                >
                  {isDarkMode ? (
                    // Icono de luna (modo oscuro activo)
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  ) : (
                    // Icono de sol (modo claro activo)
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </>
  )
}
