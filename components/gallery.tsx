"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Función para obtener las imágenes del equipo dinámicamente
async function getTeamImages() {
  try {
    const response = await fetch('/api/team-images')
    if (!response.ok) {
      throw new Error('Error al cargar las imágenes del equipo')
    }
    const data = await response.json()
    return data.images
  } catch (error) {
    console.error('Error:', error)
    // Fallback a imágenes estáticas si hay error
    return [
      { id: 1, src: "/asset/team/photo_223@18-09-2018_14-10-50.jpg", rotation: "-2deg" },
      { id: 2, src: "/asset/team/photo_224@21-09-2018_10-24-07.jpg", rotation: "1deg" },
      { id: 3, src: "/asset/team/photo_225@21-09-2018_10-24-07.jpg", rotation: "-1deg" },
      { id: 4, src: "/asset/team/photo_226@21-09-2018_10-24-07.jpg", rotation: "2deg" },
      { id: 5, src: "/asset/team/photo_227@21-09-2018_10-25-49.jpg", rotation: "-3deg" },
      { id: 6, src: "/asset/team/photo_228@21-09-2018_10-39-28.jpg", rotation: "1deg" },
      { id: 7, src: "/asset/team/photo_229@21-09-2018_23-46-46.jpg", rotation: "-2deg" },
      { id: 8, src: "/asset/team/photo_230@22-09-2018_10-26-09.jpg", rotation: "2deg" },
    ]
  }
}

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [images, setImages] = useState<{ id: number; src: string; rotation: string }[]>([])

  // Cargar imágenes del equipo al montar el componente
  useEffect(() => {
    const loadTeamImages = async () => {
      const teamImages = await getTeamImages()
      setImages(teamImages)
    }
    loadTeamImages()
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-16 md:py-24 bg-secondary relative overflow-hidden">

      <div className="relative z-10">
        <div className="relative mb-12">
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase text-center px-4 relative inline-block w-full"
            style={{ fontFamily: "Climate Crisis, cursive", color: "#1D1414 !important", WebkitTextFillColor: "#1D1414 !important" }}
          >
            M<span className="text-2xl md:text-4xl lg:text-5xl">o</span>M
            {/* Sombras desactivadas */}
            {/* <span
              className="absolute inset-0 -z-10"
              style={{
                transform: "translate(5px, 5px)",
                fontFamily: "Climate Crisis, cursive",
                color: "#EC6918 !important",
                WebkitTextFillColor: "#EC6918 !important",
                opacity: 0.3
              }}
              aria-hidden="true"
            >
              M<span className="text-2xl md:text-4xl lg:text-5xl">o</span>M
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
              M<span className="text-2xl md:text-4xl lg:text-5xl">o</span>M
            </span> */}
          </h2>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            <span className="w-48 h-4 bg-primary  shadow-[4px_4px_0px_0px_var(--color-black)]" />
            <span className="w-48 h-4 bg-accent - shadow-[4px_4px_0px_0px_var(--color-black)]" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <Button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-transparent hover:bg-transparent text-secondary shadow-[1px_1px_12px_rgba(0,0,0,0.08)] hover:shadow-[1px_1px_8px_rgba(0,0,0,0.12)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all -"
            style={{ borderColor: "var(--color-black) !important", backgroundColor: "#FFF3EF !important" }}
            size="icon"
          >
            <ChevronLeft className="w-16 h-16" />
          </Button>

          <Button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-transparent hover:bg-transparent text-secondary shadow-[1px_1px_12px_rgba(0,0,0,0.08)] hover:shadow-[1px_1px_8px_rgba(0,0,0,0.12)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all "
            style={{ borderColor: "var(--color-black) !important", backgroundColor: "#FFF3EF !important" }}
            size="icon"
          >
            <ChevronRight className="w-16 h-16" />
          </Button>

          {/* Gallery grid */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {images.map((image) => (
              <div
                key={image.id}
                className="flex-shrink-0 snap-start w-[85vw] md:w-[400px] aspect-[4/3] relative group cursor-pointer"
              >
                <div
                  className="relative w-full h-full border-8 border-background shadow-[10px_10px_0px_0px_var(--color-black)] group-hover:shadow-[5px_5px_0px_0px_var(--color-black)] group-hover:translate-x-[5px] group-hover:translate-y-[5px] transition-all duration-300 overflow-hidden"
                  style={{ transform: `rotate(${image.rotation})` }}
                >
                  <img
                    src={image.src}
                    alt={`Team photo ${image.id}`}
                    className="w-full h-full object-cover"
                    style={{ filter: "contrast(1.3) saturate(1.4) brightness(0.9)" }}
                  />

                  {/* Halftone overlay on hover */}

                  {/* Tape decorations */}
                  <div className="absolute -top-3 left-12 w-20 h-8 bg-accent/50 border-2 border-accent/70 2 shadow-[2px_2px_4px_var(--color-black)]" />
                  <div className="absolute -bottom-3 right-12 w-20 h-8 bg-accent/50 border-2 border-accent/70 -2 shadow-[2px_2px_4px_var(--color-black)]" />

                  {/* Corner triangles */}
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