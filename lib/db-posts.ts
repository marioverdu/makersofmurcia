// Mock posts service - no database connection

export interface Post {
  id: string | number
  title: string
  content: string
  excerpt?: string
  created_at: string
  updated_at?: string
}

// Mock data
const mockPosts: Post[] = [
  {
    id: 1,
    title: "Diseño de interfaces modernas con Tailwind CSS",
    content:
      "Tailwind CSS ha revolucionado la forma en que construimos interfaces modernas. En este artículo exploramos las mejores prácticas para crear diseños responsivos y accesibles.",
    excerpt: "Explorando las mejores prácticas para crear interfaces modernas con Tailwind CSS",
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    title: "Principios de UX/UI para productos digitales",
    content:
      "El diseño de experiencia de usuario es fundamental para el éxito de cualquier producto digital. Aquí analizamos los principios clave que todo diseñador debe conocer.",
    excerpt: "Guía completa sobre principios de diseño centrado en el usuario",
    created_at: "2024-01-10T14:30:00Z",
  },
  {
    id: 3,
    title: "Optimización de rendimiento en aplicaciones React",
    content:
      "React ofrece múltiples estrategias para optimizar el rendimiento de nuestras aplicaciones. Desde memo hasta lazy loading, exploramos todas las técnicas.",
    excerpt: "Técnicas avanzadas para mejorar el rendimiento en React",
    created_at: "2024-01-05T09:15:00Z",
  },
]

export async function getAllPosts(): Promise<Post[]> {
  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 100))
  return [...mockPosts].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

export async function getPostById(id: string | number): Promise<Post | null> {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return mockPosts.find((post) => post.id.toString() === id.toString()) || null
}

export async function searchPosts(query: string): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  if (!query.trim()) return []

  const lowerQuery = query.toLowerCase()
  return mockPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery) ||
      post.excerpt?.toLowerCase().includes(lowerQuery),
  )
}

export async function createPost(postData: Omit<Post, "id" | "created_at">): Promise<Post> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const newPost: Post = {
    ...postData,
    id: Date.now(),
    created_at: new Date().toISOString(),
  }

  mockPosts.unshift(newPost)
  return newPost
}

export async function updatePost(id: string | number, updates: Partial<Post>): Promise<Post | null> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const index = mockPosts.findIndex((post) => post.id.toString() === id.toString())
  if (index === -1) return null

  mockPosts[index] = {
    ...mockPosts[index],
    ...updates,
    updated_at: new Date().toISOString(),
  }

  return mockPosts[index]
}

export async function deletePost(id: string | number): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const index = mockPosts.findIndex((post) => post.id.toString() === id.toString())
  if (index === -1) return false

  mockPosts.splice(index, 1)
  return true
}

export async function getPostsCount(): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return mockPosts.length
}
