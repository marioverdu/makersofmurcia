import { promises as fs } from "fs"
import path from "path"

export interface RouteInfo {
  path: string
  type: "page" | "api" | "layout" | "loading" | "error" | "not-found"
  filePath: string
  isProtected: boolean
  isDynamic: boolean
  segments: string[]
}

export class ServerRouteScanner {
  private appDir: string

  constructor(appDir = "app") {
    this.appDir = path.join(process.cwd(), appDir)
  }

  async scanRoutes(): Promise<RouteInfo[]> {
    const routes: RouteInfo[] = []

    try {
      await this.scanDirectory(this.appDir, "", routes)
      return routes.sort((a, b) => a.path.localeCompare(b.path))
    } catch (error) {
      console.error("Error scanning routes:", error)
      return []
    }
  }

  private async scanDirectory(dirPath: string, routePath: string, routes: RouteInfo[]): Promise<void> {
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true })

      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name)

        if (entry.isDirectory()) {
          // Handle route groups (folders with parentheses)
          if (entry.name.startsWith("(") && entry.name.endsWith(")")) {
            // Route groups don't affect the URL path
            await this.scanDirectory(fullPath, routePath, routes)
          } else {
            // Regular directory - becomes part of the route
            const newRoutePath = routePath + "/" + entry.name
            await this.scanDirectory(fullPath, newRoutePath, routes)
          }
        } else if (entry.isFile()) {
          const route = this.processFile(fullPath, routePath, entry.name)
          if (route) {
            routes.push(route)
          }
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${dirPath}:`, error)
    }
  }

  private processFile(filePath: string, routePath: string, fileName: string): RouteInfo | null {
    // Only process TypeScript/JavaScript files
    if (!fileName.match(/\.(tsx?|jsx?)$/)) {
      return null
    }

    let type: RouteInfo["type"]
    let finalPath = routePath || "/"

    // Determine file type
    if (fileName === "page.tsx" || fileName === "page.ts") {
      type = "page"
    } else if (fileName === "route.tsx" || fileName === "route.ts") {
      type = "api"
      finalPath = "/api" + routePath
    } else if (fileName === "layout.tsx" || fileName === "layout.ts") {
      type = "layout"
    } else if (fileName === "loading.tsx" || fileName === "loading.ts") {
      type = "loading"
    } else if (fileName === "error.tsx" || fileName === "error.ts") {
      type = "error"
    } else if (fileName === "not-found.tsx" || fileName === "not-found.ts") {
      type = "not-found"
    } else {
      // Skip other files
      return null
    }

    // Clean up the path
    if (finalPath === "") finalPath = "/"
    if (finalPath !== "/" && finalPath.endsWith("/")) {
      finalPath = finalPath.slice(0, -1)
    }

    // Check if route is dynamic
    const isDynamic = finalPath.includes("[") && finalPath.includes("]")

    // Check if route is protected (heuristic)
    const isProtected =
      finalPath.includes("/admin") ||
      finalPath.includes("/dashboard") ||
      finalPath.includes("/auth") ||
      finalPath.includes("/login")

    // Split path into segments
    const segments = finalPath.split("/").filter((segment) => segment.length > 0)

    return {
      path: finalPath,
      type,
      filePath: path.relative(process.cwd(), filePath),
      isProtected,
      isDynamic,
      segments,
    }
  }

  async getRouteStats(): Promise<{
    total: number
    byType: Record<string, number>
    protected: number
    dynamic: number
  }> {
    const routes = await this.scanRoutes()

    const stats = {
      total: routes.length,
      byType: {} as Record<string, number>,
      protected: 0,
      dynamic: 0,
    }

    routes.forEach((route) => {
      stats.byType[route.type] = (stats.byType[route.type] || 0) + 1
      if (route.isProtected) stats.protected++
      if (route.isDynamic) stats.dynamic++
    })

    return stats
  }
}
