import { Metadata } from "next"
import { seoEngine, seoConfigs } from "@/lib/seo-engine"
import PostsPageClient from "../[lang]/posts/posts-page-client"
import { getDictionary } from "@/lib/get-dictionary"
import PostsListSEO from "@/components/seo/posts-list-seo"
import { headers } from 'next/headers'

// Función para detectar idioma del navegador
function detectBrowserLanguage(): 'es' | 'en' {
  const headersList = headers()
  const acceptLanguage = headersList.get('accept-language') || ''
  const userAgent = headersList.get('user-agent') || ''
  
  // Detectar idioma desde Accept-Language
  if (acceptLanguage) {
    const languages = acceptLanguage
      .split(',')
      .map(lang => {
        const [code] = lang.split(';')
        return code.trim().split('-')[0].toLowerCase()
      })
      .filter(lang => lang === 'es' || lang === 'en')
    
    if (languages.length > 0) {
      return languages[0] as 'es' | 'en'
    }
  }
  
  // Detectar desde User-Agent
  if (userAgent.toLowerCase().includes('en')) {
    return 'en'
  }
  
  // Fallback a español
  return 'es'
}

// Función para detectar si estamos en desarrollo
function isDevelopment() {
  return process.env.NODE_ENV === 'development' || 
         process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production'
}

// Metadata SEO para la página de posts
export const metadata: Metadata = seoEngine.generateMetadata(seoConfigs.posts)

export default async function PostsPage() {
  const isDev = isDevelopment()
  const detectedLang = detectBrowserLanguage()
  
  console.log('🌍 [PostsPage] Detected language:', detectedLang)
  
  // Usar el idioma detectado
  const dict = await getDictionary(detectedLang)
  return (
    <>
      <PostsListSEO />
      <PostsPageClient lang={detectedLang} dict={dict} />
    </>
  )
}
