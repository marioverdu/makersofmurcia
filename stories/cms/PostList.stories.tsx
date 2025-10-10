import type { Meta, StoryObj } from '@storybook/react';
import { PostList } from '@/components/post-management/post-list';

const meta: Meta<typeof PostList> = {
  title: 'PostList',
  component: PostList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Lista de posts con funcionalidades de búsqueda, selección y eliminación'
      }
    }
  },
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
