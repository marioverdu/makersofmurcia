"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/ui/header"
import { ExternalLink } from "lucide-react"
import { Footer } from "@/components/footer"
import { EducationSection } from "@/components/education-section"
import { useRouter, usePathname } from "next/navigation"
import ChatTuentiButtonMaster from "@/components/chat-tuenti/chat-tueni-button-master"
import ChatTuentiMaster from "@/components/chat-tuenti/chat-tuenti-master"
import { ProfileCardWidescreens, ProfileCardPhone } from "@/components/profile-card"
import { HeaderTabs } from "@/components/ui/header/tabs"
import { HeaderContextualMenu } from "@/components/ui/header/header-contextual-menu"
import type { Locale } from "@/types/i18n"


// Componente mejorado para el divisor de línea de tiempo
function TimelineDivider({
  type,
  imageRef,
}: {
  type: "start" | "middle" | "end"
  imageRef: React.RefObject<HTMLDivElement>
}) {
  const dotRef = useRef<HTMLDivElement>(null)
  const lineTopRef = useRef<HTMLDivElement>(null)
  const lineBottomRef = useRef<HTMLDivElement>(null)

  // Estilo común para todos los dots para asegurar consistencia
  const dotStyle = "w-2 h-2 rounded-full flex-shrink-0 flex-grow-0 aspect-square z-10"

  // Efecto para ajustar la posición del dot y las líneas
  useEffect(() => {
    const updatePosition = () => {
      if (!imageRef.current || !dotRef.current) return

      // Obtener la posición de la imagen
      const imageRect = imageRef.current.getBoundingClientRect()
      const dotRect = dotRef.current.getBoundingClientRect()
      const parentRect = dotRef.current.parentElement?.getBoundingClientRect()

      if (!parentRect) return

      // Calcular la posición central de la imagen relativa al contenedor padre
      const imageCenterY = imageRect.top + imageRect.height / 2 - parentRect.top

      // Ajustar la posición del dot
      dotRef.current.style.top = `${imageCenterY}px`

      // Ajustar las líneas según el tipo
      if (type === "start") {
        if (lineBottomRef.current) {
          lineBottomRef.current.style.top = `${imageCenterY + dotRect.height / 2}px`
          lineBottomRef.current.style.height = `calc(100% - ${imageCenterY + dotRect.height / 2}px)`
        }
      } else if (type === "middle") {
        if (lineTopRef.current) {
          lineTopRef.current.style.height = `${imageCenterY - dotRect.height / 2}px`
        }
        if (lineBottomRef.current) {
          lineBottomRef.current.style.top = `${imageCenterY + dotRect.height / 2}px`
          lineBottomRef.current.style.height = `calc(100% - ${imageCenterY + dotRect.height / 2}px)`
        }
      } else if (type === "end") {
        if (lineTopRef.current) {
          lineTopRef.current.style.height = `${imageCenterY - dotRect.height / 2}px`
        }
      }
    }

    // Actualizar posición inicial
    updatePosition()

    // Actualizar en cambios de tamaño
    window.addEventListener("resize", updatePosition)

    // Actualizar cuando cambie el contenido
    const observer = new MutationObserver(updatePosition)
    if (imageRef.current?.parentElement) {
      observer.observe(imageRef.current.parentElement, {
        subtree: true,
        childList: true,
        characterData: true,
      })
    }

    // Limpiar event listener y observer
    return () => {
      window.removeEventListener("resize", updatePosition)
      observer.disconnect()
    }
  }, [imageRef, type])
  // CIERRO la función TimelineDivider correctamente
}

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
        {/* Contenido principal: avatar a la izquierda y tabs centradas */}
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
            <HeaderTabs className="mx-auto md:mx-0 justify-center md:justify-start" />
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
            <HeaderContextualMenu currentLang={lang} hidden={true} />
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
          width: 12px !important;
          background: transparent !important;
        }
        @media (min-width: 480px) {
          .header-blue-padding {
            width: 32px !important;
            background: transparent !important;
          }
        }
        @media (min-width: 768px) {
          .header-blue-padding {
            width: 32px !important;
            background: transparent !important;
          }
        }
        @media (min-width: 1024px) {
          .header-blue-padding {
            width: 32px !important;
            background: transparent !important;
          }
        }
        @media (min-width: 1280px) {
          .header-blue-padding {
            width: 32px !important;
            background: transparent !important;
          }
        }
        @media (min-width: 1536px) {
          .header-blue-padding {
            width: 32px !important;
            background: transparent !important;
          }
        }
      `}</style>
    </div>
  )
}

export default function WorkExperienceFixPage() {
  // TODOS los hooks deben ir aquí arriba
  const router = useRouter();
  const [maintenance, setMaintenance] = useState(false);
  const [isMobile, setIsMobile] = useState(false)
  const [isAvatarInHeader, setIsAvatarInHeader] = useState(false)
  const lang: Locale = 'es' // Por defecto en español

  const [showContextMenu, setShowContextMenu] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const [isContactButtonPressed, setIsContactButtonPressed] = useState(false)
  const timestamp = Date.now() // Timestamp para evitar caché
  // Estado y lógica para el chat Tuenti
  const [checkingVisibility, setCheckingVisibility] = useState(true)
  const [isChatOpen, setIsChatOpen] = useState(false);
  const toggleChat = () => setIsChatOpen((prev) => !prev);

  useEffect(() => {
    // Lógica de visibilidad de rutas para la prioridad
    const checkVisibility = async () => {
      setCheckingVisibility(true)
      let visibility: { [key: string]: boolean } = {}
      const localVisibilityRaw = typeof window !== "undefined" ? localStorage.getItem("routesVisibility") : null
      if (localVisibilityRaw) {
        try {
          visibility = JSON.parse(localVisibilityRaw)
        } catch {
          visibility = {}
        }
      } else {
        // Si no hay en localStorage, consulta la API
        try {
          const res = await fetch("/api/admin/routes")
          const data = await res.json()
          if (data && data.data && data.data.routes) {
            data.data.routes.forEach((route: any) => {
              visibility[route.path] = route.isVisible
            })
          }
        } catch {
          // Si falla la API, asume todo visible
          visibility = { "/": true, "/work-experience": true, "/posts": true }
        }
      }
      // Lógica de prioridad: /, /work-experience, /posts
      const priorities = ["/", "/work-experience", "/posts"]
      const current = "/work-experience"
      if (!visibility[current]) {
        // Buscar la siguiente ruta prioritaria activa
        const next = priorities.find((r) => r !== current && visibility[r])
        if (next) {
          router.replace(next)
        } else {
          setMaintenance(true)
        }
      }
      setCheckingVisibility(false)
    }
    checkVisibility()
  }, [router])

  // Añadir un nuevo useEffect para manejar el scroll y la transición del avatar
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Añadir el manejador de scroll para el efecto del avatar
    const handleScroll = () => {
      const scrollThreshold = 150
      setIsAvatarInHeader(window.scrollY > scrollThreshold)
    }

    window.addEventListener("scroll", handleScroll)

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Add effect to handle clicking outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        showContextMenu
      ) {
        setShowContextMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showContextMenu])

  // Add effect to close menu with Escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showContextMenu) {
        setShowContextMenu(false)
      }
    }

    document.addEventListener("keydown", handleEscKey)
    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [showContextMenu])

  // URLs de las imágenes con parámetro para evitar caché
  const unpressedButtonUrl = `https://assets.marioverdu.com/button/contact-button-blue/contact-button-unpressed.svg?t=${timestamp}`
  const pressedButtonUrl = `https://assets.marioverdu.com/button/contact-button-blue/contact-button-pressed.svg?t=${timestamp}`

  // El spinner debe ser lo primero que se retorna
  if (typeof window !== "undefined" && checkingVisibility) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-gray-800" style={{ width: 64, height: 64 }} />
      </div>
    )
  }
  if (maintenance) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Sitio en mantenimiento</h1>
        <p className="text-lg text-gray-600">Estamos realizando tareas de mantenimiento. Por favor, vuelve más tarde.</p>
      </div>
    )
  }

  return (
    <>
      <HeaderV2 isAvatarInHeader={isAvatarInHeader} lang={lang} />
      <div
        className="min-h-screen flex flex-col"
        style={{
          backgroundImage: "url('https://assets.marioverdu.com/bg/work-experience-bg.min.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <style jsx global>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-fadeIn {
            animation: fadeIn 0.2s ease-out forwards;
          }
        `}</style>

        <section className="mt-[40px]">
          {isMobile ? (
            <ProfileCardPhone />
          ) : (
            <ProfileCardWidescreens />
          )}
        </section>

        <section className="mt-0">
          <div className="flex justify-center items-start w-full relative px-4 md:px-[60px]">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start relative z-10 w-full max-w-[1092px] pt-0 pb-0 gap-8 mb-[72px]">
              <div className="flex flex-col gap-8 duplicated-column w-full md:max-w-[576px] pt-0 pl-0">
                {/* Sección "Sobre mí" - visible en todas las pantallas */}
                <div className="about-me flex flex-col w-full mb-8">
                  <h2 className="text-sm font-medium text-[hsl(var(--color-text))] mb-4">Sobre mí</h2>
                  <p className="text-sm font-normal" style={{ color: "#6C727F" }}>
                    Desde 2017 diseño, valido, itero y prototipo productos digitales limpios, vibrantes y funcionales
                    alineados con el negocio.
                  </p>
                </div>

                {/* Sección "Anclado" - solo visible en móvil */}
                <div className="flex flex-col w-full md:hidden mb-8">
                  <h2 className="text-sm font-medium text-[hsl(var(--color-text))] mb-4">Anclado</h2>
                  <a
                    href="https://linkedin.com/in/marioverdu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-normal text-gray-500 flex items-center hover:underline"
                  >
                    LinkedIn
                    <ExternalLink className="ml-1 inline" size={8} />
                  </a>
                </div>

                {/* Educación - Nueva sección */}
                <EducationSection className="mt-8 pb-6" />
              </div>

              <div className="hidden md:flex flex-col w-fit mt-0 right-0 mr-[44px] pl-0">
                <h2 className="text-sm font-medium text-[hsl(var(--color-text))] mb-4">Anclado</h2>
                <a
                  href="https://linkedin.com/in/marioverdu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-normal text-gray-500 flex items-center hover:underline"
                >
                  LinkedIn
                  <ExternalLink className="ml-1 inline" size={8} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        {/* Footer con ChatTuentiButtonMaster al final de la página */}
        <div style={{ width: '100%', height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 32 }}>
          <ChatTuentiButtonMaster isOpen={isChatOpen} onClick={toggleChat} />
        </div>
        <ChatTuentiMaster isOpen={isChatOpen} toggleChat={toggleChat} botName="Mario Verdú" isMobile={isMobile} />
      </div>
    </>
  )
}

