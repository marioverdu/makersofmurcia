#!/usr/bin/env tsx
/**
 * Script para registrar rutas de posts existentes en el sistema de gestión de rutas
 * 
 * Este script:
 * 1. Obtiene todos los posts de la base de datos
 * 2. Registra automáticamente sus rutas en el sistema de gestión
 * 3. Sincroniza con KV para Vercel Edge
 * 
 * Uso:
 *   npx tsx scripts/register-existing-posts-routes.ts
 */

// Cargar variables de entorno
import { config } from 'dotenv'
config({ path: '.env.local' })

import { getPosts } from '../lib/posts-db'
import { RouteManagementService } from '../lib/route-management-service'

async function registerExistingPostsRoutes() {
  console.log('🔄 Iniciando registro de rutas para posts existentes...\n')

  try {
    // Obtener todos los posts
    const posts = await getPosts()
    console.log(`📊 Encontrados ${posts.length} posts en la base de datos\n`)

    let successCount = 0
    let errorCount = 0

    // Registrar ruta para cada post
    for (const post of posts) {
      try {
        const isPublished = post.published || post.status === 'published'
        
        console.log(`Processing post ${post.id}: "${post.title}"`)
        console.log(`  Slug: ${post.slug}`)
        console.log(`  Published: ${isPublished}`)
        
        await RouteManagementService.registerPostRoute(
          post.id,
          post.slug,
          isPublished
        )
        
        console.log(`  ✅ Ruta registrada exitosamente\n`)
        successCount++
      } catch (error) {
        console.error(`  ❌ Error registrando ruta para post ${post.id}:`, error)
        errorCount++
      }
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📊 RESUMEN:')
    console.log(`   Total de posts: ${posts.length}`)
    console.log(`   ✅ Rutas registradas exitosamente: ${successCount}`)
    console.log(`   ❌ Errores: ${errorCount}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    if (errorCount === 0) {
      console.log('✨ ¡Todas las rutas fueron registradas exitosamente!')
    } else {
      console.log('⚠️  Algunas rutas no pudieron ser registradas. Revisa los errores arriba.')
    }

  } catch (error) {
    console.error('❌ Error fatal durante el registro de rutas:', error)
    process.exit(1)
  }
}

// Ejecutar el script
registerExistingPostsRoutes()
  .then(() => {
    console.log('\n✅ Script completado')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Error ejecutando el script:', error)
    process.exit(1)
  })

