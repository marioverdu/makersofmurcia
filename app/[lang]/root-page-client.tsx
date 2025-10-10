"use client"

import { useState, useEffect, useRef } from "react"
import type { Locale } from "@/types/i18n"
import { HeaderTabs } from "@/components/ui/header/tabs"
import { useGlobalChat } from "@/contexts/global-chat-context"
import { useLanguage } from "@/contexts/language-context"
import { UnifiedPageLoading } from "@/components/ui/unified-page-loading"
import { VideoCover } from "@/components/video-cover"
import { MasterStackedImages } from "@/components/master-stacked-images"
import { RobustLayout } from "@/components/layout/robust-layout"
import { useRouteRedirection } from "@/hooks/use-route-redirection"

// HeaderV2: Header transparente con paddings laterales turquesa según breakpoint
function HeaderV2({ isAvatarInHeader, lang }: { isAvatarInHeader: boolean; lang: Locale }) {
  return (
    <div
      style={{
        width: '100%',
        height: '40px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'none',
        zIndex: 1000,
      }}
    >
      <div className="h-full flex" style={{ marginTop: '16px' }}>
        {/* Padding izquierdo transparente */}
        <div className="bg-transparent header-blue-padding" />
        {/* Contenido principal: avatar a la izquierda, tabs centradas y selector a la derecha */}
        <div className="flex-1 flex items-center justify-between relative custom-header-padding glass-bg">
          {/* Avatar alineado exactamente al borde izquierdo, con transición y aparición como en la home */}
          <div
            style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', paddingLeft: 8 }}
          >
            <img
              alt="Mario Verdú"
              width={28}
              height={28}
              className={`h-[28px] w-[28px] object-cover rounded-full ${isAvatarInHeader ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              src="https://assets.marioverdu.com/avatar/avatar-2.webp"
            />
          </div>
          {/* Tabs centradas absolutamente */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <HeaderTabs className="mx-auto md:mx-0 justify-center md:justify-start" lang={lang} />
          </div>
          {/* Selector de idioma al extremo derecho */}
          <div 
            className="language-container"
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              paddingRight: '8px',
              width: '44px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >

          </div>
        </div>
        {/* Padding derecho transparente */}
        <div className="bg-transparent header-blue-padding" />
      </div>
      <style jsx>{`
        @media (min-width: 480px) {
          .bg-cyan-400 {
            width: 32px !important;
            background: transparent !important;
          }
        }
        @media (min-width: 768px) {
          .bg-cyan-400 {
            width: 32px !important;
            background: transparent !important;
          }
        }
        @media (min-width: 1024px) {
          .bg-cyan-400 {
            width: 32px !important;
            background: transparent !important;
          }
        }
        @media (min-width: 1280px) {
          .bg-cyan-400 {
            width: 32px !important;
            background: transparent !important;
          }
        }
        @media (min-width: 1536px) {
          .bg-cyan-400 {
            width: 32px !important;
            background: transparent !important;
          }
        }
        .custom-header-padding {
          position: relative;
          padding-left: 0px;
          padding-right: 0px;
        }
        .glass-bg {
          background: rgba(255,255,255,0.3);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 12px;
          border: 1px solid rgba(0, 94, 182, 0.1);
        }
        .header-blue-padding {
          width: 12px;
        }
        @media (min-width: 480px) {
          .header-blue-padding {
            width: 32px;
          }
        }
        @media (min-width: 768px) {
          .header-blue-padding {
            width: 32px;
          }
        }
        @media (min-width: 1024px) {
          .header-blue-padding {
            width: 32px;
          }
        }
        @media (min-width: 1280px) {
          .header-blue-padding {
            width: 32px;
          }
        }
        @media (min-width: 1536px) {
          .header-blue-padding {
            width: 32px;
          }
        }
      `}</style>
    </div>
  )
}

interface RootPageClientProps {
  lang: Locale
}

export default function RootPageClient({ lang }: RootPageClientProps) {
  const [isAvatarInHeader, setIsAvatarInHeader] = useState(false)
  const { openChatWithMessage } = useGlobalChat()
  const { currentLanguage, isLoading: languageLoading } = useLanguage()
  
  // Usar el idioma del contexto si está disponible, sino el prop
  const displayLanguage = languageLoading ? lang : (currentLanguage || lang)
  
  console.log('🌍 [RootPageClient] Language detection:', {
    lang,
    currentLanguage,
    languageLoading,
    displayLanguage
  })
  
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const pageRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)
  const isMobileRef = useRef(false)
  
  // Hook de redirección centralizado (nota: Server Component ya protege, esto es redundante pero no afecta)
  const { isChecking: checkingVisibility, showMaintenance: maintenance } = useRouteRedirection('/[lang]', lang)

  // Avatar position state - static values to prevent layout shift
  const avatarLeftPosition = {
    xs: 16,
    sm: 24,
    md: 32,
    lg: 40,
    xl: 48,
    xxl: 56,
    mobile: 16,
    desktop: 40,
  }

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  useEffect(() => {
    // Set hydrated immediately after mount to prevent layout shift
    setIsHydrated(true)
    
    // Animation logic for text transition
    const timer = setTimeout(() => {
      setHasAnimated(true)
      setIsTransitioning(true)
    }, 2000)

    // Detectar si es un dispositivo móvil
    const checkIfMobile = () => {
      isMobileRef.current = window.innerWidth < 768
    }

    const handleScroll = () => {
      // Determinar cuándo el avatar debe moverse al header
      const scrollThreshold = 150
      setIsAvatarInHeader(window.scrollY > scrollThreshold)
    }

    // Initialize everything
    checkIfMobile()

    // Add event listeners
    window.addEventListener("resize", () => {
      checkIfMobile()
    })
    window.addEventListener("scroll", handleScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", () => {
        checkIfMobile()
      })
    }
  }, [])


  const getBreakpointPadding = () => {
    const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0

    if (windowWidth < 480) return avatarLeftPosition.xs
    if (windowWidth < 640) return avatarLeftPosition.sm
    if (windowWidth < 768) return avatarLeftPosition.md
    if (windowWidth < 1024) return avatarLeftPosition.lg
    if (windowWidth < 1280) return avatarLeftPosition.xl
    return avatarLeftPosition.xxl
  }

  // Show loading while not hydrated or checking visibility
  if (!isHydrated || checkingVisibility) {
    return <UnifiedPageLoading />
  }

  // Show maintenance if all routes are disabled
  if (maintenance) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sitio en mantenimiento</h1>
          <p className="text-gray-600">Estamos trabajando para mejorar tu experiencia. Vuelve pronto.</p>
        </div>
      </div>
    )
  }

  return (
    <RobustLayout
      className="pt-[40px]"
      backgroundImage="https://assets.marioverdu.com/bg/root-site.min.png"
    >
      {/* Header */}
      <HeaderV2 isAvatarInHeader={isAvatarInHeader} lang={displayLanguage} />

      {/* Claim section */}
      <div
        className="flex justify-center items-center w-full relative"
        style={{
          backgroundImage: "url('http://assets.marioverdu.com/bg/landing-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          marginTop: "-40px",
          paddingTop: "40px",
        }}
      >
        <div
          className="claim flex flex-col items-center md:items-center lg:items-start relative z-10 gap-[12px] md:gap-[16px] xl:gap-[24px] px-4 md:px-[60px] w-full max-w-[1092px] py-[60px]"
        >
          {/* Avatar image - fixed size 28x28px */}
          <div
            ref={avatarRef}
            className={`w-[28px] h-[28px] rounded-full overflow-hidden transition-opacity duration-300 ${isAvatarInHeader ? "opacity-0" : "opacity-100"} self-center md:self-center lg:self-start`}
          >
            <img
              src="https://assets.marioverdu.com/avatar/avatar-2.webp"
              alt="Avatar"
              width={28}
              height={28}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative overflow-hidden h-[24px] md:h-[30px] xl:h-[36px] w-full text-center md:text-center lg:text-left">
            {/* Primer texto - Se desvanece hacia arriba */}
            {!hasAnimated && (
              <p className="text-center md:text-center lg:text-left text-[16px] md:text-[20px] xl:text-[24px] absolute top-0 left-0 right-0 transition-all duration-800 ease-in-out translate-y-0 opacity-90 text-[hsl(var(--color-text))] font-thin">
                {displayLanguage === 'es' ? 'Equivócate rápido' : 'Fail fast'}
              </p>
            )}

            {/* Segundo texto - Aparece desde abajo */}
            <p
              className={`text-center md:text-center lg:text-left text-[16px] md:text-[20px] xl:text-[24px] absolute top-0 left-0 right-0 transition-all duration-800 ease-in-out text-[hsl(var(--color-text))] font-thin opacity-90 ${
                isTransitioning ? "translate-y-0 opacity-90" : "translate-y-full opacity-0"
              }`}
            >
              {displayLanguage === 'es' ? 'Trabaja inteligentemente no más' : 'Work smart, not hard'}
            </p>
          </div>
          <div className="text-text leading-tight w-full text-center md:text-center lg:text-left">
            <p className="text-center md:text-center lg:text-left text-[24px] md:text-[32px] xl:text-[44px] font-medium text-[hsl(var(--color-text))]">
              {displayLanguage === 'es' ? 'Diseño de producto digital' : 'Digital product design'}
            </p>
            <p className="text-center md:text-center lg:text-left text-[24px] md:text-[32px] xl:text-[44px] font-medium text-[hsl(var(--color-text))]">
              {displayLanguage === 'es' ? 'enfocado en tu visión de negocio' : 'focused on your business vision'}
            </p>
          </div>

        </div>
      </div>

      {/* Zig Zag Layout Section 1 */}
      <div className="flex justify-center items-center w-full relative">
        <div className="flex flex-col items-start relative z-10 gap-[16px] md:gap-[24px] xl:gap-[32px] px-4 md:px-[60px] w-full max-w-[1092px] py-[64px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[80px] xl:gap-[80px] items-center w-full">
            {/* Left side: Text content */}
            <div className="flex flex-col gap-[8px] md:gap-[12px] xl:gap-[16px] order-1 md:order-1">
              <span className="inline-block w-[16px] h-[20px] py-1 bg-[#E4F6F5] text-[hsl(206,1%,27%)] text-[12px] font-medium rounded-[6px] border border-[#c5e0df]"></span>
              <h2 className="text-[hsl(206,1%,27%)] leading-tight text-left text-[20px] md:text-[28px] xl:text-[28px]">
                {displayLanguage === 'es' ? 'Comprendo a tu usuario' : 'I understand your user'}
              </h2>
              <p className="text-[#6C727F] text-left text-[15.2px] font-normal">
                {displayLanguage === 'es' 
                  ? 'Exploro las necesidades de mi cliente, recopilo la documentación cuantitativa y cualitativa disponible, documento cada fase del proceso y alineo las necesidades del usuario y del cliente con ayuda de herramienas intelectuales (Análisis competitivo, bocetaje, flujos de usuario, etc)'
                  : 'I explore my client\'s needs, gather available quantitative and qualitative documentation, document each phase of the process and align user and client needs with the help of intellectual tools (competitive analysis, sketching, user flows, etc)'
                }
              </p>
            </div>

            {/* Right side: Image */}
            <VideoCover
              src="https://assets.marioverdu.com/landing/section-2.webm"
              containerClassName="order-2 md:order-2"
            />
          </div>
        </div>
      </div>

      {/* Zig Zag Layout Section 2 */}
      <div className="flex justify-center items-center w-full relative">
        <div className="flex flex-col items-start relative z-10 gap-[24px] md:gap-[32px] xl:gap-[40px] px-4 md:px-[60px] w-full max-w-[1092px] py-[64px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px] md:gap-[80px] xl:gap-[80px] items-center w-full">
            {/* Left side: Image (invertido respecto al layout anterior en desktop) */}
            <MasterStackedImages className="order-2 md:order-1" />

            {/* Right side: Text content (invertido respecto al layout anterior en desktop) */}
            <div className="flex flex-col gap-[8px] md:gap-[12px] xl:gap-[16px] order-1 md:order-2">
              <span className="inline-block w-[16px] h-[20px] py-1 bg-[#eff0ff] text-[hsl(206,1%,27%)] text-[12px] font-medium rounded-[6px] border border-[#D8D9F2]"></span>
              <h2 className="text-[hsl(206,1%,27%)] leading-tight text-left text-[20px] md:text-[28px] xl:text-[28px]">
                {displayLanguage === 'es' ? 'Defino y diseño soluciones' : 'I define and design solutions'}
              </h2>
              <p className="text-[#6C727F] text-left text-[15.2px] font-normal">
                {displayLanguage === 'es' 
                  ? 'Itero en comunicación continua y planteo un MVP componentizado en Diseño o código. Puesta en común de las debilidades y oportunidades del proyecto así como el enfoque estratégico a seguir en cuanto al alcance los entregables.'
                  : 'I iterate in continuous communication and propose a componentized MVP in Design or code. Sharing of project weaknesses and opportunities as well as the strategic approach to follow regarding the scope of deliverables.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Zig Zag Layout Section 3 */}
      <div className="flex justify-center items-center w-full relative">
        <div className="flex flex-col items-start relative z-10 gap-[16px] md:gap-[24px] xl:gap-[32px] px-4 md:px-[60px] w-full max-w-[1092px] py-[64px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[80px] xl:gap-[80px] items-center w-full">
            {/* Left side: Text content */}
            <div className="flex flex-col gap-[8px] md:gap-[12px] xl:gap-[16px] order-1 md:order-1">
              <span className="inline-block w-[16px] h-[20px] py-1 bg-[#ffebdc] text-[hsl(206,1%,27%)] text-[12px] font-medium rounded-[6px] border border-[#F2E4D8]"></span>
              <h2 className="text-[hsl(206,1%,27%)] leading-tight text-left text-[20px] md:text-[28px] xl:text-[28px]">
                {displayLanguage === 'es' ? 'Pruebo, optimizo y lanzo' : 'I test, optimize and launch'}
              </h2>
              <p className="text-[#6C727F] text-left text-[15.2px] font-normal">
                {displayLanguage === 'es' 
                  ? 'Reviso, componetizo y prototipo. Recopilación de feedback y refinamiento de las soluciones. Entrega del proyecto y de la documentación técnica, actualización de las librerías con las mejoras validadas.'
                  : 'I review, componentize and prototype. Feedback collection and solution refinement. Project delivery and technical documentation, library updates with validated improvements.'
                }
              </p>
            </div>

            {/* Right side: Image */}
            <VideoCover
              src="https://assets.marioverdu.com/webm/button-deploy.mov"
              containerClassName="order-2 md:order-2"
              style={{ transform: "scale(1.001)" }}
              type="deploy-button"
            />
          </div>
        </div>
      </div>

      {/* Sección de Contacto */}
      <div className="flex justify-center items-center w-full relative">
        <div className="flex flex-col items-start relative z-10 gap-[16px] md:gap-[24px] xl:gap-[32px] px-4 md:px-[60px] w-full max-w-[1092px] py-[64px]">
          <div 
            className="flex justify-between items-center relative py-[24px] px-6 xl:py-[24px] xl:px-6 rounded-[12px] backdrop-blur-md border border-white/40 w-full cursor-pointer bg-[rgba(242,248,255,0.7)]"
            onClick={(e) => {
              // Usar el contexto global para abrir el chat con mensaje
              openChatWithMessage(displayLanguage === 'es' ? "Contactar con Mario" : "Contact Mario")
            }}
          >
            <div className="absolute inset-0 rounded-[12px] overflow-hidden -z-10 pointer-events-none bg-[rgba(255,255,255,0.3)] backdrop-blur-md border border-[rgba(0,94,182,0.1)] shadow-[rgba(0,0,0,0.05)_0px_1px_3px]"></div>
            <h2 className="text-[hsl(206,1%,27%)] text-xl font-medium">
              {displayLanguage === 'es' ? '¿List@ para empezar?' : 'Ready to get started?'}
            </h2>
            <button 
              onClick={(e) => {
                e.stopPropagation()
                // Usar el contexto global para abrir el chat con mensaje
                openChatWithMessage(displayLanguage === 'es' ? "Contactar con Mario" : "Contact Mario")
              }}
              className="flex items-center justify-center bg-transparent border-none cursor-pointer p-0 hover:opacity-80 transition-opacity" 
              aria-label={displayLanguage === 'es' ? "Contactar con Mario" : "Contact Mario"}
            >
              <img src="https://assets.marioverdu.com/icon/go-to.svg" alt="Go to icon" width="16" height="16" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .header-blue-padding {
          background: linear-gradient(90deg, rgba(34, 211, 238, 0.1) 0%, rgba(34, 211, 238, 0.05) 50%, rgba(34, 211, 238, 0.1) 100%);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(34, 211, 238, 0.2);
          border-radius: 8px;
          margin: 0 8px;
          width: 24px;
        }
        .custom-header-padding {
          padding-left: 16px;
          padding-right: 16px;
        }
        .glass-bg {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 12px;
        }
        @media (min-width: 480px) {
          .header-blue-padding {
            width: 32px;
          }
          .custom-header-padding {
            padding-left: 24px;
            padding-right: 24px;
          }
        }
        @media (min-width: 768px) {
          .header-blue-padding {
            width: 40px;
          }
          .custom-header-padding {
            padding-left: 32px;
            padding-right: 32px;
          }
        }
        @media (min-width: 1024px) {
          .header-blue-padding {
            width: 48px;
          }
          .custom-header-padding {
            padding-left: 40px;
            padding-right: 40px;
          }
        }
        @media (min-width: 1280px) {
          .header-blue-padding {
            width: 56px;
          }
          .custom-header-padding {
            padding-left: 48px;
            padding-right: 48px;
          }
        }
        @media (min-width: 1536px) {
          .header-blue-padding {
            width: 64px;
          }
          .custom-header-padding {
            padding-left: 56px;
            padding-right: 56px;
          }
        }
      `}</style>
    </RobustLayout>
  )
}
