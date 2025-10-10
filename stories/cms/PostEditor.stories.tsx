import type { Meta, StoryObj } from '@storybook/react';
import { PostEditor } from '@/components/post-management/post-editor';

const meta: Meta<typeof PostEditor> = {
  title: 'PostEditor',
  component: PostEditor,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Editor de posts con soporte para diferentes tipos de contenido y validación'
      }
    }
  },
  argTypes: {
    formData: {
      control: 'object',
      description: 'Datos del formulario de edición'
    },
    selectedPost: {
      control: 'object',
      description: 'Post seleccionado para editar'
    },
    date: {
      control: 'date',
      description: 'Fecha seleccionada'
    },
    errors: {
      control: 'object',
      description: 'Errores de validación del formulario'
    },
    isLoading: {
      control: 'boolean',
      description: 'Estado de carga'
    },
    isSaving: {
      control: 'boolean',
      description: 'Estado de guardado'
    },
    onInputChange: {
      action: 'input changed',
      description: 'Callback cuando cambia un campo del formulario'
    },
    onSave: {
      action: 'post saved',
      description: 'Callback para guardar el post'
    },
    onDateSelect: {
      action: 'date selected',
      description: 'Callback cuando se selecciona una fecha'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockFormData = {
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
  contentType: 'post',
  coverImage: 'https://via.placeholder.com/400x500',
  date: '2025-01-17T10:00:00Z',
  tags: ['blog', 'primer-post', 'markdown']
};

const mockSelectedPost = {
  id: '1',
  title: 'Mi primer post en el blog',
  excerpt: 'Este es un extracto del contenido del post...',
  content: 'Contenido completo del post aquí...',
  contentType: 'post',
  coverImage: 'https://via.placeholder.com/400x500',
  date: '2025-01-17T10:00:00Z',
  tags: ['blog', 'primer-post'],
  created_at: '2025-01-17T10:00:00Z',
  updated_at: '2025-01-17T10:00:00Z'
};

const mockErrors = {};

export const Default: Story = {
  args: {
    formData: mockFormData,
    selectedPost: mockSelectedPost,
    date: new Date('2025-01-17T10:00:00Z'),
    errors: mockErrors,
    isLoading: false,
    isSaving: false
  }
};

/* export const NewPost: Story = {
  args: {
    formData: {
      title: '',
      excerpt: '',
      content: '',
      contentType: 'post',
      coverImage: '',
      date: '',
      tags: []
    },
    selectedPost: null,
    date: undefined,
    errors: {},
    isLoading: false,
    isSaving: false
  }
}; */

/* export const WithErrors: Story = {
  args: {
    formData: mockFormData,
    selectedPost: mockSelectedPost,
    date: new Date('2025-01-17T10:00:00Z'),
    errors: {
      title: 'El título es requerido',
      content: 'El contenido no puede estar vacío',
      excerpt: 'El extracto es muy corto'
    },
    isLoading: false,
    isSaving: false
  }
}; */

/* export const Loading: Story = {
  args: {
    formData: mockFormData,
    selectedPost: mockSelectedPost,
    date: new Date('2025-01-17T10:00:00Z'),
    errors: {},
    isLoading: true,
    isSaving: false
  }
}; */

/* export const Saving: Story = {
  args: {
    formData: mockFormData,
    selectedPost: mockSelectedPost,
    date: new Date('2025-01-17T10:00:00Z'),
    errors: {},
    isLoading: false,
    isSaving: true
  }
}; */

/* export const PhotoPost: Story = {
  args: {
    formData: {
      ...mockFormData,
      title: 'Foto del día',
      excerpt: 'Una hermosa foto que tomé hoy...',
      content: 'Descripción de la foto...',
      contentType: 'photo',
      tags: ['foto', 'arte']
    },
    selectedPost: {
      ...mockSelectedPost,
      title: 'Foto del día',
      contentType: 'photo'
    },
    date: new Date('2025-01-17T12:00:00Z'),
    errors: {},
    isLoading: false,
    isSaving: false
  }
}; */

/* export const QuotePost: Story = {
  args: {
    formData: {
      ...mockFormData,
      title: 'Cita inspiradora',
      excerpt: 'Una cita que me inspiró hoy...',
      content: '> La vida es lo que pasa mientras estás ocupado haciendo otros planes. - John Lennon',
      contentType: 'quote',
      tags: ['cita', 'inspiración']
    },
    selectedPost: {
      ...mockSelectedPost,
      title: 'Cita inspiradora',
      contentType: 'quote'
    },
    date: new Date('2025-01-17T14:00:00Z'),
    errors: {},
    isLoading: false,
    isSaving: false
  }
}; */

/* export const MusicPlayerPost: Story = {
  args: {
    formData: {
      ...mockFormData,
      title: 'Mi canción favorita',
      excerpt: 'Compartiendo mi canción favorita del momento...',
      content: '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/123456789&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>',
      contentType: 'music-player',
      tags: ['música', 'soundcloud']
    },
    selectedPost: {
      ...mockSelectedPost,
      title: 'Mi canción favorita',
      contentType: 'music-player'
    },
    date: new Date('2025-01-17T16:00:00Z'),
    errors: {},
    isLoading: false,
    isSaving: false
  }
}; */

/* export const VideoPlayerPost: Story = {
  args: {
    formData: {
      ...mockFormData,
      title: 'Video tutorial',
      excerpt: 'Un video tutorial que creé...',
      content: 'video-id="dQw4w9WgXcQ"',
      contentType: 'video-player',
      tags: ['video', 'tutorial', 'youtube']
    },
    selectedPost: {
      ...mockSelectedPost,
      title: 'Video tutorial',
      contentType: 'video-player'
    },
    date: new Date('2025-01-17T18:00:00Z'),
    errors: {},
    isLoading: false,
    isSaving: false
  }
}; */

/* export const AsciiArtPost: Story = {
  args: {
    formData: {
      ...mockFormData,
      title: 'Arte ASCII',
      excerpt: 'Creé este arte ASCII...',
      content: `  _____
 /     \\
| () () |
 \\  ^  /
  |||||
  |||||`,
      contentType: 'ascii-art',
      tags: ['ascii', 'arte', 'texto']
    },
    selectedPost: {
      ...mockSelectedPost,
      title: 'Arte ASCII',
      contentType: 'ascii-art'
    },
    date: new Date('2025-01-17T20:00:00Z'),
    errors: {},
    isLoading: false,
    isSaving: false
  }
}; */

/* export const PostPlus: Story = {
  args: {
    formData: {
      ...mockFormData,
      title: 'Post premium',
      excerpt: 'Este es un post con contenido premium...',
      content: 'Contenido premium del post...',
      contentType: 'post+',
      tags: ['premium', 'especial']
    },
    selectedPost: {
      ...mockSelectedPost,
      title: 'Post premium',
      contentType: 'post+'
    },
    date: new Date('2025-01-17T22:00:00Z'),
    errors: {},
    isLoading: false,
    isSaving: false
  }
}; */
