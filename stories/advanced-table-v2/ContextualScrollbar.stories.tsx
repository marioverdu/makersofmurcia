import type { Meta, StoryObj } from '@storybook/react'
import { ContextualScrollbar } from '@/components/advanced-table-v2/ContextualScrollbar'
import { useRef, useState } from 'react'

const meta: Meta<typeof ContextualScrollbar> = {
  title: 'ContextualScrollbar',
  component: ContextualScrollbar,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Componente wrapper para simular el contexto de una tabla
const TableWrapper = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollLeft, setScrollLeft] = useState(0)
  
  // Simular una tabla ancha que requiere scroll horizontal
  const tableWidth = 1200
  const containerWidth = 400
  const hasHorizontalOverflow = tableWidth > containerWidth
  const lastVisibleRowBottom = 280 // Ajustado para que el scrollbar aparezca debajo del contenedor con 12px de separación
  const isVisible = true

  // Función para manejar el scroll del contenido
  const handleScrollChange = (newScrollLeft: number) => {
    setScrollLeft(newScrollLeft)
    if (containerRef.current) {
      containerRef.current.scrollLeft = newScrollLeft
    }
  }

  return (
    <div className="relative w-full max-w-md h-80 bg-gray-100 p-4">
      {/* Contenedor del contenido con scroll */}
      <div 
        ref={containerRef}
        className="w-full h-64 overflow-hidden bg-white border rounded"
        style={{ width: `${containerWidth}px` }}
      >
        {/* Contenido ancho que requiere scroll */}
        <div 
          className="h-full bg-gradient-to-r from-blue-100 to-purple-100 p-4"
          style={{ width: `${tableWidth}px` }}
        >
          <p className="text-sm text-gray-600">
            Esta es una tabla simulada con contenido ancho que requiere scroll horizontal.
            El ContextualScrollbar aparecerá en la parte inferior para permitir navegación.
          </p>
          <div className="mt-4 grid grid-cols-6 gap-2">
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} className="bg-white p-2 rounded text-xs text-center">
                Col {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Scrollbar contextual - debe tener exactamente el mismo ancho que el contenedor */}
      <ContextualScrollbar
        containerRef={containerRef}
        lastVisibleRowBottom={lastVisibleRowBottom}
        hasHorizontalOverflow={hasHorizontalOverflow}
        tableWidth={tableWidth}
        containerWidth={containerWidth}
        scrollLeft={scrollLeft}
        isVisible={isVisible}
        tableLeft={0} // Alinear perfectamente con el contenedor
        onScrollChange={handleScrollChange}
      />
      
      {/* Estilos CSS para comportamiento estándar del cursor estilo Google - SIN TRANSICIONES */}
      <style jsx>{`
        .contextual-scrollbar-thumb {
          cursor: grab;
          opacity: 0.8; /* Semi-transparente por defecto estilo Google */
        }
        
        .contextual-scrollbar-thumb:hover {
          cursor: grab;
          opacity: 1; /* Completamente visible en hover */
        }
        
        .contextual-scrollbar-thumb:active {
          cursor: grabbing;
          opacity: 1; /* Completamente visible cuando está activo */
        }
      `}</style>
    </div>
  )
}

export const Default: Story = {
  render: () => <TableWrapper />
}
