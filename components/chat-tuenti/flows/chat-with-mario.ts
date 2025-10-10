import type { ChatFlow } from "../types"

// Este archivo se mantiene para compatibilidad, pero las traducciones se manejan en el hook
export const chatWithMarioFlow: ChatFlow = {
  initial: "👨‍💻 ¡Hola! Soy Mario. Estoy aquí para responder tus preguntas personalmente. ¿En qué puedo ayudarte hoy?",
  quickReplies: [
    { id: "pricing", text: "Ver planes disponibles", action: "pricing" },
    { id: "main", text: "Volver al inicio", action: "main" },
  ],
}
