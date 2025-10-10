#!/usr/bin/env node

/**
 * Script para inicializar la base de datos de rutas administrables
 * Ejecutar: node scripts/init-routes-database.js
 */

const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

console.log('🚀 Inicializando base de datos de rutas administrables...')

// Verificar que DATABASE_URL esté configurado
if (!process.env.DATABASE_URL) {
  console.error('❌ Error: DATABASE_URL no está configurado')
  console.error('Asegúrate de tener un archivo .env.local con DATABASE_URL')
  process.exit(1)
}

// Ruta al archivo SQL
const sqlFile = path.join(__dirname, 'init-routes-table.sql')

// Verificar que el archivo SQL existe
if (!fs.existsSync(sqlFile)) {
  console.error(`❌ Error: No se encontró el archivo ${sqlFile}`)
  process.exit(1)
}

try {
  console.log('📋 Ejecutando script SQL...')
  
  // Ejecutar el script SQL
  const command = `psql "${process.env.DATABASE_URL}" -f "${sqlFile}"`
  const result = execSync(command, { 
    encoding: 'utf8',
    stdio: 'pipe'
  })
  
  console.log('✅ Script SQL ejecutado correctamente')
  console.log('📊 Resultado:', result)
  
  // Verificar que las tablas se crearon
  if (result.includes('Tabla route_management creada') && 
      result.includes('Tabla route_access_logs creada') &&
      result.includes('Vista route_stats creada')) {
    console.log('✅ Todas las tablas y vistas se crearon correctamente')
  } else {
    console.warn('⚠️ Algunas tablas pueden no haberse creado correctamente')
  }
  
  console.log('🎉 Base de datos de rutas inicializada correctamente')
  console.log('')
  console.log('📝 Próximos pasos:')
  console.log('1. Reinicia el servidor de desarrollo: npm run dev')
  console.log('2. Ve a /admin/routes para gestionar las rutas')
  console.log('3. Las rutas ahora son completamente administrables')
  
} catch (error) {
  console.error('❌ Error ejecutando script SQL:', error.message)
  
  if (error.message.includes('psql: command not found')) {
    console.error('💡 Solución: Instala PostgreSQL client o usa una herramienta alternativa')
    console.error('   - En macOS: brew install postgresql')
    console.error('   - En Ubuntu: sudo apt-get install postgresql-client')
    console.error('   - O usa pgAdmin, DBeaver, o similar')
  }
  
  if (error.message.includes('connection to server')) {
    console.error('💡 Solución: Verifica que DATABASE_URL sea correcto y la BD esté accesible')
  }
  
  process.exit(1)
}
