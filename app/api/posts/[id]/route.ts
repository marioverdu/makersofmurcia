import { NextRequest, NextResponse } from 'next/server'
import { getPostById, updatePost, deletePost } from '@/lib/posts-db'
import type { Locale } from '@/types/i18n'

// Función de localización inline
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

// GET /api/posts/[id] - Obtener un post por ID con soporte de localización
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid post ID' },
        { status: 400 }
      )
    }

    // Obtener parámetro de idioma de la URL
    const { searchParams } = new URL(request.url)
    const lang = (searchParams.get('lang') || 'es') as Locale

    const post = await getPostById(id)
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    // Obtener contenido localizado si se especifica idioma
    if (searchParams.has('lang')) {
      const localizedPost = getLocalizedPostContent(post, lang)
      return NextResponse.json(localizedPost)
    }

    // Sin parámetro de idioma, devolver post normal
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error in GET /api/posts/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

// PUT /api/posts/[id] - Actualizar un post con soporte bilingüe
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid post ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') as Locale | null

    // Si se especifica un idioma, actualizar solo los campos de ese idioma
    if (lang) {
      const updateData: any = {}
      
      if (lang === 'es') {
        if (body.title) updateData.title_es = body.title
        if (body.content) updateData.content_es = body.content
        if (body.excerpt) updateData.excerpt_es = body.excerpt
        // Mantener backward compatibility
        if (body.title) updateData.title = body.title
        if (body.content) updateData.content = body.content
        if (body.excerpt) updateData.excerpt = body.excerpt
      } else if (lang === 'en') {
        if (body.title) updateData.title_en = body.title
        if (body.content) updateData.content_en = body.content
        if (body.excerpt) updateData.excerpt_en = body.excerpt
      }
      
      // Campos comunes (no específicos del idioma)
      if (body.featured_image !== undefined) updateData.featured_image = body.featured_image
      if (body.published !== undefined) updateData.published = body.published
      if (body.status !== undefined) updateData.status = body.status
      if (body.author !== undefined) updateData.author = body.author
      if (body.category !== undefined) updateData.category = body.category
      if (body.tags !== undefined) updateData.tags = body.tags
      if (body.slug !== undefined) updateData.slug = body.slug

      const post = await updatePost(id, updateData)
      return NextResponse.json(post)
    } else {
      // Sin parámetro de idioma, usar el comportamiento original
      const post = await updatePost(id, body)
      return NextResponse.json(post)
    }
  } catch (error) {
    console.error('Error in PUT /api/posts/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

// DELETE /api/posts/[id] - Eliminar un post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid post ID' },
        { status: 400 }
      )
    }

    await deletePost(id)
    
    return NextResponse.json(
      { message: 'Post deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in DELETE /api/posts/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
