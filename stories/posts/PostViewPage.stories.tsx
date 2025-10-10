import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useRef, useEffect } from 'react';

// Componente ComponentInspector - Sistema de Inspección de Diseño
const ComponentInspector = ({ 
  lang, 
  componentName, 
  componentType,
  showMeasurements,
  showCodeExport,
  showLayersPanel,
  measurementMode,
  inspectMode
}: {
  lang: 'es' | 'en'
  componentName: string
  componentType: string
  showMeasurements: boolean
  showCodeExport: boolean
  showLayersPanel: boolean
  measurementMode: boolean
  inspectMode: boolean
}) => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)
  const [elementSpecs, setElementSpecs] = useState<any>(null)
  const [isAltPressed, setIsAltPressed] = useState(false)
  const [isDragging, setIsDragging] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [elementPositions, setElementPositions] = useState({
    'button-primary-1': { x: 200, y: 200 },
    'button-secondary-1': { x: 320, y: 200 }  // 120px de separación (200 + 108 + 12 = 320)
  })
  const canvasRef = useRef<HTMLDivElement>(null)

  // Diccionarios mock
  const dict = {
    es: {
      inspector: {
        title: "Inspector de Componentes",
        properties: "Propiedades",
        layout: "Layout",
        spacing: "Espaciado",
        appearance: "Apariencia",
        typography: "Tipografía",
        effects: "Efectos",
        code: "Código",
        copyCss: "Copiar CSS",
        copyTailwind: "Copiar Tailwind",
        copyJsx: "Copiar JSX",
        width: "Ancho",
        height: "Alto",
        margin: "Margen",
        padding: "Padding",
        background: "Fondo",
        color: "Color",
        border: "Borde",
        borderRadius: "Border Radius",
        fontSize: "Tamaño de fuente",
        fontWeight: "Peso de fuente",
        lineHeight: "Altura de línea",
        selected: "Seleccionado",
        hover: "Hover"
      }
    },
    en: {
      inspector: {
        title: "Component Inspector",
        properties: "Properties",
        layout: "Layout",
        spacing: "Spacing",
        appearance: "Appearance",
        typography: "Typography",
        effects: "Effects",
        code: "Code",
        copyCss: "Copy CSS",
        copyTailwind: "Copy Tailwind",
        copyJsx: "Copy JSX",
        width: "Width",
        height: "Height",
        margin: "Margin",
        padding: "Padding",
        background: "Background",
        color: "Color",
        border: "Border",
        borderRadius: "Border Radius",
        fontSize: "Font Size",
        fontWeight: "Font Weight",
        lineHeight: "Line Height",
        selected: "Selected",
        hover: "Hover"
      }
    }
  }

  const currentDict = dict[lang]

  // Mock de especificaciones del elemento
  const mockSpecs = {
    'button-primary-1': {
      id: 'button-primary-1',
      tagName: 'button',
      className: 'btn btn-primary',
      dimensions: {
        width: 120,
        height: 40,
        offsetTop: 200,
        offsetLeft: 50
      },
      spacing: {
        margin: { top: 8, right: 16, bottom: 8, left: 16 },
        padding: { top: 12, right: 24, bottom: 12, left: 24 }
      },
      colors: {
        background: '#0066FF',
        color: '#FFFFFF',
        borderColor: '#0052CC'
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '20px',
        letterSpacing: '0.5px'
      },
      effects: {
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease'
      },
      distances: {
        toSiblings: { next: 16, prev: 24 },
        toParent: { top: 24, right: 16, bottom: 24, left: 16 }
      }
    },
    'button-secondary-1': {
      id: 'button-secondary-1',
      tagName: 'button',
      className: 'btn btn-secondary',
      dimensions: {
        width: 120,
        height: 40,
        offsetTop: 200,
        offsetLeft: 200
      },
      spacing: {
        margin: { top: 8, right: 16, bottom: 8, left: 16 },
        padding: { top: 12, right: 24, bottom: 12, left: 24 }
      },
      colors: {
        background: '#059669',
        color: '#FFFFFF',
        borderColor: '#047857'
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '20px',
        letterSpacing: '0.5px'
      },
      effects: {
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease'
      },
      distances: {
        toSiblings: { next: 120, prev: 0 },
        toParent: { top: 24, right: 16, bottom: 24, left: 16 }
      }
    },
  }

  // Manejar selección de elemento
  const handleElementClick = (elementId: string) => {
    setSelectedElement(elementId)
    setElementSpecs(mockSpecs[elementId as keyof typeof mockSpecs])
  }

  // Manejar hover de elemento
  const handleElementHover = (elementId: string | null) => {
    setHoveredElement(elementId)
  }

  // Funciones para drag and drop
  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    e.preventDefault()
    setIsDragging(elementId)
    const rect = e.currentTarget.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    
    const canvasRect = canvasRef.current?.getBoundingClientRect()
    if (!canvasRect) return

    const newX = e.clientX - canvasRect.left - dragOffset.x
    const newY = e.clientY - canvasRect.top - dragOffset.y

    setElementPositions(prev => ({
      ...prev,
      [isDragging]: { x: newX, y: newY }
    }))
  }

  const handleMouseUp = () => {
    setIsDragging(null)
  }

  // Calcular distancia inteligente entre elementos - Versión simplificada
  const calculateSmartDistance = () => {
    const pos1 = elementPositions['button-primary-1']
    const pos2 = elementPositions['button-secondary-1']
    
    // Dimensiones de los botones
    const buttonWidth = 108
    const buttonHeight = 36
    
    // Calcular bordes de cada botón
    const button1Right = pos1.x + buttonWidth
    const button1Left = pos1.x
    const button1Top = pos1.y
    const button1Bottom = pos1.y + buttonHeight
    
    const button2Right = pos2.x + buttonWidth
    const button2Left = pos2.x
    const button2Top = pos2.y
    const button2Bottom = pos2.y + buttonHeight
    
    // Calcular centros
    const center1Y = pos1.y + buttonHeight / 2
    const center2Y = pos2.y + buttonHeight / 2
    const center1X = pos1.x + buttonWidth / 2
    const center2X = pos2.x + buttonWidth / 2
    
    // Determinar orientación basada en posición relativa
    const horizontalDistance = Math.abs(center2X - center1X)
    const verticalDistance = Math.abs(center2Y - center1Y)
    
    // Si están más separados horizontalmente que verticalmente
    if (horizontalDistance > verticalDistance) {
      if (pos2.x > pos1.x) {
        // Botón 2 está a la derecha del botón 1
        const distance = button2Left - button1Right
        return {
          type: 'horizontal',
          distance: Math.max(0, distance),
          startX: button1Right,
          startY: center1Y,
          endX: button2Left,
          endY: center2Y
        }
      } else {
        // Botón 2 está a la izquierda del botón 1
        const distance = button1Left - button2Right
        return {
          type: 'horizontal',
          distance: Math.max(0, distance),
          startX: button2Right,
          startY: center2Y,
          endX: button1Left,
          endY: center1Y
        }
      }
    } else {
      // Están más separados verticalmente
      if (pos2.y > pos1.y) {
        // Botón 2 está debajo del botón 1
        const distance = button2Top - button1Bottom
        return {
          type: 'vertical',
          distance: Math.max(0, distance),
          startX: center1X,
          startY: button1Bottom,
          endX: center2X,
          endY: button2Top
        }
      } else {
        // Botón 2 está arriba del botón 1
        const distance = button1Top - button2Bottom
        return {
          type: 'vertical',
          distance: Math.max(0, distance),
          startX: center2X,
          startY: button2Bottom,
          endX: center1X,
          endY: button1Top
        }
      }
    }
  }

  // Detectar tecla ALT
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Alt') {
        setIsAltPressed(true)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Alt') {
        setIsAltPressed(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // Componente de medición visual simplificado
  const MeasurementLines = ({ elementId }: { elementId: string }) => {
    if (!showMeasurements || !isAltPressed) return null

    const measurement = calculateSmartDistance()
    if (!measurement) return null

    return (
      <div className="absolute inset-0 pointer-events-none">
        {/* Línea de medición */}
        <div 
          className="absolute bg-red-500"
          style={{
            left: measurement.startX,
            top: measurement.startY,
            width: measurement.type === 'horizontal' ? measurement.distance : 1,
            height: measurement.type === 'vertical' ? measurement.distance : 1,
            transform: measurement.type === 'horizontal' ? 'translateY(-0.5px)' : 'translateX(-0.5px)'
          }}
        >
          {/* Label de distancia */}
          <div 
            className="absolute bg-white text-red-500 text-xs px-2 py-1 rounded border border-red-500 font-mono"
            style={{
              left: measurement.type === 'horizontal' ? '50%' : '-20px',
              top: measurement.type === 'horizontal' ? '-24px' : '50%',
              transform: measurement.type === 'horizontal' ? 'translateX(-50%)' : 'translateY(-50%)'
            }}
          >
            {Math.round(measurement.distance)}px
          </div>
        </div>
      </div>
    )
  }

  // Componente de propiedades
  const PropertiesPanel = () => {
    if (!elementSpecs) {
      return (
        <div className="p-6 text-center text-gray-500">
          <div className="text-2xl mb-2">🎯</div>
          <p className="text-sm">
            {lang === 'es' 
              ? 'Haz clic en un elemento para inspeccionar sus propiedades'
              : 'Click on an element to inspect its properties'
            }
          </p>
        </div>
      )
    }

    return (
      <div className="h-full overflow-y-auto">
        {/* Header de identificación */}
        <div className="p-4 border-b bg-gray-50">
          <h3 className="font-semibold text-gray-900">{elementSpecs.tagName}</h3>
          <p className="text-sm text-gray-600">{elementSpecs.className}</p>
          <p className="text-sm text-gray-500">
            {elementSpecs.dimensions.width} × {elementSpecs.dimensions.height} px
          </p>
        </div>

        {/* Layout */}
        <div className="p-4 border-b">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            📦 {currentDict.inspector.layout}
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">{currentDict.inspector.width}:</span>
              <span className="font-mono">{elementSpecs.dimensions.width}px</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{currentDict.inspector.height}:</span>
              <span className="font-mono">{elementSpecs.dimensions.height}px</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Display:</span>
              <span className="font-mono">flex</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Position:</span>
              <span className="font-mono">relative</span>
            </div>
          </div>
        </div>

        {/* Spacing */}
        <div className="p-4 border-b">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            📏 {currentDict.inspector.spacing}
          </h4>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-600 mb-1">{currentDict.inspector.margin}:</div>
              <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                {elementSpecs.spacing.margin.top}px {elementSpecs.spacing.margin.right}px {elementSpecs.spacing.margin.bottom}px {elementSpecs.spacing.margin.left}px
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">{currentDict.inspector.padding}:</div>
              <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                {elementSpecs.spacing.padding.top}px {elementSpecs.spacing.padding.right}px {elementSpecs.spacing.padding.bottom}px {elementSpecs.spacing.padding.left}px
              </div>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="p-4 border-b">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            🎨 {currentDict.inspector.appearance}
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{currentDict.inspector.background}:</span>
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded border border-gray-300"
                  style={{ backgroundColor: elementSpecs.colors.background }}
                ></div>
                <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{elementSpecs.colors.background}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{currentDict.inspector.color}:</span>
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded border border-gray-300"
                  style={{ backgroundColor: elementSpecs.colors.color }}
                ></div>
                <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{elementSpecs.colors.color}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Border Color:</span>
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded border border-gray-300"
                  style={{ backgroundColor: elementSpecs.colors.borderColor }}
                ></div>
                <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{elementSpecs.colors.borderColor}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{currentDict.inspector.borderRadius}:</span>
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 bg-gray-200 border border-gray-300"
                  style={{ borderRadius: elementSpecs.effects.borderRadius }}
                ></div>
                <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{elementSpecs.effects.borderRadius}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Box Shadow:</span>
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{elementSpecs.effects.boxShadow}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Transition:</span>
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{elementSpecs.effects.transition}</span>
            </div>
          </div>
        </div>

        {/* Typography */}
        <div className="p-4 border-b">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            ✏️ {currentDict.inspector.typography}
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Font Family:</span>
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{elementSpecs.typography.fontFamily}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{currentDict.inspector.fontSize}:</span>
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{elementSpecs.typography.fontSize}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{currentDict.inspector.fontWeight}:</span>
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{elementSpecs.typography.fontWeight}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{currentDict.inspector.lineHeight}:</span>
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{elementSpecs.typography.lineHeight}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Letter Spacing:</span>
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{elementSpecs.typography.letterSpacing}</span>
            </div>
            {/* Preview de tipografía */}
            <div className="mt-3 p-3 bg-gray-50 rounded border">
              <div className="text-xs text-gray-500 mb-1">Preview:</div>
              <div 
                style={{
                  fontFamily: elementSpecs.typography.fontFamily,
                  fontSize: elementSpecs.typography.fontSize,
                  fontWeight: elementSpecs.typography.fontWeight,
                  lineHeight: elementSpecs.typography.lineHeight,
                  letterSpacing: elementSpecs.typography.letterSpacing,
                  color: elementSpecs.colors.color
                }}
              >
                The quick brown fox jumps over the lazy dog
              </div>
            </div>
          </div>
        </div>

        {/* Code Export */}
        {showCodeExport && (
          <div className="p-4">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              📋 {currentDict.inspector.code}
            </h4>
            <div className="space-y-2">
              <button className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                {currentDict.inspector.copyCss}
              </button>
              <button className="w-full px-3 py-2 bg-cyan-600 text-white text-sm rounded hover:bg-cyan-700 transition-colors">
                {currentDict.inspector.copyTailwind}
              </button>
              <button className="w-full px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                {currentDict.inspector.copyJsx}
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(4px)'
      }}
    >
      {/* Layout de dos columnas horizontal */}
      <div className="flex w-full h-full">
        {/* Columna izquierda - Canvas Interactivo (70%) */}
        <div 
          className="flex-1 relative"
          style={{ 
            backgroundColor: '#18191a',
            width: '70%'
          }}
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* Canvas con botones arrastrables */}
          <div className="relative w-full h-full">
            {/* Botón 1 */}
            <div 
              className="absolute"
              style={{ 
                left: elementPositions['button-primary-1'].x,
                top: elementPositions['button-primary-1'].y
              }}
            >
              {/* Handle de movimiento */}
              <div 
                className="absolute -top-2 -left-2 w-4 h-4 bg-blue-500 cursor-move rounded-sm flex items-center justify-center"
                onMouseDown={(e) => handleMouseDown(e, 'button-primary-1')}
              >
                <div className="w-2 h-2 bg-white rounded-sm"></div>
              </div>
              
              <button
                id="button-primary-1"
                className={`
                  px-6 py-3 rounded-lg font-medium transition-all duration-200
                  ${selectedElement === 'button-primary-1' 
                    ? 'ring-3 ring-blue-500 ring-offset-2' 
                    : hoveredElement === 'button-primary-1'
                    ? 'ring-2 ring-blue-400'
                    : ''
                  }
                  ${selectedElement === 'button-primary-1' || hoveredElement === 'button-primary-1'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }
                `}
                onClick={() => handleElementClick('button-primary-1')}
                onMouseEnter={() => handleElementHover('button-primary-1')}
                onMouseLeave={() => handleElementHover(null)}
                style={{
                  backgroundColor: selectedElement === 'button-primary-1' ? '#0066FF' : undefined,
                  color: selectedElement === 'button-primary-1' ? '#FFFFFF' : undefined,
                  border: selectedElement === 'button-primary-1' ? '1px solid #0052CC' : undefined,
                  borderRadius: '8px',
                  boxShadow: selectedElement === 'button-primary-1' ? '0 2px 4px rgba(0, 0, 0, 0.1)' : undefined,
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: '20px',
                  letterSpacing: '0.5px'
                }}
              >
                Button 1
              </button>
            </div>

            {/* Botón 2 */}
            <div 
              className="absolute"
              style={{ 
                left: elementPositions['button-secondary-1'].x,
                top: elementPositions['button-secondary-1'].y
              }}
            >
              {/* Handle de movimiento */}
              <div 
                className="absolute -top-2 -left-2 w-4 h-4 bg-green-500 cursor-move rounded-sm flex items-center justify-center"
                onMouseDown={(e) => handleMouseDown(e, 'button-secondary-1')}
              >
                <div className="w-2 h-2 bg-white rounded-sm"></div>
              </div>
              
              <button
                id="button-secondary-1"
                className={`
                  px-6 py-3 rounded-lg font-medium transition-all duration-200
                  ${selectedElement === 'button-secondary-1' 
                    ? 'ring-3 ring-blue-500 ring-offset-2' 
                    : hoveredElement === 'button-secondary-1'
                    ? 'ring-2 ring-blue-400'
                    : ''
                  }
                  ${selectedElement === 'button-secondary-1' || hoveredElement === 'button-secondary-1'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }
                `}
                onClick={() => handleElementClick('button-secondary-1')}
                onMouseEnter={() => handleElementHover('button-secondary-1')}
                onMouseLeave={() => handleElementHover(null)}
                style={{
                  backgroundColor: selectedElement === 'button-secondary-1' ? '#059669' : undefined,
                  color: selectedElement === 'button-secondary-1' ? '#FFFFFF' : undefined,
                  border: selectedElement === 'button-secondary-1' ? '1px solid #047857' : undefined,
                  borderRadius: '8px',
                  boxShadow: selectedElement === 'button-secondary-1' ? '0 2px 4px rgba(0, 0, 0, 0.1)' : undefined,
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: '20px',
                  letterSpacing: '0.5px'
                }}
              >
                Button 2
              </button>
            </div>
          </div>

          {/* Líneas de medición para todos los elementos */}
          <MeasurementLines elementId={selectedElement || ''} />

          {/* Tooltips flotantes - DESACTIVADOS */}
          {/* {hoveredElement === 'button-primary-1' && (
            <div className="absolute top-20 left-20 bg-black text-white text-xs px-2 py-1 rounded">
              Button 1<br />
              120 × 40 px
            </div>
          )}
          {hoveredElement === 'button-secondary-1' && (
            <div className="absolute top-20 right-20 bg-black text-white text-xs px-2 py-1 rounded">
              Button 2<br />
              120 × 40 px
            </div>
          )} */}

          {/* Labels de selección - DESACTIVADOS */}
          {/* {selectedElement === 'button-primary-1' && (
            <div className="absolute top-16 left-20 bg-blue-600 text-white text-xs px-2 py-1 rounded">
              {currentDict.inspector.selected}: Button 1
            </div>
          )}
          {selectedElement === 'button-secondary-1' && (
            <div className="absolute top-16 right-20 bg-green-600 text-white text-xs px-2 py-1 rounded">
              {currentDict.inspector.selected}: Button 2
            </div>
          )} */}

          {/* Controles de navegación */}
          <button 
            className="absolute left-4 top-4 w-10 h-10 bg-white/30 hover:bg-white/50 rounded-full flex items-center justify-center text-white transition-all"
            style={{ backdropFilter: 'blur(8px)' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Indicador de modo de medición */}
          {isAltPressed && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
              📏 {lang === 'es' ? 'Modo Medición' : 'Measurement Mode'}
            </div>
          )}
        </div>

        {/* Columna derecha - Panel de Propiedades (30%) */}
        <div className="bg-white flex flex-col" style={{ width: '30%', minWidth: '360px' }}>
          {/* Header del Panel */}
          <div className="flex items-center gap-3 p-4 border-b" style={{ height: '72px' }}>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-lg">🔍</span>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900" style={{ fontSize: '15px' }}>
                {currentDict.inspector.title}
              </div>
              <div className="text-gray-500 text-sm">
                {lang === 'es' ? 'Inspección de componentes' : 'Component inspection'}
              </div>
            </div>
            <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </button>
          </div>

          {/* Panel de propiedades */}
          <PropertiesPanel />
        </div>
      </div>
    </div>
  )
}

const meta: Meta<typeof ComponentInspector> = {
  title: 'Tools/ComponentInspector',
  component: ComponentInspector,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Component Inspector - Sistema de Inspección de Diseño

## Descripción:
Sistema de inspección y especificaciones de diseño similar a herramientas profesionales como Figma Dev Mode, Zeplin, InVision Inspect y Avocode. Permite inspeccionar componentes de manera interactiva con mediciones automáticas y exportación de código.

## Características:
- **Canvas interactivo**: Área de trabajo donde se pueden inspeccionar componentes
- **Sistema de medición**: Líneas rojas con distancias al mantener ALT presionado
- **Panel de propiedades**: Especificaciones técnicas completas del elemento seleccionado
- **Modo de inspección**: Click para seleccionar elementos y ver sus propiedades
- **Exportación de código**: Botones para copiar CSS, Tailwind y JSX
- **Overlay fullscreen**: Se posiciona sobre cualquier contenido existente

## Elementos visuales:
- **Canvas oscuro**: Fondo #18191a para mejor contraste
- **Componente centrado**: Button enfocado en el centro del canvas
- **Highlight interactivo**: Bordes azules en hover y selección
- **Líneas de medición**: Rojas con valores en píxeles
- **Panel de propiedades**: Especificaciones organizadas por categorías

## Funcionalidades activas:
- **Hover effects**: Resaltado azul al pasar el ratón
- **Click selection**: Selección persistente con borde más grueso
- **ALT + hover**: Modo de medición con líneas rojas
- **Tooltip informativo**: Dimensiones del elemento en hover
- **Panel dinámico**: Actualización automática de propiedades

## Categorías de propiedades:
- **📦 Layout**: Dimensiones, display, position
- **📏 Spacing**: Margin, padding con valores individuales
- **🎨 Appearance**: Colores con preview visual
- **✏️ Typography**: Fuente, tamaño, peso, altura de línea
- **📋 Code Export**: Botones para copiar CSS, Tailwind, JSX

## Casos de uso:
- **Design handoff**: Traspaso de diseño a desarrollo
- **Component inspection**: Análisis detallado de componentes
- **Measurement tools**: Herramientas de medición automática
- **Code generation**: Exportación de código para implementación
- **Design system**: Documentación de especificaciones técnicas
        `,
      },
    },
  },
  argTypes: {
    lang: {
      control: { type: 'select' },
      options: ['es', 'en'],
      description: 'Idioma de la interfaz',
    },
    componentName: {
      control: { type: 'text' },
      description: 'Nombre del componente a mostrar',
    },
    componentType: {
      control: { type: 'text' },
      description: 'Tipo de componente',
    },
    showMeasurements: {
      control: { type: 'boolean' },
      description: 'Mostrar sistema de medición',
    },
    showCodeExport: {
      control: { type: 'boolean' },
      description: 'Mostrar botones de exportación de código',
    },
    showLayersPanel: {
      control: { type: 'boolean' },
      description: 'Mostrar panel de capas',
    },
    measurementMode: {
      control: { type: 'boolean' },
      description: 'Activar modo de medición',
    },
    inspectMode: {
      control: { type: 'boolean' },
      description: 'Activar modo de inspección',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100vw', height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ComponentInspector>;

// Story principal con configuración por defecto
export const Default: Story = {
  args: {
    lang: 'es',
    componentName: 'Button Primary',
    componentType: 'button',
    showMeasurements: true,
    showCodeExport: true,
    showLayersPanel: false,
    measurementMode: false,
    inspectMode: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
## Component Inspector - Sistema Completo

### Características específicas:
- **Canvas interactivo** con componente Button centrado y enfocado
- **Sistema de medición** activado con tecla ALT (mantener presionada)
- **Panel de propiedades** completo con todas las especificaciones técnicas
- **Interacciones visuales** con hover effects y selección persistente
- **Exportación de código** con botones para CSS, Tailwind y JSX

### Elementos visuales:
- **Canvas oscuro**: Fondo #18191a para mejor contraste visual
- **Button centrado**: Componente principal con estilos aplicados
- **Highlight system**: Bordes azules para hover y selección
- **Measurement lines**: Líneas rojas con valores en píxeles
- **Properties panel**: Especificaciones organizadas por categorías

### Funcionalidades activas:
- **Hover detection**: Resaltado azul al pasar el ratón sobre el button
- **Click selection**: Selección persistente con borde más grueso
- **ALT measurement**: Mantener ALT para activar líneas de medición
- **Dynamic tooltip**: Información de dimensiones en hover
- **Properties update**: Panel se actualiza automáticamente al seleccionar

### Instrucciones de uso:
1. **Hover**: Pasa el ratón sobre el button para ver el highlight azul
2. **Click**: Haz clic en el button para seleccionarlo y ver sus propiedades
3. **ALT + Hover**: Mantén ALT y pasa el ratón para ver líneas de medición
4. **Export**: Usa los botones del panel para copiar código CSS/Tailwind/JSX

### Casos de uso:
- **Design handoff** entre diseñadores y desarrolladores
- **Component inspection** para análisis detallado
- **Measurement tools** para verificar espaciado y dimensiones
- **Code generation** para facilitar la implementación
- **Design system** para documentar especificaciones técnicas
        `,
      },
    },
  },
};