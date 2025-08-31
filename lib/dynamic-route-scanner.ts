import fs from "fs"
import path from "path"
import { getGeneratedRouteStats } from "./generated-routes"

interface Route {
  path: string
  type: "page" | "api" | "layout"
  category: string
  isProtected: boolean
  file: string
}

export interface RouteInfo {
  path: string
  type: "page" | "api" | "layout" | "loading" | "error" | "not-found"
  category: string
  isDynamic: boolean
  isProtected: boolean
}

export class DynamicRouteScanner {
  private static readonly APP_DIR = path.join(process.cwd(), "app")

  static async scanRoutes(): Promise<Route[]> {
    const routes: Route[] = []

    try {
      // Escanear directorio app
      await this.scanDirectory(this.APP_DIR, "", routes)

      // Agregar rutas principales si no existen
      const mainRoutes = ["/", "/posts", "/work-experience"]
      for (const mainRoute of mainRoutes) {
        if (!routes.find((r) => r.path === mainRoute)) {
          routes.push({
            path: mainRoute,
            type: "page",
            category: "main",
            isProtected: false,
            file: mainRoute === "/" ? "app/page.tsx" : `app${mainRoute}/page.tsx`,
          })
        }
      }

      console.log(`📋 DynamicRouteScanner: Found ${routes.length} routes`)
      return routes.sort((a, b) => a.path.localeCompare(b.path))
    } catch (error) {
      console.error("❌ Error scanning routes:", error)
      return []
    }
  }

  private static async scanDirectory(dirPath: string, routePath: string, routes: Route[]): Promise<void> {
    try {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true })

      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name)
        const relativePath = path.relative(this.APP_DIR, fullPath)

        if (entry.isDirectory()) {
          // Ignorar directorios especiales
          if (entry.name.startsWith("_") || entry.name.startsWith(".")) {
            continue
          }

          // Construir nueva ruta
          let newRoutePath = routePath
          if (!entry.name.startsWith("(") && !entry.name.endsWith(")")) {
            newRoutePath = routePath + "/" + entry.name
          }

          // Escanear recursivamente
          await this.scanDirectory(fullPath, newRoutePath, routes)
        } else if (entry.isFile()) {
          // Procesar archivos de ruta
          const route = this.processRouteFile(entry.name, routePath, relativePath)
          if (route) {
            routes.push(route)
          }
        }
      }
    } catch (error) {
      console.warn(`⚠️ Error scanning directory ${dirPath}:`, error)
    }
  }

  private static processRouteFile(fileName: string, routePath: string, relativePath: string): Route | null {
    // Normalizar ruta (vacía = "/")
    const normalizedPath = routePath || "/"

    if (fileName === "page.tsx" || fileName === "page.js") {
      return {
        path: normalizedPath,
        type: "page",
        category: this.categorizeRoute(normalizedPath),
        isProtected: this.isProtectedRoute(normalizedPath),
        file: relativePath,
      }
    }

    if (fileName === "route.ts" || fileName === "route.js") {
      return {
        path: normalizedPath.startsWith("/api") ? normalizedPath : `/api${normalizedPath}`,
        type: "api",
        category: this.categorizeRoute(normalizedPath),
        isProtected: this.isProtectedRoute(normalizedPath),
        file: relativePath,
      }
    }

    if (fileName === "layout.tsx" || fileName === "layout.js") {
      return {
        path: normalizedPath,
        type: "layout",
        category: this.categorizeRoute(normalizedPath),
        isProtected: this.isProtectedRoute(normalizedPath),
        file: relativePath,
      }
    }

    return null
  }

  private static categorizeRoute(routePath: string): string {
    if (routePath.startsWith("/admin")) return "admin"
    if (routePath.startsWith("/api")) return "api"
    if (routePath.startsWith("/styleguide")) return "styleguide"
    if (["/", "/posts", "/work-experience"].includes(routePath)) return "main"
    return "other"
  }

  private static isProtectedRoute(routePath: string): boolean {
    return routePath.startsWith("/admin") || routePath.startsWith("/api/admin")
  }

  static async getRouteStats() {
    try {
      return getGeneratedRouteStats()
    } catch (error) {
      console.error("❌ Error obteniendo estadísticas:", error)
      return {
        total: 0,
        byType: {},
        protected: 0,
        dynamic: 0,
        generated: new Date().toISOString(),
      }
    }
  }

  // Métodos de conveniencia
  static async getRoutesByCategory(category?: string): Promise<Route[]> {
    const allRoutes = await this.scanRoutes()
    if (!category) return allRoutes
    return allRoutes.filter((route) => route.category === category)
  }

  static async getProtectedRoutes(): Promise<Route[]> {
    const allRoutes = await this.scanRoutes()
    return allRoutes.filter((route) => route.isProtected)
  }

  static async getPublicRoutes(): Promise<Route[]> {
    const allRoutes = await this.scanRoutes()
    return allRoutes.filter((route) => !route.isProtected)
  }

  static async getDynamicRoutes(): Promise<Route[]> {
    const allRoutes = await this.scanRoutes()
    return allRoutes.filter((route) => route.path.includes("(") || route.path.includes(")"))
  }
}
