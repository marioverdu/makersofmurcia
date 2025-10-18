"use client"

import type React from "react"
import { useState, useRef } from "react"
import { cn } from "@/lib/utils" // Importar cn para unir clases condicionalmente
import { TimelineDivider } from "./timeline-divider" // Asegúrate de que TimelineDivider esté importado
import { CARD_EDUCATION_SECTION_DEFAULT_CLASSES, CARD_EDUCATION_SECTION_DEFAULT_STYLE } from "@/lib/design-tokens" // Import new constants

export interface WorkCardProps {
  companyName: string
  jobTitle: string
  year: string
  description: React.ReactNode
  detailedContent: React.ReactNode
  timelineType: "start" | "middle" | "end"
  logoSrc: string
  showHeaderBox?: boolean // Nuevo prop opcional
  hideExpandButton?: boolean // Nuevo prop para ocultar el botón expandir
  customBadge?: string // Nuevo prop para badges personalizados
}

export function WexpNestedCard({ companyName, jobTitle, year, logoSrc }: { companyName: string, jobTitle: string, year: string, logoSrc: string }) {
  // Si el jobTitle está vacío o es 'Untitled', muestro 'Untitled' en el span principal y el companyName en el secundario
  const isUntitled = !jobTitle || jobTitle.trim() === '' || jobTitle.trim().toLowerCase() === 'untitled';
  return (
    <div className="mt-4 p-3 w-full flex items-center justify-between border rounded-lg shadow-sm" style={{height:64, background:"rgba(255,255,255,0.3)", backdropFilter:"blur(8px)", borderColor:"#e5e7eb", borderWidth:1, borderStyle:"solid"}}>
      <div className="flex gap-2 items-center">
        <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
          <img alt={`${companyName} Logo`} className="w-full h-full object-cover" src={logoSrc || "/placeholder.svg"} />
        </div>
        <div className="flex-1 min-w-0 flex items-center">
          <h3 className="text-xs leading-tight overflow-hidden">
            <span className="font-medium text-[hsl(var(--color-text))]">{isUntitled ? 'Untitled' : jobTitle}</span>
            <span className="font-normal text-gray-500"> | {companyName}</span>
          </h3>
        </div>
      </div>
      <div className="text-xs font-medium text-gray-500 flex items-center flex-shrink-0 ml-1">{year}</div>
    </div>
  )
}

export function WorkCard({
  companyName,
  jobTitle,
  year,
  description,
  detailedContent,
  timelineType,
  logoSrc,
  showHeaderBox = false,
  hideExpandButton = false,
  customBadge,
}: WorkCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  const isWebUXUICard = companyName === "marioverdu.com"
  const isEducationCard =
    companyName === "UX/UI Design Bootcamp" ||
    companyName === "Publicidad y RRPP" ||
    companyName === "Instituto de Artes Visuales" ||
    companyName === "Example University" ||
    companyName === "Autoescuela Nueva Cosmos" ||
    // Añadir nombres en inglés
    companyName === "Advertising and PR" ||
    companyName === "Driving license"

  const isMarioVerduLogo = logoSrc === "https://assets.marioverdu.com/logo/empty.png"

  const shouldShowFooter = companyName !== "marioverdu.com" && !isEducationCard && !hideExpandButton

  // Ajustar el padding-bottom para que sea consistente en todas las tarjetas
  const sectionClass = "pb-0"

  return (
    <div className={`flex flex-col relative pl-8 ${sectionClass} w-full md:max-w-[576px]`}>
      <TimelineDivider type={timelineType} imageRef={imageRef as any} />

      <div
        className={cn(
          CARD_EDUCATION_SECTION_DEFAULT_CLASSES, // Aplicar las clases de la tarjeta de educación
        )}
        style={CARD_EDUCATION_SECTION_DEFAULT_STYLE} // Aplicar el estilo de la tarjeta de educación
      >
        <div className="p-3 w-full">
          <div className={cn("flex justify-between items-start", !isEducationCard && "mb-3", isEducationCard && "mb-1")}>
            <div className={cn("flex gap-2", isEducationCard ? "items-center" : "items-start")}>
              <div
                ref={imageRef}
                className={`rounded-md overflow-hidden flex-shrink-0 ${isMarioVerduLogo ? "bg-gray-100" : ""} ${!isEducationCard ? "w-9 h-9" : "w-10 h-10"}`}
              >
                <img
                  src={logoSrc || "/placeholder.svg"}
                  alt={`${companyName} Logo`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className={cn("flex-1 min-w-0", isEducationCard && "flex justify-center")}>
                <h3 className="text-xs leading-tight overflow-hidden">
                  <span className="font-medium text-[hsl(var(--color-text))]">
                    {isEducationCard
                      ? companyName === "UX/UI Design Bootcamp"
                        ? "IronHack"
                        : companyName === "Example University"
                          ? "Example University"
                        : companyName === "Autoescuela Nueva Cosmos"
                          ? jobTitle
                        : companyName === "Driving license"
                          ? jobTitle
                        : "UMU"
                      : jobTitle}
                  </span>
                  <span className="font-normal text-gray-500"> | {companyName}</span>
                </h3>

                {(isWebUXUICard || isEducationCard) && !customBadge ? null : (
                  <div className="mt-[3px] inline-flex items-center justify-center h-[15px] px-1 bg-[#FAFCFD] rounded-[99999px] border border-[hsl(var(--primary))]/10">
                    <span
                      className="text-[0.6rem] font-medium text-gray-600 leading-none"
                      style={{ paddingTop: "1px" }}
                    >
                      {customBadge || (companyName === "Desarrollador Full stack• CEO" ? "En desarrollo" : "NDA")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div
              className={`text-xs font-medium text-gray-500 ${isEducationCard ? "ml-auto self-center" : ""} flex items-center flex-shrink-0 ml-1`}
            >
              {year}
            </div>
          </div>

          {/* Eliminar el pl-10 condicional para la descripción, aplicar mt-1 consistente */}
          <div className="mt-1">
            {!isEducationCard && (
              <div style={{ paddingLeft: "44px", paddingRight: "24px" }}>
                <p className="text-sm font-normal leading-tight pr-6" style={{ color: "#6C727F", fontSize: "13.5px" }}>
                  {description}
                </p>

                {(isExpanded || isWebUXUICard) && (
                  <div className="mt-4 text-sm font-normal text-[#6C727F] space-y-3">{detailedContent}</div>
                )}
              </div>
            )}
          </div>
          {/* Nested card debe ir dentro de la caja de contenido principal */}
          {showHeaderBox && (
            <WexpNestedCard companyName={companyName} jobTitle={jobTitle} year={year} logoSrc={logoSrc} />
          )}
        </div>
                {shouldShowFooter && (
          <div className="py-2 px-3 border-t border-gray-200 flex justify-end w-full">
            <button onClick={() => setIsExpanded(!isExpanded)} className="text-xs" style={{ color: "#6C727F" }}>
              {isExpanded ? "Ver menos" : "Ver más"}
            </button>
          </div>
        )}
        {hideExpandButton && (
          <div className="py-2 px-3 border-t border-gray-200 flex justify-end w-full">
            <button className="text-xs" style={{ color: "#6C727F", visibility: "hidden" }}>
              Ver más
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
