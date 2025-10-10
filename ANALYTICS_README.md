# Sistema de Analíticas

Un sistema de analíticas genérico y ligero para tu aplicación Next.js, que funciona con Neon Database.

## 🚀 Características

- **Mínimas dependencias**: Solo usa `recharts` (ya instalado) y tu base de datos Neon existente
- **Datos reales**: Trabaja con datos reales desde el minuto 0
- **Tracking automático**: Registra vistas de página, rendimiento y eventos personalizados
- **Dashboard completo**: Interfaz moderna con gráficas y métricas
- **Fácil integración**: Componente simple para añadir a cualquier página

## 📊 Métricas Incluidas

- **Vistas de página**: Total de visitas por período
- **Usuarios únicos**: Sesiones únicas
- **Duración de sesión**: Tiempo promedio por sesión
- **Páginas más visitadas**: Top 10 páginas
- **Fuentes de tráfico**: Referrers principales
- **Dispositivos**: Desktop, Mobile, Tablet
- **Navegadores**: Chrome, Firefox, Safari, Edge, etc.
- **Rendimiento**: Tiempos de carga por página
- **Eventos personalizados**: Clicks, scrolls, formularios, etc.

## 🛠️ Instalación

### 1. Configurar Base de Datos

Ejecuta el script SQL en tu base de datos Neon:

\`\`\`bash
node scripts/run-analytics-setup.js
\`\`\`

Luego copia y ejecuta el contenido de `scripts/init-analytics-tables.sql` en tu SQL Editor de Neon.

### 2. Acceder al Dashboard

Una vez configurado, accede a:
\`\`\`
http://localhost:3000/admin/analytics
\`\`\`

## 📈 Uso del Tracking

### Tracking Automático

Para añadir tracking a cualquier página:

\`\`\`tsx
import { AnalyticsTracker } from '@/components/analytics-tracker'

export default function MiPagina() {
  return (
    <div>
      <AnalyticsTracker 
        trackPerformance={true}
        trackScroll={true}
        trackClicks={false}
        customEvents={[
          {
            selector: 'button[data-track="contact"]',
            event: 'click',
            category: 'conversion',
            label: 'contact_button_click'
          }
        ]}
      />
      
      <h1>Mi Página</h1>
      <button data-track="contact">Contactar</button>
    </div>
  )
}
\`\`\`

### Opciones de Tracking

- `trackPerformance`: Registra métricas de rendimiento (tiempos de carga)
- `trackScroll`: Registra eventos de scroll (25%, 50%, 75%, 100%)
- `trackClicks`: Registra todos los clicks en la página
- `customEvents`: Array de eventos personalizados a trackear

### Eventos Personalizados

\`\`\`tsx
customEvents={[
  {
    selector: 'button[data-track="contact"]', // Selector CSS
    event: 'click',                           // Tipo de evento
    category: 'conversion',                   // Categoría
    label: 'contact_button_click'             // Etiqueta
  },
  {
    selector: 'form[data-track="price-estimator"]',
    event: 'submit',
    category: 'conversion',
    label: 'price_estimator_submit'
  }
]}
\`\`\`

## 🗄️ Estructura de la Base de Datos

### Tablas Creadas

1. **page_events**: Eventos de vista de página
2. **user_metrics**: Métricas de usuarios y sesiones
3. **performance_metrics**: Métricas de rendimiento
4. **custom_events**: Eventos personalizados

### Datos de Ejemplo

El script incluye datos de ejemplo para que puedas ver el dashboard funcionando inmediatamente.

## 📱 API Endpoints

### GET /api/admin/analytics

Obtener datos de analíticas:

\`\`\`javascript
// Resumen general
fetch('/api/admin/analytics?days=30')

// Eventos de página
fetch('/api/admin/analytics?type=page-events&page_path=/admin')

// Métricas de rendimiento
fetch('/api/admin/analytics?type=performance&page_path=/admin')

// Eventos personalizados
fetch('/api/admin/analytics?type=custom-events&event_name=click')
\`\`\`

### POST /api/admin/analytics

Registrar eventos:

\`\`\`javascript
// Vista de página
fetch('/api/admin/analytics', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'pageview',
    data: {
      page_path: '/admin',
      user_agent: navigator.userAgent,
      session_id: 'session_123'
    }
  })
})

// Evento personalizado
fetch('/api/admin/analytics', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'custom-event',
    data: {
      event_name: 'button_click',
      event_category: 'conversion',
      page_path: '/contact'
    }
  })
})
\`\`\`

## 🎨 Personalización

### Colores de las Gráficas

Modifica los colores en `app/admin/analytics/page.tsx`:

\`\`\`tsx
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']
\`\`\`

### Métricas Adicionales

Añade nuevas métricas en `lib/analytics-service.ts`:

\`\`\`tsx
// En getAnalyticsSummary()
const newMetric = await sql`
  SELECT COUNT(*) as count FROM custom_events 
  WHERE event_name = 'conversion' AND created_at >= ${startDate.toISOString()}
`
\`\`\`

## 🔧 Configuración Avanzada

### Filtros de Tiempo

El dashboard permite filtrar por:
- 7 días
- 30 días  
- 90 días

### Exportación de Datos

Para exportar datos, puedes usar la API:

\`\`\`javascript
const response = await fetch('/api/admin/analytics?type=page-events&limit=1000')
const data = await response.json()
// Exportar data a CSV/Excel
\`\`\`

## 🚨 Consideraciones

- **Privacidad**: El sistema no almacena IPs completas por defecto
- **Rendimiento**: Los índices están optimizados para consultas rápidas
- **Escalabilidad**: Funciona bien hasta miles de eventos por día
- **GDPR**: Considera añadir consentimiento de cookies para cumplir con GDPR

## 🐛 Troubleshooting

### No aparecen datos

1. Verifica que las tablas se crearon correctamente
2. Comprueba que el tracking está activo en las páginas
3. Revisa la consola del navegador para errores

### Errores de API

1. Verifica la conexión a la base de datos
2. Comprueba que `DATABASE_URL` está configurado
3. Revisa los logs del servidor

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs de la consola
2. Verifica la configuración de la base de datos
3. Comprueba que todas las dependencias están instaladas

¡El sistema está listo para usar! 🎉
