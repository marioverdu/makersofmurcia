"use client"

import React from 'react';
import { UnifiedLoading } from '@/components/ui/unified-loading';

/**
 * Componente de loading de layout para admin
 * Usa el sistema unificado de loading
 */
export const AdminLayoutWrapper: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <UnifiedLoading />
    </div>
  );
};

export default AdminLayoutWrapper;
