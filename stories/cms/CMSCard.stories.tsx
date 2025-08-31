import type { Meta, StoryObj } from '@storybook/react';
import { CMSCard } from '@/components/cms/CMSCard';

const meta: Meta<typeof CMSCard> = {
  title: 'CMS/Card',
  component: CMSCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tarjeta de post para el feed público de posts'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Título del post'
    },
    excerpt: {
      control: 'text',
      description: 'Extracto del contenido del post'
    },
    publishedAt: {
      control: 'date',
      description: 'Fecha de publicación'
    },
    author: {
      control: 'text',
      description: 'Autor del post'
    },
    views: {
      control: 'number',
      description: 'Número de vistas'
    },
    featuredImage: {
      control: 'text',
      description: 'URL de la imagen destacada'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Mi primer post en el blog',
    excerpt: 'Este es un extracto del contenido del post que se mostrará en la tarjeta del feed...',
    publishedAt: new Date('2025-08-17T17:00:00Z'),
    author: 'Mario Verdú',
    views: 42,
    featuredImage: 'https://via.placeholder.com/400x200'
  }
};

export const LongTitle: Story = {
  args: {
    title: 'Este es un título muy largo que podría causar problemas de diseño en la tarjeta del post del blog',
    excerpt: 'Extracto normal del post...',
    publishedAt: new Date('2025-08-17T17:00:00Z'),
    author: 'Mario Verdú',
    views: 15,
    featuredImage: 'https://via.placeholder.com/400x200'
  }
};

export const NoImage: Story = {
  args: {
    title: 'Post sin imagen destacada',
    excerpt: 'Este post no tiene imagen destacada configurada',
    publishedAt: new Date('2025-08-17T17:00:00Z'),
    author: 'Mario Verdú',
    views: 8
  }
};

export const HighViews: Story = {
  args: {
    title: 'Post muy popular',
    excerpt: 'Este post ha tenido muchas visitas y es muy popular entre los lectores',
    publishedAt: new Date('2025-08-15T10:00:00Z'),
    author: 'Mario Verdú',
    views: 1250,
    featuredImage: 'https://via.placeholder.com/400x200'
  }
};

export const RecentPost: Story = {
  args: {
    title: 'Post reciente',
    excerpt: 'Este post fue publicado hace muy poco tiempo',
    publishedAt: new Date(),
    author: 'Mario Verdú',
    views: 0,
    featuredImage: 'https://via.placeholder.com/400x200'
  }
};
