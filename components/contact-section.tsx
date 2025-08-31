"use client"

import { useState } from "react"
// Eliminar la importación del botón de contacto
// import { PrimaryButton } from "@/components/ui/buttons"
// import { handleChatOpen } from "@/components/contact-button-v3"

interface ContactSectionProps {
  onContactClick?: () => void
}

export default function ContactSection({ onContactClick }: ContactSectionProps) {
  const [showEmptyDiv, setShowEmptyDiv] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen)
  }

  return (
    <>
      <div className="flex justify-center items-center w-full relative">
        <div className="flex flex-col items-start relative z-10 gap-[16px] md:gap-[24px] xl:gap-[32px] px-4 md:px-0 w-full max-w-[1092px] py-[64px]">
          {!showEmptyDiv ? (
            <div
              className="flex flex-col items-center relative
              gap-6
              py-[24px] px-6 xl:py-[24px] xl:px-[48px] rounded-[12px] backdrop-blur-md border border-white/40
              w-full cursor-pointer"
              onClick={(e) => {
                // Create and dispatch a custom event to open the chat
                const event = new CustomEvent("openChatTuenti", {
                  detail: {
                    message: "Contactar con Mario",
                    action: "contactv2",
                  },
                })
                window.dispatchEvent(event)

                // Also set localStorage values to ensure the chat opens
                localStorage.setItem("openChatTuenti", "true")
                localStorage.setItem("chatTuentiMessage", "Contactar con Mario")
                localStorage.setItem("chatTuentiAction", "contactv2")

                // Force a refresh of the chat component
                const chatRefreshEvent = new Event("refreshChatTuenti")
                window.dispatchEvent(chatRefreshEvent)
              }}
              style={{
                backdropFilter: "blur(12px)",
                backgroundColor: "rgba(242, 248, 255, 0.7)", // Color #F2F8FF with 70% opacity
              }}
            >
              {/* Decorative background div (no intercepta clics) */}
              <div
                className="absolute inset-0 rounded-[12px] overflow-hidden -z-10 pointer-events-none"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.3)", // Equivalent to bg-white/30
                  backdropFilter: "blur(12px)", // Equivalent to backdrop-blur-md
                  border: "1px solid rgba(0, 94, 182, 0.1)", // Matching the header border
                  boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 3px",
                }}
              ></div>

              <div className="w-full flex justify-between items-center">
                <h2 className="text-[hsl(206,1%,27%)] text-xl font-medium flex items-center justify-between w-full">
                  <span>¿List@ para empezar?</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation() // Prevent parent onClick from firing
                      // Create and dispatch a custom event to open the chat
                      const event = new CustomEvent("openChatTuenti", {
                        detail: {
                          message: "Contactar con Mario",
                          action: "contactv2",
                        },
                      })
                      window.dispatchEvent(event)

                      // Also set localStorage values to ensure the chat opens
                      localStorage.setItem("openChatTuenti", "true")
                      localStorage.setItem("chatTuentiMessage", "Contactar con Mario")
                      localStorage.setItem("chatTuentiAction", "contactv2")

                      // Force a refresh of the chat component
                      const chatRefreshEvent = new Event("refreshChatTuenti")
                      window.dispatchEvent(chatRefreshEvent)
                    }}
                    className="flex items-center justify-center bg-transparent border-none cursor-pointer p-0 hover:opacity-80 transition-opacity"
                    aria-label="Contactar con Mario"
                  >
                    <img src="https://assets.marioverdu.com/icon/go-to.svg" alt="Go to icon" width="16" height="16" />
                  </button>
                </h2>
                <div className="empty-button-container">{/* Espacio reservado para un nuevo botón */}</div>
              </div>
            </div>
          ) : (
            <div className="w-full h-48 bg-gray-100 rounded-[12px]">{/* Empty div content */}</div>
          )}
        </div>
      </div>
    </>
  )
}
