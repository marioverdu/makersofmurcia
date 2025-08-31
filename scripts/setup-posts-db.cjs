require('dotenv').config({ path: '.env.local' });
const { sql } = require('@vercel/postgres');

async function setupPostsDatabase() {
  try {
    console.log('🔧 Configurando base de datos de posts...');
    
    // Verificar si la tabla posts existe
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'posts'
      )
    `;
    
    if (tableExists.rows[0].exists) {
      console.log('📝 La tabla posts ya existe, verificando estructura...');
      
      // Verificar si la columna published existe
      const publishedExists = await sql`
        SELECT EXISTS (
          SELECT FROM information_schema.columns 
          WHERE table_schema = 'public' 
          AND table_name = 'posts' 
          AND column_name = 'published'
        )
      `;
      
      if (!publishedExists.rows[0].exists) {
        console.log('➕ Agregando columna published...');
        await sql`ALTER TABLE posts ADD COLUMN published BOOLEAN DEFAULT true`;
      }
      
      // Verificar si la columna status existe
      const statusExists = await sql`
        SELECT EXISTS (
          SELECT FROM information_schema.columns 
          WHERE table_schema = 'public' 
          AND table_name = 'posts' 
          AND column_name = 'status'
        )
      `;
      
      if (!statusExists.rows[0].exists) {
        console.log('➕ Agregando columna status...');
        await sql`ALTER TABLE posts ADD COLUMN status VARCHAR(20) DEFAULT 'published'`;
      }
      
      // Verificar si la columna author existe
      const authorExists = await sql`
        SELECT EXISTS (
          SELECT FROM information_schema.columns 
          WHERE table_schema = 'public' 
          AND table_name = 'posts' 
          AND column_name = 'author'
        )
      `;
      
      if (!authorExists.rows[0].exists) {
        console.log('➕ Agregando columna author...');
        await sql`ALTER TABLE posts ADD COLUMN author VARCHAR(100) DEFAULT 'Mario Verdú'`;
      }
      
      // Verificar si la columna views existe
      const viewsExists = await sql`
        SELECT EXISTS (
          SELECT FROM information_schema.columns 
          WHERE table_schema = 'public' 
          AND table_name = 'posts' 
          AND column_name = 'views'
        )
      `;
      
      if (!viewsExists.rows[0].exists) {
        console.log('➕ Agregando columna views...');
        await sql`ALTER TABLE posts ADD COLUMN views INTEGER DEFAULT 0`;
      }
      
      // Verificar si la columna category existe
      const categoryExists = await sql`
        SELECT EXISTS (
          SELECT FROM information_schema.columns 
          WHERE table_schema = 'public' 
          AND table_name = 'posts' 
          AND column_name = 'category'
        )
      `;
      
      if (!categoryExists.rows[0].exists) {
        console.log('➕ Agregando columna category...');
        await sql`ALTER TABLE posts ADD COLUMN category VARCHAR(100)`;
      }
      
      // Verificar si la columna tags existe
      const tagsExists = await sql`
        SELECT EXISTS (
          SELECT FROM information_schema.columns 
          WHERE table_schema = 'public' 
          AND table_name = 'posts' 
          AND column_name = 'tags'
        )
      `;
      
      if (!tagsExists.rows[0].exists) {
        console.log('➕ Agregando columna tags...');
        await sql`ALTER TABLE posts ADD COLUMN tags TEXT[]`;
      }
      
    } else {
      // Crear tabla de posts
      console.log('📝 Creando tabla posts...');
      await sql`
        CREATE TABLE posts (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          slug VARCHAR(255) NOT NULL UNIQUE,
          content TEXT NOT NULL,
          excerpt TEXT,
          featured_image TEXT,
          published BOOLEAN DEFAULT true,
          status VARCHAR(20) DEFAULT 'published',
          author VARCHAR(100) DEFAULT 'Mario Verdú',
          views INTEGER DEFAULT 0,
          category VARCHAR(100),
          tags TEXT[],
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `;
    }
    
    // Crear tabla de tags si no existe
    const tagsTableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'tags'
      )
    `;
    
    if (!tagsTableExists.rows[0].exists) {
      console.log('🏷️ Creando tabla tags...');
      await sql`
        CREATE TABLE tags (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          slug VARCHAR(100) NOT NULL UNIQUE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `;
    }
    
    // Crear tabla de relación entre posts y tags si no existe
    const postTagsTableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'post_tags'
      )
    `;
    
    if (!postTagsTableExists.rows[0].exists) {
      console.log('🔗 Creando tabla post_tags...');
      await sql`
        CREATE TABLE post_tags (
          post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
          tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
          PRIMARY KEY (post_id, tag_id)
        )
      `;
    }
    
    // Crear índices si no existen
    console.log('📊 Verificando índices...');
    await sql`CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug)`;
    
    // Insertar datos de ejemplo
    console.log('📝 Insertando posts de ejemplo...');
    await sql`
      INSERT INTO posts (title, slug, content, excerpt, featured_image, status, author, views, category, tags) 
      VALUES 
        ('Diseño de interfaces modernas con Tailwind CSS', 'diseno-interfaces-tailwind', '<p>Tailwind CSS ha revolucionado la forma en que construimos interfaces de usuario. Con su enfoque utility-first, podemos crear diseños complejos y responsivos sin salir de nuestro HTML.</p><p>En este post exploramos las mejores prácticas y técnicas avanzadas para crear interfaces modernas y atractivas.</p>', 'Explorando las mejores prácticas para crear interfaces modernas con Tailwind CSS', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 'published', 'Mario Verdú', 1250, 'Diseño', ARRAY['Diseño', 'CSS', 'Tailwind'])
      ON CONFLICT (slug) DO NOTHING
    `;
    
    await sql`
      INSERT INTO posts (title, slug, content, excerpt, featured_image, status, author, views, category, tags) 
      VALUES 
        ('UX Research: Métodos y técnicas esenciales', 'ux-research-metodos', '<p>La investigación de usuarios es fundamental para crear productos que realmente satisfagan las necesidades de los usuarios.</p><p>En esta guía completa exploramos las metodologías más efectivas y cómo aplicarlas en proyectos reales.</p>', 'Guía completa sobre investigación de usuarios y metodologías UX', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 'draft', 'Mario Verdú', 0, 'UX', ARRAY['UX', 'Research', 'Metodología'])
      ON CONFLICT (slug) DO NOTHING
    `;
    
    await sql`
      INSERT INTO posts (title, slug, content, excerpt, featured_image, status, author, views, category, tags) 
      VALUES 
        ('Optimización de conversión en e-commerce', 'optimizacion-conversion-ecommerce', '<p>Mejorar las tasas de conversión es crucial para el éxito de cualquier tienda online.</p><p>Compartimos estrategias probadas y técnicas avanzadas para optimizar el funnel de conversión.</p>', 'Estrategias para mejorar las tasas de conversión en tiendas online', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80', 'scheduled', 'Mario Verdú', 0, 'E-commerce', ARRAY['E-commerce', 'Conversión', 'Optimización'])
      ON CONFLICT (slug) DO NOTHING
    `;
    
    // Insertar tags de ejemplo
    console.log('🏷️ Insertando tags de ejemplo...');
    const tags = [
      ['Diseño', 'diseno'],
      ['CSS', 'css'],
      ['Tailwind', 'tailwind'],
      ['UX', 'ux'],
      ['Research', 'research'],
      ['Metodología', 'metodologia'],
      ['E-commerce', 'ecommerce'],
      ['Conversión', 'conversion'],
      ['Optimización', 'optimizacion']
    ];
    
    for (const [name, slug] of tags) {
      await sql`
        INSERT INTO tags (name, slug) 
        VALUES (${name}, ${slug})
        ON CONFLICT (slug) DO NOTHING
      `;
    }
    
    console.log('✅ Base de datos de posts configurada exitosamente');
    
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
    
    // Verificar que hay tags
    const tagsCount = await sql`SELECT COUNT(*) as count FROM tags`;
    console.log(`🏷️ Tags en la base de datos: ${tagsCount.rows[0].count}`);
    
  } catch (error) {
    console.error('❌ Error configurando la base de datos:', error);
    process.exit(1);
  }
}

setupPostsDatabase();
