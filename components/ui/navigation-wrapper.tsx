"use client"

import React, { Suspense } from "react"
import { UnifiedLoading } from "./unified-loading"

interface NavigationWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

/**
 * NavigationWrapper - Wrapper para componentes que usan hooks de navegación de Next.js
 * 
 * Evita warnings de despliegue como:
 * - "useSearchParams() should be wrapped in a suspense boundary"
 * - "usePathname() should be wrapped in a suspense boundary"
 * 
 * Uso:
 * <NavigationWrapper>
 *   <ComponentThatUsesNavigationHooks />
 * </NavigationWrapper>
 */
export function NavigationWrapper({ 
  children, 
  fallback = <UnifiedLoading /> 
}: NavigationWrapperProps) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  )
}
