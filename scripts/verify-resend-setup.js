require('dotenv').config({ path: '.env.local' })

console.log('🔍 Verificando setup completo de Resend...')

// Verificar variables de entorno
console.log('\n📋 Variables de entorno:')
console.log('   RESEND_API_KEY:', process.env.RESEND_API_KEY ? '✅ Configurada' : '❌ No configurada')
console.log('   ADMIN_EMAIL:', process.env.ADMIN_EMAIL || '❌ No configurada')

// Verificar archivos necesarios
const fs = require('fs')
const path = require('path')

console.log('\n📁 Archivos necesarios:')
const requiredFiles = [
  'app/resend-test/page.tsx',
  'app/api/test-resend/route.ts',
  'app/api/send-email/route.ts',
  'env.local'
]

requiredFiles.forEach(file => {
  const exists = fs.existsSync(file)
  console.log(`   ${file}: ${exists ? '✅ Existe' : '❌ No existe'}`)
})

// Verificar dependencias
console.log('\n📦 Dependencias:')
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  const hasResend = packageJson.dependencies && packageJson.dependencies.resend
  console.log(`   resend: ${hasResend ? '✅ Instalada' : '❌ No instalada'}`)
} catch (error) {
  console.log('   ❌ Error leyendo package.json')
}

console.log('\n🎯 Próximos pasos:')
console.log('1. Asegúrate de que el servidor esté corriendo: npm run dev')
console.log('2. Ve a: http://localhost:3000/resend-test')
console.log('3. Haz clic en "Probar Conexión Resend"')
console.log('4. Verifica tu email: marioverdugambin@gmail.com')
console.log('5. Si no lo recibes, revisa la carpeta SPAM')

console.log('\n🔧 Si hay problemas:')
console.log('- Verifica que el dominio marioverdu.com esté verificado en Resend')
console.log('- Confirma que la API key sea válida en el dashboard de Resend')
console.log('- Revisa los logs del servidor para errores específicos')

console.log('\n📱 URLs de test:')
console.log('- Página de test: http://localhost:3000/resend-test')
console.log('- API test-resend: http://localhost:3000/api/test-resend')
console.log('- API send-email: http://localhost:3000/api/send-email')
