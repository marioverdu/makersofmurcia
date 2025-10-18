"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface MembershipModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function MembershipModal({ isOpen, onClose }: MembershipModalProps) {
  const [canJoin, setCanJoin] = useState(false)
  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!scrollContainer) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer
      const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight - 10
      setCanJoin(isScrolledToBottom)
    }

    scrollContainer.addEventListener("scroll", handleScroll)
    return () => scrollContainer.removeEventListener("scroll", handleScroll)
  }, [scrollContainer])

  const handleJoinMembership = () => {
    if (canJoin) {
      // Aquí iría la lógica para hacer el usuario miembro
      alert("¡Te has hecho miembro del taller! Te contactaremos pronto.")
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl border-4 border-secondary shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full mx-4 max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-4 border-secondary">
          <h2
            className="text-3xl md:text-4xl font-bold uppercase text-secondary"
            style={{ fontFamily: "var(--font-plus-jakarta-sans), system-ui, sans-serif" }}
          >
            CONDICIONES DE USO DEL TALLER
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-secondary" />
          </button>
        </div>

        {/* Scrollable content */}
        <div 
          ref={setScrollContainer}
          className="flex-1 overflow-y-auto p-6 space-y-4"
        >
          <div className="space-y-6">
            <div>
              <h3
                className="text-xl font-bold uppercase text-secondary mb-3"
                style={{ fontFamily: "var(--font-plus-jakarta-sans), system-ui, sans-serif" }}
              >
                1. ACCESO AL MAKERSPACE
              </h3>
              <ul className="space-y-2 text-secondary">
                <li>• El acceso está limitado a miembros activos de la asociación</li>
                <li>• Debes presentar tu carnet de socio en cada visita</li>
                <li>• El horario de acceso es de lunes a viernes de 9:00 a 21:00</li>
                <li>• Los fines de semana el horario es de 10:00 a 18:00</li>
              </ul>
            </div>

            <div>
              <h3
                className="text-xl font-bold uppercase text-secondary mb-3"
                style={{ fontFamily: "var(--font-plus-jakarta-sans), system-ui, sans-serif" }}
              >
                2. USO DE EQUIPAMIENTO
              </h3>
              <ul className="space-y-2 text-secondary">
                <li>• Todos los equipos requieren formación previa antes del uso</li>
                <li>• Las impresoras 3D tienen un límite de 4 horas por sesión</li>
                <li>• El material debe ser proporcionado por el usuario</li>
                <li>• Cualquier daño al equipamiento debe ser reportado inmediatamente</li>
                <li>• Los equipos de seguridad son obligatorios en todo momento</li>
              </ul>
            </div>

            <div>
              <h3
                className="text-xl font-bold uppercase text-secondary mb-3"
                style={{ fontFamily: "var(--font-plus-jakarta-sans), system-ui, sans-serif" }}
              >
                3. SEGURIDAD Y RESPONSABILIDAD
              </h3>
              <ul className="space-y-2 text-secondary">
                <li>• Cada usuario es responsable de su propia seguridad</li>
                <li>• No se permite trabajar solo en el taller después de las 20:00</li>
                <li>• Los proyectos peligrosos requieren supervisión especial</li>
                <li>• El consumo de alcohol o drogas está estrictamente prohibido</li>
                <li>• Los menores de 16 años deben estar acompañados por un adulto</li>
              </ul>
            </div>

            <div>
              <h3
                className="text-xl font-bold uppercase text-secondary mb-3"
                style={{ fontFamily: "var(--font-plus-jakarta-sans), system-ui, sans-serif" }}
              >
                4. CUOTAS Y PAGOS
              </h3>
              <ul className="space-y-2 text-secondary">
                <li>• La cuota mensual es de 25€ para estudiantes, 35€ para adultos</li>
                <li>• El pago debe realizarse antes del día 5 de cada mes</li>
                <li>• Los materiales especiales tienen coste adicional</li>
                <li>• No se realizan reembolsos por ausencias temporales</li>
                <li>• La baja debe comunicarse con 30 días de antelación</li>
              </ul>
            </div>

            <div>
              <h3
                className="text-xl font-bold uppercase text-secondary mb-3"
                style={{ fontFamily: "var(--font-plus-jakarta-sans), system-ui, sans-serif" }}
              >
                5. PROYECTOS Y PROPIEDAD INTELECTUAL
              </h3>
              <ul className="space-y-2 text-secondary">
                <li>• Los proyectos desarrollados en el taller son propiedad del creador</li>
                <li>• Se fomenta el código abierto y el conocimiento compartido</li>
                <li>• Los proyectos comerciales requieren autorización previa</li>
                <li>• No se permite el desarrollo de armas o dispositivos peligrosos</li>
                <li>• Los proyectos deben respetar las normativas de seguridad</li>
              </ul>
            </div>

            <div>
              <h3
                className="text-xl font-bold uppercase text-secondary mb-3"
                style={{ fontFamily: "var(--font-plus-jakarta-sans), system-ui, sans-serif" }}
              >
                6. COMUNIDAD Y COMPORTAMIENTO
              </h3>
              <ul className="space-y-2 text-secondary">
                <li>• Se espera un comportamiento respetuoso hacia todos los miembros</li>
                <li>• La colaboración y el aprendizaje mutuo son valores fundamentales</li>
                <li>• No se tolera el acoso, discriminación o comportamiento inapropiado</li>
                <li>• Los conflictos deben resolverse de manera constructiva</li>
                <li>• La participación en eventos y actividades es altamente recomendada</li>
              </ul>
            </div>

            <div className="bg-accent/20 p-4 rounded-lg border-2 border-accent">
              <p className="text-secondary font-bold text-center">
                Al hacerte miembro, aceptas cumplir todas estas condiciones y contribuir positivamente a la comunidad maker de Murcia.
              </p>
            </div>
          </div>
        </div>

        {/* Footer with buttons */}
        <div className="p-6 border-t-4 border-secondary bg-secondary/5">
          <div className="flex gap-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 py-3 text-lg font-bold uppercase border-4 border-secondary text-secondary hover:bg-secondary hover:text-background transition-all duration-200"
              style={{ fontFamily: "var(--font-plus-jakarta-sans), system-ui, sans-serif" }}
            >
              CANCELAR
            </Button>
            <Button
              onClick={handleJoinMembership}
              disabled={!canJoin}
              className={`flex-1 py-3 text-lg font-bold uppercase transition-all duration-200 ${
                canJoin
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              style={{ fontFamily: "var(--font-plus-jakarta-sans), system-ui, sans-serif" }}
            >
              {canJoin ? "HACERME MIEMBRO" : "LEE TODAS LAS CONDICIONES"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
