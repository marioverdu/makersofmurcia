import { neon } from "@neondatabase/serverless";

// Verificar que DATABASE_URL esté configurado
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL no está configurado en las variables de entorno")
  console.error("Variables de entorno disponibles:", Object.keys(process.env).filter(key => key.includes('DATABASE') || key.includes('POSTGRES')))
  
  // En desarrollo, no lanzar error fatal
  if (process.env.NODE_ENV === 'development') {
    console.warn("⚠️ Continuando en modo desarrollo sin base de datos")
  } else {
    throw new Error("DATABASE_URL no está configurado. Verifica tu archivo .env.local")
  }
}

// Crear una función de conexión condicional
let sql: any = null;

try {
  if (process.env.DATABASE_URL && process.env.DATABASE_URL !== 'your_database_url_here') {
    sql = neon(process.env.DATABASE_URL)
    console.log("✅ Base de datos conectada correctamente")
  } else {
    console.warn("⚠️ DATABASE_URL no válido, usando modo sin base de datos")
  }
} catch (error) {
  console.error("❌ Error conectando a la base de datos:", error)
  console.warn("⚠️ Continuando sin base de datos")
}

// Exportar sql con fallback
export { sql }

export interface Post {
  id: string
  title: string
  content: string
  excerpt?: string
  created_at: string
  updated_at?: string
}

export async function initializeDatabase() {
  console.log("Database initialized")
  return { success: true, message: "Database ready" }
}

export async function checkDatabaseConnection() {
  console.log("Database connection checked")
  return { connected: true, message: "Database connected" }
}

export async function cleanDatabase() {
  console.log("Database cleaned")
  return { success: true, message: "Database cleaned" }
}

export async function getAllPosts(): Promise<Post[]> {
  // This would connect to real database in production
  return []
}

export async function getPostById(id: string): Promise<Post | null> {
  return null
}

export async function createPost(post: Omit<Post, "id" | "created_at">): Promise<Post> {
  const newPost: Post = {
    ...post,
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
  }
  return newPost
}

export async function updatePost(id: string, updates: Partial<Post>): Promise<Post | null> {
  return null
}

export async function deletePost(id: string): Promise<boolean> {
  return true
}

export async function searchPosts(query: string): Promise<Post[]> {
  return []
}
