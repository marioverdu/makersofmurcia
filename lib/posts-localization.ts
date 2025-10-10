import type { Post } from './posts-db'
import type { Locale } from '@/types/i18n'

/**
 * Interfaz para el contenido localizado de un post
 */
export interface LocalizedPostContent {
  id: number
  title: string
  content: string
  excerpt?: string
  featured_image?: string
  published: boolean
  status: 'published' | 'draft' | 'scheduled'
  author: string
  views: number
  category?: string
  tags?: string[]
  created_at: string
  updated_at: string
  slug: string
  // Metadatos de localización
  language: Locale
  hasTranslation: {
    es: boolean
    en: boolean
  }
}

/**
 * Obtiene el contenido localizado de un post
 * @param post - Post original de la base de datos
 * @param lang - Idioma deseado ('es' | 'en')
 * @returns Post con contenido en el idioma especificado
 */
export function getLocalizedPostContent(post: Post, lang: Locale): LocalizedPostContent {
  // Determinar qué campos usar según el idioma
  const titleField = lang === 'es' ? 'title_es' : 'title_en'
  const contentField = lang === 'es' ? 'content_es' : 'content_en'
  const excerptField = lang === 'es' ? 'excerpt_es' : 'excerpt_en'
  
  // Obtener contenido localizado con fallback al idioma por defecto
  const localizedTitle = post[titleField] || post.title_es || post.title
  const localizedContent = post[contentField] || post.content_es || post.content
  const localizedExcerpt = post[excerptField] || post.excerpt_es || post.excerpt
  
  // Verificar qué traducciones están disponibles
  const hasTranslation = {
    es: !!(post.title_es && post.content_es),
    en: !!(post.title_en && post.content_en)
  }
  
  return {
    id: post.id,
    title: localizedTitle,
    content: localizedContent,
    excerpt: localizedExcerpt,
    featured_image: post.featured_image,
    published: post.published,
    status: post.status,
    author: post.author,
    views: post.views,
    category: post.category,
    tags: post.tags,
    created_at: post.created_at,
    updated_at: post.updated_at,
    slug: post.slug,
    language: lang,
    hasTranslation
  }
}

/**
 * Verifica si un post tiene traducción en un idioma específico
 * @param post - Post a verificar
 * @param lang - Idioma a verificar
 * @returns true si tiene traducción completa, false si no
 */
export function hasPostTranslation(post: Post, lang: Locale): boolean {
  if (lang === 'es') {
    return !!(post.title_es && post.content_es)
  }
  if (lang === 'en') {
    return !!(post.title_en && post.content_en)
  }
  return false
}

/**
 * Obtiene una lista de idiomas disponibles para un post
 * @param post - Post a verificar
 * @returns Array de idiomas disponibles
 */
export function getAvailableLanguages(post: Post): Locale[] {
  const languages: Locale[] = []
  
  if (post.title_es && post.content_es) {
    languages.push('es')
  }
  
  if (post.title_en && post.content_en) {
    languages.push('en')
  }
  
  return languages
}

/**
 * Obtiene el idioma principal de un post (el idioma con más contenido)
 * @param post - Post a analizar
 * @returns Idioma principal del post
 */
export function getPrimaryLanguage(post: Post): Locale {
  // Si tiene contenido en español, considerarlo principal
  if (post.title_es && post.content_es) {
    return 'es'
  }
  
  // Si tiene contenido en inglés, considerarlo principal
  if (post.title_en && post.content_en) {
    return 'en'
  }
  
  // Fallback al español como idioma por defecto
  return 'es'
}

/**
 * Genera un slug localizado para un post
 * @param post - Post base
 * @param lang - Idioma deseado
 * @returns Slug localizado
 */
export function getLocalizedSlug(post: Post, lang: Locale): string {
  // Por ahora usamos el mismo slug para todos los idiomas
  // En el futuro se podría implementar slugs específicos por idioma
  return post.slug
}
