"use client"

interface BannerContactProps {
  className?: string
}

export default function BannerContact({ className = "" }: BannerContactProps) {
  return (
    <div className={`bg-[#F7F8FC] py-12 ${className}`}>
      <div className="max-w-[1092px] mx-auto px-4 md:px-[60px] flex justify-center">
        <div className="bg-white rounded-[12px] shadow-md p-6 md:p-8 xl:p-[48px] text-center">
          <h2 className="text-[hsl(206,1%,27%)] text-2xl font-medium mb-4">¿Listo para empezar?</h2>
          <p className="text-[hsl(206,1%,27%)] mb-6">
            Ponte en contacto conmigo hoy mismo y hablemos sobre cómo puedo ayudarte a llevar tu proyecto al siguiente
            nivel.
          </p>
          <div className="empty-button-container">{/* Espacio reservado para un nuevo botón */}</div>
        </div>
      </div>
    </div>
  )
}
