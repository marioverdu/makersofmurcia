-- Tabla para eventos de página
CREATE TABLE IF NOT EXISTS page_events (
    id SERIAL PRIMARY KEY,
    page_path VARCHAR(255) NOT NULL,
    user_agent TEXT,
    ip_address INET,
    referrer VARCHAR(500),
    session_id VARCHAR(255),
    user_id VARCHAR(255),
    event_type VARCHAR(50) DEFAULT 'pageview',
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla para métricas de usuarios
CREATE TABLE IF NOT EXISTS user_metrics (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    session_id VARCHAR(255),
    page_views INTEGER DEFAULT 0,
    time_spent INTEGER DEFAULT 0, -- en segundos
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla para métricas de rendimiento
CREATE TABLE IF NOT EXISTS performance_metrics (
    id SERIAL PRIMARY KEY,
    page_path VARCHAR(255) NOT NULL,
    load_time INTEGER, -- en milisegundos
    dom_content_loaded INTEGER,
    window_load INTEGER,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla para eventos personalizados
CREATE TABLE IF NOT EXISTS custom_events (
    id SERIAL PRIMARY KEY,
    event_name VARCHAR(100) NOT NULL,
    event_category VARCHAR(100),
    event_label VARCHAR(255),
    event_value INTEGER,
    page_path VARCHAR(255),
    user_id VARCHAR(255),
    session_id VARCHAR(255),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_page_events_created_at ON page_events(created_at);
CREATE INDEX IF NOT EXISTS idx_page_events_page_path ON page_events(page_path);
CREATE INDEX IF NOT EXISTS idx_page_events_user_id ON page_events(user_id);
CREATE INDEX IF NOT EXISTS idx_page_events_session_id ON page_events(session_id);

CREATE INDEX IF NOT EXISTS idx_user_metrics_user_id ON user_metrics(user_id);
CREATE INDEX IF NOT EXISTS idx_user_metrics_session_id ON user_metrics(session_id);
CREATE INDEX IF NOT EXISTS idx_user_metrics_created_at ON user_metrics(created_at);

CREATE INDEX IF NOT EXISTS idx_performance_metrics_page_path ON performance_metrics(page_path);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_created_at ON performance_metrics(created_at);

CREATE INDEX IF NOT EXISTS idx_custom_events_event_name ON custom_events(event_name);
CREATE INDEX IF NOT EXISTS idx_custom_events_created_at ON custom_events(created_at);
CREATE INDEX IF NOT EXISTS idx_custom_events_user_id ON custom_events(user_id);

-- Datos de ejemplo para testing
INSERT INTO page_events (page_path, user_agent, ip_address, referrer, session_id, user_id, event_type, metadata) VALUES
('/admin', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', '192.168.1.1', 'https://google.com', 'session_1', 'user_1', 'pageview', '{"device": "desktop", "browser": "chrome"}'),
('/posts', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15', '192.168.1.2', 'https://facebook.com', 'session_2', 'user_2', 'pageview', '{"device": "mobile", "browser": "safari"}'),
('/contact', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '192.168.1.3', 'https://twitter.com', 'session_3', 'user_3', 'pageview', '{"device": "desktop", "browser": "firefox"}'),
('/admin', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', '192.168.1.1', 'https://google.com', 'session_1', 'user_1', 'pageview', '{"device": "desktop", "browser": "chrome"}'),
('/posts/view/1', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15', '192.168.1.2', '/posts', 'session_2', 'user_2', 'pageview', '{"device": "mobile", "browser": "safari"}'),
('/price-estimator', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '192.168.1.4', 'https://google.com', 'session_4', 'user_4', 'pageview', '{"device": "desktop", "browser": "edge"}'),
('/admin/routes', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', '192.168.1.1', '/admin', 'session_1', 'user_1', 'pageview', '{"device": "desktop", "browser": "chrome"}'),
('/admin/booking', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', '192.168.1.1', '/admin', 'session_1', 'user_1', 'pageview', '{"device": "desktop", "browser": "chrome"}');

INSERT INTO user_metrics (user_id, session_id, page_views, time_spent, last_activity) VALUES
('user_1', 'session_1', 15, 1800, NOW() - INTERVAL '2 hours'),
('user_2', 'session_2', 8, 1200, NOW() - INTERVAL '1 hour'),
('user_3', 'session_3', 12, 2400, NOW() - INTERVAL '30 minutes'),
('user_4', 'session_4', 5, 600, NOW() - INTERVAL '15 minutes');

INSERT INTO performance_metrics (page_path, load_time, dom_content_loaded, window_load, user_agent) VALUES
('/admin', 1200, 800, 1500, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'),
('/posts', 800, 500, 1200, 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15'),
('/contact', 1500, 1000, 2000, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'),
('/price-estimator', 2000, 1200, 2500, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'),
('/admin/routes', 900, 600, 1100, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');

INSERT INTO custom_events (event_name, event_category, event_label, event_value, page_path, user_id, session_id, metadata) VALUES
('button_click', 'engagement', 'contact_button', 1, '/contact', 'user_3', 'session_3', '{"button_id": "contact_form_submit"}'),
('form_submit', 'conversion', 'price_estimator', 1, '/price-estimator', 'user_4', 'session_4', '{"form_type": "price_estimate"}'),
('scroll', 'engagement', 'page_scroll', 75, '/posts', 'user_2', 'session_2', '{"scroll_percentage": 75}'),
('download', 'engagement', 'cv_download', 1, '/work-experience', 'user_1', 'session_1', '{"file_type": "pdf"}'),
('video_play', 'engagement', 'intro_video', 1, '/', 'user_2', 'session_2', '{"video_duration": 120}');
