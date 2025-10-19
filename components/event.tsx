"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ProcessedEvent } from "@/lib/meetup-scraper"

interface PastEvent {
  id: string
  title: string
  organizer: {
    name: string
    avatar: string
    subtitle: string
  }
  image: string
  date: string
  description: string
  link: string
  attendees: number
  status: string
}


export default function Event() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [events, setEvents] = useState<PastEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar eventos al montar el componente
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Usar la API route para evitar problemas de CORS
        const response = await fetch('/api/meetup-events?group=makers-of-murcia&limit=6')
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (data.success) {
          console.log(`✅ Eventos cargados desde: ${data.source}`)
          setEvents(data.events)
        } else {
          console.warn(`⚠️ Usando datos de fallback: ${data.message}`)
          setEvents(data.events)
        }
        
      } catch (err) {
        console.error('Error cargando eventos:', err)
        setError('Error al cargar los eventos')
        
        // En caso de error, usar datos de ejemplo estáticos
        const fallbackEvents: ProcessedEvent[] = [
          {
            id: "288372238",
            title: "7º FERIA MAKER MURCIA 2022",
            organizer: {
              name: "Makers of Murcia",
              avatar: "👨‍💻",
              subtitle: "Comunidad Maker"
            },
            image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&crop=center",
            date: "5 nov 2022",
            description: "Séptima edición de la Feria Maker de Murcia con proyectos de robótica, electrónica e impresión 3D",
            link: "https://www.meetup.com/es-ES/makers-of-murcia/events/288372238/?eventOrigin=group_past_events",
            attendees: 13,
            status: "past"
          },
          {
            id: "2", 
            title: "6º FERIA MAKER MURCIA",
            organizer: {
              name: "Makers of Murcia",
              avatar: "👨‍🔬",
              subtitle: "Comunidad Maker"
            },
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop&crop=center",
            date: "27 nov 2021",
            description: "Sexta edición de la Feria Maker de Murcia con talleres y demostraciones",
            link: "https://www.meetup.com/es-ES/makers-of-murcia/events/",
            attendees: 30,
            status: "past"
          },
          {
            id: "3",
            title: "ASAMBLEA GENERAL 2021",
            organizer: {
              name: "Makers of Murcia",
              avatar: "👩‍💼",
              subtitle: "Comunidad Maker"
            },
            image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop&crop=center", 
            date: "28 may 2021",
            description: "Asamblea general anual de la comunidad Makers of Murcia",
            link: "https://www.meetup.com/es-ES/makers-of-murcia/events/",
            attendees: 10,
            status: "past"
          }
        ]
        setEvents(fallbackEvents)
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  const nextSlide = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.clientWidth || 400
      const gap = 16 // gap-4 = 16px
      const scrollAmount = cardWidth + gap
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const prevSlide = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.clientWidth || 400
      const gap = 16 // gap-4 = 16px
      const scrollAmount = cardWidth + gap
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-16 md:py-24 bg-secondary relative overflow-hidden">
      {/* Background effects */}

      <div className="relative z-10">
        {/* Section title */}
        <div className="relative mb-12">
          <h2 
            className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase text-center px-4 relative inline-block w-full"
            style={{ fontFamily: "Climate Crisis, cursive", color: "#1D1414 !important", WebkitTextFillColor: "#1D1414 !important" }}
          >
            EVENTOS ANTERIORES
            {/* Sombras desactivadas */}
            {/* <span
              className="absolute inset-0 -z-10"
              aria-hidden="true"
              style={{
                transform: "translate(5px, 5px)",
                fontFamily: "Climate Crisis, cursive",
                color: "#EC6918 !important",
                WebkitTextFillColor: "#EC6918 !important",
                opacity: 0.3
              }}
            >
              EVENTOS ANTERIORES
            </span>
            <span
              className="absolute inset-0 -z-20"
              style={{
                transform: "translate(-4px, -4px)",
                fontFamily: "Climate Crisis, cursive",
                color: "#EC6918 !important",
                WebkitTextFillColor: "#EC6918 !important",
                opacity: 0.4
              }}
              aria-hidden="true"
            >
              EVENTOS ANTERIORES
            </span> */}
          </h2>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            <span className="w-48 h-4 bg-primary  shadow-[4px_4px_0px_0px_var(--color-black)]" />
            <span className="w-48 h-4 bg-accent - shadow-[4px_4px_0px_0px_var(--color-black)]" />
          </div>
        </div>

        {/* Carousel */}
        <div className="relative max-w-7xl mx-auto px-2 md:px-4">
          {/* Navigation buttons */}
          <Button
            onClick={prevSlide}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-transparent hover:bg-transparent text-secondary shadow-[1px_1px_12px_rgba(0,0,0,0.08)] hover:shadow-[1px_1px_8px_rgba(0,0,0,0.12)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all -rotate-3"
            style={{ borderColor: "var(--color-black) !important", backgroundColor: "#FFF3EF !important" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left w-16 h-16">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Button>
          
          <Button
            onClick={nextSlide}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-transparent hover:bg-transparent text-secondary shadow-[1px_1px_12px_rgba(0,0,0,0.08)] hover:shadow-[1px_1px_8px_rgba(0,0,0,0.12)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all rotate-3"
            style={{ borderColor: "var(--color-black) !important", backgroundColor: "#FFF3EF !important" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right w-16 h-16">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>

          {/* Events carousel */}
          <div ref={carouselRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-4" style={{ scrollbarWidth: 'none' }}>
            {loading ? (
              // Estado de carga
              Array.from({ length: 3 }).map((_, index) => (
                <div 
                  key={`loading-${index}`}
                  className="flex-shrink-0 snap-start w-[80vw] md:w-[380px] lg:w-[400px] aspect-[4/3] relative"
                >
                  <div className="relative w-full h-full border-8 border-background bg-gray-200 animate-pulse overflow-hidden p-6 pb-8">
                    <div className="w-full h-32 mb-4 bg-gray-300 rounded-lg"></div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                      </div>
                    </div>
                    <div className="h-6 bg-gray-300 rounded mb-3"></div>
                    <div className="h-4 bg-gray-300 rounded mb-3"></div>
                    <div className="h-3 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))
            ) : error ? (
              // Estado de error
              <div className="flex-shrink-0 snap-start w-[80vw] md:w-[380px] lg:w-[400px] aspect-[4/3] relative">
                <div className="relative w-full h-full border-8 border-background bg-red-50 overflow-hidden p-6 pb-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-4">⚠️</div>
                    <p className="text-red-600 font-bold">Error al cargar eventos</p>
                    <p className="text-sm text-gray-600 mt-2">Mostrando datos de ejemplo</p>
                  </div>
                </div>
              </div>
            ) : (
              // Eventos cargados
              events.map((event, index) => (
              <div 
                key={event.id}
                className="flex-shrink-0 snap-start w-[80vw] md:w-[380px] lg:w-[400px] aspect-[4/3] relative group cursor-pointer"
              >
                <div 
                  className="relative w-full h-full border-8 border-background shadow-[10px_10px_0px_0px_var(--color-black)] group-hover:shadow-[5px_5px_0px_0px_var(--color-black)] group-hover:translate-x-[5px] group-hover:translate-y-[5px] transition-all duration-300 overflow-hidden bg-white p-6 pb-8"
                  style={{ transform: `rotate(${(index % 3 - 1) * 2}deg)`, backgroundColor: "var(--color-box)" }}
                >
                  {/* Event image */}
                  <div className="relative w-full h-32 mb-4 overflow-hidden rounded-lg">
                    <img 
                      alt={event.title}
                      className="w-full h-full object-cover"
                      src={event.image}
                      style={{ filter: "contrast(1.3) saturate(1.4) brightness(0.9)" }}
                      onError={(e) => {
                        // Fallback a imagen por defecto si falla la carga
                        const target = e.target as HTMLImageElement
                        target.src = '/placeholder.jpg'
                      }}
                      loading="lazy"
                    />
                  </div>

                  {/* Organizer info */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">{event.organizer.avatar}</div>
                    <div>
                      <h3 className="font-bold text-lg text-secondary" style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif" }}>
                        {event.organizer.name}
                      </h3>
                      <p className="text-sm text-gray-600">{event.organizer.subtitle}</p>
                    </div>
                  </div>

                  {/* Event title and button */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h4 className="text-xl font-bold uppercase text-secondary flex-1" style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif" }}>
                      {event.title}
                    </h4>
                    <a 
                      href={event.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white font-bold uppercase py-1 px-3 shadow-[3px_3px_0px_0px_var(--color-black)] hover:shadow-[1px_1px_0px_0px_var(--color-black)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-200 text-xs whitespace-nowrap"
                      style={{ backgroundColor: "#DB3828" }}
                    >
                      VER EVENTO
                    </a>
                  </div>

                  {/* Event date and attendees */}
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-bold text-primary">{event.date}</p>
                    <p className="text-xs text-gray-600">
                      👥 {event.attendees} asistentes
                    </p>
                  </div>

                  {/* Event description */}
                  <p className="text-sm text-gray-700 leading-relaxed">{event.description}</p>

                  {/* Decorative elements */}
                  <div className="absolute -top-3 left-12 w-20 h-8 bg-accent/50 border-2 border-accent/70  shadow-[2px_2px_4px_var(--color-black)]" />
                  <div className="absolute top-0 left-0 w-0 h-0 border-t-[30px] border-t-primary border-r-[30px] border-r-transparent" />
                  <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[30px] border-b-primary border-l-[30px] border-l-transparent" />
                </div>
              </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
