/**
 * 📧 ContactCard Component
 * Tarjeta de contacto con efecto glass y call-to-action
 */

import { colors, assets } from '@/lib/design-system/tokens'
import { cn } from '@/lib/design-system/utils'

interface ContactCardProps {
  title: string
  onClick: () => void
  className?: string
}

export function ContactCard({ 
  title, 
  onClick,
  className = '' 
}: ContactCardProps) {
  return (
    <div 
      className={cn(
        'flex justify-between items-center relative',
        'py-6 px-6',
        'rounded-xl backdrop-blur-md',
        'border border-white/40',
        'w-full cursor-pointer',
        'hover:bg-white/50 transition-colors',
        className
      )}
      style={{ backgroundColor: colors.surface.contact }}
      onClick={onClick}
    >
      <h2 
        className="text-xl font-medium"
        style={{ color: colors.text.primary }}
      >
        {title}
      </h2>
      
      <button 
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
        className="flex items-center justify-center bg-transparent border-none cursor-pointer p-0 hover:opacity-80 transition-opacity" 
        aria-label={title}
      >
        <img 
          src={assets.icons.goTo} 
          alt="Go to icon" 
          width="16" 
          height="16" 
        />
      </button>
    </div>
  )
}

