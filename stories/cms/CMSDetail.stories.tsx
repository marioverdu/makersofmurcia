import type { Meta, StoryObj } from '@storybook/react';
import CMSDetail from '@/components/cms/CMSDetail';

const meta: Meta<typeof CMSDetail> = {
  title: 'CMSDetail',
  component: CMSDetail,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Vista detallada de un post individual con contenido completo'
      }
    }
  },
  argTypes: {
    post: {
      control: 'object',
      description: 'Objeto completo del post'
    },
    lang: {
      control: 'select',
      options: ['es', 'en'],
      description: 'Idioma del contenido'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockPost = {
  id: 1,
  title: 'Mi primer post en el blog',
  excerpt: 'Este es un extracto del contenido del post que se mostrará en la tarjeta del feed...',
  content: `
# Mi primer post en el blog

Este es el contenido completo del post que incluye:

## Características principales

- **Markdown** soportado
- **Tablas** como la siguiente:

| Nombre | Estado | Prioridad |
|--------|--------|-----------|
| Proyecto A | En progreso | Alta |
| Proyecto B | Completado | Media |

## Código de ejemplo

\`\`\`javascript
function saludar(nombre) {
  return \`¡Hola \${nombre}!\`;
}
\`\`\`

## Conclusión

Este es un post de ejemplo para mostrar todas las funcionalidades del CMS.
  `,
  publishedAt: new Date('2025-08-17T17:00:00Z'),
  author: 'Mario Verdú',
  views: 42,
  featuredImage: 'https://via.placeholder.com/800x400'
};

export const Default: Story = {
  args: {
    post: mockPost,
    lang: 'es'
  }
};

