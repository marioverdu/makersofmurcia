require('dotenv').config({ path: '.env.local' })
const { Resend } = require('resend')

async function verifyEmailDelivery() {
  console.log('🔍 Verificando entrega de email...')
  
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('❌ RESEND_API_KEY no encontrada')
    return
  }
  
  try {
    const resend = new Resend(apiKey)
    
    // Enviar email con información más detallada
    const testEmail = {
      from: 'chat@marioverdu.com',
      to: 'marioverdugambin@gmail.com',
      subject: `Verificación de entrega - ${new Date().toLocaleString()}`,
      text: `Hola Mario,

Este es un email de verificación para confirmar que Resend está funcionando correctamente.

Detalles del envío:
- Fecha: ${new Date().toLocaleString()}
- Remitente: chat@marioverdu.com
- Destinatario: marioverdugambin@gmail.com
- API Key: ${apiKey.substring(0, 10)}...
- Dominio: marioverdu.com

Si recibes este email, por favor responde con "RECIBIDO" para confirmar que todo funciona.

Saludos,
Sistema de Test`,
    }
    
    console.log('📧 Enviando email de verificación...')
    const result = await resend.emails.send(testEmail)
    
    console.log('✅ Email enviado exitosamente!')
    console.log('📋 ID del email:', result.id)
    console.log('📅 Fecha:', new Date().toLocaleString())
    
    console.log('\n📋 Instrucciones para verificar:')
    console.log('1. Ve a tu Gmail: marioverdugambin@gmail.com')
    console.log('2. Busca emails de: chat@marioverdu.com')
    console.log('3. Busca el asunto: "Verificación de entrega"')
    console.log('4. Si no lo encuentras, revisa la carpeta SPAM')
    console.log('5. Si lo encuentras, responde con "RECIBIDO"')
    
    console.log('\n🔍 También puedes verificar en Resend Dashboard:')
    console.log('1. Ve a resend.com > Logs')
    console.log('2. Busca el email con ID:', result.id)
    console.log('3. Verifica el status: "Delivered" o "Sent"')
    
  } catch (error) {
    console.error('❌ Error al enviar email de verificación:')
    console.error('   Mensaje:', error.message)
    
    if (error.message.includes('Unauthorized')) {
      console.error('   🔑 Problema: API Key inválida')
    } else if (error.message.includes('domain')) {
      console.error('   🌐 Problema: Dominio no verificado')
    } else {
      console.error('   🔧 Problema desconocido')
    }
  }
}

verifyEmailDelivery()
