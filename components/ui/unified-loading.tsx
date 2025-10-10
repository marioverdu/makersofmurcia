import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface UnifiedLoadingProps {
  size?: number;
  className?: string;
  color?: string;
}

/**
 * Componente de loading unificado para todo el sistema
 * - Tamaño estándar: 32px (Material Design)
 * - Color accent: #3D5B6A (color accent del sistema)
 * - Sin texto, solo spinner
 * - Consistente en toda la aplicación
 * - Diseño Material Design (CircularProgress)
 */
export const UnifiedLoading: React.FC<UnifiedLoadingProps> = ({
  size = 32,
  className = "",
  color = "#3D5B6A"
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <CircularProgress 
        size={size} 
        sx={{ color }} 
      />
    </div>
  );
};

export default UnifiedLoading;
