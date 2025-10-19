# 🔧 Integración Meetup - Web Scraping (Gratuito)

## ✅ **Solución Implementada: Web Scraping**

**¡Buenas noticias!** No necesitas Meetup Pro ni API key. Hemos implementado una solución de **web scraping** que obtiene los datos públicos directamente del HTML de la página de Meetup.

## 🚀 **Cómo Funciona**

1. **Acceso Directo:** Obtiene datos públicos del HTML de [makers-of-murcia](https://www.meetup.com/es-ES/makers-of-murcia/)
2. **Sin API Key:** No requiere autenticación ni suscripción Pro
3. **Datos Reales:** Extrae eventos reales de la página pública
4. **Fallback Automático:** Si falla, muestra datos de ejemplo

## 📋 **Variables de Entorno (Opcionales)**

### Para Desarrollo Local (.env.local)

```bash
# Site Configuration (opcional)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Para Producción (Vercel)

```bash
# Solo si quieres personalizar la URL del sitio
NEXT_PUBLIC_SITE_URL=https://makersofmurcia.vercel.app
```

## 🎯 **Datos Obtenidos**

El sistema extrae automáticamente:
- ✅ **Título del evento**
- ✅ **Fecha del evento** 
- ✅ **Número de asistentes**
- ✅ **Enlace al evento**
- ✅ **Descripción básica**

## 🔄 **Fallback Inteligente**

Si el scraping falla, se muestran datos reales de los eventos históricos:
- 7º FERIA MAKER MURCIA 2022 (13 asistentes)
- 6º FERIA MAKER MURCIA (30 asistentes)  
- ASAMBLEA GENERAL 2021 (10 asistentes)
- 5º FERIA MAKER MURCIA 2020 (23 asistentes)

## 🧪 **Testing**

```bash
npm run dev
# Los eventos se cargarán automáticamente desde Meetup
# Sin necesidad de configuración adicional
```

## 🛡️ **Ventajas del Web Scraping**

- ✅ **Gratuito:** No requiere Meetup Pro
- ✅ **Datos Reales:** Obtiene información actualizada
- ✅ **Robusto:** Fallback automático si falla
- ✅ **Rápido:** Una sola petición HTTP
- ✅ **Legal:** Solo accede a datos públicos

## 🔧 **Troubleshooting**

### Si no se cargan eventos:
- Verifica tu conexión a internet
- Los datos de fallback se mostrarán automáticamente
- Revisa la consola para mensajes informativos

### Si quieres datos más detallados:
- Considera contactar con los organizadores para acceso Pro
- O implementar scraping más específico según necesidades

---

**¡Listo para usar!** No necesitas configuración adicional. Los eventos se cargarán automáticamente desde la página pública de Meetup.
