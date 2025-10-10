import type { ChatFlow } from "../types"

export const webLikeThisFlow: ChatFlow = {
  initial:
    "🎯 **¡Excelente elección!** Podemos crear una web similar pero personalizada para tus necesidades específicas. El diseño que estás viendo ahora mismo es solo un ejemplo de lo que podemos lograr juntos.\n\n¿Te gustaría conocer qué plan se adaptaría mejor a tu proyecto?",
  quickReplies: [
    { id: "pricing", text: "Ver planes disponibles", action: "pricing" },
    { id: "contact", text: "Contactar directamente", action: "contact" },
    { id: "main", text: "Volver al inicio", action: "main" },
  ],
}
