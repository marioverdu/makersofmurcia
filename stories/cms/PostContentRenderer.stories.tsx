import type { Meta, StoryObj } from '@storybook/react';
import { PostContentRenderer } from '@/components/post-content-renderer';

const meta: Meta<typeof PostContentRenderer> = {
  title: 'CMS/PostContentRenderer',
  component: PostContentRenderer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Renderizador de contenido de posts con soporte para diferentes tipos de contenido (Markdown, ASCII art, quotes, etc.)'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    post: {
      control: 'object',
      description: 'Objeto completo del post'
    },
    className: {
      control: 'text',
      description: 'Clases CSS adicionales'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockPost = {
  id: '1',
  title: 'Mi primer post en el blog',
  excerpt: 'Este es un extracto del contenido del post...',
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
  contentType: 'post',
  coverImage: 'https://via.placeholder.com/800x400',
  image: 'https://via.placeholder.com/800x400',
  created_at: '2025-01-17T10:00:00Z',
  updated_at: '2025-01-17T10:00:00Z'
};

export const Default: Story = {
  args: {
    post: mockPost,
    className: ''
  }
};

export const AsciiArt: Story = {
  args: {
    post: {
      ...mockPost,
      id: '2',
      title: 'Arte ASCII',
      content: `  _____
 /     \\
| () () |
 \\  ^  /
  |||||
  |||||`,
      contentType: 'ascii-art'
    },
    className: ''
  }
};

export const Quote: Story = {
  args: {
    post: {
      ...mockPost,
      id: '3',
      title: 'Cita inspiradora',
      content: '> La vida es lo que pasa mientras estás ocupado haciendo otros planes. - John Lennon',
      contentType: 'quote'
    },
    className: ''
  }
};

export const MusicPlayer: Story = {
  args: {
    post: {
      ...mockPost,
      id: '4',
      title: 'Mi canción favorita',
      content: '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/123456789&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>',
      contentType: 'music-player'
    },
    className: ''
  }
};

export const VideoPlayer: Story = {
  args: {
    post: {
      ...mockPost,
      id: '5',
      title: 'Video tutorial',
      content: 'video-id="dQw4w9WgXcQ"',
      contentType: 'video-player'
    },
    className: ''
  }
};

export const Photo: Story = {
  args: {
    post: {
      ...mockPost,
      id: '6',
      title: 'Foto del día',
      content: 'Una hermosa foto que tomé hoy durante mi paseo matutino.',
      contentType: 'photo',
      coverImage: 'https://via.placeholder.com/800x600',
      image: 'https://via.placeholder.com/800x600'
    },
    className: ''
  }
};

export const PostPlus: Story = {
  args: {
    post: {
      ...mockPost,
      id: '7',
      title: 'Post premium',
      content: `
# Post Premium

Este es un post con contenido premium que incluye:

## Características especiales

- **Contenido exclusivo**
- **Recursos descargables**
- **Acceso VIP**

### Beneficios

1. Acceso temprano a contenido
2. Recursos exclusivos
3. Soporte prioritario

\`\`\`bash
# Comando para acceder al contenido premium
npm install @premium-package
\`\`\`
      `,
      contentType: 'post+'
    },
    className: ''
  }
};

export const LongContent: Story = {
  args: {
    post: {
      ...mockPost,
      id: '8',
      title: 'Post con contenido extenso',
      content: `
# Post con contenido muy extenso

Este post contiene mucho contenido para probar el renderizado de posts largos.

## Sección 1

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

### Subsección 1.1

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

### Subsección 1.2

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

## Sección 2

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Subsección 2.1

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.

### Subsección 2.2

Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

## Sección 3

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

### Subsección 3.1

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.

### Subsección 3.2

Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.

## Conclusión

Este post extenso demuestra la capacidad del renderizador para manejar contenido largo y complejo.
      `,
      contentType: 'post'
    },
    className: ''
  }
};

export const NoContent: Story = {
  args: {
    post: {
      ...mockPost,
      id: '9',
      title: 'Post sin contenido',
      content: '',
      contentType: 'post'
    },
    className: ''
  }
};

export const CustomClassName: Story = {
  args: {
    post: mockPost,
    className: 'border-2 border-cyan-500 p-4 rounded-lg'
  }
};
