-- Migración para agregar soporte de traducciones a posts
-- Ejecutar este script para actualizar la tabla posts

-- 1. Agregar columnas de traducción
ALTER TABLE posts ADD COLUMN IF NOT EXISTS title_es TEXT;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS content_es TEXT;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS content_en TEXT;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS excerpt_es TEXT;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS excerpt_en TEXT;

-- 2. Migrar datos existentes al español como idioma base
UPDATE posts SET 
  title_es = title,
  content_es = content,
  excerpt_es = excerpt
WHERE title_es IS NULL;

-- 3. Crear índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_posts_title_es ON posts(title_es);
CREATE INDEX IF NOT EXISTS idx_posts_title_en ON posts(title_en);

-- 4. Comentarios para documentación
COMMENT ON COLUMN posts.title_es IS 'Título del post en español';
COMMENT ON COLUMN posts.title_en IS 'Título del post en inglés';
COMMENT ON COLUMN posts.content_es IS 'Contenido del post en español';
COMMENT ON COLUMN posts.content_en IS 'Contenido del post en inglés';
COMMENT ON COLUMN posts.excerpt_es IS 'Extracto del post en español';
COMMENT ON COLUMN posts.excerpt_en IS 'Extracto del post en inglés';
