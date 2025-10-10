require('dotenv').config({ path: '.env.local' })
const { Resend } = require('resend')

async function testResendConnection() {
  console.log('🔍 Probando conexión con Resend...')
  
  // Verificar API key
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('❌ RESEND_API_KEY no encontrada en .env.local')
    return
  }
  
  console.log('✅ API Key encontrada:', apiKey.substring(0, 10) + '...')
  
  try {
    const resend = new Resend(apiKey)
    
    // Probar conexión básica
    console.log('🔄 Probando conexión con Resend...')
    
    // Intentar enviar un email de prueba
    const testEmail = {
      from: 'chat@marioverdu.com',
      to: 'marioverdugambin@gmail.com',
      subject: 'Test de conexión Resend',
      text: 'Este es un email de prueba para verificar la conexión con Resend.',
    }
    
    console.log('📧 Enviando email de prueba...')
    const result = await resend.emails.send(testEmail)
    
    console.log('✅ Email enviado exitosamente!')
    console.log('📋 ID del email:', result.id)
    console.log('📅 Fecha:', new Date().toLocaleString())
    
  } catch (error) {
    console.error('❌ Error al conectar con Resend:')
    console.error('   Mensaje:', error.message)
    
    if (error.message.includes('Unauthorized')) {
      console.error('   🔑 Problema: API Key inválida o expirada')
      console.error('   💡 Solución: Verifica tu API Key en el dashboard de Resend')
    } else if (error.message.includes('domain')) {
      console.error('   🌐 Problema: Dominio no verificado')
      console.error('   💡 Solución: Verifica el dominio en el dashboard de Resend')
    } else if (error.message.includes('rate limit')) {
      console.error('   ⏱️ Problema: Límite de rate excedido')
      console.error('   💡 Solución: Espera un momento y vuelve a intentar')
    } else {
      console.error('   🔧 Problema desconocido, revisa los logs de Resend')
    }
  }
}

testResendConnection()
