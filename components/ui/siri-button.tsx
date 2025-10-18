"use client"

import React from 'react'

export interface SiriButtonProps {
  /**
   * Si el botón está en estado activo (escuchando)
   */
  isActive?: boolean
  
  /**
   * Callback cuando se presiona el botón
   */
  onMouseDown?: () => void
  
  /**
   * Callback cuando se suelta el botón
   */
  onMouseUp?: () => void
  
  /**
   * Callback cuando el mouse sale del botón
   */
  onMouseLeave?: () => void
  
  /**
   * Callback para touch start (móviles)
   */
  onTouchStart?: () => void
  
  /**
   * Callback para touch end (móviles)
   */
  onTouchEnd?: () => void
  
  /**
   * Clases CSS adicionales
   */
  className?: string
  
  /**
   * Estilos inline adicionales
   */
  style?: React.CSSProperties
}

export function SiriButton({
  isActive = false,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  onTouchStart,
  onTouchEnd,
  className = '',
  style: customStyle,
}: SiriButtonProps) {
  return (
    <button
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className={`
        relative w-9 h-9 rounded-full
        transition-all duration-300 ease-out
        ${isActive ? 'scale-110' : 'scale-100'}
        ${className}
      `}
      style={{
        background: isActive 
          ? 'radial-gradient(circle at center, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%)'
          : 'radial-gradient(circle at center, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%)',
        boxShadow: isActive
          ? `0 0 40px rgba(139, 92, 246, 0.6), 0 0 80px rgba(236, 72, 153, 0.4), inset 0 0 20px rgba(139, 92, 246, 0.3)`
          : '0 0 20px rgba(139, 92, 246, 0.3), inset 0 0 10px rgba(139, 92, 246, 0.2)',
        border: '2px solid rgba(139, 92, 246, 0.5)',
        ...customStyle,
      }}
      aria-label="Activar Siri"
    >
      {/* Icono del micrófono */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
        >
          <defs>
            <linearGradient id="micGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
          
          {/* Cápsula del mic */}
          <rect
            x="9"
            y="3"
            width="6"
            height="11"
            rx="3"
            fill="url(#micGrad)"
            opacity={isActive ? "1" : "0.8"}
          />
          
          {/* Arco inferior */}
          <path
            d="M6 11C6 14.314 8.686 17 12 17C15.314 17 18 14.314 18 11"
            stroke="url(#micGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity={isActive ? "1" : "0.8"}
          />
          
          {/* Línea vertical */}
          <line
            x1="12"
            y1="17"
            x2="12"
            y2="21"
            stroke="url(#micGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity={isActive ? "1" : "0.8"}
          />
          
          {/* Base */}
          <line
            x1="9"
            y1="21"
            x2="15"
            y2="21"
            stroke="url(#micGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity={isActive ? "1" : "0.8"}
          />
        </svg>
      </div>

      {/* Anillos pulsantes cuando está activo */}
      {isActive && (
        <>
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              background: 'transparent',
              border: '2px solid rgba(139, 92, 246, 0.5)',
              animationDuration: '1.5s',
            }}
          />
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              background: 'transparent',
              border: '2px solid rgba(236, 72, 153, 0.5)',
              animationDuration: '2s',
              animationDelay: '0.3s',
            }}
          />
        </>
      )}
    </button>
  )
}

