/**
 * Sistema de Loading Centralizado
 *
 * Este archivo exporta todo lo necesario para el sistema de loading
 * No más imports múltiples ni duplicación de código
 */

// Componente principal de loading
export { default as AutoLoading } from './auto-loading';

// Hook universal para loading
export { default as useUniversalLoading } from '../../hooks/use-universal-loading';

// HOC para envolver componentes con loading
export { default as withLoading } from './with-loading';

// Context global de loading
export { default as LoadingProvider, useLoading } from '../../contexts/loading-context';

// Loading global automático
export { default as GlobalLoading } from './global-loading';

// Componente legacy (para compatibilidad)
export { default as UnifiedLoading } from '../unified-loading';
