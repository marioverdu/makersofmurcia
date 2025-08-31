import type { Meta, StoryObj } from '@storybook/react';
import { PostList } from '@/components/post-management/post-list';

const meta: Meta<typeof PostList> = {
  title: 'CMS/PostList',
  component: PostList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Lista de posts con funcionalidades de búsqueda, selección y eliminación'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    posts: {
      control: 'object',
      description: 'Array de posts disponibles'
    },
    selectedPost: {
      control: 'object',
      description: 'Post seleccionado actualmente'
    },
    isLoading: {
      control: 'boolean',
      description: 'Estado de carga'
    },
    isSaving: {
      control: 'boolean',
      description: 'Estado de guardado'
    },
    onSelectPost: {
      action: 'post selected',
      description: 'Callback cuando se selecciona un post'
    },
    onNewPost: {
      action: 'new post',
      description: 'Callback para crear un nuevo post'
    },
    onDelete: {
      action: 'post deleted',
      description: 'Callback para eliminar un post'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockPosts = [
  {
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
  },
  {
    id: '2',
    title: 'Foto del día',
    excerpt: 'Una hermosa foto que tomé hoy...',
    content: 'Descripción de la foto...',
    contentType: 'photo',
    coverImage: 'https://via.placeholder.com/400x500',
    date: '2025-01-17T12:00:00Z',
    tags: ['foto', 'arte'],
    created_at: '2025-01-17T12:00:00Z',
    updated_at: '2025-01-17T12:00:00Z'
  },
  {
    id: '3',
    title: 'Cita inspiradora',
    excerpt: 'Una cita que me inspiró hoy...',
    content: '> La vida es lo que pasa mientras estás ocupado haciendo otros planes. - John Lennon',
    contentType: 'quote',
    coverImage: '',
    date: '2025-01-17T14:00:00Z',
    tags: ['cita', 'inspiración'],
    created_at: '2025-01-17T14:00:00Z',
    updated_at: '2025-01-17T14:00:00Z'
  },
  {
    id: '4',
    title: 'Mi canción favorita',
    excerpt: 'Compartiendo mi canción favorita del momento...',
    content: 'SoundCloud player embed code here...',
    contentType: 'music-player',
    coverImage: '',
    date: '2025-01-17T16:00:00Z',
    tags: ['música', 'soundcloud'],
    created_at: '2025-01-17T16:00:00Z',
    updated_at: '2025-01-17T16:00:00Z'
  },
  {
    id: '5',
    title: 'Video tutorial',
    excerpt: 'Un video tutorial que creé...',
    content: 'video-id="dQw4w9WgXcQ"',
    contentType: 'video-player',
    coverImage: '',
    date: '2025-01-17T18:00:00Z',
    tags: ['video', 'tutorial', 'youtube'],
    created_at: '2025-01-17T18:00:00Z',
    updated_at: '2025-01-17T18:00:00Z'
  }
];

export const Default: Story = {
  args: {
    posts: mockPosts,
    selectedPost: mockPosts[0],
    isLoading: false,
    isSaving: false
  }
};

export const NoPosts: Story = {
  args: {
    posts: [],
    selectedPost: null,
    isLoading: false,
    isSaving: false
  }
};

export const Loading: Story = {
  args: {
    posts: [],
    selectedPost: null,
    isLoading: true,
    isSaving: false
  }
};

export const Saving: Story = {
  args: {
    posts: mockPosts,
    selectedPost: mockPosts[0],
    isLoading: false,
    isSaving: true
  }
};

export const NoSelectedPost: Story = {
  args: {
    posts: mockPosts,
    selectedPost: null,
    isLoading: false,
    isSaving: false
  }
};

export const ManyPosts: Story = {
  args: {
    posts: [
      ...mockPosts,
      {
        id: '6',
        title: 'Post adicional 1',
        excerpt: 'Extracto del post adicional...',
        content: 'Contenido del post adicional...',
        contentType: 'post',
        coverImage: 'https://via.placeholder.com/400x500',
        date: '2025-01-16T10:00:00Z',
        tags: ['adicional'],
        created_at: '2025-01-16T10:00:00Z',
        updated_at: '2025-01-16T10:00:00Z'
      },
      {
        id: '7',
        title: 'Post adicional 2',
        excerpt: 'Extracto del segundo post adicional...',
        content: 'Contenido del segundo post adicional...',
        contentType: 'post+',
        coverImage: 'https://via.placeholder.com/400x500',
        date: '2025-01-15T10:00:00Z',
        tags: ['adicional', 'premium'],
        created_at: '2025-01-15T10:00:00Z',
        updated_at: '2025-01-15T10:00:00Z'
      },
      {
        id: '8',
        title: 'Arte ASCII',
        excerpt: 'Creé este arte ASCII...',
        content: `  _____
 /     \\
| () () |
 \\  ^  /
  |||||
  |||||`,
        contentType: 'ascii-art',
        coverImage: '',
        date: '2025-01-14T10:00:00Z',
        tags: ['ascii', 'arte', 'texto'],
        created_at: '2025-01-14T10:00:00Z',
        updated_at: '2025-01-14T10:00:00Z'
      }
    ],
    selectedPost: mockPosts[0],
    isLoading: false,
    isSaving: false
  }
};

export const DifferentContentTypes: Story = {
  args: {
    posts: [
      {
        id: '1',
        title: 'Post normal',
        excerpt: 'Un post normal con contenido estándar...',
        content: 'Contenido del post...',
        contentType: 'post',
        coverImage: 'https://via.placeholder.com/400x500',
        date: '2025-01-17T10:00:00Z',
        tags: ['normal'],
        created_at: '2025-01-17T10:00:00Z',
        updated_at: '2025-01-17T10:00:00Z'
      },
      {
        id: '2',
        title: 'Post premium',
        excerpt: 'Un post con contenido premium...',
        content: 'Contenido premium...',
        contentType: 'post+',
        coverImage: 'https://via.placeholder.com/400x500',
        date: '2025-01-17T12:00:00Z',
        tags: ['premium'],
        created_at: '2025-01-17T12:00:00Z',
        updated_at: '2025-01-17T12:00:00Z'
      },
      {
        id: '3',
        title: 'Foto',
        excerpt: 'Una foto...',
        content: 'Descripción de la foto...',
        contentType: 'photo',
        coverImage: 'https://via.placeholder.com/400x500',
        date: '2025-01-17T14:00:00Z',
        tags: ['foto'],
        created_at: '2025-01-17T14:00:00Z',
        updated_at: '2025-01-17T14:00:00Z'
      },
      {
        id: '4',
        title: 'Cita',
        excerpt: 'Una cita...',
        content: '> Cita inspiradora...',
        contentType: 'quote',
        coverImage: '',
        date: '2025-01-17T16:00:00Z',
        tags: ['cita'],
        created_at: '2025-01-17T16:00:00Z',
        updated_at: '2025-01-17T16:00:00Z'
      }
    ],
    selectedPost: null,
    isLoading: false,
    isSaving: false
  }
};

export const LongTitles: Story = {
  args: {
    posts: [
      {
        id: '1',
        title: 'Este es un título muy largo que podría causar problemas de diseño en la tarjeta del post del blog y necesitar manejo especial',
        excerpt: 'Extracto normal del post...',
        content: 'Contenido del post...',
        contentType: 'post',
        coverImage: 'https://via.placeholder.com/400x500',
        date: '2025-01-17T10:00:00Z',
        tags: ['título-largo'],
        created_at: '2025-01-17T10:00:00Z',
        updated_at: '2025-01-17T10:00:00Z'
      },
      {
        id: '2',
        title: 'Otro título extremadamente largo que también podría causar problemas de diseño y necesitar manejo especial en la interfaz',
        excerpt: 'Otro extracto...',
        content: 'Otro contenido...',
        contentType: 'post',
        coverImage: 'https://via.placeholder.com/400x500',
        date: '2025-01-17T12:00:00Z',
        tags: ['título-largo'],
        created_at: '2025-01-17T12:00:00Z',
        updated_at: '2025-01-17T12:00:00Z'
      }
    ],
    selectedPost: null,
    isLoading: false,
    isSaving: false
  }
};
