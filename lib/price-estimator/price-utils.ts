import type { FormResponse } from "./types"
import { COMPONENT_PRICE, FIXED_PRICES, INCLUDED_COMPONENTS } from "./constants"

// Convert price from string to number
export function priceStringToNumber(priceString: string): number {
  if (priceString === FIXED_PRICES.DEFAULT || priceString === FIXED_PRICES.TO_BE_DETERMINED) {
    return 0
  }
  return Number.parseFloat(priceString.replace("€", "").replace(".", "").replace(",", "."))
}

// Convert price from number to string
export function priceNumberToString(price: number): string {
  return price.toFixed(2).replace(".", ",") + "€"
}

// Check if a calculated price is higher than the base price
export function isCustomPrice(calculatedPrice: string, screenRange: string): boolean {
  // If we're using a fixed plan price, it's not a custom price
  if (
    screenRange === "3" ||
    screenRange === "4-5" ||
    screenRange === "6-10" ||
    screenRange === "Más de 15" ||
    screenRange === "CONTRACT"
  ) {
    return false
  }

  const calculatedValue = priceStringToNumber(calculatedPrice)
  const dailyRate = priceStringToNumber(FIXED_PRICES.DAILY_RATE)

  // For 1 screen, check if the price is different from the base price of 1 day
  if (screenRange === "1") {
    return calculatedValue !== dailyRate
  }

  return false
}

// Get base price by screen count
export function getBasePriceByScreens(screens: string): number {
  switch (screens) {
    case "3":
      return 409.2 // Hoverboard
    case "4-5":
      return 720 // Jetpack
    case "6-10":
      return 1711.2 // Fenix
    case "Más de 15":
      return 2300 // Nabuco
    default:
      return 0
  }
}

// Get plan by screen count
export function getPlanByScreens(screens: string): string {
  switch (screens) {
    case "3":
      return "hoverboard"
    case "4-5":
      return "jetpack"
    case "6-10":
      return "fenix"
    case "Más de 15":
      return "nabuco"
    default:
      return "hoverboard"
  }
}

// Get included components by plan
export function getIncludedComponentsByPlan(plan: string): number {
  switch (plan) {
    case "hoverboard":
      return INCLUDED_COMPONENTS.HOVERBOARD
    case "jetpack":
      return INCLUDED_COMPONENTS.JETPACK
    case "fenix":
      return INCLUDED_COMPONENTS.FENIX
    case "nabuco":
      return INCLUDED_COMPONENTS.NABUCO
    default:
      return INCLUDED_COMPONENTS.HOVERBOARD
  }
}

// Format price
export function formatPrice(price: number): string {
  return price.toFixed(2).replace(".", ",") + "€"
}

// Get closest plan based on estimated price
export function getClosestPlan(estimatedPrice: number): string {
  const planPrices = {
    hoverboard: 409.2,
    jetpack: 720,
    fenix: 1711.2,
    nabuco: 2300,
  }

  // If the estimated price is less than or equal to the Hoverboard plan price, return Hoverboard
  if (estimatedPrice <= planPrices.hoverboard) {
    return "hoverboard"
  }

  // If the estimated price is greater than or equal to the Nabuco plan price, return Nabuco
  if (estimatedPrice >= planPrices.nabuco) {
    return "nabuco"
  }

  // Midpoints between plans to determine thresholds
  const hoverboardJetpackThreshold = (planPrices.hoverboard + planPrices.jetpack) / 2
  const jetpackFenixThreshold = (planPrices.jetpack + planPrices.fenix) / 2
  const fenixNabucoThreshold = (planPrices.fenix + planPrices.nabuco) / 2

  // Determine the plan based on thresholds
  if (estimatedPrice < hoverboardJetpackThreshold) {
    return "hoverboard"
  } else if (estimatedPrice < jetpackFenixThreshold) {
    return "jetpack"
  } else if (estimatedPrice < fenixNabucoThreshold) {
    return "fenix"
  } else {
    return "nabuco"
  }
}

// Calculate final price
export function calculateFinalPrice(responses: FormResponse, selectedSubcategories: string[] = []): number {
  // Get the base price based on the number of screens
  const screens = responses["screens"]
  const components = selectedSubcategories.length

  // If there are no responses or no screen count selected, return 0
  if (!screens) return 0

  let basePrice = 0

  // Determine the base price based on the number of screens
  switch (screens) {
    case "3":
      basePrice = 409.2 // Hoverboard
      break
    case "4-5":
      basePrice = 720 // Jetpack
      break
    case "6-10":
      basePrice = 1711.2 // Fenix
      break
    case "Más de 15":
      basePrice = 2300 // Nabuco
      break
    case "1":
      basePrice = 136.4 // Daily rate for 1 screen
      break
    default:
      basePrice = 0
  }

  // If it's a staff contract, use the Nabuco plan price
  if (responses["budget"] === "Contrato en plantilla") {
    return 2300 // Nabuco plan price
  }

  // If "Precio cerrado" was selected, return 0
  if (responses["budget"] === "Precio cerrado") {
    return 0
  }

  // Get the number of included components based on the plan determined by screens
  const planByScreens = getPlanByScreens(screens)
  const includedComponents = getIncludedComponentsByPlan(planByScreens)

  // Calculate additional components price
  const additionalComponents = Math.max(0, components - includedComponents)
  const additionalPrice = additionalComponents * COMPONENT_PRICE

  // Return the total price
  return basePrice + additionalPrice
}

// Calculate estimated price as a string
export function calculateEstimatedPrice(responses: FormResponse, selectedSubcategories: string[] = []): string {
  // If there are no responses, show ~€
  if (Object.keys(responses).length === 0) {
    return FIXED_PRICES.DEFAULT
  }

  // If "Precio cerrado" was selected, show "A determinar"
  if (responses["budget"] === "Precio cerrado") {
    return FIXED_PRICES.TO_BE_DETERMINED
  }

  // Calculate the final price
  const finalPrice = calculateFinalPrice(responses, selectedSubcategories)

  // If the price is 0, it could be because it's "A determinar" or because there's not enough data
  if (finalPrice === 0) {
    return FIXED_PRICES.DEFAULT
  }

  // Convert the price to string format
  return formatPrice(finalPrice)
}

// Determine plan from responses
export function determinePlanFromResponses(responses: FormResponse, selectedSubcategories: string[] = []): string {
  // Extract key values
  const service = responses["service"]
  const screenRange = responses["screens"]
  const teamType = responses["teamType"]
  const budget = responses["budget"]

  // If the service is "Ninguno de ellos", show confirmation
  if (service === "Ninguno de ellos") {
    return "none"
  }

  // Logic to determine the plan
  let resultPlan: string

  // If "Contrato en plantilla" was chosen, directly assign the Nabuco plan
  if (budget === "Contrato en plantilla") {
    resultPlan = "nabuco"
  } else if (teamType === "Equipo") {
    // For teams, only Fénix or Nabuco plans
    if (screenRange === "Más de 15") {
      resultPlan = "nabuco"
    } else {
      resultPlan = "fenix"
    }
  } else {
    // For individuals, consider both screens and components

    // Determine the total number of selected components
    const totalComponents = selectedSubcategories.length

    // Determine the plan based on components
    let componentBasedPlan = "hoverboard"
    if (totalComponents > INCLUDED_COMPONENTS.HOVERBOARD && totalComponents <= INCLUDED_COMPONENTS.JETPACK) {
      componentBasedPlan = "jetpack"
    } else if (totalComponents > INCLUDED_COMPONENTS.JETPACK && totalComponents <= INCLUDED_COMPONENTS.FENIX) {
      componentBasedPlan = "fenix"
    } else if (totalComponents > INCLUDED_COMPONENTS.FENIX) {
      componentBasedPlan = "nabuco"
    }

    // Determine the plan based on screens
    let screenBasedPlan = "hoverboard"
    if (screenRange === "Más de 15") {
      screenBasedPlan = "nabuco"
    } else if (screenRange === "6-10") {
      screenBasedPlan = "fenix"
    } else if (screenRange === "4-5") {
      screenBasedPlan = "jetpack"
    } else if (screenRange === "3") {
      screenBasedPlan = "hoverboard"
    }

    // Choose the higher plan between the two
    const planRanking = { hoverboard: 1, jetpack: 2, fenix: 3, nabuco: 4 }
    resultPlan =
      planRanking[componentBasedPlan as keyof typeof planRanking] >
      planRanking[screenBasedPlan as keyof typeof planRanking]
        ? componentBasedPlan
        : screenBasedPlan
  }

  return resultPlan
}
