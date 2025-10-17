/**
 * ✨ GlassContainer Component
 * Container con efecto glassmorphism reutilizable
 */

import { cn } from '@/lib/design-system/utils'

interface GlassContainerProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function GlassContainer({ 
  children, 
  className = '',
  onClick 
}: GlassContainerProps) {
  return (
    <div 
      className={cn(
        'backdrop-blur-xl bg-white/30 rounded-xl border border-primary-500/10',
        onClick && 'cursor-pointer hover:bg-white/40 transition-colors',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

