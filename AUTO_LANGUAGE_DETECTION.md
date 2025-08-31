# 🌍 **Detección Automática de Idioma del Navegador**

## 📋 **Resumen de la Funcionalidad**

Tu aplicación ahora **detecta automáticamente el idioma del navegador** del usuario y redirige las páginas principales al idioma correspondiente:

- **Navegador en español** → Páginas cargan en español (`/es/`, `/es/posts`, `/es/work-experience`)
- **Navegador en inglés** → Páginas cargan en inglés (`/en/`, `/en/posts`, `/en/work-experience`)
- **Navegador en otro idioma** → Páginas cargan en inglés (por defecto para idiomas no soportados)

## 🎯 **Páginas que Aplican Detección Automática**

### **✅ TODAS las Rutas Aplican:**
- **`/`** (página raíz)
- **`/posts`** (blog)
- **`/work-experience`** (experiencia laboral)
- **`/contact`** (contacto)
- **`/login`** (inicio de sesión)
- **`/signup`** (registro)
- **`/test`** (páginas de prueba)
- **`/debug`** (herramientas de debug)
- **`/cookie-widget`** (widget de cookies)
- **`/price-estimator-test`** (estimador de precios)
- **`/resend-test`** (pruebas de resend)
- **`/seo-test`** (pruebas de SEO)
- **`/notion-database-test`** (pruebas de Notion)
- **`/home-test`** (pruebas de home)
- **`/work-experience-db-test`** (pruebas de base de datos)
- **Y cualquier otra ruta nueva** que se agregue en el futuro

### **❌ Única Excepción:**
- **`/admin`** (panel de administración) - **NO aplica** internacionalización

## 🔧 **Cómo Funciona la Detección**

### **1. Header `Accept-Language`**
El navegador envía automáticamente este header con los idiomas preferidos del usuario:

```
Accept-Language: en-US,en;q=0.9,es;q=0.8,fr;q=0.7
```

### **2. Análisis de Prioridades**
El sistema analiza y ordena los idiomas por prioridad:

```typescript
// Ejemplo de parsing:
"en-US,en;q=0.9,es;q=0.8,fr;q=0.7"
↓
[
  { code: "en", quality: 1.0 },    // en-US (prioridad máxima)
  { code: "en", quality: 0.9 },    // en
  { code: "es", quality: 0.8 },    // es
  { code: "fr", quality: 0.7 }     // fr
]
```

### **3. Selección del Idioma**
- **Si encuentra español**: redirige a `/es/`
- **Si encuentra inglés**: redirige a `/en/`
- **Si no encuentra ninguno**: usa español por defecto

## 🚀 **Flujo de Funcionamiento**

### **Escenario 1: Navegador en Inglés**
```
Usuario va a: /
↓
Middleware detecta: Accept-Language: en-US,en;q=0.9
↓
Redirige a: /en/
↓
Página carga en inglés
```

### **Escenario 2: Navegador en Español**
```
Usuario va a: /
↓
Middleware detecta: Accept-Language: es-ES,es;q=0.9
↓
Redirige a: /es/
↓
Página carga en español
```

### **Escenario 3: Navegador en Francés**
```
Usuario va a: /
↓
Middleware detecta: Accept-Language: fr-FR,fr;q=0.9
↓
Redirige a: /en/ (inglés por defecto para idiomas no soportados)
↓
Página carga en inglés
```

## 🧪 **Pruebas en Desarrollo**

### **Simular Navegador en Inglés:**
```bash
# Usando curl - funciona en TODAS las páginas
curl -H "Accept-Language: en-US,en;q=0.9" http://localhost:3000/
curl -H "Accept-Language: en-US,en;q=0.9" http://localhost:3000/posts
curl -H "Accept-Language: en-US,en;q=0.9" http://localhost:3000/contact
curl -H "Accept-Language: en-US,en;q=0.9" http://localhost:3000/login

# Usando navegador
# Cambiar idioma del navegador a inglés
# Ir a CUALQUIER página (excepto /admin)
# Debería redirigir a la versión en inglés
```

### **Simular Navegador en Español:**
```bash
# Usando curl - funciona en TODAS las páginas
curl -H "Accept-Language: es-ES,es;q=0.9" http://localhost:3000/
curl -H "Accept-Language: es-ES,es;q=0.9" http://localhost:3000/posts
curl -H "Accept-Language: es-ES,es;q=0.9" http://localhost:3000/contact
curl -H "Accept-Language: es-ES,es;q=0.9" http://localhost:3000/login

# Usando navegador
# Cambiar idioma del navegador a español
# Ir a CUALQUIER página (excepto /admin)
# Debería redirigir a la versión en español
```

## 🔍 **Logs de Debugging**

En desarrollo, el middleware muestra logs cuando detecta idiomas:

```
🌍 [Middleware] Redirecting / to /en/ (browser language detected)
🌍 [Middleware] Redirecting /posts to /en/posts (browser language detected)
🌍 [Middleware] Redirecting /work-experience to /es/work-experience (browser language detected)
```

## ⚙️ **Configuración del Sistema**

### **Idiomas Soportados:**
```typescript
const locales: Locale[] = ['es', 'en']
```

### **Idioma por Defecto:**
```typescript
const defaultLocale: Locale = 'es'
```

### **Rutas que Aplican Detección:**
```typescript
// TODAS las rutas aplican detección automática de idioma
// Solo se excluyen las rutas que empiecen con /admin
if (!pathname.startsWith('/admin')) {
  // Aplicar detección de idioma
}
```

## 🌐 **Comportamiento en Diferentes Entornos**

### **Desarrollo (`NODE_ENV=development`):**
- ✅ **SÍ aplica** detección automática de idioma
- ✅ Redirige a `/es/` o `/en/` según el navegador
- ✅ Logs de debugging disponibles

### **Producción:**
- ✅ **SÍ aplica** detección automática de idioma
- ✅ Redirige a `/es/` o `/en/` según el navegador
- ✅ Sin logs de debugging

## 🎯 **Casos de Uso**

### **1. Usuario Español en España:**
- **Navegador**: Español
- **Accede a**: `https://tudominio.com/` o `https://tudominio.com/posts` o `https://tudominio.com/contact`
- **Resultado**: Redirige a `https://tudominio.com/es/` o `/es/posts` o `/es/contact`
- **Experiencia**: Contenido en español

### **2. Usuario Inglés en Reino Unido:**
- **Navegador**: Inglés
- **Accede a**: `https://tudominio.com/` o `https://tudominio.com/posts` o `https://tudominio.com/contact`
- **Resultado**: Redirige a `https://tudominio.com/en/` o `/en/posts` o `/en/contact`
- **Experiencia**: Contenido en inglés

### **3. Usuario Alemán en Alemania:**
- **Navegador**: Alemán
- **Accede a**: `https://tudominio.com/` o `https://tudominio.com/posts` o `https://tudominio.com/contact`
- **Resultado**: Redirige a `https://tudominio.com/en/` o `/en/posts` o `/en/contact` (inglés por defecto)
- **Experiencia**: Contenido en inglés

### **4. Usuario en Cualquier Página (excepto admin):**
- **Navegador**: Cualquier idioma
- **Accede a**: Cualquier ruta (excepto `/admin/*`)
- **Resultado**: Redirige automáticamente a la versión en su idioma preferido
- **Experiencia**: Contenido en el idioma detectado automáticamente

## 🔧 **Personalización Avanzada**

### **Agregar Nuevos Idiomas:**
```typescript
// En middleware.ts
const locales: Locale[] = ['es', 'en', 'fr', 'de']

// En types/i18n.ts
export type Locale = 'es' | 'en' | 'fr' | 'de'

// Crear diccionarios
app/dictionaries/fr.json
app/dictionaries/de.json
```

### **Cambiar Idioma por Defecto:**
```typescript
// En middleware.ts
const defaultLocale: Locale = 'en' // Cambiar de 'es' a 'en'
```

### **Agregar Más Rutas:**
```typescript
// En middleware.ts
const mainRoutes = ['/', '/posts', '/work-experience', '/contact', '/about']
```

## 🎉 **Resultado Final**

### **Funcionalidades Implementadas:**
- ✅ **Detección automática** del idioma del navegador
- ✅ **Redirección inteligente** a `/es/` o `/en/`
- ✅ **Funciona en desarrollo** y producción
- ✅ **Logs de debugging** en desarrollo
- ✅ **Configuración flexible** para futuras expansiones

### **Experiencia del Usuario:**
1. **Usuario accede** a cualquier página principal
2. **Sistema detecta** automáticamente su idioma preferido
3. **Redirige automáticamente** a la versión en su idioma
4. **Página carga** en el idioma correcto
5. **Usuario puede cambiar** manualmente si lo desea

---

**¡La detección automática de idioma está completamente implementada y funcionando!** 🚀

**Para probar:**
1. **Cambia el idioma de tu navegador** a inglés
2. **Ve a la raíz** (`/`)
3. **Debería redirigir automáticamente** a `/en/`
4. **La página debería cargar** en inglés
