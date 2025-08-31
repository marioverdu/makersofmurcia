import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

interface FaviconConfig {
  url: string
  lastUpdated: string
  updatedBy: string
}

interface ApiResponse {
  success: boolean
  data?: FaviconConfig
  error?: string
}

// GET - Obtener configuración actual del favicon
export async function GET(): Promise<NextResponse<ApiResponse>> {
  try {
    console.log('🔄 [API] GET /api/admin/favicon - Loading favicon config')

    // Obtener configuración desde KV
    const faviconConfig = await kv.get('favicon_config') as FaviconConfig | null

    if (faviconConfig) {
      console.log('✅ [API] Favicon config loaded:', faviconConfig.url)
      return NextResponse.json({
        success: true,
        data: faviconConfig
      })
    } else {
      console.log('ℹ️ [API] No favicon config found, using default')
      return NextResponse.json({
        success: true,
        data: {
          url: '/favicon.ico',
          lastUpdated: new Date().toISOString(),
          updatedBy: 'system'
        }
      })
    }
  } catch (error) {
    console.error('❌ [API] Error loading favicon config:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 })
  }
}

// POST - Actualizar configuración del favicon
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    console.log('🔄 [API] POST /api/admin/favicon - Updating favicon config')

    const body = await request.json()
    const { url, updatedBy } = body

    // Validar URL
    if (!url || typeof url !== 'string') {
      return NextResponse.json({
        success: false,
        error: 'URL del favicon es requerida'
      }, { status: 400 })
    }

    // Validar formato de URL
    try {
      new URL(url)
    } catch {
      return NextResponse.json({
        success: false,
        error: 'URL del favicon no es válida'
      }, { status: 400 })
    }

    // Verificar que la imagen existe y es accesible
    try {
      const imageResponse = await fetch(url, { method: 'HEAD' })
      if (!imageResponse.ok) {
        return NextResponse.json({
          success: false,
          error: 'La imagen del favicon no es accesible'
        }, { status: 400 })
      }

      const contentType = imageResponse.headers.get('content-type')
      if (!contentType || !contentType.startsWith('image/')) {
        return NextResponse.json({
          success: false,
          error: 'La URL no apunta a una imagen válida'
        }, { status: 400 })
      }
    } catch (error) {
      console.warn('⚠️ [API] Could not verify image accessibility:', error)
      // Continuar aunque no se pueda verificar la imagen
    }

    // Crear nueva configuración
    const newConfig: FaviconConfig = {
      url: url.trim(),
      lastUpdated: new Date().toISOString(),
      updatedBy: updatedBy || 'admin-panel'
    }

    // Guardar en KV
    await kv.set('favicon_config', newConfig)

    console.log('✅ [API] Favicon config updated:', newConfig.url)

    return NextResponse.json({
      success: true,
      data: newConfig
    })
  } catch (error) {
    console.error('❌ [API] Error updating favicon config:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 })
  }
}

// DELETE - Restaurar favicon por defecto
export async function DELETE(): Promise<NextResponse<ApiResponse>> {
  try {
    console.log('🔄 [API] DELETE /api/admin/favicon - Resetting to default')

    // Eliminar configuración personalizada
    await kv.del('favicon_config')

    const defaultConfig: FaviconConfig = {
      url: '/favicon.ico',
      lastUpdated: new Date().toISOString(),
      updatedBy: 'admin-panel'
    }

    console.log('✅ [API] Favicon config reset to default')

    return NextResponse.json({
      success: true,
      data: defaultConfig
    })
  } catch (error) {
    console.error('❌ [API] Error resetting favicon config:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 })
  }
}
