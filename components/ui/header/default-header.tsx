"use client"

import React from "react"
import { StorybookHeaderTabs } from "@/components/ui/header/storybook-tabs"
import { HeaderContextualMenu } from "@/components/ui/header/header-contextual-menu"
import type { Locale } from "@/types/i18n"

interface DefaultHeaderProps {
  className?: string
  lang?: Locale
}

export function DefaultHeader({ className = "", lang = "es" }: DefaultHeaderProps) {
  return (
    <div
      className={`w-full h-[40px] relative ${className}`}
      style={{
        background: 'none',
        zIndex: 1000,
      }}
    >
      <div className="h-full flex" style={{ marginTop: '16px' }}>
        {/* Padding izquierdo transparente */}
        <div className="bg-transparent header-blue-padding" />
        {/* Contenido principal: avatar a la izquierda y tabs centradas */}
        <div className="flex-1 flex items-center justify-between relative custom-header-padding glass-bg">
          {/* Avatar alineado exactamente al borde izquierdo */}
          <div
            className="avatar-container"
            style={{ 
              position: 'absolute', 
              left: 0, 
              top: '50%', 
              transform: 'translateY(-50%)', 
              paddingLeft: 8,
              width: '44px',  // 28px (avatar) + 16px (padding)
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}
          >
            <img
              alt="Mario Verdú"
              width={28}
              height={28}
              className="h-[28px] w-[28px] object-cover rounded-full opacity-100"
              src="https://assets.marioverdu.com/avatar/avatar-2.webp"
            />
          </div>
          
          {/* Tabs centradas absolutamente */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <StorybookHeaderTabs className="mx-auto md:mx-0 justify-center md:justify-start" pathname="/" lang={lang} />
          </div>
          
          {/* Header Contextual Menu alineado exactamente al borde derecho - MISMO TAMAÑO QUE AVATAR */}
          <div
            className="language-container"
            style={{ 
              position: 'absolute', 
              right: 0, 
              top: '50%', 
              transform: 'translateY(-50%)', 
              paddingRight: 8,
              width: '44px',  // MISMO TAMAÑO: 28px (contenido) + 16px (padding)
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            <HeaderContextualMenu currentLang={lang} hidden={true} />
          </div>
        </div>
        {/* Padding derecho transparente */}
        <div className="bg-transparent header-blue-padding" />
      </div>
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
        .header-blue-padding {
          width: 12px;
        }
        .avatar-container, .language-container {
          /* Ambos contenedores tienen exactamente el mismo tamaño */
          width: 44px;
          height: 28px;
          display: flex;
          align-items: center;
        }
        .avatar-container {
          justify-content: flex-start;
        }
        .language-container {
          justify-content: flex-end;
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
