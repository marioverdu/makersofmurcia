// Client-side types and utilities (no fs usage)

export interface RouteInfo {
  path: string
  type: "page" | "api" | "layout" | "loading" | "error" | "not-found"
  filePath: string
  isProtected: boolean
  isDynamic: boolean
  segments: string[]
}

export interface RouteStats {
  total: number
  byType: Record<string, number>
  protected: number
  dynamic: number
}

// Client-side utility functions
export function isProtectedRoute(path: string): boolean {
  return path.includes("/admin") || path.includes("/dashboard") || path.includes("/auth") || path.includes("/login")
}

export function isDynamicRoute(path: string): boolean {
  return path.includes("[") && path.includes("]")
}

export function getRouteSegments(path: string): string[] {
  return path.split("/").filter((segment) => segment.length > 0)
}

export function formatRoutePath(path: string): string {
  if (path === "") return "/"
  if (path !== "/" && path.endsWith("/")) {
    return path.slice(0, -1)
  }
  return path
}
