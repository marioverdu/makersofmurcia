"use client"

import React, { useRef, useCallback } from 'react'

interface ContextualScrollbarProps {
  containerRef: React.RefObject<HTMLDivElement | null>
  lastVisibleRowBottom: number
  hasHorizontalOverflow: boolean
  tableWidth: number
  containerWidth: number
  scrollLeft: number
  isVisible: boolean
  tableLeft: number
  onScrollChange: (scrollLeft: number) => void
}

export const ContextualScrollbar: React.FC<ContextualScrollbarProps> = ({
  containerRef,
  lastVisibleRowBottom,
  hasHorizontalOverflow,
  tableWidth,
  containerWidth,
  scrollLeft,
  isVisible,
  tableLeft,
  onScrollChange
}) => {
  const scrollbarRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragStartScrollLeft = useRef(0)

  // Calcular las proporciones de la scrollbar
  const scrollableWidth = Math.max(0, tableWidth - containerWidth)
  const thumbRatio = containerWidth / tableWidth
  const thumbWidth = Math.max(20, Math.min(containerWidth * 0.8, containerWidth * thumbRatio))
  const scrollbarTrackWidth = containerWidth - thumbWidth // Usar containerWidth para el track
  const thumbLeft = scrollableWidth > 0 ? (scrollLeft / scrollableWidth) * scrollbarTrackWidth : 0

  // Manejar el inicio del drag
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!scrollbarRef.current || !thumbRef.current) return
    if (scrollableWidth <= 0) return

    isDragging.current = true
    dragStartX.current = e.clientX
    dragStartScrollLeft.current = scrollLeft

    // Visual feedback
    document.body.style.userSelect = 'none'
    thumbRef.current.style.background = '#a0aec0'

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDragging.current) return

      const deltaX = moveEvent.clientX - dragStartX.current
      // Mapear el movimiento del mouse 1:1 sobre el track visible
      const newThumbLeft = Math.max(0, Math.min(scrollbarTrackWidth, (dragStartScrollLeft.current / scrollableWidth) * scrollbarTrackWidth + deltaX))
      const newScrollLeft = (newThumbLeft / scrollbarTrackWidth) * scrollableWidth
      
      const clampedScrollLeft = Math.max(0, Math.min(scrollableWidth, newScrollLeft))
      
      onScrollChange(clampedScrollLeft)
    }

    const handleMouseUp = () => {
      isDragging.current = false
      document.body.style.userSelect = ''
      
      if (thumbRef.current) {
        thumbRef.current.style.background = '#cbd5e0'
      }

      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: false })
    document.addEventListener('mouseup', handleMouseUp, { passive: false })
  }, [scrollLeft, scrollableWidth, scrollbarTrackWidth, onScrollChange])

  // Manejar click en la track de la scrollbar
  const handleTrackClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!scrollbarRef.current || isDragging.current) return

    const rect = scrollbarRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    // Centrar el thumb en el punto clicado y mapear a scrollLeft
    const targetScrollRatio = Math.max(0, Math.min(1, (clickX - thumbWidth / 2) / scrollbarTrackWidth))
    const targetScrollLeft = targetScrollRatio * scrollableWidth

    const clampedScrollLeft = Math.max(0, Math.min(scrollableWidth, targetScrollLeft))
    
    onScrollChange(clampedScrollLeft)
  }, [scrollableWidth, thumbWidth, scrollbarTrackWidth, onScrollChange])

  // Si no hay overflow o no es visible, no renderizar
  if (!hasHorizontalOverflow || !isVisible) {
    return null
  }

  const scrollbarStyle: React.CSSProperties = {
    position: 'absolute',
    // Posicionar alineado con el área visible de la tabla (compensar scrollLeft)
    left: `${Math.max(0, tableLeft - scrollLeft)}px`,
    top: `${lastVisibleRowBottom}px`,
    width: `${containerWidth}px`, // Ancho del contenedor visible, no de la tabla completa
    height: '16px',
    background: 'rgba(241, 245, 249, 0.9)',
    border: '1px solid rgba(203, 213, 224, 0.3)',
    borderRadius: '8px',
    zIndex: 10,
    cursor: 'pointer',
    transition: 'top 0.1s ease-out, opacity 0.15s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    opacity: isVisible ? 1 : 0,
    transform: 'translateZ(0)',
    willChange: 'top, opacity'
  }

  const thumbStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${thumbLeft}px`,
    top: '3px',
    width: `${thumbWidth}px`,
    height: '10px',
    background: isDragging.current ? '#3D5B6A' : '#5A7A8A',
    borderRadius: '5px',
    cursor: isDragging.current ? 'grabbing' : 'grab',
    transition: isDragging.current ? 'none' : 'background-color 0.1s ease',
    transform: 'translateZ(0)',
    willChange: 'left, background-color',
    boxShadow: isDragging.current 
      ? '0 2px 6px rgba(0, 0, 0, 0.3)' 
      : '0 1px 3px rgba(0, 0, 0, 0.2)'
  }

  return (
    <div
      ref={scrollbarRef}
      style={scrollbarStyle}
      onClick={handleTrackClick}
      className="contextual-scrollbar"
    >
      <div
        ref={thumbRef}
        style={thumbStyle}
        onMouseDown={handleMouseDown}
        className="contextual-scrollbar-thumb"
      />
      
      {/* Estilos adicionales para hover y estados */}
      <style jsx>{`
        .contextual-scrollbar {
          transition: top 0.1s ease-out, opacity 0.15s ease;
          will-change: top, opacity;
        }
        
        .contextual-scrollbar:hover {
          background: rgba(247, 250, 252, 0.98);
        }
        
        .contextual-scrollbar-thumb {
          transition: background-color 0.1s ease;
          will-change: background-color;
        }
        
        .contextual-scrollbar-thumb:hover {
          background: #4A6B7A !important;
          transform: scale(1.05) translateZ(0);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }
        
        .contextual-scrollbar-thumb:active {
          background: #3D5B6A !important;
          cursor: grabbing;
          transform: scale(0.98) translateZ(0);
        }

        .contextual-scrollbar {
          animation: quickFadeIn 0.2s ease-out;
        }

        @keyframes quickFadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .contextual-scrollbar,
        .contextual-scrollbar-thumb {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000;
        }
      `}</style>
    </div>
  )
}

export default ContextualScrollbar
