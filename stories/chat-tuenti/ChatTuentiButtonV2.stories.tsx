import type { Meta, StoryObj } from '@storybook/react';
import ChatTuentiButtonV2 from '../../components/chat-tuenti/chat-tuenti-button-master';

const meta: Meta<typeof ChatTuentiButtonV2> = {
  title: 'Components/Chat/ChatTuentiButtonV2',
  component: ChatTuentiButtonV2,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Botón flotante de chat con diseño exacto del botón real de Tuenti',
      },
    },
  },
  tags: ['autodocs'],
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

// Estado abierto del botón
export const Open: Story = {
  args: {
    isBlinking: false,
    ariaLabel: 'Close chat',
    isOpen: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Botón en estado abierto mostrando el ícono de cerrar (X).',
      },
    },
  },
};

// Diferentes posiciones
export const BottomLeft: Story = {
  args: {
    position: 'bottom-left',
    size: 36,
    isBlinking: false,
    ariaLabel: 'Open chat',
    isOpen: false,
    padding: {
      bottom: 14,
      left: 14,
    },
    colors: {
      background: 'transparent',
      backgroundHover: 'transparent',
      icon: 'currentColor',
    },
  },
};

export const TopRight: Story = {
  args: {
    position: 'top-right',
    size: 36,
    isBlinking: false,
    ariaLabel: 'Open chat',
    isOpen: false,
    padding: {
      top: 14,
      right: 14,
    },
    colors: {
      background: 'transparent',
      backgroundHover: 'transparent',
      icon: 'currentColor',
    },
  },
};

export const TopLeft: Story = {
  args: {
    position: 'top-left',
    size: 36,
    isBlinking: false,
    ariaLabel: 'Open chat',
    isOpen: false,
    padding: {
      top: 14,
      left: 14,
    },
    colors: {
      background: 'transparent',
      backgroundHover: 'transparent',
      icon: 'currentColor',
    },
  },
};

// Tamaños diferentes
export const Large: Story = {
  args: {
    position: 'bottom-right',
    size: 48,
    isBlinking: false,
    ariaLabel: 'Open chat',
    isOpen: false,
    padding: {
      bottom: 14,
      right: 14,
    },
    colors: {
      background: 'transparent',
      backgroundHover: 'transparent',
      icon: 'currentColor',
    },
  },
};

export const Small: Story = {
  args: {
    position: 'bottom-right',
    size: 28,
    isBlinking: false,
    ariaLabel: 'Open chat',
    isOpen: false,
    padding: {
      bottom: 14,
      right: 14,
    },
    colors: {
      background: 'transparent',
      backgroundHover: 'transparent',
      icon: 'currentColor',
    },
  },
};

// Efectos especiales
export const Blinking: Story = {
  args: {
    position: 'bottom-right',
    size: 36,
    isBlinking: true,
    ariaLabel: 'Open chat',
    isOpen: false,
    padding: {
      bottom: 14,
      right: 14,
    },
    colors: {
      background: 'transparent',
      backgroundHover: 'transparent',
      icon: 'currentColor',
    },
  },
};

// Con colores personalizados
export const CustomColors: Story = {
  args: {
    position: 'bottom-right',
    size: 36,
    isBlinking: false,
    ariaLabel: 'Open chat',
    isOpen: false,
    padding: {
      bottom: 14,
      right: 14,
    },
    colors: {
      background: '#ff6b6b',
      backgroundHover: '#ff5252',
      icon: '#ffffff',
    },
  },
};
