"use client"

import Image from "next/image"
import { CARD_EDUCATION_SECTION_DEFAULT_CLASSES, CARD_EDUCATION_SECTION_DEFAULT_STYLE } from "@/lib/design-tokens"
import MouseScrollIndicator from "@/components/mouse-scroll-indicator"
import { MasterStackedImages } from "@/components/master-stacked-images"
import { HeaderTabs } from "@/components/ui/header/tabs"

import { useState } from "react"
import ChatTuentiButtonMaster from "@/components/chat-tuenti/chat-tuenti-button-master"

export default function StyleguidePage() {
  const [activeTab, setActiveTab] = useState<'components' | 'tokens'>('components')
  return (
    <div className="min-h-screen w-full p-4 flex flex-col text-left gap-y-10">
      {/* Tab bar stock */}
      <div className="w-full mb-8">
        <div className="flex border-b border-gray-200 bg-white rounded-t-lg overflow-hidden">
          <button
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors duration-200 focus:outline-none ${activeTab === 'components' ? 'bg-white text-blue-700 border-b-2 border-blue-700' : 'bg-gray-50 text-gray-500 hover:text-blue-700'}`}
            onClick={() => setActiveTab('components')}
          >
            Components
          </button>
          <button
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors duration-200 focus:outline-none ${activeTab === 'tokens' ? 'bg-white text-blue-700 border-b-2 border-blue-700' : 'bg-gray-50 text-gray-500 hover:text-blue-700'}`}
            onClick={() => setActiveTab('tokens')}
          >
            Design tokens
          </button>
        </div>
      </div>
      {/* Tab content */}
      <div className="w-full">
        {activeTab === 'components' ? (
          <div className="flex flex-col text-left gap-y-10 w-full">
            {/* --- CONTENIDO ACTUAL DE STYLEGUIDE --- */}
            {/* Texto sin formato */}
            <div className="w-full text-left">card/education-section/default</div>
            {/* El div con el design token aplicado */}
            <div className={CARD_EDUCATION_SECTION_DEFAULT_CLASSES} style={CARD_EDUCATION_SECTION_DEFAULT_STYLE}>
              <div className="p-3 w-full">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex gap-2 items-center">
                    <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 ">
                      <Image
                        alt="Example University Logo"
                        className="w-full h-full object-cover"
                        src="/placeholder.svg?height=40&width=40"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex justify-center">
                      <h3 className="text-xs leading-tight overflow-hidden">
                        <span className="font-medium text-[hsl(var(--color-text))]">Example University</span>
                        <span className="font-normal text-gray-500"> | Example University</span>
                      </h3>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-gray-500 ml-auto self-center flex items-center flex-shrink-0 ml-1">
                    2020
                  </div>
                </div>
                <div className="mt-1 "></div>
              </div>
            </div>
            <div className="w-full text-left">hero/landing/default</div>
            {/* Hero duplicado de landing */}
            <div
              className="flex justify-center items-center w-full relative"
              style={{
                backgroundImage: "url('http://assets.marioverdu.com/bg/landing-bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center top",
                backgroundRepeat: "no-repeat",
                height: "100vh",
                marginTop: "-40px",
                paddingTop: "40px",
              }}
            >
              <div
                className="claim flex flex-col items-center md:items-center lg:items-start relative z-10 gap-[12px] md:gap-[16px] xl:gap-[24px] px-4 md:px-[60px] w-full max-w-[1092px] py-[60px]"
                style={{ paddingLeft: 16, paddingRight: 16 }}
              >
                <div
                  className="w-[28px] h-[28px] rounded-full overflow-hidden transition-opacity duration-300 opacity-100 self-center md:self-center lg:self-start"
                >
                  <img
                    src="https://assets.marioverdu.com/avatar/avatar-2.webp"
                    alt="Avatar"
                    width={28}
                    height={28}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="relative overflow-hidden h-[24px] md:h-[30px] xl:h-[36px] w-full text-center md:text-center lg:text-left">
                  <p className="text-center md:text-center lg:text-left text-[16px] md:text-[20px] xl:text-[24px] absolute top-0 left-0 right-0 transition-all duration-800 ease-in-out text-[hsl(var(--color-text))] font-thin opacity-90 translate-y-0 opacity-90">
                    Trabaja inteligentemente no más
                  </p>
                </div>
                <div className="text-text leading-tight w-full text-center md:text-center lg:text-left">
                  <p className="text-center md:text-center lg:text-left text-[24px] md:text-[32px] xl:text-[44px] font-medium text-[hsl(var(--color-text))]">
                    Diseño de producto digital
                  </p>
                  <p className="text-center md:text-center lg:text-left text-[24px] md:text-[32px] xl:text-[44px] font-medium text-[hsl(var(--color-text))]">
                    enfocado en tu visión de negocio
                  </p>
                </div>
                <div className="hidden lg:block">
                  <div className="hidden sm:flex items-center justify-center md:scale-[1.33] xl:scale-[1.67]" style={{width:32,height:32,position:'relative',minWidth:32,minHeight:32,animation:'subtleBounce 3.5s infinite cubic-bezier(0.45, 0, 0.55, 1)'}}>
                    <div className="mouse-animation" style={{width:20,height:32,margin:2,borderRadius:10,border:'3px solid #3D5B6A',backgroundColor:'#FFFFFF',display:'flex',justifyContent:'center',position:'relative',minWidth:20,minHeight:32,aspectRatio:'1/1.6',flexShrink:0}}>
                      <div style={{width:6.67,height:4,borderRadius:3.33,backgroundColor:'#3D5B6A',opacity:0.5,position:'absolute',top:3.33,minWidth:6.67,flexShrink:0}}></div>
                      <div style={{position:'absolute',top:10,display:'flex',flexDirection:'column',alignItems:'center',width:6.67,flexShrink:0,transform:'none'}}>
                        <svg width="6.67px" height="6.67px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{flexShrink:0}}>
                          <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="#3D5B6A" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Animación de ratón archivada */}
                <div className="w-full text-left mb-2">MouseScrollIndicator (animación de ratón tipo hero/landing/default)</div>
                <div className="hidden lg:block">
                  <MouseScrollIndicator
                    color="hsl(206,1%,27%)"
                    backgroundColor="#FFFFFF"
                    className="md:scale-[1.33] xl:scale-[1.67]"
                  />
                </div>
              </div>
            </div>
            {/* MasterStackedImages demo */}
            <div className="w-full text-left mt-10">master-stacked-images (enrutado: components/master-stacked-images.tsx)</div>
            <div className="mb-10">
              <MasterStackedImages />
            </div>

            {/* Demo: ChatTuentiButtonMaster */}
            <div className="w-full text-left mb-2">
              ChatTuentiButtonMaster (botón flotante de chat Tuenti)
              <DemoChatTuentiButtonMaster
                isOpen={false}
                onClick={() => alert('Abrir/cerrar chat')}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[300px] w-full">
            <div className="text-gray-400 text-lg font-medium">No data</div>
          </div>
        )}
      </div>
    </div>
  )
}

// Utilidad para quitar la clase 'fixed' del botón demo
function DemoChatTuentiButtonMaster(props: any) {
  return (
    <ChatTuentiButtonMaster
      {...props}
      className="relative static my-2"
      position={undefined}
    />
  );
}
