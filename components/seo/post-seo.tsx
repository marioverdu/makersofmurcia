import Script from 'next/script'

interface PostSEOProps {
  post: {
    id: string | number
    title: string
    excerpt?: string
    content?: string
    featured_image?: string
    created_at: string
    updated_at?: string
    tags?: string[]
    author?: string
    category?: string
  }
  canonicalUrl?: string
  lang?: string
}

export default function PostSEO({ post, canonicalUrl, lang = 'es' }: PostSEOProps) {
  const postUrl = canonicalUrl || `https://marioverdu.com/posts/view/${post.id}`
  
  // Generar descripción desde el contenido si no hay excerpt
  const description = post.excerpt || 
    (post.content ? post.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...' : '')
  
  // Generar JSON-LD Schema.org para artículos
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: description,
    image: post.featured_image ? [post.featured_image] : ['https://marioverdu.com/og-image-default.jpg'],
    author: {
      '@type': 'Person',
      name: post.author || 'Mario Verdú',
      url: 'https://marioverdu.com',
      jobTitle: lang === 'es' ? 'UX/UI Designer' : 'UX/UI Designer',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mario Verdú',
      logo: {
        '@type': 'ImageObject',
        url: 'https://marioverdu.com/logo.png',
        width: 60,
        height: 60,
      },
    },
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    articleSection: post.category || 'Blog',
    keywords: post.tags?.join(', ') || (lang === 'es' ? 'desarrollo web, tecnología, blog' : 'web development, technology, blog'),
    inLanguage: lang === 'es' ? 'es-ES' : 'en-US',
    url: postUrl,
  }

  // Breadcrumbs Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://marioverdu.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Posts',
        item: `https://marioverdu.com/${lang}/posts`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  }

  // WebSite Schema para búsquedas
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Mario Verdú',
    url: 'https://marioverdu.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://marioverdu.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      {/* JSON-LD Schema.org para artículos */}
      <Script
        id={`article-schema-${post.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      
      {/* JSON-LD Schema.org para breadcrumbs */}
      <Script
        id={`breadcrumb-schema-${post.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      
      {/* JSON-LD Schema.org para website */}
      <Script
        id={`website-schema-${post.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  )
}
