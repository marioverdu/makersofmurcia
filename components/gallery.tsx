"use client"

import { useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const images = [
  { id: 1, query: "young people at urban music concert with red lights grunge aesthetic", rotation: "-2deg" },
  { id: 2, query: "street art graffiti festival crowd vintage photo", rotation: "1deg" },
  { id: 3, query: "youth community event outdoor gathering retro style", rotation: "-1deg" },
  { id: 4, query: "underground music venue concert crowd punk aesthetic", rotation: "2deg" },
  { id: 5, query: "urban art exhibition young visitors magazine style", rotation: "-3deg" },
  { id: 6, query: "street festival youth dancing grunge poster", rotation: "1deg" },
  { id: 7, query: "community gathering young people socializing vintage", rotation: "-2deg" },
  { id: 8, query: "live music performance energetic crowd retro aesthetic", rotation: "2deg" },
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
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 15px,
          white 15px,
          white 16px
        ), repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 15px,
          white 15px,
          white 16px
        )`,
        }}
      />
      <div className="absolute inset-0 opacity-10 halftone-bg" />

      <div className="absolute top-10 left-10 w-40 h-40 border-8 border-primary rotate-45 opacity-30" />
      <div className="absolute bottom-10 right-10 w-48 h-48 border-8 border-accent -rotate-12 opacity-30" />
      <div className="absolute top-1/2 left-20 w-32 h-32 bg-primary opacity-20 rotate-12" />

      <div className="relative z-10">
        <div className="relative mb-12">
          <h2
            className="text-5xl md:text-7xl lg:text-9xl font-bold uppercase text-center text-stroke px-4 relative inline-block w-full"
            style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif" }}
          >
            NUESTROS EVENTOS
            <span
              className="absolute inset-0 text-primary opacity-50 -z-10"
              style={{
                transform: "translate(5px, 5px)",
                fontFamily: "var(--font-anton), Impact, sans-serif",
              }}
              aria-hidden="true"
            >
              NUESTROS EVENTOS
            </span>
          </h2>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            <span className="w-48 h-4 bg-primary rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]" />
            <span className="w-48 h-4 bg-accent -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <Button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-primary hover:bg-primary/90 border-4 border-background shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all -rotate-3"
            size="icon"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          <Button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-primary hover:bg-primary/90 border-4 border-background shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all rotate-3"
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
                  <Image
                    src={`/.jpg?height=600&width=800&query=${encodeURIComponent(image.query)}`}
                    alt={`Event ${image.id}`}
                    fill
                    className="object-cover"
                    style={{ filter: "contrast(1.3) saturate(1.4) brightness(0.9)" }}
                  />

                  {/* Halftone overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300 halftone-bg" />

                  {/* Tape decorations */}
                  <div className="absolute -top-3 left-12 w-20 h-8 bg-accent/50 border-2 border-accent/70 rotate-12 shadow-[2px_2px_4px_rgba(0,0,0,0.4)]" />
                  <div className="absolute -bottom-3 right-12 w-20 h-8 bg-accent/50 border-2 border-accent/70 -rotate-12 shadow-[2px_2px_4px_rgba(0,0,0,0.4)]" />

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