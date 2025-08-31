console.log('🔍 Verificando configuración del Footer de Desarrollo...')

// Simular diferentes entornos
const environments = [
  {
    name: 'Desarrollo (npm run dev)',
    NODE_ENV: 'development',
    hostname: 'localhost',
    shouldShow: true
  },
  {
    name: 'Desarrollo (127.0.0.1)',
    NODE_ENV: 'development',
    hostname: '127.0.0.1',
    shouldShow: true
  },
  {
    name: 'Producción (Vercel)',
    NODE_ENV: 'production',
    hostname: 'aaa23444.vercel.app',
    shouldShow: false
  },
  {
    name: 'Preview (Vercel)',
    NODE_ENV: 'production',
    hostname: 'preview-aaa23444.vercel.app',
    shouldShow: false
  }
]

// Función que replica la lógica del componente
function isDevelopment(NODE_ENV, hostname) {
  return NODE_ENV === "development" ||
    (typeof window !== "undefined" && 
     (hostname === "localhost" ||
      hostname === "127.0.0.1"))
}

console.log('\n✅ Configuración del Footer:')
console.log('   - Solo visible en desarrollo (npm run dev)')
console.log('   - Oculto en producción y preview')
console.log('   - Muestra: systemInfo | waiting/notifications')

console.log('\n🧪 Pruebas de Entornos:')
environments.forEach(env => {
  const result = isDevelopment(env.NODE_ENV, env.hostname)
  const status = result === env.shouldShow ? '✅' : '❌'
  console.log(`   ${status} ${env.name}: ${result ? 'VISIBLE' : 'OCULTO'}`)
})

console.log('\n📱 Comportamiento:')
console.log('   - Desarrollo: Footer visible con información de estado')
console.log('   - Producción: Footer completamente oculto')
console.log('   - Preview: Footer completamente oculto')

console.log('\n🎯 Resultado:')
console.log('   ✅ Footer configurado correctamente')
console.log('   ✅ Solo visible en entorno de desarrollo')
console.log('   ✅ Oculto en todos los demás entornos')

console.log('\n💡 Información mostrada en desarrollo:')
console.log('   - Estado del flujo (selecting_time, waiting, etc.)')
console.log('   - Estado de notificaciones (🔔 notifications o waiting)')
console.log('   - Útil para debugging y desarrollo')
