"use client"

import { useEffect } from "react"
import { useBookingFlow } from "@/hooks/use-booking-flow"

interface ChatBookingIntegrationProps {
  messages: any[]
  setMessages: (messages: any[]) => void
  flowState: any
  setFlowState: (state: any) => void
  addMessage: (message: any) => void
  setCurrentFlow: (flow: string) => void
  setIsTyping: (typing: boolean) => void
  setResponses: (updater: (prev: any) => any) => void
  setCurrentPrice: (price: number) => void
}

export function ChatBookingIntegration({
  messages,
  setMessages,
  flowState,
  setFlowState,
  addMessage,
  setCurrentFlow,
  setIsTyping,
  setResponses,
  setCurrentPrice,
}: ChatBookingIntegrationProps) {
  const { systemStatus } = useBookingFlow()

  // Sync con systemStatus para notificaciones automáticas
  useEffect(() => {
    if (systemStatus !== flowState.systemInfo) {
      setFlowState((prev: any) => ({ ...prev, systemInfo: systemStatus }))

      if (systemStatus === "approved" && flowState.systemInfo === "pending") {
        addMessage({
          content: "🎉 ¡Proyecto aprobado! Ahora puedes seleccionar el día para tu reunión:",
          sender: "bot",
          type: "quick-reply",
          metadata: {
            options: [
              { id: "day_monday", text: "Lunes", action: "day_monday" },
              { id: "day_tuesday", text: "Martes", action: "day_tuesday" },
              { id: "day_wednesday", text: "Miércoles", action: "day_wednesday" },
              { id: "day_thursday", text: "Jueves", action: "day_thursday" },
              { id: "day_friday", text: "Viernes", action: "day_friday" },
            ],
          },
        })
      }
    }
  }, [systemStatus, flowState.systemInfo, addMessage, setFlowState])

  return null // Este componente solo maneja la lógica, no renderiza nada
}
