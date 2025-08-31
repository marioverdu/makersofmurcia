import type { Meta, StoryObj } from '@storybook/react';
import { UnifiedLoading } from '@/components/ui/unified-loading';

const meta: Meta<typeof UnifiedLoading> = {
  title: 'Loading System/Unified Loading',
  component: UnifiedLoading,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente de loading unificado para todo el sistema. Tamaño estándar 32px, color accent #000000 (negro), sin texto. Diseño Material Design (CircularProgress). Este es el único loading que debe usarse en toda la aplicación.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'number', min: 16, max: 128, step: 8 },
      description: 'Tamaño del spinner (por defecto 32px - Material Design)',
    },
    color: {
      control: { type: 'color' },
      description: 'Color del spinner (por defecto #000000 - negro)',
    },
    className: {
      control: { type: 'text' },
      description: 'Clases CSS adicionales',
    },
  },
};

export default meta;
type Story = StoryObj<typeof UnifiedLoading>;

// Loading estándar (32px, color negro) - Material Design
export const Default: Story = {
  args: {},
  render: (args) => (
    <div className="min-h-[200px] bg-gray-50 rounded-lg flex items-center justify-center">
      <UnifiedLoading {...args} />
    </div>
  ),
};

// Diferentes tamaños
export const DifferentSizes: Story = {
  render: () => (
    <div className="min-h-[200px] bg-gray-50 rounded-lg flex items-center justify-center gap-8">
      <div className="text-center">
        <UnifiedLoading size={16} />
        <p className="text-xs text-gray-600 mt-2">16px</p>
      </div>
      <div className="text-center">
        <UnifiedLoading size={32} />
        <p className="text-xs text-gray-600 mt-2">32px (Default)</p>
      </div>
      <div className="text-center">
        <UnifiedLoading size={48} />
        <p className="text-xs text-gray-600 mt-2">48px</p>
      </div>
      <div className="text-center">
        <UnifiedLoading size={64} />
        <p className="text-xs text-gray-600 mt-2">64px</p>
      </div>
    </div>
  ),
};

// Diferentes colores
export const DifferentColors: Story = {
  render: () => (
    <div className="min-h-[200px] bg-gray-50 rounded-lg flex items-center justify-center gap-8">
      <div className="text-center">
        <UnifiedLoading color="#000000" />
        <p className="text-xs text-gray-600 mt-2">Negro (Default)</p>
      </div>
      <div className="text-center">
        <UnifiedLoading color="#10b981" />
        <p className="text-xs text-gray-600 mt-2">Verde</p>
      </div>
      <div className="text-center">
        <UnifiedLoading color="#f59e0b" />
        <p className="text-xs text-gray-600 mt-2">Naranja</p>
      </div>
      <div className="text-center">
        <UnifiedLoading color="#ef4444" />
        <p className="text-xs text-gray-600 mt-2">Rojo</p>
      </div>
    </div>
  ),
};

// Diferentes contextos
export const DifferentContexts: Story = {
  render: () => (
    <div className="min-h-[400px] bg-gray-50 rounded-lg p-8 space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Página completa</h3>
        <div className="min-h-[100px] bg-white rounded-lg flex items-center justify-center">
          <UnifiedLoading size={48} />
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Componente</h3>
        <div className="min-h-[80px] bg-white rounded-lg flex items-center justify-center">
          <UnifiedLoading size={32} />
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Botón</h3>
        <div className="min-h-[60px] bg-white rounded-lg flex items-center justify-center">
          <UnifiedLoading size={16} />
        </div>
      </div>
    </div>
  ),
};

// Diferentes fondos
export const DifferentBackgrounds: Story = {
  render: () => (
    <div className="min-h-[300px] rounded-lg grid grid-cols-2 gap-4 p-4">
      <div className="bg-white rounded-lg flex items-center justify-center min-h-[120px]">
        <UnifiedLoading />
      </div>
      <div className="bg-gray-800 rounded-lg flex items-center justify-center min-h-[120px]">
        <UnifiedLoading color="#ffffff" />
      </div>
      <div className="bg-cyan-500 rounded-lg flex items-center justify-center min-h-[120px]">
        <UnifiedLoading color="#ffffff" />
      </div>
      <div className="bg-green-500 rounded-lg flex items-center justify-center min-h-[120px]">
        <UnifiedLoading color="#ffffff" />
      </div>
    </div>
  ),
};

// Documentación del sistema
export const SystemDocumentation: Story = {
  render: () => (
    <div className="min-h-[400px] bg-gray-50 rounded-lg p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Sistema de Loading Unificado</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Características</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• <strong>Tamaño estándar:</strong> 32px (Material Design)</li>
              <li>• <strong>Color accent:</strong> #000000 (negro por defecto)</li>
              <li>• <strong>Sin texto:</strong> Solo spinner, sin copy</li>
              <li>• <strong>Diseño:</strong> Material Design (CircularProgress)</li>
              <li>• <strong>Consistencia:</strong> Mismo diseño en toda la aplicación</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Uso</h3>
            <div className="bg-gray-800 text-green-400 p-4 rounded-lg text-sm font-mono">
              <div>import {'{'} UnifiedLoading {'}'} from '@/components/ui/unified-loading'</div>
              <br />
              <div>&lt;UnifiedLoading /&gt;</div>
              <div>&lt;UnifiedLoading size={64} /&gt;</div>
              <div>&lt;UnifiedLoading color="#ef4444" /&gt;</div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-white rounded-lg border">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Ejemplo en acción</h3>
          <div className="flex items-center justify-center">
            <UnifiedLoading size={48} />
          </div>
        </div>
      </div>
    </div>
  ),
};
