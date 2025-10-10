import { config } from 'dotenv'
import { neon } from '@neondatabase/serverless'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

config({ path: join(__dirname, '..', '.env.local') })

async function testDatabaseConnection() {
  try {
    console.log('🔍 Verificando conexión a la base de datos...')
    
    // Verificar variables de entorno
    console.log('\n📋 Variables de entorno de base de datos:')
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Configurado' : '❌ No configurado')
    console.log('POSTGRES_URL:', process.env.POSTGRES_URL ? '✅ Configurado' : '❌ No configurado')
    console.log('POSTGRES_PRISMA_URL:', process.env.POSTGRES_PRISMA_URL ? '✅ Configurado' : '❌ No configurado')
    
    if (!process.env.DATABASE_URL) {
      console.error('\n❌ DATABASE_URL no está configurado')
      console.log('\n📝 Soluciones:')
      console.log('1. Verifica que el archivo .env.local existe en la raíz del proyecto')
      console.log('2. Asegúrate de que DATABASE_URL esté definido en .env.local')
      console.log('3. Reinicia el servidor después de modificar .env.local')
      return
    }
    
    // Intentar conectar a la base de datos
    const sql = neon(process.env.DATABASE_URL)
    
    console.log('\n🔌 Probando conexión...')
    const result = await sql`SELECT NOW() as current_time, version() as db_version`
    
    console.log('✅ Conexión exitosa!')
    console.log('⏰ Hora actual de la BD:', result[0].current_time)
    console.log('📊 Versión de PostgreSQL:', result[0].db_version.split(' ')[0])
    
    // Verificar si las tablas de analíticas existen
    console.log('\n📊 Verificando tablas de analíticas...')
    try {
      const tables = await sql`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name IN ('page_events', 'user_metrics', 'performance_metrics', 'custom_events')
        ORDER BY table_name
      `
      
      if (tables.length === 0) {
        console.log('⚠️  Las tablas de analíticas no existen')
        console.log('💡 Ejecuta el script de configuración: node scripts/run-analytics-setup.js')
      } else {
        console.log('✅ Tablas de analíticas encontradas:')
        tables.forEach(table => console.log(`   - ${table.table_name}`))
        
        // Contar registros en cada tabla
        const pageEventsCount = await sql`SELECT COUNT(*) as count FROM page_events`
        const userMetricsCount = await sql`SELECT COUNT(*) as count FROM user_metrics`
        const performanceCount = await sql`SELECT COUNT(*) as count FROM performance_metrics`
        const customEventsCount = await sql`SELECT COUNT(*) as count FROM custom_events`
        
        console.log('\n📈 Registros en las tablas:')
        console.log(`   - page_events: ${pageEventsCount[0].count} registros`)
        console.log(`   - user_metrics: ${userMetricsCount[0].count} registros`)
        console.log(`   - performance_metrics: ${performanceCount[0].count} registros`)
        console.log(`   - custom_events: ${customEventsCount[0].count} registros`)
      }
    } catch (error) {
      console.log('⚠️  No se pudieron verificar las tablas de analíticas:', error.message)
    }
    
    // Verificar si las tablas de propuestas existen
    console.log('\n📋 Verificando tablas de propuestas...')
    try {
      const proposalsTable = await sql`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'proposals'
      `
      
      if (proposalsTable.length === 0) {
        console.log('⚠️  La tabla de propuestas no existe')
        console.log('💡 Necesitas crear la tabla proposals en tu base de datos')
      } else {
        console.log('✅ Tabla de propuestas encontrada')
        
        // Contar propuestas
        const count = await sql`SELECT COUNT(*) as count FROM proposals`
        console.log(`   - Total de propuestas: ${count[0].count}`)
      }
    } catch (error) {
      console.log('⚠️  No se pudo verificar la tabla de propuestas:', error.message)
    }
    
  } catch (error) {
    console.error('\n❌ Error al conectar con la base de datos:')
    console.error(error.message)
    
    if (error.message.includes('connection')) {
      console.log('\n💡 Posibles soluciones:')
      console.log('1. Verifica que la URL de la base de datos sea correcta')
      console.log('2. Asegúrate de que la base de datos esté activa en Neon')
      console.log('3. Verifica las credenciales de la base de datos')
      console.log('4. Comprueba que el firewall no esté bloqueando la conexión')
    }
  }
}

testDatabaseConnection()
