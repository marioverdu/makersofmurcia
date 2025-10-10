-- Script para crear la tabla de rutas administrables
-- Ejecutar: psql $DATABASE_URL -f scripts/init-routes-table.sql

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
);

-- Índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_route_management_path ON route_management(path);
CREATE INDEX IF NOT EXISTS idx_route_management_active ON route_management(is_active);
CREATE INDEX IF NOT EXISTS idx_route_management_indexable ON route_management(is_indexable);
CREATE INDEX IF NOT EXISTS idx_route_management_category ON route_management(category);

-- Tabla para logs de acceso
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
);

-- Índices para logs
CREATE INDEX IF NOT EXISTS idx_route_access_logs_path ON route_access_logs(route_path);
CREATE INDEX IF NOT EXISTS idx_route_access_logs_accessed_at ON route_access_logs(accessed_at);
CREATE INDEX IF NOT EXISTS idx_route_access_logs_allowed ON route_access_logs(access_allowed);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_route_management_updated_at ON route_management;
CREATE TRIGGER update_route_management_updated_at
    BEFORE UPDATE ON route_management
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insertar rutas por defecto
INSERT INTO route_management (path, is_active, is_indexable, category, priority, seo_title, seo_description) VALUES
('/', true, true, 'main', 1, 'Inicio - Mario Verdú', 'Página principal de Mario Verdú, desarrollador web y consultor tecnológico'),
('/posts', true, true, 'content', 2, 'Blog - Mario Verdú', 'Artículos y publicaciones sobre desarrollo web y tecnología'),
('/work-experience', true, true, 'content', 3, 'Experiencia Laboral - Mario Verdú', 'Portfolio y experiencia profesional de Mario Verdú'),
('/contact', true, true, 'contact', 4, 'Contacto - Mario Verdú', 'Formulario de contacto y información de contacto'),
('/admin', false, false, 'admin', 0, 'Admin Panel', 'Panel de administración'),
('/admin/routes', false, false, 'admin', 0, 'Gestión de Rutas', 'Panel de gestión de rutas'),
('/styleguide', true, false, 'development', 0, 'Styleguide', 'Guía de estilos del proyecto')
ON CONFLICT (path) DO UPDATE SET
    updated_at = CURRENT_TIMESTAMP,
    modified_by = 'system';

-- Crear vista para estadísticas
CREATE OR REPLACE VIEW route_stats AS
SELECT 
    COUNT(*) as total_routes,
    COUNT(*) FILTER (WHERE is_active = true) as active_routes,
    COUNT(*) FILTER (WHERE is_active = false) as inactive_routes,
    COUNT(*) FILTER (WHERE is_indexable = true) as indexable_routes,
    COUNT(*) FILTER (WHERE is_indexable = false) as non_indexable_routes,
    COUNT(*) FILTER (WHERE sitemap_include = true) as sitemap_routes,
    COUNT(*) FILTER (WHERE robots_allow = true) as robots_allowed_routes,
    MAX(updated_at) as last_updated
FROM route_management;

-- Comentarios para documentación
COMMENT ON TABLE route_management IS 'Tabla principal para gestión de rutas administrables';
COMMENT ON COLUMN route_management.is_active IS 'Controla si la ruta está activa y accesible';
COMMENT ON COLUMN route_management.is_indexable IS 'Controla si la ruta debe ser indexada por motores de búsqueda';
COMMENT ON COLUMN route_management.robots_allow IS 'Controla si los robots pueden acceder a la ruta';
COMMENT ON COLUMN route_management.sitemap_include IS 'Controla si la ruta debe incluirse en el sitemap';
COMMENT ON COLUMN route_management.priority IS 'Prioridad para ordenamiento en sitemaps y navegación';

COMMENT ON TABLE route_access_logs IS 'Logs de acceso a rutas para auditoría y análisis';
COMMENT ON VIEW route_stats IS 'Vista con estadísticas agregadas de rutas';

-- Verificar que las tablas se crearon correctamente
SELECT 'Tabla route_management creada' as status WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'route_management');
SELECT 'Tabla route_access_logs creada' as status WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'route_access_logs');
SELECT 'Vista route_stats creada' as status WHERE EXISTS (SELECT 1 FROM information_schema.views WHERE view_name = 'route_stats');
