import type { ChatFlow } from "../types"

export const nabucodonosorFlow: ChatFlow = {
  initial: `**🎟️ Plan Nabucodonosor – Desarrollo UI Estratégico**

La solución definitiva para proyectos a largo plazo que requieren excelencia continua:

- **Duración:** Compromiso mínimo de 1 año
- **Pantallas ilimitadas** según las necesidades del proyecto
- **Stack tecnológico:** Next.js con Framer Motion
- **Incluye:**
  - Investigación continua (UX, UI, Visual, Motion, 3D)
  - Desarrollo y mantenimiento de un Design System escalable
  - Documentación técnica exhaustiva
  - Asesoramiento estratégico de diseño
  - 90+ pantallas garantizadas, con posibilidad ilimitada
  - Iteraciones y mejoras continuas sin límite
  - Reuniones semanales de seguimiento
  - Soporte técnico prioritario 24/7`,
  quickReplies: [
    { id: "pricing", text: "Explorar otros planes", action: "pricing" },
    { id: "contact", text: "Solicitar este plan", action: "contact" },
  ],
}
