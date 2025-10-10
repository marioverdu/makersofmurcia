"use client"

import { useState, useEffect, useRef } from "react"
import type { FormResponse } from "@/lib/price-estimator/types"
import { PRICE_ESTIMATOR_STEPS } from "@/lib/price-estimator/constants"
import {
  calculateEstimatedPrice,
  calculateFinalPrice,
  determinePlanFromResponses,
  formatPrice,
  getClosestPlan,
} from "@/lib/price-estimator/price-utils"
import { validateStep } from "@/lib/price-estimator/validation"
import { FormFooter, FormHeader, ProgressBar } from "./form-elements"
import { getIncludedComponentsLimit, renderStep } from "./form-steps"
import { ResultView } from "./result-view"

interface PriceEstimatorProps {
  className?: string
  avatarUrl?: string
  onComplete?: (result: string, responses: FormResponse) => void
  initialStep?: number
  initialResponses?: FormResponse
  storageKey?: string
  onClose?: () => void
}

// Define APP_SUBCATEGORIES
const APP_SUBCATEGORIES: { [key: string]: string[] } = {
  "E-commerce": ["Tienda online", "Marketplace", "Plataforma de suscripción"],
  "Red social": ["Comunidad online", "Foro", "Plataforma de contenido generado por el usuario"],
  Entretenimiento: ["Streaming de video", "Streaming de música", "Juegos online"],
  Educación: ["Plataforma de cursos online", "Herramienta de aprendizaje interactivo", "Gestión de estudiantes"],
  Salud: ["Telemedicina", "Seguimiento de salud", "Bienestar mental"],
  Finanzas: ["Banca online", "Inversiones", "Gestión de gastos"],
  Productividad: ["Gestión de tareas", "Colaboración en equipo", "Organización personal"],
  Otro: ["Otro"],
}

export function PriceEstimatorV4({
  className = "",
  avatarUrl = "/placeholder.svg?height=78&width=78",
  onComplete,
  initialStep = 0,
  initialResponses = {},
  storageKey = "formResponsesV3",
  onClose,
}: PriceEstimatorProps) {
  // Main states for the PriceEstimator
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [responses, setResponses] = useState<FormResponse>(initialResponses)
  const [result, setResult] = useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string>("hoverboard") // Default value
  const [validationError, setValidationError] = useState<string | null>(null)

  // States for category and subcategory selection
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])

  // States for price calculation
  const [finalCalculatedPrice, setFinalCalculatedPrice] = useState<string>("")
  const [closestPlan, setClosestPlan] = useState<string>("hoverboard")

  // Footer ref for scroll handling
  const footerRef = useRef<HTMLDivElement>(null)
  const [isFooterFocused, setIsFooterFocused] = useState(false)
  const lastScrollPosition = useRef(0)

  // Load saved data
  useEffect(() => {
    const savedResponses = localStorage.getItem(storageKey)
    const savedStep = localStorage.getItem(`${storageKey}Step`)

    if (savedResponses) {
      const parsedResponses = JSON.parse(savedResponses)
      setResponses(parsedResponses)

      // Restore selected category if it exists
      if (parsedResponses.appCategory) {
        setSelectedCategory(parsedResponses.appCategory)
      }

      // Restore selected subcategories if they exist
      if (parsedResponses.appSubcategory) {
        // Check if it's a comma-separated string and convert to array
        if (typeof parsedResponses.appSubcategory === "string" && parsedResponses.appSubcategory.includes(",")) {
          setSelectedSubcategories(parsedResponses.appSubcategory.split(", ").map((s: string) => s.trim()))
        } else {
          setSelectedSubcategories([parsedResponses.appSubcategory])
        }
      }

      // Calculate the closest plan based on the estimated price
      const calculatedPrice = calculateFinalPrice(parsedResponses, selectedSubcategories)
      const closest = getClosestPlan(calculatedPrice)
      setClosestPlan(closest)
      setSelectedPlan(closest) // Set the selected plan to match the closest plan
    }

    if (savedStep) setCurrentStep(Number(savedStep))
  }, [storageKey])

  // Save data
  useEffect(() => {
    if (Object.keys(responses).length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(responses))
      localStorage.setItem(`${storageKey}Step`, currentStep.toString())
    }
  }, [responses, currentStep, storageKey])

  // Handle responses
  const handleResponse = (question: string, value: string) => {
    setValidationError(null)
    setResponses((prev) => {
      const newResponses = { ...prev, [question]: value }
      return newResponses
    })
  }

  // Navigation: Next
  const handleNext = () => {
    // If we're in step 1 (product type) and "Producto" was selected
    if (currentStep === 1 && responses["productType"] === "Producto") {
      // Automatically select "6-10 screens" for the next step
      handleResponse("screens", "6-10")
    }

    // If we're in step 3 (application category)
    if (currentStep === 3) {
      // If no category is selected, select the first one by default
      if (!selectedCategory && PRICE_ESTIMATOR_STEPS[3].options.length > 0) {
        setSelectedCategory(PRICE_ESTIMATOR_STEPS[3].options[0] as string)
        handleResponse("appCategory", PRICE_ESTIMATOR_STEPS[3].options[0] as string)
      } else {
        handleResponse("appCategory", selectedCategory)
      }
      // Advance to the next step
      setCurrentStep(currentStep + 1)
      return
    }

    // If we're in step 4 (subcategory)
    if (currentStep === 4) {
      // If no subcategory is selected, select the first one by default
      if (selectedSubcategories.length === 0 && selectedCategory && selectedCategory) {
        // If there are subcategories available for the selected category
        const subcategories = APP_SUBCATEGORIES[selectedCategory]
        if (subcategories && subcategories.length > 0) {
          const firstSubcategory = subcategories[0]
          setSelectedSubcategories([firstSubcategory])
          handleResponse("appSubcategory", firstSubcategory)
        }
      } else if (selectedSubcategories.length > 0) {
        // If there are selected subcategories, save them as a comma-separated string
        handleResponse("appSubcategory", selectedSubcategories.join(", "))
      }
      // Advance to the next step
      setCurrentStep(currentStep + 1)
      return
    }

    // If we're in step 5 (budget) and "Precio cerrado" was selected
    if (currentStep === 5 && responses["budget"] === "Precio cerrado") {
      // Show validation but allow continuing
      setValidationError("La posibilidad de obtener respuesta en esta modalidad es baja")
      // Wait a moment before continuing so the user can read the message
      setTimeout(() => {
        setCurrentStep(currentStep + 1)
        setValidationError(null)
      }, 2000)
      return
    }

    // For other steps, perform normal validation
    const validation = validateStep(currentStep, responses)
    if (!validation.valid) {
      setValidationError(validation.message)
      return
    }

    // Special case for "Ninguno de ellos" in first question
    if (currentStep === 0 && responses[PRICE_ESTIMATOR_STEPS[0].question] === "Ninguno de ellos") {
      determineResult()
      return
    }

    // If we're on the last step
    if (currentStep === PRICE_ESTIMATOR_STEPS.length - 1) {
      // Calculate the final price before determining the result
      const calculatedPrice = calculateFinalPrice(responses, selectedSubcategories)
      setFinalCalculatedPrice(formatPrice(calculatedPrice))
      setClosestPlan(getClosestPlan(calculatedPrice))

      // Make sure the calculated price is saved before determining the result
      setTimeout(() => {
        determineResult()
      }, 0)
      return
    }

    setCurrentStep(currentStep + 1)
  }

  // Navigation: Previous
  const handlePrevious = () => {
    if (currentStep === 0) return
    setCurrentStep(Math.max(0, currentStep - 1))
  }

  // Handle proposing a project
  const handleProposeProject = () => {
    // Create a simplified message
    const selectedPlanName =
      selectedPlan === "hoverboard"
        ? "Hoverboard"
        : selectedPlan === "jetpack"
          ? "Jetpack"
          : selectedPlan === "fenix"
            ? "Fénix"
            : selectedPlan === "nabuco"
              ? "Nabuco"
              : "No especificado"

    const estimatedPrice = calculateEstimatedPrice(responses, selectedSubcategories)

    // Build a simplified message with just greeting, price, and closing
    let detailedMessage = `Hola, me gustaría proponerte un proyecto basado en el plan **${selectedPlanName}**.\n\n\n`
    detailedMessage += `El precio estimado es: **${estimatedPrice}**\n\n\n`

    // Add closing message with additional space
    detailedMessage += `\n\nMe gustaría recibir más información sobre cómo podemos avanzar con este proyecto.\n\n\n¿Cuáles serían los siguientes pasos?`

    // Save in localStorage that we want to open the chat and send the detailed message
    localStorage.setItem("openChatTuenti", "true")
    localStorage.setItem("chatTuentiMessage", detailedMessage)

    // Dispatch a custom event so other components can react
    const event = new CustomEvent("openChatTuenti", {
      detail: {
        message: detailedMessage,
      },
    })
    window.dispatchEvent(event)
  }

  // Calculate final result
  const determineResult = () => {
    const resultPlan = determinePlanFromResponses(responses, selectedSubcategories)

    const calculatedPrice = calculateFinalPrice(responses, selectedSubcategories)
    const closest = getClosestPlan(calculatedPrice)
    setClosestPlan(closest)

    // Set the selected plan to match the closest plan (recommended plan)
    setSelectedPlan(closest)

    setResult(resultPlan)
    if (onComplete) onComplete(resultPlan, responses)
  }

  // Calculate progress based on current step
  const calculateProgress = () => {
    // For the last step (step 7), show the bar almost complete (95%)
    if (currentStep === PRICE_ESTIMATOR_STEPS.length - 1) {
      return 95
    }

    // Base progress: each step contributes to the total progress
    const baseProgressPerStep = 85 / (PRICE_ESTIMATOR_STEPS.length - 1) // Reserve 95% for the last step
    const progress = currentStep * baseProgressPerStep

    return Math.min(progress, 95) // Make sure it doesn't exceed 95% before the last step
  }

  // Reset form
  const resetForm = () => {
    setResponses({})
    setCurrentStep(0)
    setResult(null)
    setSelectedCategory("")
    setSelectedSubcategories([])
    localStorage.removeItem(storageKey)
    localStorage.removeItem(`${storageKey}Step`)
  }

  // Get the current estimated price
  const getCurrentEstimatedPrice = () => {
    return calculateEstimatedPrice(responses, selectedSubcategories)
  }

  // Get the avatar URL based on the selected plan or estimated price
  const getAvatarUrl = () => {
    // If "Producto" was selected in step 1, show Jetpack image
    if (responses["productType"] === "Producto") {
      return "https://assets.marioverdu.com/price-estimator/emoji/1.png" // Jetpack plan
    }

    // First check by the selected number of screens
    if (responses["screens"] === "Más de 15") {
      return "https://assets.marioverdu.com/price-estimator/emoji/4.png" // Nabuco plan
    } else if (responses["screens"] === "6-10") {
      return "https://assets.marioverdu.com/price-estimator/emoji/3.png" // Fénix plan
    } else if (responses["screens"] === "4-5") {
      return "https://assets.marioverdu.com/price-estimator/emoji/1.png" // Jetpack plan
    } else if (responses["screens"] === "3") {
      return "https://assets.marioverdu.com/price-estimator/emoji/2.png" // Hoverboard plan
    }

    // If no screen selection, check by budget
    if (responses["budget"] === "Contrato en plantilla") {
      return "https://assets.marioverdu.com/price-estimator/emoji/4.png" // Nabuco plan
    }

    // Default to Hoverboard
    return "https://assets.marioverdu.com/price-estimator/emoji/2.png" // Hoverboard plan
  }

  return (
    // Price Estimator Form (v4)
    <div
      className={`w-full max-w-[1092px] mx-auto rounded-[12px] border border-[#3D5B6A]/20 ${className}`}
      style={{
        height: "fit-content",
        backgroundColor: "#F7F8FC",
        position: "relative",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      {/* Avatar positioned to properly overlap the container and centered */}
      <div className="absolute top-0 left-4 z-30 transform -translate-y-1/2">
        <div className="w-[80px] h-[80px] rounded-full bg-backgroundSupport border-2 border-[#3D5B6A] shadow-lg flex items-center justify-center overflow-hidden">
          <img src={getAvatarUrl() || "/placeholder.svg"} alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </div>

      {result ? (
        <ResultView
          result={result}
          responses={responses}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          closestPlan={closestPlan}
          finalCalculatedPrice={finalCalculatedPrice}
          onReset={resetForm}
          onProposeProject={handleProposeProject}
          onBack={() => {
            setResult(null)
            setCurrentStep(PRICE_ESTIMATOR_STEPS.length - 1)
          }}
        />
      ) : (
        <>
          {/* Step Indicators box with expanded content - all centered */}
          <div
            className="w-full p-4 pt-16 flex flex-col items-start border-b border-[#3D5B6A]/10 rounded-t-[12px]"
            style={{
              backgroundColor: "#F7F8FC",
              position: "relative",
            }}
          >
            <FormHeader
              title={currentStep === 0 ? "¿Qué servicio necesita?" : PRICE_ESTIMATOR_STEPS[currentStep].title}
              subtitle="Precio estimado orientativo. El presupuesto definitivo se facilitará en conversación directa."
              onBack={handlePrevious}
              showBackButton={currentStep > 0 && currentStep === PRICE_ESTIMATOR_STEPS.length - 1}
            />

            {/* Step indicators at the bottom - only show when not on result screen */}
            <div className="w-full mt-auto">
              <ProgressBar progress={calculateProgress()} />
            </div>
          </div>

          <form className="w-full">
            {/* Form content */}
            <div
              className="w-full p-4 flex flex-col gap-8"
              style={{
                backgroundColor: "#F7F8FC",
                position: "relative",
              }}
            >
              {renderStep({
                currentStep,
                responses,
                handleResponse,
                selectedCategory,
                setSelectedCategory,
                selectedSubcategories,
                setSelectedSubcategories,
              })}
            </div>
          </form>

          {/* Footer */}
          <div ref={footerRef}>
            <FormFooter
              price={getCurrentEstimatedPrice()}
              onNext={handleNext}
              onPrevious={handlePrevious}
              showPreviousButton={currentStep > 0 && currentStep < PRICE_ESTIMATOR_STEPS.length - 1}
              isLastStep={currentStep === PRICE_ESTIMATOR_STEPS.length - 1}
              validationError={validationError}
              selectedSubcategories={currentStep === 4 ? selectedSubcategories : []}
              includedComponentsLimit={getIncludedComponentsLimit(responses)}
            />
          </div>
        </>
      )}
    </div>
  )
}
