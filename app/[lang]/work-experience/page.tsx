import type React from "react"
import { Metadata } from "next"
import { seoEngine, seoConfigs } from "@/lib/seo-engine"
import { PersonSchemaMarkup, BreadcrumbSchemaMarkup } from "@/components/seo-schema-markup"
import WorkExperienceClient from "../../work-experience/work-experience-client"
import { getDictionary } from "@/lib/get-dictionary"
import type { Locale } from "@/types/i18n"

interface PageProps {
  params: { lang: Locale }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  
  return seoEngine.generateMetadata({
    ...seoConfigs.workExperience,
    title: dict.workExperience.title,
    description: dict.workExperience.subtitle,
  })
}

export default async function WorkExperiencePage({ params }: PageProps) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  
  return (
    <>
      {/* Schema.org Markup para SEO */}
      <PersonSchemaMarkup />
      <BreadcrumbSchemaMarkup 
        items={[
          { name: dict.navigation.home, url: `https://marioverdu.com/${lang}` },
          { name: dict.workExperience.title, url: `https://marioverdu.com/${lang}/work-experience` }
        ]} 
      />
      
      {/* Componente cliente con toda la lógica */}
      <WorkExperienceClient lang={lang} dict={dict} />
    </>
  )
}
