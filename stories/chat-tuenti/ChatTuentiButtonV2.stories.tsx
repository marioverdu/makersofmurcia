import type { Meta, StoryObj } from '@storybook/react';
import ChatTuentiButtonV2 from '../../components/chat-tuenti/chat-tuenti-button-master';

const meta: Meta<typeof ChatTuentiButtonV2> = {
  title: 'ChatTuentiButtonV2',
  component: ChatTuentiButtonV2,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Botón flotante de chat con diseño exacto del botón real de Tuenti',
      },
    },
  },
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['bottom-right', 'bottom-left', 'top-right', 'top-left'],
      description: 'Posición del botón en la pantalla',
    },
    size: {
      control: { type: 'number', min: 20, max: 100 },
      description: 'Tamaño del botón en píxeles',
    },
    isBlinking: {
      control: { type: 'boolean' },
      description: 'Efecto de parpadeo',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Texto de accesibilidad',
    },
    isOpen: {
      control: { type: 'boolean' },
      description: 'Estado abierto/cerrado del chat',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Réplica exacta del botón real con configuración por defecto
export const Default: Story = {
  args: {
    isBlinking: false,
    ariaLabel: 'Open chat',
    isOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Botón por defecto con posición bottom-right, tamaño 36px y padding de 14px. Réplica exacta del botón real.',
      },
    },
  },
};
