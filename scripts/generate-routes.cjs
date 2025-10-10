const fs = require("fs")
const path = require("path")

// Función para escanear directorios recursivamente
async function scanDirectory(dir, basePath = "") {
  const routes = []

  try {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      const relativePath = path.join(basePath, entry.name).replace(/\\/g, "/")

      if (entry.isDirectory()) {
        // Escanear subdirectorios recursivamente
        const subRoutes = await scanDirectory(fullPath, relativePath)
        routes.push(...subRoutes)
      } else if (entry.isFile()) {
        // Procesar archivos de ruta
        const routeInfo = processRouteFile(relativePath, entry.name)
        if (routeInfo) {
          routes.push(routeInfo)
        }
      }
    }
  } catch (error) {
    console.warn(`No se pudo escanear directorio ${dir}:`, error.message)
  }

  return routes
}

// Procesar archivos de ruta de Next.js
function processRouteFile(routePath, fileName) {
  const validFiles = [
    "page.tsx",
    "page.ts",
    "page.js",
    "route.ts",
    "route.js",
    "layout.tsx",
    "layout.ts",
    "layout.js",
    "loading.tsx",
    "loading.ts",
    "loading.js",
    "error.tsx",
    "error.ts",
    "error.js",
    "not-found.tsx",
    "not-found.ts",
    "not-found.js",
  ]

  if (!validFiles.includes(fileName)) {
    return null
  }

  // Convertir path del archivo a ruta web
  let webPath = routePath.replace(/\/(page|route|layout|loading|error|not-found)\.(tsx?|jsx?|js)$/, "")

  // Manejar rutas dinámicas
  webPath = webPath.replace(/\[([^\]]+)\]/g, "[$1]")

  // Asegurar que empiece con /
  if (!webPath.startsWith("/")) {
    webPath = "/" + webPath
  }

  // Limpiar rutas vacías (root)
  if (webPath === "/" && !fileName.startsWith("page.")) {
    webPath = `/${getFileTypePrefix(fileName)}`
  }

  return {
    path: webPath === "" ? "/" : webPath,
    type: getFileType(fileName),
    filePath: `app/${routePath}`,
    isProtected: isProtectedRoute(webPath),
    isDynamic: webPath.includes("[") && webPath.includes("]"),
  }
}

// Obtener tipo de archivo
function getFileType(fileName) {
  if (fileName.startsWith("route.")) return "api"
  if (fileName.startsWith("page.")) return "page"
  if (fileName.startsWith("layout.")) return "layout"
  if (fileName.startsWith("loading.")) return "loading"
  if (fileName.startsWith("error.")) return "error"
  if (fileName.startsWith("not-found.")) return "not-found"
  return "page"
}

// Obtener prefijo para tipos especiales
function getFileTypePrefix(fileName) {
  if (fileName.startsWith("layout.")) return "layout"
  if (fileName.startsWith("loading.")) return "loading"
  if (fileName.startsWith("error.")) return "error"
  if (fileName.startsWith("not-found.")) return "not-found"
  return ""
}

// Determinar si una ruta está protegida
function isProtectedRoute(path) {
  const protectedPaths = ["/admin", "/api/admin"]
  return protectedPaths.some((prot) => path.startsWith(prot))
}

// Generar el archivo TypeScript
function generateRoutesFile(routes) {
  const routesData = routes.map((route) => ({
    path: route.path,
    type: route.type,
    filePath: route.filePath,
    isProtected: route.isProtected,
    isDynamic: route.isDynamic,
  }))

  const fileContent = `// Este archivo es generado automáticamente durante el build
// No editar manualmente - se sobrescribirá en el próximo build
// Generado el: ${new Date().toISOString()}

export const GENERATED_ROUTES = ${JSON.stringify(routesData, null, 2)} as const

export type RouteType = "page" | "api" | "layout" | "loading" | "error" | "not-found"

export interface GeneratedRouteInfo {
  path: string
  type: RouteType
  filePath: string
  isProtected: boolean
  isDynamic: boolean
}

export function getGeneratedRoutes(): GeneratedRouteInfo[] {
  return GENERATED_ROUTES.map(route => ({
    path: route.path,
    type: route.type as RouteType,
    filePath: route.filePath,
    isProtected: route.isProtected,
    isDynamic: route.isDynamic
  }))
}

export function getGeneratedRouteStats() {
  const routes = getGeneratedRoutes()
  
  const byType = routes.reduce((acc, route) => {
    acc[route.type] = (acc[route.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  return {
    total: routes.length,
    byType,
    protected: routes.filter(r => r.isProtected).length,
    dynamic: routes.filter(r => r.isDynamic).length,
    generated: new Date().toISOString()
  }
}

export function getRoutesByCategory(category?: string) {
  const routes = getGeneratedRoutes()
  
  if (!category) return routes
  
  return routes.filter(route => {
    if (category === 'api') return route.type === 'api'
    if (category === 'admin') return route.path.startsWith('/admin')
    if (category === 'styleguide') return route.path.startsWith('/styleguide')
    if (category === 'auth') return route.path.includes('login') || route.path.includes('signup') || route.path.includes('auth')
    if (category === 'posts') return route.path.startsWith('/posts')
    if (category === 'test') return route.path.startsWith('/test')
    if (category === 'protected') return route.isProtected
    if (category === 'dynamic') return route.isDynamic
    if (category === 'public') return !route.isProtected
    return false
  })
}

export function isValidGeneratedRoute(path: string): boolean {
  const routes = getGeneratedRoutes()
  return routes.some(route => 
    route.path === path || 
    (route.isDynamic && matchesDynamicRoute(path, route.path))
  )
}

function matchesDynamicRoute(path: string, pattern: string): boolean {
  const pathParts = path.split('/')
  const patternParts = pattern.split('/')
  
  if (pathParts.length !== patternParts.length) return false
  
  return patternParts.every((part, index) => {
    if (part.startsWith('[') && part.endsWith(']')) return true
    return part === pathParts[index]
  })
}
`

  return fileContent
}

// Función principal
async function generateRoutes() {
  try {
    console.log("🔄 Generando lista de rutas automáticamente...")

    const appDir = path.join(process.cwd(), "app")

    // Verificar que existe el directorio app
    if (!fs.existsSync(appDir)) {
      console.error("❌ No se encontró el directorio app/")
      process.exit(1)
    }

    // Escanear todas las rutas
    const routes = await scanDirectory(appDir)

    // Filtrar y limpiar rutas
    const cleanRoutes = routes.filter((route) => route && route.path).sort((a, b) => a.path.localeCompare(b.path))

    console.log(`✅ Encontradas ${cleanRoutes.length} rutas`)

    // Generar el archivo
    const fileContent = generateRoutesFile(cleanRoutes)
    const outputPath = path.join(process.cwd(), "lib", "generated-routes.ts")

    // Crear directorio lib si no existe
    const libDir = path.dirname(outputPath)
    if (!fs.existsSync(libDir)) {
      fs.mkdirSync(libDir, { recursive: true })
    }

    // Escribir el archivo
    fs.writeFileSync(outputPath, fileContent, "utf8")

    console.log(`📝 Archivo generado: ${outputPath}`)
    console.log("🎉 Generación de rutas completada")

    // Mostrar estadísticas
    const stats = {
      total: cleanRoutes.length,
      pages: cleanRoutes.filter((r) => r.type === "page").length,
      apis: cleanRoutes.filter((r) => r.type === "api").length,
      layouts: cleanRoutes.filter((r) => r.type === "layout").length,
      protected: cleanRoutes.filter((r) => r.isProtected).length,
      dynamic: cleanRoutes.filter((r) => r.isDynamic).length,
    }

    console.log("📊 Estadísticas:")
    console.log(`   Total: ${stats.total}`)
    console.log(`   Páginas: ${stats.pages}`)
    console.log(`   APIs: ${stats.apis}`)
    console.log(`   Layouts: ${stats.layouts}`)
    console.log(`   Protegidas: ${stats.protected}`)
    console.log(`   Dinámicas: ${stats.dynamic}`)
  } catch (error) {
    console.error("❌ Error generando rutas:", error)
    process.exit(1)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  generateRoutes()
}

module.exports = { generateRoutes }
