"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function AdminHeaderV2({ hideAvatar = false }: { hideAvatar?: boolean }) {
  const [isAvatarInHeader, setIsAvatarInHeader] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const avatarThreshold = 100
      setIsAvatarInHeader(scrollY > avatarThreshold)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => {
    if (path === "/admin") return pathname === "/admin"
    return pathname.startsWith(path)
  }

  const tabClass = (active: boolean) =>
    `text-sm font-medium h-[40px] flex items-center px-1 border-b-2 transition-colors ` +
    (active
      ? "text-[#3D5B6A] border-[#3D5B6A]"
      : "text-gray-500 font-normal border-transparent hover:border-[#3D5B6A] hover:text-[#3D5B6A]")

  return (
    <div
      style={{
        width: '100%',
        height: '40px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'none',
        zIndex: 1000,
      }}
    >
      <div className="h-full flex" style={{ marginTop: '16px' }}>
        {/* Padding izquierdo transparente */}
        <div className="bg-transparent header-blue-padding" />
        {/* Contenido principal */}
        <div className="flex-1 flex items-center justify-between relative custom-header-padding glass-bg">
          {/* Avatar alineado a la izquierda */}
          {!hideAvatar && (
            <div
              style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', paddingLeft: 8 }}
            >
              <img
                alt="Mario Verdú"
                width={28}
                height={28}
                className={`h-[28px] w-[28px] object-cover rounded-full ${isAvatarInHeader ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                src="https://assets.marioverdu.com/avatar/avatar-2.webp"
              />
            </div>
          )}

          {/* Tabs centradas */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center gap-4">
              <Link href="/admin" className={tabClass(isActive('/admin'))}>Configuración</Link>
              <Link href="/admin/analytics" className={tabClass(isActive('/admin/analytics'))}>Analytics</Link>
              <Link href="/admin/posts" className={tabClass(isActive('/admin/posts'))}>Posts</Link>
              <Link href="/admin/booking" className={tabClass(isActive('/admin/booking'))}>Reservas</Link>
            </div>
          </div>

          {/* Acción a la derecha */}
          <div style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}>
            <Link href="/" className="px-3 py-1.5 rounded-md text-sm border border-[rgba(0,0,0,0.08)] bg-white/60 hover:bg-white text-gray-800">
              🌐 Ver Sitio
            </Link>
          </div>
        </div>
        {/* Padding derecho transparente */}
        <div className="bg-transparent header-blue-padding" />
      </div>

      <style jsx>{`
        @media (min-width: 480px) {
          .bg-cyan-400 { width: 32px !important; background: transparent !important; }
        }
        @media (min-width: 768px) {
          .bg-cyan-400 { width: 32px !important; background: transparent !important; }
        }
        @media (min-width: 1024px) {
          .bg-cyan-400 { width: 32px !important; background: transparent !important; }
        }
        @media (min-width: 1280px) {
          .bg-cyan-400 { width: 32px !important; background: transparent !important; }
        }
        @media (min-width: 1536px) {
          .bg-cyan-400 { width: 32px !important; background: transparent !important; }
        }
        .custom-header-padding { position: relative; padding-left: 0px; padding-right: 0px; }
        .glass-bg {
          background: rgba(255,255,255,0.3);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 12px;
          border: 1px solid rgba(0, 94, 182, 0.1);
        }
        .header-blue-padding { width: 12px; }
        @media (min-width: 480px) { .header-blue-padding { width: 32px; } }
        @media (min-width: 768px) { .header-blue-padding { width: 32px; } }
        @media (min-width: 1024px) { .header-blue-padding { width: 32px; } }
        @media (min-width: 1280px) { .header-blue-padding { width: 32px; } }
        @media (min-width: 1536px) { .header-blue-padding { width: 32px; } }
      `}</style>
    </div>
  )
}

export default AdminHeaderV2
