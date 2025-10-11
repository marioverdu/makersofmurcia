#!/usr/bin/env tsx
import { config } from 'dotenv'
import { resolve } from 'path'

const envPath = resolve(process.cwd(), '.env.local')
config({ path: envPath })

const { sql } = await import('../lib/db.js')

const post = await sql`
  SELECT id, title, content, content_es, content_en
  FROM posts 
  WHERE id = 42
`

if (post.length > 0) {
  console.log('\n📝 Post 42 - "Liked songs"\n')
  console.log('Contenido ES (primeros 500 caracteres):')
  console.log('='.repeat(80))
  console.log((post[0].content_es || post[0].content || '').substring(0, 500))
  console.log('='.repeat(80))
}

process.exit(0)
