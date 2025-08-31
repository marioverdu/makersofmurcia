import { sql } from '@vercel/postgres'

export interface Post {
  id: number
  title: string
  slug: string
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
  // Campos de traducción
  title_es?: string
  title_en?: string
  content_es?: string
  content_en?: string
  excerpt_es?: string
  excerpt_en?: string
}

export interface CreatePostData {
  title: string
  slug: string
  content: string
  excerpt?: string
  featured_image?: string
  published?: boolean
  status?: 'published' | 'draft' | 'scheduled'
  author?: string
  category?: string
  tags?: string[]
  // Campos de traducción
  title_es?: string
  title_en?: string
  content_es?: string
  content_en?: string
  excerpt_es?: string
  excerpt_en?: string
}

export interface UpdatePostData {
  title?: string
  slug?: string
  content?: string
  excerpt?: string
  featured_image?: string
  published?: boolean
  status?: 'published' | 'draft' | 'scheduled'
  author?: string
  category?: string
  tags?: string[]
  // Campos de traducción
  title_es?: string
  title_en?: string
  content_es?: string
  content_en?: string
  excerpt_es?: string
  excerpt_en?: string
}

// Obtener todos los posts
export async function getPosts(): Promise<Post[]> {
  try {
    const result = await sql`
      SELECT 
        id, title, slug, content, excerpt, featured_image, 
        published, status, author, views, category, tags,
        created_at, updated_at,
        title_es, title_en, content_es, content_en, excerpt_es, excerpt_en
      FROM posts 
      ORDER BY created_at DESC
    `
    
    return result.rows.map(row => ({
      ...row,
      tags: row.tags || []
    }))
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw new Error('Failed to fetch posts')
  }
}

// Obtener posts publicados
export async function getPublishedPosts(): Promise<Post[]> {
  try {
    const result = await sql`
      SELECT 
        id, title, slug, content, excerpt, featured_image, 
        published, status, author, views, category, tags,
        created_at, updated_at,
        title_es, title_en, content_es, content_en, excerpt_es, excerpt_en
      FROM posts 
      WHERE published = true AND status = 'published'
      ORDER BY created_at DESC
    `
    
    return result.rows.map(row => ({
      ...row,
      tags: row.tags || []
    }))
  } catch (error) {
    console.error('Error fetching published posts:', error)
    throw new Error('Failed to fetch published posts')
  }
}

// Obtener un post por ID
export async function getPostById(id: number): Promise<Post | null> {
  try {
    const result = await sql`
      SELECT 
        id, title, slug, content, excerpt, featured_image, 
        published, status, author, views, category, tags,
        created_at, updated_at,
        title_es, title_en, content_es, content_en, excerpt_es, excerpt_en
      FROM posts 
      WHERE id = ${id}
    `
    
    if (result.rows.length === 0) {
      return null
    }
    
    const row = result.rows[0]
    return {
      ...row,
      tags: row.tags || []
    }
  } catch (error) {
    console.error('Error fetching post by ID:', error)
    throw new Error('Failed to fetch post')
  }
}

// Obtener un post por slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const result = await sql`
      SELECT 
        id, title, slug, content, excerpt, featured_image, 
        published, status, author, views, category, tags,
        created_at, updated_at,
        title_es, title_en, content_es, content_en, excerpt_es, excerpt_en
      FROM posts 
      WHERE slug = ${slug}
    `
    
    if (result.rows.length === 0) {
      return null
    }
    
    const row = result.rows[0]
    return {
      ...row,
      tags: row.tags || []
    }
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    throw new Error('Failed to fetch post')
  }
}

// Crear un nuevo post
export async function createPost(data: CreatePostData): Promise<Post> {
  try {
    const result = await sql`
      INSERT INTO posts (
        title, slug, content, excerpt, featured_image, 
        published, status, author, category, tags,
        title_es, title_en, content_es, content_en, excerpt_es, excerpt_en
      ) VALUES (
        ${data.title}, ${data.slug}, ${data.content}, ${data.excerpt}, ${data.featured_image},
        ${data.published ?? true}, ${data.status ?? 'draft'}, ${data.author ?? 'Mario Verdú'}, 
        ${data.category}, ${data.tags},
        ${data.title_es}, ${data.title_en}, ${data.content_es}, ${data.content_en}, ${data.excerpt_es}, ${data.excerpt_en}
      ) RETURNING *
    `
    
    const row = result.rows[0]
    return {
      ...row,
      tags: row.tags || []
    }
  } catch (error) {
    console.error('Error creating post:', error)
    throw new Error('Failed to create post')
  }
}

// Actualizar un post
export async function updatePost(id: number, data: UpdatePostData): Promise<Post> {
  try {
    const result = await sql`
      UPDATE posts SET
        title = COALESCE(${data.title}, title),
        slug = COALESCE(${data.slug}, slug),
        content = COALESCE(${data.content}, content),
        excerpt = COALESCE(${data.excerpt}, excerpt),
        featured_image = COALESCE(${data.featured_image}, featured_image),
        published = COALESCE(${data.published}, published),
        status = COALESCE(${data.status}, status),
        author = COALESCE(${data.author}, author),
        category = COALESCE(${data.category}, category),
        tags = COALESCE(${data.tags}, tags),
        title_es = COALESCE(${data.title_es}, title_es),
        title_en = COALESCE(${data.title_en}, title_en),
        content_es = COALESCE(${data.content_es}, content_es),
        content_en = COALESCE(${data.content_en}, content_en),
        excerpt_es = COALESCE(${data.excerpt_es}, excerpt_es),
        excerpt_en = COALESCE(${data.excerpt_en}, excerpt_en),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `
    
    if (result.rows.length === 0) {
      throw new Error('Post not found')
    }
    
    const row = result.rows[0]
    return {
      ...row,
      tags: row.tags || []
    }
  } catch (error) {
    console.error('Error updating post:', error)
    throw new Error('Failed to update post')
  }
}

// Eliminar un post
export async function deletePost(id: number): Promise<void> {
  try {
    const result = await sql`
      DELETE FROM posts WHERE id = ${id}
    `
    
    if (result.rowCount === 0) {
      throw new Error('Post not found')
    }
  } catch (error) {
    console.error('Error deleting post:', error)
    throw new Error('Failed to delete post')
  }
}

// Incrementar vistas de un post
export async function incrementViews(id: number): Promise<void> {
  try {
    await sql`
      UPDATE posts SET views = views + 1 WHERE id = ${id}
    `
  } catch (error) {
    console.error('Error incrementing views:', error)
    throw new Error('Failed to increment views')
  }
}

// Obtener estadísticas de posts
export async function getPostStats() {
  try {
    const result = await sql`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'published') as published,
        COUNT(*) FILTER (WHERE status = 'draft') as drafts,
        COUNT(*) FILTER (WHERE status = 'scheduled') as scheduled,
        SUM(views) as total_views
      FROM posts
    `
    
    return result.rows[0]
  } catch (error) {
    console.error('Error fetching post stats:', error)
    throw new Error('Failed to fetch post stats')
  }
}
