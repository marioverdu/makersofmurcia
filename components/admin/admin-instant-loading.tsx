"use client"

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { UnifiedLoading } from '@/components/ui/unified-loading';

/**
 * Componente de loading instantáneo para rutas admin
 * Solo se muestra en rutas admin, no en toda la aplicación
 */
export const AdminInstantLoading: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // Solo mostrar loading en rutas admin
    const isAdminRoute = pathname?.startsWith('/admin');
    
    if (isAdminRoute) {
      setShowLoading(true);
      
      // Ocultar loading después de un breve delay para permitir que se cargue la página
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Solo mostrar loading en rutas admin y durante la inicialización
  if (pathname?.startsWith('/admin') && showLoading) {
    return (
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-white bg-opacity-90">
        <UnifiedLoading />
      </div>
    );
  }

  // En rutas no-admin o después de la inicialización, mostrar children
  return <>{children}</>;
};

export default AdminInstantLoading;
