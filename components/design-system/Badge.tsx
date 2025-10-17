/**
 * 🏷️ Badge Component
 * Badge colorido reutilizable para identificar secciones
 */

import { colors, type BadgeVariant } from '@/lib/design-system/tokens'

interface BadgeProps {
  variant: BadgeVariant
}

export function Badge({ variant }: BadgeProps) {
  const badgeColors = colors.badge[variant]
  
  return (
    <span 
      className="inline-block w-4 h-5 py-1 text-xs font-medium rounded-md border"
      style={{
        backgroundColor: badgeColors.bg,
        borderColor: badgeColors.border,
        color: badgeColors.text
      }}
      aria-hidden="true"
    />
  )
}

