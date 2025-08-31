-- Crear tabla meetings si no existe
CREATE TABLE IF NOT EXISTS meetings (
    id SERIAL PRIMARY KEY,
    proposal_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    meeting_date DATE NOT NULL,
    meeting_time TIME NOT NULL,
    status VARCHAR(50) DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_meetings_proposal_id ON meetings(proposal_id);
CREATE INDEX IF NOT EXISTS idx_meetings_user_id ON meetings(user_id);
CREATE INDEX IF NOT EXISTS idx_meetings_date ON meetings(meeting_date);
CREATE INDEX IF NOT EXISTS idx_meetings_status ON meetings(status);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_meetings_updated_at ON meetings;
CREATE TRIGGER update_meetings_updated_at
    BEFORE UPDATE ON meetings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Función auxiliar para obtener reuniones por fecha
CREATE OR REPLACE FUNCTION get_meetings_by_date(target_date DATE)
RETURNS TABLE(
    id INTEGER,
    proposal_id VARCHAR(255),
    user_id VARCHAR(255),
    meeting_date DATE,
    meeting_time TIME,
    status VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT m.id, m.proposal_id, m.user_id, m.meeting_date, m.meeting_time, 
           m.status, m.notes, m.created_at, m.updated_at
    FROM meetings m
    WHERE m.meeting_date = target_date
    ORDER BY m.meeting_time;
END;
$$ LANGUAGE plpgsql;

-- Función auxiliar para obtener reuniones por mes
CREATE OR REPLACE FUNCTION get_meetings_by_month(target_year INTEGER, target_month INTEGER)
RETURNS TABLE(
    id INTEGER,
    proposal_id VARCHAR(255),
    user_id VARCHAR(255),
    meeting_date DATE,
    meeting_time TIME,
    status VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT m.id, m.proposal_id, m.user_id, m.meeting_date, m.meeting_time, 
           m.status, m.notes, m.created_at, m.updated_at
    FROM meetings m
    WHERE EXTRACT(YEAR FROM m.meeting_date) = target_year
    AND EXTRACT(MONTH FROM m.meeting_date) = target_month
    ORDER BY m.meeting_date, m.meeting_time;
END;
$$ LANGUAGE plpgsql;
