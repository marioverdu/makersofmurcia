"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"

const cards = [
  {
    title: "EVENTOS ÚNICOS",
    description:
      "Organizamos experiencias inolvidables que conectan a jóvenes de toda la ciudad. Música, arte y cultura en un solo lugar.",
    height: "min-h-[280px]",
    icon: "🎪",
    rotation: "-2deg",
    color: "bg-background",
  },
  {
    title: "COMUNIDAD ACTIVA",
    description:
      "Más de 5,000 miembros activos que comparten la misma pasión por el cambio social y la cultura urbana.",
    height: "min-h-[380px]",
    icon: "🤝",
    rotation: "1deg",
    color: "bg-accent",
  },
  {
    title: "SIN ÁNIMO DE LUCRO",
    description: "Cada euro recaudado se reinvierte en crear más eventos y oportunidades para la juventud.",
    height: "min-h-[320px]",
    icon: "❤️",
    rotation: "-1deg",
    color: "bg-background",
  },
  {
    title: "IMPACTO REAL",
    description: "Hemos organizado más de 50 eventos en el último año, llegando a miles de jóvenes.",
    height: "min-h-[340px]",
    icon: "⚡",
    rotation: "2deg",
    color: "bg-primary text-primary-foreground",
  },
  {
    title: "CULTURA URBANA",
    description: "Promovemos el arte callejero, la música underground y todas las expresiones de la cultura joven.",
    height: "min-h-[300px]",
    icon: "🎨",
    rotation: "-3deg",
    color: "bg-background",
  },
  {
    title: "VOLUNTARIADO",
    description: "Únete a nuestro equipo de voluntarios y sé parte del cambio que quieres ver.",
    height: "min-h-[360px]",
    icon: "🌟",
    rotation: "1deg",
    color: "bg-accent",
  },
]

export default function MasonrySection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(cards.length).fill(false))
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = cardRefs.current.map((card, index) => {
      if (!card) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const newState = [...prev]
                newState[index] = true
                return newState
              })
            }, index * 100)
          }
        },
        { threshold: 0.1 },
      )

      observer.observe(card)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-background relative overflow-hidden">
      <div className="absolute top-20 right-10 w-64 h-64 border-[20px] border-primary opacity-10 rotate-45" />
      <div className="absolute bottom-20 left-10 w-48 h-48 border-[20px] border-accent opacity-10 -rotate-12" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl" />

      <div className="relative mb-16">
        <h2
          className="text-5xl md:text-7xl lg:text-9xl font-bold uppercase text-center text-stroke-red relative inline-block w-full"
          style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif" }}
        >
          QUÉ HACEMOS
          <span
            className="absolute inset-0 text-accent opacity-40 -z-10"
            style={{
              transform: "translate(6px, 6px)",
              fontFamily: "var(--font-anton), Impact, sans-serif",
            }}
            aria-hidden="true"
          >
            QUÉ HACEMOS
          </span>
        </h2>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          <span className="w-32 h-3 bg-primary rotate-2" />
          <span className="w-32 h-3 bg-accent -rotate-1" />
          <span className="w-32 h-3 bg-secondary rotate-1" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8">
        {cards.map((card, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className={`break-inside-avoid transition-all duration-700 ${
              visibleCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Card
              className={`${card.height} ${card.color} p-8 border-4 border-secondary shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-300 cursor-pointer relative overflow-hidden group`}
              style={{
                transform: `rotate(${card.rotation})`,
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none halftone-bg" />

              {/* Ripped edge effect on top */}
              {index % 3 === 0 && (
                <div className="absolute top-0 left-0 right-0 h-2 bg-secondary opacity-50 ripped-edge" />
              )}

              <div className="relative z-10">
                {/* Icon with sticker effect */}
                <div className="inline-block mb-4 p-4 bg-background border-4 border-secondary rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-0 transition-transform">
                  <div className="text-5xl">{card.icon}</div>
                </div>

                <h3
                  className="text-3xl md:text-4xl font-bold uppercase mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif" }}
                >
                  {card.title}
                </h3>
                <p className="text-base md:text-lg font-bold leading-relaxed">{card.description}</p>
              </div>

              {/* Geometric corner decorations */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-secondary transform rotate-45 translate-x-8 -translate-y-8" />
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-primary transform rotate-45 -translate-x-6 translate-y-6" />

              {/* Tape effect */}
              {index % 2 === 0 && (
                <div className="absolute -top-3 right-12 w-24 h-8 bg-accent/40 border-2 border-accent/60 rotate-12 shadow-[2px_2px_4px_rgba(0,0,0,0.3)]" />
              )}

              {/* Star decorations */}
              {index % 3 === 1 && <div className="absolute bottom-4 right-4 text-2xl opacity-60">★</div>}
            </Card>
            {/* </CHANGE> */}
          </div>
        ))}
      </div>
    </section>
  )
}