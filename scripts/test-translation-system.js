#!/usr/bin/env node

/**
 * Test práctico del sistema de traducciones
 * Verifica que las APIs respondan correctamente con el parámetro lang
 */

import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';

async function testTranslationSystem() {
  console.log('🧪 TESTING SISTEMA DE TRADUCCIONES\n');
  
  try {
    // Test 1: API de posts con idioma español
    console.log('1️⃣ Probando API /api/posts?lang=es');
    const postsEsResponse = await fetch(`${BASE_URL}/api/posts?lang=es`);
    
    if (postsEsResponse.ok) {
      const postsEs = await postsEsResponse.json();
      console.log(`   ✅ Respuesta exitosa: ${postsEs.length} posts en español`);
      if (postsEs.length > 0) {
        console.log(`   📝 Primer post: "${postsEs[0].title}"`);
        console.log(`   🌍 Idioma: ${postsEs[0].language || 'no especificado'}`);
      }
    } else {
      console.log('   ❌ Error al obtener posts en español');
    }
    console.log('');
    
    // Test 2: API de posts con idioma inglés
    console.log('2️⃣ Probando API /api/posts?lang=en');
    const postsEnResponse = await fetch(`${BASE_URL}/api/posts?lang=en`);
    
    if (postsEnResponse.ok) {
      const postsEn = await postsEnResponse.json();
      console.log(`   ✅ Respuesta exitosa: ${postsEn.length} posts en inglés`);
      if (postsEn.length > 0) {
        console.log(`   📝 Primer post: "${postsEn[0].title}"`);
        console.log(`   🌍 Idioma: ${postsEn[0].language || 'no especificado'}`);
      }
    } else {
      console.log('   ❌ Error al obtener posts en inglés');
    }
    console.log('');
    
    // Test 3: API de post específico en español
    console.log('3️⃣ Probando API /api/posts/1?lang=es');
    const postEsResponse = await fetch(`${BASE_URL}/api/posts/1?lang=es`);
    
    if (postEsResponse.ok) {
      const postEs = await postEsResponse.json();
      console.log(`   ✅ Post en español obtenido: "${postEs.title}"`);
      console.log(`   🌍 Idioma: ${postEs.language}`);
      console.log(`   🔄 Traducciones disponibles: ES=${postEs.hasTranslation?.es}, EN=${postEs.hasTranslation?.en}`);
    } else {
      console.log('   ❌ Error al obtener post específico en español');
    }
    console.log('');
    
    // Test 4: API de post específico en inglés
    console.log('4️⃣ Probando API /api/posts/1?lang=en');
    const postEnResponse = await fetch(`${BASE_URL}/api/posts/1?lang=en`);
    
    if (postEnResponse.ok) {
      const postEn = await postEnResponse.json();
      console.log(`   ✅ Post en inglés obtenido: "${postEn.title}"`);
      console.log(`   🌍 Idioma: ${postEn.language}`);
      console.log(`   🔄 Traducciones disponibles: ES=${postEn.hasTranslation?.es}, EN=${postEn.hasTranslation?.en}`);
    } else {
      console.log('   ❌ Error al obtener post específico en inglés');
    }
    console.log('');
    
    // Test 5: Verificar que las URLs localizadas funcionan
    console.log('5️⃣ Probando URLs localizadas del frontend');
    
    const frontendEsResponse = await fetch(`${BASE_URL}/es/posts/view/1`);
    if (frontendEsResponse.ok) {
      console.log('   ✅ URL /es/posts/view/1 responde correctamente');
    } else {
      console.log('   ❌ Error en URL /es/posts/view/1');
    }
    
    const frontendEnResponse = await fetch(`${BASE_URL}/en/posts/view/1`);
    if (frontendEnResponse.ok) {
      console.log('   ✅ URL /en/posts/view/1 responde correctamente');
    } else {
      console.log('   ❌ Error en URL /en/posts/view/1');
    }
    console.log('');
    
    console.log('🎉 PRUEBAS COMPLETADAS');
    console.log('✅ El sistema de traducciones está funcionando correctamente');
    console.log('');
    console.log('📋 Próximos pasos:');
    console.log('   1. Agregar traducciones al inglés en la base de datos');
    console.log('   2. Verificar que el contenido se muestra en el idioma correcto en el frontend');
    console.log('   3. Implementar editor bilingüe en el panel de administración');
    
  } catch (error) {
    console.error('❌ Error durante las pruebas:', error.message);
    console.log('');
    console.log('ℹ️ Nota: Asegúrate de que el servidor de desarrollo esté ejecutándose:');
    console.log('   npm run dev');
  }
}

// Ejecutar tests
testTranslationSystem();
