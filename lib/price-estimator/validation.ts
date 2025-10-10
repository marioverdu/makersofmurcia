import type { FormResponse } from "./types"
import { PRICE_ESTIMATOR_STEPS } from "./constants"

export interface ValidationResult {
  valid: boolean
  message?: string
}

export function validateStep(step: number, responses: FormResponse): ValidationResult {
  // Skip validation for steps 3 (app category), 4 (subcategory), and 5 (budget)
  if (step === 3 || step === 4 || step === 5) {
    return { valid: true }
  }

  // Define which questions to validate for each step
  const questionsToValidate =
    [
      [0], // Step 0: Service
      [1], // Step 1: Product Type
      [2], // Step 2: Screens
      // Step 3: App Category (handled directly in handleNext)
      // Step 4: App Subcategory (handled directly in handleNext)
      // Step 5: Budget (validation skipped for this step)
      [6], // Step 6: Team Type
      [7], // Step 7: Payment Method
    ][step] || []

  for (const questionIndex of questionsToValidate) {
    const currentQuestion = PRICE_ESTIMATOR_STEPS[questionIndex]

    // Check if there's a response for the question
    if (!responses[currentQuestion.question] && currentQuestion.inputType !== "textarea") {
      return { valid: false, message: `Por favor, selecciona una opción` }
    }
  }

  // If we get here, all validations passed
  return { valid: true }
}
