-- Crear tabla de reuniones/meetings
CREATE TABLE IF NOT EXISTS meetings (
  id SERIAL PRIMARY KEY,
  meeting_id VARCHAR(255) UNIQUE NOT NULL,
  proposal_id VARCHAR(255),
  user_id VARCHAR(255) NOT NULL,
  day_name VARCHAR(20) NOT NULL, -- monday, tuesday, etc.
  time_slot VARCHAR(10) NOT NULL, -- 10:00, 11:00, etc.
  meeting_date DATE, -- fecha calculada automáticamente
  status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, confirmed, cancelled
  notes TEXT,
  conversation_data JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_meetings_proposal_id ON meetings(proposal_id);
CREATE INDEX IF NOT EXISTS idx_meetings_user_id ON meetings(user_id);
CREATE INDEX IF NOT EXISTS idx_meetings_date ON meetings(meeting_date);
CREATE INDEX IF NOT EXISTS idx_meetings_status ON meetings(status);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_meetings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_meetings_updated_at
  BEFORE UPDATE ON meetings
  FOR EACH ROW
  EXECUTE FUNCTION update_meetings_updated_at();

-- Función para calcular la fecha de la reunión basada en el día de la semana
CREATE OR REPLACE FUNCTION calculate_meeting_date(day_name TEXT)
RETURNS DATE AS $$
DECLARE
  target_day INTEGER;
  current_day INTEGER;
  days_ahead INTEGER;
  result_date DATE;
BEGIN
  -- Convertir nombre del día a número (0=domingo, 1=lunes, etc.)
  CASE LOWER(day_name)
    WHEN 'sunday' THEN target_day := 0;
    WHEN 'monday' THEN target_day := 1;
    WHEN 'tuesday' THEN target_day := 2;
    WHEN 'wednesday' THEN target_day := 3;
    WHEN 'thursday' THEN target_day := 4;
    WHEN 'friday' THEN target_day := 5;
    WHEN 'saturday' THEN target_day := 6;
    ELSE target_day := 1; -- Default a lunes
  END CASE;

  -- Obtener el día actual de la semana
  current_day := EXTRACT(DOW FROM CURRENT_DATE);
  
  -- Calcular días hasta el próximo día objetivo
  days_ahead := target_day - current_day;
  
  -- Si el día ya pasó esta semana, ir a la próxima semana
  IF days_ahead <= 0 THEN
    days_ahead := days_ahead + 7;
  END IF;
  
  -- Calcular la fecha resultante
  result_date := CURRENT_DATE + days_ahead;
  
  RETURN result_date;
END;
$$ LANGUAGE plpgsql;
