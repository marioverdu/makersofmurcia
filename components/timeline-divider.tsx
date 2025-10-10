"use client"

import type React from "react"

import { useRef, useEffect } from "react"

interface TimelineDividerProps {
  type: "start" | "middle" | "end"
  imageRef: React.RefObject<HTMLDivElement>
}

export function TimelineDivider({ type, imageRef }: TimelineDividerProps) {
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
    <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center w-6">
      <style jsx>{`
        .outline-stroke-dot {
          background: #E4F6F5;
          border: 2px solid hsl(var(--primary));
        }
        .fill-dot {
          background: hsl(var(--primary));
        }
        .filled-dot {
          background: hsl(var(--primary));
        }
        .timeline-line-custom {
          background: hsl(var(--primary)); /* Mismo color que fill-dot */
          opacity: 0.4;
        }
      `}</style>
      {type === "start" && (
        <>
          <div
            ref={dotRef}
            className={`${dotStyle} ${type === "start" ? "fill-dot" : type === "end" ? "filled-dot" : "outline-stroke-dot"} absolute`}
          />
          <div ref={lineBottomRef} className="w-px timeline-line-custom absolute left-1/2 transform -translate-x-1/2" />
        </>
      )}

      {type === "middle" && (
        <>
          <div
            ref={lineTopRef}
            className="w-px timeline-line-custom absolute top-0 left-1/2 transform -translate-x-1/2"
          />
          <div
            ref={dotRef}
            className={`${dotStyle} ${type === "start" ? "fill-dot" : type === "end" ? "filled-dot" : "outline-stroke-dot"} absolute`}
          />
          <div ref={lineBottomRef} className="w-px timeline-line-custom absolute left-1/2 transform -translate-x-1/2" />
        </>
      )}

      {type === "end" && (
        <>
          <div
            ref={lineTopRef}
            className="w-px timeline-line-custom absolute top-0 left-1/2 transform -translate-x-1/2"
          />
          <div
            ref={dotRef}
            className={`${dotStyle} ${type === "start" ? "fill-dot" : type === "end" ? "filled-dot" : "outline-stroke-dot"} absolute`}
          />
        </>
      )}
    </div>
  )
}
