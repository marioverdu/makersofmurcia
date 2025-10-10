# Solución: Error 404 en Redirecciones

## 🐛 Problema Identificado

**Síntoma**: La URL cambiaba correctamente (ej. de `/` a `/posts`), pero mostraba **404** en lugar del contenido de la página de destino.

**Causa Raíz**: 
1. ❌ La BD tenía `/[lang]/posts` en lugar de `/posts` en el campo `redirect_to`
2. ❌ El código construía `/es/[lang]/posts` en lugar de `/es/posts`
3. ❌ El widget permitía seleccionar rutas dinámicas con `[lang]` en el dropdown

## ✅ Soluciones Implementadas

### 1. Limpieza de Base de Datos

**Antes**:
```sql
redirect_to = '/[lang]/posts'
```

**Después**:
```sql
redirect_to = '/posts'
```

**Script ejecutado**:
```javascript
UPDATE route_management
SET redirect_to = REPLACE(redirect_to, '/[lang]', '')
WHERE redirect_to LIKE '%/[lang]%'
```

**Resultado**: 1 ruta actualizada (`/` → `/posts`)

---

### 2. Actualización del Widget

**Archivo**: `components/admin/routes-widget.tsx`

**Cambio**: Filtrar rutas dinámicas del dropdown

```typescript
// ANTES
routes.filter(r => 
  r.path !== route.path && 
  r.path !== '__ALL__' && 
  !r.path.startsWith('/api') && 
  !r.path.startsWith('/admin')
)

// DESPUÉS
routes.filter(r => 
  r.path !== route.path && 
  r.path !== '__ALL__' && 
  !r.path.startsWith('/api') && 
  !r.path.startsWith('/admin') &&
  !r.path.includes('[') &&  // ← NUEVO: Excluir rutas dinámicas
  !r.path.includes(']')
)
```

**Rutas excluidas del dropdown**:
- `/[lang]`
- `/[lang]/posts`
- `/posts/view/[id]`
- Cualquier ruta con `[param]`

**Rutas permitidas en el dropdown**:
- `/`
- `/posts`
- `/work-experience`
- `/test`
- etc.

---

### 3. Hook Reutilizable

**Archivo nuevo**: `hooks/use-route-redirection.ts`

**Propósito**: Centralizar la lógica de redirección para que **cualquier página** pueda usarla fácilmente.

**Uso**:
```typescript
const { isChecking, showMaintenance } = useRouteRedirection('/mi-ruta', lang)
```

**Beneficios**:
- ✅ Código DRY (Don't Repeat Yourself)
- ✅ Fácil de implementar en nuevas páginas
- ✅ Lógica consistente en todo el proyecto
- ✅ Fácil de mantener y actualizar

---

### 4. Simplificación de Páginas

**Archivos actualizados**:
- `app/[lang]/root-page-client.tsx` (Cliente)
- `app/[lang]/posts/posts-page-client.tsx` (Cliente)

**Antes** (60+ líneas de lógica duplicada):
```typescript
useEffect(() => {
  const checkRouteSettings = async () => {
    // ... 60+ líneas de lógica ...
  }
  checkRouteSettings()
}, [router, lang, isProduction])
```

**Después** (1 línea):
```typescript
const { isChecking, showMaintenance } = useRouteRedirection('/posts', lang)
```

**Reducción**: **~120 líneas de código eliminadas** entre ambos archivos

---

### 5. Documentación Completa

**Archivos creados**:
1. `SISTEMA_REDIRECCION_PERSONALIZADA.md` - Documentación técnica del sistema
2. `GUIA_REDIRECCION_RUTAS.md` - Guía paso a paso para implementar en nuevas páginas
3. `SOLUCION_REDIRECCION_404.md` - Este archivo (solución del problema)

---

## 🧪 Pruebas Realizadas

### Test 1: Redirección Personalizada
```
1. Ir a /admin/routes
2. Configurar / → /posts (dropdown)
3. Asegurar toggle de / ACTIVO
4. Ir a /es
5. ✅ RESULTADO: Redirige a /es/posts y muestra contenido
```

### Test 2: Redirección con Locale
```
1. Configurar / → /posts
2. Ir a /en
3. ✅ RESULTADO: Redirige a /en/posts (respeta el locale)
```

### Test 3: Rutas Dinámicas Excluidas
```
1. Ir a /admin/routes
2. Abrir dropdown de redirección de /
3. ✅ RESULTADO: No se muestran /[lang], /[lang]/posts, etc.
```

### Test 4: Fallback por Prioridad
```
1. Desactivar toggle de /
2. Activar toggle de /posts (priority 2)
3. Ir a /es
4. ✅ RESULTADO: Redirige a /es/posts (siguiente activa)
```

---

## 📊 Estado Actual del Sistema

| Componente | Estado | Notas |
|------------|--------|-------|
| Columna `redirect_to` en BD | ✅ Limpia | Sin patrones `[lang]` |
| Widget dropdown | ✅ Filtrado | Excluye rutas dinámicas |
| Hook `useRouteRedirection` | ✅ Implementado | Reutilizable |
| `/` (root) | ✅ Usando hook | Simplificado |
| `/posts` | ✅ Usando hook | Simplificado |
| `/work-experience` | ✅ SSR directo | Server Component |
| Documentación | ✅ Completa | 3 archivos MD |

---

## 🎯 Lecciones Aprendidas

### 1. Separación de Responsabilidades
- **BD**: Solo guarda `/posts` (sin locale)
- **Código**: Construye `/${lang}/posts` dinámicamente
- **Widget**: Filtra rutas no permitidas

### 2. Rutas Dinámicas vs Estáticas
- **Dinámicas** (`/[lang]`, `/[id]`): Son patrones de Next.js, NO rutas finales
- **Estáticas** (`/`, `/posts`): Son rutas reales a las que se puede redirigir

### 3. DRY con Hooks Personalizados
- Centralizar lógica compleja en hooks reutilizables
- Facilita mantenimiento y evolución del código
- Reduce duplicación y errores

---

## 🚀 Próximos Pasos (Opcionales)

### Mejoras Potenciales

1. **Validación de Ciclos**
   - Detectar si `A → B → C → A`
   - Mostrar advertencia en el widget

2. **Historial de Redirecciones**
   - Registrar en BD: `redirect_from`, `redirect_to`, `timestamp`
   - Analytics: rutas más redirigidas

3. **Redirecciones Temporales**
   - Campo `redirect_until` (fecha)
   - Auto-desactivar redirección después de esa fecha

4. **Testing Automatizado**
   - Tests E2E con Playwright
   - Verificar todos los escenarios de redirección

5. **Interfaz Mejorada**
   - Preview de la ruta de destino
   - Contador de redirecciones activas
   - Botón "Probar redirección"

---

## 📝 Checklist de Implementación Futura

Para nuevas rutas que necesiten redirección:

- [ ] La ruta aparece en `/admin/routes`?
- [ ] El path NO contiene `[` ni `]`?
- [ ] Implementar `useRouteRedirection()` (Client) o `RouteManagementService` (Server)
- [ ] Probar redirección personalizada (dropdown `→`)
- [ ] Probar desactivación (toggle OFF → fallback)
- [ ] Verificar logs en consola
- [ ] Probar con ambos locales (`/es` y `/en`)

---

## 🎉 Resultado Final

✅ **Las redirecciones personalizadas funcionan end-to-end**

1. Configuración en `/admin/routes` (dropdown)
2. Persistencia en PostgreSQL (`redirect_to`)
3. Ejecución automática en todas las rutas
4. Compatible con i18n (locale)
5. Sistema de fallback por prioridad
6. Código limpio y reutilizable

---

**Fecha**: 10 de octubre de 2025  
**Versión**: SingularCMS 1.48.4  
**Estado**: ✅ RESUELTO Y DOCUMENTADO

