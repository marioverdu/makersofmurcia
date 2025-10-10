import type { ChatFlow } from "../types"

export const contactFlow: ChatFlow = {
  initial: `📱 **¡Perfecto!** Puedes contactar con Mario Verdú a través de las siguientes opciones:`,
  quickReplies: [
    { id: "email", text: "Email", action: "email" },
    { id: "instagram", text: "Instagram", action: "instagram" },
    { id: "twitter", text: "Twitter", action: "twitter" },
  ],
}
