const fs = require('fs')
const path = require('path')

async function runAnalyticsSetup() {
  try {
    console.log('🚀 Configurando sistema de analíticas...')
    
    // Leer el archivo SQL
    const sqlFile = path.join(__dirname, 'init-analytics-tables.sql')
    const sqlContent = fs.readFileSync(sqlFile, 'utf8')
    
    console.log('📋 Contenido del script SQL:')
    console.log(sqlContent)
    
    console.log('\n✅ Script de configuración listo!')
    console.log('\n📝 Para completar la configuración:')
    console.log('1. Ejecuta el script SQL en tu base de datos Neon:')
    console.log('   - Ve a tu dashboard de Neon')
    console.log('   - Abre el SQL Editor')
    console.log('   - Copia y pega el contenido del archivo scripts/init-analytics-tables.sql')
    console.log('   - Ejecuta el script')
    console.log('\n2. Una vez ejecutado, podrás acceder a las analíticas en:')
    console.log('   http://localhost:3000/admin/analytics')
    console.log('\n3. Para usar el tracking en tus páginas, añade:')
    console.log('   import { AnalyticsTracker } from "@/components/analytics-tracker"')
    console.log('   <AnalyticsTracker trackPerformance={true} trackScroll={true} />')
    
  } catch (error) {
    console.error('❌ Error al configurar analíticas:', error)
  }
}

runAnalyticsSetup()
