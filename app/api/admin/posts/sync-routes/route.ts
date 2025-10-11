import { NextRequest, NextResponse } from 'next/server'
import { getPosts } from '@/lib/posts-db'
import { RouteManagementService } from '@/lib/route-management-service'

/**
 * POST /api/admin/posts/sync-routes
 * 
 * Sincroniza las rutas de todos los posts existentes con el sistema de gestión de rutas.
 * Útil para:
 * - Registrar posts antiguos que no tienen rutas
 * - Actualizar el estado de visibilidad de posts
 * - Reparar rutas rotas o inconsistentes
 */
export async function POST(request: NextRequest) {
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" || process.env.NODE_ENV === "production"
  
  try {
    console.log(`🔄 [${isProduction ? "PROD" : "DEV"}] Iniciando sincronización de rutas de posts...`)
    
    // Obtener todos los posts
    const posts = await getPosts()
    console.log(`📊 [${isProduction ? "PROD" : "DEV"}] Encontrados ${posts.length} posts en la base de datos`)

    const results = {
      total: posts.length,
      success: 0,
      errors: 0,
      details: [] as Array<{ postId: number, title: string, status: string, error?: string }>
    }

    // Registrar ruta para cada post
    for (const post of posts) {
      try {
        const isPublished = post.published || post.status === 'published'
        
        console.log(`🔄 [${isProduction ? "PROD" : "DEV"}] Procesando post ${post.id}: "${post.title}" (published: ${isPublished})`)
        
        await RouteManagementService.registerPostRoute(
          post.id,
          post.slug,
          isPublished
        )
        
        results.success++
        results.details.push({
          postId: post.id,
          title: post.title,
          status: 'success'
        })
        
        console.log(`✅ [${isProduction ? "PROD" : "DEV"}] Ruta registrada exitosamente para post ${post.id}`)
      } catch (error) {
        console.error(`❌ [${isProduction ? "PROD" : "DEV"}] Error registrando ruta para post ${post.id}:`, error)
        results.errors++
        results.details.push({
          postId: post.id,
          title: post.title,
          status: 'error',
          error: error instanceof Error ? error.message : 'Error desconocido'
        })
      }
    }

    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
    console.log(`📊 [${isProduction ? "PROD" : "DEV"}] RESUMEN DE SINCRONIZACIÓN:`)
    console.log(`   Total de posts: ${results.total}`)
    console.log(`   ✅ Rutas registradas exitosamente: ${results.success}`)
    console.log(`   ❌ Errores: ${results.errors}`)
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)

    return NextResponse.json({
      success: true,
      message: `Sincronización completada: ${results.success} exitosas, ${results.errors} errores`,
      results,
      environment: isProduction ? "production" : "development"
    })

  } catch (error) {
    console.error(`❌ [${isProduction ? "PROD" : "DEV"}] Error en sincronización de rutas:`, error)
    return NextResponse.json(
      {
        success: false,
        error: 'Error al sincronizar rutas de posts',
        details: error instanceof Error ? error.message : 'Error desconocido',
        environment: isProduction ? "production" : "development"
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/admin/posts/sync-routes
 * 
 * Obtiene el estado de las rutas de posts sin sincronizar
 */
export async function GET(request: NextRequest) {
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" || process.env.NODE_ENV === "production"
  
  try {
    console.log(`🔍 [${isProduction ? "PROD" : "DEV"}] Verificando estado de rutas de posts...`)
    
    // Obtener todos los posts
    const posts = await getPosts()
    
    // Verificar qué posts tienen rutas registradas
    const status = {
      total: posts.length,
      withRoutes: 0,
      withoutRoutes: 0,
      published: 0,
      unpublished: 0,
      details: [] as Array<{ 
        postId: number, 
        title: string, 
        slug: string,
        published: boolean,
        hasRoute: boolean,
        routePaths: string[]
      }>
    }

    for (const post of posts) {
      const isPublished = post.published || post.status === 'published'
      const paths = [
        `/es/posts/view/${post.id}`,
        `/en/posts/view/${post.id}`
      ]
      
      // Verificar si existen las rutas
      let hasRoute = false
      const existingPaths: string[] = []
      
      for (const path of paths) {
        try {
          const route = await RouteManagementService.getRoute(path)
          if (route) {
            hasRoute = true
            existingPaths.push(path)
          }
        } catch (error) {
          console.warn(`⚠️ Error verificando ruta ${path}:`, error)
        }
      }
      
      if (hasRoute) {
        status.withRoutes++
      } else {
        status.withoutRoutes++
      }
      
      if (isPublished) {
        status.published++
      } else {
        status.unpublished++
      }
      
      status.details.push({
        postId: post.id,
        title: post.title,
        slug: post.slug,
        published: isPublished,
        hasRoute,
        routePaths: existingPaths
      })
    }

    console.log(`📊 [${isProduction ? "PROD" : "DEV"}] Estado de rutas:`)
    console.log(`   Total posts: ${status.total}`)
    console.log(`   Con rutas: ${status.withRoutes}`)
    console.log(`   Sin rutas: ${status.withoutRoutes}`)
    console.log(`   Publicados: ${status.published}`)
    console.log(`   No publicados: ${status.unpublished}`)

    return NextResponse.json({
      success: true,
      status,
      environment: isProduction ? "production" : "development"
    })

  } catch (error) {
    console.error(`❌ [${isProduction ? "PROD" : "DEV"}] Error verificando estado de rutas:`, error)
    return NextResponse.json(
      {
        success: false,
        error: 'Error al verificar estado de rutas',
        details: error instanceof Error ? error.message : 'Error desconocido',
        environment: isProduction ? "production" : "development"
      },
      { status: 500 }
    )
  }
}

