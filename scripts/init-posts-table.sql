-- Crear tabla de posts
CREATE TABLE IF NOT EXISTS posts (
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
);

-- Crear tabla de tags
CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de relación entre posts y tags
CREATE TABLE IF NOT EXISTS post_tags (
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);

-- Insertar datos de ejemplo para testing
INSERT INTO posts (title, slug, content, excerpt, featured_image, status, author, views, category, tags) 
VALUES 
    ('Diseño de interfaces modernas con Tailwind CSS', 'diseno-interfaces-tailwind', '<p>Tailwind CSS ha revolucionado la forma en que construimos interfaces de usuario. Con su enfoque utility-first, podemos crear diseños complejos y responsivos sin salir de nuestro HTML.</p><p>En este post exploramos las mejores prácticas y técnicas avanzadas para crear interfaces modernas y atractivas.</p>', 'Explorando las mejores prácticas para crear interfaces modernas con Tailwind CSS', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 'published', 'Mario Verdú', 1250, 'Diseño', ARRAY['Diseño', 'CSS', 'Tailwind']),
    ('UX Research: Métodos y técnicas esenciales', 'ux-research-metodos', '<p>La investigación de usuarios es fundamental para crear productos que realmente satisfagan las necesidades de los usuarios.</p><p>En esta guía completa exploramos las metodologías más efectivas y cómo aplicarlas en proyectos reales.</p>', 'Guía completa sobre investigación de usuarios y metodologías UX', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 'draft', 'Mario Verdú', 0, 'UX', ARRAY['UX', 'Research', 'Metodología']),
    ('Optimización de conversión en e-commerce', 'optimizacion-conversion-ecommerce', '<p>Mejorar las tasas de conversión es crucial para el éxito de cualquier tienda online.</p><p>Compartimos estrategias probadas y técnicas avanzadas para optimizar el funnel de conversión.</p>', 'Estrategias para mejorar las tasas de conversión en tiendas online', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80', 'scheduled', 'Mario Verdú', 0, 'E-commerce', ARRAY['E-commerce', 'Conversión', 'Optimización'])
ON CONFLICT (slug) DO NOTHING;

-- Insertar tags de ejemplo
INSERT INTO tags (name, slug) 
VALUES 
    ('Diseño', 'diseno'),
    ('CSS', 'css'),
    ('Tailwind', 'tailwind'),
    ('UX', 'ux'),
    ('Research', 'research'),
    ('Metodología', 'metodologia'),
    ('E-commerce', 'ecommerce'),
    ('Conversión', 'conversion'),
    ('Optimización', 'optimizacion')
ON CONFLICT (slug) DO NOTHING; 