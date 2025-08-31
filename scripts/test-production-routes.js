#!/usr/bin/env node

/**
 * Script para probar la configuración de rutas de producción
 */

// Importar usando dynamic import para TypeScript
let RouteManagementService;

async function loadRouteManagementService() {
  try {
    const module = await import('../lib/route-management-service.ts');
    RouteManagementService = module.RouteManagementService;
  } catch (error) {
    console.error('Error loading RouteManagementService:', error);
    process.exit(1);
  }
}

async function testProductionRoutes() {
  // Cargar el servicio primero
  await loadRouteManagementService();
  
  console.log('🧪 Probando configuración de rutas de producción...\n');

  // Simular diferentes entornos
  const testPaths = [
    '/',
    '/admin',
    '/admin/routes',
    '/admin/analytics',
    '/work-experience',
    '/posts',
    '/contact',
    '/styleguide',
    '/test',
    '/api/test'
  ];

  console.log('📋 Rutas de prueba:');
  testPaths.forEach(path => console.log(`  - ${path}`));
  console.log();

  // Probar en modo desarrollo
  console.log('🔧 Probando en modo DESARROLLO:');
  testPaths.forEach(path => {
    const shouldBeActive = RouteManagementService.shouldRouteBeActiveByDefault(path, false);
    console.log(`  ${shouldBeActive ? '✅' : '❌'} ${path} -> ${shouldBeActive ? 'ACTIVA' : 'INACTIVA'}`);
  });
  console.log();

  // Probar en modo producción
  console.log('🚀 Probando en modo PRODUCCIÓN:');
  testPaths.forEach(path => {
    const shouldBeActive = RouteManagementService.shouldRouteBeActiveByDefault(path, true);
    console.log(`  ${shouldBeActive ? '✅' : '❌'} ${path} -> ${shouldBeActive ? 'ACTIVA' : 'INACTIVA'}`);
  });
  console.log();

  // Mostrar rutas activas por defecto
  console.log('🎯 Rutas activas por defecto en producción:');
  const defaultRoutes = RouteManagementService.getDefaultActiveRoutes();
  defaultRoutes.forEach(route => {
    console.log(`  - ${route}`);
  });
  console.log();

  // Probar detección de entorno
  console.log('🌍 Detección de entorno:');
  const isProd = RouteManagementService.isProduction();
  console.log(`  Entorno actual: ${isProd ? 'PRODUCCIÓN' : 'DESARROLLO'}`);
  console.log(`  Variables de entorno:`);
  console.log(`    NODE_ENV: ${process.env.NODE_ENV || 'no definido'}`);
  console.log(`    NEXT_PUBLIC_VERCEL_ENV: ${process.env.NEXT_PUBLIC_VERCEL_ENV || 'no definido'}`);
  console.log(`    VERCEL_ENV: ${process.env.VERCEL_ENV || 'no definido'}`);
  console.log();

  // Probar conexión a base de datos
  console.log('🔌 Probando conexión a base de datos:');
  try {
    const isConnected = await RouteManagementService.testConnection();
    console.log(`  Conexión: ${isConnected ? '✅ Conectada' : '❌ Desconectada'}`);
  } catch (error) {
    console.log(`  Conexión: ❌ Error - ${error.message}`);
  }
  console.log();

  console.log('✅ Pruebas completadas');
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  testProductionRoutes()
    .then(() => {
      console.log('\n🎉 Script de prueba completado exitosamente');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Error en las pruebas:', error);
      process.exit(1);
    });
}

export { testProductionRoutes };
