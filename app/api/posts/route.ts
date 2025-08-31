import { NextRequest, NextResponse } from 'next/server'
import { getPosts, getPublishedPosts, createPost, CreatePostData } from '@/lib/posts-db'
import type { Locale } from '@/types/i18n'

// Función de localización inline para evitar problemas de import
function getLocalizedPostContent(post: any, lang: Locale) {
  const titleField = lang === 'es' ? 'title_es' : 'title_en'
  const contentField = lang === 'es' ? 'content_es' : 'content_en'
  const excerptField = lang === 'es' ? 'excerpt_es' : 'excerpt_en'
  
  const localizedTitle = post[titleField] || post.title_es || post.title
  const localizedContent = post[contentField] || post.content_es || post.content
  const localizedExcerpt = post[excerptField] || post.excerpt_es || post.excerpt
  
  const hasTranslation = {
    es: !!(post.title_es && post.content_es),
    en: !!(post.title_en && post.content_en)
  }
  
  return {
    ...post,
    title: localizedTitle,
    content: localizedContent,
    excerpt: localizedExcerpt,
    language: lang,
    hasTranslation
  }
}

// GET /api/posts - Obtener posts con soporte de localización
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const publishedOnly = searchParams.get('published') === 'true'
    const lang = (searchParams.get('lang') || 'es') as Locale
    
    let posts
    if (publishedOnly) {
      posts = await getPublishedPosts()
    } else {
      posts = await getPosts()
    }
    
    // Si se especifica un parámetro de idioma, localizar todos los posts
    if (searchParams.has('lang')) {
      const localizedPosts = posts.map(post => getLocalizedPostContent(post, lang))
      return NextResponse.json(localizedPosts)
    }
    
    // Sin parámetro de idioma, devolver posts normales (compatibilidad hacia atrás)
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error in GET /api/posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

// POST /api/posts - Crear nuevo post
export async function POST(request: NextRequest) {
  try {
    const body: CreatePostData = await request.json()
    
    // Validar campos requeridos
    if (!body.title || !body.slug || !body.content) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required' },
        { status: 400 }
      )
    }
    
    // Crear el post
    const post = await createPost(body)
    
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/posts:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
