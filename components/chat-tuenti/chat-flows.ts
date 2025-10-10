import type { ChatFlow } from "./types"

// Este archivo se mantiene para compatibilidad, pero las traducciones se manejan en el hook
export const chatFlows: Record<string, ChatFlow> = {
  "initial-message": {
    initial: "👋 ¡Hola! Soy el asistente virtual de Mario Verdú. ¿En qué puedo ayudarte hoy?",
    quickReplies: [
      { id: "webLikeThis", text: "Quiero una web así", action: "webLikeThis" },
    ],
  },
  contact: {
    initial: "¡Hola! Puedes contactar con Mario Verdú a través de las siguientes opciones:",
    quickReplies: [
      { id: "email", text: "Email", action: "email" },
      { id: "instagram", text: "Instagram", action: "instagram" },
      { id: "twitter", text: "Twitter", action: "twitter" },
    ],
  },
}
