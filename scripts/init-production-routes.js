#!/usr/bin/env node

/**
 * Script para inicializar la configuración de producción de rutas
 * Este script debe ejecutarse después del deploy en producción
 */

const https = require('https');
const http = require('http');

// Configuración
const PRODUCTION_URL = process.env.PRODUCTION_URL || 'https://aaa23444.vercel.app';
const INIT_ENDPOINT = '/api/admin/routes/init-production';

function makeRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Production-Routes-Init/1.0'
      }
    };

    const req = client.request(options, (res) => {
      let body = '';
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: response
          });
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: body
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

async function initProductionRoutes() {
  console.log('🚀 Iniciando configuración de producción para rutas...');
  console.log(`📍 URL de producción: ${PRODUCTION_URL}`);
  
  try {
    // Primero, obtener información actual
    console.log('\n📋 Obteniendo información actual...');
    const getResponse = await makeRequest(`${PRODUCTION_URL}${INIT_ENDPOINT}`);
    
    if (getResponse.statusCode === 200) {
      console.log('✅ Información obtenida correctamente');
      console.log('📊 Estadísticas actuales:', JSON.stringify(getResponse.body.stats, null, 2));
      console.log('🎯 Rutas activas por defecto:', getResponse.body.defaultActiveRoutes);
    } else {
      console.log('⚠️ No se pudo obtener información actual:', getResponse.body);
    }
    
    // Ejecutar inicialización
    console.log('\n🔄 Ejecutando inicialización de producción...');
    const postResponse = await makeRequest(`${PRODUCTION_URL}${INIT_ENDPOINT}`, 'POST');
    
    if (postResponse.statusCode === 200) {
      console.log('✅ Configuración de producción inicializada correctamente');
      console.log('📊 Nuevas estadísticas:', JSON.stringify(postResponse.body.stats, null, 2));
      console.log('🎯 Rutas activas por defecto:', postResponse.body.defaultActiveRoutes);
    } else if (postResponse.statusCode === 400) {
      console.log('⚠️ No se puede ejecutar en desarrollo:', postResponse.body.message);
    } else {
      console.log('❌ Error al inicializar:', postResponse.body);
    }
    
  } catch (error) {
    console.error('❌ Error en la ejecución:', error.message);
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  initProductionRoutes()
    .then(() => {
      console.log('\n✅ Script completado exitosamente');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Script falló:', error);
      process.exit(1);
    });
}

module.exports = { initProductionRoutes };
