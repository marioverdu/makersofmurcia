import { DefaultSeoProps } from 'next-seo'

// Configuración global de SEO para todo el sitio
export const defaultSEOConfig: DefaultSeoProps = {
  titleTemplate: '%s | Mario Verdú - Blog',
  defaultTitle: 'Mario Verdú - Blog Personal y Portfolio',
  description: 'Blog personal de Mario Verdú con artículos sobre desarrollo web, tecnología, y experiencias profesionales. Portfolio y proyectos de desarrollo.',
  canonical: 'https://marioverdu.com',
  
  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://marioverdu.com',
    siteName: 'Mario Verdú - Blog',
    title: 'Mario Verdú - Blog Personal y Portfolio',
    description: 'Blog personal de Mario Verdú con artículos sobre desarrollo web, tecnología, y experiencias profesionales.',
    images: [
      {
        url: 'https://marioverdu.com/og-image-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Mario Verdú - Blog Personal y Portfolio',
      },
    ],
  },
  
  // Twitter Cards
  twitter: {
    handle: '@marioverdu',
    site: '@marioverdu',
    cardType: 'summary_large_image',
  },
  
  // Configuración adicional
  additionalMetaTags: [
    {
      name: 'author',
      content: 'Mario Verdú',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#3b82f6',
    },
  ],
  
  // Configuración de robots
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
  ],
}

// Configuración específica para posts del blog
export const postSEOConfig = {
  // Estructura de datos para artículos (JSON-LD)
  articleSchema: (post: any) => ({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || post.content?.substring(0, 160),
    image: post.featured_image || 'https://marioverdu.com/og-image-default.jpg',
    author: {
      '@type': 'Person',
      name: 'Mario Verdú',
      url: 'https://marioverdu.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mario Verdú',
      logo: {
        '@type': 'ImageObject',
        url: 'https://marioverdu.com/logo.png',
      },
    },
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://marioverdu.com/posts/${post.id}`,
    },
    articleSection: 'Blog',
    keywords: post.tags?.join(', ') || 'desarrollo web, tecnología, blog',
    inLanguage: 'es-ES',
  }),
  
  // Configuración de Open Graph para posts
  postOpenGraph: (post: any) => ({
    type: 'article',
    title: post.title,
    description: post.excerpt || post.content?.substring(0, 160),
    url: `https://marioverdu.com/posts/${post.id}`,
    images: [
      {
        url: post.featured_image || 'https://marioverdu.com/og-image-default.jpg',
        width: 1200,
        height: 630,
        alt: post.title,
      },
    ],
    publishedTime: post.created_at,
    modifiedTime: post.updated_at || post.created_at,
    author: 'Mario Verdú',
    section: 'Blog',
    tags: post.tags || ['desarrollo web', 'tecnología'],
  }),
  
  // Configuración de Twitter Cards para posts
  postTwitterCard: (post: any) => ({
    card: 'summary_large_image',
    title: post.title,
    description: post.excerpt || post.content?.substring(0, 160),
    image: post.featured_image || 'https://marioverdu.com/og-image-default.jpg',
    creator: '@marioverdu',
    site: '@marioverdu',
  }),
}
