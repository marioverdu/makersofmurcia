#!/usr/bin/env node

/**
 * Script simple para probar la configuración de rutas de producción
 */

// Simular la lógica de RouteManagementService
function shouldRouteBeActiveByDefault(path, isProduction) {
  // En desarrollo, todas las rutas están activas por defecto
  if (!isProduction) {
    return true;
  }
  
  // En producción, solo activar rutas específicas
  const allowedPaths = [
    '/', // Página principal
    '/admin', // Panel de administración
    '/work-experience', // Experiencia de trabajo
  ];
  
  // Permitir todas las subrutas de admin
  if (path.startsWith('/admin')) {
    return true;
  }
  
  // Verificar si la ruta está en la lista de permitidas
  return allowedPaths.includes(path);
}

function getDefaultActiveRoutes() {
  return [
    '/', // Página principal
    '/admin', // Panel de administración
    '/work-experience', // Experiencia de trabajo
  ];
}

function isProduction() {
  return (
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ||
    process.env.NODE_ENV === "production" ||
    process.env.VERCEL_ENV === "production"
  );
}

async function testProductionRoutes() {
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
    const shouldBeActive = shouldRouteBeActiveByDefault(path, false);
    console.log(`  ${shouldBeActive ? '✅' : '❌'} ${path} -> ${shouldBeActive ? 'ACTIVA' : 'INACTIVA'}`);
  });
  console.log();

  // Probar en modo producción
  console.log('🚀 Probando en modo PRODUCCIÓN:');
  testPaths.forEach(path => {
    const shouldBeActive = shouldRouteBeActiveByDefault(path, true);
    console.log(`  ${shouldBeActive ? '✅' : '❌'} ${path} -> ${shouldBeActive ? 'ACTIVA' : 'INACTIVA'}`);
  });
  console.log();

  // Mostrar rutas activas por defecto
  console.log('🎯 Rutas activas por defecto en producción:');
  const defaultRoutes = getDefaultActiveRoutes();
  defaultRoutes.forEach(route => {
    console.log(`  - ${route}`);
  });
  console.log();

  // Probar detección de entorno
  console.log('🌍 Detección de entorno:');
  const isProd = isProduction();
  console.log(`  Entorno actual: ${isProd ? 'PRODUCCIÓN' : 'DESARROLLO'}`);
  console.log(`  Variables de entorno:`);
  console.log(`    NODE_ENV: ${process.env.NODE_ENV || 'no definido'}`);
  console.log(`    NEXT_PUBLIC_VERCEL_ENV: ${process.env.NEXT_PUBLIC_VERCEL_ENV || 'no definido'}`);
  console.log(`    VERCEL_ENV: ${process.env.VERCEL_ENV || 'no definido'}`);
  console.log();

  console.log('✅ Pruebas completadas');
}

// Ejecutar
testProductionRoutes()
  .then(() => {
    console.log('\n🎉 Script de prueba completado exitosamente');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Error en las pruebas:', error);
    process.exit(1);
  });
