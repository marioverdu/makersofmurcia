#!/usr/bin/env node

/**
 * Script de prueba para el sistema de rutas administrables
 * Ejecutar: node scripts/test-routes-management.js
 */

const { execSync } = require('child_process')
const path = require('path')

console.log('🧪 Probando sistema de rutas administrables...')

// Configuración
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const testRoutes = ['/', '/posts', '/work-experience', '/contact']

async function testEndpoint(endpoint, description) {
  try {
    console.log(`\n🔍 Probando: ${description}`)
    console.log(`   URL: ${baseUrl}${endpoint}`)
    
    const response = await fetch(`${baseUrl}${endpoint}`)
    const status = response.status
    const contentType = response.headers.get('content-type')
    
    console.log(`   Status: ${status}`)
    console.log(`   Content-Type: ${contentType}`)
    
    if (status === 200) {
      console.log(`   ✅ ${description} - OK`)
      return true
    } else {
      console.log(`   ❌ ${description} - Error ${status}`)
      return false
    }
  } catch (error) {
    console.log(`   ❌ ${description} - Error: ${error.message}`)
    return false
  }
}

async function testAPIEndpoint(endpoint, description) {
  try {
    console.log(`\n🔍 Probando API: ${description}`)
    console.log(`   URL: ${baseUrl}${endpoint}`)
    
    const response = await fetch(`${baseUrl}${endpoint}`)
    const status = response.status
    const data = await response.json()
    
    console.log(`   Status: ${status}`)
    
    if (status === 200 && data.success) {
      console.log(`   ✅ ${description} - OK`)
      if (data.data && data.data.routes) {
        console.log(`   📊 Rutas encontradas: ${data.data.routes.length}`)
      }
      return true
    } else {
      console.log(`   ❌ ${description} - Error ${status}`)
      if (data.error) {
        console.log(`   💬 Error: ${data.error}`)
      }
      return false
    }
  } catch (error) {
    console.log(`   ❌ ${description} - Error: ${error.message}`)
    return false
  }
}

async function runTests() {
  console.log('🚀 Iniciando pruebas...')
  console.log(`📍 Base URL: ${baseUrl}`)
  
  let passedTests = 0
  let totalTests = 0
  
  // Test 1: Verificar que el servidor esté corriendo
  console.log('\n📋 Test 1: Servidor corriendo')
  try {
    const response = await fetch(baseUrl)
    if (response.status === 200) {
      console.log('   ✅ Servidor corriendo - OK')
      passedTests++
    } else {
      console.log(`   ❌ Servidor error - Status: ${response.status}`)
    }
    totalTests++
  } catch (error) {
    console.log(`   ❌ Servidor no accesible - ${error.message}`)
    console.log('   💡 Asegúrate de que el servidor esté corriendo: npm run dev')
    totalTests++
  }
  
  // Test 2: API de rutas
  const apiTest = await testAPIEndpoint('/api/admin/routes', 'API de rutas')
  if (apiTest) passedTests++
  totalTests++
  
  // Test 3: Robots.txt
  const robotsTest = await testEndpoint('/robots.txt', 'Robots.txt dinámico')
  if (robotsTest) passedTests++
  totalTests++
  
  // Test 4: Sitemap.xml
  const sitemapTest = await testEndpoint('/sitemap.xml', 'Sitemap.xml dinámico')
  if (sitemapTest) passedTests++
  totalTests++
  
  // Test 5: Rutas principales
  console.log('\n📋 Test 5: Rutas principales')
  for (const route of testRoutes) {
    const routeTest = await testEndpoint(route, `Ruta ${route}`)
    if (routeTest) passedTests++
    totalTests++
  }
  
  // Test 6: Panel de administración
  const adminTest = await testEndpoint('/admin/routes', 'Panel de administración')
  if (adminTest) passedTests++
  totalTests++
  
  // Test 7: API SEO
  const seoTest = await testAPIEndpoint('/api/admin/routes/seo?path=/', 'API SEO')
  if (seoTest) passedTests++
  totalTests++
  
  // Resultados
  console.log('\n📊 Resultados de las pruebas:')
  console.log(`   ✅ Pruebas pasadas: ${passedTests}/${totalTests}`)
  console.log(`   📈 Porcentaje de éxito: ${Math.round((passedTests/totalTests)*100)}%`)
  
  if (passedTests === totalTests) {
    console.log('\n🎉 ¡Todas las pruebas pasaron! El sistema está funcionando correctamente.')
  } else {
    console.log('\n⚠️ Algunas pruebas fallaron. Revisa los errores arriba.')
  }
  
  // Recomendaciones
  console.log('\n📝 Recomendaciones:')
  if (passedTests < totalTests) {
    console.log('   🔧 Verifica que:')
    console.log('      - El servidor esté corriendo (npm run dev)')
    console.log('      - La base de datos esté configurada')
    console.log('      - Las variables de entorno estén correctas')
    console.log('      - El script de inicialización se haya ejecutado')
  }
  
  console.log('   📖 Consulta ROUTES_MANAGEMENT_README.md para más información')
  console.log('   🔗 Accede a /admin/routes para gestionar las rutas')
}

// Ejecutar pruebas
runTests().catch(error => {
  console.error('❌ Error ejecutando pruebas:', error)
  process.exit(1)
})
