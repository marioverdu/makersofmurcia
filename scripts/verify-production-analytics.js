require('dotenv').config({ path: '.env.local' })

async function verifyProductionAnalytics() {
  try {
    console.log('🔍 Verificando configuración de analíticas para producción...')
    
    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL no está configurado')
      return
    }
    
    const { neon } = require('@neondatabase/serverless')
    const sql = neon(process.env.DATABASE_URL)
    
    console.log('🔌 Conectando a la base de datos de producción...')
    
    // Verificar que las tablas existen
    console.log('\n📊 Verificando tablas de analíticas...')
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('page_events', 'user_metrics', 'performance_metrics', 'custom_events')
      ORDER BY table_name
    `
    
    if (tables.length === 0) {
      console.log('❌ Las tablas de analíticas no existen en producción')
      console.log('💡 Ejecuta: npm run create-analytics-tables')
      return
    }
    
    console.log('✅ Tablas de analíticas encontradas:')
    tables.forEach(table => console.log(`   - ${table.table_name}`))
    
    // Verificar datos
    console.log('\n📈 Verificando datos de analíticas...')
    const pageEventsCount = await sql`SELECT COUNT(*) as count FROM page_events`
    const userMetricsCount = await sql`SELECT COUNT(*) as count FROM user_metrics`
    const performanceCount = await sql`SELECT COUNT(*) as count FROM performance_metrics`
    const customEventsCount = await sql`SELECT COUNT(*) as count FROM custom_events`
    
    console.log(`   - page_events: ${pageEventsCount[0].count} registros`)
    console.log(`   - user_metrics: ${userMetricsCount[0].count} registros`)
    console.log(`   - performance_metrics: ${performanceCount[0].count} registros`)
    console.log(`   - custom_events: ${customEventsCount[0].count} registros`)
    
    // Verificar índices
    console.log('\n🔍 Verificando índices...')
    const indexes = await sql`
      SELECT indexname, tablename 
      FROM pg_indexes 
      WHERE tablename IN ('page_events', 'user_metrics', 'performance_metrics', 'custom_events')
      AND indexname LIKE 'idx_%'
      ORDER BY tablename, indexname
    `
    
    console.log('✅ Índices encontrados:')
    indexes.forEach(index => console.log(`   - ${index.indexname} (${index.tablename})`))
    
    // Probar consulta de analíticas
    console.log('\n🧪 Probando consulta de analíticas...')
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 30)
    
    const analyticsTest = await sql`
      SELECT 
        COUNT(*) as total_page_views,
        COUNT(DISTINCT session_id) as unique_users
      FROM page_events 
      WHERE created_at >= ${startDate.toISOString()}
    `
    
    console.log('✅ Consulta de analíticas funcionando:')
    console.log(`   - Vistas totales (30 días): ${analyticsTest[0].total_page_views}`)
    console.log(`   - Usuarios únicos (30 días): ${analyticsTest[0].unique_users}`)
    
    console.log('\n🎉 ¡Analíticas listas para producción!')
    console.log('🌐 URL de producción: https://marioverdu.com/admin/analytics')
    console.log('📊 Los datos se obtienen de la base de datos Neon conectada')
    
  } catch (error) {
    console.error('❌ Error verificando analíticas de producción:', error.message)
    console.log('\n💡 Posibles soluciones:')
    console.log('1. Verifica que DATABASE_URL esté configurado correctamente')
    console.log('2. Asegúrate de que las tablas existan: npm run create-analytics-tables')
    console.log('3. Comprueba la conexión a Neon')
  }
}

verifyProductionAnalytics()
