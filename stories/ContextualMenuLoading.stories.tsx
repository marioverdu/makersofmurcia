import type { Meta, StoryObj } from '@storybook/react'
import { ContextualMenuLoading } from '@/components/ui/contextual-menu-loading'

const meta: Meta<typeof ContextualMenuLoading> = {
  title: 'ContextualMenuLoading',
  component: ContextualMenuLoading,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# ContextualMenuLoading - Variante de Carga del Menú Contextual

Componente de menú contextual que muestra un estado de carga con \`UnifiedLoading\` en lugar del texto e icono normal.

## 🎯 Funcionalidades Principales

- **Estado de carga**: Muestra \`UnifiedLoading\` de 14x14px centrado
- **Funcionalidad intacta**: Mantiene el \`onClick\` para descarga de PDF
- **Estilos consistentes**: Mismos estilos que \`ContextualMenu\`
- **Accesibilidad**: Roles ARIA para accesibilidad

## 🎨 Estilos Técnicos

- **Contenedor**: \`w-fit min-w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fadeIn\`
- **Botón**: \`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-center rounded-md transition-colors whitespace-nowrap w-full\`
- **Loading**: \`UnifiedLoading\` de 14px centrado

## 🔧 Props

- **onDownloadPDF**: Función callback para manejar la descarga
- **className**: Clases CSS adicionales opcionales
- **ref**: Referencia forwardRef para el contenedor

## 📱 Responsive Design

- **Desktop**: Botón con hover effects y loading centrado
- **Mobile**: Funciona en dispositivos móviles
- **Tablet**: Adaptación automática del layout

## 🎯 Uso en el Proyecto

Este componente se utiliza como variante de \`ContextualMenu\` cuando se necesita mostrar un estado de carga durante la generación de PDF.
        `
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof ContextualMenuLoading>

export const Default: Story = {
  render: () => {
    const handleDownloadPDF = async () => {
      console.log('📄 Descargando PDF...')
      
      try {
        // Simular la funcionalidad real de descarga de PDF
        const response = await fetch('/api/generate-pdf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: 'http://localhost:3000/es/work-experience',
            lang: 'es'
          })
        })
        
        if (!response.ok) {
          throw new Error('Error generating PDF')
        }
        
        // Crear blob y descargar
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'cv-mario-verdu.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
        
        console.log('✅ PDF downloaded successfully')
      } catch (error) {
        console.error('❌ Error downloading PDF:', error)
        // Fallback al PDF estático
        window.open("/api/cv", "_blank")
      }
    }
    
    return (
      <div className="p-8 bg-gray-100 min-h-[200px] flex items-center justify-center">
        <ContextualMenuLoading onDownloadPDF={handleDownloadPDF} />
      </div>
    )
  },
  parameters: {
    docs: {
      story: {
        description: `
### 🎯 Componente con Estado de Carga

Esta story muestra el ContextualMenuLoading con funcionalidad completa:

- **Loading State**: Muestra \`UnifiedLoading\` de 14x14px centrado
- **Funcionalidad**: Sistema de caché inteligente con Puppeteer
- **Estilos**: Mismos estilos que \`ContextualMenu\`
- **Accesibilidad**: Roles ARIA para accesibilidad

### 📱 Testing Visual

- **Contenedor**: \`w-fit min-w-32 rounded-md shadow-lg bg-white\`
- **Botón**: \`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-center\`
- **Loading**: \`UnifiedLoading\` de 14px centrado

### 🔄 Estado de Carga

- **Componente**: \`UnifiedLoading\` con \`size={14}\`
- **Posición**: Centrado dentro del botón
- **Funcionalidad**: Mantiene el onClick para descarga
- **Estilos**: Botón con ancho completo y centrado

### 🚀 Sistema de Caché Inteligente

- **Primera descarga**: Genera PDF con Puppeteer desde /es/work-experience
- **Subsecuentes**: Sirve desde caché (instantáneo)
- **Detección de cambios**: Solo regenera cuando hay cambios reales
- **Fallback**: PDF estático si hay errores
        `
      }
    }
  }
}


