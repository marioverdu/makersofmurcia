#!/usr/bin/env node

/**
 * Debug script para probar las funciones de posts-db directamente
 */

import { getPosts, getPublishedPosts } from '../lib/posts-db.js';

async function debugPostsAPI() {
  console.log('🔍 Debugeando API de posts...\n');
  
  try {
    console.log('1️⃣ Probando getPosts()...');
    const allPosts = await getPosts();
    console.log(`   ✅ getPosts() exitoso: ${allPosts.length} posts encontrados`);
    
    if (allPosts.length > 0) {
      console.log(`   📝 Primer post: ${allPosts[0].title}`);
      console.log(`   🆔 ID: ${allPosts[0].id}`);
      console.log(`   🔗 Slug: ${allPosts[0].slug}`);
      console.log(`   📅 Creado: ${allPosts[0].created_at}`);
      console.log(`   🌍 title_es: ${allPosts[0].title_es || 'null'}`);
      console.log(`   🌍 title_en: ${allPosts[0].title_en || 'null'}`);
    }
    console.log('');
    
    console.log('2️⃣ Probando getPublishedPosts()...');
    const publishedPosts = await getPublishedPosts();
    console.log(`   ✅ getPublishedPosts() exitoso: ${publishedPosts.length} posts publicados`);
    console.log('');
    
    console.log('🎉 Todas las funciones de base de datos funcionan correctamente');
    console.log('💡 El problema puede estar en:');
    console.log('   - Variable de entorno POSTGRES_URL no configurada en el servidor');
    console.log('   - Middleware de Next.js interceptando la petición');
    console.log('   - Error en la importación de módulos en la API route');
    
  } catch (error) {
    console.error('❌ Error en funciones de base de datos:', error);
    console.log('');
    console.log('🔧 Posibles soluciones:');
    console.log('   1. Verificar POSTGRES_URL en .env.local');
    console.log('   2. Revisar la sintaxis SQL en lib/posts-db.ts');
    console.log('   3. Comprobar que las columnas de traducción existan en la BD');
  }
}

// Ejecutar debug
debugPostsAPI();
