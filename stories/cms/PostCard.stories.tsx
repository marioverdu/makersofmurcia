import type { Meta, StoryObj } from '@storybook/react';
import { PostCard } from '@/components/post-card';

const meta: Meta<typeof PostCard> = {
  title: 'PostCard',
  component: PostCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tarjeta de post con soporte para diferentes tipos de contenido (foto, quote, música, video, etc.)'
      }
    }
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'ID único del post'
    },
    title: {
      control: 'text',
      description: 'Título del post'
    },
    excerpt: {
      control: 'text',
      description: 'Extracto del contenido del post'
    },
    content: {
      control: 'text',
      description: 'Contenido completo del post'
    },
    contentType: {
      control: 'select',
      options: ['post', 'post+', 'photo', 'quote', 'music-player', 'video-player', 'ascii-art'],
      description: 'Tipo de contenido del post'
    },
    coverImage: {
      control: 'text',
      description: 'URL de la imagen de portada'
    },
    date: {
      control: 'date',
      description: 'Fecha del post'
    },
    tags: {
      control: 'object',
      description: 'Array de etiquetas del post'
    },
    className: {
      control: 'text',
      description: 'Clases CSS adicionales'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: '1',
    title: 'Mi primer post en el blog',
    excerpt: 'Este es un extracto del contenido del post que se mostrará en la tarjeta...',
    content: 'Contenido completo del post aquí...',
    contentType: 'post',
    coverImage: 'https://via.placeholder.com/400x500',
    date: '2025-01-17T10:00:00Z',
    tags: ['blog', 'primer-post']
  },
};
