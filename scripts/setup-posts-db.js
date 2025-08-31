require('dotenv').config({ path: '.env.local' });
const { sql } = require('@vercel/postgres');
const fs = require('fs');

async function setupPostsDatabase() {
  try {
    console.log('🔧 Configurando base de datos de posts...');
    
    // Leer el archivo SQL
    const sqlContent = fs.readFileSync('scripts/init-posts-table.sql', 'utf8');
    
    // Ejecutar el SQL
    await sql`${sqlContent}`;
    
    console.log('✅ Tablas de posts creadas exitosamente');
    console.log('📊 Datos de ejemplo insertados');
    
    // Verificar que las tablas se crearon
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('posts', 'tags', 'post_tags')
    `;
    
    console.log('📋 Tablas creadas:', tables.rows.map(row => row.table_name));
    
    // Verificar que hay posts
    const posts = await sql`SELECT COUNT(*) as count FROM posts`;
    console.log(`📝 Posts en la base de datos: ${posts.rows[0].count}`);
    
  } catch (error) {
    console.error('❌ Error configurando la base de datos:', error);
    process.exit(1);
  }
}

setupPostsDatabase(); 