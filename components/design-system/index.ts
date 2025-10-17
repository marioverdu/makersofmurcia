/**
 * 🎨 Design System - Index
 * Exportación centralizada de todos los componentes y utilidades
 */

// Components
export { Section } from './Section'
export { GlassContainer } from './GlassContainer'
export { Badge } from './Badge'
export { ZigZagSection } from './ZigZagSection'
export { ContactCard } from './ContactCard'

// Tokens
export {
  spacing,
  breakpoints,
  mediaQueries,
  responsivePadding,
  colors,
  typography,
  effects,
  componentSizes,
  assets,
  type Spacing,
  type BadgeVariant,
} from '@/lib/design-system/tokens'

// Utils
export { 
  cn,
  responsiveTextAlign,
  responsiveItemsAlign,
  responsiveSelfAlign,
} from '@/lib/design-system/utils'

