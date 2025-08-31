// Agregar estas constantes al archivo:

export const PRICING_KEYWORDS = [
  "pricing",
  "service_uxui",
  "service_web",
  "service_visual",
  "project_rediseno",
  "project_producto_nuevo",
  "obligado_si",
  "obligado_no",
  "product_web",
  "product_app",
  "product_dashboard",
  "product_ecommerce",
  "web_integracion",
  "web_producto_nuevo",
  "screens_1",
  "screens_3",
  "screens_4_8",
  "screens_10",
  "screens_15",
  "budget_hourly",
  "budget_contract",
  "budget_fixed",
  "payment_cash",
  "payment_crypto",
  "payment_bizum",
  "payment_transfer",
  "payment_gateway",
  "propose_project",
]

export const PRICING_PLANS = {
  TARIFA_DIARIA: { screens: 1, price: 136.4, name: "Tarifa Diaria" },
  HOVERBOARD: { screens: 3, price: 409.2, name: "Hoverboard" },
  JETPACK: { screens: 6, price: 720.0, name: "Jetpack" },
  FENIX: { screens: 10, price: 1711.2, name: "Fénix" },
  NABUCODONOSOR: { screens: 15, price: 2300.0, name: "Nabucodonosor" },
}

export const CHAT_CONFIG = {
  NOTIFICATION_DELAY: {
    development: 1000, // 1 second for dev
    production: 30 * 60 * 1000, // 30 minutes for prod
  },
  RESTRICTION_HOURS: 24, // 24 hours
}
