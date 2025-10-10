import { neon } from '@neondatabase/serverless'

const DB = process.env.POSTGRES_URL || process.env.DATABASE_URL
if (!DB) {
  console.error('❌ Falta POSTGRES_URL/DATABASE_URL')
  process.exit(1)
}

const sql = neon(DB)

const TITLES = [
  'Post Demo de Video',
  'Demo Portfolio Post',
  'Simplicity is the ultimate sophistication',
  'Contenido Básico',
  'Otro Ejemplo Enriquecido',
]

async function run() {
  try {
    const before = await sql`SELECT id, title, content_type FROM posts WHERE title = ANY(${TITLES}) ORDER BY id`
    console.log('Antes:', before)

    const updated = await sql`UPDATE posts SET content_type = 'debug' WHERE title = ANY(${TITLES}) RETURNING id, title, content_type`
    console.log('Actualizados:', updated)

    const after = await sql`SELECT id, title, content_type FROM posts WHERE title = ANY(${TITLES}) ORDER BY id`
    console.log('Después:', after)
  } catch (e) {
    console.error('❌ Error moviendo a debug:', e)
    process.exit(1)
  }
}

run()


