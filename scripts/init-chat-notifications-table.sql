-- Drop table if exists to recreate with correct structure
DROP TABLE IF EXISTS chat_notifications;

-- Create chat_notifications table
CREATE TABLE chat_notifications (
    id SERIAL PRIMARY KEY,
    notification_id TEXT DEFAULT 'notif_' || EXTRACT(EPOCH FROM NOW())::BIGINT || '_' || SUBSTRING(MD5(RANDOM()::TEXT), 1, 7) UNIQUE,
    proposal_id TEXT NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('approved', 'rejected')),
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_chat_notifications_proposal_id ON chat_notifications (proposal_id);
CREATE INDEX idx_chat_notifications_status ON chat_notifications (status);
CREATE INDEX idx_chat_notifications_read ON chat_notifications (read);
CREATE INDEX idx_chat_notifications_created_at ON chat_notifications (created_at);

-- Create function to update updated_at automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function before update
CREATE TRIGGER update_chat_notifications_updated_at
BEFORE UPDATE ON chat_notifications
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Insert some test data
INSERT INTO chat_notifications (proposal_id, status, message, read) VALUES
('proposal_1753348566962_lcoio8c', 'approved', '¡Excelente! Tu propuesta ha sido aprobada por Mario. Ahora puedes continuar con el siguiente paso.', false),
('test_proposal_123', 'approved', 'Test notification for debugging', false);

-- Verify the table was created correctly
SELECT 
    table_name, 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'chat_notifications' 
ORDER BY ordinal_position;

-- Show sample data
SELECT * FROM chat_notifications ORDER BY created_at DESC LIMIT 5;
