# Sistema de Rutas Administrables con Control SEO

Este sistema permite gestionar completamente las rutas de la aplicación desde `/admin/routes`, incluyendo control de visibilidad, indexación SEO y configuración de motores de búsqueda.

## 🚀 Características

### ✅ Control de Visibilidad
- Activar/desactivar rutas desde el panel de administración
- Protección automática con autenticación Google ID
- Redirección inteligente a rutas activas
- Página de mantenimiento personalizada

### 🔍 Control SEO Completo
- **Indexación**: Controlar si las rutas aparecen en motores de búsqueda
- **Robots.txt dinámico**: Generado automáticamente basado en configuraciones
- **Sitemap.xml dinámico**: Solo incluye rutas activas e indexables
- **Meta tags dinámicos**: SEO title, description, keywords configurables
- **Prioridades**: Control de prioridad en sitemaps y navegación

### 📊 Estadísticas y Logs
- Contador de accesos por ruta
- Logs de acceso con IP y User-Agent
- Estadísticas en tiempo real
- Auditoría de cambios

## 🛠️ Instalación

### 1. Inicializar Base de Datos

\`\`\`bash
# Ejecutar el script de inicialización (no requiere psql)
npm run init-routes-db
\`\`\`

Este comando:
- Crea las tablas `route_management` y `route_access_logs`
- Inserta rutas por defecto
- Configura índices y triggers
- Crea vista de estadísticas
- **No requiere psql instalado**

### 2. Verificar Configuración

Asegúrate de tener en tu `.env.local`:

\`\`\`env
DATABASE_URL=postgresql://...
GOOGLE_ID=tu_google_id
NEXTAUTH_SECRET=tu_secret
ADMIN_EMAIL=tu_email_admin
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
\`\`\`

### 3. Reiniciar Servidor

\`\`\`bash
npm run dev
\`\`\`

## 📋 Uso

### Panel de Administración

Accede a `/admin/routes` para gestionar todas las rutas:

1. **Visibilidad**: Toggle para activar/desactivar rutas
2. **SEO**: Configurar indexación, robots, sitemap
3. **Metadatos**: Editar title, description, keywords
4. **Prioridades**: Establecer orden en sitemaps

### Configuración SEO por Ruta

Cada ruta tiene las siguientes opciones:

- **is_active**: Controla si la ruta es accesible
- **is_indexable**: Controla si aparece en motores de búsqueda
- **robots_allow**: Controla si los robots pueden acceder
- **sitemap_include**: Controla si aparece en sitemap.xml
- **seo_title**: Título para motores de búsqueda
- **seo_description**: Descripción para motores de búsqueda
- **seo_keywords**: Palabras clave
- **priority**: Prioridad en sitemaps (0-10)

### APIs Disponibles

#### GET /api/admin/routes
Obtiene todas las rutas con sus configuraciones

#### POST /api/admin/routes
Actualiza visibilidad de una ruta

#### GET /api/admin/routes/seo?path=/ruta
Obtiene configuración SEO de una ruta específica

#### PUT /api/admin/routes/seo
Actualiza configuración SEO de una ruta

#### GET /robots.txt
Robots.txt dinámico basado en configuraciones

#### GET /sitemap.xml
Sitemap.xml dinámico con solo rutas activas e indexables

## 🔧 Componentes

### SEOMetaTags
Componente para agregar meta tags dinámicos a las páginas:

\`\`\`tsx
import { SEOMetaTags } from "@/components/seo-meta-tags"

export default function MiPagina() {
  return (
    <>
      <SEOMetaTags 
        path="/mi-ruta"
        fallbackTitle="Título por defecto"
        fallbackDescription="Descripción por defecto"
      />
      {/* Contenido de la página */}
    </>
  )
}
\`\`\`

### RouteManagementService
Servicio principal para gestionar rutas:

\`\`\`typescript
import { RouteManagementService } from "@/lib/route-management-service"

// Obtener configuración de una ruta
const route = await RouteManagementService.getRoute("/mi-ruta")

// Actualizar visibilidad
await RouteManagementService.setRouteVisibility("/mi-ruta", false)

// Obtener rutas para sitemap
const sitemapRoutes = await RouteManagementService.getSitemapRoutes()
\`\`\`

## 🚨 Comportamiento del Sistema

### Rutas Activas
- ✅ Accesibles para usuarios
- ✅ Indexables por motores de búsqueda
- ✅ Incluidas en sitemap.xml
- ✅ Permitidas en robots.txt

### Rutas Inactivas
- ❌ Redirigidas a página de mantenimiento
- ❌ No indexables
- ❌ Excluidas de sitemap.xml
- ❌ Bloqueadas en robots.txt

### Rutas Admin
- 🔒 Protegidas por autenticación Google ID
- 🚫 Nunca indexables
- 🚫 Excluidas de sitemap
- 🚫 Bloqueadas en robots.txt

## 📊 Monitoreo

### Logs de Acceso
Todas las visitas se registran en `route_access_logs`:
- IP del visitante
- User-Agent
- Si el acceso fue permitido/denegado
- Razón del acceso/denegación
- Tiempo de respuesta

### Estadísticas
Vista `route_stats` con:
- Total de rutas
- Rutas activas/inactivas
- Rutas indexables/no indexables
- Rutas en sitemap
- Rutas permitidas en robots

## 🔒 Seguridad

### Autenticación
- Protección con Google ID desde `env.local`
- Verificación de email admin
- Acceso libre solo en localhost/desarrollo

### Middleware
- Verificación de visibilidad en cada request
- Logging de accesos
- Redirección automática a rutas activas
- Página de mantenimiento personalizada

## 🐛 Troubleshooting

### Error: "DATABASE_URL no está configurado"
\`\`\`bash
# Verificar que existe .env.local con:
DATABASE_URL=postgresql://...
\`\`\`

### Error: "psql: command not found"
\`\`\`bash
# El nuevo script no requiere psql, usa la conexión directa de la aplicación
# Si tienes problemas, verifica que DATABASE_URL esté configurado correctamente
\`\`\`

### Error: "Connection to server"
- Verificar que DATABASE_URL sea correcto
- Verificar que la base de datos esté accesible
- Verificar credenciales

### Rutas no se actualizan
\`\`\`bash
# Reiniciar servidor
npm run dev

# Verificar logs en consola
# Verificar conexión a BD
\`\`\`

## 📝 Mantenimiento

### Limpiar Logs Antiguos
\`\`\`typescript
// Automático: logs se limpian después de 30 días
await RouteManagementService.cleanupOldLogs()
\`\`\`

### Sincronizar Rutas Nuevas
\`\`\`typescript
// Al agregar nuevas rutas, sincronizar automáticamente
await RouteManagementService.syncRoutesFromScanner(scannedRoutes)
\`\`\`

### Backup de Configuraciones
\`\`\`sql
-- Exportar configuraciones
SELECT * FROM route_management;

-- Importar configuraciones
INSERT INTO route_management (...) VALUES (...);
\`\`\`

## 🎯 Próximas Mejoras

- [ ] Interfaz de edición SEO más avanzada
- [ ] Bulk operations para múltiples rutas
- [ ] Historial de cambios con rollback
- [ ] Integración con Google Search Console
- [ ] Análisis de rendimiento SEO
- [ ] Notificaciones de cambios críticos

---

**Sistema desarrollado manteniendo todas las dependencias del `package-lock.json` actual y protegido por la variable de entorno `GOOGLE_ID` de `env.local`.**
