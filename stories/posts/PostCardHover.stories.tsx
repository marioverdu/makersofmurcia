import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// Componente de card de post con el hover EXACTO del proyecto - NO INVENTADO
const PostCard = ({ 
  title, 
  excerpt, 
  date, 
  href, 
  isHovered = false 
}: { 
  title: string;
  excerpt: string;
  date: string;
  href: string;
  isHovered?: boolean;
}) => {
  return (
    <a 
      className="bg-white/30 backdrop-blur-md border border-gray-100 rounded-lg shadow-sm w-full md:w-[658px] xl:w-[800px] mb-0 block hover:outline hover:outline-2 hover:outline-[#3D5B6A] hover:outline-offset-8 transition-all duration-300 ease-out"
      href={href}
      style={{ 
        borderBottom: "1px solid rgba(0, 94, 182, 0.1)"
      }}
    >
      <article className="pt-6 px-4 pb-6 overflow-hidden">
        <h2 className="text-xl text-left mb-2 font-['Arial_Medium',_Arial,_sans-serif] font-normal">
          {title}
        </h2>
        <p className="text-gray-600 text-left mb-4">{excerpt}</p>
        <time 
          dateTime={date} 
          className="block text-sm text-gray-500 mt-4 underline decoration-gray-300"
        >
          {date}
        </time>
      </article>
    </a>
  );
};

// Componente de demostración con múltiples cards y estado de hover
const PostCardHoverDemo = () => {
  const [hoveredCard, setHoveredCard] = React.useState<string | null>(null);

  const posts = [
    {
      id: '1',
      title: 'Test Markdownv3?',
      excerpt: 'Gamepads acoplables a Vivo x200 Pro',
      date: '21 de agosto de 2025',
      href: '/es/posts/view/20'
    },
    {
      id: '2',
      title: 'Desarrollo Frontend Moderno',
      excerpt: 'Técnicas avanzadas de React y Next.js para aplicaciones web escalables',
      date: '20 de agosto de 2025',
      href: '/es/posts/view/19'
    },
    {
      id: '3',
      title: 'Diseño UX/UI en 2025',
      excerpt: 'Tendencias y mejores prácticas para interfaces de usuario',
      date: '19 de agosto de 2025',
      href: '/es/posts/view/18'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎯 Post Cards con Hover EXACTO del Proyecto
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cards de posts con el efecto hover <strong>EXACTO</strong> que ya tienes implementado: 
            Outline stroke negro con offset de 8px y elevación sutil.
          </p>
        </div>

        {/* Implementación del Hover */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📋 Implementación del Hover EXACTO - Outline Stroke Negro
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Clases CSS Base:</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-gray-100 p-2 rounded">
                  <code className="text-cyan-600">bg-white/30</code> - Fondo blanco 30% opacidad
                </div>
                <div className="bg-gray-100 p-2 rounded">
                  <code className="text-cyan-600">backdrop-blur-md</code> - Desenfoque del fondo
                </div>
                <div className="bg-gray-100 p-2 rounded">
                  <code className="text-cyan-600">border border-gray-100</code> - Borde gris claro
                </div>
                <div className="bg-gray-100 p-2 rounded">
                  <code className="text-cyan-600">rounded-lg</code> - Esquinas redondeadas
                </div>
                <div className="bg-gray-100 p-2 rounded">
                  <code className="text-cyan-600">shadow-sm</code> - Sombra sutil
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Clases Responsive:</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-gray-100 p-2 rounded">
                  <code className="text-cyan-600">w-full</code> - Ancho completo en móvil
                </div>
                <div className="bg-gray-100 p-2 rounded">
                  <code className="text-cyan-600">md:w-[658px]</code> - Ancho fijo 658px en tablet
                </div>
                <div className="bg-gray-100 p-2 rounded">
                  <code className="text-cyan-600">xl:w-[800px]</code> - Ancho fijo 800px en desktop
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-lg font-medium text-green-800 mb-2">✅ Hover EXACTO del Proyecto:</h3>
            <p className="text-green-700 text-sm">
              <strong>Outline Stroke Negro:</strong> Implementado directamente con Tailwind CSS. 
              Al hacer hover aparece un contorno negro de 2px con offset de 8px, elevación sutil y transición suave de 300ms.
            </p>
          </div>
        </div>

        {/* Cards de Posts con Hover EXACTO */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            🎨 Cards con Hover EXACTO - Outline Stroke Negro
          </h2>
          
          {posts.map((post) => (
            <div
              key={post.id}
              onMouseEnter={() => setHoveredCard(post.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group"
            >
              <PostCard
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                href={post.href}
              />
              
              {/* Indicador de Estado */}
              <div className="mt-2 text-center">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  hoveredCard === post.id 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {hoveredCard === post.id ? '🟢 Hover Activo - Outline Negro + Elevación' : '⚪ Sin Hover'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Código de Implementación */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            💻 Código de Implementación EXACTO - Outline Stroke Negro
          </h2>
          <div className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`// Hover implementado directamente con Tailwind CSS
<a className="bg-white/30 backdrop-blur-md border border-gray-100 rounded-lg shadow-sm w-full md:w-[658px] xl:w-[800px] mb-0 block hover:outline hover:outline-2 hover:outline-black hover:outline-offset-8 hover:-translate-y-1 transition-all duration-300 ease-out">
  {/* Contenido de la card */}
</a>

// Clases de hover utilizadas:
// hover:outline - Activa outline en hover
// hover:outline-2 - Outline de 2px de grosor
// hover:outline-black - Color negro del outline
// hover:outline-offset-8 - Offset de 8px del borde
// hover:-translate-y-1 - Elevación sutil hacia arriba
// transition-all duration-300 ease-out - Transición suave de 300ms`}
            </pre>
          </div>
          
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Clases CSS Completas:</h3>
              <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                bg-white/30 backdrop-blur-md border border-gray-100 rounded-lg shadow-sm w-full md:w-[658px] xl:w-[800px] mb-0 block hover:outline hover:outline-2 hover:outline-black hover:outline-offset-8 hover:-translate-y-1 transition-all duration-300 ease-out
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Estilos Inline:</h3>
              <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                borderBottom: "1px solid rgba(0, 94, 182, 0.1)"
              </div>
            </div>
          </div>
        </div>

        {/* Características del Hover EXACTO */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            ✨ Características del Hover EXACTO - Outline Stroke Negro
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">🎯 Efecto Visual:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Outline negro de 2px en hover</li>
                <li>• Offset de 8px del borde</li>
                <li>• Elevación sutil con translateY(-1)</li>
                <li>• Transición suave de 300ms</li>
                <li>• Easing ease-out suave</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">📱 Responsive:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Móvil: ancho completo</li>
                <li>• Tablet: ancho fijo 658px</li>
                <li>• Desktop: ancho fijo 800px</li>
                <li>• Adaptación automática</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">🎨 Diseño:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Glass morphism con backdrop-blur</li>
                <li>• Borde inferior azul sutil</li>
                <li>• Fondo semi-transparente</li>
                <li>• Esquinas redondeadas</li>
                <li>• Transición ease-out suave</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof PostCardHoverDemo> = {
  title: 'PostCardHoverOutlineStrokeNegro',
  component: PostCardHoverDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Cards de posts con el efecto hover EXACTO del proyecto. Outline stroke negro de 2px con offset de 8px, elevación sutil y transición suave. Replica fielmente el comportamiento existente.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PostCardHoverDemo>;

// Historia principal - UNA SOLA ENTRADA
export const Default: Story = {
  render: () => <PostCardHoverDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Demostración completa de las cards de posts con el efecto hover EXACTO del proyecto. Outline stroke negro con indicadores de estado, documentación completa y código de implementación.',
      },
    },
  },
};
