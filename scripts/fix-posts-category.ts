#!/usr/bin/env tsx
/**
 * Script para actualizar la categoría de posts existentes
 * 
 * Este script:
 * 1. Obtiene todos los posts sin categoría o con categoría incorrecta
 * 2. Les asigna la categoría 'postsv2' para que aparezcan en /posts
 * 
 * Uso:
 *   npx tsx scripts/fix-posts-category.ts
 */

// Cargar variables de entorno ANTES de cualquier import
import { config } from 'dotenv'
import { resolve } from 'path'

const envPath = resolve(process.cwd(), '.env.local')
const result = config({ path: envPath })

if (result.error) {
  console.error('❌ Error cargando .env.local:', result.error)
} else {
  console.log('✅ Variables de entorno cargadas desde:', envPath)
}

// Ahora importar sql después de cargar las variables
const { sql } = await import('../lib/db.js')

async function fixPostsCategory() {
  console.log('🔄 Iniciando corrección de categorías de posts...\n')

  try {
    // Obtener posts sin categoría o con categoría incorrecta
    const postsToFix = await sql`
      SELECT id, title, category, content_type
      FROM posts 
      WHERE category IS NULL 
         OR category NOT IN ('postsv2', 'about', 'portfolio')
      ORDER BY created_at DESC
    `

    console.log(`📊 Encontrados ${postsToFix.length} posts que necesitan corrección\n`)

    if (postsToFix.length === 0) {
      console.log('✨ ¡Todos los posts ya tienen la categoría correcta!')
      return
    }

    let successCount = 0
    let errorCount = 0

    // Actualizar cada post
    for (const post of postsToFix) {
      try {
        // Determinar la categoría correcta basándonos en content_type
        let newCategory = 'postsv2' // Por defecto
        
        const contentType = (post.content_type || '').toLowerCase()
        if (contentType === 'portfolio') {
          newCategory = 'portfolio'
        } else if (post.category === 'about') {
          newCategory = 'about' // Mantener 'about' si ya lo tiene
        }

        console.log(`🔄 Actualizando post ${post.id}: "${post.title}"`)
        console.log(`   Categoría actual: ${post.category || 'NULL'}`)
        console.log(`   Nueva categoría: ${newCategory}`)
        
        await sql`
          UPDATE posts 
          SET category = ${newCategory}
          WHERE id = ${post.id}
        `
        
        console.log(`   ✅ Categoría actualizada exitosamente\n`)
        successCount++
      } catch (error) {
        console.error(`   ❌ Error actualizando post ${post.id}:`, error)
        errorCount++
      }
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📊 RESUMEN:')
    console.log(`   Total de posts procesados: ${postsToFix.length}`)
    console.log(`   ✅ Actualizados exitosamente: ${successCount}`)
    console.log(`   ❌ Errores: ${errorCount}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    if (errorCount === 0) {
      console.log('✨ ¡Todas las categorías fueron actualizadas exitosamente!')
      console.log('   Ahora tus posts deberían aparecer en /posts')
    } else {
      console.log('⚠️  Algunos posts no pudieron ser actualizados. Revisa los errores arriba.')
    }

    // Mostrar estadísticas finales
    const stats = await sql`
      SELECT 
        category,
        COUNT(*) as count
      FROM posts
      GROUP BY category
      ORDER BY count DESC
    `

    console.log('\n📊 Estadísticas de categorías:')
    stats.forEach((stat: any) => {
      console.log(`   ${stat.category || 'NULL'}: ${stat.count} posts`)
    })

  } catch (error) {
    console.error('❌ Error fatal durante la corrección de categorías:', error)
    process.exit(1)
  }
}

// Ejecutar el script
fixPostsCategory()
  .then(() => {
    console.log('\n✅ Script completado')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Error ejecutando el script:', error)
    process.exit(1)
  })

