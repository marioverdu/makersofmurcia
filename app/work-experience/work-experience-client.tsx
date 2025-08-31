"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

import { ExternalLink } from "lucide-react"
import { UnifiedLoading } from "@/components/ui/unified-loading"
import { Footer } from "@/components/footer"
import { EducationSection } from "@/components/education-section"
import { WorkExperienceSection } from "@/components/work-experience-section"
import { useRouter, usePathname } from "next/navigation"
import ChatTuentiButtonMaster from "@/components/chat-tuenti/chat-tuenti-button-master"
import ChatTuentiMaster from "@/components/chat-tuenti/chat-tuenti-master"
import { ProfileCardWidescreens, ProfileCardPhone } from "@/components/profile-card"
import { AnalyticsTracker } from "@/components/analytics-tracker"
import type { Locale, Dictionary } from "@/types/i18n"

// Importar el hook real
import { useAdminAuth } from "@/hooks/use-admin-auth"

// Interfaces para los tipos de datos
interface AboutMe {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface WorkExperience {
  id: number;
  company_name: string;
  job_title: string;
  year: string;
  description: string;
  detailed_content: string;
  logo_url: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

interface PortfolioProject {
  id: number;
  project_name: string;
  job_title: string;
  year: string;
  description: string;
  detailed_content: string;
  logo_url: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

interface Education {
  id: number;
  institution_name: string;
  degree_title: string;
  year: string;
  description: string;
  detailed_content: string;
  logo_url: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

interface WorkExperienceData {
  aboutMe: AboutMe | null;
  workExperience: WorkExperience[];
  portfolioProjects: PortfolioProject[];
  education: Education[];
}

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

  return (
    <div className="relative flex flex-col items-center h-full">
      {/* Línea superior */}
      {type !== "start" && (
        <div
          ref={lineTopRef}
          className="w-px bg-gray-300 absolute top-0"
          style={{ height: "0px" }}
        />
      )}

      {/* Dot central */}
      <div
        ref={dotRef}
        className={`${dotStyle} bg-gray-400 absolute`}
        style={{ top: "0px" }}
      />

      {/* Línea inferior */}
      {type !== "end" && (
        <div
          ref={lineBottomRef}
          className="w-px bg-gray-300 absolute"
          style={{ top: "0px", height: "0px" }}
        />
      )}
    </div>
  )
}

interface WorkExperienceClientProps {
  lang?: Locale
  dict?: Dictionary
}

export default function WorkExperienceClient({ lang = 'es', dict }: WorkExperienceClientProps) {
  // TODOS los hooks deben ir aquí arriba
  const router = useRouter();
  const [maintenance, setMaintenance] = useState(false);
  const [isMobile, setIsMobile] = useState(false)

  const [showContextMenu, setShowContextMenu] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const [isContactButtonPressed, setIsContactButtonPressed] = useState(false)
  const timestamp = Date.now() // Timestamp para evitar caché
  // Estado y lógica para el chat Tuenti
  const [isHydrated, setIsHydrated] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false);
  const toggleChat = () => setIsChatOpen((prev) => !prev);
  
  // Estados para edición
  const { isAdmin } = useAdminAuth()
  const [isEditing, setIsEditing] = useState(false)
  
  // Estados para datos de work experience
  const [workExperienceData, setWorkExperienceData] = useState<WorkExperienceData>({
    aboutMe: null,
    workExperience: [],
    portfolioProjects: [],
    education: []
  })
  const [dataLoading, setDataLoading] = useState(true)
  const [dataError, setDataError] = useState<string | null>(null)
  
  // Estado para manejar el loading de guardado
  const [isSaving, setIsSaving] = useState(false)
  
  // Estado para rastrear cambios pendientes en todas las cards
  const [pendingChanges, setPendingChanges] = useState<Map<string, any>>(new Map())
  const [hasPendingChanges, setHasPendingChanges] = useState(false)
  
  // Estado para el progreso de guardado
  const [saveProgress, setSaveProgress] = useState({
    current: 0,
    total: 0,
    currentCard: '',
    currentField: '',
    status: 'idle' as 'idle' | 'processing' | 'completed' | 'error',
    errors: [] as string[],
    changesSummary: ''
  })
  
  // URLs de las imágenes con parámetro para evitar caché
  const unpressedButtonUrl = `https://assets.marioverdu.com/button/contact-button-blue/contact-button-unpressed.svg?t=${timestamp}`
  const pressedButtonUrl = `https://assets.marioverdu.com/button/contact-button-blue/contact-button-pressed.svg?t=${timestamp}`

  // Función para cargar datos desde la API
  const fetchData = async () => {
    try {
      setDataLoading(true)
      setDataError(null)
      
      const response = await fetch('/api/work-experience')
      const result = await response.json()
      
      if (result.success) {
        setWorkExperienceData(result.data)
      } else {
        setDataError(result.error || 'Error al cargar los datos')
      }
    } catch (err) {
      console.error('Error fetching work experience data:', err)
      setDataError('Error de conexión')
    } finally {
      setDataLoading(false)
    }
  }

  // Función para actualizar datos
  const updateData = async (cardType: string, id: number, field: string, value: string) => {
    try {
      const response = await fetch('/api/work-experience/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          cardType,
          fields: {
            [field]: value
          }
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        // Recargar los datos para obtener la versión actualizada
        await fetchData()
        return { success: true }
      } else {
        throw new Error(result.error || 'Error al actualizar')
      }
    } catch (err) {
      console.error('Error updating data:', err)
      return { success: false, error: err instanceof Error ? err.message : 'Error desconocido' }
    }
  }

  // Función para registrar cambios en una card
  const registerCardChange = (cardId: string, cardData: any) => {
    setPendingChanges(prev => {
      const newChanges = new Map(prev)
      newChanges.set(cardId, cardData)
      return newChanges
    })
    setHasPendingChanges(true)
  }

  // Función para limpiar cambios de una card específica
  const clearCardChanges = (cardId: string) => {
    setPendingChanges(prev => {
      const newChanges = new Map(prev)
      newChanges.delete(cardId)
      return newChanges
    })
    
    // Verificar si aún hay cambios pendientes
    setPendingChanges(prev => {
      const hasChanges = prev.size > 0
      setHasPendingChanges(hasChanges)
      return prev
    })
  }

  // Función para limpiar todos los cambios
  const clearAllChanges = () => {
    setPendingChanges(new Map())
    setHasPendingChanges(false)
  }

  // Función para detectar todos los cambios pendientes
  const detectAllPendingChanges = (): Array<{ cardId: string; cardData: any }> => {
    const changes: Array<{ cardId: string; cardData: any }> = []
    pendingChanges.forEach((cardData, cardId) => {
      changes.push({ cardId, cardData })
    })
    return changes
  }

  // Función para procesar todos los cambios secuencialmente
  const processAllChanges = async (cardsToUpdate: Array<{ cardId: string; cardData: any }>): Promise<{ success: boolean; errors: string[] }> => {
    const errors: string[] = []
    
    // Generar resumen de cambios
    const totalFields = cardsToUpdate.reduce((total, card) => {
      return total + Object.keys(card.cardData.fields || {}).length
    }, 0)
    
    const changesSummary = cardsToUpdate.length === 1 
      ? `1 card con ${totalFields} campo${totalFields > 1 ? 's' : ''}`
      : `${cardsToUpdate.length} cards con ${totalFields} campo${totalFields > 1 ? 's' : ''} en total`
    
    setSaveProgress({
      current: 0,
      total: totalFields,
      currentCard: '',
      currentField: '',
      status: 'processing',
      errors: [],
      changesSummary
    })

    let processedFields = 0

    for (let i = 0; i < cardsToUpdate.length; i++) {
      const { cardId, cardData } = cardsToUpdate[i]
      const cardName = cardData.company_name || cardData.institution_name || cardData.project_name || `Card ${cardData.id}`
      const fields = cardData.fields || {}
      const fieldNames = Object.keys(fields)
      
      setSaveProgress(prev => ({
        ...prev,
        currentCard: cardName,
        currentField: '',
        status: 'processing'
      }))

      console.log(`🔄 Procesando card ${i + 1}/${cardsToUpdate.length}: ${cardName} (${fieldNames.length} campos)`)

      // Procesar cada campo de la card
      for (let j = 0; j < fieldNames.length; j++) {
        const fieldName = fieldNames[j]
        const fieldValue = fields[fieldName]
        
        processedFields++
        
        setSaveProgress(prev => ({
          ...prev,
          current: processedFields,
          currentField: `${fieldName}: ${String(fieldValue).substring(0, 30)}${String(fieldValue).length > 30 ? '...' : ''}`,
          status: 'processing'
        }))

        console.log(`  📝 Procesando campo ${j + 1}/${fieldNames.length}: ${fieldName} = "${fieldValue}"`)

        try {
          const response = await fetch('/api/work-experience/update', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: cardData.id,
              cardType: cardData.cardType,
              fields: { [fieldName]: fieldValue }
            })
          })
          
          const result = await response.json()
          
          if (!result.success) {
            const errorMsg = `Error en ${cardName} - ${fieldName}: ${result.error}`
            errors.push(errorMsg)
            console.error(errorMsg)
            
            setSaveProgress(prev => ({
              ...prev,
              errors: [...prev.errors, errorMsg]
            }))
          } else {
            console.log(`✅ Campo ${fieldName} de ${cardName} procesado correctamente`)
          }

          // Pequeña pausa entre campos para no sobrecargar la base de datos
          await new Promise(resolve => setTimeout(resolve, 100))
          
        } catch (error) {
          const errorMsg = `Error inesperado en ${cardName} - ${fieldName}: ${error instanceof Error ? error.message : 'Error desconocido'}`
          errors.push(errorMsg)
          console.error(errorMsg)
          
          setSaveProgress(prev => ({
            ...prev,
            errors: [...prev.errors, errorMsg]
          }))
        }
      }

      // Limpiar cambios registrados para esta card
      clearCardChanges(cardId)

      // Pausa entre cards
      await new Promise(resolve => setTimeout(resolve, 200))
    }

    const success = errors.length === 0

    setSaveProgress(prev => ({
      ...prev,
      status: success ? 'completed' : 'error',
      current: totalFields,
      currentCard: '',
      currentField: ''
    }))

    return { success, errors }
  }

  // Funciones para manejar la edición
  const handleUpdateCompanyName = (value: string) => {
    console.log('Actualizando nombre de empresa:', value)
  }

  const handleUpdateJobTitle = (value: string) => {
    console.log('Actualizando título de trabajo:', value)
  }

  const handleUpdateYear = (value: string) => {
    console.log('Actualizando año:', value)
  }

  const handleUpdateDescription = (value: string) => {
    console.log('Actualizando descripción:', value)
  }

  const handleUpdateDetailedContent = (value: string) => {
    console.log('Actualizando contenido detallado:', value)
  }

  // Función para manejar cambios en cards
  const handleCardChanged = (cardId: number, hasChanges: boolean, cardData?: any) => {
    if (hasChanges && cardData) {
      const cardName = cardData.company_name || cardData.institution_name || cardData.project_name || `Card ${cardId}`
      const cardType = cardData.cardType || 'work_experience'
      const cardIdString = `${cardType}_${cardId}`
      
      // Registrar el cambio
      const fields: { [key: string]: any } = {}
      
      if (cardData.company_name !== undefined) {
        fields.company_name = cardData.company_name
      }
      if (cardData.job_title !== undefined) {
        fields.job_title = cardData.job_title
      }
      if (cardData.institution_name !== undefined) {
        fields.institution_name = cardData.institution_name
      }
      if (cardData.degree_title !== undefined) {
        fields.degree_title = cardData.degree_title
      }
      if (cardData.year !== undefined) {
        fields.year = cardData.year
      }
      if (cardData.description !== undefined) {
        fields.description = cardData.description
      }
      if (cardData.detailed_content !== undefined) {
        fields.detailed_content = cardData.detailed_content
      }

      if (Object.keys(fields).length > 0) {
        registerCardChange(cardIdString, {
          ...cardData,
          fields
        })
        console.log(`📝 Cambio registrado para ${cardName}:`, fields)
      }
    }
  }

  // Función para guardar una card individual (ahora guarda todos los cambios pendientes)
  const handleSaveCard = async (cardData: any) => {
    if (!cardData.id || !cardData.cardType) {
      console.error('❌ Datos de card incompletos para guardar')
      return
    }

    console.log('💾 Iniciando guardado de card:', cardData.id, cardData.cardType)
    setIsSaving(true)

    try {
      // Detectar todos los cambios pendientes
      const allPendingChanges = detectAllPendingChanges()
      
      if (allPendingChanges.length === 0) {
        console.log('ℹ️ No hay cambios pendientes para guardar')
        setIsSaving(false)
        return
      }

      console.log(`🔄 Detectados ${allPendingChanges.length} cards con cambios pendientes`)
      
      // Procesar todos los cambios secuencialmente
      const result = await processAllChanges(allPendingChanges)
      
      if (result.success) {
        console.log('✅ Todos los cambios guardados correctamente')
        // Recargar los datos para mostrar los cambios
        await fetchData()
        // Limpiar todos los cambios pendientes
        clearAllChanges()
      } else {
        console.error('❌ Error al guardar cambios:', result.errors)
      }
    } catch (error) {
      console.error('❌ Error inesperado al guardar card:', error)
    } finally {
      setIsSaving(false)
      setSaveProgress({
        current: 0,
        total: 0,
        currentCard: '',
        currentField: '',
        status: 'idle',
        errors: [],
        changesSummary: ''
      })
    }
  }

  useEffect(() => {
    // Lógica de visibilidad de rutas para la prioridad
    const checkVisibility = async () => {
      // Inicializar hidratación
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
      // Usar la ruta actual en lugar de hardcodear /work-experience
      const current = typeof window !== "undefined" ? window.location.pathname : "/work-experience"
      if (!visibility[current]) {
        // Buscar la siguiente ruta prioritaria activa
        const next = priorities.find((r) => r !== current && visibility[r])
        if (next) {
          router.replace(next)
        } else {
          setMaintenance(true)
        }
      }
      setIsHydrated(true)
    }
    checkVisibility()
  }, [router])

  // Añadir un nuevo useEffect para manejar el scroll y la transición del avatar
  useEffect(() => {
    // Detectar si es móvil inmediatamente
    setIsMobile(window.innerWidth < 768)

    // Añadir el manejador de scroll para el efecto del avatar
    const handleScroll = () => {
      const scrollThreshold = 150
      
    }

    // Añadir listener de resize solo para móvil
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("resize", handleResize)
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

  // Escuchar evento para activar modo de edición
  useEffect(() => {
    const handleActivateEdit = (event: CustomEvent) => {
      setIsEditing(event.detail.isEditing)
    }

    window.addEventListener("activateWorkExperienceEdit", handleActivateEdit as EventListener)
    return () => {
      window.removeEventListener("activateWorkExperienceEdit", handleActivateEdit as EventListener)
    }
  }, [])

  // Cargar datos al montar el componente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchData()
    }
  }, [])

  // Set hydrated immediately after mount
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Loading state para datos de work experience
  if (dataLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
        <div className="text-center">
          <UnifiedLoading size={32} />
          <p className="mt-3 text-gray-500 text-xs">Actualizando datos...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (dataError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Error al cargar el contenido</h1>
        <p className="text-lg text-gray-600 mb-4">{dataError}</p>
        <button 
          onClick={() => window.location.reload()} 
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
        >
          Recargar página
        </button>
      </div>
    )
  }

  // Show loading while not hydrated
  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <UnifiedLoading size={48} />
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
      <AnalyticsTracker 
        trackPerformance={true}
        trackScroll={true}
        customEvents={[
          {
            selector: 'a[data-track="linkedin"]',
            event: 'click',
            category: 'social',
            label: 'linkedin_click'
          },
          {
            selector: 'a[data-track="download"]',
            event: 'click',
            category: 'engagement',
            label: 'cv_download'
          },
          {
            selector: 'button[data-track="contact"]',
            event: 'click',
            category: 'conversion',
            label: 'contact_button_click'
          }
        ]}
      />

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
                  <h2 className="text-sm font-medium text-[hsl(var(--color-text))] mb-4">
                    {workExperienceData.aboutMe?.title || 'Sobre mí'}
                  </h2>
                  <p className="text-sm font-normal" style={{ color: "#6C727F" }}>
                    {workExperienceData.aboutMe?.description || 'Cargando...'}
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

                {/* Experiencia Laboral */}
                <WorkExperienceSection 
                  className="mt-8 pb-6" 
                  workExperienceData={workExperienceData.workExperience}
                  isEditing={isEditing}
                  onUpdateCompanyName={handleUpdateCompanyName}
                  onUpdateJobTitle={handleUpdateJobTitle}
                  onUpdateYear={handleUpdateYear}
                  onUpdateDescription={handleUpdateDescription}
                  onUpdateDetailedContent={handleUpdateDetailedContent}
                  onSaveCard={handleSaveCard}
                  onCardChanged={handleCardChanged}
                />

                {/* Educación - Nueva sección */}
                <EducationSection 
                  className="mt-8 pb-6" 
                  educationData={workExperienceData.education}
                  isEditing={isEditing}
                  onUpdateCompanyName={handleUpdateCompanyName}
                  onUpdateJobTitle={handleUpdateJobTitle}
                  onUpdateYear={handleUpdateYear}
                  onUpdateDescription={handleUpdateDescription}
                  onUpdateDetailedContent={handleUpdateDetailedContent}
                  onSaveCard={handleSaveCard}
                  onCardChanged={handleCardChanged}
                />
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
        
        {/* Indicador de progreso de guardado */}
        {isEditing && isSaving && (
          <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
            <div className="flex flex-col gap-3">
              {/* Indicador de progreso de guardado */}
              <div className="flex items-center gap-2">
                <UnifiedLoading />
                <span className="text-sm font-medium text-gray-600">
                  {saveProgress.status === 'processing' ? 'Guardando cambios...' : 
                   saveProgress.status === 'completed' ? '✅ Cambios guardados' :
                   saveProgress.status === 'error' ? '❌ Error al guardar' : 'Preparando...'}
                </span>
              </div>
              
              {/* Barra de progreso */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${saveProgress.total > 0 ? (saveProgress.current / saveProgress.total) * 100 : 0}%` }}
                ></div>
              </div>
              
              {/* Información de progreso */}
              <div className="text-xs text-gray-600">
                <div>Progreso: {saveProgress.total > 0 ? Math.round((saveProgress.current / saveProgress.total) * 100) : 0}%</div>
                {saveProgress.currentCard && (
                  <div className="mt-1">Card actual: {saveProgress.currentCard}</div>
                )}
                {saveProgress.currentField && (
                  <div className="mt-1">Campo: {saveProgress.currentField}</div>
                )}
                {saveProgress.changesSummary && (
                  <div className="mt-1">{saveProgress.changesSummary}</div>
                )}
              </div>
              
              {/* Errores si los hay */}
              {saveProgress.errors.length > 0 && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                  <div className="text-xs font-medium text-red-700 mb-1">Errores:</div>
                  {saveProgress.errors.slice(0, 3).map((error, index) => (
                    <div key={index} className="text-xs text-red-600">• {error}</div>
                  ))}
                  {saveProgress.errors.length > 3 && (
                    <div className="text-xs text-red-600">... y {saveProgress.errors.length - 3} más</div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Indicador de cambios pendientes (solo cuando no se está guardando) */}
        {isEditing && hasPendingChanges && !isSaving && (
          <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-600">
                  {pendingChanges.size} cambio(s) pendiente(s)
                </span>
              </div>
              
              {/* Lista de cards con cambios */}
              {Array.from(pendingChanges.values()).slice(0, 3).map((cardData, index) => (
                <div key={index} className="mb-1 flex items-center gap-2">
                  <span className="text-orange-500">•</span>
                  <span className="flex-1 text-xs">
                    {cardData.company_name || cardData.institution_name || cardData.job_title || cardData.degree_title || `Card ${cardData.id}`}
                  </span>
                  <span className="text-xs text-gray-400">
                    {cardData.cardType === 'work_experience' ? '💼' : '🎓'}
                  </span>
                </div>
              ))}
              {pendingChanges.size > 3 && (
                <div className="text-xs text-gray-500">... y {pendingChanges.size - 3} más</div>
              )}
            </div>
          </div>
        )}

        {/* Botón de prueba para forzar detección (solo en modo edición) */}
        {/* Este botón ya no es necesario en el nuevo flujo */}
        {/* {isEditing && !isSaving && (
          <div className="fixed bottom-4 left-4 z-50">
            <button
              onClick={() => {
                console.log('🔍 Botón de prueba - Forzando detección de cambios...')
                forceDetectChanges()
              }}
              className="px-3 py-2 bg-green-500 text-white text-xs font-medium rounded-md hover:bg-green-600 transition-colors"
            >
              🔍 Detectar
            </button>
          </div>
        )} */}
      </div>
    </>
  )
}

