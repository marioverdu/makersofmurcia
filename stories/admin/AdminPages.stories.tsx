import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// Componente genérico para mostrar una ruta real en un iframe
const RealRouteFrame = ({ path }: { path: string }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const devUrl = `http://localhost:3000${path}`;

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setError('Error al cargar la página. Asegúrate de ejecutar: npm run dev (puerto 3000)');
    setIsLoading(false);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {isLoading && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '48px', height: '48px', border: '2px solid #e5e7eb', borderTop: '2px solid #3b82f6',
              borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px'
            }} />
            <p style={{ color: '#6b7280', margin: 0 }}>Cargando {path}...</p>
            <p style={{ color: '#9ca3af', fontSize: '14px', margin: '8px 0 0 0' }}>URL: {devUrl}</p>
          </div>
        </div>
      )}

      {error && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10
        }}>
          <div style={{ textAlign: 'center', maxWidth: '400px', padding: '24px' }}>
            <div style={{ fontSize: '64px', color: '#ef4444', marginBottom: '16px' }}>⚠️</div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>Error al cargar</h3>
            <p style={{ color: '#6b7280', marginBottom: '16px' }}>{error}</p>
            <div style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px', fontSize: '14px' }}>
              <p style={{ fontWeight: '600', marginBottom: '8px' }}>Pasos:</p>
              <ol style={{ textAlign: 'left', paddingLeft: '20px' }}>
                <li>Ejecuta <code style={{ backgroundColor: 'white', padding: '2px 4px', borderRadius: '4px' }}>npm run dev</code></li>
                <li>Comprueba que la ruta <code style={{ backgroundColor: 'white', padding: '2px 4px', borderRadius: '4px' }}>{path}</code> funciona</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      <iframe
        src={devUrl}
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        onLoad={handleLoad}
        onError={handleError}
        title={`Real route - ${path}`}
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

const meta: Meta<typeof RealRouteFrame> = {
  title: 'Admin',
  component: RealRouteFrame,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Páginas reales de /admin cargadas directamente desde el servidor de desarrollo en un iframe. Cada historia usa el path real como nombre.'
      }
    }
  },
  argTypes: {
    path: {
      control: false,
      description: 'Path absoluto de la ruta admin (por ejemplo, /admin/routes)'
    }
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
type Story = StoryObj<typeof RealRouteFrame>;

// Historias por cada ruta admin detectada. El nombre visible es exactamente el path.

export const AdminRoot: Story = {
  name: '/admin',
  args: { path: '/admin' },
};

export const AdminRoutes: Story = {
  name: '/admin/routes',
  args: { path: '/admin/routes' },
};

export const AdminBooking: Story = {
  name: '/admin/booking',
  args: { path: '/admin/booking' },
};

export const AdminAnalytics: Story = {
  name: '/admin/analytics',
  args: { path: '/admin/analytics' },
};

export const AdminPosts: Story = {
  name: '/admin/posts',
  args: { path: '/admin/posts' },
};


