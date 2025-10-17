/**
 * 📦 Section Component
 * Container reutilizable para todas las secciones de la página
 */

import { spacing } from '@/lib/design-system/tokens'
import { cn } from '@/lib/design-system/utils'

interface SectionProps {
  children: React.ReactNode
  maxWidth?: keyof typeof spacing
  padding?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Section({ 
  children, 
  maxWidth = 'contentMaxWidth',
  padding = 'lg',
  className = '' 
}: SectionProps) {
  const paddingMap = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
  }
  
  return (
    <div className="flex justify-center items-center w-full relative">
      <div 
        className={cn(
          'flex flex-col items-start relative z-10',
          'px-4 md:px-[60px]',
          'w-full',
          paddingMap[padding],
          className
        )}
        style={{ maxWidth: spacing[maxWidth] }}
      >
        {children}
      </div>
    </div>
  )
}

