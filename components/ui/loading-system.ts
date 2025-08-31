/**
 * Sistema de Loading Centralizado
 * 
 * Este archivo exporta todo lo necesario para el sistema de loading
 * No más imports múltiples ni duplicación de código
 */

// Componente principal de loading
export { default as AutoLoading } from './auto-loading'

// Hook universal para loading
export { default as useUniversalLoading } from '../../hooks/use-universal-loading'

// HOC para envolver componentes con loading
export { default as withLoading } from './with-loading'

// Context global de loading
export { default as LoadingProvider, useLoading } from '../../contexts/loading-context'

// Loading global automático
export { default as GlobalLoading } from './global-loading'

// Componente legacy (para compatibilidad)
export { default as UnifiedLoading } from './unified-loading'

/**
 * USO SIMPLE:
 * 
 * 1. Para loading automático:
 *    <AutoLoading promise={fetchData} />
 * 
 * 2. Para loading manual:
 *    <AutoLoading isLoading={isLoading} />
 * 
 * 3. Para loading inline:
 *    <AutoLoading isLoading={isLoading} type="inline" />
 * 
 * 4. Para loading fullscreen:
 *    <AutoLoading isLoading={isLoading} type="fullscreen" />
 * 
 * 5. Con hook:
 *    const { LoadingSpinner, startLoading, stopLoading } = useUniversalLoading()
 * 
 * 6. Con HOC:
 *    const ComponentWithLoading = withLoading(MyComponent)
 *    <ComponentWithLoading isLoading={isLoading} />
 */



