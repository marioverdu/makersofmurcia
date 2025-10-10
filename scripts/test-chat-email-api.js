require('dotenv').config({ path: '.env.local' })

async function testChatEmailAPI() {
  console.log('🔍 Probando API de envío de emails del chat...')
  
  const testMessage = "Hola, este es un mensaje de prueba desde el chat. Por favor, confirma que lo recibes."
  
  try {
    // Simular una petición POST a la API
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
    
    console.log('📡 Respuesta de la API:')
    console.log('   Status:', response.status)
    console.log('   Success:', result.success)
    console.log('   Message:', result.message)
    
    if (response.ok && result.success) {
      console.log('✅ API del chat funcionando correctamente!')
      console.log('📧 Email enviado a través de la API del chat')
    } else {
      console.log('❌ Error en la API del chat:')
      console.log('   Error:', result.error)
      console.log('   Details:', result.details)
    }
    
  } catch (error) {
    console.error('❌ Error al probar la API del chat:')
    console.error('   Mensaje:', error.message)
    console.error('   💡 Asegúrate de que el servidor esté corriendo (npm run dev)')
  }
}

testChatEmailAPI()
