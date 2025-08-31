import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

// Simulación de componentes individuales que forman /posts/view/20
const meta: Meta = {
  title: 'Components/AdvancedTableV2/PostComponents',
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
export const ProfileCardComponent: Story = {
  render: () => (
    <div className="min-h-screen bg-[#F7F8FC] relative">
      <ProfileCard />
      <div className="pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">ProfileCard Component</h3>
            <p className="text-gray-600">
              Tarjeta flotante que aparece en la esquina superior izquierda con información del autor.
              Utiliza backdrop blur y está posicionada de forma fija.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### ProfileCard - Tarjeta de Perfil Flotante

**🎨 Características:**
- Posición fija en esquina superior izquierda
- Backdrop blur con transparencia
- Avatar circular del autor
- Información básica (nombre y título)

**💻 Implementación:**
- \`position: fixed\` con \`top-4 left-4\`
- \`backdrop-blur-md\` para efecto glassmorphism
- \`z-index: 20\` para estar sobre otros elementos
        `
      }
    }
  }
}

// Historia 2: Contenedor principal del post
export const PostCardComponent: Story = {
  render: () => (
    <div className="min-h-screen bg-[#F7F8FC] p-8">
      <PostCard>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Post Container</h1>
          <p className="text-gray-600">
            Este es el contenedor principal que envuelve todo el contenido del post.
            Utiliza backdrop blur y bordes semitransparentes.
          </p>
          <div className="p-4 bg-gray-100 rounded">
            <p className="text-sm text-gray-600">
              El contenido del post (header, tabla, footer) se renderiza aquí dentro.
            </p>
          </div>
        </div>
      </PostCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### PostCard - Contenedor Principal

**🎨 Características:**
- Backdrop blur con transparencia (\`bg-white/30\`)
- Bordes sutiles con color específico
- Sombra suave para profundidad
- Responsive con max-width

**📐 Layout:**
- \`max-w-4xl mx-auto\` para centrado
- \`pt-6 px-4 pb-4\` para spacing interno
- \`overflow-hidden\` para contenido que desborde
        `
      }
    }
  }
}

// Historia 3: Metadatos del post
export const PostMetaComponent: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Post Metadata</h3>
      <PostMeta />
      <p className="text-sm text-gray-600 mt-4">
        Metadatos que aparecen debajo del título, incluyendo fecha, autor, categoría, views y tiempo de lectura.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### PostMeta - Metadatos del Post

**📋 Información Incluida:**
- Fecha de publicación
- Autor del post
- Categoría
- Número de visualizaciones
- Tiempo estimado de lectura

**🎨 Estilo:**
- \`text-sm text-gray-500\` para texto secundario
- Separadores con \`•\` entre elementos
- Layout flex con justificación entre elementos
        `
      }
    }
  }
}

// Historia 4: Imagen destacada
export const FeaturedImageComponent: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Featured Image</h3>
      <FeaturedImage />
      <p className="text-sm text-gray-600">
        Imagen hero del post con lazy loading y caption descriptivo.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### FeaturedImage - Imagen Destacada

**🖼️ Características:**
- Aspect ratio fijo (\`h-48\`)
- \`object-cover\` para mantener proporciones
- Bordes redondeados
- Lazy loading para performance
- Caption descriptivo opcional

**📱 Responsive:**
- \`w-full\` para ocupar todo el ancho disponible
- Altura fija que se adapta al contenido
        `
      }
    }
  }
}

// Historia 5: Navegación del post
export const PostNavigationComponent: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Post Navigation</h3>
      <PostNavigation />
      <p className="text-sm text-gray-600">
        Breadcrumbs y navegación entre posts con botones Previous/Next.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### PostNavigation - Navegación del Post

**🧭 Elementos:**
- **Breadcrumbs**: Ruta jerárquica del post
- **Previous/Next**: Navegación entre posts
- **Background**: Fondo gris suave para destacar

**⚡ Interactividad:**
- Botones con hover states
- Breadcrumbs clickeables
- Separadores visuales entre niveles
        `
      }
    }
  }
}

// Historia 6: Sistema de tags
export const TagSystemComponent: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Tag System</h3>
      <TagSystem />
      <p className="text-sm text-gray-600">
        Sistema de etiquetas categóricas con hover effects y colores específicos.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### TagSystem - Sistema de Etiquetas

**🏷️ Características:**
- Tags con colores cyan específicos
- Hover effects para interactividad
- Layout flex wrap para responsive
- Bordes redondeados (\`rounded-full\`)

**🎨 Estilo:**
- \`bg-cyan-100 text-cyan-800\` para colores
- \`hover:bg-cyan-200\` para estado hover
- \`cursor-pointer\` para indicar interactividad
        `
      }
    }
  }
}

// Historia 7: Estadísticas del post
export const PostStatsComponent: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Post Statistics</h3>
      <PostStats />
      <p className="text-sm text-gray-600">
        Estadísticas del post en formato de grid con métricas clave.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### PostStats - Estadísticas del Post

**📊 Métricas:**
- **Views**: Número de visualizaciones
- **Shares**: Veces compartido
- **Comments**: Número de comentarios

**📐 Layout:**
- Grid de 3 columnas
- Números grandes y prominentes
- Labels descriptivos debajo
- Fondo gris suave para destacar
        `
      }
    }
  }
}

// Historia 8: Composición completa
export const AllComponentsComposition: Story = {
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
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">AdvancedTableV2View Integration</h4>
            <p className="text-blue-700 text-sm">
              En este punto se integraría el componente AdvancedTableV2View con el contenido 
              del post y la tabla con scrollbar contextual.
            </p>
          </div>
        </PostCard>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Composición Completa - Todos los Componentes

Muestra cómo todos los componentes individuales se integran para formar la página completa de \`/posts/view/20\`.

**🧩 Componentes Integrados:**
1. **ProfileCard** - Flotante en esquina superior
2. **PostCard** - Contenedor principal
3. **PostNavigation** - Breadcrumbs y navegación
4. **PostMeta** - Metadatos del post
5. **FeaturedImage** - Imagen destacada
6. **TagSystem** - Etiquetas categóricas
7. **PostStats** - Estadísticas del post

**🔗 Integración con AdvancedTableV2View:**
El área azul indica donde se integra el componente \`AdvancedTableV2View\` con la tabla y scrollbar contextual.

**🎯 Resultado:**
Esta composición replica exactamente la estructura y apariencia de \`/posts/view/20\`.
        `
      }
    }
  }
}
