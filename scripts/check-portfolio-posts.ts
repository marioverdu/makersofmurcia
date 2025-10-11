#!/usr/bin/env tsx
import { config } from 'dotenv'
import { resolve } from 'path'

const envPath = resolve(process.cwd(), '.env.local')
config({ path: envPath })

const { sql } = await import('../lib/db.js')

console.log('\n🔍 Verificando posts específicos...\n')

// Buscar los posts mencionados
const posts = await sql`
  SELECT id, title, category, content_type
  FROM posts 
  WHERE title LIKE '%Pebbble%' 
     OR title LIKE '%Portfolio redesign%'
     OR title LIKE '%Dain.App%'
  ORDER BY id DESC
`

console.log('📋 Posts encontrados:\n')
for (const post of posts) {
  console.log(`Post ${post.id}: "${post.title}"`)
  console.log(`  Category: ${post.category || 'NULL'}`)
  console.log(`  Content Type: ${post.content_type || 'NULL'}`)
  console.log()
}

console.log('\n📊 Todos los tipos de contenido en la BD:\n')
const contentTypes = await sql`
  SELECT DISTINCT content_type, COUNT(*) as count
  FROM posts
  GROUP BY content_type
  ORDER BY count DESC
`

for (const ct of contentTypes) {
  console.log(`  ${ct.content_type || 'NULL'}: ${ct.count} posts`)
}

console.log('\n📊 Combinaciones category + content_type:\n')
const combinations = await sql`
  SELECT category, content_type, COUNT(*) as count
  FROM posts
  GROUP BY category, content_type
  ORDER BY category, content_type
`

for (const combo of combinations) {
  console.log(`  ${combo.category || 'NULL'} + ${combo.content_type || 'NULL'}: ${combo.count} posts`)
}

process.exit(0)
