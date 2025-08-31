import { type NextRequest, NextResponse } from "next/server"
import { RouteManagementService } from "@/lib/route-management-service"

export async function GET(request: NextRequest) {
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" || process.env.NODE_ENV === "production"

  try {
    const { searchParams } = new URL(request.url)
    const path = searchParams.get("path")

    if (!path) {
      return NextResponse.json(
        {
          success: false,
          error: "Parámetro 'path' requerido",
          environment: isProduction ? "production" : "development",
        },
        { status: 400 },
      )
    }

    const route = await RouteManagementService.getRoute(path)

    if (!route) {
      return NextResponse.json(
        {
          success: false,
          error: "Ruta no encontrada",
          environment: isProduction ? "production" : "development",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        path: route.path,
        seo_title: route.seo_title,
        seo_description: route.seo_description,
        seo_keywords: route.seo_keywords,
        is_indexable: route.is_indexable,
        robots_allow: route.robots_allow,
        sitemap_include: route.sitemap_include,
        priority: route.priority,
        category: route.category,
        last_updated: route.updated_at,
        modified_by: route.modified_by,
      },
    })
  } catch (error) {
    console.error(`❌ [${isProduction ? "PROD" : "DEV"}] Error getting SEO config:`, error)

    return NextResponse.json(
      {
        success: false,
        error: "Error obteniendo configuración SEO",
        details: error instanceof Error ? error.message : "Error desconocido",
        environment: isProduction ? "production" : "development",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" || process.env.NODE_ENV === "production"

  try {
    const body = await request.json()
    const {
      path,
      seo_title,
      seo_description,
      seo_keywords,
      is_indexable,
      robots_allow,
      sitemap_include,
      priority,
      category,
      modifiedBy,
    } = body

    console.log(`🔄 [${isProduction ? "PROD" : "DEV"}] API PUT SEO: Updating ${path}`)

    if (!path) {
      return NextResponse.json(
        {
          success: false,
          error: "Parámetro 'path' requerido",
          environment: isProduction ? "production" : "development",
        },
        { status: 400 },
      )
    }

    // Preparar actualizaciones
    const updates: any = {}
    
    if (seo_title !== undefined) updates.seo_title = seo_title
    if (seo_description !== undefined) updates.seo_description = seo_description
    if (seo_keywords !== undefined) updates.seo_keywords = seo_keywords
    if (is_indexable !== undefined) updates.is_indexable = is_indexable
    if (robots_allow !== undefined) updates.robots_allow = robots_allow
    if (sitemap_include !== undefined) updates.sitemap_include = sitemap_include
    if (priority !== undefined) updates.priority = priority
    if (category !== undefined) updates.category = category

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No se proporcionaron campos para actualizar",
          environment: isProduction ? "production" : "development",
        },
        { status: 400 },
      )
    }

    try {
      await RouteManagementService.updateRoute(path, updates, modifiedBy || "anonymous")
      console.log(`✅ [${isProduction ? "PROD" : "DEV"}] API: SEO config updated successfully`)
    } catch (updateError) {
      console.error(`❌ [${isProduction ? "PROD" : "DEV"}] Error updating SEO config:`, updateError)

      if (isProduction) {
        return NextResponse.json(
          {
            success: false,
            error: "Error guardando en base de datos de producción",
            details: updateError instanceof Error ? updateError.message : "Error desconocido",
            environment: "production",
          },
          { status: 500 },
        )
      }

      console.warn(`⚠️ [DEV] Database failed but continuing`)
    }

    return NextResponse.json({
      success: true,
      message: `Configuración SEO de ${path} actualizada correctamente`,
      data: {
        path,
        updates,
        modifiedBy: modifiedBy || "anonymous",
        timestamp: new Date().toISOString(),
        environment: isProduction ? "production" : "development",
      },
    })
  } catch (error) {
    console.error(`❌ [${isProduction ? "PROD" : "DEV"}] Error updating SEO config:`, error)

    return NextResponse.json(
      {
        success: false,
        error: "Error actualizando configuración SEO",
        details: error instanceof Error ? error.message : "Error desconocido",
        environment: isProduction ? "production" : "development",
      },
      { status: 500 },
    )
  }
}
