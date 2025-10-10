-- Crear tabla de propuestas
CREATE TABLE IF NOT EXISTS proposals (
    id SERIAL PRIMARY KEY,
    proposal_id VARCHAR(255) UNIQUE NOT NULL,
    service VARCHAR(100) NOT NULL,
    project_type VARCHAR(100),
    product_type VARCHAR(100),
    screens INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    plan_name VARCHAR(100) NOT NULL,
    payment VARCHAR(50),
    budget VARCHAR(50),
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT,
    url TEXT,
    conversation_data JSONB
);

-- Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_proposals_status ON proposals(status);
CREATE INDEX IF NOT EXISTS idx_proposals_created_at ON proposals(created_at);
CREATE INDEX IF NOT EXISTS idx_proposals_proposal_id ON proposals(proposal_id);

-- Insertar datos de ejemplo para testing
INSERT INTO proposals (proposal_id, service, project_type, product_type, screens, price, plan_name, payment, budget, status, ip_address, user_agent, url) 
VALUES 
    ('proposal_demo_1', 'uxui', 'rediseno', 'web', 3, 409.20, 'Hoverboard', 'transfer', 'fixed', 'pending', '192.168.1.1', 'Mozilla/5.0 (Demo)', 'https://example.com'),
    ('proposal_demo_2', 'web', 'producto_nuevo', 'ecommerce', 10, 1711.20, 'Fénix', 'bizum', 'hourly', 'pending', '192.168.1.2', 'Mozilla/5.0 (Demo)', 'https://example.com')
ON CONFLICT (proposal_id) DO NOTHING;
