import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

// Simulación de componentes individuales que forman /posts/view/20
const meta: Meta = {
  title: 'PostComponents',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# PostComponents - Componentes Individuales de /posts/view/20

Este conjunto de historias desglosa cada componente individual que forma parte de la página \`/posts/view/20\`, mostrando cómo cada pieza contribuye a la experiencia completa.

## 🧩 Componentes Desglosados

### 1. **ProfileCard** - Tarjeta de Perfil
Tarjeta flotante con información del autor que aparece en la parte superior.

### 2. **PostCard** - Contenedor Principal
Tarjeta con backdrop blur que contiene todo el contenido del post.

### 3. **PostMeta** - Metadatos del Post
Información sobre fecha, autor, categoría y estadísticas.

### 4. **FeaturedImage** - Imagen Destacada
Hero image del post con lazy loading y optimización.

### 5. **PostNavigation** - Navegación
Botones de navegación y breadcrumbs.

### 6. **TagSystem** - Sistema de Tags
Etiquetas categóricas con estilos específicos.

## 🎯 Propósito

Estos componentes muestran la arquitectura modular de la página de posts, donde cada elemento tiene una responsabilidad específica y se integra con \`AdvancedTableV2View\` para crear la experiencia completa.
        `
      }
    }
  }
}

export default meta
type Story = StoryObj

// Componente de tarjeta de perfil flotante
const ProfileCard = () => (
  <div className="fixed top-4 left-4 z-20">
    <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-1 shadow-lg">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img 
            src="https://assets.marioverdu.com/avatar/avatar-2.webp" 
            alt="Mario Verdu" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="pr-4">
          <div className="text-white text-sm font-medium">Mario Verdu</div>
          <div className="text-white/70 text-xs">Tech Writer & Developer</div>
        </div>
      </div>
    </div>
  </div>
)

// Componente de tarjeta principal del post
const PostCard = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white/30 backdrop-blur-md border border-gray-100 rounded-lg shadow-sm w-full max-w-4xl mx-auto" 
       style={{ borderBottom: "1px solid rgba(0, 94, 182, 0.1)" }}>
    <article className="pt-6 px-4 pb-4 overflow-hidden">
      {children}
    </article>
  </div>
)

// Componente de metadatos del post
const PostMeta = () => (
  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
    <div className="flex items-center">
      <span>Published on January 15, 2024</span>
      <span className="mx-2">•</span>
      <span>Author: Mario Verdu</span>
      <span className="mx-2">•</span>
      <span>Gaming Hardware</span>
    </div>
    <div className="flex items-center space-x-4">
      <span>1,247 views</span>
      <span>5 min read</span>
    </div>
  </div>
)

// Componente de imagen destacada
const FeaturedImage = () => (
  <div className="mb-6">
    <img
      src="https://assets.marioverdu.com/posts/gaming-controllers-hero.webp"
      alt="Gaming Controllers for Mobile"
      className="w-full h-48 object-cover rounded-lg"
      loading="lazy"
    />
    <div className="text-xs text-gray-500 mt-2 text-center">
      Comparativa de gamepads acoplables para gaming móvil
    </div>
  </div>
)

// Componente de navegación del post
const PostNavigation = () => (
  <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
    <div className="flex items-center text-sm text-gray-600">
      <span>Posts</span>
      <span className="mx-2">/</span>
      <span>Gaming Hardware</span>
      <span className="mx-2">/</span>
      <span className="text-gray-800">Gamepads Acoplables</span>
    </div>
    <div className="flex space-x-2">
      <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded text-sm hover:bg-gray-300">
        ← Previous
      </button>
      <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded text-sm hover:bg-gray-300">
        Next →
      </button>
    </div>
  </div>
)

// Sistema de tags
const TagSystem = () => (
  <div className="flex flex-wrap gap-2 mb-6">
    {['Gaming', 'Hardware', 'Mobile Gaming', 'Vivo x200 Pro', 'Gamepads'].map((tag, index) => (
      <span
        key={index}
        className="px-3 py-1 bg-cyan-100 text-cyan-800 text-sm rounded-full hover:bg-cyan-200 cursor-pointer transition-colors"
      >
        {tag}
      </span>
    ))}
  </div>
)

// Componente de estadísticas del post
const PostStats = () => (
  <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg mb-6">
    <div className="text-center">
      <div className="text-2xl font-bold text-gray-800">1,247</div>
      <div className="text-sm text-gray-600">Views</div>
    </div>
    <div className="text-center">
      <div className="text-2xl font-bold text-gray-800">23</div>
      <div className="text-sm text-gray-600">Shares</div>
    </div>
    <div className="text-center">
      <div className="text-2xl font-bold text-gray-800">5</div>
      <div className="text-sm text-gray-600">Comments</div>
    </div>
  </div>
)

// Historia 1: Tarjeta de perfil
export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-[#F7F8FC] relative">
      <ProfileCard />
      <div className="pt-[140px] pb-[72px] w-full px-4 sm:w-[83.33%] sm:px-0 max-w-[1000px] mx-auto flex flex-col items-center gap-6">
        <PostCard>
          <PostNavigation />
          <PostMeta />
          <FeaturedImage />
          <TagSystem />
          <PostStats />
        </PostCard>
      </div>
    </div>
  )
}
