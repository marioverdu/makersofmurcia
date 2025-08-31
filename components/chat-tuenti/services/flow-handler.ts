// components/chat-tuenti/services/flow-handler.ts

class FlowHandler {
  handleAction(action: string, context: any) {
    switch (action) {
      case "pricing":
        return this.handlePricingFlow(action, context)
      default:
        return null
    }
  }

  private handlePricingFlow(action: string, context: any) {
    switch (action) {
      case "pricing":
        return {
          content: "¿Qué servicio necesitas?",
          type: "quick-reply",
          options: [
            { id: "service_uxui", text: "Diseño (UX/UI y Motion)", action: "service_uxui" },
            { id: "service_web", text: "Diseño y código (Web o app)", action: "service_web" },
            { id: "service_visual", text: "Diseño visual", action: "service_visual" },
          ],
        }

      case "service_uxui":
        return {
          content: "¿Qué tipo de proyecto necesitas?",
          type: "quick-reply",
          options: [
            { id: "project_rediseno", text: "Rediseño", action: "project_rediseno" },
            { id: "project_producto_nuevo", text: "Producto desde cero", action: "project_producto_nuevo" },
          ],
        }

      case "service_web":
        return {
          content: "Este servicio está orientado a desarrolladores",
          type: "quick-reply",
          options: [
            { id: "web_integracion", text: "Integración de Diseño UX/UI", action: "web_integracion" },
            { id: "web_producto_nuevo", text: "Producto desde cero", action: "web_producto_nuevo" },
          ],
        }

      case "service_visual":
        return {
          content: "¿Estás obligado en mantener tu sistema de desarrollo actual?",
          type: "quick-reply",
          options: [
            { id: "obligado_si", text: "Sí, estoy obligado", action: "obligado_si" },
            { id: "obligado_no", text: "No estoy obligado", action: "obligado_no" },
          ],
        }

      case "project_rediseno":
      case "project_producto_nuevo":
      case "obligado_si":
      case "obligado_no":
        return {
          content: "¿Qué tipo de producto?",
          type: "quick-reply",
          options: [
            { id: "product_web", text: "Web", action: "product_web" },
            { id: "product_app", text: "App", action: "product_app" },
            { id: "product_dashboard", text: "Dashboard", action: "product_dashboard" },
            { id: "product_ecommerce", text: "E-commerce", action: "product_ecommerce" },
          ],
        }

      case "web_integracion":
      case "web_producto_nuevo":
      case "product_web":
      case "product_app":
      case "product_dashboard":
      case "product_ecommerce":
        return {
          content: "¿Cuántas pantallas estimas que necesitas?",
          type: "quick-reply",
          options: [
            { id: "screens_1", text: "1 pantalla", action: "screens_1" },
            { id: "screens_3", text: "3 pantallas", action: "screens_3" },
            { id: "screens_4_8", text: "4-8 pantallas", action: "screens_4_8" },
            { id: "screens_10", text: "10 pantallas", action: "screens_10" },
            { id: "screens_15", text: "15+ pantallas", action: "screens_15" },
          ],
        }

      case "screens_1":
      case "screens_3":
      case "screens_4_8":
      case "screens_10":
      case "screens_15":
        return {
          content: "¿Cuáles son tus posibilidades presupuestarias?",
          type: "quick-reply",
          options: [
            { id: "budget_hourly", text: "Por paquete de horas", action: "budget_hourly" },
            { id: "budget_contract", text: "Contrato en plantilla", action: "budget_contract" },
            { id: "budget_fixed", text: "Precio cerrado", action: "budget_fixed" },
          ],
        }

      case "budget_hourly":
      case "budget_contract":
      case "budget_fixed":
        return {
          content: "¿Qué métodos de pago prefieres?",
          type: "quick-reply",
          options: [
            { id: "payment_cash", text: "Efectivo", action: "payment_cash" },
            { id: "payment_crypto", text: "Cripto", action: "payment_crypto" },
            { id: "payment_bizum", text: "Bizum", action: "payment_bizum" },
            { id: "payment_transfer", text: "Transferencia bancaria", action: "payment_transfer" },
            { id: "payment_gateway", text: "Pasarela de pago", action: "payment_gateway" },
          ],
        }

      case "payment_cash":
      case "payment_crypto":
      case "payment_bizum":
      case "payment_transfer":
      case "payment_gateway":
        // Calcular precio basado en el contexto
        const price = this.calculatePrice(context)
        const planName = this.getPlanName(context)

        return {
          content: `Basado en tus necesidades, recomendamos el Plan ${planName}: ${price}€`,
          type: "quick-reply",
          options: [{ id: "propose_project", text: "Proponer proyecto", action: "propose_project" }],
        }

      case "propose_project":
        return {
          content:
            "Proyecto enviado para revisión. Te notificaremos cuando sea aprobado para continuar con la reserva.",
          type: "text",
        }

      default:
        return null
    }
  }

  private calculatePrice(context: any): number {
    // Lógica de cálculo de precios
    if (context.screens === 1) return 136.4
    if (context.screens === 3) return 409.2
    if (context.screens >= 4 && context.screens <= 8) return 720.0
    if (context.screens === 10) return 1711.2
    if (context.screens >= 15) return 2300.0
    return 136.4
  }

  private getPlanName(context: any): string {
    if (context.screens === 1) return "Tarifa Diaria"
    if (context.screens === 3) return "Hoverboard"
    if (context.screens >= 4 && context.screens <= 8) return "Jetpack"
    if (context.screens === 10) return "Fénix"
    if (context.screens >= 15) return "Nabucodonosor"
    return "Personalizado"
  }
}
