import type { ChatFlow } from "../types"

export const jetpackFlow: ChatFlow = {
  initial: `**🚀 Plan Jetpack – Desarrollo UI Avanzado**

Ideal para proyectos que requieren mayor detalle y refinamiento:

- **Tiempo de entrega:** 1 semana
- **5 pantallas completas** con interacciones avanzadas
- **Stack tecnológico:** Next.js con Framer Motion
- **Incluye:**
  - Optimización UX/UI profesional
  - Animaciones personalizadas
  - Código fuente optimizado y documentado
  - Soporte técnico por 2 semanas`,
  quickReplies: [
    { id: "pricing", text: "Explorar otros planes", action: "pricing" },
    { id: "contact", text: "Solicitar este plan", action: "contact" },
  ],
}
