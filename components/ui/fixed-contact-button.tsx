"use client"

import { useState, useEffect, useRef } from "react"

interface FixedContactButtonProps {
  className?: string
}

export function FixedContactButton({ className = "" }: FixedContactButtonProps) {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  // Manejar tecla Escape y bloquear scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsContactFormOpen(false)
    }

    // Manejar clic fuera del formulario
    const handleClickOutside = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setIsContactFormOpen(false)
      }
    }

    if (isContactFormOpen) {
      document.addEventListener("keydown", handleEscape)
      document.addEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "hidden" // Bloquear scroll cuando el overlay está abierto
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "auto" // Restaurar scroll cuando el overlay se cierra
    }
  }, [isContactFormOpen])

  return (
    <>
      <button
        onClick={() => setIsContactFormOpen(true)}
        className={`fixed bottom-6 right-6 w-[50px] h-[50px] bg-[#3D5B6A] text-white rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-[#2c4351] transition-colors ${className}`}
        aria-label="Abrir formulario de contacto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>

      {isContactFormOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
          aria-modal="true"
          role="dialog"
        >
          <div
            ref={formRef}
            className="bg-white rounded-[12px] shadow-xl relative w-full max-w-[620px] max-h-[90vh] overflow-auto m-4"
          >
            <button
              onClick={() => setIsContactFormOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-600 p-2 rounded-full"
              aria-label="Cerrar formulario de contacto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="p-6 md:p-8 xl:p-[48px]">
              <h2 className="text-[hsl(206,1%,27%)] text-xl font-medium mb-6">Contacto</h2>

              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[hsl(206,1%,27%)] mb-1">
                    Nombre
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full h-[40px] rounded-[6px] border border-[hsl(206,1%,27%)]/20 px-4 focus:outline-none focus:border-[#3D5B6A]"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[hsl(206,1%,27%)] mb-1">
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full h-[40px] rounded-[6px] border border-[hsl(206,1%,27%)]/20 px-4 focus:outline-none focus:border-[#3D5B6A]"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[hsl(206,1%,27%)] mb-1">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    required
                    className="w-full h-[120px] rounded-[6px] border border-[hsl(206,1%,27%)]/20 p-4 focus:outline-none focus:border-[#3D5B6A]"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="w-[132px] h-[41px] px-4 py-2 bg-[#3D5B6A] text-white text-[15.2px] font-medium rounded-[6px] whitespace-nowrap relative before:absolute before:content-[''] before:rounded-[6px] before:border-2 before:border-[hsl(206,1%,27%)] before:-top-[3px] before:-left-[3px] before:-right-[3px] before:-bottom-[3px] before:opacity-0 hover:before:opacity-100 before:transition-opacity"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
