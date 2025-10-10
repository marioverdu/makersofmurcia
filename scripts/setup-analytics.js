require('dotenv').config({ path: '.env.local' })

async function setupAnalytics() {
  try {
    console.log('🚀 Configurando sistema de analíticas completo...')
    
    // Verificar variables de entorno
    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL no está configurado')
      console.log('💡 Asegúrate de que el archivo .env.local existe y contiene DATABASE_URL')
      return
    }
    
    console.log('✅ Variables de entorno configuradas')
    
    // Crear tablas
    console.log('\n📊 Creando tablas de analíticas...')
    const { createAnalyticsTables } = require('./create-analytics-tables')
    await createAnalyticsTables()
    
    console.log('\n🎉 ¡Configuración completada!')
    console.log('\n📋 Resumen:')
    console.log('✅ Variables de entorno configuradas')
    console.log('✅ Tablas de analíticas creadas')
    console.log('✅ Datos de ejemplo insertados')
    console.log('✅ Índices optimizados creados')
    
    console.log('\n🌐 Próximos pasos:')
    console.log('1. Inicia el servidor: npm run dev')
    console.log('2. Accede al dashboard: http://localhost:3000/admin/analytics')
    console.log('3. Para usar tracking en páginas:')
    console.log('   import { AnalyticsTracker } from "@/components/analytics-tracker"')
    console.log('   <AnalyticsTracker trackPerformance={true} />')
    
    console.log('\n📚 Documentación: ANALYTICS_README.md')
    
  } catch (error) {
    console.error('❌ Error en la configuración:', error.message)
  }
}

// Exportar la función para uso en otros scripts
module.exports = { setupAnalytics }

// Ejecutar si se llama directamente
if (require.main === module) {
  setupAnalytics()
}
