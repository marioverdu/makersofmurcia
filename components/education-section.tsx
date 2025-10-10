"use client"
import { WorkCard } from "./work-card"
import { useWorkExperienceTranslations } from "@/hooks/use-work-experience-translations"
import InitialEducationCard from "./work-card/initialeducationcard";

export interface EducationSectionProps {
  className?: string
  lang?: string
}

export function EducationSection({ className = "", lang }: EducationSectionProps) {
  const t = useWorkExperienceTranslations(lang)
  
  return (
    <div className={`flex flex-col w-full education-section ${className}`}>
        {/* Estilo personalizado para reducir el espaciado entre cards en educación */}
        <style jsx>{`
          .education-section .flex.flex-col.relative {
            padding-bottom: 0; /* 0px = pb-0, reducido desde pb-8 (32px) */
          }
        `}</style>
        <h2 className="text-sm font-medium text-[hsl(var(--color-text))] mb-2 mt-0">{t.education}</h2>
        <div className="relative w-full">
          {/* components/educationcard-initial.tsx */}
          <WorkCard
            companyName="Autoescuela Nueva Cosmos"
            jobTitle={t.drivingLicense}
            year="2025"
            description={""}
            detailedContent={null}
            timelineType="start"
            logoSrc="https://assets.marioverdu.com/logo/12.png"
            showHeaderBox={false}
          />

          {/* components/educationcard-middle.tsx */}
          <WorkCard
            companyName={t.uxuiBootcamp}
            jobTitle="IronHack"
            year="2018"
            description=""
            detailedContent={null}
            timelineType="middle"
            logoSrc="https://assets.marioverdu.com/logo/4.png"
            showHeaderBox={false}
          />

          {/* components/educationcard-middle.tsx */}
          <WorkCard
            companyName={t.advertisingPR}
            jobTitle="UMU"
            year="2018"
            description=""
            detailedContent={null}
            timelineType="middle"
            logoSrc="https://assets.marioverdu.com/logo/2.png"
            showHeaderBox={false}
          />

          {/* components/educationcard-last.tsx */}
          <WorkCard
            companyName={t.advertisingPR}
            jobTitle="UMU"
            year="2017"
            description=""
            detailedContent={null}
            timelineType="end"
            logoSrc="https://assets.marioverdu.com/logo/3.png"
            showHeaderBox={false}
          />
        </div>
      </div>
  )
}
