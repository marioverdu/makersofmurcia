#!/usr/bin/env node

/**
 * Script para verificar variables de entorno
 * Ejecutar: npx tsx scripts/verify-env.ts
 */

import { envConfig, validateEnvVars } from '../lib/env-config'

console.log('🔍 Verificando variables de entorno...\n')

// Verificar variables críticas
const criticalVars = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'NEXTAUTH_URL'
]

console.log('📋 Variables críticas:')
criticalVars.forEach(varName => {
  const value = envConfig[varName as keyof typeof envConfig]
  const status = value ? '✅' : '❌'
  const displayValue = value ? (varName.includes('SECRET') || varName.includes('KEY') ? '***CONFIGURADA***' : value) : 'NO CONFIGURADA'
  console.log(`${status} ${varName}: ${displayValue}`)
})

console.log('\n📋 Variables de base de datos:')
const dbVars = [
  'POSTGRES_PRISMA_URL',
  'POSTGRES_URL_NON_POOLING',
  'DATABASE_URL_UNPOOLED',
  'PGHOST',
  'POSTGRES_USER',
  'POSTGRES_DATABASE'
]

dbVars.forEach(varName => {
  const value = envConfig[varName as keyof typeof envConfig]
  const status = value ? '✅' : '⚠️'
  const displayValue = value ? 'CONFIGURADA' : 'NO CONFIGURADA'
  console.log(`${status} ${varName}: ${displayValue}`)
})

console.log('\n📋 Variables de Vercel KV:')
const kvVars = [
  'KV_REST_API_URL',
  'KV_REST_API_TOKEN',
  'KV_REST_API_READ_ONLY_TOKEN',
  'REDIS_URL'
]

kvVars.forEach(varName => {
  const value = envConfig[varName as keyof typeof envConfig]
  const status = value ? '✅' : '⚠️'
  const displayValue = value ? 'CONFIGURADA' : 'NO CONFIGURADA'
  console.log(`${status} ${varName}: ${displayValue}`)
})

console.log('\n📋 Variables de email:')
const emailVars = [
  'RESEND_API_KEY',
  'ADMIN_EMAIL',
  'NEXT_PUBLIC_ADMIN_EMAIL'
]

emailVars.forEach(varName => {
  const value = envConfig[varName as keyof typeof envConfig]
  const status = value ? '✅' : '⚠️'
  const displayValue = value ? (varName.includes('KEY') ? '***CONFIGURADA***' : value) : 'NO CONFIGURADA'
  console.log(`${status} ${varName}: ${displayValue}`)
})

// Validación general
console.log('\n🔍 Validación general:')
const isValid = validateEnvVars()
console.log(`Estado: ${isValid ? '✅ TODAS LAS VARIABLES CRÍTICAS CONFIGURADAS' : '❌ FALTAN VARIABLES CRÍTICAS'}`)

if (!isValid) {
  console.log('\n⚠️ Para configurar en Vercel:')
  console.log('1. Ve a vercel.com → tu proyecto → Settings → Environment Variables')
  console.log('2. Agrega las variables faltantes')
  console.log('3. Asegúrate de que estén configuradas para Production, Preview y Development')
  process.exit(1)
}

console.log('\n🎉 ¡Todas las variables están configuradas correctamente!')
console.log('✅ El proyecto está listo para desplegar en Vercel')

