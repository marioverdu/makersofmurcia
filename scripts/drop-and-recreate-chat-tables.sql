-- Eliminar las tablas si existen para asegurar una recreación limpia con los tipos de datos correctos
DROP TABLE IF EXISTS chat_messages;
DROP TABLE IF EXISTS chat_conversations;

-- Crear la tabla chat_conversations
CREATE TABLE chat_conversations (
    id TEXT PRIMARY KEY DEFAULT (('conv_' || EXTRACT(EPOCH FROM NOW())::bigint) || '_' || SUBSTR(MD5(RANDOM()::TEXT), 0, 8)),
    user_id TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla chat_messages
CREATE TABLE chat_messages (
    id TEXT PRIMARY KEY DEFAULT (('msg_' || EXTRACT(EPOCH FROM NOW())::bigint) || '_' || SUBSTR(MD5(RANDOM()::TEXT), 0, 8)),
    conversation_id TEXT NOT NULL,
    content TEXT NOT NULL,
    sender TEXT NOT NULL, -- 'user', 'bot', 'system'
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    type TEXT DEFAULT 'text', -- 'text', 'image', 'action', etc.
    FOREIGN KEY (conversation_id) REFERENCES chat_conversations(id) ON DELETE CASCADE
);

-- Opcional: Crear índices para mejorar el rendimiento de las consultas
CREATE INDEX idx_chat_conversations_user_id ON chat_conversations(user_id);
CREATE INDEX idx_chat_messages_conversation_id ON chat_messages(conversation_id);
CREATE INDEX idx_chat_messages_timestamp ON chat_messages(timestamp);
