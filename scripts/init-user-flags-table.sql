CREATE TABLE IF NOT EXISTS user_flags (
    id SERIAL PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT NOT NULL,
    flag_type VARCHAR(50) NOT NULL CHECK (flag_type IN ('pesado', 'rechazado_reincidente')),
    flag_count INTEGER DEFAULT 1,
    first_occurrence TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_occurrence TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Unique constraint to prevent duplicate flags for same user and type
    UNIQUE(ip_address, user_agent, flag_type)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_flags_user ON user_flags(ip_address, user_agent);
CREATE INDEX IF NOT EXISTS idx_user_flags_active ON user_flags(is_active, expires_at);
CREATE INDEX IF NOT EXISTS idx_user_flags_type ON user_flags(flag_type);
CREATE INDEX IF NOT EXISTS idx_user_flags_expires ON user_flags(expires_at);

-- Add some comments
COMMENT ON TABLE user_flags IS 'Stores user flags for tracking problematic behavior';
COMMENT ON COLUMN user_flags.flag_type IS 'Type of flag: pesado (too many proposals) or rechazado_reincidente (too many rejections)';
COMMENT ON COLUMN user_flags.expires_at IS 'When this flag expires (2 weeks from creation/update)';
