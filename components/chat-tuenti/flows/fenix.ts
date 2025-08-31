import type { ChatFlow } from "../types"

export const fenixFlow: ChatFlow = {
  initial: `**🤝 Plan Fénix – Desarrollo UI Integral**

Solución completa para proyectos ambiciosos que requieren profundidad y escala:

- **Duración:** +6 meses de desarrollo continuo
- **Aproximadamente 90 pantallas** con sistema de diseño coherente
- **Stack tecnológico:** Next.js con Framer Motion
- **Incluye:**
  - Moodboard y dirección creativa
  - Handbook de diseño completo
  - Investigación UX detallada
  - Reuniones de seguimiento periódicas
  - Código fuente optimizado y documentado
  - Soporte técnico durante todo el proyecto`,
  quickReplies: [
    { id: "pricing", text: "Explorar otros planes", action: "pricing" },
    { id: "contact", text: "Solicitar este plan", action: "contact" },
  ],
}
