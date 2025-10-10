#!/usr/bin/env node

/**
 * Script simplificado para inicializar la base de datos de rutas administrables
 * No requiere psql, usa la conexión directa de la aplicación
 * Ejecutar: node scripts/init-routes-database-simple.js
 */

import { config } from 'dotenv'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { neon } from '@neondatabase/serverless'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Cargar variables de entorno desde .env.local
config({ path: resolve(__dirname, '..', '.env.local') })

// Verificar que las variables se cargaron
console.log('🔍 Variables de entorno cargadas:', {
  DATABASE_URL: process.env.DATABASE_URL ? '✅ Configurada' : '❌ No encontrada',
  NODE_ENV: process.env.NODE_ENV || 'development'
})

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL no está configurado. Verifica tu archivo .env.local')
  process.exit(1)
}

// Crear conexión directa a la base de datos
const sql = neon(process.env.DATABASE_URL)

console.log('🚀 Inicializando base de datos de rutas administrables...')

async function createTables() {
  try {
    console.log('📋 Creando tabla route_management...')
    
    await sql`
      CREATE TABLE IF NOT EXISTS route_management (
        id SERIAL PRIMARY KEY,
        path VARCHAR(255) NOT NULL UNIQUE,
        is_active BOOLEAN DEFAULT true,
        is_indexable BOOLEAN DEFAULT true,
        seo_title VARCHAR(255),
        seo_description TEXT,
        seo_keywords TEXT,
        robots_allow BOOLEAN DEFAULT true,
        sitemap_include BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        modified_by VARCHAR(255) DEFAULT 'system',
        category VARCHAR(100) DEFAULT 'general',
        priority INTEGER DEFAULT 0,
        last_accessed TIMESTAMP WITH TIME ZONE,
        access_count INTEGER DEFAULT 0
      )
    `
    console.log('✅ Tabla route_management creada')

    console.log('📋 Creando tabla route_access_logs...')
    
    await sql`
      CREATE TABLE IF NOT EXISTS route_access_logs (
        id SERIAL PRIMARY KEY,
        route_path VARCHAR(255) NOT NULL,
        ip_address INET,
        user_agent TEXT,
        access_allowed BOOLEAN,
        reason VARCHAR(255),
        accessed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        response_time_ms INTEGER,
        status_code INTEGER
      )
    `
    console.log('✅ Tabla route_access_logs creada')

    console.log('📋 Creando índices...')
    
    await sql`CREATE INDEX IF NOT EXISTS idx_route_management_path ON route_management(path)`
    await sql`CREATE INDEX IF NOT EXISTS idx_route_management_active ON route_management(is_active)`
    await sql`CREATE INDEX IF NOT EXISTS idx_route_management_indexable ON route_management(is_indexable)`
    await sql`CREATE INDEX IF NOT EXISTS idx_route_management_category ON route_management(category)`
    
    await sql`CREATE INDEX IF NOT EXISTS idx_route_access_logs_path ON route_access_logs(route_path)`
    await sql`CREATE INDEX IF NOT EXISTS idx_route_access_logs_accessed_at ON route_access_logs(accessed_at)`
    await sql`CREATE INDEX IF NOT EXISTS idx_route_access_logs_allowed ON route_access_logs(access_allowed)`
    
    console.log('✅ Índices creados')

    console.log('📋 Creando función update_updated_at_column...')
    
    await sql`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = CURRENT_TIMESTAMP;
          RETURN NEW;
      END;
      $$ language 'plpgsql'
    `
    console.log('✅ Función update_updated_at_column creada')

    console.log('📋 Creando trigger...')
    
    await sql`
      DROP TRIGGER IF EXISTS update_route_management_updated_at ON route_management
    `
    await sql`
      CREATE TRIGGER update_route_management_updated_at
          BEFORE UPDATE ON route_management
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at_column()
    `
    console.log('✅ Trigger creado')

    console.log('📋 Insertando rutas por defecto...')
    
    await sql`
      INSERT INTO route_management (path, is_active, is_indexable, category, priority, seo_title, seo_description) VALUES
      ('/', true, true, 'main', 1, 'Inicio - Mario Verdú', 'Página principal de Mario Verdú, desarrollador web y consultor tecnológico'),
      ('/posts', true, true, 'content', 2, 'Blog - Mario Verdú', 'Artículos y publicaciones sobre desarrollo web y tecnología'),
      ('/work-experience', true, true, 'content', 3, 'Experiencia Laboral - Mario Verdú', 'Experiencia profesional y proyectos realizados'),
      ('/contact', true, true, 'main', 4, 'Contacto - Mario Verdú', 'Información de contacto y formulario de contacto'),
      ('/admin', false, false, 'admin', 100, 'Admin Panel', 'Panel de administración'),
      ('/admin/routes', false, false, 'admin', 101, 'Gestión de Rutas', 'Panel de gestión de rutas'),
      ('/admin/analytics', false, false, 'admin', 102, 'Analíticas', 'Panel de analíticas')
      ON CONFLICT (path) DO NOTHING
    `
    console.log('✅ Rutas por defecto insertadas')

    console.log('📋 Creando vista route_stats...')
    
    await sql`
      CREATE OR REPLACE VIEW route_stats AS
      SELECT 
        COUNT(*) as total_routes,
        COUNT(CASE WHEN is_active = true THEN 1 END) as active_routes,
        COUNT(CASE WHEN is_active = false THEN 1 END) as inactive_routes,
        COUNT(CASE WHEN is_indexable = true THEN 1 END) as indexable_routes,
        COUNT(CASE WHEN is_indexable = false THEN 1 END) as non_indexable_routes,
        COUNT(CASE WHEN sitemap_include = true THEN 1 END) as sitemap_routes,
        COUNT(CASE WHEN robots_allow = true THEN 1 END) as robots_allowed_routes,
        COUNT(CASE WHEN robots_allow = false THEN 1 END) as robots_blocked_routes
      FROM route_management
    `
    console.log('✅ Vista route_stats creada')

    console.log('🎉 ¡Base de datos inicializada correctamente!')
    console.log('')
    console.log('📋 Próximos pasos:')
    console.log('1. Reinicia el servidor de desarrollo: npm run dev')
    console.log('2. Accede a /admin/routes para gestionar las rutas')
    console.log('3. Las rutas principales ya están configuradas por defecto')

  } catch (error) {
    console.error('❌ Error inicializando la base de datos:', error)
    process.exit(1)
  }
}

// Ejecutar la función
createTables()
