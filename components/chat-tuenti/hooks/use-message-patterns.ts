export const isPricingMessage = (message: string): boolean => {
  const pricingKeywords = [
    "explorar servicios",
    "servicios",
    "precios",
    "pricing",
    "planes",
    "diseño",
    "web",
    "app",
    "pantallas",
    "presupuesto",
    "pago",
  ]

  return pricingKeywords.some((keyword) => message.toLowerCase().includes(keyword.toLowerCase()))
}

export const detectMessagePattern = (message: string) => {
  if (isPricingMessage(message)) {
    return { type: "pricing", confidence: 0.8 }
  }

  // ... resto de patrones existentes
}
