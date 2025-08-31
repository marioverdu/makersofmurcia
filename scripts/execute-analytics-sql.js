require('dotenv').config({ path: '.env.local' })
const fs = require('fs')
const path = require('path')

async function executeAnalyticsSQL() {
  try {
    console.log('🚀 Ejecutando script SQL de analíticas...')
    
    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL no está configurado')
      return
    }
    
    // Leer el archivo SQL
    const sqlFile = path.join(__dirname, 'init-analytics-tables.sql')
    const sqlContent = fs.readFileSync(sqlFile, 'utf8')
    
    // Conectar a la base de datos
    const { neon } = require('@neondatabase/serverless')
    const sql = neon(process.env.DATABASE_URL)
    
    console.log('🔌 Conectando a la base de datos...')
    
    // Ejecutar el script SQL
    console.log('📝 Ejecutando SQL...')
    await sql.unsafe(sqlContent)
    
    console.log('✅ Script SQL ejecutado exitosamente!')
    
    // Verificar que las tablas se crearon
    console.log('\n🔍 Verificando tablas creadas...')
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('page_events', 'user_metrics', 'performance_metrics', 'custom_events')
      ORDER BY table_name
    `
    
    console.log('✅ Tablas creadas:')
    tables.forEach(table => console.log(`   - ${table.table_name}`))
    
    // Verificar datos de ejemplo
    console.log('\n📊 Verificando datos de ejemplo...')
    const pageEventsCount = await sql`SELECT COUNT(*) as count FROM page_events`
    const userMetricsCount = await sql`SELECT COUNT(*) as count FROM user_metrics`
    const performanceCount = await sql`SELECT COUNT(*) as count FROM performance_metrics`
    const customEventsCount = await sql`SELECT COUNT(*) as count FROM custom_events`
    
    console.log(`   - page_events: ${pageEventsCount[0].count} registros`)
    console.log(`   - user_metrics: ${userMetricsCount[0].count} registros`)
    console.log(`   - performance_metrics: ${performanceCount[0].count} registros`)
    console.log(`   - custom_events: ${customEventsCount[0].count} registros`)
    
    console.log('\n🎉 Sistema de analíticas configurado completamente!')
    console.log('🌐 Accede a: http://localhost:3000/admin/analytics')
    
  } catch (error) {
    console.error('❌ Error ejecutando SQL:', error.message)
    
    if (error.message.includes('already exists')) {
      console.log('\n💡 Algunas tablas ya existen. Esto es normal.')
      console.log('✅ El sistema debería funcionar correctamente.')
    } else {
      console.log('\n💡 Posibles soluciones:')
      console.log('1. Verifica que la base de datos esté activa')
      console.log('2. Comprueba que tienes permisos de escritura')
      console.log('3. Revisa la conexión a la base de datos')
    }
  }
}

executeAnalyticsSQL()
