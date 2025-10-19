"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const testimonials = [
  {
    quote: "Esta asociación me ha permitido ampliar mi red de contactos profesionales en el ecosistema local, dándome acceso a un gran capital humano.",
    author: "ROY PETTER DYRDahl",
    role: "CEO DE OPENROV ESPAÑA",
  },
  {
    quote: "Como estudiante de ingeniería esta iniciativa me permite poner en práctica mis conocimientos teóricos y, a su vez, compartir y aprender ideas con compañeros del mismo ámbito que complementan mis estudios universitarios.",
    author: "MIGUEL ÁNGEL NAVARRO",
    role: "ESTUDIANTE UPCT",
  },
  {
    quote: "Gracias al espíritu colaborativo de sus socios, se ha creado una comunidad donde cualquier proyecto o idea puede ser una realidad, sin importar su dificultad.",
    author: "JOSÉ BILOTTA",
    role: "INGENIERO IMPRESIÓN 3D",
  },
  {
    quote: "Nunca pensé que podría conocer tanta gente increíble. Cada evento es una nueva aventura.",
    author: "JAVI, 20 AÑOS",
    role: "ASISTENTE REGULAR",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-primary opacity-10 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent opacity-10 blur-3xl" />
      <div className="absolute top-1/2 left-1/4 w-48 h-48 border-[20px] border-primary opacity-5 rotate-45" />
      <div className="absolute top-1/4 right-1/4 w-40 h-40 border-[20px] border-accent opacity-5 -" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="relative mb-16">
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase text-center px-4 relative inline-block w-full"
            style={{ fontFamily: "Climate Crisis, cursive", color: "#1D1414 !important", WebkitTextFillColor: "#1D1414 !important" }}
          >
            TESTIMONIOS
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
              TESTIMONIOS
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
              TESTIMONIOS
            </span> */}
          </h2>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            <span className="w-48 h-4 bg-primary  shadow-[4px_4px_0px_0px_var(--color-black)]" />
            <span className="w-48 h-4 bg-accent - shadow-[4px_4px_0px_0px_var(--color-black)]" />
          </div>
        </div>

        <div className="relative">
          <Card className="bg-white text-secondary border-4 border-secondary p-8 md:p-12 lg:p-16 shadow-[12px_12px_0px_0px_var(--color-black)] relative overflow-hidden -" style={{ backgroundColor: "var(--color-box)" }}>
            {/* Giant quotation mark */}
            <div className="absolute -top-8 -left-4 text-[180px] md:text-[240px] opacity-20 leading-none select-none font-serif">
              "
            </div>

            <div className="absolute inset-0 opacity-10 halftone-bg" />

            {/* Geometric decorations */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary transform rotate-45 translate-x-12 -translate-y-12" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-accent transform rotate-45 -translate-x-10 translate-y-10" />

            {/* Diagonal stripes */}
            <div
              className="absolute top-0 left-0 w-full h-full opacity-5"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 10px,
                  white 10px,
                  white 12px
                )`,
              }}
            />

            <div className="relative z-10">
              <p
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-relaxed"
                style={{ fontFamily: "var(--font-plus-jakarta-sans), system-ui, sans-serif" }}
              >
                {testimonials[currentIndex].quote}
              </p>

              <div className="border-t-4 border-primary-foreground pt-6 flex items-center gap-4">
                <div className="flex-1">
                  <p
                    className="text-xl md:text-2xl font-bold uppercase"
                    style={{ fontFamily: "var(--font-plus-jakarta-sans), system-ui, sans-serif" }}
                  >
                    {testimonials[currentIndex].author}
                  </p>
                  <p className="text-lg md:text-xl font-bold opacity-80">{testimonials[currentIndex].role}</p>
                </div>
                <div className="text-4xl">★</div>
              </div>
            </div>
          </Card>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              onClick={prev}
              size="icon"
              className="w-12 h-12 bg-transparent hover:bg-transparent text-secondary shadow-[1px_1px_12px_rgba(0,0,0,0.08)] hover:shadow-[1px_1px_8px_rgba(0,0,0,0.12)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all -rotate-2"
              style={{ borderColor: "var(--color-black) !important", backgroundColor: "#FFF3EF !important" }}
            >
              <ChevronLeft className="w-14 h-14" />
            </Button>

            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-6 h-6 border-3 border-secondary transition-all duration-300 rotate-45 ${
                    index === currentIndex
                      ? "bg-primary scale-125 shadow-[4px_4px_0px_0px_var(--color-black)]"
                      : "hover:bg-accent shadow-[2px_2px_0px_0px_var(--color-black)]"
                  }`}
                  style={{ backgroundColor: index === currentIndex ? undefined : "var(--color-box)" }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              onClick={next}
              size="icon"
              className="w-12 h-12 bg-transparent hover:bg-transparent text-secondary shadow-[1px_1px_12px_rgba(0,0,0,0.08)] hover:shadow-[1px_1px_8px_rgba(0,0,0,0.12)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all rotate-2"
              style={{ borderColor: "var(--color-black) !important", backgroundColor: "#FFF3EF !important" }}
            >
              <ChevronRight className="w-14 h-14" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}