// Lista estática de todas las rutas del proyecto para usar en producción
export const STATIC_ROUTES = [
  // Páginas principales
  { path: "/", type: "page", filePath: "app/page.tsx", isProtected: false, isDynamic: false },
  { path: "/posts", type: "page", filePath: "app/posts/page.tsx", isProtected: false, isDynamic: false },
  {
    path: "/work-experience",
    type: "page",
    filePath: "app/work-experience/page.tsx",
    isProtected: false,
    isDynamic: false,
  },
  {
    path: "/price-estimator",
    type: "page",
    filePath: "app/price-estimator/page.tsx",
    isProtected: false,
    isDynamic: false,
  },
  {
    path: "/price-estimator-test",
    type: "page",
    filePath: "app/price-estimator-test/page.tsx",
    isProtected: false,
    isDynamic: false,
  },
  {
    path: "/cookie-widget-demo",
    type: "page",
    filePath: "app/cookie-widget-demo/page.tsx",
    isProtected: false,
    isDynamic: false,
  },
  {
    path: "/cookie-widget-test",
    type: "page",
    filePath: "app/cookie-widget-test/page.tsx",
    isProtected: false,
    isDynamic: false,
  },
  { path: "/home-test", type: "page", filePath: "app/home-test/page.tsx", isProtected: false, isDynamic: false },
  { path: "/test-preview", type: "page", filePath: "app/test-preview/page.tsx", isProtected: false, isDynamic: false },
  { path: "/test", type: "page", filePath: "app/test/page.tsx", isProtected: false, isDynamic: false },
  { path: "/debug", type: "page", filePath: "app/debug/page.tsx", isProtected: false, isDynamic: false },
  { path: "/styleguide", type: "page", filePath: "app/styleguide/page.tsx", isProtected: false, isDynamic: false },

  // Auth
  { path: "/login", type: "page", filePath: "app/login/page.tsx", isProtected: false, isDynamic: false },
  { path: "/signup", type: "page", filePath: "app/signup/[[...signup]]/page.tsx", isProtected: false, isDynamic: true },

  // Posts
  { path: "/posts/admin", type: "page", filePath: "app/posts/admin/page.tsx", isProtected: true, isDynamic: false },
  {
    path: "/posts/view/[id]",
    type: "page",
    filePath: "app/posts/view/[id]/page.tsx",
    isProtected: false,
    isDynamic: true,
  },

  // Admin
  { path: "/admin", type: "page", filePath: "app/admin/page.tsx", isProtected: true, isDynamic: false },
  { path: "/admin/posts", type: "page", filePath: "app/admin/posts/page.tsx", isProtected: true, isDynamic: false },
  { path: "/admin/booking", type: "page", filePath: "app/admin/booking/page.tsx", isProtected: true, isDynamic: false },

  // API Routes
  {
    path: "/api/auth/[...nextauth]",
    type: "api",
    filePath: "app/api/auth/[...nextauth]/route.ts",
    isProtected: false,
    isDynamic: true,
  },
  {
    path: "/api/auth-debug",
    type: "api",
    filePath: "app/api/auth-debug/route.ts",
    isProtected: false,
    isDynamic: false,
  },
  { path: "/api/posts", type: "api", filePath: "app/api/posts/route.ts", isProtected: false, isDynamic: false },
  {
    path: "/api/posts/[id]",
    type: "api",
    filePath: "app/api/posts/[id]/route.ts",
    isProtected: false,
    isDynamic: true,
  },
  {
    path: "/api/posts/search",
    type: "api",
    filePath: "app/api/posts/search/route.ts",
    isProtected: false,
    isDynamic: false,
  },
  { path: "/api/check-db", type: "api", filePath: "app/api/check-db/route.ts", isProtected: false, isDynamic: false },
  { path: "/api/init-db", type: "api", filePath: "app/api/init-db/route.ts", isProtected: false, isDynamic: false },
  { path: "/api/migrate", type: "api", filePath: "app/api/migrate/route.ts", isProtected: false, isDynamic: false },
  {
    path: "/api/migrate-posts",
    type: "api",
    filePath: "app/api/migrate-posts/route.ts",
    isProtected: false,
    isDynamic: false,
  },
  {
    path: "/api/migrate-conversations",
    type: "api",
    filePath: "app/api/migrate-conversations/route.ts",
    isProtected: false,
    isDynamic: false,
  },
  {
    path: "/api/send-email",
    type: "api",
    filePath: "app/api/send-email/route.ts",
    isProtected: false,
    isDynamic: false,
  },
  {
    path: "/api/send-email/test",
    type: "api",
    filePath: "app/api/send-email/test/route.ts",
    isProtected: false,
    isDynamic: false,
  },
  {
    path: "/api/booking-status",
    type: "api",
    filePath: "app/api/booking-status/route.ts",
    isProtected: false,
    isDynamic: false,
  },
  { path: "/api/proposals", type: "api", filePath: "app/api/proposals/route.ts", isProtected: false, isDynamic: false },
  {
    path: "/api/proposals/[id]",
    type: "api",
    filePath: "app/api/proposals/[id]/route.ts",
    isProtected: false,
    isDynamic: true,
  },
  {
    path: "/api/test-proposals-db",
    type: "api",
    filePath: "app/api/test-proposals-db/route.ts",
    isProtected: false,
    isDynamic: false,
  },
  {
    path: "/api/chat-notifications",
    type: "api",
    filePath: "app/api/chat-notifications/route.ts",
    isProtected: false,
    isDynamic: false,
  },
  { path: "/api/meetings", type: "api", filePath: "app/api/meetings/route.ts", isProtected: false, isDynamic: false },
  {
    path: "/api/test-kv-connection",
    type: "api",
    filePath: "app/api/test-kv-connection/route.ts",
    isProtected: false,
    isDynamic: false,
  },
  {
    path: "/api/test-redis-connection",
    type: "api",
    filePath: "app/api/test-redis-connection/route.ts",
    isProtected: false,
    isDynamic: false,
  },
  {
    path: "/api/test-env-variables",
    type: "api",
    filePath: "app/api/test-env-variables/route.ts",
    isProtected: false,
    isDynamic: false,
  },
  {
    path: "/api/chat-conversations/batch",
    type: "api",
    filePath: "app/api/chat-conversations/batch/route.ts",
    isProtected: false,
    isDynamic: false,
  },

  // Admin API Routes
  {
    path: "/api/admin/clean-database",
    type: "api",
    filePath: "app/api/admin/clean-database/route.ts",
    isProtected: true,
    isDynamic: false,
  },
  {
    path: "/api/admin/routes",
    type: "api",
    filePath: "app/api/admin/routes/route.ts",
    isProtected: true,
    isDynamic: false,
  },
  {
    path: "/api/admin/routes/bulk",
    type: "api",
    filePath: "app/api/admin/routes/bulk/route.ts",
    isProtected: true,
    isDynamic: false,
  },
  {
    path: "/api/admin/routes/check",
    type: "api",
    filePath: "app/api/admin/routes/check/route.ts",
    isProtected: true,
    isDynamic: false,
  },
  {
    path: "/api/admin/routes/stats",
    type: "api",
    filePath: "app/api/admin/routes/stats/route.ts",
    isProtected: true,
    isDynamic: false,
  },
  {
    path: "/api/admin/routes/logs",
    type: "api",
    filePath: "app/api/admin/routes/logs/route.ts",
    isProtected: true,
    isDynamic: false,
  },

  // Layouts y archivos especiales
  { path: "/layout", type: "layout", filePath: "app/layout.tsx", isProtected: false, isDynamic: false },
  { path: "/login/layout", type: "layout", filePath: "app/login/layout.tsx", isProtected: false, isDynamic: false },
  { path: "/posts/layout", type: "layout", filePath: "app/posts/layout.tsx", isProtected: false, isDynamic: false },
  { path: "/test/layout", type: "layout", filePath: "app/test/layout.tsx", isProtected: false, isDynamic: false },

  // Loading pages
  { path: "/login/loading", type: "loading", filePath: "app/login/loading.tsx", isProtected: false, isDynamic: false },
  { path: "/posts/loading", type: "loading", filePath: "app/posts/loading.tsx", isProtected: false, isDynamic: false },
  {
    path: "/posts/view/[id]/loading",
    type: "loading",
    filePath: "app/posts/view/[id]/loading.tsx",
    isProtected: false,
    isDynamic: true,
  },
  { path: "/admin/loading", type: "loading", filePath: "app/admin/loading.tsx", isProtected: true, isDynamic: false },

  { path: "/test/loading", type: "loading", filePath: "app/test/loading.tsx", isProtected: false, isDynamic: false },

  // Error pages
  { path: "/error", type: "error", filePath: "app/error.tsx", isProtected: false, isDynamic: false },
  { path: "/not-found", type: "not-found", filePath: "app/not-found.tsx", isProtected: false, isDynamic: false },
] as const

export type RouteType = "page" | "api" | "layout" | "loading" | "error" | "not-found"

export interface StaticRouteInfo {
  path: string
  type: RouteType
  filePath: string
  isProtected: boolean
  isDynamic: boolean
}

export function getStaticRoutes(): StaticRouteInfo[] {
  return STATIC_ROUTES.map((route) => ({
    path: route.path,
    type: route.type as RouteType,
    filePath: route.filePath,
    isProtected: route.isProtected,
    isDynamic: route.isDynamic,
  }))
}

export function getRouteStats() {
  const routes = getStaticRoutes()

  const byType = routes.reduce(
    (acc, route) => {
      acc[route.type] = (acc[route.type] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return {
    total: routes.length,
    byType,
    protected: routes.filter((r) => r.isProtected).length,
    dynamic: routes.filter((r) => r.isDynamic).length,
  }
}

export const ROUTE_CATEGORIES = {
  pages: STATIC_ROUTES.filter((route) => route.type === "page"),
  api: STATIC_ROUTES.filter((route) => route.type === "api"),
  admin: STATIC_ROUTES.filter((route) => route.path.startsWith("/admin")),
  auth: STATIC_ROUTES.filter(
    (route) => route.path.includes("login") || route.path.includes("signup") || route.path.includes("auth"),
  ),
  layouts: STATIC_ROUTES.filter((route) => route.type === "layout"),
  loading: STATIC_ROUTES.filter((route) => route.type === "loading"),
  error: STATIC_ROUTES.filter((route) => route.type === "error"),
  notFound: STATIC_ROUTES.filter((route) => route.type === "not-found"),
}

export function getRoutesByCategory(category?: string) {
  if (!category) return STATIC_ROUTES
  return ROUTE_CATEGORIES[category as keyof typeof ROUTE_CATEGORIES] || []
}

export function isValidRoute(path: string): boolean {
  return STATIC_ROUTES.some(
    (route) => route.path === path || (route.isDynamic && matchesDynamicRoute(path, route.path)),
  )
}

function matchesDynamicRoute(path: string, pattern: string): boolean {
  const pathParts = path.split("/")
  const patternParts = pattern.split("/")

  if (pathParts.length !== patternParts.length) return false

  return patternParts.every((part, index) => {
    if (part.startsWith("[") && part.endsWith("]")) return true
    return part === pathParts[index]
  })
}
º
