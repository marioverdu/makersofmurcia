import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

/**
 * POST /api/admin/posts/fix-category
 * 
 * Actualiza la categoría de posts existentes que no tienen categoría
 * o tienen una categoría incorrecta para que aparezcan en /posts
 */
export async function POST(request: NextRequest) {
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" || process.env.NODE_ENV === "production"
  
  try {
    console.log(`🔄 [${isProduction ? "PROD" : "DEV"}] Iniciando corrección de categorías...`)
    
    // Obtener posts sin categoría o con categoría incorrecta
    const postsToFix = await sql`
      SELECT id, title, category, content_type
      FROM posts 
      WHERE category IS NULL 
         OR category NOT IN ('postsv2', 'about', 'portfolio')
      ORDER BY created_at DESC
    `

    console.log(`📊 [${isProduction ? "PROD" : "DEV"}] Encontrados ${postsToFix.length} posts que necesitan corrección`)

    const results = {
      total: postsToFix.length,
      success: 0,
      errors: 0,
      details: [] as Array<{ postId: number, title: string, oldCategory: string | null, newCategory: string, status: string, error?: string }>
    }

    // Actualizar cada post
    for (const post of postsToFix) {
      try {
        // Determinar la categoría correcta basándonos en content_type
        let newCategory = 'postsv2' // Por defecto
        
        const contentType = (post.content_type || '').toLowerCase()
        if (contentType === 'portfolio') {
          newCategory = 'portfolio'
        } else if (post.category === 'about') {
          newCategory = 'about' // Mantener 'about' si ya lo tiene
        }
        
        console.log(`🔄 [${isProduction ? "PROD" : "DEV"}] Actualizando post ${post.id}: "${post.title}" (${post.category || 'NULL'} → ${newCategory})`)
        
        await sql`
          UPDATE posts 
          SET category = ${newCategory}
          WHERE id = ${post.id}
        `
        
        results.success++
        results.details.push({
          postId: post.id,
          title: post.title,
          oldCategory: post.category,
          newCategory: newCategory,
          status: 'success'
        })
        
        console.log(`✅ [${isProduction ? "PROD" : "DEV"}] Categoría actualizada exitosamente para post ${post.id}`)
      } catch (error) {
        console.error(`❌ [${isProduction ? "PROD" : "DEV"}] Error actualizando post ${post.id}:`, error)
        results.errors++
        results.details.push({
          postId: post.id,
          title: post.title,
          oldCategory: post.category,
          newCategory: 'postsv2',
          status: 'error',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }

    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
    console.log(`📊 [${isProduction ? "PROD" : "DEV"}] RESUMEN DE CORRECCIÓN:`)
    console.log(`   Total de posts: ${results.total}`)
    console.log(`   ✅ Actualizados exitosamente: ${results.success}`)
    console.log(`   ❌ Errores: ${results.errors}`)
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)

    // Obtener estadísticas finales
    const stats = await sql`
      SELECT 
        category,
        COUNT(*) as count
      FROM posts
      GROUP BY category
      ORDER BY count DESC
    `

    return NextResponse.json({
      success: true,
      message: `Corrección completada: ${results.success} exitosas, ${results.errors} errores`,
      results,
      categoryStats: stats,
      environment: isProduction ? "production" : "development"
    })

  } catch (error) {
    console.error(`❌ [${isProduction ? "PROD" : "DEV"}] Error en corrección de categorías:`, error)
    return NextResponse.json(
      {
        success: false,
        error: 'Error al corregir categorías de posts',
        details: error instanceof Error ? error.message : 'Error desconocido',
        environment: isProduction ? "production" : "development"
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/admin/posts/fix-category
 * 
 * Obtiene el estado de las categorías de posts sin modificar nada
 */
export async function GET(request: NextRequest) {
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" || process.env.NODE_ENV === "production"
  
  try {
    console.log(`🔍 [${isProduction ? "PROD" : "DEV"}] Verificando estado de categorías...`)
    
    // Obtener posts sin categoría o con categoría incorrecta
    const postsToFix = await sql`
      SELECT id, title, category, content_type, published, status
      FROM posts 
      WHERE category IS NULL 
         OR category NOT IN ('postsv2', 'about', 'portfolio')
      ORDER BY created_at DESC
    `

    // Obtener estadísticas de categorías
    const stats = await sql`
      SELECT 
        category,
        COUNT(*) as count,
        COUNT(*) FILTER (WHERE published = true) as published_count
      FROM posts
      GROUP BY category
      ORDER BY count DESC
    `

    console.log(`📊 [${isProduction ? "PROD" : "DEV"}] Posts sin categoría correcta: ${postsToFix.length}`)

    return NextResponse.json({
      success: true,
      postsNeedingFix: postsToFix.length,
      posts: postsToFix,
      categoryStats: stats,
      environment: isProduction ? "production" : "development"
    })

  } catch (error) {
    console.error(`❌ [${isProduction ? "PROD" : "DEV"}] Error verificando categorías:`, error)
    return NextResponse.json(
      {
        success: false,
        error: 'Error al verificar categorías',
        details: error instanceof Error ? error.message : 'Error desconocido',
        environment: isProduction ? "production" : "development"
      },
      { status: 500 }
    )
  }
}

