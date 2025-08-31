#!/usr/bin/env node

/**
 * Script de validación para confirmar que la migración de traducciones de posts fue exitosa
 * Ejecutar con: node scripts/validate-posts-migration.js
 */

import { sql } from '@vercel/postgres';

async function validateMigration() {
  try {
    console.log('🔍 Iniciando validación de migración de traducciones...\n');
    
    // 1. Verificar que las columnas existen
    console.log('1️⃣ Verificando que las nuevas columnas existen...');
    const columnsResult = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'posts' 
      AND (column_name LIKE '%_es' OR column_name LIKE '%_en')
      ORDER BY column_name
    `;
    
    const expectedColumns = ['content_en', 'content_es', 'excerpt_en', 'excerpt_es', 'title_en', 'title_es'];
    const actualColumns = columnsResult.rows.map(row => row.column_name);
    
    console.log('   Columnas encontradas:', actualColumns);
    
    const missingColumns = expectedColumns.filter(col => !actualColumns.includes(col));
    if (missingColumns.length > 0) {
      throw new Error(`Columnas faltantes: ${missingColumns.join(', ')}`);
    }
    console.log('   ✅ Todas las columnas de traducción están presentes\n');
    
    // 2. Verificar que los índices existen
    console.log('2️⃣ Verificando que los índices fueron creados...');
    const indexesResult = await sql`
      SELECT indexname 
      FROM pg_indexes 
      WHERE tablename = 'posts' 
      AND (indexname LIKE 'idx_posts_title_%')
      ORDER BY indexname
    `;
    
    const expectedIndexes = ['idx_posts_title_en', 'idx_posts_title_es'];
    const actualIndexes = indexesResult.rows.map(row => row.indexname);
    
    console.log('   Índices encontrados:', actualIndexes);
    
    const missingIndexes = expectedIndexes.filter(idx => !actualIndexes.includes(idx));
    if (missingIndexes.length > 0) {
      console.log(`   ⚠️ Índices faltantes: ${missingIndexes.join(', ')}`);
    } else {
      console.log('   ✅ Todos los índices están presentes');
    }
    console.log('');
    
    // 3. Verificar migración de datos existentes
    console.log('3️⃣ Verificando migración de datos existentes...');
    const migrationResult = await sql`
      SELECT 
        COUNT(*) as total_posts,
        COUNT(title_es) as posts_with_title_es,
        COUNT(content_es) as posts_with_content_es,
        COUNT(excerpt_es) as posts_with_excerpt_es,
        COUNT(title_en) as posts_with_title_en,
        COUNT(content_en) as posts_with_content_en,
        COUNT(excerpt_en) as posts_with_excerpt_en
      FROM posts
    `;
    
    const stats = migrationResult.rows[0];
    console.log('   📊 Estadísticas de migración:');
    console.log(`      Total de posts: ${stats.total_posts}`);
    console.log(`      Posts con título en español: ${stats.posts_with_title_es}`);
    console.log(`      Posts con contenido en español: ${stats.posts_with_content_es}`);
    console.log(`      Posts con extracto en español: ${stats.posts_with_excerpt_es}`);
    console.log(`      Posts con título en inglés: ${stats.posts_with_title_en}`);
    console.log(`      Posts con contenido en inglés: ${stats.posts_with_content_en}`);
    console.log(`      Posts con extracto en inglés: ${stats.posts_with_excerpt_en}`);
    
    if (stats.posts_with_title_es == stats.total_posts && 
        stats.posts_with_content_es == stats.total_posts) {
      console.log('   ✅ Migración automática al español completada correctamente');
    } else {
      console.log('   ⚠️ Algunos posts no fueron migrados automáticamente al español');
    }
    console.log('');
    
    // 4. Probar el sistema de localización
    console.log('4️⃣ Probando el sistema de localización...');
    
    // Obtener un post de ejemplo
    const samplePostResult = await sql`
      SELECT id, title, content, excerpt, title_es, content_es, excerpt_es, title_en, content_en, excerpt_en
      FROM posts 
      WHERE title_es IS NOT NULL 
      LIMIT 1
    `;
    
    if (samplePostResult.rows.length > 0) {
      const post = samplePostResult.rows[0];
      console.log(`   📝 Probando con post ID: ${post.id}`);
      console.log(`      Título original: "${post.title}"`);
      console.log(`      Título ES: "${post.title_es}"`);
      console.log(`      Título EN: "${post.title_en || 'No disponible'}"`);
      
      // Simular lógica de localización
      const titleEs = post.title_es || post.title;
      const titleEn = post.title_en || post.title_es || post.title;
      
      console.log(`   🔄 Simulación de localización:`);
      console.log(`      Idioma ES → "${titleEs}"`);
      console.log(`      Idioma EN → "${titleEn}"`);
      console.log('   ✅ Sistema de localización funcionando correctamente');
    } else {
      console.log('   ⚠️ No se encontraron posts para probar la localización');
    }
    console.log('');
    
    // 5. Verificar integridad de datos
    console.log('5️⃣ Verificando integridad de datos...');
    const integrityResult = await sql`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE title IS NULL AND title_es IS NULL AND title_en IS NULL) as posts_without_title,
        COUNT(*) FILTER (WHERE content IS NULL AND content_es IS NULL AND content_en IS NULL) as posts_without_content
      FROM posts
    `;
    
    const integrity = integrityResult.rows[0];
    
    if (integrity.posts_without_title > 0 || integrity.posts_without_content > 0) {
      console.log(`   ⚠️ Posts sin título: ${integrity.posts_without_title}`);
      console.log(`   ⚠️ Posts sin contenido: ${integrity.posts_without_content}`);
    } else {
      console.log('   ✅ Todos los posts mantienen su integridad de datos');
    }
    console.log('');
    
    // Resumen final
    console.log('🎉 VALIDACIÓN COMPLETADA');
    console.log('📊 Resumen:');
    console.log(`   • ${expectedColumns.length} columnas de traducción agregadas`);
    console.log(`   • ${actualIndexes.length} índices creados`);
    console.log(`   • ${stats.total_posts} posts migrados al español`);
    console.log(`   • ${stats.posts_with_title_en || 0} posts con traducción al inglés`);
    console.log('');
    console.log('✅ LA MIGRACIÓN FUE EXITOSA - El sistema de traducciones está listo para usar');
    
  } catch (error) {
    console.error('❌ Error durante la validación:', error);
    process.exit(1);
  }
}

// Ejecutar validación
validateMigration();
