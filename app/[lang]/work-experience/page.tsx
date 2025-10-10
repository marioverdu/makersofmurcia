import type React from "react"
import { Metadata } from "next"
import { seoEngine, seoConfigs } from "@/lib/seo-engine"
import { PersonSchemaMarkup, BreadcrumbSchemaMarkup } from "@/components/seo-schema-markup"
import WorkExperienceClient from "@/components/work-experience-client"
import { getDictionary } from "@/lib/get-dictionary"
import type { Locale } from "@/types/i18n"
import { RouteGuard } from "@/lib/route-guard"

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  
  return await seoEngine.generateMetadata({
    ...seoConfigs.workExperience,
    title: dict.workExperience.title,
    description: dict.workExperience.subtitle,
  })
}

export default async function WorkExperiencePage({ params }: PageProps) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  
  return (
    <RouteGuard params={params} routePath="/work-experience" fallbackStrategy="block">
      {/* Schema.org Markup para SEO */}
      <PersonSchemaMarkup />
      <BreadcrumbSchemaMarkup 
        items={[
          { name: dict.navigation.home, url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://marioverdu.com'}/${lang}` },
          { name: dict.workExperience.title, url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://marioverdu.com'}/${lang}/work-experience` }
        ]} 
      />
      
      {/* Componente cliente con toda la lógica */}
      <WorkExperienceClient lang={lang} dict={dict} />
    </RouteGuard>
  )
}
