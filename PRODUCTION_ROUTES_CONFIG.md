# Configuración de Rutas de Producción

## Descripción General

El sistema de gestión de rutas ahora incluye una configuración específica para producción que asegura que solo las rutas esenciales estén activas por defecto después de cada deploy.

## Rutas Activas por Defecto en Producción

### Rutas Principales
- **`/`** - Página principal del sitio
- **`/admin`** - Panel de administración (y todas sus subrutas)
- **`/work-experience`** - Página de experiencia laboral

### Comportamiento
- **En desarrollo**: Todas las rutas están activas por defecto para facilitar el desarrollo
- **En producción**: Solo las rutas listadas arriba están activas por defecto
- **Persistencia**: Los cambios manuales del administrador se mantienen hasta que se vuelvan a cambiar

## Implementación Técnica

### 1. Lógica de Activación por Defecto

\`\`\`typescript
private static shouldRouteBeActiveByDefault(path: string, isProduction: boolean): boolean {
  // En desarrollo, todas las rutas están activas por defecto
  if (!isProduction) {
    return true
  }
  
  // En producción, solo activar rutas específicas
  const allowedPaths = [
    '/', // Página principal
    '/admin', // Panel de administración
    '/work-experience', // Experiencia de trabajo
  ]
  
  // Permitir todas las subrutas de admin
  if (path.startsWith('/admin')) {
    return true
  }
  
  // Verificar si la ruta está en la lista de permitidas
  return allowedPaths.includes(path)
}
\`\`\`

### 2. Creación de Rutas

Cuando se crea una nueva ruta (automáticamente o manualmente), el sistema aplica la lógica de activación por defecto:

\`\`\`typescript
static async createDefaultRoute(path: string): Promise<void> {
  const isProduction = this.isProduction()
  const shouldBeActiveByDefault = this.shouldRouteBeActiveByDefault(path, isProduction)
  
  await sql`
    INSERT INTO route_management (path, is_active, is_indexable, category, priority, modified_by)
    VALUES (${path}, ${shouldBeActiveByDefault}, ${shouldBeActiveByDefault}, ${category}, ${priority}, 'system')
    ON CONFLICT (path) DO NOTHING
  `
}
\`\`\`

### 3. Sincronización de Rutas

El escáner de rutas también respeta esta configuración:

\`\`\`typescript
static async syncRoutesFromScanner(scannedRoutes: Array<{ path: string; type: string; category: string }>): Promise<void> {
  for (const scannedRoute of scannedRoutes) {
    const isProduction = this.isProduction()
    const shouldBeActive = this.shouldRouteBeActiveByDefault(scannedRoute.path, isProduction)
    
    await sql`
      INSERT INTO route_management (path, is_active, is_indexable, category, priority, modified_by)
      VALUES (${scannedRoute.path}, ${shouldBeActive}, ${shouldBeActive}, ${category}, ${priority}, 'scanner')
      ON CONFLICT (path) DO UPDATE SET
        category = EXCLUDED.category,
        priority = EXCLUDED.priority,
        updated_at = CURRENT_TIMESTAMP,
        modified_by = 'scanner'
    `
  }
}
\`\`\`

## API Endpoints

### GET `/api/admin/routes/init-production`
Obtiene información sobre la configuración de producción actual.

**Respuesta:**
\`\`\`json
{
  "success": true,
  "isProduction": true,
  "defaultActiveRoutes": ["/", "/admin", "/work-experience"],
  "stats": {
    "total_routes": 15,
    "active_routes": 3,
    "inactive_routes": 12
  }
}
\`\`\`

### POST `/api/admin/routes/init-production`
Inicializa la configuración de producción para todas las rutas existentes.

**Respuesta:**
\`\`\`json
{
  "success": true,
  "message": "Configuración de producción inicializada correctamente",
  "stats": {
    "total_routes": 15,
    "active_routes": 3,
    "inactive_routes": 12
  },
  "defaultActiveRoutes": ["/", "/admin", "/work-experience"],
  "environment": "production"
}
\`\`\`

## Scripts de Automatización

### Script de Inicialización
\`\`\`bash
npm run init-production-routes
\`\`\`

Este script:
1. Se conecta a la URL de producción configurada
2. Obtiene información actual de las rutas
3. Ejecuta la inicialización de configuración de producción
4. Muestra estadísticas antes y después

### Configuración del Script
\`\`\`javascript
const PRODUCTION_URL = process.env.PRODUCTION_URL || 'https://aaa23444.vercel.app';
\`\`\`

## Panel de Administración

### Sección de Configuración de Producción
En el panel de administración (`/admin/routes`), cuando se detecta que está en producción, se muestra una sección especial que incluye:

1. **Lista de rutas activas por defecto**
2. **Botón para aplicar configuración de producción**
3. **Botón para ver estado actual**
4. **Información sobre el comportamiento del sistema**

### Características
- Solo visible en producción
- Permite aplicar la configuración con un clic
- Muestra feedback inmediato con toasts
- Recarga automáticamente la lista de rutas después de aplicar cambios

## Flujo de Trabajo Recomendado

### 1. Desarrollo
- Todas las rutas están activas por defecto
- Desarrollar y probar sin restricciones
- Los cambios se guardan en la base de datos

### 2. Deploy a Producción
- El sistema detecta automáticamente que está en producción
- Las nuevas rutas se crean con la configuración de producción
- Las rutas existentes mantienen su estado actual

### 3. Post-Deploy
- Ejecutar `npm run init-production-routes` para aplicar configuración
- O usar el botón en el panel de administración
- Verificar que solo las rutas deseadas estén activas

### 4. Gestión Continua
- El administrador puede activar/desactivar rutas manualmente
- Los cambios son persistentes
- La configuración de producción solo se aplica a rutas nuevas o cuando se ejecuta manualmente

## Ventajas del Sistema

1. **Seguridad**: Solo las rutas esenciales están activas por defecto
2. **Flexibilidad**: El administrador puede activar rutas según sea necesario
3. **Persistencia**: Los cambios manuales se mantienen
4. **Automatización**: Configuración automática después del deploy
5. **Transparencia**: Panel de administración muestra claramente el estado
6. **Desarrollo amigable**: No interfiere con el desarrollo local

## Consideraciones Importantes

- **Backup**: Antes de ejecutar la inicialización, es recomendable hacer backup de la configuración actual
- **Testing**: Probar la configuración en un entorno de staging antes de producción
- **Monitoreo**: Verificar que las rutas críticas permanezcan activas después de la inicialización
- **Documentación**: Mantener documentación de qué rutas deben estar activas para el negocio
