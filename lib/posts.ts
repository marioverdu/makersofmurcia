export interface Post {
  id: number | string
  title: string
  content: string
  excerpt?: string
  coverImage?: string
  date?: string
  created_at: string
  updated_at?: string
  published?: boolean
  featured_image?: string
  slug?: string
  contentType?: string
  environment?: "production" | "development"
  tags?: string[]
}

export async function getPosts() {
  try {
    const response = await fetch("/api/posts")
    if (!response.ok) {
      throw new Error(`Error loading posts: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching posts:", error)
    throw error
  }
}

export async function getPost(id: string) {
  try {
    const response = await fetch(`/api/posts/${id}`)
    if (!response.ok) {
      throw new Error(`Error loading post: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error)
    throw error
  }
}

export function detectContentType(content: string): string {
  if (!content) return "post"

  if (content.includes("<iframe") && content.includes("soundcloud")) {
    return "music-player"
  } else if (content.includes("<iframe") || content.includes("youtube")) {
    return "video-player"
  } else if (content.startsWith(">") || content.startsWith("&gt;")) {
    return "quote"
  } else if (content.startsWith("![") || content.includes("![")) {
    return "photo"
  } else if (content.includes("#") || content.includes("##")) {
    return "post+"
  } else {
    return "post"
  }
}

export type ContentType = "post" | "post+" | "photo" | "quote" | "music-player" | "video-player" | "ascii-art"
