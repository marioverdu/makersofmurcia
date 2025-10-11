#!/usr/bin/env tsx
import { config } from 'dotenv'
import { resolve } from 'path'

const envPath = resolve(process.cwd(), '.env.local')
config({ path: envPath })

const { sql } = await import('../lib/db.js')

console.log('\n📊 DISTRIBUCIÓN DE POSTS POR TAB\n')
console.log('='.repeat(80))

// Tab Concept (Posts normales)
console.log('\n🎨 TAB "CONCEPT" (Posts normales):')
console.log('  Filtro: category = postsv2 AND content_type != portfolio\n')

const conceptPosts = await sql`
  SELECT id, title, category, content_type
  FROM posts 
  WHERE category = 'postsv2' 
    AND (content_type != 'portfolio' OR content_type IS NULL)
    AND content_type != 'debug'
  ORDER BY created_at DESC
`

console.log(`  Total: ${conceptPosts.length} posts\n`)
for (const post of conceptPosts) {
  console.log(`  ${post.id}. ${post.title}`)
  console.log(`     category: ${post.category}, content_type: ${post.content_type || 'NULL'}`)
}

// Tab Portfolio
console.log('\n\n💼 TAB "PORTFOLIO":')
console.log('  Filtro: category = portfolio OR content_type = portfolio\n')

const portfolioPosts = await sql`
  SELECT id, title, category, content_type
  FROM posts 
  WHERE category = 'portfolio' 
     OR content_type = 'portfolio'
  ORDER BY created_at DESC
`

console.log(`  Total: ${portfolioPosts.length} posts\n`)
for (const post of portfolioPosts) {
  console.log(`  ${post.id}. ${post.title}`)
  console.log(`     category: ${post.category}, content_type: ${post.content_type || 'NULL'}`)
}

// Debug posts (solo en dev)
console.log('\n\n🐛 DEBUG POSTS (solo en desarrollo):')
const debugPosts = await sql`
  SELECT id, title, category, content_type
  FROM posts 
  WHERE content_type = 'debug'
  ORDER BY created_at DESC
`

console.log(`  Total: ${debugPosts.length} posts\n`)
for (const post of debugPosts) {
  console.log(`  ${post.id}. ${post.title}`)
}

console.log('\n' + '='.repeat(80))
console.log('\n✅ Resumen:')
console.log(`   Tab Concept: ${conceptPosts.length} posts`)
console.log(`   Tab Portfolio: ${portfolioPosts.length} posts`)
console.log(`   Debug (dev only): ${debugPosts.length} posts`)
console.log()

process.exit(0)
