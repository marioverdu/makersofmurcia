# Guía: Implementar Redirección en Páginas

## 📚 Introducción

Este sistema permite que **cualquier página** gestione automáticamente:
1. **Redirecciones personalizadas** (configuradas en `/admin/routes`)
2. **Sistema de fallback** (por prioridad)
3. **Página de mantenimiento** (si todas las rutas están inactivas)

## 🚀 Para Componentes Cliente

### Paso 1: Importar el Hook

```typescript
import { useRouteRedirection } from '@/hooks/use-route-redirection'
import type { Locale } from '@/types/i18n'
```

### Paso 2: Usar el Hook

```typescript
export default function MyPageClient({ lang }: { lang: Locale }) {
  // Hook de redirección centralizado
  const { isChecking, showMaintenance } = useRouteRedirection('/mi-ruta', lang)
  
  // ... resto de tu lógica
}
```

### Paso 3: Renderizado Condicional

```typescript
// Mostrar loading mientras se verifica
if (isChecking) {
  return <UnifiedPageLoading />
}

// Mostrar página de mantenimiento si todas las rutas están inactivas
if (showMaintenance) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Sitio en mantenimiento</h1>
        <p className="text-gray-600">Estamos trabajando para mejorar tu experiencia. Vuelve pronto.</p>
      </div>
    </div>
  )
}

// Renderizar contenido normal
return (
  <div>
    {/* Tu contenido aquí */}
  </div>
)
```

### Ejemplo Completo

```typescript
"use client"

import { useState } from 'react'
import type { Locale } from '@/types/i18n'
import { useRouteRedirection } from '@/hooks/use-route-redirection'
import { UnifiedPageLoading } from '@/components/ui/unified-page-loading'

interface MyPageClientProps {
  lang: Locale
}

export default function MyPageClient({ lang }: MyPageClientProps) {
  // Hook de redirección centralizado
  const { isChecking, showMaintenance } = useRouteRedirection('/mi-ruta', lang)
  
  // Tu estado y lógica
  const [data, setData] = useState(null)
  
  // Loading
  if (isChecking) {
    return <UnifiedPageLoading />
  }
  
  // Maintenance
  if (showMaintenance) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sitio en mantenimiento</h1>
          <p className="text-gray-600">Estamos trabajando para mejorar tu experiencia. Vuelve pronto.</p>
        </div>
      </div>
    )
  }
  
  // Contenido normal
  return (
    <div>
      <h1>Mi Página</h1>
      {/* Tu contenido aquí */}
    </div>
  )
}
```

## 🖥️ Para Server Components

### Paso 1: Importar el Servicio

```typescript
import { RouteManagementService } from '@/lib/route-management-service'
import { notFound, redirect } from 'next/navigation'
import type { Locale } from '@/types/i18n'
```

### Paso 2: Verificar en el Server Component

```typescript
export default async function MyPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  
  // Guard SSR: verificar configuración de la ruta
  try {
    const route = await RouteManagementService.getRoute('/mi-ruta')
    
    if (route) {
      // PRIORIDAD 1: Si la ruta está activa Y tiene redirectTo, redirigir
      if (route.is_active && route.redirect_to) {
        console.log(`🔀 [SERVER] MyPage: Custom redirect to ${route.redirect_to}`)
        redirect(`/${lang}${route.redirect_to}`)
      }
      
      // PRIORIDAD 2: Si la ruta está inactiva, no renderizar
      if (!route.is_active) {
        console.log(`🚫 [SERVER] MyPage: Route is inactive`)
        return notFound()
      }
    } else {
      // Si no hay configuración, asumir inactiva (fail-closed)
      console.log(`🚫 [SERVER] MyPage: No route config found`)
      return notFound()
    }
  } catch (error) {
    console.error(`❌ [SERVER] MyPage: Error checking route:`, error)
    return notFound()
  }
  
  // Renderizar contenido normal
  return (
    <div>
      <h1>Mi Página</h1>
    </div>
  )
}
```

### Ejemplo Completo

```typescript
import { Metadata } from 'next'
import { RouteManagementService } from '@/lib/route-management-service'
import { notFound, redirect } from 'next/navigation'
import type { Locale } from '@/types/i18n'
import MyPageClient from './my-page-client'

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Mi Página',
    description: 'Descripción de mi página',
  }
}

export default async function MyPage({ params }: PageProps) {
  const { lang } = await params
  
  // Guard SSR: verificar configuración de la ruta
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
      return notFound()
    }
  } catch (error) {
    console.error(`❌ [SERVER] Error checking route:`, error)
    return notFound()
  }
  
  // Renderizar cliente
  return <MyPageClient lang={lang} />
}
```

## ⚙️ Configuración en el Admin

### 1. Ruta Activa sin Redirección
- Toggle: **VERDE** (activo)
- Dropdown `→`: **Sin redirección**
- Resultado: Muestra la página normalmente

### 2. Ruta Activa con Redirección Personalizada
- Toggle: **VERDE** (activo)
- Dropdown `→`: Seleccionar ruta de destino (ej. `/posts`)
- Resultado: Redirige inmediatamente a la ruta seleccionada

### 3. Ruta Inactiva
- Toggle: **GRIS** (inactivo)
- Resultado: Busca la siguiente ruta activa por prioridad y redirige

### 4. Todas las Rutas Inactivas
- Todos los toggles: **GRIS**
- Resultado: Muestra página de mantenimiento

## 🔧 Funcionamiento Interno

### Orden de Prioridad

```
1. Custom Redirect (redirectTo)
   ↓ Si ruta ACTIVA + redirectTo configurado
   
2. Fallback por Prioridad
   ↓ Si ruta INACTIVA
   
3. Página de Mantenimiento / 404
   ↓ Si todas las rutas INACTIVAS
```

### Flujo de Datos

```
Usuario accede a ruta
        ↓
Fetch /api/admin/routes
        ↓
Verificar route.isVisible && route.redirectTo
        ↓ SI
   Redirect a route.redirectTo
        ↓ NO
Verificar route.isVisible === false
        ↓ SI
   Buscar fallback por prioridad → Redirect
        ↓ NO
Renderizar página normalmente
```

## 📋 Checklist de Implementación

### Para una nueva página

- [ ] Crear archivo `page.tsx` en la estructura `app/[lang]/mi-ruta/`
- [ ] Decidir: ¿Server Component o Client Component?
  - Server: Usar `RouteManagementService.getRoute()` + `redirect()`
  - Client: Usar `useRouteRedirection()` hook
- [ ] Implementar renderizado condicional (loading, maintenance)
- [ ] Verificar que la ruta aparece en `/admin/routes`
- [ ] Configurar prioridad en el widget (drag & drop)
- [ ] Probar redirección personalizada (dropdown `→`)
- [ ] Probar desactivación (toggle OFF)

### Para una página existente

- [ ] Identificar si es Server o Client Component
- [ ] Importar herramientas necesarias
  - Client: `useRouteRedirection` hook
  - Server: `RouteManagementService`
- [ ] Agregar lógica de verificación
- [ ] Probar funcionamiento en `/admin/routes`

## 🎯 Casos de Uso

### Landing Page (Ruta `/`)
- **Activa + Redirect a `/posts`**: Usuario va a `/es` → redirige a `/es/posts`
- **Activa sin redirect**: Usuario ve la landing normalmente
- **Inactiva**: Busca `/posts` (priority 2) y redirige

### Blog (Ruta `/posts`)
- **Activa sin redirect**: Usuario ve el blog normalmente
- **Activa + Redirect a `/work-experience`**: Redirige al portfolio
- **Inactiva**: Busca `/work-experience` (priority 3) y redirige

### Página de Prueba (Ruta `/test`)
- **Activa**: Accesible normalmente
- **Inactiva**: Redirige a `/` (priority 1)

## 🛡️ Seguridad y Fail-Safe

### Fail-Closed
- Si no hay configuración en BD → **404**
- Si hay error en la consulta → **404**
- Solo rutas **explícitamente activas** son accesibles

### Prevención de Loops
- El hook filtra rutas dinámicas (`[lang]`, `[id]`, etc.)
- No se permiten redirecciones a la misma ruta
- No se permiten redirecciones a rutas `/api` o `/admin`

### Logs de Debug
```
🔄 Checking route settings for /mi-ruta...
📋 Route config: { path: '/mi-ruta', isVisible: true, redirectTo: '/posts', priority: 5 }
🔀 Custom redirect to /posts
```

## 📊 Ejemplos Reales en el Proyecto

| Archivo | Tipo | Implementación |
|---------|------|----------------|
| `app/[lang]/page.tsx` | Server | `RouteManagementService` |
| `app/[lang]/root-page-client.tsx` | Client | `useRouteRedirection('/', lang)` |
| `app/[lang]/posts/posts-page-client.tsx` | Client | `useRouteRedirection('/posts', lang)` |
| `app/[lang]/work-experience/page.tsx` | Server | `RouteManagementService` |

---

**Versión**: SingularCMS 1.48.4  
**Última actualización**: 10 de octubre de 2025  
**Mantenido por**: Sistema de Gestión de Rutas

