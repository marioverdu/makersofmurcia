#!/usr/bin/env tsx
import { config } from 'dotenv'
import { resolve } from 'path'

const envPath = resolve(process.cwd(), '.env.local')
config({ path: envPath })

const { sql } = await import('../lib/db.js')

console.log('\n🔄 Corrigiendo posts de portfolio concept...\n')

// Posts que deben ser portfolio
const postsToFix = [
  { id: 31, title: 'Pebbble - Concept' },
  { id: 35, title: 'Portfolio redesign - Concept' },
  { id: 37, title: 'Dain.App Redesign - Concept' }
]

let successCount = 0
let errorCount = 0

for (const post of postsToFix) {
  try {
    console.log(`🔄 Actualizando Post ${post.id}: "${post.title}"`)
    console.log(`  De: category=postsv2, content_type=post`)
    console.log(`  A:  category=portfolio, content_type=portfolio`)
    
    await sql`
      UPDATE posts 
      SET 
        category = 'portfolio',
        content_type = 'portfolio',
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${post.id}
    `
    
    console.log(`  ✅ Actualizado exitosamente\n`)
    successCount++
  } catch (error) {
    console.error(`  ❌ Error:`, error)
    errorCount++
  }
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log('📊 RESUMEN:')
console.log(`   Posts actualizados: ${successCount}`)
console.log(`   Errores: ${errorCount}`)
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

// Verificar resultado
console.log('🔍 Verificando cambios...\n')
const updated = await sql`
  SELECT id, title, category, content_type
  FROM posts 
  WHERE id IN (31, 35, 37)
  ORDER BY id
`

for (const post of updated) {
  console.log(`Post ${post.id}: "${post.title}"`)
  console.log(`  Category: ${post.category}`)
  console.log(`  Content Type: ${post.content_type}`)
  console.log()
}

// Estadísticas finales
console.log('\n📊 Distribución final:\n')
const stats = await sql`
  SELECT category, content_type, COUNT(*) as count
  FROM posts
  WHERE category IN ('portfolio', 'postsv2')
  GROUP BY category, content_type
  ORDER BY category, content_type
`

for (const stat of stats) {
  console.log(`  ${stat.category} + ${stat.content_type}: ${stat.count} posts`)
}

console.log('\n✅ Posts corregidos. Ahora se mostrarán solo en la tab Portfolio')

process.exit(0)
