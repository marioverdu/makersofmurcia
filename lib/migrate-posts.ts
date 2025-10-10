import { getPosts } from "./posts"
import { sql } from "./db"

// Frontend-only migration utilities - NO database connection

// Mock migration function
export async function migratePostsToDatabase(): Promise<{ success: boolean; migrated: number; errors: string[] }> {
  console.log("Mock: Migration started (no real database)")

  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const filePosts = getPosts()

  console.log(`Mock: Would migrate ${filePosts.length} posts`)

  return {
    success: true,
    migrated: filePosts.length,
    errors: [],
  }
}

export async function migratePosts() {
  console.log("Mock: Posts migration (no real database)")

  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 800))

  const mockPosts = [
    {
      id: 1,
      title: "Mock Post 1",
      content: "Mock content 1",
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Mock Post 2",
      content: "Mock content 2",
      created_at: new Date().toISOString(),
    },
  ]

  console.log("Mock: Created sample posts")
  return mockPosts
}

// Datos de ejemplo para la migración
const samplePosts = [
  {
    title: "Introducción a Next.js",
    content:
      "# Introducción a Next.js\n\nNext.js es un framework de React que permite funcionalidades como renderizado del lado del servidor y generación de sitios estáticos para aplicaciones web basadas en React...",
    excerpt: "Una breve introducción a Next.js y sus características principales",
    featured_image: "https://example.com/nextjs.jpg",
    tags: ["Next.js", "React", "JavaScript"],
  },
  {
    title: "Trabajando con bases de datos en aplicaciones web",
    content:
      "# Bases de datos en aplicaciones web\n\nLas bases de datos son fundamentales para almacenar y gestionar datos en aplicaciones web modernas...",
    excerpt: "Guía para integrar bases de datos en tus aplicaciones web",
    featured_image: "https://example.com/database.jpg",
    tags: ["Bases de datos", "PostgreSQL", "Backend"],
  },
  {
    title: "> La importancia del diseño en desarrollo web",
    content:
      "> El diseño no es solo cómo se ve, sino cómo funciona. - Steve Jobs\n\nEl diseño web va más allá de la estética, es fundamental para la experiencia del usuario...",
    excerpt: "Reflexiones sobre la importancia del diseño en el desarrollo web",
    featured_image: "https://example.com/design.jpg",
    tags: ["Diseño", "UX", "UI"],
  },
  {
    title: "Integración de APIs externas",
    content:
      "# Integración de APIs\n\nLas APIs permiten que nuestras aplicaciones se comuniquen con servicios externos...",
    excerpt: "Cómo integrar APIs externas en tus proyectos",
    featured_image: "https://example.com/api.jpg",
    tags: ["API", "Integración", "REST"],
  },
  {
    title: "Optimización de rendimiento web",
    content: "# Optimización de rendimiento\n\nEl rendimiento es crucial para la experiencia del usuario y el SEO...",
    excerpt: "Técnicas para mejorar el rendimiento de tu sitio web",
    featured_image: "https://example.com/performance.jpg",
    tags: ["Rendimiento", "Optimización", "Web"],
  },
]

async function createTables() {
  try {
    // Crear tabla de posts
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        content TEXT NOT NULL,
        excerpt TEXT,
        featured_image TEXT,
        published BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Crear tabla de tags
    await sql`
      CREATE TABLE IF NOT EXISTS tags (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        slug VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Crear tabla de relación entre posts y tags
    await sql`
      CREATE TABLE IF NOT EXISTS post_tags (
        post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
        tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
        PRIMARY KEY (post_id, tag_id)
      )
    `

    console.log("Tablas creadas correctamente")
  } catch (error) {
    console.error("Error creando tablas:", error)
    throw error
  }
}
