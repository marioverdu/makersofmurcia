import React from 'react';
import { UnifiedLoading } from '@/components/ui/unified-loading';

/**
 * Componente de loading a nivel root para admin
 * Usa el sistema unificado de loading
 */
export const AdminRootLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <UnifiedLoading />
    </div>
  );
};

export default AdminRootLoading;
