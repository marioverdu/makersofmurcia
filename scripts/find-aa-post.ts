#!/usr/bin/env tsx
import { config } from 'dotenv'
import { resolve } from 'path'

const envPath = resolve(process.cwd(), '.env.local')
config({ path: envPath })

const { sql } = await import('../lib/db.js')

console.log('\n🔍 Buscando post "aa"...\n')

const aaPost = await sql`
  SELECT id, title, category, content_type, published, status
  FROM posts 
  WHERE title LIKE '%aa%'
  ORDER BY id DESC
`

if (aaPost.length > 0) {
  for (const post of aaPost) {
    console.log(`Post ${post.id}: "${post.title}"`)
    console.log(`  Category: ${post.category || 'NULL'}`)
    console.log(`  Content Type: ${post.content_type || 'NULL'}`)
    console.log(`  Published: ${post.published}`)
    console.log(`  Status: ${post.status}`)
    console.log()
  }
} else {
  console.log('❌ No se encontró el post "aa"')
}

process.exit(0)
