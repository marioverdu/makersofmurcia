# 🚀 NavigationWrapper - Guía para evitar warnings de despliegue

## 📋 Problema

Al desplegar en Vercel v0, Next.js muestra warnings como:
```
useSearchParams() should be wrapped in a suspense boundary
usePathname() should be wrapped in a suspense boundary
```

## ✅ Solución

Usar el componente `NavigationWrapper` para envolver componentes que usan hooks de navegación.

## 🔧 Uso

### Antes (causa warnings):
```tsx
"use client"
import { useSearchParams, usePathname } from "next/navigation"

export default function MyComponent() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  
  return <div>...</div>
}
```

### Después (sin warnings):
```tsx
"use client"
import { useSearchParams, usePathname } from "next/navigation"
import { NavigationWrapper } from "@/components/ui/navigation-wrapper"

function MyComponentContent() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  
  return <div>...</div>
}

export default function MyComponent() {
  return (
    <NavigationWrapper>
      <MyComponentContent />
    </NavigationWrapper>
  )
}
```

## 📁 Archivos que ya usan NavigationWrapper

- ✅ `app/login/page.tsx` - Usa `useSearchParams()`

## 📝 Archivos que podrían necesitar NavigationWrapper

Componentes que usan hooks de navegación:
- `components/analytics-tracker.tsx` - `usePathname()`
- `components/ui/header/tabs.tsx` - `usePathname()`
- `app/[lang]/posts/posts-page-client.tsx` - `usePathname()`, `useRouter()`
- `app/[lang]/posts/view/[id]/post-view-client.tsx` - `useRouter()`
- `app/work-experience/work-experience-client.tsx` - `usePathname()`, `useRouter()`
- Y otros...

## 🎯 Beneficios

1. **Elimina warnings de despliegue**
2. **Mejora la experiencia de usuario** con fallbacks
3. **Código más limpio** y reutilizable
4. **Compatibilidad con SSR/SSG**

## 🔄 Migración

Para migrar un componente existente:

1. Crear un componente interno con el contenido
2. Envolver el componente principal con `NavigationWrapper`
3. Exportar el componente envuelto

```tsx
// Paso 1: Crear componente interno
function ComponentContent() {
  const searchParams = useSearchParams()
  // ... resto del código
}

// Paso 2: Envolver y exportar
export default function Component() {
  return (
    <NavigationWrapper>
      <ComponentContent />
    </NavigationWrapper>
  )
}
```
