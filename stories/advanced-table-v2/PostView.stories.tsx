import type { Meta, StoryObj } from '@storybook/react'
import { AdvancedTableV2View } from '../../components/advanced-table-v2/AdvancedTableV2View'

// Simulación de datos de post como en /posts/view/20
const SAMPLE_POST_DATA = {
  id: 20,
  title: "Gamepads Acoplables para Vivo x200 Pro - Comparativa Completa 2024",
  excerpt: "Análisis detallado de los mejores gamepads acoplables disponibles para el Vivo x200 Pro, incluyendo valoraciones, características técnicas y disponibilidad en el mercado europeo.",
  author: "Mario Verdu",
  category: "Gaming Hardware",
  created_at: "2024-01-15T10:30:00Z",
  updated_at: "2024-01-20T15:45:00Z",
  views: 1247,
  tags: ["Gaming", "Hardware", "Mobile Gaming", "Vivo x200 Pro", "Gamepads"],
  featured_image: "https://assets.marioverdu.com/posts/gaming-controllers-hero.webp"
}

// Contenido HTML completo del post con tabla
const POST_CONTENT_WITH_TABLE = `
<div style="margin: 20px 0;">
  <h2 style="margin-bottom: 16px; font-size: 1.5rem; font-weight: 600;">Introducción</h2>
  <p style="margin-bottom: 16px; line-height: 1.6;">El Vivo x200 Pro se ha convertido en uno de los smartphones más populares para gaming móvil gracias a su potente procesador y excelente pantalla. Para maximizar la experiencia de juego, es fundamental contar con un gamepad acoplable de calidad.</p>
  
  <p style="margin-bottom: 16px; line-height: 1.6;">En esta comparativa analizamos los mejores gamepads disponibles en el mercado europeo, evaluando aspectos como conectividad, ergonomía, compatibilidad y relación calidad-precio.</p>
</div>

<div style="margin: 30px 0;">
  <h2 style="margin-bottom: 16px; font-size: 1.5rem; font-weight: 600;">Comparativa de Gamepads Acoplables</h2>
  <p style="margin-bottom: 20px; color: #6b7280;">La siguiente tabla muestra una comparativa detallada de los mejores gamepads acoplables. Utiliza scroll horizontal para ver todas las características.</p>
</div>

<table class="min-w-full border-collapse border border-gray-300 bg-white" role="table">
  <thead>
    <tr>
      <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left">Imagen</th>
      <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left">Modelo</th>
      <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left">Valoración</th>
      <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left">Características Clave</th>
      <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left">Conectividad</th>
      <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left">Precio Aproximado</th>
      <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left">Compatibilidad</th>
      <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left">Estado</th>
      <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left">Observaciones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">
        <div class="relative inline-block">
          <img src="https://gamesir.com/cdn/shop/files/G8_0ec9fb51-32f8-485b-8ea7-2a9d18b9747e.png?v=1741246755" class="max-w-full h-auto max-h-32 object-contain" alt="GameSir G8 Plus">
        </div>
      </td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">GameSir G8 Plus (Bluetooth)</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">⭐⭐⭐⭐⭐</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Similar al G8 pero con Bluetooth, sin passthrough, carga adicional durante uso prolongado</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Bluetooth 5.0, USB-C</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">€89-€129</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Android, iOS, PC, Steam Deck</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Disponible</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Excelente para sesiones largas</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">
        <div class="relative inline-block">
          <img src="https://i.ytimg.com/vi/UPcM0nzvKiU/hq720.jpg" class="max-w-full h-auto max-h-32 object-contain" alt="REDMI Gaming Controller">
        </div>
      </td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">REDMI Gaming Controller</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">⭐⭐⭐⭐</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Control básico, diseño gaming con clip trasero, buena relación calidad-precio</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Bluetooth 5.0</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">€35-€55</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Android, iOS</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Disponible</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Ideal para presupuestos ajustados</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">
        <div class="relative inline-block">
          <img src="https://m.media-amazon.com/images/I/61M++x2C96L._UF894,1000_QL80_.jpg" class="max-w-full h-auto max-h-32 object-contain" alt="GameSir X4 Aileron">
        </div>
      </td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">GameSir X4 / X4 Aileron</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">⭐⭐⭐⭐</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Diseño avanzado, buena calidad, opciones inalámbricas con conectividad mejorada</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">USB-C, Bluetooth 5.0</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">€69-€99</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Android, iOS, PC, Nintendo Switch</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Disponible</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Versatilidad excepcional</td>
    </tr>
    <tr style="background-color: #f3f4f6;">
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" style="text-align: center; font-weight: bold;">——————————</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" style="text-align: center; font-weight: bold;">GAMA PREMIUM</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" style="text-align: center; font-weight: bold;">————————</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" style="text-align: center; font-weight: bold;">——————————————————</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" style="text-align: center; font-weight: bold;">————————</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" style="text-align: center; font-weight: bold;">————————</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" style="text-align: center; font-weight: bold;">————————</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" style="text-align: center; font-weight: bold;">————————</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" style="text-align: center; font-weight: bold;">————————————</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">
        <div class="relative inline-block">
          <img src="https://preview.redd.it/redmagic-shadow-blade-2-with-iphone-15-pro-black-v0-8gbxw80y859d1.jpeg" class="max-w-full h-auto max-h-32 object-contain" alt="RedMagic Shadowblade 2">
        </div>
      </td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">RedMagic Shadowblade 2</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">⭐⭐⭐⭐⭐</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Diseño pro gamer, buena ergonomía, rendimiento sólido para gaming intensivo</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">USB-C, Bluetooth 5.2</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">€149-€199</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Android, iOS, PC, consolas</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Disponible</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Top gama absoluto</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">
        <div class="relative inline-block">
          <img src="https://m.media-amazon.com/images/I/61efJo-qxiS.jpg" class="max-w-full h-auto max-h-32 object-contain" alt="Backbone One">
        </div>
      </td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Backbone One (incluye variantes PS y Xbox)</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">⭐⭐⭐⭐</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Ligero, ergonómico, pads laterales sin clip trasero, compatible con múltiples plataformas</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">USB-C, Lightning</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">€99-€129</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">iOS, Android, Xbox Game Pass</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Disponible</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Ecosistema integrado</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">
        <div class="relative inline-block">
          <img src="https://m.media-amazon.com/images/I/71+GwlwjuOL.jpg" class="max-w-full h-auto max-h-32 object-contain" alt="Razer Kishi V3">
        </div>
      </td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Razer Kishi V2 / Kishi V3 Pro</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">⭐⭐⭐⭐⭐</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Diseño compacto, se conecta al puerto USB-C o Lightning, muy popular entre streamers</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">USB-C, Lightning</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">€119-€179</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Android, iOS, PC, Xbox Cloud</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Disponible</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Referencia del mercado</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">
        <div class="relative inline-block">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnNvfS0uUDCpPcv6_gKWHWbAW2R8boLBFFLg&s" class="max-w-full h-auto max-h-32 object-contain" alt="GameSir X3">
        </div>
      </td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">GameSir X3</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">⭐⭐⭐⭐</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Personalizable, ajuste cómodo para móvil gaming, sistema de refrigeración integrado</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">USB-C, Bluetooth 5.0</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">€89-€119</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Android, iOS, PC</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Disponible</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Innovación en refrigeración</td>
    </tr>
  </tbody>
</table>

<div style="margin: 30px 0;">
  <h2 style="margin-bottom: 16px; font-size: 1.5rem; font-weight: 600;">Conclusiones</h2>
  <p style="margin-bottom: 16px; line-height: 1.6;">Después de analizar todos los gamepads disponibles, el <strong>GameSir G8 Plus</strong> y el <strong>Razer Kishi V3 Pro</strong> emergen como las mejores opciones para el Vivo x200 Pro.</p>
  
  <p style="margin-bottom: 16px; line-height: 1.6;">Para usuarios con presupuesto limitado, el <strong>REDMI Gaming Controller</strong> ofrece una excelente relación calidad-precio, mientras que aquellos que buscan lo máximo en rendimiento deberían considerar el <strong>RedMagic Shadowblade 2</strong>.</p>

  <h3 style="margin: 20px 0 12px 0; font-size: 1.25rem; font-weight: 600;">Recomendaciones por Perfil</h3>
  <ul style="margin-left: 20px; line-height: 1.6;">
    <li style="margin-bottom: 8px;"><strong>Gamer Casual:</strong> REDMI Gaming Controller (€35-€55)</li>
    <li style="margin-bottom: 8px;"><strong>Gamer Entusiasta:</strong> GameSir G8 Plus (€89-€129)</li>
    <li style="margin-bottom: 8px;"><strong>Gamer Profesional:</strong> Razer Kishi V3 Pro (€119-€179)</li>
    <li style="margin-bottom: 8px;"><strong>Gamer Extremo:</strong> RedMagic Shadowblade 2 (€149-€199)</li>
  </ul>
</div>
`

// Componente para simular el header del post
const PostHeader = ({ post }: { post: typeof SAMPLE_POST_DATA }) => (
  <div className="mb-6">
    <h1 className="text-2xl text-left mb-3 font-['Arial_Medium',_Arial,_sans-serif] font-normal">
      {post.title}
    </h1>
    
    {/* Post Meta */}
    <div className="flex items-center text-sm text-gray-500 mb-4">
      <span>Published on {new Date(post.created_at).toLocaleDateString()}</span>
      {post.author && (
        <>
          <span className="mx-2">•</span>
          <span>Author: {post.author}</span>
        </>
      )}
      {post.category && (
        <>
          <span className="mx-2">•</span>
          <span>{post.category}</span>
        </>
      )}
    </div>

    {/* Featured Image */}
    {post.featured_image && (
      <div className="mb-6">
        <img
          src={post.featured_image}
          alt={post.title}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
    )}

    {/* Excerpt */}
    {post.excerpt && (
      <p className="text-gray-600 text-left mb-6 text-lg leading-relaxed">
        {post.excerpt}
      </p>
    )}
  </div>
)

// Componente para simular el footer del post
const PostFooter = ({ post }: { post: typeof SAMPLE_POST_DATA }) => (
  <div className="mt-8 pt-6 border-t border-gray-200">
    {/* Tags */}
    {post.tags && post.tags.length > 0 && (
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag: string, index: number) => (
          <span
            key={index}
            className="px-3 py-1 bg-cyan-100 text-cyan-800 text-sm rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    )}

    {/* Views and Updated */}
    <div className="flex items-center justify-between text-sm text-gray-500">
      <span>{post.views || 0} views</span>
      <span>Updated: {new Date(post.updated_at).toLocaleDateString()}</span>
    </div>
  </div>
)

// Componente del post completo
const FullPostView = ({ post }: { post: typeof SAMPLE_POST_DATA }) => (
  <div className="bg-white/30 backdrop-blur-md border border-gray-100 rounded-lg shadow-sm w-full max-w-4xl mx-auto" style={{ borderBottom: "1px solid rgba(0, 94, 182, 0.1)" }}>
    <article className="pt-6 px-4 pb-4 overflow-hidden">
      <PostHeader post={post} />
      
      {/* Post Content con AdvancedTableV2View */}
      <AdvancedTableV2View 
        content={POST_CONTENT_WITH_TABLE} 
        className="prose max-w-none"
      />
      
      <PostFooter post={post} />
    </article>
  </div>
)

const meta: Meta<typeof AdvancedTableV2View> = {
  title: 'PostView',
  component: AdvancedTableV2View,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# PostView - Representación Completa de /posts/view/20

Este conjunto de historias replica exactamente la estructura y comportamiento de \`/posts/view/20\`, mostrando todos los componentes que conforman una vista de post con \`AdvancedTableV2View\` y \`ContextualScrollbar\`.

## 🎯 Componentes Incluidos

### 1. **FullPostView** - Post Completo
Replica la estructura completa de \`/posts/view/20\` con:
- Header del post (título, meta, imagen destacada, excerpt)
- Contenido con tabla y scrollbar contextual
- Footer del post (tags, views, fecha de actualización)

### 2. **PostHeader** - Cabecera del Post  
- Título del post
- Metadatos (fecha, autor, categoría)
- Imagen destacada
- Excerpt/resumen

### 3. **PostContent** - Contenido Principal
- Texto introductorio
- Tabla con scrollbar contextual
- Conclusiones y recomendaciones

### 4. **PostFooter** - Pie del Post
- Tags del post
- Estadísticas (views)
- Fecha de actualización

## 🏗️ Arquitectura Técnica

\`\`\`typescript
// Estructura del post completo
<FullPostView>
  <PostHeader />
  <AdvancedTableV2View content={POST_CONTENT_WITH_TABLE}>
    <ContextualScrollbar />
  </AdvancedTableV2View>
  <PostFooter />
</FullPostView>
\`\`\`

## 📊 Datos Realistas

Utiliza datos reales simulados que replican exactamente el contenido de \`/posts/view/20\`:
- Título: "Gamepads Acoplables para Vivo x200 Pro"
- Tabla con 8 gamepads + fila separadora
- 9 columnas con especificaciones técnicas
- Imágenes reales de productos
- Metadatos completos (autor, categoría, tags, etc.)

## 🎮 Scrollbar Contextual en Acción

La tabla incluye el sistema completo de scrollbar contextual:
- ✅ Posicionamiento dinámico en última fila visible
- ✅ Algoritmo de lectura desde abajo hacia arriba  
- ✅ Sincronización bidireccional sin loops
- ✅ Comportamiento nativo con transiciones suaves
- ✅ Hardware acceleration para performance óptima
        `
      }
    }
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'Contenido HTML del post con tablas'
    },
    className: {
      control: 'text', 
      description: 'Clases CSS adicionales'
    }
  }
}

export default meta
type Story = StoryObj<typeof AdvancedTableV2View>

// Historia 1: Post completo como aparece en /posts/view/20
export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-[#F7F8FC] py-8">
      <div className="pt-[140px] pb-[72px] w-full px-4 sm:w-[83.33%] sm:px-0 max-w-[1000px] mx-auto flex flex-col items-center gap-6">
        <FullPostView post={SAMPLE_POST_DATA} />
        
        {/* Back to Posts Button */}
        <div className="w-full md:w-[658px] xl:w-[800px] flex justify-center">
          <button className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium">
            ← Back to Posts
          </button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Post Completo - Réplica Exacta de /posts/view/20

Esta historia reproduce exactamente la apariencia y comportamiento de \`http://localhost:3000/en/posts/view/20\`.

**🎯 Características:**
- Layout idéntico al original
- Background \`#F7F8FC\`
- Contenedor con márgenes y padding exactos
- Tarjeta de post con backdrop blur
- Botón "Back to Posts" incluido

**🔍 Pruebas Recomendadas:**
1. **Scroll Vertical**: Observa cómo la scrollbar se posiciona dinámicamente
2. **Scroll Horizontal**: Prueba la tabla con rueda del mouse y drag del thumb
3. **Responsive**: Cambia el tamaño del viewport
4. **Comportamiento**: Compara con la página real en localhost:3000

**📊 Contenido:**
- Título: "Gamepads Acoplables para Vivo x200 Pro"
- 8 gamepads + 1 fila separadora
- 9 columnas con especificaciones completas
- Imágenes reales de productos
        `
      }
    }
  }
}

// Tabla sola con el nombre interno del componente: AdvancedTableV2View
const TABLE_ONLY = `
<table class="min-w-full border-collapse border border-gray-300 bg-white" role="table">
  <thead>
    <tr>
      <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left">Imagen</th>
      <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left">Modelo</th>
      <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left">Valoración</th>
      <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left">Características Clave</th>
      <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left">Conectividad</th>
      <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left">Precio Aproximado</th>
      <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left">Compatibilidad</th>
      <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left">Estado</th>
      <th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left">Observaciones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">
        <div class="relative inline-block">
          <img src="https://gamesir.com/cdn/shop/files/G8_0ec9fb51-32f8-485b-8ea7-2a9d18b9747e.png?v=1741246755" class="max-w-full h-auto max-h-32 object-contain" alt="GameSir G8 Plus">
        </div>
      </td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">GameSir G8 Plus (Bluetooth)</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">⭐⭐⭐⭐⭐</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Similar al G8 pero con Bluetooth, sin passthrough, carga adicional durante uso prolongado</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Bluetooth 5.0, USB-C</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">€89-€129</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Android, iOS, PC, Steam Deck</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Disponible</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Excelente para sesiones largas</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">
        <div class="relative inline-block">
          <img src="https://i.ytimg.com/vi/UPcM0nzvKiU/hq720.jpg" class="max-w-full h-auto max-h-32 object-contain" alt="REDMI Gaming Controller">
        </div>
      </td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">REDMI Gaming Controller</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">⭐⭐⭐⭐</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Control básico, diseño gaming con clip trasero, buena relación calidad-precio</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Bluetooth 5.0</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">€35-€55</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Android, iOS</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Disponible</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Ideal para presupuestos ajustados</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">
        <div class="relative inline-block">
          <img src="https://m.media-amazon.com/images/I/61M++x2C96L._UF894,1000_QL80_.jpg" class="max-w-full h-auto max-h-32 object-contain" alt="GameSir X4 Aileron">
        </div>
      </td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">GameSir X4 / X4 Aileron</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">⭐⭐⭐⭐</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Diseño avanzado, buena calidad, opciones inalámbricas con conectividad mejorada</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">USB-C, Bluetooth 5.0</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">€69-€99</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Android, iOS, PC, Nintendo Switch</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Disponible</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Versatilidad excepcional</td>
    </tr>
    <tr style="background-color: #f3f4f6;">
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" style="text-align: center; font-weight: bold;">——————————</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" style="text-align: center; font-weight: bold;">GAMA PREMIUM</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" style="text-align: center; font-weight: bold;">————————</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" style="text-align: center; font-weight: bold;">——————————————————</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" style="text-align: center; font-weight: bold;">————————</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" style="text-align: center; font-weight: bold;">————————</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" style="text-align: center; font-weight: bold;">————————</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" style="text-align: center; font-weight: bold;">————————</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top" style="text-align: center; font-weight: bold;">————————————</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">
        <div class="relative inline-block">
          <img src="https://preview.redd.it/redmagic-shadow-blade-2-with-iphone-15-pro-black-v0-8gbxw80y859d1.jpeg" class="max-w-full h-auto max-h-32 object-contain" alt="RedMagic Shadowblade 2">
        </div>
      </td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">RedMagic Shadowblade 2</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">⭐⭐⭐⭐⭐</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Diseño pro gamer, buena ergonomía, rendimiento sólido para gaming intensivo</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">USB-C, Bluetooth 5.2</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">€149-€199</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Android, iOS, PC, consolas</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Disponible</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Top gama absoluto</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">
        <div class="relative inline-block">
          <img src="https://m.media-amazon.com/images/I/61efJo-qxiS.jpg" class="max-w-full h-auto max-h-32 object-contain" alt="Backbone One">
        </div>
      </td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Backbone One (incluye variantes PS y Xbox)</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">⭐⭐⭐⭐</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Ligero, ergonómico, pads laterales sin clip trasero, compatible con múltiples plataformas</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">USB-C, Lightning</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">€99-€129</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">iOS, Android, Xbox Game Pass</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Disponible</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Ecosistema integrado</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">
        <div class="relative inline-block">
          <img src="https://www.notebookcheck.net/fileadmin/_processed_/1/3/csm_M-Con-V2-gaming-controller-mid_35e0e6810c.jpg" class="max-w-full h-auto max-h-32 object-contain" alt="M-Con V2">
        </div>
      </td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">M-Con V2 (Descontinuado)</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">⭐⭐⭐</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Mando básico con diseño minimalista, buena construcción</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">USB-C</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">€45-€65 (usado)</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Android principalmente</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">No disponible en Europa</td>
      <td class="border border-gray-300 px-4 py-2 relative group h-auto align-top">Solo mercado secundario</td>
    </tr>
  </tbody>
</table>
`

// (Se eliminan historias extra para cumplir 1 componente = 1 story Default)

// ContextualScrollbar sola (componente interno) dentro de PostView
// Nota: se renderiza a través de AdvancedTableV2View porque la scrollbar depende de una tabla y contenedor.
// Stories eliminadas para cumplir 1 componente = 1 story Default
