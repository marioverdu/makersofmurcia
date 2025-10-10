import { neon } from '@neondatabase/serverless'

const DATABASE_URL = process.env.POSTGRES_URL || process.env.DATABASE_URL
if (!DATABASE_URL) {
  console.error('❌ POSTGRES_URL/DATABASE_URL no está configurada')
  process.exit(1)
}

const sql = neon(DATABASE_URL)

async function ensureTables() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS page_events (
      id SERIAL PRIMARY KEY,
      page_path VARCHAR(255) NOT NULL,
      user_agent TEXT,
      ip_address INET,
      referrer VARCHAR(500),
      session_id VARCHAR(255),
      user_id VARCHAR(255),
      event_type VARCHAR(50) DEFAULT 'pageview',
      metadata JSONB,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`

    await sql`CREATE TABLE IF NOT EXISTS user_metrics (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255),
      session_id VARCHAR(255),
      page_views INTEGER DEFAULT 0,
      time_spent INTEGER DEFAULT 0,
      last_activity TIMESTAMPTZ DEFAULT NOW(),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`

    await sql`CREATE TABLE IF NOT EXISTS performance_metrics (
      id SERIAL PRIMARY KEY,
      page_path VARCHAR(255) NOT NULL,
      load_time INTEGER,
      dom_content_loaded INTEGER,
      window_load INTEGER,
      user_agent TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`

    await sql`CREATE TABLE IF NOT EXISTS custom_events (
      id SERIAL PRIMARY KEY,
      event_name VARCHAR(100) NOT NULL,
      event_category VARCHAR(100),
      event_label VARCHAR(255),
      event_value INTEGER,
      page_path VARCHAR(255),
      user_id VARCHAR(255),
      session_id VARCHAR(255),
      metadata JSONB,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`

    const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name IN ('page_events','user_metrics','performance_metrics','custom_events') ORDER BY table_name`
    console.log('✅ Tablas presentes:', tables.map(t => t.table_name))
  } catch (e) {
    console.error('❌ Error asegurando tablas:', e)
    process.exit(1)
  }
}

ensureTables()


