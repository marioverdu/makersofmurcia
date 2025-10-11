#!/usr/bin/env tsx
/**
 * Script para convertir URLs de YouTube a iframes embebidos en posts existentes
 * 
 * Este script:
 * 1. Encuentra todos los posts que contienen URLs de YouTube como texto plano
 * 2. Convierte las URLs a iframes embebidos
 * 3. Actualiza los posts en la base de datos
 * 
 * Uso:
 *   npx tsx scripts/convert-youtube-urls-in-posts.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'

const envPath = resolve(process.cwd(), '.env.local')
config({ path: envPath })

const { sql } = await import('../lib/db.js')
const { convertYouTubeUrlsToEmbeds, hasYouTubeUrls, extractYouTubeUrls } = await import('../lib/youtube-embed-converter.js')

async function convertYouTubeUrlsInPosts() {
  console.log('🔄 Iniciando conversión de URLs de YouTube a embeds...\n')

  try {
    // Obtener posts que contienen URLs de YouTube
    const posts = await sql`
      SELECT id, title, content, content_es, content_en
      FROM posts 
      WHERE content LIKE '%youtube.com%' 
         OR content LIKE '%youtu.be%'
         OR content_es LIKE '%youtube.com%' 
         OR content_es LIKE '%youtu.be%'
         OR content_en LIKE '%youtube.com%' 
         OR content_en LIKE '%youtu.be%'
      ORDER BY id DESC
    `

    console.log(`📊 Encontrados ${posts.length} posts con posibles URLs de YouTube\n`)

    if (posts.length === 0) {
      console.log('✨ ¡No hay posts que necesiten conversión!')
      return
    }

    let convertedCount = 0
    let skippedCount = 0
    let errorCount = 0

    for (const post of posts) {
      try {
        const contentEs = post.content_es || post.content || ''
        const contentEn = post.content_en || ''
        
        // Verificar si realmente hay URLs de YouTube que no están embebidas
        const hasYouTubeEs = hasYouTubeUrls(contentEs) && !contentEs.includes('youtube-embed-container')
        const hasYouTubeEn = hasYouTubeUrls(contentEn) && !contentEn.includes('youtube-embed-container')
        
        if (!hasYouTubeEs && !hasYouTubeEn) {
          console.log(`⏭️  Post ${post.id} ("${post.title}"): Ya tiene embeds o no tiene URLs`)
          skippedCount++
          continue
        }

        console.log(`\n🔄 Procesando post ${post.id}: "${post.title}"`)
        
        // Extraer URLs antes de convertir
        if (hasYouTubeEs) {
          const urlsEs = extractYouTubeUrls(contentEs)
          console.log(`  📺 URLs en español (${urlsEs.length}):`)
          urlsEs.forEach((url: string) => console.log(`     ${url}`))
        }
        
        if (hasYouTubeEn) {
          const urlsEn = extractYouTubeUrls(contentEn)
          console.log(`  📺 URLs en inglés (${urlsEn.length}):`)
          urlsEn.forEach((url: string) => console.log(`     ${url}`))
        }

        // Convertir URLs a embeds
        const newContentEs = hasYouTubeEs ? convertYouTubeUrlsToEmbeds(contentEs) : contentEs
        const newContentEn = hasYouTubeEn ? convertYouTubeUrlsToEmbeds(contentEn) : contentEn

        // Actualizar en la base de datos
        await sql`
          UPDATE posts 
          SET 
            content_es = ${newContentEs || null},
            content_en = ${newContentEn || null},
            content = ${newContentEs || post.content},
            updated_at = CURRENT_TIMESTAMP
          WHERE id = ${post.id}
        `

        console.log(`  ✅ Convertido exitosamente`)
        convertedCount++

      } catch (error) {
        console.error(`  ❌ Error procesando post ${post.id}:`, error)
        errorCount++
      }
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📊 RESUMEN:')
    console.log(`   Total de posts analizados: ${posts.length}`)
    console.log(`   ✅ Posts convertidos: ${convertedCount}`)
    console.log(`   ⏭️  Posts omitidos (ya embebidos): ${skippedCount}`)
    console.log(`   ❌ Errores: ${errorCount}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    if (errorCount === 0) {
      console.log('✨ ¡Todas las URLs fueron convertidas exitosamente!')
      console.log('   Los posts ahora mostrarán reproductores de YouTube embebidos')
    } else {
      console.log('⚠️  Algunos posts no pudieron ser convertidos. Revisa los errores arriba.')
    }

  } catch (error) {
    console.error('❌ Error fatal durante la conversión:', error)
    process.exit(1)
  }
}

// Ejecutar el script
convertYouTubeUrlsInPosts()
  .then(() => {
    console.log('\n✅ Script completado')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Error ejecutando el script:', error)
    process.exit(1)
  })

