import { NextRequest, NextResponse } from 'next/server'
import { RouteManagementService } from '@/lib/route-management-service'
import { RouteVisibilityManager } from '@/lib/route-visibility'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // Soportar dos modos: { isVisible } para activar/desactivar todas, o { updates: [{path,isVisible}, ...] }
    if (typeof body.isVisible === 'boolean') {
      const { isVisible, modifiedBy = 'admin-panel' } = body as { isVisible: boolean; modifiedBy?: string }
      const routes = await RouteManagementService.getAllRoutes()
      const paths = routes.map(r => r.path)
      for (const path of paths) {
        await RouteManagementService.setRouteVisibility(path, isVisible, modifiedBy)
      }
      const updates = paths.map(path => ({ path, isVisible }))
      await RouteVisibilityManager.bulkSetRouteVisibility(updates, modifiedBy)
      return NextResponse.json({ success: true, total: paths.length, isVisible })
    }

    const { updates, modifiedBy = 'bulk-admin', action } = body as { updates: Array<{ path: string; isVisible: boolean }>; modifiedBy?: string; action?: string }
    if (!Array.isArray(updates) || updates.length === 0) {
      return NextResponse.json({ success: false, error: 'Se requiere un array de actualizaciones no vacío' }, { status: 400 })
    }
    for (const u of updates) {
      if (!u.path || typeof u.isVisible !== 'boolean') {
        return NextResponse.json({ success: false, error: 'Cada actualización debe tener path e isVisible' }, { status: 400 })
      }
    }
    let processed = 0, errors = 0
    for (const u of updates) {
      try {
        await RouteVisibilityManager.setRouteVisibility(u.path, u.isVisible, modifiedBy)
        processed++
      } catch {
        errors++
      }
    }
    return NextResponse.json({ success: true, data: { processed, errors, total: updates.length, action } })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || 'bulk failed' }, { status: 500 })
  }
}
