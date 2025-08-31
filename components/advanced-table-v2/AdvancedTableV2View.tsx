"use client"

import React, { useRef, useCallback } from 'react'
import { useContextualScrollbar } from '@/hooks/use-contextual-scrollbar'
import { ContextualScrollbar } from './ContextualScrollbar'
import { sanitizeAdvancedTableHTML } from '@/lib/advanced-table/sanitize'

interface AdvancedTableV2ViewProps {
  content: string
  className?: string
}

/**
 * AdvancedTableV2View - Componente para renderizar tablas con scrollbar contextual
 * 
 * Características:
 * - Scrollbar horizontal que se posiciona dinámicamente
 * - Se "pega" al borde inferior de la última fila visible
 * - Sincronización bidireccional entre scrollbar nativa y contextual
 * - Optimizado para contenido HTML con tablas
 */
export const AdvancedTableV2View: React.FC<AdvancedTableV2ViewProps> = ({ 
  content, 
  className = "" 
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isScrollingFromScrollbar = useRef(false)

  // Hook que detecta la posición de la tabla y calcula datos de scrollbar
  const scrollbarData = useContextualScrollbar({
    containerRef,
    enabled: true,
    ignoreScrollFlag: isScrollingFromScrollbar
  })

  // Handler para sincronizar scrollbar contextual con el contenedor
  const handleScrollChange = useCallback((scrollLeft: number) => {
    if (containerRef.current) {
      // Marcar que estamos haciendo scroll desde la scrollbar contextual
      isScrollingFromScrollbar.current = true
      containerRef.current.scrollLeft = scrollLeft
      
      // Resetear el flag después de un breve delay
      setTimeout(() => {
        isScrollingFromScrollbar.current = false
      }, 50)
    }
  }, [])

  // Convierte URLs de imagen "desnudas" dentro de celdas <td> en <img> conservando estilos convencionales
  const convertImageUrlsToImg = (html: string): string => {
    try {
      const container = document.createElement('div')
      container.innerHTML = html
      const cells = container.querySelectorAll('td')
      // Heurística de bajo coste para detectar URLs de imagen (con o sin extensión)
      const imageExtRegex = /\.(png|jpe?g|webp|gif|avif|svg)(?:$|[?#])/i
      const knownImageHosts = new Set([
        'encrypted-tbn0.gstatic.com',
        'i.ytimg.com',
        'ytimg.com',
        'm.media-amazon.com',
        'ae01.alicdn.com',
        'images.unsplash.com',
        'cdn.shopify.com',
        'gamesir.com',
      ])

      const isLikelyImageUrl = (rawUrl: string): boolean => {
        const urlText = rawUrl.replace(/^@+/, '').trim()
        if (!/^https?:\/\//i.test(urlText)) return false
        if (imageExtRegex.test(urlText)) return true
        try {
          const u = new URL(urlText)
          if (knownImageHosts.has(u.hostname)) return true
          // Patrones comunes de thumbnails sin extensión
          if (/images\?/i.test(u.pathname + u.search)) return true
          if (/q=tbn:/i.test(u.search)) return true
        } catch {
          return false
        }
        return false
      }

      cells.forEach((cell) => {
        // Evitar tocar celdas que ya contienen una imagen
        if (cell.querySelector('img')) return

        const raw = (cell.textContent || '').trim()
        if (!raw) return

        if (isLikelyImageUrl(raw)) {
          const src = raw.replace(/^@+/, '')
          // Sustituir el contenido por una imagen con estilos consistentes
          cell.innerHTML = `<div class="relative inline-block"><img src="${src}" class="max-w-full h-auto max-h-32 object-contain" alt="Imagen" /></div>`
        }
      })

      return container.innerHTML
    } catch {
      return html
    }
  }

  // Procesar contenido: normalizar imágenes en celdas y sanitizar para vista pública
  const processedContent = sanitizeAdvancedTableHTML(convertImageUrlsToImg(content))

  return (
    <div className={`relative ${className}`}>
      {/* Contenedor principal con scroll horizontal */}
      <div 
        ref={containerRef}
        className="overflow-x-auto prose max-w-none"
        style={{
          // Ocultar scrollbar nativa completamente
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none'  // IE/Edge
        }}
      >
        {/* Contenido HTML procesado */}
        <div dangerouslySetInnerHTML={{ __html: processedContent }} />
        
        {/* Estilos para ocultar scrollbar en WebKit */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
          
          /* Imágenes en tablas - ancho mínimo de 92px */
          table img {
            min-width: 92px !important;
            max-width: 100% !important;
            height: auto !important;
            max-height: 128px !important;
            object-fit: contain !important;
          }
          
          /* Contenedores de imágenes en tablas */
          table .relative.inline-block {
            min-width: 92px !important;
          }
          
          table .relative.inline-block img {
            min-width: 92px !important;
            max-width: 100% !important;
            height: auto !important;
            max-height: 128px !important;
            object-fit: contain !important;
          }
        `}</style>
      </div>

      {/* Scrollbar contextual que se posiciona dinámicamente */}
      <ContextualScrollbar
        containerRef={containerRef}
        lastVisibleRowBottom={scrollbarData.lastVisibleRowBottom}
        hasHorizontalOverflow={scrollbarData.hasHorizontalOverflow}
        tableWidth={scrollbarData.tableWidth}
        containerWidth={scrollbarData.containerWidth}
        scrollLeft={scrollbarData.scrollLeft}
        isVisible={scrollbarData.isTableVisible}
        tableLeft={scrollbarData.tableLeft}
        onScrollChange={handleScrollChange}
      />
    </div>
  )
}

export default AdvancedTableV2View