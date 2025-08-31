"use client"

import { useEffect, useRef, useState, useCallback } from 'react'

interface ContextualScrollbarData {
  lastVisibleRowBottom: number
  hasHorizontalOverflow: boolean
  tableWidth: number
  containerWidth: number
  scrollLeft: number
  isTableVisible: boolean
  tableLeft: number // Nueva propiedad para la posición izquierda de la tabla
}

interface UseContextualScrollbarProps {
  containerRef: React.RefObject<HTMLDivElement | null>
  enabled?: boolean
  ignoreScrollFlag?: React.RefObject<boolean>
}

export const useContextualScrollbar = ({
  containerRef,
  enabled = true,
  ignoreScrollFlag
}: UseContextualScrollbarProps) => {
  const [scrollbarData, setScrollbarData] = useState<ContextualScrollbarData>({
    lastVisibleRowBottom: 0,
    hasHorizontalOverflow: false,
    tableWidth: 0,
    containerWidth: 0,
    scrollLeft: 0,
    isTableVisible: false,
    tableLeft: 0
  })

  const animationFrameId = useRef<number>()
  const lastCalculation = useRef<number>(0)

  // Cálculo optimizado sin throttling excesivo
  const calculateScrollbarPosition = useCallback(() => {
    if (!containerRef.current || !enabled) {
      return
    }

    const container = containerRef.current
    const table = container.querySelector('table')
    
    if (!table) {
      return
    }

    // Verificar si la tabla está visible en viewport usando intersectionObserver sería mejor, pero esto es más simple
    const containerRect = container.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const isTableVisible = containerRect.bottom > 0 && containerRect.top < windowHeight

    if (!isTableVisible) {
      setScrollbarData(prev => ({ ...prev, isTableVisible: false }))
      return
    }

    // Detectar overflow horizontal y posición de la tabla
    const tableRect = table.getBoundingClientRect()
    const tableWidth = table.scrollWidth
    const containerWidth = container.clientWidth
    const hasHorizontalOverflow = tableWidth > containerWidth
    const scrollLeft = container.scrollLeft
    const tableLeft = tableRect.left - containerRect.left // Posición de la tabla relativa al contenedor

    // Encontrar la última fila visible - algoritmo corregido para viewport
    let lastVisibleRowBottom = 0
    const rows = table.querySelectorAll('tbody tr, tr')
    
    // Límites del viewport visible
    const viewportTop = Math.max(0, containerRect.top)
    const viewportBottom = Math.min(windowHeight, containerRect.bottom)
    
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i] as HTMLTableRowElement
      const rowRect = row.getBoundingClientRect()
      
      // Verificar si la fila está visible en el viewport actual
      const isRowVisible = (
        rowRect.bottom > viewportTop && 
        rowRect.top < viewportBottom &&
        rowRect.bottom > containerRect.top &&
        rowRect.top < containerRect.bottom
      )
      
      if (isRowVisible) {
        // Calcular posición relativa al contenedor, pero limitada al viewport
        const relativeToContainer = rowRect.bottom - containerRect.top
        
        // Asegurar que no se salga del viewport visible
        const maxVisibleBottom = Math.min(
          viewportBottom - containerRect.top - 30, // 30px margen para la scrollbar
          containerRect.height - 30
        )
        
        const clampedBottom = Math.min(relativeToContainer, maxVisibleBottom)
        lastVisibleRowBottom = Math.max(lastVisibleRowBottom, clampedBottom)
      }
    }

    // Si no hay filas visibles o está fuera del viewport, posicionar en un lugar visible
    if (lastVisibleRowBottom === 0) {
      const containerVisibleHeight = Math.min(
        containerRect.bottom - Math.max(0, containerRect.top),
        windowHeight - Math.max(0, containerRect.top)
      )
      lastVisibleRowBottom = Math.max(50, containerVisibleHeight - 50)
    }

    // Añadir pequeño margen
    lastVisibleRowBottom += 8

    // Asegurar que siempre esté visible en viewport
    const maxViewportBottom = Math.min(
      windowHeight - containerRect.top - 25,
      containerRect.height - 25
    )
    
    lastVisibleRowBottom = Math.min(
      lastVisibleRowBottom, 
      Math.max(25, maxViewportBottom)
    )

    setScrollbarData({
      lastVisibleRowBottom,
      hasHorizontalOverflow,
      tableWidth,
      containerWidth,
      scrollLeft,
      isTableVisible,
      tableLeft
    })
  }, [containerRef, enabled])

  // Handler del scroll más responsivo
  const handleScroll = useCallback(() => {
    // Para scroll vertical (window) usar RAF para suavidad
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current)
    }
    animationFrameId.current = requestAnimationFrame(calculateScrollbarPosition)
  }, [calculateScrollbarPosition])

  // Handler específico para scroll horizontal (más rápido)
  const handleHorizontalScroll = useCallback(() => {
    // Actualización inmediata para scroll horizontal
    calculateScrollbarPosition()
  }, [calculateScrollbarPosition])

  // Handler del resize
  const handleResize = useCallback(() => {
    handleScroll()
  }, [handleScroll])

  useEffect(() => {
    if (!enabled || !containerRef.current) {
      return
    }

    const container = containerRef.current
    
    // Event listeners diferenciados
    container.addEventListener('scroll', handleHorizontalScroll, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    // Cálculo inicial
    calculateScrollbarPosition()

    // Cleanup
    return () => {
      container.removeEventListener('scroll', handleHorizontalScroll)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [enabled, handleScroll, handleHorizontalScroll, handleResize, calculateScrollbarPosition])

  return scrollbarData
}
