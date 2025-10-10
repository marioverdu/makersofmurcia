import { neon } from '@neondatabase/serverless'

const DB = process.env.POSTGRES_URL || process.env.DATABASE_URL
if (!DB) {
  console.error('❌ Falta POSTGRES_URL/DATABASE_URL')
  process.exit(1)
}

const sql = neon(DB)

const TITLE = 'Post Demo de Video'

async function run() {
  try {
    const before = await sql`SELECT id, title, content_type FROM posts WHERE title = ${TITLE}`
    console.log('Antes:', before)

    const updated = await sql`UPDATE posts SET content_type = 'portfolio' WHERE title = ${TITLE} RETURNING id, title, content_type`
    console.log('Actualizados:', updated)

    const after = await sql`SELECT id, title, content_type FROM posts WHERE title = ${TITLE}`
    console.log('Después:', after)
  } catch (e) {
    console.error('❌ Error moviendo a portfolio:', e)
    process.exit(1)
  }
}

run()


