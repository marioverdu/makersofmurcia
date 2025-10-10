# Sistema de Protección Universal de Rutas

## 🎯 Objetivo

Proteger **TODAS las rutas** (presentes y futuras) con un sistema simple, reutilizable y automático que verifica la configuración en BD y ejecuta redirecciones/bloqueos según sea necesario.

---

## ✨ Características

- ✅ **Una sola línea de código** por página
- ✅ **Funciona automáticamente** para cualquier ruta
- ✅ **Compatible con rutas dinámicas** (`[id]`, `[slug]`, `[lang]`)
- ✅ **Soporta redirecciones personalizadas**
- ✅ **Estrategias fail-open y fail-closed**
- ✅ **Server-side rendering (SSR)**
- ✅ **SEO friendly** (redirecciones HTTP)
- ✅ **Logs detallados para debugging**

---

## 🚀 Uso Básico

### Para Páginas Públicas (Contenido)

```tsx
import { RouteGuard } from '@/lib/route-guard'

export default async function MyPage({ params }) {
  return (
    <RouteGuard params={params} routePath="/[lang]/mi-ruta" fallbackStrategy="allow">
      {/* Tu contenido aquí */}
    </RouteGuard>
  )
}
```

### Para Páginas Protegidas (Admin, Autenticación)

```tsx
import { RouteGuardStrict } from '@/lib/route-guard'

export default async function AdminPage({ params }) {
  return (
    <RouteGuardStrict params={params} routePath="/admin/mi-panel">
      {/* Tu contenido aquí */}
    </RouteGuardStrict>
  )
}
```

---

## 📚 Ejemplos Completos

### Ejemplo 1: Página Simple

```tsx
// app/[lang]/about/page.tsx
import { RouteGuard } from '@/lib/route-guard'

export default async function AboutPage({ params }) {
  return (
    <RouteGuard params={params} routePath="/[lang]/about" fallbackStrategy="allow">
      <div>
        <h1>Acerca de Nosotros</h1>
        <p>Contenido de la página...</p>
      </div>
    </RouteGuard>
  )
}
```

### Ejemplo 2: Página con Contenido del Cliente

```tsx
// app/[lang]/posts/page.tsx
import { RouteGuard } from '@/lib/route-guard'
import PostsPageClient from './posts-page-client'
import { getDictionary } from '@/lib/get-dictionary'

export default async function PostsPage({ params }) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  
  return (
    <RouteGuard params={params} routePath="/[lang]/posts" fallbackStrategy="allow">
      <PostsPageClient lang={lang} dict={dict} />
    </RouteGuard>
  )
}
```

### Ejemplo 3: Ruta Dinámica

```tsx
// app/[lang]/posts/view/[id]/page.tsx
import { RouteGuard } from '@/lib/route-guard'
import PostViewClient from './post-view-client'

export default async function PostViewPage({ params }) {
  const { lang, id } = await params
  
  return (
    <RouteGuard params={params} routePath="/[lang]/posts/view/[id]" fallbackStrategy="allow">
      <PostViewClient lang={lang} postId={id} />
    </RouteGuard>
  )
}
```

### Ejemplo 4: Página con SEO

```tsx
// app/[lang]/work-experience/page.tsx
import { Metadata } from 'next'
import { RouteGuard } from '@/lib/route-guard'
import WorkExperienceClient from '@/components/work-experience-client'
import { PersonSchemaMarkup, BreadcrumbSchemaMarkup } from '@/components/seo-schema-markup'
import { getDictionary } from '@/lib/get-dictionary'

export async function generateMetadata({ params }): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  
  return {
    title: dict.workExperience.title,
    description: dict.workExperience.subtitle,
  }
}

export default async function WorkExperiencePage({ params }) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  
  return (
    <RouteGuard params={params} routePath="/work-experience" fallbackStrategy="block">
      <PersonSchemaMarkup />
      <BreadcrumbSchemaMarkup 
        items={[
          { name: dict.navigation.home, url: `https://ejemplo.com/${lang}` },
          { name: dict.workExperience.title, url: `https://ejemplo.com/${lang}/work-experience` }
        ]} 
      />
      <WorkExperienceClient lang={lang} dict={dict} />
    </RouteGuard>
  )
}
```

---

## ⚙️ Parámetros

### `params` (requerido)
```typescript
params?: Promise<any>
```
Los params de Next.js. Se pasa directamente el `params` del componente.

**Ejemplo**:
```tsx
export default async function MyPage({ params }) {
  return <RouteGuard params={params}>...</RouteGuard>
}
```

### `routePath` (requerido)
```typescript
routePath?: string
```
El path de la ruta a verificar en BD. Debe coincidir con la estructura de carpetas.

**Ejemplos**:
- `/[lang]` para `app/[lang]/page.tsx`
- `/[lang]/posts` para `app/[lang]/posts/page.tsx`
- `/[lang]/posts/view/[id]` para `app/[lang]/posts/view/[id]/page.tsx`
- `/admin/dashboard` para `app/admin/dashboard/page.tsx`

### `fallbackStrategy` (opcional)
```typescript
fallbackStrategy?: 'allow' | 'block'
```
Estrategia si no hay configuración en BD:

- **`'allow'` (fail-open)**: Permite acceso si no hay config
  - ✅ **Recomendado** para contenido público
  - Ejemplo: Blog posts, páginas informativas

- **`'block'` (fail-closed)**: Bloquea acceso si no hay config
  - ✅ **Recomendado** para páginas protegidas
  - Ejemplo: Admin, dashboards, configuración

**Default**: `'allow'`

---

## 🔐 Estrategias de Fallback

### Fail-Open (`allow`)

```typescript
<RouteGuard fallbackStrategy="allow">
  {/* Contenido */}
</RouteGuard>
```

**Comportamiento**:
```
Sin config en BD → ✅ Permite acceso
Ruta activa → ✅ Permite acceso
Ruta inactiva → ❌ 404
Ruta con redirect → 🔀 Redirige
Error → ✅ Permite acceso
```

**Usa en**:
- 📄 Páginas de contenido
- 📰 Blog posts
- 📖 Documentación
- 🏠 Landing pages

### Fail-Closed (`block`)

```typescript
<RouteGuardStrict>
  {/* Contenido */}
</RouteGuardStrict>
// O equivalente:
<RouteGuard fallbackStrategy="block">
  {/* Contenido */}
</RouteGuard>
```

**Comportamiento**:
```
Sin config en BD → ❌ 404
Ruta activa → ✅ Permite acceso
Ruta inactiva → ❌ 404
Ruta con redirect → 🔀 Redirige
Error → ❌ 404
```

**Usa en**:
- 🔐 Páginas admin
- ⚙️ Configuración
- 👤 Perfiles de usuario
- 🔒 Contenido restringido

---

## 🎯 Orden de Prioridad

El sistema verifica en este orden:

```
1. ¿Existe configuración en BD?
   ├─ NO → Usar fallbackStrategy
   └─ SÍ → Continuar
   
2. ¿Ruta activa Y tiene redirectTo?
   ├─ SÍ → Redirigir (HTTP 307)
   └─ NO → Continuar
   
3. ¿Ruta activa?
   ├─ SÍ → Renderizar contenido
   └─ NO → 404
```

---

## 📋 Configuración en Base de Datos

El sistema lee de la tabla `route_management`:

```sql
CREATE TABLE route_management (
  path VARCHAR(255),           -- Ejemplo: '/[lang]/posts'
  is_active BOOLEAN,           -- true/false
  redirect_to VARCHAR(255),    -- Ejemplo: '/posts' o NULL
  priority INTEGER,
  -- ... otros campos
);
```

**Ejemplo de configuración**:

| path | is_active | redirect_to | Resultado |
|------|-----------|-------------|-----------|
| `/[lang]` | `true` | `/posts` | Redirige a `/es/posts` |
| `/[lang]/posts` | `true` | `null` | Muestra contenido |
| `/[lang]/about` | `false` | `null` | 404 |
| `/admin/users` | `true` | `/admin/dashboard` | Redirige |

---

## 🛠️ Casos de Uso Comunes

### Caso 1: Nueva Página Pública

```tsx
// app/[lang]/servicios/page.tsx
import { RouteGuard } from '@/lib/route-guard'

export default async function ServiciosPage({ params }) {
  return (
    <RouteGuard params={params} routePath="/[lang]/servicios">
      <div>
        <h1>Nuestros Servicios</h1>
        {/* Contenido */}
      </div>
    </RouteGuard>
  )
}
```

**Configuración en `/admin/routes`**:
- Path: `/[lang]/servicios`
- Toggle: **ON** (activa)
- Redirect: **Ninguno**
- Priority: 10

### Caso 2: Página en Construcción

```tsx
// app/[lang]/beta/page.tsx
import { RouteGuard } from '@/lib/route-guard'

export default async function BetaPage({ params }) {
  return (
    <RouteGuard params={params} routePath="/[lang]/beta">
      <div>
        <h1>Función Beta</h1>
        {/* Contenido */}
      </div>
    </RouteGuard>
  )
}
```

**Configuración en `/admin/routes`**:
- Path: `/[lang]/beta`
- Toggle: **OFF** (inactiva)
- Resultado: Usuarios ven 404

### Caso 3: Redirigir Temporalmente

```tsx
// app/[lang]/old-page/page.tsx
import { RouteGuard } from '@/lib/route-guard'

export default async function OldPage({ params }) {
  return (
    <RouteGuard params={params} routePath="/[lang]/old-page">
      <div>Este contenido ya no está disponible</div>
    </RouteGuard>
  )
}
```

**Configuración en `/admin/routes`**:
- Path: `/[lang]/old-page`
- Toggle: **ON** (activa)
- Redirect: `/new-page`
- Resultado: Redirige automáticamente

---

## 🔍 Debugging

### Logs en Consola

El sistema imprime logs detallados:

```
🛡️ [RouteGuard] Protecting route: /[lang]/posts
✅ [RouteGuard] Route /[lang]/posts is active, rendering content
```

```
🔀 [RouteGuard] Custom redirect from /[lang] to /es/posts
```

```
🚫 [RouteGuard] Route /[lang]/beta is inactive, blocking access
```

```
⚠️ [RouteGuard] No config found for /[lang]/new-page, using fallback: allow
```

### Verificar Estado en BD

```javascript
// scripts/check-route.mjs
const { neon } = require('@neondatabase/serverless')
require('dotenv').config({ path: '.env.local' })

const sql = neon(process.env.DATABASE_URL)

async function checkRoute(path) {
  const route = await sql`
    SELECT path, is_active, redirect_to, priority
    FROM route_management
    WHERE path = ${path}
  `
  console.log(route)
}

checkRoute('/[lang]/posts')
```

---

## 📈 Ventajas del Sistema

### ✅ Antes vs Ahora

**Antes** (30+ líneas por página):
```tsx
export default async function MyPage({ params }) {
  const { lang } = await params
  
  try {
    const route = await RouteManagementService.getRoute('/mi-ruta')
    if (route) {
      if (route.is_active && route.redirect_to) {
        redirect(`/${lang}${route.redirect_to}`)
      }
      if (!route.is_active) {
        return notFound()
      }
    } else {
      console.log('No config')
    }
  } catch (error) {
    console.error(error)
  }
  
  return <Content />
}
```

**Ahora** (3 líneas):
```tsx
export default async function MyPage({ params }) {
  return (
    <RouteGuard params={params} routePath="/mi-ruta">
      <Content />
    </RouteGuard>
  )
}
```

### 📊 Reducción de Código

- **Antes**: ~30 líneas por página × 50 páginas = **1,500 líneas**
- **Ahora**: ~3 líneas por página × 50 páginas = **150 líneas**
- **Ahorro**: **90%** menos código 🎉

---

## 🔄 Migrar Páginas Existentes

### Paso 1: Identificar el Patrón Actual

```tsx
// Busca este patrón:
const route = await RouteManagementService.getRoute('/ruta')
if (route?.is_active && route?.redirect_to) {
  redirect(`/${lang}${route.redirect_to}`)
}
```

### Paso 2: Reemplazar con RouteGuard

```tsx
// Antes
export default async function MyPage({ params }) {
  const { lang } = await params
  // ... 30 líneas de verificación ...
  return <Content lang={lang} />
}

// Después
import { RouteGuard } from '@/lib/route-guard'

export default async function MyPage({ params }) {
  const { lang } = await params
  return (
    <RouteGuard params={params} routePath="/ruta">
      <Content lang={lang} />
    </RouteGuard>
  )
}
```

### Paso 3: Eliminar Imports Innecesarios

```tsx
// Ya no necesitas:
import { RouteManagementService } from '@/lib/route-management-service'
import { notFound, redirect } from 'next/navigation'
```

---

## 🎉 Resultado Final

**Sistema completamente automático**:

1. ✅ Creas una nueva página con `<RouteGuard>`
2. ✅ La ruta se auto-descubre en `/admin/routes`
3. ✅ Configuras desde el widget (toggle, priority, redirect)
4. ✅ Funciona automáticamente en producción

**Sin intervención manual, sin código repetido, sin errores.**

---

**Fecha**: 10 de octubre de 2025  
**Versión**: SingularCMS 1.48.4  
**Estado**: ✅ SISTEMA UNIVERSAL IMPLEMENTADO

