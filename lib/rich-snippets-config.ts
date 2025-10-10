// Configuración para fragmentos enriquecidos (Rich Snippets) y Rich Results de Google

export const richSnippetsConfig = {
  // Configuración para artículos de blog (BlogPosting)
  blogPosting: (post: any) => ({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || post.content?.substring(0, 160),
    image: post.featured_image || 'https://marioverdu.com/og-image-default.jpg',
    author: {
      '@type': 'Person',
      name: post.author || 'Mario Verdú',
      url: 'https://marioverdu.com',
      jobTitle: 'Desarrollador Web Full Stack',
      worksFor: {
        '@type': 'Organization',
        name: 'Mario Verdú - Desarrollo Web',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mario Verdú',
      logo: {
        '@type': 'ImageObject',
        url: 'https://marioverdu.com/logo.png',
        width: 200,
        height: 200,
      },
    },
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://marioverdu.com/posts/${post.id}`,
    },
    articleSection: 'Blog',
    keywords: post.tags?.join(', ') || 'desarrollo web, tecnología, blog, programación',
    inLanguage: 'es-ES',
    wordCount: post.content?.replace(/<[^>]*>/g, '').length || 0,
    timeRequired: 'PT5M', // 5 minutos de lectura estimados
    isAccessibleForFree: true,
    license: 'https://creativecommons.org/licenses/by/4.0/',
  }),

  // Configuración para listas de artículos (ItemList)
  articleList: (posts: any[], currentPage = 1, totalPages = 1) => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Artículos del Blog - Página ${currentPage}`,
    description: `Lista de artículos sobre desarrollo web y tecnología. Página ${currentPage} de ${totalPages}.`,
    numberOfItems: posts.length,
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'BlogPosting',
        '@id': `https://marioverdu.com/posts/${post.id}`,
        headline: post.title,
        description: post.excerpt || post.content?.substring(0, 160),
        author: {
          '@type': 'Person',
          name: post.author || 'Mario Verdú',
        },
        datePublished: post.created_at,
        dateModified: post.updated_at || post.created_at,
      },
    })),
  }),

  // Configuración para organización (Organization)
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mario Verdú - Desarrollo Web',
    url: 'https://marioverdu.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://marioverdu.com/logo.png',
      width: 200,
      height: 200,
    },
    description: 'Desarrollo de producto digital alineado con tu visión de negocio',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES',
      addressLocality: 'España',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'marioverdugambin@gmail.com',
    },
    sameAs: [
      'https://github.com/marioverdu',
      'https://linkedin.com/in/marioverdu',
      'https://twitter.com/marioverdu',
    ],
    founder: {
      '@type': 'Person',
      name: 'Mario Verdú',
      jobTitle: 'Desarrollador Web Full Stack',
      knowsAbout: ['Desarrollo Web', 'React', 'Next.js', 'TypeScript', 'Node.js'],
    },
  },

  // Configuración para persona (Person)
  person: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mario Verdú',
    url: 'https://marioverdu.com',
    image: 'https://assets.marioverdu.com/avatar/avatar-2.webp',
    jobTitle: 'Desarrollador Web Full Stack',
    worksFor: {
      '@type': 'Organization',
      name: 'Mario Verdú - Desarrollo Web',
    },
    knowsAbout: [
      'Desarrollo Web Frontend',
      'React.js',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Bases de Datos',
      'APIs REST',
      'GraphQL',
      'DevOps',
      'Docker',
      'AWS',
    ],
    hasCredential: [
      'Ingeniería Informática',
      'Certificaciones de Desarrollo Web',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Universidad de Informática',
    },
    sameAs: [
      'https://github.com/marioverdu',
      'https://linkedin.com/in/marioverdu',
      'https://twitter.com/marioverdu',
    ],
  },

  // Configuración para sitio web (WebSite)
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Mario Verdú - Blog Personal y Portfolio',
    url: 'https://marioverdu.com',
    description: 'Blog personal de Mario Verdú con artículos sobre desarrollo web, tecnología, y experiencias profesionales.',
    author: {
      '@type': 'Person',
      name: 'Mario Verdú',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mario Verdú',
    },
    inLanguage: 'es-ES',
    isAccessibleForFree: true,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://marioverdu.com/posts?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  },

  // Configuración para breadcrumbs (BreadcrumbList)
  breadcrumbs: (path: string[]) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: path.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item,
      item: `https://marioverdu.com/${path.slice(0, index + 1).join('/')}`,
    })),
  }),

  // Configuración para FAQ (FAQPage)
  faq: (questions: Array<{ question: string; answer: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }),

  // Configuración para HowTo (HowTo)
  howTo: (title: string, steps: string[], totalTime: string, tools: string[] = []) => ({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description: `Guía paso a paso: ${title}`,
    totalTime: totalTime,
    tool: tools.map(tool => ({
      '@type': 'HowToTool',
      name: tool,
    })),
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text: step,
    })),
  }),
}
