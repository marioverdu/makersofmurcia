import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// Componente que muestra la página real de posts en un iframe
const PostsPageReal = ({ lang, dict }: { lang: 'es' | 'en', dict: any }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // URL de la página real en desarrollo
  const devUrl = `http://localhost:3000/${lang}/posts`;

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setError('Error al cargar la página. Asegúrate de que el servidor de desarrollo esté ejecutándose en http://localhost:3000');
    setIsLoading(false);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '48px',
              height: '48px',
              border: '2px solid #e5e7eb',
              borderTop: '2px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px'
            }}></div>
            <p style={{ color: '#6b7280', margin: 0 }}>Cargando página real de posts...</p>
            <p style={{ color: '#9ca3af', fontSize: '14px', margin: '8px 0 0 0' }}>URL: {devUrl}</p>
          </div>
        </div>
      )}

      {error && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10
        }}>
          <div style={{ textAlign: 'center', maxWidth: '400px', padding: '24px' }}>
            <div style={{ fontSize: '64px', color: '#ef4444', marginBottom: '16px' }}>⚠️</div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>Error al cargar la página</h3>
            <p style={{ color: '#6b7280', marginBottom: '16px' }}>{error}</p>
            <div style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px', fontSize: '14px' }}>
              <p style={{ fontWeight: '600', marginBottom: '8px' }}>Para solucionarlo:</p>
              <ol style={{ textAlign: 'left', paddingLeft: '20px' }}>
                <li>Ejecuta <code style={{ backgroundColor: 'white', padding: '2px 4px', borderRadius: '4px' }}>npm run dev</code></li>
                <li>Asegúrate de que el servidor esté en puerto 3000</li>
                <li>Verifica que la ruta <code style={{ backgroundColor: 'white', padding: '2px 4px', borderRadius: '4px' }}>/{lang}/posts</code> funcione</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      <iframe
        src={devUrl}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block'
        }}
        onLoad={handleLoad}
        onError={handleError}
        title={`Posts Page - ${lang === 'es' ? 'Español' : 'English'}`}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
      />

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const meta: Meta<typeof PostsPageReal> = {
  title: 'Posts/Posts Page Real',
  component: PostsPageReal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Página real de posts cargada directamente desde el servidor de desarrollo. Muestra exactamente el mismo diseño y funcionalidad que se ve en /es/posts, ocupando toda la pantalla.',
      },
    },
  },
  argTypes: {
    lang: {
      control: { type: 'select' },
      options: ['es', 'en'],
      description: 'Idioma de la página',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100vw', height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PostsPageReal>;

// Mock del diccionario en español
const mockDictES = {
  posts: {
    title: "Posts",
    subtitle: "Artículos y publicaciones",
    aboutMe: "Sobre Mí",
    posts: "Posts",
    uiDeveloper: "Frontend Developer (Next.js / React)",
    hey: "¡Hola! 👋",
    loading: "Cargando posts...",
    noPosts: "No hay posts disponibles",
    pageUnderMaintenance: "Página en Mantenimiento",
    maintenanceMessage: "Estamos trabajando para mejorar la experiencia. Vuelve pronto.",
    developmentMode: "Modo Desarrollo",
    productionInfo: "Esta página está en desarrollo y no está disponible en producción.",
    notice: "Aviso:",
    samplePostsInfo: "Los posts de muestra no están disponibles en producción.",
    musicUnlocked: "¡Música desbloqueada! 🎵"
  }
};

// Mock del diccionario en inglés
const mockDictEN = {
  posts: {
    title: "Posts",
    subtitle: "Articles and publications",
    aboutMe: "About Me",
    posts: "Posts",
    uiDeveloper: "Frontend Developer (Next.js / React)",
    hey: "Hello! 👋",
    loading: "Loading posts...",
    noPosts: "No posts available",
    pageUnderMaintenance: "Page Under Maintenance",
    maintenanceMessage: "We're working to improve the experience. Come back soon.",
    developmentMode: "Development Mode",
    productionInfo: "This page is under development and not available in production.",
    notice: "Notice:",
    samplePostsInfo: "Sample posts are not available in production.",
    musicUnlocked: "Music unlocked! 🎵"
  }
};

// Página real en español
export const SpanishWithPosts: Story = {
  args: {
    lang: 'es',
    dict: mockDictES,
  },
  parameters: {
    docs: {
      description: {
        story: 'Página real de posts en español cargada desde http://localhost:3000/es/posts. Muestra exactamente el mismo diseño y funcionalidad que se ve en desarrollo, ocupando toda la pantalla.',
      },
    },
  },
};

// Página real en inglés
export const EnglishWithPosts: Story = {
  args: {
    lang: 'en',
    dict: mockDictEN,
  },
  parameters: {
    docs: {
      description: {
        story: 'Página real de posts en inglés cargada desde http://localhost:3000/en/posts. Demuestra la internacionalización completa de la aplicación.',
      },
    },
  },
};
