"use client"

import { AdminHeaderTabs } from "./admin-tabs"

export function AdminHeader() {
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
        
        {/* Contenido principal: diseño responsive según espacio disponible */}
        <div className="flex-1 custom-header-padding glass-bg">
          {/* Layout para pantallas grandes: tabs centradas absolutamente (diseño original) */}
          <div className="hidden md:flex md:items-center md:relative h-full">
            {/* Avatar alineado exactamente al borde izquierdo */}
            <div
              style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', paddingLeft: 8 }}
            >
              <img
                alt="Mario Verdú"
                width={28}
                height={28}
                className="h-[28px] w-[28px] object-cover rounded-full opacity-100"
                src="https://assets.marioverdu.com/avatar/avatar-2.webp"
              />
            </div>

            {/* Tabs de navegación de admin centradas absolutamente */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <AdminHeaderTabs className="mx-auto md:mx-0 justify-center md:justify-start" />
            </div>
          </div>

          {/* Layout para pantallas pequeñas: flexbox con gap mínimo de 4px */}
          <div className="flex md:hidden items-center justify-center h-full" style={{ gap: '4px', paddingLeft: '8px', paddingRight: '8px' }}>
            {/* Avatar con flex-shrink-0 (no se comprime) */}
            <div className="flex-shrink-0">
              <img
                alt="Mario Verdú"
                width={28}
                height={28}
                className="h-[28px] w-[28px] object-cover rounded-full opacity-100"
                src="https://assets.marioverdu.com/avatar/avatar-2.webp"
              />
            </div>

            {/* Tabs con overflow horizontal si es necesario */}
            <div className="flex-1 flex justify-center overflow-x-auto scrollbar-hide">
              <AdminHeaderTabs className="mx-auto justify-center" />
            </div>
          </div>
        </div>

        {/* Padding derecho transparente */}
        <div className="bg-transparent header-blue-padding" />
      </div>

      {/* Estilos globales para el header - EXACTOS del root */}
      <style jsx>{`
        .custom-header-padding {
          position: relative;
          padding-left: 0px;
          padding-right: 0px;
        }
        .glass-bg {
          background: rgba(255,255,255,0.3);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 12px;
          border: 1px solid rgba(0, 94, 182, 0.1);
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .header-blue-padding {
          width: 12px;
        }
        @media (min-width: 480px) {
          .header-blue-padding {
            width: 32px;
          }
        }
        @media (min-width: 768px) {
          .header-blue-padding {
            width: 32px;
          }
        }
        @media (min-width: 1024px) {
          .header-blue-padding {
            width: 32px;
          }
        }
        @media (min-width: 1280px) {
          .header-blue-padding {
            width: 32px;
          }
        }
        @media (min-width: 1536px) {
          .header-blue-padding {
            width: 32px;
          }
        }
      `}</style>
    </div>
  )
}

