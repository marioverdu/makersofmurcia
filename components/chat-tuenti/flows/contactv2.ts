import type { ChatFlow } from "../types"

export const contactV2Flow: ChatFlow = {
  initial: "Hola, puedes dejar tu consulta en este chat o contactar de las siguientes formas:",
  quickReplies: [
    { id: "instagram", text: "Contactar por Instagram", action: "instagram" },
    { id: "twitter", text: "Contactar por X.com", action: "twitter" },
    { id: "email", text: "Contactar por correo", action: "email" },
  ],
}
