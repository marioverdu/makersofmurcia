"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import MembershipModal from "@/components/membership-modal"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<HTMLSpanElement[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return

      const scrollY = window.scrollY
      const heroHeight = heroRef.current.offsetHeight
      const scrollProgress = Math.min(scrollY / heroHeight, 1)

      lettersRef.current.forEach((letter, index) => {
        if (!letter) return

        const speed = (index % 4) + 1.5
        const direction = index % 2 === 0 ? 1 : -1
        const translateY = scrollProgress * speed * 150 * direction
        const translateX = scrollProgress * speed * 50 * (index % 3 === 0 ? 1 : -1)
        const rotate = scrollProgress * speed * 8 * direction
        const scale = 1 - scrollProgress * 0.3
        const opacity = 1 - scrollProgress * 1.2

        letter.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scale})`
        letter.style.opacity = opacity.toString()
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const text = "Reduce, Reutiliza, Recicla. ¿Qué vas a crear Hoy?"

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center bg-primary overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-32 md:w-48 h-full bg-secondary border-r-8 border-background opacity-90">
        <div className="sticky top-20 p-4 md:p-6">
          <p
            className="text-background text-sm md:text-base font-bold uppercase [writing-mode:vertical-lr] rotate-180 tracking-wider"
            style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif" }}
          >
            ASOCIACIÓN SIN ÁNIMO DE LUCRO
          </p>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-24 md:w-32 h-full bg-secondary border-l-8 border-background opacity-90">
        <div className="sticky top-32 p-3 md:p-4">
          <p
            className="text-background text-xs md:text-sm font-bold uppercase [writing-mode:vertical-lr] rotate-180 tracking-wider"
            style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif" }}
          >
            EVENTOS • CULTURA • COMUNIDAD
          </p>
        </div>
      </div>
      {/* </CHANGE> */}

      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 halftone-bg" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 5px,
            black 5px,
            black 6px
          )`,
          }}
        />
      </div>
      {/* </CHANGE> */}

      <div className="absolute top-20 left-1/4 w-40 h-40 border-8 border-secondary rotate-45 opacity-20" />
      <div className="absolute bottom-32 right-1/3 w-32 h-32 bg-accent opacity-30 -rotate-12" />
      <div className="absolute top-1/3 right-20 w-24 h-24 border-8 border-accent rotate-12 opacity-20" />
      {/* </CHANGE> */}

      {/* Parallax text */}
      <div className="relative z-10 flex flex-col justify-center items-center gap-2 md:gap-4 px-4 mb-12">
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
          {text.split("").map((char, index) => (
            <span
              key={index}
              ref={(el) => {
                if (el) lettersRef.current[index] = el
              }}
              className="text-[6vw] md:text-[8vw] lg:text-[10vw] font-bold uppercase leading-none text-stroke-double inline-block transition-all duration-100"
              style={{
                fontFamily: "var(--font-bebas-neue), Impact, sans-serif",
                willChange: "transform, opacity",
                filter: `drop-shadow(${index * 2}px ${index * 2}px 0px rgba(0,0,0,0.3))`,
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-20 flex flex-col items-center gap-6">
        <div 
          className="bg-white border-4 border-secondary p-4 rotate-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
          onClick={() => setIsModalOpen(true)}
        >
          <p
            className="text-secondary text-sm md:text-base font-bold uppercase tracking-wider"
            style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif" }}
          >
            HÁZTE MIEMBRO DEL TALLER
          </p>
        </div>

        <Button
          size="lg"
          className="relative bg-white text-secondary hover:bg-white/90 text-xl md:text-2xl font-bold uppercase px-8 md:px-16 py-6 md:py-8 border-4 border-secondary shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 -rotate-1"
          style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
        >
          DESPIERTA YA
          <span className="absolute -top-3 -right-3 w-8 h-8 bg-primary border-2 border-secondary rotate-45" />
        </Button>

        <a 
          href="https://t.me/makersofmurcia" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white border-4 border-background p-3 -rotate-3 shadow-[6px_6px_0px_0px_rgba(255,0,0,0.5)] hover:shadow-[8px_8px_0px_0px_rgba(255,0,0,0.7)] transition-all duration-200 cursor-pointer"
        >
          <p className="text-secondary text-sm md:text-base font-bold flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            @makersofmurcia
          </p>
        </a>
      </div>
      {/* </CHANGE> */}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="w-8 h-12 border-4 border-background bg-secondary/50 flex items-start justify-center p-2">
          <div className="w-2 h-4 bg-background animate-bounce" />
        </div>
      </div>
      {/* </CHANGE> */}

      {/* Membership Modal */}
      <MembershipModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  )
}