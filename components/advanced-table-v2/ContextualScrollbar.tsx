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
  const scrollbarTrackWidth = containerWidth - thumbWidth // Ancho disponible para el track
  
  // Calcular la posición del thumb - debe poder llegar hasta el borde derecho
  const thumbLeft = scrollableWidth > 0 
    ? (scrollLeft / scrollableWidth) * scrollbarTrackWidth 
    : (containerWidth - thumbWidth) / 2 // Centrar cuando no hay scroll

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
      // Mapear el movimiento del mouse sobre el track disponible
      const newThumbLeft = Math.max(0, Math.min(scrollbarTrackWidth, (dragStartScrollLeft.current / scrollableWidth) * scrollbarTrackWidth + deltaX))
      const newScrollLeft = (newThumbLeft / scrollbarTrackWidth) * scrollableWidth
      
      const clampedScrollLeft = Math.max(0, Math.min(scrollableWidth, newScrollLeft))
      
      onScrollChange(clampedScrollLeft)
    }

    const handleMouseUp = () => {
      isDragging.current = false
      document.body.style.userSelect = ''
      
      // No cambiar manualmente el estilo del thumb - dejar que CSS maneje todo
      // El cursor volverá automáticamente a 'grab' cuando se suelte el botón

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
    
    // Calcular la posición del click relativa al track disponible
    const clickRatio = Math.max(0, Math.min(1, clickX / containerWidth))
    const targetScrollLeft = clickRatio * scrollableWidth

    const clampedScrollLeft = Math.max(0, Math.min(scrollableWidth, targetScrollLeft))
    
    onScrollChange(clampedScrollLeft)
  }, [scrollableWidth, containerWidth, onScrollChange])

  // Si no hay overflow o no es visible, no renderizar
  if (!hasHorizontalOverflow || !isVisible) {
    return null
  }

  const scrollbarStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${tableLeft}px`, // Alinear perfectamente con el contenedor
    top: `${lastVisibleRowBottom + 12}px`, // Posicionar debajo de la tabla con 12px de separación
    width: `${containerWidth}px`, // EXACTAMENTE el mismo ancho que el contenedor
    height: '8px', // Scrollbar más delgada estilo Google
    background: 'transparent', // Fondo transparente
    borderRadius: '4px', // Bordes más suaves
    zIndex: 10,
    cursor: 'pointer',
    opacity: isVisible ? 1 : 0,
    transform: 'translateZ(0)',
    willChange: 'top, opacity'
  }

  // Calcular dimensiones para centrado perfecto
  const scrollbarHeight = 8
  const thumbHeight = 6
  const thumbTop = (scrollbarHeight - thumbHeight) / 2 // 1px para centrar verticalmente

  const thumbStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${thumbLeft}px`,
    top: `${thumbTop}px`, // Centrado verticalmente: (8px - 6px) / 2 = 1px
    width: `${thumbWidth}px`,
    height: `${thumbHeight}px`,
    background: '#9AA0A6', // Color fijo, sin cambios basados en isDragging
    borderRadius: '3px', // Bordes redondeados estilo Google
    cursor: 'grab', // Cursor fijo, sin cambios basados en isDragging
    transform: 'translateZ(0)',
    willChange: 'left, background-color',
    opacity: 0.8, // Semi-transparente por defecto
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
          will-change: top, opacity;
          background: rgba(0, 0, 0, 0.1); /* Track sutil estilo Google */
        }
        
        .contextual-scrollbar:hover {
          background: rgba(0, 0, 0, 0.15); /* Track más visible en hover */
        }
        
        .contextual-scrollbar-thumb {
          will-change: background-color, opacity;
          border-radius: 3px; /* Bordes redondeados estilo Google */
          cursor: grab; /* Cursor fijo: siempre grab */
          opacity: 0.8; /* Semi-transparente por defecto */
        }
        
        .contextual-scrollbar-thumb:hover {
          background: #5F6368 !important; /* Color más oscuro en hover */
          opacity: 1; /* Completamente visible en hover */
          cursor: grab; /* Mantener grab en hover */
        }
        
        .contextual-scrollbar-thumb:active {
          background: #5F6368 !important; /* Color oscuro cuando está activo */
          cursor: grabbing; /* Solo grabbing mientras está activo (pulsado) */
          opacity: 1; /* Completamente visible cuando está activo */
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
