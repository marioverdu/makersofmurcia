import { Metadata } from 'next'
import { getSiteUrl } from '@/lib/env-config'

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  author?: string
  creator?: string
  url?: string
  image?: {
    url: string
    width: number
    height: number
    alt: string
  }
  type?: 'website' | 'article' | 'profile'
  locale?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
  canonical?: string
  alternates?: Record<string, string>
  noIndex?: boolean
  noFollow?: boolean
  googleVerification?: string
  bingVerification?: string
  yandexVerification?: string
}

export interface SchemaConfig {
  type: 'Person' | 'Organization' | 'WebSite' | 'Article' | 'BreadcrumbList' | 'LocalBusiness'
  data: Record<string, any>
}

export class SEOEngine {
  private baseUrl: string
  private defaultConfig: Partial<SEOConfig>

  constructor(baseUrl: string = getSiteUrl(), defaultConfig: Partial<SEOConfig> = {}) {
    this.baseUrl = baseUrl
    this.defaultConfig = {
      author: 'Mario Verdú',
      creator: 'Mario Verdú',
      locale: 'es_ES',
      type: 'website',
      ...defaultConfig
    }
  }

  /**
   * Genera metadata completa para una página
   */
  async generateMetadata(config: SEOConfig): Promise<Metadata> {
    const fullConfig = { ...this.defaultConfig, ...config }
    const canonicalUrl = fullConfig.canonical 
      ? `${this.baseUrl}${fullConfig.canonical}`
      : fullConfig.url || this.baseUrl

    const metadata: Metadata = {
      title: fullConfig.title,
      description: fullConfig.description,
      keywords: fullConfig.keywords,
      authors: [{ name: fullConfig.author || 'Mario Verdú' }],
      creator: fullConfig.creator,
      metadataBase: new URL(this.baseUrl),
      alternates: {
        canonical: canonicalUrl,
        languages: fullConfig.alternates || undefined,
      },
      robots: {
        index: !fullConfig.noIndex,
        follow: !fullConfig.noFollow,
        googleBot: {
          index: !fullConfig.noIndex,
          follow: !fullConfig.noFollow,
        },
      },
      openGraph: await this.generateOpenGraph(fullConfig),
      twitter: await this.generateTwitterCard(fullConfig),
      verification: this.generateVerification(fullConfig),
    }

    return metadata
  }

  /**
   * Genera Open Graph tags
   */
  private async getOgUrlWithBust(): Promise<string> {
    try {
      const { kv } = await import('@vercel/kv')
      const last = (await kv.get<string>('og_image_last_updated')) || ''
      // usar endpoint dinámico estable
      return `${this.baseUrl}/opengraph-image${last ? `?v=${encodeURIComponent(last)}` : ''}`
    } catch {
      return `${this.baseUrl}/opengraph-image`
    }
  }

  private async generateOpenGraph(config: SEOConfig) {
    const fallback = await this.getOgUrlWithBust()
    const imageUrl = config.image?.url || fallback
    
    return {
      title: config.title,
      description: config.description,
      url: config.url || this.baseUrl,
      siteName: 'Mario Verdú',
      images: [
        {
          url: imageUrl,
          width: config.image?.width || 1200,
          height: config.image?.height || 630,
          alt: config.image?.alt || 'Mario Verdú UX/UI Designer',
        },
      ],
      locale: config.locale || 'es_ES',
      type: config.type || 'website',
      publishedTime: config.publishedTime,
      modifiedTime: config.modifiedTime,
      section: config.section,
      tags: config.tags,
    }
  }

  /**
   * Genera Twitter Card tags
   */
  private async generateTwitterCard(config: SEOConfig) {
    const fallback = await this.getOgUrlWithBust()
    const imageUrl = config.image?.url || fallback
    
    return {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: [imageUrl],
      creator: '@marioverdu',
      site: '@marioverdu',
    }
  }

  /**
   * Genera tags de verificación
   */
  private generateVerification(config: SEOConfig) {
    const verification: Record<string, string> = {}
    
    if (config.googleVerification) {
      verification.google = config.googleVerification
    }
    if (config.bingVerification) {
      verification.other = config.bingVerification
    }
    if (config.yandexVerification) {
      verification.yandex = config.yandexVerification
    }

    return Object.keys(verification).length > 0 ? verification : undefined
  }

  /**
   * Genera Schema.org JSON-LD
   */
  generateSchema(schemaConfig: SchemaConfig): string {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": schemaConfig.type,
      ...schemaConfig.data
    }

    return JSON.stringify(baseSchema)
  }

  /**
   * Genera Schema para Persona/Profesional
   */
  generatePersonSchema(config: {
    name: string
    jobTitle: string
    url: string
    sameAs?: string[]
    address?: {
      locality: string
      country: string
    }
    image?: string
    description?: string
  }) {
    return this.generateSchema({
      type: 'Person',
      data: {
        name: config.name,
        jobTitle: config.jobTitle,
        url: config.url,
        sameAs: config.sameAs || [
          "https://dribbble.com/marioverdu",
          "https://read.cv/marioverdu",
          "https://www.behance.net/marioverdu",
          "https://linkedin.com/in/marioverdu"
        ],
        address: config.address ? {
          "@type": "PostalAddress",
          addressLocality: config.address.locality,
          addressCountry: config.address.country
        } : undefined,
        image: config.image,
        description: config.description,
      }
    })
  }

  /**
   * Genera Schema para WebSite
   */
  generateWebsiteSchema(config: {
    name: string
    url: string
    description?: string
    potentialAction?: {
      "@type": string
      target: string
      "query-input": string
    }
  }) {
    return this.generateSchema({
      type: 'WebSite',
      data: {
        name: config.name,
        url: config.url,
        description: config.description,
        potentialAction: config.potentialAction,
      }
    })
  }

  /**
   * Genera Schema para BreadcrumbList
   */
  generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
    return this.generateSchema({
      type: 'BreadcrumbList',
      data: {
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      }
    })
  }

  /**
   * Genera sitemap data
   */
  generateSitemapData(pages: Array<{
    url: string
    lastModified?: Date
    changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
    priority?: number
  }>) {
    return pages.map(page => ({
      url: page.url.startsWith('http') ? page.url : `${this.baseUrl}${page.url}`,
      lastModified: page.lastModified || new Date(),
      changeFrequency: page.changeFrequency || 'monthly',
      priority: page.priority || 0.5,
    }))
  }

  /**
   * Genera robots.txt content
   */
  generateRobotsTxt(sitemapUrl?: string): string {
    let robots = `User-agent: *
Allow: /

Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /static/

Sitemap: ${sitemapUrl || `${this.baseUrl}/sitemap.xml`}`

    return robots
  }
}

// Instancia global del motor SEO
export const seoEngine = new SEOEngine(getSiteUrl(), {
  author: 'Mario Verdú',
  creator: 'Mario Verdú',
  locale: 'es_ES',
  type: 'website',
})

// Configuraciones predefinidas para páginas comunes
export const seoConfigs = {
  home: {
    title: 'Mario Verdú | UX/UI Designer Valencia',
    description: 'Mario Verdú, UX/UI Designer especializado en soluciones de experiencia e interfaz centradas en el usuario. Portfolio y servicios de diseño web en Valencia.',
    keywords: ['Mario Verdú', 'UX Designer', 'UI Designer', 'Valencia', 'Diseño Web', 'Portfolio'],
    url: getSiteUrl(),
    image: {
      url: `${getSiteUrl()}/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: 'Mario Verdú - UX/UI Designer en Valencia'
    }
  },
  workExperience: {
    title: 'Experiencia Laboral | Mario Verdú - UX/UI Designer',
    description: 'Descubre la experiencia laboral y trayectoria profesional de Mario Verdú como UX/UI Designer. Proyectos, empresas y logros en diseño de productos digitales.',
    keywords: ['Mario Verdú', 'Experiencia Laboral', 'UX Designer', 'UI Designer', 'Portfolio', 'Trayectoria Profesional'],
    url: `${getSiteUrl()}/work-experience`,
    // Sin image específica para usar el endpoint dinámico
  },
  posts: {
    title: 'Blog | Mario Verdú - UX/UI Designer',
    description: 'Artículos y reflexiones sobre UX/UI Design, diseño de productos digitales y tendencias en la industria del diseño.',
    keywords: ['Blog', 'UX Design', 'UI Design', 'Diseño Digital', 'Mario Verdú', 'Artículos'],
    url: `${getSiteUrl()}/posts`,
    image: {
      url: `${getSiteUrl()}/og-blog.jpg`,
      width: 1200,
      height: 630,
      alt: 'Blog - Mario Verdú UX/UI Designer'
    }
  }
}
