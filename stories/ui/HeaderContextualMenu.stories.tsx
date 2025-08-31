import type { Meta, StoryObj } from '@storybook/react'
import { HeaderContextualMenu } from '@/components/ui/header/header-contextual-menu'

const meta: Meta<typeof HeaderContextualMenu> = {
  title: 'Components/HeaderContextualMenu',
  component: HeaderContextualMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente reutilizable del menú contextual del selector de idioma con estructura organizada en secciones, encabezado IDIOMA, y toggle de modo oscuro.',
      },
    },
  },
  argTypes: {
    currentLang: {
      control: { type: 'select' },
      options: ['es', 'en'],
      description: 'Idioma actual del selector',
    },
    className: {
      control: { type: 'text' },
      description: 'Clases CSS adicionales para personalizar el estilo',
    },
    onLanguageChange: {
      action: 'languageChanged',
      description: 'Callback que se ejecuta cuando cambia el idioma',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Menú contextual en español
export const Spanish: Story = {
  args: {
    currentLang: 'es',
  },
  name: '⚙️ Español (Estructura Organizada)',
  parameters: {
    docs: {
      description: {
        story: 'HeaderContextualMenu configurado para mostrar español como idioma actual. El menú tiene estructura organizada con sección IDIOMA y toggle de tema.',
      },
    },
  },
}

// Menú contextual en inglés
export const English: Story = {
  args: {
    currentLang: 'en',
  },
  name: '⚙️ English (Organized Structure)',
  parameters: {
    docs: {
      description: {
        story: 'HeaderContextualMenu configurado para mostrar inglés como idioma actual. El menú tiene estructura organizada con sección IDIOMA y toggle de tema.',
      },
    },
  },
}

// Menú contextual con callback personalizado
export const WithCallback: Story = {
  args: {
    currentLang: 'es',
    onLanguageChange: (newLang) => {
      console.log(`[Storybook] Idioma cambiado a: ${newLang}`)
      alert(`Idioma cambiado a: ${newLang === 'es' ? 'Español' : 'English'}`)
    },
  },
  name: 'Con Callback',
  parameters: {
    docs: {
      description: {
        story: 'HeaderContextualMenu con callback personalizado que muestra una alerta y log en consola cuando se cambia el idioma.',
      },
    },
  },
}

// Menú contextual con estilos personalizados
export const CustomStyling: Story = {
  args: {
    currentLang: 'es',
    className: 'shadow-lg border-2 border-cyan-500',
  },
  name: 'Estilos Personalizados',
  parameters: {
    docs: {
      description: {
        story: 'HeaderContextualMenu con estilos personalizados usando la prop className. Se aplican sombra, borde azul y otros estilos.',
      },
    },
  },
}

// Menú contextual en diferentes estados
export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">Estado Normal</h3>
        <HeaderContextualMenu currentLang="es" hidden={true} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">Estado Hover</h3>
        <div className="p-4 bg-gray-100 rounded">
          <HeaderContextualMenu currentLang="en" hidden={true} />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">Estado Focus</h3>
        <div className="p-4 bg-blue-50 rounded">
          <HeaderContextualMenu currentLang="es" hidden={true} />
        </div>
      </div>
    </div>
  ),
  name: 'Estados del Componente',
  parameters: {
    docs: {
      description: {
        story: 'HeaderContextualMenu mostrando diferentes estados visuales: normal, hover y focus. Útil para verificar la accesibilidad y estilos.',
      },
    },
  },
}

// Menú contextual en contexto de header
export const InHeaderContext: Story = {
  render: () => (
    <div className="w-full bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border p-4">
          {/* Avatar simulado */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              MV
            </div>
            <span className="text-gray-600 font-medium">Mario Verdú</span>
          </div>
          
          {/* Tabs de navegación simuladas */}
          <div className="flex space-x-6">
            <button className="text-gray-600 hover:text-cyan-600 px-3 py-2 rounded-md transition-colors">
              Inicio
            </button>
            <button className="text-gray-600 hover:text-cyan-600 px-3 py-2 rounded-md transition-colors">
              Posts
            </button>
            <button className="text-gray-600 hover:text-cyan-600 px-3 py-2 rounded-md transition-colors">
              Experiencia
            </button>
          </div>
          
          {/* HeaderContextualMenu */}
          <HeaderContextualMenu 
            currentLang="es" 
            hidden={true}
            onLanguageChange={(lang) => console.log(`Idioma cambiado a: ${lang}`)}
          />
        </div>
      </div>
    </div>
  ),
  name: 'En Contexto de Header',
  parameters: {
    docs: {
      description: {
        story: 'HeaderContextualMenu integrado en un header completo simulado, mostrando cómo se ve y funciona en su contexto real de uso.',
      },
    },
  },
}

// Historia específica para mostrar la nueva estructura
export const NewStructure: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Nueva Estructura del Menú</h3>
        <p className="text-sm text-gray-600 mb-4">El menú ahora tiene secciones organizadas con encabezados en mayúsculas y toggle de tema.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Estructura anterior */}
        <div className="text-center">
          <h4 className="font-medium text-gray-600 mb-2">Estructura Anterior</h4>
          <div className="bg-gray-100 p-4 rounded-lg inline-block">
            <div className="w-48 bg-white border border-gray-300 rounded-md shadow-sm">
              <div className="py-1">
                <div className="px-4 py-2 text-sm text-gray-600 flex items-center space-x-2">
                  <span>🇪🇸</span>
                  <span>Español</span>
                  <svg className="w-4 h-4 ml-auto text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="px-4 py-2 text-sm text-gray-600 flex items-center space-x-2">
                  <span>🇺🇸</span>
                  <span>English</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Menú simple sin secciones</p>
        </div>
        
        {/* Estructura nueva */}
        <div className="text-center">
          <h4 className="font-medium text-gray-600 mb-2">Estructura Nueva</h4>
          <div className="bg-blue-100 p-4 rounded-lg inline-block">
            <div className="w-56 bg-white border border-gray-300 rounded-md shadow-sm">
              {/* Sección IDIOMA */}
              <div className="py-3">
                <div className="px-4 py-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    IDIOMA
                  </h3>
                </div>
                <div className="py-1">
                  <div className="px-4 py-2 text-sm text-cyan-700 bg-cyan-50 flex items-center space-x-2">
                    <span>🇪🇸</span>
                    <span>Español</span>
                    <svg className="w-4 h-4 ml-auto text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="px-4 py-2 text-sm text-gray-600 flex items-center space-x-2">
                    <span>🇺🇸</span>
                    <span>English</span>
                  </div>
                </div>
              </div>
              
              {/* Separador */}
              <div className="border-t border-gray-200 mx-4"></div>
              
              {/* Footer con toggle */}
              <div className="py-3 px-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600">Tema</span>
                  <div className="p-2 rounded-md bg-gray-50 text-gray-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Secciones organizadas + toggle</p>
        </div>
      </div>
      
      {/* Componente real */}
      <div className="text-center">
        <h4 className="font-medium text-gray-600 mb-2">Componente Real</h4>
        <HeaderContextualMenu currentLang="es" hidden={true} />
        <p className="text-xs text-gray-500 mt-2">HeaderContextualMenu con nueva estructura</p>
      </div>
    </div>
  ),
  name: 'Nueva Estructura del Menú',
  parameters: {
    docs: {
      description: {
        story: 'Comparación visual entre la estructura anterior y la nueva estructura organizada del menú contextual.',
      },
    },
  },
}
