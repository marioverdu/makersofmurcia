import type { Meta, StoryObj } from '@storybook/react';
import { PostManagement } from '@/components/post-management';

const meta: Meta<typeof PostManagement> = {
  title: 'PostManagement',
  component: PostManagement,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Sistema completo de gestión de posts con editor y lista de posts'
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
      description: 'Post seleccionado para editar'
    },
    formData: {
      control: 'object',
      description: 'Datos del formulario de edición'
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
  }
];

const mockFormData = {
  title: 'Mi primer post en el blog',
  excerpt: 'Este es un extracto del contenido del post...',
  content: 'Contenido completo del post aquí...',
  contentType: 'post',
  coverImage: 'https://via.placeholder.com/400x500',
  date: '2025-01-17T10:00:00Z',
  tags: ['blog', 'primer-post']
};

const mockErrors = {};

export const Default: Story = {
  args: {
    posts: mockPosts,
    selectedPost: mockPosts[0],
    formData: mockFormData,
    date: new Date('2025-01-17T10:00:00Z'),
    errors: mockErrors,
    isLoading: false,
    isSaving: false
  }
};

