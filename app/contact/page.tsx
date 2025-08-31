import { Metadata } from "next"
import { seoEngine, seoConfigs } from "@/lib/seo-engine"
import ContactPageClient from "../[lang]/contact/contact-page-client"
import { getDictionary } from "@/lib/get-dictionary"

// Función para detectar si estamos en desarrollo
function isDevelopment() {
  return process.env.NODE_ENV === 'development' || 
         process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production'
}

// Metadata SEO para la página de contacto
export const metadata: Metadata = seoEngine.generateMetadata(seoConfigs.contact)

export default async function ContactPage() {
  const isDev = isDevelopment()
  
  // En desarrollo, usar el diccionario en español
  if (isDev) {
    const dict = await getDictionary('es')
    return <ContactPageClient lang="es" dict={dict} />
  }
  
  // En producción, redirigir al sistema de locales
  return <ContactPageClient />
}
