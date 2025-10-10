import { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/env-config'
import type { Locale } from '@/types/i18n'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl()
  const locales: Locale[] = ['es', 'en']
  
  // URLs estáticas del sitio para cada idioma
  const staticUrls: MetadataRoute.Sitemap = []
  
  // Páginas principales por idioma
  locales.forEach(locale => {
    staticUrls.push(
      {
        url: `${baseUrl}/${locale}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/${locale}/posts`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/${locale}/work-experience`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }
    )
  })

  // Página raíz (redirige a /es/)
  staticUrls.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  })

  try {
    // Obtener posts del blog para el sitemap
    const postsResponse = await fetch(`${baseUrl}/api/posts`, {
      next: { revalidate: 3600 }, // Revalidar cada hora
    })
    
    if (postsResponse.ok) {
      const posts = await postsResponse.json()
      
      // Agregar URLs de posts por idioma al sitemap
      const postUrls: MetadataRoute.Sitemap = []
      
      posts.forEach((post: any) => {
        // URL localizada para cada idioma
        locales.forEach(locale => {
          postUrls.push({
            url: `${baseUrl}/${locale}/posts/view/${post.id}`,
            lastModified: new Date(post.updated_at || post.created_at),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
          })
        })
        
        // URL no localizada (redirige a /es/posts/view/[id])
        postUrls.push({
          url: `${baseUrl}/posts/view/${post.id}`,
          lastModified: new Date(post.updated_at || post.created_at),
          changeFrequency: 'weekly' as const,
          priority: 0.5,
        })
      })
      
      return [...staticUrls, ...postUrls]
    }
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error)
  }
  
  // Si hay error, devolver solo URLs estáticas
  return staticUrls
}
