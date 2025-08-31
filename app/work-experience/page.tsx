import type React from "react"
import { Metadata } from "next"
import { seoEngine, seoConfigs } from "@/lib/seo-engine"
import { PersonSchemaMarkup, BreadcrumbSchemaMarkup } from "@/components/seo-schema-markup"
import WorkExperienceClient from "../work-experience/work-experience-client"
import { getDictionary } from "@/lib/get-dictionary"

// Función para detectar si estamos en desarrollo
function isDevelopment() {
  return process.env.NODE_ENV === 'development' || 
         process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production'
}

// Metadata SEO para la página de experiencia laboral
export const metadata: Metadata = seoEngine.generateMetadata(seoConfigs.workExperience)

export default async function WorkExperiencePage() {
  const isDev = isDevelopment()
  
  // En desarrollo, usar el diccionario en español
  if (isDev) {
    const dict = await getDictionary('es')
    return (
      <>
        {/* Schema.org Markup para SEO */}
        <PersonSchemaMarkup />
        <BreadcrumbSchemaMarkup 
          items={[
            { name: dict.navigation.home, url: 'https://marioverdu.com' },
            { name: dict.workExperience.title, url: 'https://marioverdu.com/work-experience' }
          ]} 
        />
        
        {/* Componente cliente con toda la lógica */}
        <WorkExperienceClient lang="es" dict={dict} />
      </>
    )
  }
  
  // En producción, redirigir al sistema de locales
  return <WorkExperienceClient />
}
