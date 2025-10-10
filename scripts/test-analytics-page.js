const http = require('http')

async function testAnalyticsPage() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/admin/analytics',
      method: 'GET',
      timeout: 10000
    }

    const req = http.request(options, (res) => {
      console.log(`📊 Status: ${res.statusCode}`)
      console.log(`📊 Headers:`, res.headers)
      
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✅ Página de analíticas accesible correctamente')
          console.log('📄 Tamaño de respuesta:', data.length, 'bytes')
          
          // Verificar que no hay loops de redirección
          if (data.includes('redirect') || data.includes('login')) {
            console.log('⚠️  Posible redirección detectada')
          } else {
            console.log('✅ No se detectaron redirecciones')
          }
          
          resolve(true)
        } else if (res.statusCode === 302 || res.statusCode === 301) {
          console.log('🔄 Redirección detectada - esto es normal si no estás autenticado')
          resolve(true)
        } else {
          console.log('❌ Error en la página:', res.statusCode)
          resolve(false)
        }
      })
    })

    req.on('error', (error) => {
      console.error('❌ Error de conexión:', error.message)
      reject(error)
    })

    req.on('timeout', () => {
      console.error('⏰ Timeout - el servidor no responde')
      req.destroy()
      reject(new Error('Timeout'))
    })

    req.end()
  })
}

async function testAnalyticsAPI() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/admin/analytics?days=30',
      method: 'GET',
      timeout: 10000
    }

    const req = http.request(options, (res) => {
      console.log(`🔌 API Status: ${res.statusCode}`)
      
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const jsonData = JSON.parse(data)
            console.log('✅ API de analíticas funciona correctamente')
            console.log('📊 Datos recibidos:', Object.keys(jsonData))
            resolve(true)
          } catch (error) {
            console.log('⚠️  API responde pero no es JSON válido')
            resolve(false)
          }
        } else {
          console.log('❌ Error en API:', res.statusCode)
          resolve(false)
        }
      })
    })

    req.on('error', (error) => {
      console.error('❌ Error de conexión API:', error.message)
      reject(error)
    })

    req.on('timeout', () => {
      console.error('⏰ Timeout API')
      req.destroy()
      reject(new Error('Timeout'))
    })

    req.end()
  })
}

async function runTests() {
  console.log('🧪 Probando sistema de analíticas...')
  
  try {
    // Esperar un poco para que el servidor esté listo
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    console.log('\n📊 Probando página de analíticas...')
    const pageResult = await testAnalyticsPage()
    
    console.log('\n🔌 Probando API de analíticas...')
    const apiResult = await testAnalyticsAPI()
    
    console.log('\n📋 Resumen:')
    console.log(`   Página: ${pageResult ? '✅ OK' : '❌ Error'}`)
    console.log(`   API: ${apiResult ? '✅ OK' : '❌ Error'}`)
    
    if (pageResult && apiResult) {
      console.log('\n🎉 ¡Sistema de analíticas funcionando correctamente!')
      console.log('🌐 Accede a: http://localhost:3000/admin/analytics')
    } else {
      console.log('\n⚠️  Hay problemas que resolver')
    }
    
  } catch (error) {
    console.error('❌ Error en las pruebas:', error.message)
  }
}

runTests()
