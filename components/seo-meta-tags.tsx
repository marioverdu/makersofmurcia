"use client"

import { useEffect, useState } from "react"
import { RouteManagementService } from "@/lib/route-management-service"

interface SEOMetaTagsProps {
  path: string
  fallbackTitle?: string
  fallbackDescription?: string
  fallbackKeywords?: string
}

export function SEOMetaTags({ 
  path, 
  fallbackTitle = "Mario Verdú - Desarrollador Web", 
  fallbackDescription = "Desarrollador web y consultor tecnológico especializado en React, Next.js y aplicaciones modernas",
  fallbackKeywords = "desarrollador web, react, next.js, javascript, typescript, consultor tecnológico"
}: SEOMetaTagsProps) {
  const [routeData, setRouteData] = useState<{
    title?: string
    description?: string
    keywords?: string
    isIndexable: boolean
    robotsAllow: boolean
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadRouteData() {
      try {
        const route = await RouteManagementService.getRoute(path)
        if (route) {
          setRouteData({
            title: route.seo_title,
            description: route.seo_description,
            keywords: route.seo_keywords,
            isIndexable: route.is_indexable,
            robotsAllow: route.robots_allow
          })
        }
      } catch (error) {
        console.warn("Error loading route SEO data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadRouteData()
  }, [path])

  if (loading) {
    return null
  }

  const title = routeData?.title || fallbackTitle
  const description = routeData?.description || fallbackDescription
  const keywords = routeData?.keywords || fallbackKeywords
  const isIndexable = routeData?.isIndexable ?? true
  const robotsAllow = routeData?.robotsAllow ?? true

  // Determinar contenido del meta robots
  const robotsContent = []
  if (!isIndexable) robotsContent.push("noindex")
  if (!robotsAllow) robotsContent.push("nofollow")
  if (robotsContent.length === 0) robotsContent.push("index, follow")

  return (
    <>
      {/* Meta tags básicos */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Robots meta tag */}
      <meta name="robots" content={robotsContent.join(", ")} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://marioverdu.com'}${path}`} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://marioverdu.com'}${path}`} />
      
      {/* Si la ruta no es indexable, agregar meta tags adicionales */}
      {!isIndexable && (
        <>
          <meta name="googlebot" content="noindex, nofollow" />
          <meta name="bingbot" content="noindex, nofollow" />
        </>
      )}
    </>
  )
}
