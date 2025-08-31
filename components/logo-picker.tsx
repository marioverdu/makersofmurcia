http://localhost:3000/en/posts"use client"

import React, { useState, useRef, useEffect } from 'react'
import { LOGO_LIST } from '@/lib/logo-list'
import { X, Search, Save } from 'lucide-react'

interface LogoPickerProps {
  isOpen: boolean
  onClose: () => void
  onSelectLogo: (logoUrl: string) => void
  currentLogoUrl?: string
  position?: { x: number; y: number }
  containerRef?: React.RefObject<HTMLElement>
}

export function LogoPicker({
  isOpen,
  onClose,
  onSelectLogo,
  currentLogoUrl,
  position = { x: 0, y: 0 },
  containerRef
}: LogoPickerProps) {
  
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [tempSelectedLogo, setTempSelectedLogo] = useState<string | null>(null)
  const pickerRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Filtrar logos basado en el término de búsqueda
  const filteredLogos = LOGO_LIST.filter(logo =>
    logo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    logo.filename.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Calcular posición y ancho basado en el contenedor
  const getPickerStyle = () => {
    if (!containerRef?.current) {
      return {
        position: 'fixed' as const,
        left: position.x,
        top: position.y,
        width: '320px',
        zIndex: 50
      }
    }

    const containerRect = containerRef.current.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    
    // Calcular ancho basado en el contenedor (mínimo 280px, máximo 400px)
    const containerWidth = containerRect.width
    const pickerWidth = Math.max(280, Math.min(400, containerWidth - 20))
    
    // Calcular posición
    let left = containerRect.left
    let top = containerRect.bottom + 8
    
    // Ajustar si se sale por la derecha
    if (left + pickerWidth > viewportWidth - 20) {
      left = viewportWidth - pickerWidth - 20
    }
    
    // Ajustar si se sale por la izquierda
    if (left < 20) {
      left = 20
    }
    
    // Si no cabe abajo, mostrar arriba
    if (top + 400 > viewportHeight - 20) {
      top = containerRect.top - 400 - 8
    }
    
    // Si tampoco cabe arriba, ajustar altura
    if (top < 20) {
      top = 20
    }

    return {
      position: 'fixed' as const,
      left,
      top,
      width: `${pickerWidth}px`,
      zIndex: 50
    }
  }

  // Función para guardar el logo seleccionado
  const handleSaveLogo = () => {
    if (tempSelectedLogo) {
      onSelectLogo(tempSelectedLogo)
      onClose()
    }
  }

  // Manejar navegación con teclado
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => 
            prev < filteredLogos.length - 1 ? prev + 1 : 0
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : filteredLogos.length - 1
          )
          break
        case 'Enter':
          e.preventDefault()
          if (tempSelectedLogo) {
            handleSaveLogo()
          } else if (filteredLogos[selectedIndex]) {
            setTempSelectedLogo(filteredLogos[selectedIndex].url)
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, filteredLogos, onClose, onSelectLogo, tempSelectedLogo])

  // Enfocar el input de búsqueda cuando se abre
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  // Resetear el índice seleccionado cuando cambia la búsqueda
  useEffect(() => {
    setSelectedIndex(0)
  }, [searchTerm])

  // Resetear el logo temporal cuando se abre el picker
  useEffect(() => {
    if (isOpen) {
      setTempSelectedLogo(currentLogoUrl || null)
    }
  }, [isOpen, currentLogoUrl])

  // Cerrar al hacer clic fuera del picker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const pickerStyle = getPickerStyle()

  return (
    <>
      {/* Overlay de fondo */}
      <div 
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Picker contextual */}
      <div
        ref={pickerRef}
        className="fixed bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden"
        style={pickerStyle}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-100">
          <h3 className="text-sm font-medium text-gray-800">Seleccionar Logo</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Barra de búsqueda */}
        <div className="p-3 border-b border-gray-100">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Buscar logo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
            />
          </div>
        </div>

        {/* Lista de logos */}
        <div className="max-h-64 overflow-y-auto">
          {filteredLogos.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm">
              No se encontraron logos
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 p-3">
              {filteredLogos.map((logo, index) => (
                <button
                  key={logo.id}
                  onClick={() => setTempSelectedLogo(logo.url)}
                  className={`
                    relative p-2 rounded-md border-2 transition-all duration-150
                    ${tempSelectedLogo === logo.url 
                      ? 'border-primary bg-blue-50' 
                      : index === selectedIndex 
                        ? 'border-gray-300 bg-gray-50' 
                        : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
                    }
                    ${currentLogoUrl === logo.url ? 'ring-2 ring-green-500 ring-offset-1' : ''}
                  `}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="w-full h-12 flex items-center justify-center bg-gray-50 rounded-md overflow-hidden">
                    <img
                      src={logo.url}
                      alt={logo.name}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/placeholder.svg'
                      }}
                    />
                  </div>
                  <div className="mt-1 text-xs text-gray-600 truncate text-center">
                    {logo.name}
                  </div>
                  {tempSelectedLogo === logo.url && (
                    <div className="absolute top-1 right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                  )}
                  {currentLogoUrl === logo.url && tempSelectedLogo !== logo.url && (
                    <div className="absolute top-1 right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer con botón Guardar */}
        <div className="p-3 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {tempSelectedLogo ? 'Logo seleccionado' : 'Selecciona un logo'}
            </div>
            <button
              onClick={handleSaveLogo}
              disabled={!tempSelectedLogo}
              className={`
                flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors
                ${tempSelectedLogo 
                  ? 'bg-primary text-white hover:bg-primary/80' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              <Save size={14} />
              Guardar
            </button>
          </div>
        </div>
      </div>
    </>
  )
} 