import type { ChatFlow } from "../types"

// Este archivo se mantiene para compatibilidad, pero las traducciones se manejan en el hook
export const initialMessageFlow: ChatFlow = {
  initial: `👋 ¡Hola! Soy el asistente virtual de Mario Verdú. ¿En qué puedo ayudarte hoy?`,
  quickReplies: [
    { id: "hablarConMario", text: "Hablar con Mario", action: "hablarConMario" },
    { id: "explorarServiciosV2", text: "Explorar servicios v2", action: "explorar-servicios-v2" },
  ],
}
