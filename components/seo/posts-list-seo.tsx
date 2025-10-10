// Componente SEO simplificado para listas de posts
// Solo incluye JSON-LD Schema.org para evitar conflictos con Next.js

interface PostsListSEOProps {
  currentPage?: number
  totalPosts?: number
  category?: string
  tag?: string
}

export default function PostsListSEO({ 
  currentPage = 1, 
  totalPosts = 0, 
  category, 
  tag 
}: PostsListSEOProps) {
  // Por ahora, este componente no hace nada para evitar conflictos
  // El SEO se maneja a través de los metadatos nativos de Next.js
  return null
}
