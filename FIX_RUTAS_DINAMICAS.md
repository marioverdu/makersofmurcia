# Fix: Rutas Dinámicas (Posts View)

## 🐛 Problema Reportado

**Usuario**: "Por qué las `/es/posts/view/26` no se ven si tengo la ruta de `/posts/` activa?"

**Causa**: La ruta `/posts` y la ruta `/posts/view/[id]` son **rutas diferentes** en el sistema de gestión. Aunque `/posts` estuviera activa, `/posts/view/[id]` necesitaba su propia configuración de protección.

---

## ✅ Solución Implementada

### 1. Protección en Server Component

**Archivo**: `app/[lang]/posts/view/[id]/page.tsx`

**Cambios**:
- ✅ Agregado `RouteManagementService` para verificar visibilidad
- ✅ Implementada lógica de redirección personalizada
- ✅ Actualizado tipo de `params` a `Promise<{ lang: Locale; id: string }>` (Next.js 15)
- ✅ Ajustados todos los `await params` en `generateMetadata` y componente

**Código agregado**:
```typescript
// Guard SSR: verificar configuración de la ruta
// Para rutas dinámicas, verificamos el patrón /[lang]/posts/view/[id]
try {
  const route = await RouteManagementService.getRoute('/[lang]/posts/view/[id]')
  
  if (route) {
    // PRIORIDAD 1: Si la ruta está activa Y tiene redirectTo, redirigir
    if (route.is_active && route.redirect_to) {
      redirect(`/${lang}${route.redirect_to}`)
    }
    
    // PRIORIDAD 2: Si la ruta está inactiva, no renderizar
    if (!route.is_active) {
      return notFound()
    }
  } else {
    // Si no hay configuración, permitir acceso (contenido público)
    console.log(`⚠️ [SERVER] PostView: No route config found, allowing access`)
  }
} catch (error) {
  console.error(`❌ [SERVER] PostView: Error checking route:`, error)
  // En caso de error, permitir acceso (fail-open para contenido)
}
```

**Estrategia: Fail-Open**
- A diferencia de rutas principales (`/`, `/posts`, `/work-experience`) que son **fail-closed** (bloquean si no hay config)
- Las vistas de posts individuales son **fail-open** (permiten acceso si no hay config)
- Razón: Las vistas de posts son contenido público que debe ser accesible

---

### 2. Simplificación de Client Component

**Archivo**: `app/[lang]/posts/view/[id]/post-view-client.tsx`

**Cambios**:
- ❌ **Eliminado** `useEffect` de verificación de visibilidad (~60 líneas)
- ❌ **Eliminado** estado `checkingVisibility`
- ❌ **Eliminado** estado `maintenance`
- ❌ **Eliminado** renderizado condicional de página de mantenimiento
- ✅ **Agregada** nota: "La protección de rutas se maneja en el Server Component"

**Razón**: El Server Component ya maneja toda la protección antes de renderizar el cliente, haciendo redundante la verificación en el cliente.

---

## 📊 Estado en Base de Datos

```sql
SELECT path, is_active, redirect_to, priority
FROM route_management
WHERE path LIKE '%/posts%'
ORDER BY path
```

**Rutas relevantes**:
```
[2]  /[lang]/posts               - ✅ ACTIVA
[3]  /[lang]/posts/view/[id]     - ✅ ACTIVA
[5]  /posts                      - ✅ ACTIVA
[15] /posts/view/[id]            - ✅ ACTIVA
```

**Nota**: Existen tanto rutas con patrón `/[lang]/posts/view/[id]` como `/posts/view/[id]`. El código verifica `/[lang]/posts/view/[id]` que es el patrón correcto para la estructura de carpetas.

---

## 🧪 Pruebas

### Test 1: Acceso Normal
```
1. Asegurar /[lang]/posts/view/[id] ACTIVA en BD
2. Ir a /es/posts/view/26
3. ✅ RESULTADO: Debe mostrar el post #26
```

### Test 2: Ruta Inactiva
```
1. Desactivar toggle de /[lang]/posts/view/[id] en /admin/routes
2. Ir a /es/posts/view/26
3. ✅ RESULTADO: Debe mostrar 404
```

### Test 3: Redirección Personalizada
```
1. Activar /[lang]/posts/view/[id]
2. Configurar redirectTo → /posts
3. Ir a /es/posts/view/26
4. ✅ RESULTADO: Debe redirigir a /es/posts
```

---

## 🔑 Diferencia: Rutas Dinámicas vs Estáticas

### Rutas Estáticas
- **Ejemplo**: `/`, `/posts`, `/work-experience`
- **Path en BD**: Exactamente igual, ej. `/posts`
- **Estrategia**: Fail-closed (bloquean si no hay config)

### Rutas Dinámicas
- **Ejemplo**: `/posts/view/[id]`, `/posts/view/26`
- **Path en BD**: Patrón con corchetes, ej. `/[lang]/posts/view/[id]`
- **URL Real**: `/es/posts/view/26`, `/en/posts/view/5`
- **Estrategia**: Fail-open (permiten acceso si no hay config)

---

## 📝 Lecciones Aprendidas

### 1. Jerarquía de Rutas
```
/posts                    ← Ruta padre (independiente)
/posts/view/[id]          ← Ruta hija (independiente)
/posts/view/26            ← Instancia de ruta dinámica
```

**Cada una es una ruta separada** en el sistema de gestión.

### 2. Redundancia Cliente/Servidor
- ✅ **Server Components**: Protección segura y definitiva
- ❌ **Client Components**: Verificación redundante e innecesaria
- **Conclusión**: Proteger solo en Server, simplificar Cliente

### 3. Patrones de Rutas en BD
Para rutas dinámicas, el path en BD debe incluir:
- `[lang]` si está dentro de `app/[lang]/`
- `[id]`, `[slug]`, etc. para parámetros dinámicos

**Ejemplos**:
```
app/[lang]/posts/page.tsx              → /[lang]/posts
app/[lang]/posts/view/[id]/page.tsx    → /[lang]/posts/view/[id]
app/posts/[slug]/page.tsx              → /posts/[slug]
```

---

## 🎯 Otras Rutas Dinámicas en el Proyecto

### Rutas que podrían necesitar el mismo fix

1. **`/posts/[slug]`**
   - Archivo: `app/posts/[slug]/page.tsx` (si existe)
   - Path en BD: `/posts/[slug]`

2. **API Routes con parámetros**
   - Ya funcionan porque no tienen protección de rutas
   - Ejemplo: `/api/posts/[id]`, `/api/posts/[id]/view`

---

## ✅ Resultado Final

**Antes**:
```
/es/posts         → ✅ Funciona (protegida)
/es/posts/view/26 → ❌ Error (sin protección)
```

**Después**:
```
/es/posts         → ✅ Funciona (protegida en Server)
/es/posts/view/26 → ✅ Funciona (protegida en Server)
```

---

## 📚 Documentación Relacionada

- `GUIA_REDIRECCION_RUTAS.md` - Cómo implementar protección en nuevas rutas
- `SISTEMA_REDIRECCION_PERSONALIZADA.md` - Documentación técnica del sistema
- `SOLUCION_REDIRECCION_404.md` - Fix del error 404 en redirecciones

---

**Fecha**: 10 de octubre de 2025  
**Versión**: SingularCMS 1.48.4  
**Estado**: ✅ RESUELTO

