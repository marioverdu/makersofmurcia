import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import ReactDOM from "react-dom"

export function ProfileCardWidescreens() {
  const [menuOpen, setMenuOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [menuOpen])

  const handleDownloadPDF = () => {
    setMenuOpen(false)
    // Aquí puedes poner la lógica real de descarga de PDF
    window.open("/cv-mario-verdu.pdf", "_blank")
  }

  return (
    <section className="mt-[40px]">
      <div className="flex justify-center items-center w-full relative px-4 md:px-[60px]">
        <div className="flex flex-row items-center justify-between relative z-10 w-full max-w-[1092px] h-[224px]">
          <div className="flex flex-row items-center gap-4">
            <div className="w-[80px] h-[80px] rounded-full overflow-hidden transition-opacity duration-300 opacity-100">
              <Image src="https://assets.marioverdu.com/avatar/avatar-2.webp" alt="Mario Verdú" width={80} height={80} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-medium text-[hsl(var(--color-text))]">Mario Verdú</span>
              <span className="text-sm font-normal text-gray-500">Frontend Developer (Next.js / React)</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              role="button"
              tabIndex={0}
              aria-label="Contactar con Mario"
              className="empty-button-container cursor-pointer"
              onClick={() => {
                // Simular click en el botón flotante de abrir chat
                const chatButton = document.querySelector('button[aria-label="Open chat"]');
                if (chatButton) {
                  (chatButton as HTMLElement).click();
                  // Polling para esperar a que el chat esté abierto
                  let attempts = 0;
                  const maxAttempts = 20; // 2 segundos
                  const interval = setInterval(() => {
                    const chatWindow = document.querySelector('.chat-tuenti-window');
                    if (chatWindow) {
                      clearInterval(interval);
                      window.dispatchEvent(new CustomEvent("sendChatTuentiMessage", {
                        detail: { message: "Contactar con Mario" }
                      }));
                    } else if (++attempts > maxAttempts) {
                      clearInterval(interval);
                    }
                  }, 100);
                } else {
                  window.dispatchEvent(new CustomEvent("sendChatTuentiMessage", {
                    detail: { message: "Contactar con Mario" }
                  }));
                }
              }}
            >
              <Image alt="Contact button" src="https://assets.marioverdu.com/button/contact-button-blue/contact-button-unpressed.svg?t=1752833951898" width={71} height={36} style={{height:36, width:71}} />
            </div>
            <div className="relative">
              <button
                ref={buttonRef}
                aria-label="Opciones"
                aria-expanded={menuOpen}
                aria-haspopup="true"
                className="flex items-center justify-center w-9 h-9 rounded-[6px] bg-white/80 backdrop-blur-sm shadow-sm border border-gray-100 hover:bg-white/90 transition-colors"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="#3D5B6A">
                  <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
                </svg>
                <div className="absolute inset-0 rounded-[6px] pointer-events-none overflow-hidden opacity-[0.03] mix-blend-soft-light" style={{backgroundSize:'150%'}}></div>
              </button>
              {menuOpen && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fadeIn"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div className="py-1" role="none">
                  <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center rounded-md transition-colors"
                    role="menuitem"
                    onClick={handleDownloadPDF}
                  >
                      Descargar en PDF
                      <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="#3D5B6A" className="ml-2" aria-hidden="true">
                        <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"></path>
                      </svg>
                  </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ProfileCardPhone() {
  const [menuOpen, setMenuOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const [isClient, setIsClient] = useState(false)
  useEffect(() => { setIsClient(true) }, [])

  // Estado para la posición Y del menú contextual en móvil
  const [menuY, setMenuY] = useState<number | null>(null)

  // Cuando se abre el menú, calcula la posición Y del botón
  useEffect(() => {
    if (menuOpen && buttonRef.current && window.innerWidth < 768) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuY(rect.bottom + window.scrollY + 8); // 8px de separación
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [menuOpen])

  const handleDownloadPDF = () => {
    setMenuOpen(false)
    window.open("/cv-mario-verdu.pdf", "_blank")
  }

  // Renderizado condicional del menú contextual
  const menuContent = (
    <div
      ref={menuRef}
      className="w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fadeIn"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
    >
      <div className="flex justify-center sm:justify-start py-1" role="none">
        <button
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center rounded-md transition-colors"
          role="menuitem"
          onClick={handleDownloadPDF}
        >
          Descargar en PDF
          <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="#3D5B6A" className="ml-2" aria-hidden="true">
            <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"></path>
          </svg>
        </button>
      </div>
    </div>
  )

  return (
    <section className="mt-[40px]">
      <div className="flex justify-center items-center w-full relative px-4 md:px-[60px]">
        <div className="flex flex-col items-center justify-center relative z-10 px-4 w-full max-w-[1092px] py-[72px] gap-6">
          <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
            <Image src="https://assets.marioverdu.com/avatar/avatar-2.webp" alt="Mario Verdú" width={80} height={80} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-base font-medium text-[hsl(var(--color-text))]">Mario Verdú</span>
            <span className="text-sm font-normal text-gray-500">Frontend Developer (Next.js / React)</span>
          </div>
          <div className="flex items-center gap-2 w-full justify-center">
            <div
              role="button"
              tabIndex={0}
              aria-label="Contactar con Mario"
              className="empty-button-container cursor-pointer"
              onClick={() => {
                const chatButton = document.querySelector('button[aria-label="Open chat"]');
                if (chatButton) {
                  (chatButton as HTMLElement).click();
                  let attempts = 0;
                  const maxAttempts = 20;
                  const interval = setInterval(() => {
                    const chatWindow = document.querySelector('.chat-tuenti-window');
                    if (chatWindow) {
                      clearInterval(interval);
                      window.dispatchEvent(new CustomEvent("sendChatTuentiMessage", {
                        detail: { message: "Contactar con Mario" }
                      }));
                    } else if (++attempts > maxAttempts) {
                      clearInterval(interval);
                    }
                  }, 100);
                } else {
                  window.dispatchEvent(new CustomEvent("sendChatTuentiMessage", {
                    detail: { message: "Contactar con Mario" }
                  }));
                }
              }}
            >
              <Image alt="Contact button" src="https://assets.marioverdu.com/button/contact-button-blue/contact-button-unpressed.svg?t=1752833951898" width={71} height={36} style={{height:36, width:71}} />
            </div>
            <div className="relative">
              <button
                ref={buttonRef}
                aria-label="Opciones"
                aria-expanded={menuOpen}
                aria-haspopup="true"
                className="flex items-center justify-center w-9 h-9 rounded-[6px] bg-white/80 backdrop-blur-sm shadow-sm border border-gray-100 hover:bg-white/90 transition-colors"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="#3D5B6A">
                  <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
                </svg>
                <div className="absolute inset-0 rounded-[6px] pointer-events-none overflow-hidden opacity-[0.03] mix-blend-soft-light" style={{backgroundSize:'150%'}}></div>
              </button>
              {/* Menú contextual SOLO en md+ aquí */}
              <div className="hidden md:block">
              {menuOpen && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fadeIn"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                    <div className="py-1" role="none">
                  <button
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center rounded-md transition-colors"
                    role="menuitem"
                    onClick={handleDownloadPDF}
                  >
                        Descargar en PDF
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="#3D5B6A" className="ml-2" aria-hidden="true">
                          <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"></path>
                        </svg>
                  </button>
                    </div>
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
        {/* Menú contextual centrado en xs/sm (fuera del botón, pero a la misma altura Y) */}
        {isClient && menuOpen && menuY !== null && (
          <div
            className="fixed left-1/2 -translate-x-1/2 z-[9999] md:hidden"
            style={{ top: menuY, pointerEvents: 'auto' }}
          >
            {menuContent}
          </div>
        )}
      </div>
    </section>
  )
}

// Export por defecto para compatibilidad legacy
export default ProfileCardWidescreens;
