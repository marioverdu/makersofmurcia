"use client";
import React from 'react';

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
  const borderWidth = Math.max(2, Math.round(size / 12));
  const spinnerStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderWidth,
    borderStyle: 'solid',
    borderColor: `${color}33`, // 20% opacity track
    borderTopColor: color,
    borderRadius: '50%',
    animation: 'mum-spin 0.8s linear infinite'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <span style={spinnerStyle} aria-label="Cargando" />
      <style jsx>{`
        @keyframes mum-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default UnifiedLoading;
