require('dotenv').config({ path: '.env.local' })

async function testChatEmailFlow() {
  console.log('🔍 Probando flujo de email del chat...')
  
  const testMessage = "Hola Mario, este es un mensaje de prueba desde el chat. Por favor, confirma que lo recibes correctamente."
  
  try {
    console.log('📤 Enviando mensaje de prueba...')
    console.log('   Mensaje:', testMessage)
    
    // Simular la petición que hace el chat
    const response = await fetch('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: testMessage
      })
    })
    
    const result = await response.json()
    
    console.log('\n📡 Respuesta de la API:')
    console.log('   Status:', response.status)
    console.log('   Success:', result.success)
    console.log('   Message:', result.message)
    console.log('   Email ID:', result.emailId)
    
    if (response.ok && result.success) {
      console.log('\n✅ Flujo del chat funcionando correctamente!')
      console.log('📧 Email enviado desde el chat')
      console.log('📋 Email ID:', result.emailId)
      
      console.log('\n🎯 Próximos pasos:')
      console.log('1. Ve a tu Gmail: marioverdugambin@gmail.com')
      console.log('2. Busca el email con asunto: "Hola Mario, este es un mensaje de prueba desde"')
      console.log('3. Si no lo encuentras, revisa la carpeta SPAM')
      console.log('4. Confirma que el email llegó correctamente')
      
    } else {
      console.log('\n❌ Error en el flujo del chat:')
      console.log('   Error:', result.error)
      console.log('   Details:', result.details)
    }
    
  } catch (error) {
    console.error('\n❌ Error al probar el flujo del chat:')
    console.error('   Mensaje:', error.message)
    console.error('   💡 Asegúrate de que el servidor esté corriendo (npm run dev)')
  }
}

testChatEmailFlow()
