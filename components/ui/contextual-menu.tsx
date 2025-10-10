import React, { forwardRef } from 'react'
import { useContextualMenuTranslations } from '@/hooks/use-contextual-menu-translations'

interface ContextualMenuProps {
  onDownloadPDF: () => void
  className?: string
  lang?: string
}

export const ContextualMenu = forwardRef<HTMLDivElement, ContextualMenuProps>(
  ({ onDownloadPDF, className = "", lang }, ref) => {
    const t = useContextualMenuTranslations(lang)

    console.log('🌍 [ContextualMenu] Language detection:', {
      lang,
      downloadPDF: t.downloadPDF,
      translations: t
    })
    
    return (
      <div
        ref={ref}
        className={`w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fadeIn ${className}`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div className="flex justify-center sm:justify-start py-1" role="none">
          <button
            className="text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center rounded-md transition-colors whitespace-nowrap"
            role="menuitem"
            onClick={onDownloadPDF}
          >
            {t.downloadPDF}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              height="20" 
              viewBox="0 -960 960 960" 
              width="20" 
              fill="#3D5B6A" 
              className="ml-2" 
              aria-hidden="true"
            >
              <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"></path>
            </svg>
          </button>
        </div>
      </div>
    )
  }
)

ContextualMenu.displayName = 'ContextualMenu'
