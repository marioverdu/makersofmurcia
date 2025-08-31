import { ProductionRouteScanner, type RouteInfo } from "./production-route-scanner"
import { promises as fs } from "fs"
import path from "path"

export class HybridRouteScanner {
  private static isProduction = process.env.NODE_ENV === "production"

  static async scanRoutes(): Promise<RouteInfo[]> {
    try {
      // En producción o si falla el filesystem, usar lista estática
      if (this.isProduction) {
        console.log("🏭 Modo producción: usando lista estática de rutas")
        return await ProductionRouteScanner.scanRoutes()
      }

      // En desarrollo, intentar usar filesystem primero
      try {
        console.log("🔧 Modo desarrollo: escaneando filesystem...")
        return await this.scanFromFilesystem()
      } catch (fsError) {
        console.warn("⚠️ Error accediendo filesystem, usando lista estática:", fsError)
        return await ProductionRouteScanner.scanRoutes()
      }
    } catch (error) {
      console.error("❌ Error en escáner híbrido:", error)
      // Fallback final: devolver lista estática básica
      return await ProductionRouteScanner.scanRoutes()
    }
  }

  private static async scanFromFilesystem(): Promise<RouteInfo[]> {
    const routes: RouteInfo[] = []
    const appDir = path.join(process.cwd(), "app")

    try {
      await this.scanDirectory(appDir, "", routes)
      console.log(`✅ ${routes.length} rutas encontradas en filesystem`)
      return routes
    } catch (error) {
      console.error("Error escaneando filesystem:", error)
      throw error
    }
  }

  private static async scanDirectory(dir: string, relativePath: string, routes: RouteInfo[]): Promise<void> {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true })

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        const routePath = path.join(relativePath, entry.name).replace(/\\/g, "/")

        if (entry.isDirectory()) {
          // Recursivamente escanear subdirectorios
          await this.scanDirectory(fullPath, routePath, routes)
        } else if (entry.isFile()) {
          // Procesar archivos de ruta
          const routeInfo = this.processRouteFile(routePath, entry.name)
          if (routeInfo) {
            routes.push(routeInfo)
          }
        }
      }
    } catch (error) {
      console.warn(`No se pudo escanear directorio ${dir}:`, error)
    }
  }

  private static processRouteFile(routePath: string, fileName: string): RouteInfo | null {
    // Solo procesar archivos de Next.js relevantes
    const validFiles = [
      "page.tsx",
      "page.ts",
      "route.ts",
      "layout.tsx",
      "layout.ts",
      "loading.tsx",
      "error.tsx",
      "not-found.tsx",
    ]

    if (!validFiles.includes(fileName)) {
      return null
    }

    // Convertir path del archivo a ruta web
    let webPath = routePath.replace(/\/(page|route|layout|loading|error|not-found)\.(tsx?|js)$/, "")

    // Manejar rutas dinámicas
    webPath = webPath.replace(/\[([^\]]+)\]/g, "[$1]")

    // Asegurar que empiece con /
    if (!webPath.startsWith("/")) {
      webPath = "/" + webPath
    }

    // Limpiar rutas vacías
    if (webPath === "/") {
      webPath = "/"
    }

    return {
      path: webPath,
      type: this.getFileType(fileName),
      category: this.getRouteCategory(webPath),
      isDynamic: webPath.includes("[") && webPath.includes("]"),
      isProtected: this.isProtectedRoute(webPath),
    }
  }

  private static getFileType(fileName: string): RouteInfo["type"] {
    if (fileName.startsWith("route.")) return "api"
    if (fileName.startsWith("page.")) return "page"
    if (fileName.startsWith("layout.")) return "layout"
    if (fileName.startsWith("loading.")) return "loading"
    if (fileName.startsWith("error.")) return "error"
    if (fileName.startsWith("not-found.")) return "not-found"
    return "page"
  }

  private static getRouteCategory(path: string): string {
    if (path.startsWith("/api/")) return "api"
    if (path.startsWith("/admin")) return "admin"
    if (path.startsWith("/styleguide")) return "styleguide"
    if (path.includes("login") || path.includes("signup") || path.includes("auth")) return "auth"
    if (path.startsWith("/posts")) return "posts"
    if (path.startsWith("/test")) return "test"
    return "public"
  }

  private static isProtectedRoute(path: string): boolean {
    const protectedPaths = ["/admin", "/api/admin"]
    return protectedPaths.some((prot) => path.startsWith(prot))
  }

  // Métodos de conveniencia
  static async getRoutesByCategory(category?: string): Promise<RouteInfo[]> {
    const allRoutes = await this.scanRoutes()
    if (!category) return allRoutes
    return allRoutes.filter((route) => route.category === category)
  }

  static async getProtectedRoutes(): Promise<RouteInfo[]> {
    const allRoutes = await this.scanRoutes()
    return allRoutes.filter((route) => route.isProtected)
  }

  static async getPublicRoutes(): Promise<RouteInfo[]> {
    const allRoutes = await this.scanRoutes()
    return allRoutes.filter((route) => !route.isProtected)
  }
}
