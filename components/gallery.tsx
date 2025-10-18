"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const images = [
  { id: 1, src: "/asset/team/photo_223@18-09-2018_14-10-50.jpg", rotation: "-2deg" },
  { id: 2, src: "/asset/team/photo_224@21-09-2018_10-24-07.jpg", rotation: "1deg" },
  { id: 3, src: "/asset/team/photo_225@21-09-2018_10-24-07.jpg", rotation: "-1deg" },
  { id: 4, src: "/asset/team/photo_226@21-09-2018_10-24-07.jpg", rotation: "2deg" },
  { id: 5, src: "/asset/team/photo_227@21-09-2018_10-25-49.jpg", rotation: "-3deg" },
  { id: 6, src: "/asset/team/photo_228@21-09-2018_10-39-28.jpg", rotation: "1deg" },
  { id: 7, src: "/asset/team/photo_229@21-09-2018_23-46-46.jpg", rotation: "-2deg" },
  { id: 8, src: "/asset/team/photo_230@22-09-2018_10-26-09.jpg", rotation: "2deg" },
]

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null)

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
            style={{ fontFamily: "Climate Crisis, cursive", color: "#DD160B !important", WebkitTextFillColor: "#DD160B !important" }}
          >
            EQUIPO
            <span
              className="absolute inset-0 text-primary opacity-50 -z-10"
              style={{
                transform: "translate(5px, 5px)",
                fontFamily: "Climate Crisis, cursive",
              }}
              aria-hidden="true"
            >
              EQUIPO
            </span>
            <span
              className="absolute inset-0 text-accent opacity-20 -z-20"
              style={{
                transform: "translate(-4px, -4px)",
                fontFamily: "Climate Crisis, cursive",
              }}
              aria-hidden="true"
            >
              EQUIPO
            </span>
          </h2>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            <span className="w-48 h-4 bg-primary  shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]" />
            <span className="w-48 h-4 bg-accent - shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <Button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-primary hover:bg-primary/90 border-4 border-background shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all -"
            size="icon"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          <Button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-primary hover:bg-primary/90 border-4 border-background shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all "
            size="icon"
          >
            <ChevronRight className="w-8 h-8" />
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
                  className="relative w-full h-full border-8 border-background shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[5px] group-hover:translate-y-[5px] transition-all duration-300 overflow-hidden"
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
                  <div className="absolute -top-3 left-12 w-20 h-8 bg-accent/50 border-2 border-accent/70 2 shadow-[2px_2px_4px_rgba(0,0,0,0.4)]" />
                  <div className="absolute -bottom-3 right-12 w-20 h-8 bg-accent/50 border-2 border-accent/70 -2 shadow-[2px_2px_4px_rgba(0,0,0,0.4)]" />

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