/**
 * 🔀 ZigZagSection Component
 * Layout alternado de texto e imagen para secciones de contenido
 */

import { Badge } from './Badge'
import { colors, type BadgeVariant } from '@/lib/design-system/tokens'
import { cn } from '@/lib/design-system/utils'

interface ZigZagSectionProps {
  badge: BadgeVariant
  title: string
  description: string
  media: React.ReactNode
  textPosition: 'left' | 'right'
  gap?: 'sm' | 'md' | 'lg'
}

export function ZigZagSection({
  badge,
  title,
  description,
  media,
  textPosition,
  gap = 'lg'
}: ZigZagSectionProps) {
  const isTextLeft = textPosition === 'left'
  
  const gapMap = {
    sm: 'gap-4 md:gap-16 xl:gap-16',
    md: 'gap-6 md:gap-20 xl:gap-20',
    lg: 'gap-4 md:gap-20 xl:gap-20',
  }
  
  return (
    <div className={cn(
      'grid grid-cols-1 md:grid-cols-2 items-center w-full',
      gapMap[gap]
    )}>
      {/* Text content */}
      <div className={cn(
        'flex flex-col gap-2 md:gap-3 xl:gap-4',
        isTextLeft ? 'order-1 md:order-1' : 'order-1 md:order-2'
      )}>
        <Badge variant={badge} />
        
        <h2 
          className="leading-tight text-left text-xl md:text-[28px]"
          style={{ color: colors.text.primary }}
        >
          {title}
        </h2>
        
        <p 
          className="text-left font-normal"
          style={{ 
            color: colors.text.secondary,
            fontSize: '15.2px'  // Valor específico del proyecto
          }}
        >
          {description}
        </p>
      </div>
      
      {/* Media content */}
      <div className={cn(
        'order-2',
        isTextLeft ? 'md:order-2' : 'md:order-1'
      )}>
        {media}
      </div>
    </div>
  )
}

