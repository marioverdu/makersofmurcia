"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import MembershipModal from "@/components/membership-modal"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center bg-primary overflow-hidden"
    >
      {/* </CHANGE> */}

      {/* </CHANGE> */}

      {/* Logo y párrafo descriptivo */}
      <div className="relative z-10 flex flex-col justify-center items-center gap-2 md:gap-4 px-4 mb-12 mt-24 md:mt-32">
        {/* Logo */}
        <div className="flex justify-center items-center">
          <img 
            src="/asset/logo.png" 
            alt="Makers of Murcia Logo" 
            className="w-[220px] h-[220px] object-contain transition-all duration-500 rounded-[0px]"
          />
        </div>
        
        {/* Párrafo descriptivo */}
        <div className="mt-12 transform translate-y-2 translate-x-2">
          <p 
            className="text-background text-center max-w-2xl mx-auto leading-relaxed"
            style={{ 
              fontSize: 'calc(1.2rem + 2px)',
              fontFamily: "var(--font-inter), system-ui, sans-serif"
            }}
          >
            Si puedes pensarlo puedes crearlo.
            <br />
            Únete a nosotros para construir el futuro que queremos ver.
          </p>
        </div>
      </div>

      <div className="relative z-20 flex flex-row items-center gap-6">
        <a 
          href="https://t.me/makersofmurcia" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-white border-4 border-background p-6 mb-12 shadow-[8px_8px_0px_0px_var(--color-black)] hover:shadow-[4px_4px_0px_0px_var(--color-black)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 cursor-pointer"
          style={{ backgroundColor: "var(--color-box)" }}
        >
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-secondary uppercase leading-tight flex items-center gap-2" style={{ fontFamily: "var(--font-bebas-neue), Impact, sans-serif" }}>
            <svg className="w-6 h-6" fill="#0D2B3D" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            @makersofmurcia
          </p>
        </a>
      </div>
      {/* </CHANGE> */}

      {/* </CHANGE> */}

      {/* Membership Modal */}
      <MembershipModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  )
}