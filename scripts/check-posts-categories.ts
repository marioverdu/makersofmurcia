#!/usr/bin/env tsx
import { config } from 'dotenv'
import { resolve } from 'path'

const envPath = resolve(process.cwd(), '.env.local')
config({ path: envPath })

const { sql } = await import('../lib/db.js')

const posts = await sql`
  SELECT id, title, category, content_type
  FROM posts 
  ORDER BY id DESC
`

console.log('\n📊 Estado actual de posts:\n')
console.log('ID  | Categoría  | ContentType | Título')
console.log('----+------------+-------------+---------------------------')

for (const post of posts) {
  const id = String(post.id).padEnd(3)
  const category = (post.category || 'NULL').padEnd(10)
  const contentType = (post.content_type || 'NULL').padEnd(11)
  const title = post.title.substring(0, 25)
  console.log(`${id} | ${category} | ${contentType} | ${title}`)
}

console.log('\n📈 Resumen por categoría:')
const stats = await sql`
  SELECT category, content_type, COUNT(*) as count
  FROM posts
  GROUP BY category, content_type
  ORDER BY category, content_type
`

for (const stat of stats) {
  console.log(`  ${stat.category || 'NULL'} + ${stat.content_type || 'NULL'}: ${stat.count}`)
}

process.exit(0)
