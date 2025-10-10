"use client"
import { WorkCard } from "./work-card"
import { WexpNestedCard } from "./work-card"
import type { Locale } from "@/types/i18n"
import { useWorkExperienceTranslations } from "@/hooks/use-work-experience-translations"

export interface WorkExperienceSectionProps {
  className?: string
  lang?: Locale
}

export function WorkExperienceSection({ className = "", lang = "es" }: WorkExperienceSectionProps) {
  const t = useWorkExperienceTranslations(lang)
  return (
    <div className={`flex flex-col w-full work-experience-section ${className}`}>
      <h2 className="text-sm font-medium text-[hsl(var(--color-text))] mb-2 mt-0">{t.workExperience}</h2>
      <div className="relative w-full">
        {/* Work experience cards */}
        <div className="relative w-full">
          {/* Nueva tarjeta Lorem Ipsum */}
          <WorkCard
            companyName="????"
            jobTitle={t.fullStackDeveloper}
            year="2025"
            description={
              <>
                {t.simpleCMSDescription}
              </>
            }
            detailedContent={null}
            timelineType="start"
            logoSrc="https://assets.marioverdu.com/logo/12.png" // Usar un placeholder para el logo
            hideExpandButton={true}
          />

          {/* Proqio */}
          <WorkCard
            companyName="Proqio"
            jobTitle={t.uxuiDesigner}
            year="2023"
            description={t.proqioDescription}
            detailedContent={
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  {t.proqioInfoArchitecture}
                </li>
                <li>
                  {t.proqioComponentResearch}
                </li>
                <li>
                  {t.proqioDesignSystemRedesign}
                </li>
                <li>
                  {t.proqioComponentDefinition}
                </li>
                <li>
                  {t.proqioUserFlowImprovement}
                </li>
                <li>
                  {t.proqioTailwindUITranslation}
                </li>
              </ul>
            }
            timelineType="middle" // Cambiado a middle ya que ahora hay una tarjeta antes
            logoSrc="https://assets.marioverdu.com/logo/8.png"
          />

          {/* Status Pilot */}
          <WorkCard
            companyName="Status Pilot"
            jobTitle={t.uxuiDesigner}
            year="2022"
            description={t.statusPilotDescription}
            detailedContent={
              <>
                <p className="mb-2">{t.requirements}</p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>
                    {t.requirementsGathering}
                  </li>
                  <li>
                    {t.wireframing}
                  </li>
                  <li>
                    {t.userFlowDefinition}
                  </li>
                  <li>
                    {t.interactivePrototype}
                  </li>
                  <li>
                    {t.exportableStyleGuide}
                  </li>
                  <li>
                    {t.designSystemDefinition}
                  </li>
                  <li>
                    {t.screenComponentization}
                  </li>
                  <li>
                    {t.dimensionsSpacingReview}
                  </li>
                  <li>
                    {t.accessibleDocumentation}
                  </li>
                </ul>
              </>
            }
            timelineType="middle"
            logoSrc="https://assets.marioverdu.com/logo/7.png"
          />

          {/* Leverade */}
          <WorkCard
            companyName="Leverade"
            jobTitle={t.uxuiDesigner}
            year="2022"
            description={t.leveradeDescription}
            detailedContent={
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  {t.marketResearch}
                </li>
                <li>
                  {t.continuousValidation}
                </li>
                <li>
                  {t.brandAssetsHomogenization}
                </li>
                <li>
                  {t.uxuiDesign}
                </li>
                <li>
                  {t.designSystemUIDefinition}
                </li>
                <li>
                  {t.versionControl}
                </li>
                <li>
                  {t.styleGuideGeneration}
                </li>
              </ul>
            }
            timelineType="middle"
            logoSrc="https://assets.marioverdu.com/logo/9.png"
          />

          {/* Digio Soluciones */}
          <WorkCard
            companyName="Digio Soluciones"
            jobTitle={t.uxuiDesigner}
            year="2020"
            description={t.digioDescription}
            detailedContent={
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  {t.requirementsCommunication}
                </li>
                <li>
                  {t.documentationInfoArchitecture}
                </li>
                <li>
                  {t.uxDesign}
                </li>
                <li>
                  {t.uiDesign}
                </li>
                <li>
                  {t.designSystemMaintenance}
                </li>
                <li>
                  {t.styleGuideAssetsGeneration}
                </li>
                <li>
                  {t.highLowFidelityPrototyping}
                </li>
                <li>
                  {t.testingBugReporting}
                </li>
              </ul>
            }
            timelineType="middle"
            logoSrc="https://assets.marioverdu.com/logo/10.png"
          />

          {/* marioverdu.com */}
                <WorkCard
            companyName="marioverdu.com"
            jobTitle={t.uxuiDesigner}
            year="2018-2024"
            description=""
            detailedContent={
              <>
                <p className="mb-4">{t.portfolioIntro}</p>
                <WexpNestedCard companyName={t.dailyWine} jobTitle={t.uxuiDesigner} year="2024" logoSrc="https://assets.marioverdu.com/logo/empty.png" />
                <WexpNestedCard companyName={t.portfolioRedesign} jobTitle={t.uxuiDesigner} year="2021" logoSrc="https://assets.marioverdu.com/logo/empty.png" />
                <WexpNestedCard companyName={t.dainappRedesign} jobTitle={t.uxuiDesigner} year="2021" logoSrc="https://assets.marioverdu.com/logo/empty.png" />
                <WexpNestedCard companyName={t.savetechUITest} jobTitle={t.uxuiDesigner} year="2021" logoSrc="https://assets.marioverdu.com/logo/empty.png" />
                <WexpNestedCard companyName={t.readCvForkUI} jobTitle={t.uxuiDesigner} year="2021" logoSrc="https://assets.marioverdu.com/logo/empty.png" />
                <WexpNestedCard companyName={t.vapeShopUI} jobTitle={t.uxuiDesigner} year="2028" logoSrc="https://assets.marioverdu.com/logo/empty.png" />
                <WexpNestedCard companyName={t.youflixUIConcept} jobTitle={t.uxuiDesigner} year="2017" logoSrc="https://assets.marioverdu.com/logo/empty.png" />
                <WexpNestedCard companyName={t.nameUpConcept} jobTitle={t.graphicDesigner} year="2016" logoSrc="https://assets.marioverdu.com/logo/empty.png" />
                <WexpNestedCard companyName={t.newsbotUIConcept} jobTitle={t.uxuiDesigner} year="" logoSrc="https://assets.marioverdu.com/logo/empty.png" />
                <WexpNestedCard companyName={t.universityAppUIConcept} jobTitle={t.uxuiDesigner} year="" logoSrc="https://assets.marioverdu.com/logo/empty.png" />
              </>
            }
            timelineType="end"
            logoSrc="https://assets.marioverdu.com/logo/empty.png"
          />
        </div>
      </div>
    </div>
  )
}
