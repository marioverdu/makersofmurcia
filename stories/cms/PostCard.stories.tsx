import type { Meta, StoryObj } from '@storybook/react';
import { PostCard } from '@/components/post-card';

const meta: Meta<typeof PostCard> = {
  title: 'CMS/PostCard',
  component: PostCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tarjeta de post con soporte para diferentes tipos de contenido (foto, quote, música, video, etc.)'
      }
    }
  },
  tags: ['autodocs'],
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
  }
};

export const PhotoPost: Story = {
  args: {
    id: '2',
    title: 'Foto del día',
    excerpt: 'Una hermosa foto que tomé hoy...',
    content: 'Descripción de la foto...',
    contentType: 'photo',
    coverImage: 'https://via.placeholder.com/400x500',
    date: '2025-01-17T12:00:00Z',
    tags: ['foto', 'arte']
  }
};

export const QuotePost: Story = {
  args: {
    id: '3',
    title: 'Cita inspiradora',
    excerpt: 'Una cita que me inspiró hoy...',
    content: '> La vida es lo que pasa mientras estás ocupado haciendo otros planes. - John Lennon',
    contentType: 'quote',
    coverImage: '',
    date: '2025-01-17T14:00:00Z',
    tags: ['cita', 'inspiración']
  }
};

export const MusicPlayerPost: Story = {
  args: {
    id: '4',
    title: 'Mi canción favorita',
    excerpt: 'Compartiendo mi canción favorita del momento...',
    content: 'SoundCloud player embed code here...',
    contentType: 'music-player',
    coverImage: '',
    date: '2025-01-17T16:00:00Z',
    tags: ['música', 'soundcloud']
  }
};

export const VideoPlayerPost: Story = {
  args: {
    id: '5',
    title: 'Video tutorial',
    excerpt: 'Un video tutorial que creé...',
    content: 'video-id="dQw4w9WgXcQ"',
    contentType: 'video-player',
    coverImage: '',
    date: '2025-01-17T18:00:00Z',
    tags: ['video', 'tutorial', 'youtube']
  }
};

export const AsciiArtPost: Story = {
  args: {
    id: '6',
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
    date: '2025-01-17T20:00:00Z',
    tags: ['ascii', 'arte', 'texto']
  }
};

export const PostPlus: Story = {
  args: {
    id: '7',
    title: 'Post premium',
    excerpt: 'Este es un post con contenido premium...',
    content: 'Contenido premium del post...',
    contentType: 'post+',
    coverImage: 'https://via.placeholder.com/400x500',
    date: '2025-01-17T22:00:00Z',
    tags: ['premium', 'especial']
  }
};

export const NoTags: Story = {
  args: {
    id: '8',
    title: 'Post sin etiquetas',
    excerpt: 'Este post no tiene etiquetas...',
    content: 'Contenido del post...',
    contentType: 'post',
    coverImage: 'https://via.placeholder.com/400x500',
    date: '2025-01-17T23:00:00Z',
    tags: []
  }
};

export const LongTitle: Story = {
  args: {
    id: '9',
    title: 'Este es un título muy largo que podría causar problemas de diseño en la tarjeta del post del blog y necesitar manejo especial',
    excerpt: 'Extracto normal del post...',
    content: 'Contenido del post...',
    contentType: 'post',
    coverImage: 'https://via.placeholder.com/400x500',
    date: '2025-01-17T23:30:00Z',
    tags: ['título-largo', 'diseño']
  }
};
