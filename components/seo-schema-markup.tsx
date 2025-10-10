'use client'

import { useEffect } from 'react'

interface SchemaMarkupProps {
  schema: string
  id?: string
}

export function SchemaMarkup({ schema, id = 'schema-markup' }: SchemaMarkupProps) {
  useEffect(() => {
    // Remover schema anterior si existe
    const existingScript = document.getElementById(id)
    if (existingScript) {
      existingScript.remove()
    }

    // Crear nuevo script
    const script = document.createElement('script')
    script.id = id
    script.type = 'application/ld+json'
    script.textContent = schema
    document.head.appendChild(script)

    // Cleanup
    return () => {
      const scriptToRemove = document.getElementById(id)
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [schema, id])

  return null
}

// Componentes específicos para diferentes tipos de schema
export function PersonSchemaMarkup() {
  const { seoEngine } = require('@/lib/seo-engine')
  const { getSiteUrl } = require('@/lib/env-config')
  const siteUrl = getSiteUrl()
  
  const schema = seoEngine.generatePersonSchema({
    name: 'Mario Verdú',
    jobTitle: 'UX/UI Designer',
    url: siteUrl,
    address: {
      locality: 'Valencia',
      country: 'ES'
    },
    image: 'https://assets.marioverdu.com/avatar/avatar-2.webp',
    description: 'UX/UI Designer especializado en soluciones de experiencia e interfaz centradas en el usuario.'
  })

  return <SchemaMarkup schema={schema} id="person-schema" />
}

export function WebsiteSchemaMarkup() {
  const { seoEngine } = require('@/lib/seo-engine')
  const { getSiteUrl } = require('@/lib/env-config')
  const siteUrl = getSiteUrl()
  
  const schema = seoEngine.generateWebsiteSchema({
    name: 'Mario Verdú - UX/UI Designer',
    url: siteUrl,
    description: 'Portfolio y servicios de UX/UI Design de Mario Verdú',
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  })

  return <SchemaMarkup schema={schema} id="website-schema" />
}

export function BreadcrumbSchemaMarkup({ items }: { items: Array<{ name: string; url: string }> }) {
  const { seoEngine } = require('@/lib/seo-engine')
  
  const schema = seoEngine.generateBreadcrumbSchema(items)
  return <SchemaMarkup schema={schema} id="breadcrumb-schema" />
}
