import React, { forwardRef } from 'react'
import { UnifiedLoading } from '@/components/ui/unified-loading'

interface ContextualMenuLoadingProps {
  onDownloadPDF: () => void
  className?: string
}

export const ContextualMenuLoading = forwardRef<HTMLDivElement, ContextualMenuLoadingProps>(
  ({ onDownloadPDF, className = "" }, ref) => {
    console.log('🔄 [ContextualMenuLoading] Loading state activated')
    
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
            <UnifiedLoading size={20} />
          </button>
        </div>
      </div>
    )
  }
)

ContextualMenuLoading.displayName = 'ContextualMenuLoading'

