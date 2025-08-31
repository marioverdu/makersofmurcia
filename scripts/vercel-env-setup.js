#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Variables de entorno desde env.local
const envPath = path.join(process.cwd(), 'env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

// Extraer variables de entorno
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    const value = valueParts.join('=').trim();
    if (value && !value.startsWith('#')) {
      envVars[key.trim()] = value;
    }
  }
});

console.log('🚀 Configurando variables de entorno en Vercel...\n');

// Variables críticas que necesitan ser configuradas
const criticalVars = [
  'DATABASE_URL',
  'POSTGRES_PRISMA_URL',
  'POSTGRES_URL_NON_POOLING',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'RESEND_API_KEY',
  'ADMIN_EMAIL',
  'NEXT_PUBLIC_ADMIN_EMAIL',
  'KV_REST_API_TOKEN',
  'KV_REST_API_URL',
  'KV_REST_API_READ_ONLY_TOKEN',
  'REDIS_URL',
  'KV_URL',
  'STACK_SECRET_SERVER_KEY',
  'NEXT_PUBLIC_STACK_PROJECT_ID',
  'NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY'
];

console.log('📋 Variables a configurar:');
criticalVars.forEach(varName => {
  const value = envVars[varName];
  if (value) {
    console.log(`  ✅ ${varName} = ${value.substring(0, 20)}...`);
  } else {
    console.log(`  ❌ ${varName} = NO ENCONTRADA`);
  }
});

console.log('\n🔧 Configurando variables en Vercel...\n');

let successCount = 0;
let errorCount = 0;

criticalVars.forEach(varName => {
  const value = envVars[varName];
  if (value) {
    try {
      console.log(`Configurando ${varName}...`);
      
      // Usar vercel env add para configurar la variable
      const command = `vercel env add ${varName} production`;
      execSync(command, { 
        input: value + '\n', 
        stdio: ['pipe', 'pipe', 'pipe'],
        encoding: 'utf8'
      });
      
      console.log(`  ✅ ${varName} configurada`);
      successCount++;
    } catch (error) {
      console.log(`  ❌ Error configurando ${varName}: ${error.message}`);
      errorCount++;
    }
  } else {
    console.log(`  ⚠️  ${varName} no encontrada en env.local`);
  }
});

console.log('\n📊 Resumen:');
console.log(`  ✅ Variables configuradas: ${successCount}`);
console.log(`  ❌ Errores: ${errorCount}`);
console.log(`  ⚠️  Variables faltantes: ${criticalVars.length - successCount - errorCount}`);

if (successCount > 0) {
  console.log('\n🎉 ¡Variables configuradas exitosamente!');
  console.log('🚀 Ahora puedes desplegar con: vercel --prod');
} else {
  console.log('\n⚠️  No se pudieron configurar las variables automáticamente.');
  console.log('📝 Configura las variables manualmente en el dashboard de Vercel:');
  console.log('   https://vercel.com/dashboard/[tu-proyecto]/settings/environment-variables');
}

console.log('\n💡 Alternativa: Usa el dashboard de Vercel para configurar las variables manualmente.');
