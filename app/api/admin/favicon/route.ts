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
    let imageBuffer: ArrayBuffer
    let contentType: string
    try {
      const imageResponse = await fetch(url)
      if (!imageResponse.ok) {
        return NextResponse.json({
          success: false,
          error: 'La imagen del favicon no es accesible'
        }, { status: 400 })
      }

      contentType = imageResponse.headers.get('content-type') || ''
      if (!contentType.startsWith('image/')) {
        return NextResponse.json({
          success: false,
          error: 'La URL no apunta a una imagen válida'
        }, { status: 400 })
      }

      imageBuffer = await imageResponse.arrayBuffer()
    } catch (error) {
      console.warn('⚠️ [API] Could not fetch image:', error)
      return NextResponse.json({
        success: false,
        error: 'No se pudo descargar la imagen del favicon'
      }, { status: 400 })
    }

    // Actualizar archivos estáticos del favicon
    try {
      await updateStaticFaviconFiles(imageBuffer, contentType)
      // Además, actualizar imágenes Open Graph por defecto
      await updateOpenGraphPreviewImages(imageBuffer)
      console.log('✅ [API] Static favicon files updated')
    } catch (error) {
      console.warn('⚠️ [API] Could not update static files:', error)
      // Continuar aunque no se puedan actualizar los archivos estáticos
    }

    // Crear nueva configuración
    const newConfig: FaviconConfig = {
      url: url.trim(),
      lastUpdated: new Date().toISOString(),
      updatedBy: updatedBy || 'admin-panel'
    }

    // Guardar en KV (favicon)
    await kv.set('favicon_config', newConfig)

    // Guardar también OG Image dinámica para scrapers (persistente en prod)
    await kv.set('og_image_url', newConfig.url)
    await kv.set('og_image_last_updated', newConfig.lastUpdated)

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

// Función para actualizar archivos estáticos del favicon
async function updateStaticFaviconFiles(imageBuffer: ArrayBuffer, contentType: string) {
  const fs = await import('fs/promises')
  const path = await import('path')
  
  try {
    // Determinar la extensión basada en el content-type
    let extension = '.ico'
    if (contentType.includes('png')) extension = '.png'
    else if (contentType.includes('jpg') || contentType.includes('jpeg')) extension = '.jpg'
    else if (contentType.includes('svg')) extension = '.svg'
    else if (contentType.includes('webp')) extension = '.webp'

    const publicDir = path.join(process.cwd(), 'public')
    
    // Crear favicon.ico (formato principal que buscan los navegadores)
    const faviconPath = path.join(publicDir, 'favicon.ico')
    await fs.writeFile(faviconPath, Buffer.from(imageBuffer))
    
    // Crear favicon-16x16.png
    const favicon16Path = path.join(publicDir, 'favicon-16x16.png')
    await fs.writeFile(favicon16Path, Buffer.from(imageBuffer))
    
    // Crear favicon-32x32.png
    const favicon32Path = path.join(publicDir, 'favicon-32x32.png')
    await fs.writeFile(favicon32Path, Buffer.from(imageBuffer))
    
    // Crear apple-touch-icon.png (180x180 para iOS)
    const appleTouchIconPath = path.join(publicDir, 'apple-touch-icon.png')
    await fs.writeFile(appleTouchIconPath, Buffer.from(imageBuffer))
    
    // Actualizar site.webmanifest
    await updateWebManifest()
    
    console.log('✅ [API] Static favicon files created successfully')
  } catch (error) {
    console.error('❌ [API] Error creating static favicon files:', error)
    throw error
  }
}

// Función para actualizar imágenes de Open Graph por defecto
async function updateOpenGraphPreviewImages(imageBuffer: ArrayBuffer) {
  const fs = await import('fs/promises')
  const path = await import('path')

  try {
    const publicDir = path.join(process.cwd(), 'public')

    // Imagen OG principal usada por defecto
    const ogImagePath = path.join(publicDir, 'og-image.jpg')
    await fs.writeFile(ogImagePath, Buffer.from(imageBuffer))

    // Variante por defecto usada en varias partes del SEO
    const ogImageDefaultPath = path.join(publicDir, 'og-image-default.jpg')
    await fs.writeFile(ogImageDefaultPath, Buffer.from(imageBuffer))

    console.log('✅ [API] Open Graph images updated: /og-image.jpg, /og-image-default.jpg')
  } catch (error) {
    console.error('❌ [API] Error updating Open Graph images:', error)
    throw error
  }
}

// Función para actualizar el site.webmanifest
async function updateWebManifest() {
  const fs = await import('fs/promises')
  const path = await import('path')
  
  try {
    const manifestPath = path.join(process.cwd(), 'public', 'site.webmanifest')
    
    const manifest = {
      name: "Mario Verdú",
      short_name: "Mario Verdú",
      icons: [
        {
          src: "/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png"
        },
        {
          src: "/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png"
        },
        {
          src: "/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png"
        }
      ],
      theme_color: "#ffffff",
      background_color: "#ffffff",
      display: "standalone"
    }
    
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2))
    console.log('✅ [API] site.webmanifest updated')
  } catch (error) {
    console.error('❌ [API] Error updating site.webmanifest:', error)
    throw error
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
