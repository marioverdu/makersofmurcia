import type React from "react"
;('"use client')

// Define types for steps and plans
type Option = string | { value: string; title: string; description?: string }

interface Step {
  title: string
  question: string
  options: Option[] | ((prevAnswer: string) => Option[])
  placeholder: string
  subtitle?: string
  inputType?: "text" | "select" | "number" | "textarea"
}

interface PlanInfo {
  title: string
  description: string
  features: string[]
}

interface PriceEstimatorPlans {
  [key: string]: PlanInfo
}

interface PriceEstimatorProps {
  className?: string
  style?: React.CSSProperties
  onClose?: () => void
  avatarUrl?: string
}

// Define steps
export const priceEstimatorSteps: Step[] = [
  {
    title: "¿Qué servicios ofrecen?",
    question: "service",
    options: ["Web", "UX/UI", "Motion", "Ninguno de ellos"],
    placeholder: "Detalles sobre el servicio que necesitas...",
  },
  {
    title: "¿Qué tipo de producto necesitas?",
    question: "productType",
    options: ["Componente", "Rediseño", "Producto", "Consultoría", "Ns/nc"],
    placeholder: "Describe tu producto...",
  },
  {
    title: "¿Cuántas pantallas estimas que necesitarás?",
    question: "screens",
    options: ["3", "5", "10-50", "90+"],
    placeholder: "Selecciona el número aproximado de pantallas...",
  },
]

// Define plans
export const priceEstimatorPlans: PriceEstimatorPlans = {
  hoverboard: {
    title: "Plan Hoverboard",
    description: "Ideal para proyectos rápidos con 3 pantallas y un Styleguide básico.",
    features: ["3 pantallas", "Styleguide básico"],
  },
  jetpack: {
    title: "Plan Jetpack",
    description: "Más detallado, incluye 5 pantallas, refinamiento UX/UI y código optimizado.",
    features: ["5 pantallas", "Refinamiento UX/UI", "Código optimizado"],
  },
  fenix: {
    title: "Plan Fénix",
    description: "Amplio, incluye hasta 90 pantallas, Moodboard, Handbook y trabajo de investigación.",
    features: ["90 pantallas", "Moodboard", "Handbook", "Investigación"],
  },
  nabuco: {
    title: "Plan Nabuco",
    description:
      "El más completo y a largo plazo, con pantallas ilimitadas, investigación continua y soporte estratégico.",
    features: ["Pantallas ilimitadas", "Investigación continua", "Soporte estratégico"],
  },
}

// Define fixed prices
export const FIXED_PRICES = {
  HOURLY_PACKAGE: {
    ONE_DAY: "409,20€",
    THREE_DAYS: "1227,60€",
    FIVE_DAYS: "2046€",
  },
  CONTRACT: "2300€",
  DEFAULT: "A determinar",
}

// Function to determine plan from responses
export const determinePlanFromResponses = (responses: { [key: string]: string }): string => {
  const screens = responses["screens"]
  if (screens === "3") return "hoverboard"
  if (screens === "5") return "jetpack"
  if (screens === "10-50") return "fenix"
  if (screens === "90+") return "nabuco"
  return "hoverboard" // Default
}

export function PriceEstimatorV3({ className = "", style = {}, onClose, avatarUrl }: PriceEstimatorProps) {
  // Retornar null para que no se renderice nada
  return null
}
