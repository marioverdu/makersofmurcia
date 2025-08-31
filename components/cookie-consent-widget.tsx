"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
// DISABLED: Cookie system teardown - All cookie functionality disabled
// import { isClientPreviewEnvironment } from "@/lib/client-preview-utils"
// import { setCookie, areCookiesEnabled, getCookiePreferences } from "@/lib/cookie-utils"

// Safely import chat components with error handling
let ChatTuentiComponent: any = null
let ChatButtonComponent: any = null

try {
  // Dynamically import to prevent build errors
  import("@/components/chat-tuenti/chat-tuenti")
    .then((module) => {
      ChatTuentiComponent = module.default || module.ChatTuenti
    })
    .catch((err) => console.error("Failed to load ChatTuenti component:", err))

  import("@/components/chat-tuenti/chat-button")
    .then((module) => {
      ChatButtonComponent = module.default || module.ChatButton
    })
    .catch((err) => console.error("Failed to load ChatButton component:", err))
} catch (error) {
  console.error("Error importing chat components:", error)
}

type CookiePreferences = {
  essential: boolean // Always true
  functional: boolean
  analytics: boolean
  marketing: boolean
}

interface CookieConsentWidgetProps {
  onAction?: (action: string) => void
}

const CookieConsentWidget: React.FC<CookieConsentWidgetProps> = ({ onAction = () => {} }) => {
  // DISABLED: Cookie system teardown - All states disabled but preserved for future restoration
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(true) // FORCED TRUE: Always show chat
  const [isOpen, setIsOpen] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [deviceType, setDeviceType] = useState<"phone" | "tablet" | "desktop">("desktop")
  const [isPreview, setIsPreview] = useState(false)
  const [cookiesEnabled, setCookiesEnabled] = useState(true)
  const widgetRef = useRef<HTMLDivElement>(null)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    functional: false,
    analytics: false,
    marketing: false,
  })

  // State for Tuenti chat
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // DISABLED: Cookie system teardown - All cookie logic disabled
  useEffect(() => {
    if (typeof window !== "undefined") {
      // DISABLED: Preview environment check
      // const inPreviewEnv = isClientPreviewEnvironment()
      // setIsPreview(inPreviewEnv)

      // Check if device is mobile
      setIsMobile(window.innerWidth < 768)

      // DISABLED: Cookie enabled check
      // const cookiesEnabledCheck = areCookiesEnabled()
      // setCookiesEnabled(cookiesEnabledCheck)

      // DISABLED: All cookie preference logic - Force show chat always
      setCookieConsent(true) // Always show chat, no cookie consent needed

      // Determine device type
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768)
        if (window.innerWidth < 640) {
          setDeviceType("phone")
        } else if (window.innerWidth < 1024) {
          setDeviceType("tablet")
        } else {
          setDeviceType("desktop")
        }
      }

      handleResize()
      window.addEventListener("resize", handleResize)

      // DISABLED: Storage change listener
      // const handleStorageChange = (e: StorageEvent) => {
      //   if (!isPreview && e.key === "cookie-preference" && e.newValue) {
      //     setCookieConsent(true)
      //     setIsOpen(false)
      //   }
      // }
      // window.addEventListener("storage", handleStorageChange)

      return () => {
        window.removeEventListener("resize", handleResize)
        // window.removeEventListener("storage", handleStorageChange)
      }
    }
  }, [])

  // DISABLED: All cookie handling functions preserved for future restoration
  const handleAcceptAll = () => {
    // DISABLED: Cookie system teardown
    console.log("Cookie system disabled - handleAcceptAll")
  }

  const handleRejectNonEssential = () => {
    // DISABLED: Cookie system teardown
    console.log("Cookie system disabled - handleRejectNonEssential")
  }

  const handleTogglePreference = (type: keyof Omit<CookiePreferences, "essential">) => {
    // DISABLED: Cookie system teardown
    console.log("Cookie system disabled - handleTogglePreference", type)
  }

  const handleSavePreferences = () => {
    // DISABLED: Cookie system teardown
    console.log("Cookie system disabled - handleSavePreferences")
  }

  const handleShowPreferences = () => {
    // DISABLED: Cookie system teardown
    console.log("Cookie system disabled - handleShowPreferences")
  }

  const toggleWidget = () => {
    // DISABLED: Cookie system teardown
    console.log("Cookie system disabled - toggleWidget")
  }

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  const saveConsent = (consentType: "accept_all" | "reject_non_essential" | "custom", prefs: CookiePreferences) => {
    // DISABLED: Cookie system teardown - All cookie saving logic disabled
    console.log("Cookie system disabled - saveConsent", consentType, prefs)
  }

  return (
    <>
      {/* DISABLED: Cookie consent UI - Always show chat directly */}
      {/* Cookie system teardown: Always render chat components directly */}
      <>
        {/* Fallback to a simple button if ChatButton component fails to load */}
        {ChatButtonComponent ? (
          <ChatButtonComponent
            isOpen={isChatOpen}
            onClick={toggleChat}
            position="bottom-right"
            padding={{ bottom: 6, right: 6, left: 4, top: 4 }}
            colors={{
              background: "#3D5B6A",
              backgroundHover: "#2D4B5A",
              icon: "#FFFFFF",
            }}
            ariaLabel={isChatOpen ? "Close chat" : "Open chat"}
            isBlinking={false}
            isMobile={isMobile}
          />
        ) : (
          <button
            onClick={toggleChat}
            className="fixed z-50 bottom-6 right-6 w-10 h-10 rounded-full bg-[#3D5B6A] text-white flex items-center justify-center shadow-lg hover:bg-[#2D4B5A] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3D5B6A]"
            aria-label={isChatOpen ? "Close chat" : "Open chat"}
          >
            <span className="text-lg" role="img" aria-hidden="true">
              💬
            </span>
          </button>
        )}

        {/* Render the ChatTuenti component when chat is open */}
        {isChatOpen && ChatTuentiComponent && (
          <ChatTuentiComponent
            buttonPosition="bottom-right"
            avatarSrc="https://assets.marioverdu.com/avatar/avatar-2.webp"
            botName="Mario Verdú"
            isMobile={isMobile}
          />
        )}
      </>

      {/* DISABLED: All cookie consent UI preserved but commented for future restoration */}
      {/* 
      {cookieConsent === true ? (
        // If cookies are accepted, show the Tuenti chat button and component
        <>
          {ChatButtonComponent ? (
            <ChatButtonComponent
              isOpen={isChatOpen}
              onClick={toggleChat}
              position="bottom-right"
              padding={{ bottom: 6, right: 6, left: 4, top: 4 }}
              colors={{
                background: "#3D5B6A",
                backgroundHover: "#2D4B5A",
                icon: "#FFFFFF",
              }}
              ariaLabel={isChatOpen ? "Close chat" : "Open chat"}
              isBlinking={false}
              isMobile={isMobile}
            />
          ) : (
            <button
              onClick={toggleChat}
              className="fixed z-50 bottom-6 right-6 w-10 h-10 rounded-full bg-[#3D5B6A] text-white flex items-center justify-center shadow-lg hover:bg-[#2D4B5A] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3D5B6A]"
              aria-label={isChatOpen ? "Close chat" : "Open chat"}
            >
              <span className="text-lg" role="img" aria-hidden="true">
                💬
              </span>
            </button>
          )}

          {isChatOpen && ChatTuentiComponent && (
            <ChatTuentiComponent
              buttonPosition="bottom-right"
              avatarSrc="https://assets.marioverdu.com/avatar/avatar-2.webp"
              botName="Mario Verdú"
              isMobile={isMobile}
            />
          )}
        </>
      ) : (
        // If cookies are not yet accepted, show the cookie consent UI
        <>
          <button
            onClick={toggleWidget}
            className="fixed z-50 bottom-6 right-6 w-10 h-10 rounded-full bg-[#3D5B6A] text-white flex items-center justify-center shadow-lg hover:bg-[#2D4B5A] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3D5B6A] transform translate-x-2 translate-y-2"
            aria-label={isOpen ? "Close cookie preferences" : "Open cookie preferences"}
          >
            <span className="text-lg" role="img" aria-hidden="true">
              🍪
            </span>
          </button>

          <div
            className={`fixed z-40 w-[384px] h-auto right-4 bottom-0 mb-20 transition-all duration-300 ease-in-out transform ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
            } translate-x-2 translate-y-2`}
            ref={widgetRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-consent-title"
            style={{
              boxSizing: "border-box",
              overflow: "auto",
              maxHeight: "calc(100vh - 120px)",
            }}
          >
            <div className="bg-white border border-[#e0e0e0] rounded-[12px] shadow-lg overflow-hidden">
              <div className="p-4">
                {!cookiesEnabled && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800 text-sm">
                    <p className="font-medium">Cookies desactivadas</p>
                    <p className="mt-1">
                      Tu navegador tiene las cookies desactivadas. Es posible que algunas funciones no estén
                      disponibles.
                    </p>
                  </div>
                )}

                {!showPreferences ? (
                  <>
                    <div className="flex flex-row items-center gap-2 mb-2 w-full">
                      <span className="text-[20px] leading-none" role="img" aria-hidden="true">
                        🍪
                      </span>
                      <h4
                        id="cookie-consent-title"
                        className="text-base font-medium text-[#2D3748] leading-normal m-0 p-0"
                      >
                        Usamos cookies para mejorar tu experiencia
                      </h4>
                    </div>

                    <p className="text-sm font-normal text-[#2D3748] leading-normal mb-3 p-0 w-full">
                      Al hacer clic en "Aceptar todas las cookies", permites el uso de cookies para análisis,
                      personalización y marketing. Puedes ajustar tus preferencias en "Configurar cookies".
                    </p>

                    <div className={`flex gap-2 w-full ${deviceType === "phone" ? "flex-col" : "flex-row flex-wrap"}`}>
                      <button
                        onClick={handleAcceptAll}
                        className="bg-[#3D5B6A] text-white border-none rounded-md py-2 px-3 text-sm font-normal leading-normal cursor-pointer transition-colors hover:bg-[#2D4B5A] focus:bg-[#2D4B5A] active:bg-[#264050] disabled:bg-[#8BA1AC] disabled:cursor-not-allowed text-center"
                      >
                        Aceptar todas las cookies
                      </button>

                      <button
                        onClick={handleRejectNonEssential}
                        className="bg-white text-[#333333] border border-[#dedede] rounded-md py-2 px-3 text-sm font-normal leading-normal cursor-pointer transition-colors hover:bg-[#f5f5f5] focus:bg-[#f5f5f5] active:bg-[#e8e8e8] disabled:bg-[#f9f9f9] disabled:text-[#999999] disabled:border-[#eeeeee] disabled:cursor-not-allowed text-center"
                      >
                        Rechazar cookies no esenciales
                      </button>

                      <button
                        onClick={handleShowPreferences}
                        className="bg-white text-[#333333] border border-[#dedede] rounded-md py-2 px-3 text-sm font-normal leading-normal cursor-pointer transition-colors hover:bg-[#f5f5f5] focus:bg-[#f5f5f5] active:bg-[#e8e8e8] disabled:bg-[#f9f9f9] disabled:text-[#999999] disabled:border-[#eeeeee] disabled:cursor-not-allowed text-center"
                      >
                        Configurar cookies
                      </button>
                    </div>

                    <div className="mt-3 w-full">
                      <p className="text-xs font-normal text-[#6B7280] leading-normal m-0 p-0">
                        Utilizamos cookies para mejorar tu experiencia de navegación, mostrar contenido personalizado, y
                        analizar el tráfico del sitio. Puedes elegir qué cookies aceptar y cambiar tus preferencias en
                        cualquier momento. Para más información, consulta nuestra
                        <a
                          href="/politica-privacidad"
                          className="text-[#2563EB] no-underline transition-all ml-1 hover:underline"
                        >
                          Política de Privacidad
                        </a>
                        .
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="px-0 py-0 bg-white">
                    <h3 className="text-lg font-semibold text-[#2D3748] mb-4">Preferencias de cookies</h3>

                    <p className="text-sm text-[#2D3748] mb-6">
                      Selecciona qué cookies deseas aceptar. Las cookies esenciales son necesarias para el
                      funcionamiento básico del sitio. Tu consentimiento será válido por 6 meses.
                    </p>

                    <div className="space-y-6">
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <div className="font-medium text-[#2D3748]">Cookies Esenciales</div>
                            <div className="text-xs text-[#6B7280]">Necesarias para el funcionamiento del sitio</div>
                          </div>
                          <div className="relative inline-flex items-center">
                            <div className="w-8 h-4 bg-[#3D5B6A] rounded-full"></div>
                            <div className="absolute left-4 w-4 h-4 bg-white rounded-full shadow"></div>
                          </div>
                        </div>
                        <div className="text-xs text-[#6B7280] mt-1 pl-1">
                          <p>Duración: Sesión / 7 días</p>
                          <p>Propósito: Autenticación, seguridad y funcionalidad básica</p>
                          <p>Datos compartidos: No se comparten con terceros</p>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <div className="font-medium text-[#2D3748]">Cookies Funcionales</div>
                            <div className="text-xs text-[#6B7280]">Mejoran la experiencia de usuario</div>
                          </div>
                          <div
                            className="relative inline-flex items-center cursor-pointer"
                            onClick={() => handleTogglePreference("functional")}
                          >
                            <div
                              className={`w-8 h-4 rounded-full transition-colors ${
                                preferences.functional ? "bg-[#3D5B6A]" : "bg-gray-300"
                              }`}
                            ></div>
                            <div
                              className={`absolute w-4 h-4 bg-white rounded-full shadow transition-transform ${
                                preferences.functional ? "left-4" : "left-0"
                              }`}
                            ></div>
                          </div>
                        </div>
                        <div className="text-xs text-[#6B7280] mt-1 pl-1">
                          <p>Duración: 1 año</p>
                          <p>Propósito: Recordar preferencias (tema, idioma, etc.)</p>
                          <p>Datos compartidos: No se comparten con terceros</p>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <div className="font-medium text-[#2D3748]">Cookies Analíticas</div>
                            <div className="text-xs text-[#6B7280]">Nos ayudan a mejorar el sitio</div>
                          </div>
                          <div
                            className="relative inline-flex items-center cursor-pointer"
                            onClick={() => handleTogglePreference("analytics")}
                          >
                            <div
                              className={`w-8 h-4 rounded-full transition-colors ${
                                preferences.analytics ? "bg-[#3D5B6A]" : "bg-gray-300"
                              }`}
                            ></div>
                            <div
                              className={`absolute w-4 h-4 bg-white rounded-full shadow transition-transform ${
                                preferences.analytics ? "left-4" : "left-0"
                              }`}
                            ></div>
                          </div>
                        </div>
                        <div className="text-xs text-[#6B7280] mt-1 pl-1">
                          <p>Duración: 90 días</p>
                          <p>Propósito: Análisis de uso y rendimiento del sitio</p>
                          <p>Datos compartidos: Procesados por nuestros proveedores de análisis</p>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <div className="font-medium text-[#2D3748]">Cookies de Marketing</div>
                            <div className="text-xs text-[#6B7280]">Para mostrar anuncios relevantes</div>
                          </div>
                          <div
                            className="relative inline-flex items-center cursor-pointer"
                            onClick={() => handleTogglePreference("marketing")}
                          >
                            <div
                              className={`w-8 h-4 rounded-full transition-colors ${
                                preferences.marketing ? "bg-[#3D5B6A]" : "bg-gray-300"
                              }`}
                            ></div>
                            <div
                              className={`absolute w-4 h-4 bg-white rounded-full shadow transition-transform ${
                                preferences.marketing ? "left-4" : "left-0"
                              }`}
                            ></div>
                          </div>
                        </div>
                        <div className="text-xs text-[#6B7280] mt-1 pl-1">
                          <p>Duración: 180 días</p>
                          <p>Propósito: Publicidad personalizada</p>
                          <p>Datos compartidos: Pueden compartirse con socios publicitarios</p>
                          <p>Transferencia internacional: Posible transferencia fuera de la UE</p>
                        </div>
                      </div>
                    </div>

                    <div className={`mt-6 flex gap-2 ${deviceType === "phone" ? "flex-col" : "flex-row"}`}>
                      <button
                        onClick={handleSavePreferences}
                        className="bg-[#3D5B6A] text-white border-none rounded-md py-2 px-3 text-sm font-normal leading-normal cursor-pointer transition-colors hover:bg-[#2D4B5A] focus:bg-[#2D4B5A] active:bg-[#264050] disabled:bg-[#8BA1AC] disabled:cursor-not-allowed text-center"
                      >
                        Guardar preferencias
                      </button>
                      <button
                        onClick={() => setShowPreferences(false)}
                        className="bg-white text-[#333333] border border-[#dedede] rounded-md py-2 px-3 text-sm font-normal leading-normal cursor-pointer transition-colors hover:bg-[#f5f5f5] focus:bg-[#f5f5f5] active:bg-[#e8e8e8] disabled:bg-[#f9f9f9] disabled:text-[#999999] disabled:border-[#eeeeee] disabled:cursor-not-allowed text-center"
                      >
                        Volver
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      */}

      {/* DISABLED: All styling preserved for future restoration */}
      <style jsx>{`
        div[role="dialog"] {
          width: 384px !important;
          min-width: 384px !important;
          max-width: 384px !important;
          box-sizing: border-box;
          overflow: auto;
        }
        
        /* Remove any responsive behavior */
        @media (max-width: 640px) {
          div[role="dialog"] {
            width: 384px !important;
            min-width: 384px !important;
            max-width: 384px !important;
            right: 16px;
            transform: translateX(2px) translateY(2px);
          }
        }
      `}</style>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { transform: translateY(20px); }
          to { transform: translateY(0); }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        .cookie-consent-exit {
          animation: fadeOut 0.2s ease-out forwards;
        }
        
        div[role="dialog"] {
          transition: all 0.3s ease-in-out;
          box-sizing: border-box;
          width: 384px !important;
          min-width: 384px !important;
          max-width: 384px !important;
          overflow: auto;
          max-height: calc(100vh - 120px);
        }
        
        /* Ensure content doesn't overflow */
        div[role="dialog"] > div {
          width: 100%;
          box-sizing: border-box;
        }
        
        /* Handle very small screens by ensuring the widget is still accessible */
        @media (max-width: 400px) {
          div[role="dialog"] {
            right: 0;
            transform: translateY(2px);
          }
        }
      `}</style>
    </>
  )
}

export default CookieConsentWidget
