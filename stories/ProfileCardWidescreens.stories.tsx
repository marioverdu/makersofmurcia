import type { Meta, StoryObj } from '@storybook/react'
import { ProfileCardWidescreens } from '@/components/profile-card'

const meta: Meta<typeof ProfileCardWidescreens> = {
  title: 'ProfileCardWidescreens',
  component: ProfileCardWidescreens,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# ProfileCardWidescreens - Tarjeta de Perfil con Menú Contextual

Componente de tarjeta de perfil que se usa en la página \`/work-experience\` y contiene el botón "Descargar en PDF".

## 🎯 Funcionalidades Principales

- **Información del autor**: Avatar, nombre y descripción profesional
- **Botón de contacto**: Abre modal de contacto
- **Botón de opciones**: Menú contextual con tres puntos
- **Menú móvil**: Menú contextual fijo en dispositivos móviles
- **Descarga PDF**: Botón para descargar CV en formato PDF

## 📱 Responsive Design

- **Desktop**: Botones horizontales con hover effects
- **Mobile**: Menú contextual fijo con animaciones
- **Tablet**: Adaptación automática del layout

## 🎨 Estilos Técnicos

- **Backdrop blur**: Efecto de cristal esmerilado (\`backdrop-blur-md\`)
- **Gradientes**: Colores azules corporativos
- **Animaciones**: Transiciones suaves y \`animate-fadeIn\`
- **Z-index**: 9999 para menú móvil
- **Posicionamiento**: \`fixed left-1/2 -translate-x-1/2\` para centrado

## 🔧 Funciones Internas

- **handleDownloadPDF**: Función para descargar CV
- **handleContactClick**: Función para abrir modal de contacto
- **handleMenuToggle**: Función para mostrar/ocultar menú contextual
- **useState**: Manejo de estado del menú (\`menuOpen\`)
- **useRef**: Referencias para botones y menú
- **ContextualMenu**: Componente reutilizable que contiene el menú contextual con el botón "Descargar en PDF"

## 📋 Estructura del Menú Contextual

- **Componente**: \`ContextualMenu\` - Componente reutilizable del menú contextual
- **Role**: \`menu\` - Rol ARIA para accesibilidad
- **Orientación**: \`vertical\` - Orientación vertical del menú
- **Contenido**: Botón "Descargar en PDF" con icono SVG
- **Estilos**: \`w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fadeIn\`
        `
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof ProfileCardWidescreens>

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <ProfileCardWidescreens />
        
        {/* Contenido de ejemplo para mostrar el contexto de work experience */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Contexto de Work Experience
          </h2>
          <p className="text-gray-600 mb-4">
            Este componente se integra en la página \`/work-experience\` y proporciona:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Botón "Descargar en PDF" para descargar el CV</li>
            <li>Botón de contacto para abrir modal</li>
            <li>Menú contextual con opciones adicionales</li>
            <li>Diseño responsive para móvil y desktop</li>
          </ul>
          
          {/* Simulación de contenido de work experience */}
          <div className="mt-6 space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      story: {
        description: `
### 🎯 Componente en Contexto de Work Experience

Esta story muestra el ProfileCardWidescreens tal como aparece en la página \`/work-experience\`, 
permitiendo probar todas sus funcionalidades:

- **Botón "Descargar en PDF"**: Funcionalidad principal del componente
- **Botón de contacto**: Abre modal de contacto
- **Botón de opciones**: Muestra menú contextual con tres puntos
- **Menú móvil**: Funciona en dispositivos móviles con posicionamiento fijo

### 📱 Testing Responsive

- **Desktop**: Botones horizontales con hover effects
- **Mobile**: Menú contextual fijo con \`z-index: 9999\`
- **Tablet**: Layout adaptativo automático

### 🔧 Funciones Técnicas

- **handleDownloadPDF**: Descarga del CV en formato PDF
- **handleContactClick**: Apertura del modal de contacto
- **handleMenuToggle**: Control del estado del menú contextual
- **ContextualMenu**: Componente reutilizable que contiene el menú contextual con el botón "Descargar en PDF"

### 📋 Estructura del Menú Contextual

- **Componente**: \`ContextualMenu\` - Componente reutilizable del menú contextual
- **Role**: \`menu\` - Rol ARIA para accesibilidad
- **Orientación**: \`vertical\` - Orientación vertical del menú
- **Contenido**: Botón "Descargar en PDF" con icono SVG
- **Estilos**: \`w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fadeIn\`
        `
      }
    }
  }
}
