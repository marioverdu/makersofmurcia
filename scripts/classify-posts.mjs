import { neon } from '@neondatabase/serverless'

const DB_URL = process.env.POSTGRES_URL || process.env.DATABASE_URL
if (!DB_URL) {
  console.error('❌ Falta POSTGRES_URL/DATABASE_URL')
  process.exit(1)
}

const sql = neon(DB_URL)

function detectType(post) {
  const title = (post.title || '').toLowerCase()
  const excerpt = (post.excerpt || '').toLowerCase()
  const content = (post.content || '').toLowerCase()
  const tags = (post.tags || [])
    .map(t => (typeof t === 'string' ? t.toLowerCase() : ''))
    .filter(Boolean)
  const category = (post.category || '').toLowerCase()

  const has = (substr) => content.includes(substr)
  const anyTag = (arr) => tags.some(t => arr.includes(t))

  // Portfolio explícito
  if (category === 'portfolio' || anyTag(['portfolio'])) return 'portfolio'

  // Video
  if (
    has('<video') || has('youtube.com/') || has('youtu.be/') ||
    has('vimeo.com/') || title.includes('video') || anyTag(['video'])
  ) return 'video-player'

  // Música
  if (
    has('<audio') || has('spotify.com/') || has('soundcloud.com/') ||
    title.includes('music') || anyTag(['music','audio'])
  ) return 'music-player'

  // Quote
  const isQuote = /<blockquote[\s\S]*?>[\s\S]*?<\/blockquote>/.test(post.content || '') ||
                  (/^".+"$/.test((post.excerpt || '').trim()) && (post.excerpt || '').length < 180)
  if (isQuote || anyTag(['quote'])) return 'quote'

  // Photo (predominancia de imágenes)
  const imgCount = (post.content || '').match(/<img\b/gi)?.length || 0
  const textLen = (post.content || '').replace(/<[^>]*>/g,'').trim().length
  if ((imgCount >= 3 && textLen < 500) || anyTag(['photo','fotografia','photography'])) return 'photo'

  // Post+ (tablas/ASCII/avanzado)
  if (has('<table') || has('class="table-container"') || has('ascii-art') || anyTag(['ascii'])) return 'post+'

  // Por defecto
  return 'post'
}

async function run() {
  try {
    const rows = await sql`SELECT id, title, excerpt, content, tags, category, content_type FROM posts ORDER BY id`
    const updates = []
    for (const row of rows) {
      const current = (row.content_type || '').toLowerCase()
      const detected = detectType(row)
      if (current !== detected) {
        await sql`UPDATE posts SET content_type = ${detected} WHERE id = ${row.id}`
        updates.push({ id: row.id, from: current || '(null)', to: detected })
      }
    }
    console.log('✅ Clasificación completada')
    console.table(updates)
    const counts = await sql`SELECT content_type, COUNT(*) as n FROM posts GROUP BY content_type ORDER BY n DESC`
    console.log('Distribución por tipo:', counts)
  } catch (e) {
    console.error('❌ Error clasificando posts:', e)
    process.exit(1)
  }
}

run()


