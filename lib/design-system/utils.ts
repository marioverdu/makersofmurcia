/**
 * 🔧 Design System Utilities
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility para combinar classNames con Tailwind
 * Combina clsx + tailwind-merge para resolver conflictos de clases
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Genera clases responsive para text-align
 * Elimina redundancias como "text-center md:text-center"
 */
export function responsiveTextAlign(
  mobile: 'left' | 'center' | 'right',
  desktop?: 'left' | 'center' | 'right'
) {
  if (!desktop || mobile === desktop) {
    return `text-${mobile}`
  }
  return `text-${mobile} lg:text-${desktop}`
}

/**
 * Genera clases responsive para items-align
 * Elimina redundancias como "items-center md:items-center"
 */
export function responsiveItemsAlign(
  mobile: 'start' | 'center' | 'end',
  desktop?: 'start' | 'center' | 'end'
) {
  if (!desktop || mobile === desktop) {
    return `items-${mobile}`
  }
  return `items-${mobile} lg:items-${desktop}`
}

/**
 * Genera clases responsive para self-align
 */
export function responsiveSelfAlign(
  mobile: 'start' | 'center' | 'end',
  desktop?: 'start' | 'center' | 'end'
) {
  if (!desktop || mobile === desktop) {
    return `self-${mobile}`
  }
  return `self-${mobile} lg:self-${desktop}`
}

