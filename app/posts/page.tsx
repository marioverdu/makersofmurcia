import { Metadata } from "next"
import { seoEngine, seoConfigs } from "@/lib/seo-engine"
import PostsPageClient from "../[lang]/posts/posts-page-client"
import { getDictionary } from "@/lib/get-dictionary"
import PostsListSEO from "@/components/seo/posts-list-seo"

// Función para detectar si estamos en desarrollo
function isDevelopment() {
  return process.env.NODE_ENV === 'development' || 
         process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production'
}

// Metadata SEO para la página de posts
export const metadata: Metadata = seoEngine.generateMetadata(seoConfigs.posts)

export default async function PostsPage() {
  const isDev = isDevelopment()
  
  // En desarrollo, usar el diccionario en español
  if (isDev) {
    const dict = await getDictionary('es')
    return (
      <>
        <PostsListSEO />
        <PostsPageClient lang="es" dict={dict} />
      </>
    )
  }
  
  // En producción, redirigir al sistema de locales
  return (
    <>
      <PostsListSEO />
      <PostsPageClient />
    </>
  )
}
