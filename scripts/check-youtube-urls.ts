#!/usr/bin/env tsx
import { config } from 'dotenv'
import { resolve } from 'path'

const envPath = resolve(process.cwd(), '.env.local')
config({ path: envPath })

const { sql } = await import('../lib/db.js')

// Buscar posts que contengan URLs de YouTube como texto plano
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

console.log(`\n🔍 Posts con URLs de YouTube encontrados: ${posts.length}\n`)

for (const post of posts) {
  console.log(`📝 Post ${post.id}: "${post.title}"`)
  
  // Buscar URLs de YouTube en el contenido
  const urlRegex = /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[^\s<>"]+/gi
  
  const contentEs = post.content_es || post.content || ''
  const contentEn = post.content_en || ''
  
  const matchesEs = contentEs.match(urlRegex) || []
  const matchesEn = contentEn.match(urlRegex) || []
  
  if (matchesEs.length > 0) {
    console.log(`  📺 URLs en español (${matchesEs.length}):`)
    matchesEs.forEach((url: string) => console.log(`     ${url}`))
  }
  
  if (matchesEn.length > 0) {
    console.log(`  📺 URLs en inglés (${matchesEn.length}):`)
    matchesEn.forEach((url: string) => console.log(`     ${url}`))
  }
  
  console.log()
}

process.exit(0)
