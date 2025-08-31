'use client'

import React from 'react'
import { Locale } from '@/types/i18n'
import { Dictionary } from '@/dictionaries'

interface HoverTestClientProps {
  lang: Locale
  dict: Dictionary
}

export default function HoverTestClient({ lang, dict }: HoverTestClientProps) {
  const [hoveredCard, setHoveredCard] = React.useState<string | null>(null)

  const posts = [
    {
      id: '1',
      title: 'Test Markdownv3?',
      excerpt: 'Gamepads acoplables a Vivo x200 Pro',
      date: '21 de agosto de 2025',
      href: `/${lang}/posts/view/20`
    },
    {
      id: '2',
      title: 'Desarrollo Frontend Moderno',
      excerpt: 'Técnicas avanzadas de React y Next.js para aplicaciones web escalables',
      date: '20 de agosto de 2025',
      href: `/${lang}/posts/view/19`
    },
    {
      id: '3',
      title: 'Diseño UX/UI en 2025',
      excerpt: 'Tendencias y mejores prácticas para interfaces de usuario',
      date: '19 de agosto de 2025',
      href: `/${lang}/posts/view/18`
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-800">
            🎯 Test de Hover - Cards de Posts con Outline Stroke Negro Mejorado
          </h1>
          <p className="text-gray-600 mt-2">
            Demostración del efecto hover real con outline stroke negro implementado en el proyecto
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Explicación del Hover */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📋 Implementación del Hover con Outline Stroke Negro Mejorado
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
            <h3 className="text-lg font-medium text-green-800 mb-2">✅ Hover Real del Proyecto Mejorado:</h3>
            <p className="text-green-700 text-sm">
              <strong>Outline Stroke Negro:</strong> Ahora implementado con <code className="bg-green-100 px-1 rounded">post-card-hover</code>. 
              Al hacer hover aparece un contorno negro de 2px con offset de 8px, elevación sutil y transición suave de 300ms.
            </p>
          </div>
        </div>

        {/* Cards de Posts con Hover Real */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            🎨 Cards con Hover Real - Outline Stroke Negro Mejorado
          </h2>
          
          {/* Variante 1: Hover Estándar */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Variante 1: Hover Estándar (offset: 8px + elevación)</h3>
            {posts.slice(0, 1).map((post) => (
              <div
                key={post.id}
                onMouseEnter={() => setHoveredCard(post.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group"
              >
                <a
                  href={post.href}
                  className="post-card-hover bg-white/30 backdrop-blur-md border border-gray-100 rounded-lg shadow-sm w-full md:w-[658px] xl:w-[800px] mb-0 block"
                  style={{ borderBottom: "1px solid rgba(0, 94, 182, 0.1)" }}
                >
                  <article className="pt-6 px-4 pb-6 overflow-hidden">
                    <h2 className="text-xl text-left mb-2 font-['Arial_Medium',_Arial,_sans-serif] font-normal">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-left mb-4">{post.excerpt}</p>
                    <time 
                      dateTime={post.date} 
                      className="block text-sm text-gray-500 mt-4 underline decoration-gray-300"
                    >
                      {post.date}
                    </time>
                  </article>
                </a>
                
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

          {/* Variante 2: Hover Prominente */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Variante 2: Hover Prominente (offset: 12px + elevación)</h3>
            {posts.slice(1, 2).map((post) => (
              <div
                key={post.id}
                onMouseEnter={() => setHoveredCard(post.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group"
              >
                <a
                  href={post.href}
                  className="post-card-hover-prominent bg-white/30 backdrop-blur-md border border-gray-100 rounded-lg shadow-sm w-full md:w-[658px] xl:w-[800px] mb-0 block"
                  style={{ borderBottom: "1px solid rgba(0, 94, 182, 0.1)" }}
                >
                  <article className="pt-6 px-4 pb-6 overflow-hidden">
                    <h2 className="text-xl text-left mb-2 font-['Arial_Medium',_Arial,_sans-serif] font-normal">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-left mb-4">{post.excerpt}</p>
                    <time 
                      dateTime={post.date} 
                      className="block text-sm text-gray-500 mt-4 underline decoration-gray-300"
                    >
                      {post.date}
                    </time>
                  </article>
                </a>
                
                {/* Indicador de Estado */}
                <div className="mt-2 text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    hoveredCard === post.id 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {hoveredCard === post.id ? '🟢 Hover Activo - Outline Negro Prominente + Elevación' : '⚪ Sin Hover'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Variante 3: Hover Original (sin transform) */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Variante 3: Hover Original (solo outline, sin elevación)</h3>
            {posts.slice(2, 3).map((post) => (
              <div
                key={post.id}
                onMouseEnter={() => setHoveredCard(post.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group"
              >
                <a
                  href={post.href}
                  className="bg-white/30 backdrop-blur-md border border-gray-100 rounded-lg shadow-sm w-full md:w-[658px] xl:w-[800px] mb-0 block hover:outline hover:outline-2 hover:outline-black hover:outline-offset-8 transition-all duration-300"
                  style={{ borderBottom: "1px solid rgba(0, 94, 182, 0.1)" }}
                >
                  <article className="pt-6 px-4 pb-6 overflow-hidden">
                    <h2 className="text-xl text-left mb-2 font-['Arial_Medium',_Arial,_sans-serif] font-normal">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-left mb-4">{post.excerpt}</p>
                    <time 
                      dateTime={post.date} 
                      className="block text-sm text-gray-500 mt-4 underline decoration-gray-300"
                    >
                      {post.date}
                    </time>
                  </article>
                </a>
                
                {/* Indicador de Estado */}
                <div className="mt-2 text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    hoveredCard === post.id 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {hoveredCard === post.id ? '🟢 Hover Activo - Solo Outline Negro' : '⚪ Sin Hover'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Código de Implementación */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            💻 Código de Implementación - Outline Stroke Negro Mejorado
          </h2>
          <div className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`// CSS Personalizado en globals.css
.post-card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.post-card-hover:hover {
  outline: 2px solid #000000;
  outline-offset: 8px;
  transform: translateY(-2px);
}

.post-card-hover-prominent:hover {
  outline: 2px solid #000000;
  outline-offset: 12px;
  transform: translateY(-3px);
}

// Uso en componentes
<a className="post-card-hover bg-white/30 backdrop-blur-md border border-gray-100 rounded-lg shadow-sm w-full md:w-[658px] xl:w-[800px] mb-0 block">
  {/* Contenido de la card */}
</a>`}
            </pre>
          </div>
          
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Clases CSS Completas:</h3>
              <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                post-card-hover bg-white/30 backdrop-blur-md border border-gray-100 rounded-lg shadow-sm w-full md:w-[658px] xl:w-[800px] mb-0 block
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

        {/* Características del Hover Real */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            ✨ Características del Hover - Outline Stroke Negro Mejorado
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">🎯 Efecto Visual:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Outline negro de 2px en hover</li>
                <li>• Offset de 8px del borde (estándar)</li>
                <li>• Offset de 12px del borde (prominente)</li>
                <li>• Elevación sutil con translateY</li>
                <li>• Transición suave de 300ms</li>
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
                <li>• Transición cubic-bezier suave</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
