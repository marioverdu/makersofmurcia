import { pdfCacheService } from './lib/pdf-cache-service'

// Script para limpiar caché antiguo
async function cleanupCache() {
  console.log('🧹 [Cache Cleanup] Starting cache cleanup...')
  
  try {
    // Limpiar archivos más antiguos de 7 días
    await pdfCacheService.clearOldCache(7 * 24 * 60 * 60 * 1000)
    console.log('✅ [Cache Cleanup] Cache cleanup completed')
  } catch (error) {
    console.error('❌ [Cache Cleanup] Error during cleanup:', error)
  }
}

// Ejecutar limpieza si se llama directamente
if (require.main === module) {
  cleanupCache()
}

export { cleanupCache }


