import type { Meta, StoryObj } from '@storybook/react';
import CMSDetail from '@/components/cms/CMSDetail';

const meta: Meta<typeof CMSDetail> = {
  title: 'CMS/Detail',
  component: CMSDetail,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Vista detallada de un post individual con contenido completo'
      }
    }
  },
  tags: ['autodocs'],
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

export const EnglishPost: Story = {
  args: {
    post: {
      ...mockPost,
      title: 'My first blog post',
      excerpt: 'This is an excerpt of the post content that will be displayed in the feed card...',
      content: `
# My first blog post

This is the complete post content that includes:

## Main features

- **Markdown** support
- **Tables** like the following:

| Name | Status | Priority |
|------|--------|----------|
| Project A | In Progress | High |
| Project B | Completed | Medium |

## Code example

\`\`\`javascript
function greet(name) {
  return \`Hello \${name}!\`;
}
\`\`\`

## Conclusion

This is an example post to show all CMS functionalities.
      `,
      author: 'Mario Verdú'
    },
    lang: 'en'
  }
};

export const LongContent: Story = {
  args: {
    post: {
      ...mockPost,
      title: 'Post con contenido muy largo',
      content: `
# Post con contenido muy largo

Este post tiene mucho contenido para probar el scroll y la presentación.

## Sección 1

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Sección 2

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

## Sección 3

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

## Sección 4

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Sección 5

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.

## Sección 6

Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

## Sección 7

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.

## Sección 8

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam.

## Sección 9

Eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.

## Sección 10

Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.
      `
    },
    lang: 'es'
  }
};

export const NoImage: Story = {
  args: {
    post: {
      ...mockPost,
      title: 'Post sin imagen destacada',
      featuredImage: undefined
    },
    lang: 'es'
  }
};

export const HighViews: Story = {
  args: {
    post: {
      ...mockPost,
      title: 'Post muy popular',
      views: 1250
    },
    lang: 'es'
  }
};
