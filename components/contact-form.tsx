"use client"
import { useState, useEffect } from "react"
import { PriceEstimatorV3 } from "./price-estimator-v3"

// Importar los tipos y constantes del PriceEstimator
type Option = string | { value: string; title: string; description: string }

interface Step {
  title: string
  question: string
  options: Option[] | ((prevAnswer: string) => Option[])
  placeholder: string
  subtitle?: string
  inputType?: "text" | "select" | "number" | "textarea"
}

// Define the steps based on the provided document
const steps: Step[] = [
  {
    title: "¿Qué servicios ofrecen?",
    question: "service",
    options: ["UX/UI", "Visual", "Código", "Ninguno de ellos"],
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
    title: "¿Qué tipo de componente necesitas?",
    question: "componentType",
    options: [
      {
        value: "Átomo",
        title: "Átomo 🧪",
        description: "La unidad más pequeña e independiente. Ejemplo: Un botón, un input, un icono.",
      },
      {
        value: "Molécula",
        title: "Molécula ⚛️",
        description:
          "Un conjunto de átomos que trabajan juntos. Ejemplo: Un campo de búsqueda (input + botón + icono de lupa).",
      },
      {
        value: "Organismo",
        title: "Organismo 🏗️",
        description:
          "Un grupo de moléculas que forman una sección funcional. Ejemplo: Un navbar (logo + menú + botón de login).",
      },
      {
        value: "Plantilla",
        title: "Plantilla 📄",
        description:
          "La estructura general de la página con espacios para los organismos. Ejemplo: Un layout con un header, sidebar y main content.",
      },
      {
        value: "Página",
        title: "Página 🌍",
        description:
          "La plantilla con contenido real, lista para el usuario. Ejemplo: La página de inicio con imágenes, textos y datos específicos.",
      },
      {
        value: "Ns/nc",
        title: "Ns/nc ❓",
        description: "No estoy seguro o prefiero no especificar el tipo de componente en este momento.",
      },
    ],
    placeholder: "Describe el componente...",
    inputType: "select",
    subtitle: "Todo se construye de lo pequeño a lo grande, como un LEGO. 🧩",
  },
  {
    title: "¿Cuántas pantallas estimas que necesitarás?",
    question: "screens",
    options: [], // Input numérico en lugar de opciones predefinidas
    placeholder: "Introduce el número exacto de pantallas...",
    inputType: "number",
    subtitle:
      "Tu plan será determinado por el número de pantallas: 3 → Hoverboard, 5 → Jetpack, 10-50 → Fénix, 90+ → Nabuco",
  },
  {
    title: "¿Cuál es tu tiempo estimado para el proyecto?",
    question: "timeframe",
    options: ["1 día", "1 semana", "1 mes", "6 meses", "+ año"],
    placeholder: "Detalles sobre tu timeline...",
    inputType: "select",
    subtitle: "Selecciona el plazo de tiempo estimado para completar tu proyecto",
  },
  {
    title: "¿Cuáles son tus posibilidades presupuestarias?",
    question: "budget",
    options: ["Por paquete de horas", "Por precio cerrado por proyecto", "Contrato en plantilla"],
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
    title: "Si eres un equipo, ¿necesitas comunicación en inglés?",
    question: "internationalTeam",
    options: [
      "Sí, necesitamos de un segundo idioma",
      "No todas las comunicaciones son inglés, podríamos trabajar con un diseñador en asíncrono",
    ],
    placeholder: "Detalles sobre tus necesidades de comunicación...",
    inputType: "select",
    subtitle: "Esta información nos ayudará a asignar el equipo adecuado para tu proyecto",
  },
  {
    title: "¿Qué métodos de pago son de tu preferencia?",
    question: "paymentMethod",
    options: ["En persona, en efectivo", "Cripto", "Bizum", "Transferencia bancaria", "Pasarela de pago con tarjeta"],
    placeholder:
      "Respuesta no vinculante. Tu método de pago te será preguntado en el chat que te abrirá Mario posteriormente",
    inputType: "select",
    subtitle: "Selecciona tu método de pago preferido",
  },
  {
    title: "¿Quieres añadir una breve descripción de tu proyecto? (Opcional)",
    question: "projectDescription",
    options: ["No, gracias", "Sí, añadir descripción"],
    placeholder: "Describe brevemente tu proyecto (2-3 líneas)...",
    inputType: "select",
    subtitle: "Puedes añadir detalles adicionales sobre tu proyecto si lo deseas",
  },
  {
    title: "Descripción del proyecto",
    question: "description",
    options: [],
    placeholder: "Describe brevemente tu proyecto (2-3 líneas)...",
    inputType: "textarea",
    subtitle: "Esta información nos ayudará a entender mejor tus necesidades",
  },
]

// Define the technologies for the "Código" service
const technologies = [
  {
    value: "React",
    title: "React ⚛️",
    description: "Biblioteca JavaScript para construir interfaces de usuario interactivas",
  },
  {
    value: "Next.js",
    title: "Next.js 🔲",
    description: "Framework React con renderizado híbrido y optimizaciones integradas",
  },
  {
    value: "Vue",
    title: "Vue 🟩",
    description: "Framework progresivo para construir interfaces de usuario",
  },
  {
    value: "Angular",
    title: "Angular 🔴",
    description: "Framework TypeScript completo para aplicaciones empresariales",
  },
  {
    value: "Svelte",
    title: "Svelte 🟧",
    description: "Compilador que crea aplicaciones web reactivas",
  },
  {
    value: "Otro",
    title: "Otro 🔧",
    description: "Otra tecnología o stack específico",
  },
]

// Define the plans
const plans = {
  hoverboard: {
    title: "⚡ Plan Hoverboard – UI Development",
    description: "Ideal para proyectos rápidos con 3 pantallas y un Styleguide básico.",
    features: [
      "3 pantallas desarrolladas",
      "Tiempo: Máximo 1 día",
      "Stack: Next.js con Framer",
      "Entrega: Styleguide y código entregable (.zip)",
    ],
  },
  jetpack: {
    title: "🚀 Plan Jetpack – UI Development",
    description: "Más detallado, incluye 5 pantallas, refinamiento UX/UI y código optimizado.",
    features: [
      "Tiempo: 1 semana",
      "5 pantallas aproximadamente",
      "Stack: Next.js con Framer",
      "Entrega: Código entregable (.zip)",
    ],
  },
  fenix: {
    title: "🤝 Plan Fénix – UI Development Integral",
    description: "Amplio, incluye hasta 90 pantallas, Moodboard, Handbook y trabajo de investigación.",
    features: [
      "Tiempo: +6 meses",
      "Aprox. 90 pantallas desarrolladas",
      "Stack: Next.js con Framer",
      "Entrega: Moodboard, Handbook y código entregable (.zip)",
    ],
  },
  nabuco: {
    title: "🎟️ Plan Nabucodonosor – UI Development a Largo Plazo",
    description:
      "El más completo y a largo plazo, con pantallas ilimitadas, investigación continua y soporte estratégico.",
    features: [
      "Tiempo: +1 año",
      "Aprox. Número ilimitado de pantallas",
      "Stack: Next.js con Framer",
      "Entrega: Investigación continua, Design System, documentación técnica y más",
    ],
  },
  none: {
    title: "Gracias por tu respuesta",
    description: "Hemos recibido tu respuesta personalizada.",
    features: ["Nos pondremos en contacto contigo pronto para discutir tus necesidades específicas."],
  },
}

interface ContactFormProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactForm({ isOpen, onClose }: ContactFormProps) {
  // Estados principales del PriceEstimator
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [result, setResult] = useState<string | null>(null)
  const [showDescription, setShowDescription] = useState(false)

  // Cargar datos guardados
  useEffect(() => {
    if (isOpen) {
      const savedResponses = localStorage.getItem("formResponses")
      const savedStep = localStorage.getItem("formCurrentStep")

      if (savedResponses) setResponses(JSON.parse(savedResponses))
      if (savedStep) setCurrentStep(Number(savedStep))
    }
  }, [isOpen])

  // Guardar datos
  useEffect(() => {
    if (Object.keys(responses).length > 0) {
      localStorage.setItem("formResponses", JSON.stringify(responses))
      localStorage.setItem("formCurrentStep", currentStep.toString())
    }
  }, [responses, currentStep])

  if (!isOpen) return null

  // Renderizar PriceEstimatorV3 directamente sin el overlay
  return (
    <PriceEstimatorV3
      onClose={onClose}
      initialResponses={responses}
      initialStep={currentStep}
      storageKey="formResponses"
      result={result}
      onComplete={(resultPlan, resultResponses) => {
        setResult(resultPlan)
        setResponses(resultResponses)
      }}
    />
  )
}
