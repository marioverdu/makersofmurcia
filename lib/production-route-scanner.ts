import { STATIC_ROUTES } from "./static-routes"

export interface RouteInfo {
  path: string
  type: "page" | "api" | "layout" | "loading" | "error" | "not-found"
  category: string
  isDynamic: boolean
  isProtected: boolean
}

export class ProductionRouteScanner {
  static async scanRoutes(): Promise<RouteInfo[]> {
    console.log("📋 Usando lista estática de rutas para producción")

    return STATIC_ROUTES.map((route) => ({
      path: route.path,
      type: route.type,
      category: this.getRouteCategory(route.path),
      isDynamic: route.isDynamic,
      isProtected: route.isProtected,
    }))
  }

  static async getRouteStats() {
    const routes = await this.scanRoutes()

    const stats = {
      total: routes.length,
      byType: {} as Record<string, number>,
      protected: routes.filter((r) => r.isProtected).length,
      dynamic: routes.filter((r) => r.isDynamic).length,
    }

    // Contar por tipo
    routes.forEach((route) => {
      stats.byType[route.type] = (stats.byType[route.type] || 0) + 1
    })

    return stats
  }

  private static getRouteCategory(path: string): string {
    if (path.startsWith("/api/admin")) return "admin-api"
    if (path.startsWith("/api/")) return "api"
    if (path.startsWith("/admin")) return "admin"
    if (path.startsWith("/styleguide")) return "styleguide"
    if (path.includes("login") || path.includes("signup") || path.includes("auth")) return "auth"
    if (path.startsWith("/posts")) return "posts"
    if (path.startsWith("/test")) return "test"
    if (path.includes("loading")) return "loading"
    if (path.includes("layout")) return "layout"
    if (path.includes("error") || path.includes("not-found")) return "error"
    return "public"
  }
}
