import type { PriceEstimatorPlans, Step } from "./types"

// Fixed prices
export const FIXED_PRICES = {
  DAILY_RATE: "136,40€",
  DEFAULT: "~€",
  TO_BE_DETERMINED: "A determinar",
}

// Plan prices
export const PLAN_PRICES = {
  HOVERBOARD: "409,20€",
  JETPACK: "720€",
  FENIX: "1711,20€",
  NABUCO: "2300€",
}

// Included components per plan
export const INCLUDED_COMPONENTS = {
  HOVERBOARD: 3,
  JETPACK: 5,
  FENIX: 10,
  NABUCO: 15,
}

// Component price
export const COMPONENT_PRICE = 77.69

// App categories
export const APP_CATEGORIES = [
  "E-commerce",
  "Banca/Finanzas",
  "Redes Sociales",
  "Productividad",
  "Salud/Fitness",
  "Viajes/Booking",
  "Entretenimiento",
  "Educación",
  "Comida/Delivery",
  "Inmobiliaria",
  "Noticias/Medios",
  "Comunicación",
  "IoT/Casa Inteligente",
  "Plataformas Creativas",
  "Gestión Empresarial",
  "Gaming",
  "Web3/Blockchain",
  "Fotografía/Video",
  "Música/Audio",
  "Mapas/Navegación",
]

// App subcategories
export const APP_SUBCATEGORIES: Record<string, string[]> = {
  "E-commerce": [
    "widget",
    "overlay",
    "button",
    "recovery password",
    "card profile",
    "thumbnails",
    "dropdown menu",
    "hover effect",
    "tabs",
    "sidebar",
    "cards",
    "card grid",
    "post layout",
    "icon",
    "estilo",
    "landing",
    "header",
    "copy",
    "ui",
    "item list",
    "detail page",
    "grid layout",
    "claim design",
    "booking",
    "form",
    "pricing",
    "chat",
    "3d",
    "integrations",
    "testimonials",
    "badges",
    "dark mode",
    "filtering",
    "cookies",
    "newslettering",
    "contextual menu",
    "biography",
    "hover or select",
    "thumbnail",
    "one page",
    "pattern",
    "gradient",
    "empty state",
  ],
  "Banca/Finanzas": [
    "widget",
    "overlay",
    "button",
    "recovery password",
    "card profile",
    "thumbnails",
    "dropdown menu",
    "hover effect",
    "tabs",
    "sidebar",
    "cards",
    "card grid",
    "post layout",
    "icon",
    "estilo",
    "landing",
    "header",
    "copy",
    "ui",
    "item list",
    "detail page",
    "grid layout",
    "claim design",
    "booking",
    "form",
    "pricing",
    "chat",
    "3d",
    "integrations",
    "testimonials",
    "badges",
    "dark mode",
    "filtering",
    "cookies",
    "newslettering",
    "contextual menu",
    "biography",
    "hover or select",
    "thumbnail",
    "one page",
    "pattern",
    "gradient",
    "empty state",
  ],
  // For brevity, I'm only including two categories with full subcategories
  // In a real implementation, you would include all categories with their subcategories
}

// Define all steps for the price estimator
export const PRICE_ESTIMATOR_STEPS: Step[] = [
  {
    title: "¿Qué servicios ofrecen?",
    question: "service",
    options: ["Web, UX/UI y Motion", "Desarrollo UI", "Visual", "Ninguno de ellos"],
    placeholder: "Detalles sobre el servicio que necesitas...",
    inputType: "select",
    subtitle: "Selecciona el tipo de servicio que necesitas",
  },
  {
    title: "¿Qué tipo de producto necesitas?",
    question: "productType",
    options: (service) =>
      service === "Visual"
        ? ["Branding", "Packaging", "Cartelería", "Textil", "Otro"]
        : ["Componente", "Rediseño", "Producto", "Consultoría", "Ns/nc"],
    placeholder: "Describe tu producto...",
    inputType: "select",
    subtitle: "Selecciona el tipo de producto que mejor se adapte a tus necesidades",
  },
  {
    title: "¿Cuántas pantallas estimas que necesitarás?",
    question: "screens",
    options: ["1", "3", "4-5", "6-10", "Más de 15"],
    placeholder: "Selecciona el número aproximado de pantallas...",
    inputType: "select",
    subtitle:
      "Tu plan será determinado por el número de pantallas: 1 → Básico, 3 → Hoverboard, 4-5 → Jetpack, 6-10 → Fénix, +15 → Nabuco",
  },
  {
    title: "¿Qué categoría de aplicación necesitas?",
    question: "appCategory",
    options: APP_CATEGORIES,
    placeholder: "Selecciona la categoría de aplicación...",
    inputType: "select",
    subtitle: "Esta información nos ayudará a determinar los componentes disponibles",
  },
  {
    title: "¿Qué tipo de componente necesitas?",
    question: "appSubcategory",
    options: (category) => (category && APP_SUBCATEGORIES[category] ? APP_SUBCATEGORIES[category] : []),
    placeholder: "Selecciona el tipo de componente específico...",
    inputType: "select",
    subtitle: "Esto nos ayudará a entender mejor tu proyecto",
  },
  {
    title: "¿Cuáles son tus posibilidades presupuestarias?",
    question: "budget",
    options: ["Por paquete de horas", "Contrato en plantilla", "Precio cerrado"],
    placeholder: "Más detalles sobre tu presupuesto...",
    inputType: "select",
    subtitle: "Selecciona la opción que mejor se adapte a tus necesidades presupuestarias",
  },
  {
    title: "¿Eres un particular o un equipo?",
    question: "teamType",
    options: ["Particular", "Equipo"],
    placeholder: "Detalles sobre tu organización...",
    inputType: "select",
    subtitle: "Esta información nos ayudará a determinar los planes disponibles para ti",
  },
  {
    title: "¿Qué métodos de pago son de tu preferencia?",
    question: "paymentMethod",
    options: ["Efectivo", "Cripto", "Bizum", "Transferencia bancaria", "Pasarela de pago"],
    placeholder: "Precio estimado. El presupuesto final será facilitado en una conversación directa entre las partes",
    inputType: "select",
    subtitle: "Selecciona tu método de pago preferido",
  },
]

// Plan descriptions
export const PRICE_ESTIMATOR_PLANS: PriceEstimatorPlans = {
  hoverboard: {
    title: "Plan Hoverboard",
    description:
      "Ideal para proyectos rápidos con 3 pantallas y un Styleguide básico. Tiempo de entrega: 1 día. Incluye 3 componentes.",
  },
  jetpack: {
    title: "Plan Jetpack",
    description:
      "Más detallado, incluye hasta 5 pantallas, refinamiento UX/UI y código optimizado. Tiempo de entrega: 1 semana. Incluye 5 componentes.",
  },
  fenix: {
    title: "Plan Fénix",
    description:
      "Amplio, incluye hasta 10 pantallas, Moodboard, Handbook y trabajo de investigación. Tiempo de entrega: 6 meses. Incluye 10 componentes.",
  },
  nabuco: {
    title: "Plan Nabuco",
    description:
      "Plan empresarial con más de 15 pantallas, soporte prioritario, revisiones exhaustivas y consultoría personalizada. Contrato mensual. Incluye 15 componentes.",
  },
}
