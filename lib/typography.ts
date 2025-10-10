// Sistema de tipografía estandarizado basado en el análisis del proyecto

export const typography = {
  // Títulos Principales
  xxl: {
    bold: "text-4xl font-bold text-[#3D5B6A]",
    semibold: "text-4xl font-semibold text-[#3D5B6A]",
  },

  // Subtítulos
  xl: {
    bold: "text-3xl font-bold text-[#3D5B6A]",
    semibold: "text-3xl font-semibold text-[#3D5B6A]",
    medium: "text-3xl font-medium text-[#3D5B6A]",
  },

  // Títulos de Sección
  l: {
    bold: "text-2xl font-bold text-[#3D5B6A]",
    semibold: "text-2xl font-semibold text-[#3D5B6A]",
    medium: "text-2xl font-medium text-[#3D5B6A]",
  },

  // Texto Principal
  m: {
    bold: "text-xl font-bold text-[hsl(var(--color-text))]",
    semibold: "text-xl font-semibold text-[hsl(var(--color-text))]",
    medium: "text-xl font-medium text-[hsl(var(--color-text))]",
    regular: "text-xl font-normal text-[hsl(var(--color-text))]",
  },

  // Texto Secundario
  s: {
    bold: "text-base font-bold text-[hsl(var(--color-text))]",
    semibold: "text-base font-semibold text-[hsl(var(--color-text))]",
    medium: "text-base font-medium text-[hsl(var(--color-text))]",
    regular: "text-base font-normal text-[hsl(var(--color-text))]",
  },

  // Texto Auxiliar
  xs: {
    medium: "text-sm font-medium text-gray-500",
    regular: "text-sm font-normal text-gray-500",
    mediumGray: "text-sm font-medium text-[#666]",
    regularGrayLeading: "text-sm text-[#666] leading-[1.5]",
  },

  // Texto Micro
  xxs: {
    regular: "text-xs text-gray-500",
    medium: "text-xs font-medium text-gray-600",
  },

  // Estilos Especiales
  special: {
    monospace: "font-mono text-base",
    italic: "italic text-base",
    uppercase: "uppercase text-sm font-semibold tracking-wider",
    asciiArt:
      "font-mono text-xs sm:text-sm md:text-base bg-black text-green-400 p-4 rounded-md leading-tight whitespace-pre",
    lineClamp2: "line-clamp-2 text-base leading-[1.5] text-[#666]",
    tabularNums: "tabular-nums text-6xl font-bold",
  },

  // Componentes UI
  ui: {
    navLink: "text-sm font-medium whitespace-nowrap transition-colors text-[hsl(206,1%,27%)] hover:text-[#3D5B6A]",
    navLinkActive: "text-sm font-medium whitespace-nowrap transition-colors text-[#3D5B6A] border-b-2 border-[#3D5B6A]",
    chatButton: "text-sm font-medium text-[#518b0d]",
    screenReaderOnly: "sr-only",
  },
}

// Función de utilidad para combinar estilos tipográficos
export function combineTypography(...styles: string[]): string {
  return styles.join(" ")
}

// Función para obtener un estilo tipográfico con variaciones responsivas
export function responsiveTypography(
  baseStyle: string,
  options: { sm?: string; md?: string; lg?: string; xl?: string; "2xl"?: string },
) {
  let result = baseStyle

  if (options.sm) result += ` sm:${options.sm}`
  if (options.md) result += ` md:${options.md}`
  if (options.lg) result += ` lg:${options.lg}`
  if (options.xl) result += ` xl:${options.xl}`
  if (options["2xl"]) result += ` 2xl:${options["2xl"]}`

  return result
}
