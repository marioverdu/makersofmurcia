import type { Meta, StoryObj } from '@storybook/react'
import { ContextualMenu } from '@/components/ui/contextual-menu'
import { LanguageProvider } from '@/contexts/language-context'
import { useState, useRef } from 'react'

const meta: Meta<typeof ContextualMenu> = {
  title: 'ContextualMenu',
  component: ContextualMenu,
  decorators: [
    (Story) => (
      <LanguageProvider>
        <Story />
      </LanguageProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# ContextualMenu - Menú Contextual con Botón "Descargar en PDF"

Componente de menú contextual que contiene el botón "Descargar en PDF" utilizado en la página \`/work-experience\`.

## 🎯 Funcionalidades Principales

- **Botón "Descargar en PDF"**: Funcionalidad principal del componente
- **Icono SVG**: Icono de descarga integrado
- **Hover Effects**: Efectos de hover en el botón
- **Accesibilidad**: Roles ARIA para accesibilidad

## 🎨 Estilos Técnicos

- **Contenedor**: \`w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fadeIn\`
- **Botón**: \`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center rounded-md transition-colors\`
- **Icono**: \`ml-2\` con color \`#3D5B6A\`
- **Animación**: \`animate-fadeIn\` para entrada suave

## 🔧 Props

- **onDownloadPDF**: Función callback para manejar la descarga
- **className**: Clases CSS adicionales opcionales
- **ref**: Referencia forwardRef para el contenedor

## 📱 Responsive Design

- **Desktop**: Botón con hover effects
- **Mobile**: Funciona en dispositivos móviles
- **Tablet**: Adaptación automática del layout

## 🎯 Uso en el Proyecto

Este componente se utiliza en \`ProfileCardWidescreens\` para mostrar el menú contextual 
con el botón "Descargar en PDF" cuando el usuario hace clic en el botón de opciones.
        `
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof ContextualMenu>

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
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">ContextualMenu - Español</h3>
            <ContextualMenu onDownloadPDF={handleDownloadPDF} lang="es" />
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">ContextualMenu - English</h3>
            <ContextualMenu onDownloadPDF={handleDownloadPDF} lang="en" />
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      story: {
        description: `
### 🎯 Componente Internacionalizado con Sistema de Caché

Esta story muestra el ContextualMenu en ambos idiomas con funcionalidad completa:

- **Español**: "Descargar en PDF" (lang="es")
- **English**: "Download PDF" (lang="en")
- **Funcionalidad**: Sistema de caché inteligente con Puppeteer
- **Estilos**: Idénticos en ambos idiomas
- **Accesibilidad**: Roles ARIA para accesibilidad

### 📱 Testing Visual

- **Contenedor**: \`w-44 rounded-md shadow-lg bg-white\`
- **Botón**: \`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100\`
- **Icono**: SVG con color \`#3D5B6A\` y margen \`ml-2\`

### 🌍 Internacionalización

- **Hook**: \`useContextualMenuTranslations(lang)\`
- **Traducciones**: Español e inglés
- **Prop lang**: Acepta idioma específico
- **Logs**: Debugging con \`🌍 [ContextualMenu]\`

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

