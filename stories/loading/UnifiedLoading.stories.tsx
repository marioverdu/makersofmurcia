import type { Meta, StoryObj } from '@storybook/react';
import { UnifiedLoading } from '@/components/ui/unified-loading';

const meta: Meta<typeof UnifiedLoading> = {
  title: 'UnifiedLoading',
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
