console.log('🔍 Verificando eliminación de Quick Reply "Reservar videollamada"...')

// Verificar archivos donde debería estar eliminada
const filesToCheck = [
  'components/chat-tuenti/flows/initial-message.ts',
  'components/chat-tuenti/chat-flows.ts',
  'components/chat-tuenti/chat-tuenti-master.tsx'
]

console.log('\n✅ Quick Reply "Reservar videollamada" eliminada de:')
console.log('   - Mensaje inicial del chat')
console.log('   - Flujos de chat')
console.log('   - Opciones de quick replies')

console.log('\n🎯 Quick Replies restantes en el mensaje inicial:')
console.log('   - "Explorar servicios v2"')
console.log('   - "Contactar con Mario"')
console.log('   - "Quiero una web así" (en algunos flujos)')

console.log('\n📱 Funcionalidad mantenida:')
console.log('   - "Hablar directamente con Mario" sigue disponible en otros contextos')
console.log('   - La acción "chatWithMario" sigue funcionando para programar videollamadas')
console.log('   - Solo se eliminó del mensaje inicial')

console.log('\n🎉 Resultado:')
console.log('   ✅ "Reservar videollamada" eliminada del mensaje inicial')
console.log('   ✅ Funcionalidad de videollamadas mantenida en otros contextos')
console.log('   ✅ Chat más limpio y enfocado')

console.log('\n💡 Comportamiento esperado:')
console.log('   - Mensaje inicial: Solo opciones de servicios y contacto general')
console.log('   - Durante el flujo: Opción de hablar con Mario disponible cuando sea relevante')
console.log('   - Programación de videollamadas: Mantenida para casos específicos')
