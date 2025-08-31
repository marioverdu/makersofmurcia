import type { ChatFlow } from "../types"

export const initialMessageFlow: ChatFlow = {
  initial: `👋 ¡Hola! Soy el asistente virtual de Mario Verdú. ¿En qué puedo ayudarte hoy?`,
  quickReplies: [
    { id: "hablarConMario", text: "Hablar con Mario", action: "hablarConMario" },
    { id: "explorarServiciosV2", text: "Explorar servicios v2", action: "explorar-servicios-v2" },
  ],
}
