/**
 * 🎨 Design System Tokens
 * Sistema unificado de espaciado, colores, tipografía y breakpoints
 */

// ============================================
// 📐 SPACING SCALE
// ============================================
export const spacing = {
  // Base scale (múltiplos de 4) - alineado con Tailwind
  0: '0px',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  3.5: '14px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',
  12: '48px',
  13: '52px',
  14: '56px',
  15: '60px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
  40: '160px',
  48: '192px',
  56: '224px',
  64: '256px',
  
  // Semantic tokens (valores específicos del proyecto)
  avatarSize: '28px',
  avatarHeroSize: '80px',
  headerHeight: '40px',
  sectionPadding: '64px',
  contentMaxWidth: '1092px',
  columnMaxWidth: '576px',
  
  // Posts page specific
  profileCardHeight: '204px',
  profileCardOffset: '120px',
  profileCardWidth: '300px',
  postsContainerTop: '140px',
  postsContainerBottom: '72px',
  postsMaxWidth: '1000px',
  postCardsMaxWidth: '800px',
  toastMaxWidth: '350px',
} as const

export type Spacing = keyof typeof spacing

// ============================================
// 📱 BREAKPOINTS
// ============================================
export const breakpoints = {
  xs: 0,      // Mobile small
  sm: 480,    // Mobile
  md: 768,    // Tablet
  lg: 1024,   // Desktop
  xl: 1280,   // Desktop large
  '2xl': 1536 // Desktop XL
} as const

export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs}px)`,
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  '2xl': `@media (min-width: ${breakpoints['2xl']}px)`,
} as const

// Responsive padding system para headers y secciones
export const responsivePadding = {
  xs: spacing[3],   // 12px
  sm: spacing[8],   // 32px
  md: spacing[8],   // 32px
  lg: spacing[8],   // 32px
  xl: spacing[8],   // 32px
  '2xl': spacing[8] // 32px
} as const

// ============================================
// 🎨 COLORS
// ============================================
export const colors = {
  // Primary palette
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    500: '#005eb6',  // Brand color
    900: '#0c4a6e',
  },
  
  // Background colors
  background: {
    primary: '#F7F8FC',         // bg principal app
    secondary: '#FFFFFF',       // cards, modals
    tertiary: '#F9FAFB',        // alternativos
    transparent: 'transparent', // headers
  },
  
  // Border colors
  border: {
    default: '#E5E7EB',                     // gray-100
    light: '#F3F4F6',                       // gray-50
    primary: 'rgba(0, 94, 182, 0.1)',      // glassmorphism
    accent: '#3D5B6A',                     // hover outline
    gray300: '#D1D5DB',                    // underline decoration
  },
  
  // Semantic colors (success, warning, error, info)
  semantic: {
    success: '#10B981',     // green-500
    warning: '#F59E0B',     // amber-500 / amber-600
    error: '#EF4444',       // red-500
    info: '#3B82F6',        // blue-500
  },
  
  // State colors
  state: {
    disabled: '#9CA3AF',    // gray-400
    hover: '#F3F4F6',       // gray-50
    active: '#E5E7EB',      // gray-100
  },
  
  // Text colors (completo)
  text: {
    primary: 'hsl(206, 1%, 27%)',     // #444546 - títulos
    secondary: '#6C727F',              // descripciones
    muted: '#9CA3AF',                  // gray-400
    white: '#FFFFFF',                  // cards concept/portfolio
    gray400: '#9CA3AF',                // timeline, estados
    gray500: '#6B7280',                // subtitles, dates
    gray600: '#4B5563',                // excerpts
    gray800: '#1F2937',                // titles (maintenance)
    blue500: '#3B82F6',                // development mode
    amber600: '#D97706',               // error messages
    yellow500: '#EAB308',              // trophy icon
    red600: '#DC2626',                 // error text
    red700: '#B91C1C',                 // error title
    orange500: '#F97316',              // warning/pending
  },
  
  // Surface colors (glassmorphism)
  surface: {
    glass: 'rgba(255, 255, 255, 0.3)',
    glassHover: 'rgba(255, 255, 255, 0.4)',
    overlay: 'rgba(255, 255, 255, 0.7)',
    contact: 'rgba(242, 248, 255, 0.7)',
  },
  
  // Card overlay colors (posts)
  card: {
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.9)',
    textMuted: 'rgba(255, 255, 255, 0.8)',
    overlayGradient: 'linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent, transparent)',
  },
  
  // Toast colors
  toast: {
    bg: 'rgba(30, 30, 30, 0.9)',
    border: 'rgba(255, 255, 255, 0.2)',
    iconBg: 'rgba(234, 179, 8, 0.2)',  // yellow-500/20
  },
  
  // Badge colors por tipo
  badge: {
    teal: { 
      bg: '#E4F6F5', 
      border: '#c5e0df',
      text: 'hsl(206, 1%, 27%)'
    },
    purple: { 
      bg: '#eff0ff', 
      border: '#D8D9F2',
      text: 'hsl(206, 1%, 27%)'
    },
    orange: { 
      bg: '#ffebdc', 
      border: '#F2E4D8',
      text: 'hsl(206, 1%, 27%)'
    },
  },
  
  // Gray palette (Tailwind completo)
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  // Red palette (Tailwind completo)
  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',    // semantic.error
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },
  
  // Green palette (success states)
  green: {
    500: '#10B981',    // semantic.success
    600: '#047857',    // hover state
  },
} as const

export type BadgeVariant = keyof typeof colors.badge

// ============================================
// 📝 TYPOGRAPHY
// ============================================
export const typography = {
  // Font families
  fontFamily: {
    primary: 'Arial, sans-serif',
    medium: 'Arial Medium, Arial, sans-serif',  // Usado en post titles
    secondary: 'system-ui, -apple-system, sans-serif',
    mono: 'Monaco, Courier New, monospace',
  },
  
  // Font sizes (valores del proyecto + Tailwind alignment)
  fontSize: {
    xs: '12px',       // text-xs
    sm: '14px',       // text-sm (Tailwind default)
    smCustom: '15.2px', // Valor específico usado en descripciones
    base: '16px',     // text-base
    lg: '18px',       // text-lg
    xl: '20px',       // text-xl
    '2xl': '24px',    // text-2xl
    '3xl': '30px',    // text-3xl
    '4xl': '36px',    // text-4xl
    '5xl': '48px',    // text-5xl
  },
  
  // Font weights
  fontWeight: {
    thin: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  
  // Line heights (alineado con Tailwind)
  lineHeight: {
    none: 1,
    tight: 1.25,      // Tailwind default (ajustado desde 1.2)
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  
  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  
  // Responsive heading scales (del proyecto actual)
  heading: {
    h1: {
      mobile: '24px',   // text-[24px]
      tablet: '32px',   // md:text-[32px]
      desktop: '44px',  // xl:text-[44px]
    },
    h2: {
      mobile: '20px',   // text-[20px]
      tablet: '28px',   // md:text-[28px]
      desktop: '28px',  // xl:text-[28px] (igual que tablet)
    },
    tagline: {
      mobile: '16px',   // text-[16px]
      tablet: '20px',   // md:text-[20px]
      desktop: '24px',  // xl:text-[24px]
    },
  },
} as const

// ============================================
// 🔧 EFFECTS
// ============================================
export const effects = {
  // Border radius
  borderRadius: {
    none: '0px',
    sm: '4px',
    base: '8px',           // rounded-lg (0.5rem)
    md: '10px',            // Profile card
    lg: '12px',            // rounded-xl (0.75rem) - glassmorphism
    xl: '16px',
    '2xl': '20px',
    '3xl': '24px',
    full: '9999px',        // rounded-full
  },
  
  // Shadows (Tailwind alignment)
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },
  
  // Opacity
  opacity: {
    0: 0,
    5: 0.05,
    10: 0.1,
    20: 0.2,
    25: 0.25,
    30: 0.3,
    40: 0.4,
    50: 0.5,
    60: 0.6,
    70: 0.7,
    75: 0.75,
    80: 0.8,
    90: 0.9,
    95: 0.95,
    100: 1,
    // Semantic
    disabled: 0.5,
    hover: 0.8,
  },
  
  // Glassmorphism preset
  glassmorphism: {
    backdrop: 'blur(12px)',
    background: colors.surface.glass,
    border: '1px solid rgba(0, 94, 182, 0.1)',
    borderRadius: '12px',
  },
  
  // Transitions
  transition: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '800ms',
  },
  
  // Easing functions
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',           // ease-in
    out: 'cubic-bezier(0, 0, 0.2, 1)',          // ease-out
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',      // ease-in-out
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',    // default easing
  },
  
  // Z-Index (completo)
  zIndex: {
    0: 0,
    10: 10,           // Profile card
    20: 20,
    30: 30,
    40: 40,
    50: 50,           // Toast
    header: 1000,     // Header
    modal: 1100,      // Modal
    tooltip: 1200,    // Tooltip
  },
  
  // Outline
  outline: {
    width: {
      0: '0px',
      1: '1px',
      2: '2px',       // hover:outline-2
      4: '4px',
      8: '8px',
    },
    offset: {
      0: '0px',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px',       // hover:outline-offset-8
    },
    color: {
      accent: '#3D5B6A',  // Post card hover
    },
  },
  
  // Gradients
  gradients: {
    cardOverlay: 'linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent, transparent)',
  },
  
  // Blur
  blur: {
    none: '0',
    sm: '4px',
    base: '8px',
    md: '12px',         // backdrop-blur-md
    lg: '16px',
    xl: '24px',
    '2xl': '40px',
    '3xl': '64px',
  },
} as const

// ============================================
// 📦 COMPONENT SIZES
// ============================================
export const componentSizes = {
  avatar: {
    header: spacing.avatarSize,      // 28px
    hero: spacing.avatarHeroSize,    // 80px
  },
  
  badge: {
    width: '16px',
    height: '20px',
  },
  
  header: {
    height: spacing.headerHeight,    // 40px
    marginTop: spacing[4],            // 16px
  },
  
  // Icon sizes (completo con Tailwind alignment)
  icon: {
    xs: '12px',        // w-3 h-3
    sm: '16px',        // w-4 h-4 - alternativo
    md: '20px',        // w-5 h-5 - contenido (Trophy)
    lg: '24px',        // w-6 h-6 - estándar
    xl: '32px',        // w-8 h-8
    '2xl': '40px',     // w-10 h-10
  },
} as const

// ============================================
// 📐 LAYOUT
// ============================================
export const layout = {
  // Aspect ratios
  aspectRatio: {
    concept: '3/4',
    portfolio: '16/9',
    standard: '1/1',
  },
  
  // Max widths por contexto
  maxWidth: {
    content: spacing.contentMaxWidth,      // 1092px (root page)
    posts: spacing.postsMaxWidth,          // 1000px (posts container)
    postCards: spacing.postCardsMaxWidth,  // 800px (cards container)
  },
} as const

// ============================================
// 🌐 ASSETS URLs
// ============================================
export const assets = {
  bg: {
    root: 'https://assets.marioverdu.com/bg/root-site.min.png',
    landing: 'https://assets.marioverdu.com/bg/landing-bg.png',
    workExperience: 'https://assets.marioverdu.com/bg/work-experience-bg.min.png',
  },
  avatar: 'https://assets.marioverdu.com/avatar/avatar-2.webp',
  icons: {
    goTo: 'https://assets.marioverdu.com/icon/go-to.svg',
  },
  media: {
    section1: 'https://assets.marioverdu.com/landing/section-2.webm',
    section3: 'https://assets.marioverdu.com/webm/button-deploy.mov',
  },
} as const

