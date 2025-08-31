import type { ChatFlow } from "../types"

export const hoverboardFlow: ChatFlow = {
  initial: `**⚡ Plan Hoverboard – Desarrollo UI Express**

Perfecto para proyectos que necesitan resultados rápidos y efectivos:

- **3 pantallas desarrolladas** con diseño profesional
- **Tiempo de entrega:** Solo 3 días
- **Stack tecnológico:** Next.js con Framer Motion
- **Incluye:**
  - Styleguide personalizado
  - Código fuente completo en formato .zip
  - Soporte técnico básico post-entrega`,
  quickReplies: [
    { id: "pricing", text: "Explorar otros planes", action: "pricing" },
    { id: "contact", text: "Solicitar este plan", action: "contact" },
  ],
}
