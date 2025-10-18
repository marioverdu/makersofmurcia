"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"

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
}

const pastEvents: PastEvent[] = [
  {
    id: "1",
    title: "Taller de Arduino Básico",
    organizer: {
      name: "María García",
      avatar: "👩‍💻",
      subtitle: "Ingeniera Electrónica"
    },
    image: "/asset/event/event1.jpg",
    date: "15 Oct 2024",
    description: "Aprende los fundamentos de Arduino y crea tu primer proyecto"
  },
  {
    id: "2", 
    title: "Meetup: Impresión 3D",
    organizer: {
      name: "Carlos Ruiz",
      avatar: "👨‍🔬",
      subtitle: "Diseñador Industrial"
    },
    image: "/asset/event/event2.jpg",
    date: "22 Oct 2024",
    description: "Explora las posibilidades de la impresión 3D en proyectos maker"
  },
  {
    id: "3",
    title: "Workshop: Soldadura",
    organizer: {
      name: "Ana López",
      avatar: "👩‍🔧",
      subtitle: "Técnica en Electrónica"
    },
    image: "/asset/event/event3.jpg", 
    date: "29 Oct 2024",
    description: "Técnicas profesionales de soldadura para proyectos electrónicos"
  },
  {
    id: "4",
    title: "Charla: IoT y Smart Cities",
    organizer: {
      name: "David Martín",
      avatar: "👨‍💼",
      subtitle: "IoT Specialist"
    },
    image: "/asset/event/event4.jpg",
    date: "5 Nov 2024", 
    description: "Cómo la tecnología IoT está transformando las ciudades"
  },
  {
    id: "5",
    title: "Hackathon Maker",
    organizer: {
      name: "Laura Sánchez",
      avatar: "👩‍🎨",
      subtitle: "UX Designer"
    },
    image: "/asset/event/event5.jpg",
    date: "12 Nov 2024",
    description: "48 horas para crear el proyecto maker más innovador"
  },
  {
    id: "6",
    title: "Taller: Programación Python",
    organizer: {
      name: "Roberto Vega",
      avatar: "👨‍💻",
      subtitle: "Software Developer"
    },
    image: "/asset/event/event6.jpg",
    date: "19 Nov 2024",
    description: "Python aplicado a proyectos maker y automatización"
  }
]

export default function Event() {
  const carouselRef = useRef<HTMLDivElement>(null)

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
      <div 
        className="absolute inset-0 opacity-10" 
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 15px, white 15px, white 16px), repeating-linear-gradient(-45deg, transparent, transparent 15px, white 15px, white 16px)`
        }}
      />
      <div className="absolute inset-0 opacity-10 halftone-bg" />
      <div className="absolute top-10 left-10 w-40 h-40 border-8 border-primary rotate-45 opacity-30" />
      <div className="absolute bottom-10 right-10 w-48 h-48 border-8 border-accent -rotate-12 opacity-30" />
      <div className="absolute top-1/2 left-20 w-32 h-32 bg-primary opacity-20 rotate-12" />

      <div className="relative z-10">
        {/* Section title */}
        <div className="relative mb-12">
          <h2 
            className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase text-center text-stroke px-4 relative inline-block w-full"
            style={{ fontFamily: "Climate Crisis, cursive" }}
          >
            EVENTOS ANTERIORES
            <span 
              className="absolute inset-0 text-primary opacity-50 -z-10" 
              aria-hidden="true" 
              style={{ transform: "translate(5px, 5px)", fontFamily: "Climate Crisis, cursive" }}
            >
              EVENTOS ANTERIORES
            </span>
          </h2>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            <span className="w-48 h-4 bg-primary rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]" />
            <span className="w-48 h-4 bg-accent -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]" />
          </div>
        </div>

        {/* Carousel */}
        <div className="relative max-w-7xl mx-auto px-2 md:px-4">
          {/* Navigation buttons */}
          <Button
            onClick={prevSlide}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-primary hover:bg-primary/90 border-4 border-background shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all -rotate-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left w-8 h-8">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Button>
          
          <Button
            onClick={nextSlide}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-primary hover:bg-primary/90 border-4 border-background shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all rotate-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right w-8 h-8">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>

          {/* Events carousel */}
          <div ref={carouselRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-4" style={{ scrollbarWidth: 'none' }}>
            {pastEvents.map((event, index) => (
              <div 
                key={event.id}
                className="flex-shrink-0 snap-start w-[80vw] md:w-[380px] lg:w-[400px] aspect-[4/3] relative group cursor-pointer"
              >
                <div 
                  className="relative w-full h-full border-8 border-background shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[5px] group-hover:translate-y-[5px] transition-all duration-300 overflow-hidden bg-white p-6 pb-8"
                  style={{ transform: `rotate(${(index % 3 - 1) * 2}deg)` }}
                >
                  {/* Event image */}
                  <div className="relative w-full h-32 mb-4 overflow-hidden rounded-lg">
                    <img 
                      alt={event.title}
                      className="w-full h-full object-cover"
                      src={event.image}
                      style={{ filter: "contrast(1.3) saturate(1.4) brightness(0.9)" }}
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300 halftone-bg" />
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
                    <button className="bg-accent text-white font-bold uppercase py-1 px-3 border-2 border-background shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-200 text-xs whitespace-nowrap">
                      CONSULTAR
                    </button>
                  </div>

                  {/* Event date */}
                  <p className="text-sm font-bold text-primary mb-3">{event.date}</p>

                  {/* Event description */}
                  <p className="text-sm text-gray-700 leading-relaxed">{event.description}</p>

                  {/* Decorative elements */}
                  <div className="absolute -top-3 left-12 w-20 h-8 bg-accent/50 border-2 border-accent/70 rotate-12 shadow-[2px_2px_4px_rgba(0,0,0,0.4)]" />
                  <div className="absolute top-0 left-0 w-0 h-0 border-t-[30px] border-t-primary border-r-[30px] border-r-transparent" />
                  <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[30px] border-b-primary border-l-[30px] border-l-transparent" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
