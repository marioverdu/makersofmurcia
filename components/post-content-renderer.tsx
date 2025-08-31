import type { Post } from "@/lib/posts"

interface PostContentRendererProps {
  post: Post
  className?: string
}

export function PostContentRenderer({ post, className = "" }: PostContentRendererProps) {
  // Add a safety check at the beginning
  if (!post || !post.content) {
    return <p className="text-gray-500 italic">No content available</p>
  }

  // Función para detectar si el contenido es ASCII art
  const isAsciiArt = (content: string): boolean => {
    if (!content) return false

    // Detectar patrones comunes en arte ASCII/FIGlet
    const hasMultipleLines = content.trim().split("\n").length > 3
    const hasSpecialChars = /[_/\\|]/.test(content)
    const hasRepeatedSpecialChars = /(_{2,}|\\{2,}|\/{2,}|\|{2,})/.test(content)
    const hasTypicalFigletStructure = /^ {2,}[_/\\|]/.test(content) || /[_/\\|] {2,}/.test(content)

    return hasMultipleLines && hasSpecialChars && (hasRepeatedSpecialChars || hasTypicalFigletStructure)
  }

  switch (post.contentType) {
    case "ascii-art":
      return (
        <pre
          className={`font-mono text-sm whitespace-pre overflow-x-auto my-4 p-4 bg-black text-green-400 leading-tight rounded-md ${className}`}
        >
          {post.content}
        </pre>
      )
    case "quote":
      return (
        <blockquote
          className={`text-xl font-serif text-gray-600 italic border-l-4 border-gray-300 pl-4 my-4 ${className}`}
        >
          {post.content.replace(/^>|\\n/g, "")}
        </blockquote>
      )
    case "music-player":
      return <div className={`my-4 w-full ${className}`} dangerouslySetInnerHTML={{ __html: post.content }} />
    case "video-player":
      return (
        <div className={`my-4 w-full aspect-video ${className}`}>
          <iframe
            src={`https://www.youtube.com/embed/${post.content.match(/video-id="([^"]+)"/) ? post.content.match(/video-id="([^"]+)"/)[1] : "dQw4w9WgXcQ"}`}
            className="w-full h-full"
            allowFullScreen
            title={post.title || "Video"}
          ></iframe>
        </div>
      )
    case "photo":
      return (
        <div className={`my-4 w-full ${className}`}>
          <img
            src={post.coverImage || post.image || "/placeholder.svg"}
            alt={post.title || "Image"}
            className="w-full rounded-md"
          />
        </div>
      )
    case "post":
    case "post+":
    default:
      // Verificar si el contenido parece ser ASCII art
      if (isAsciiArt(post.content)) {
        return (
          <pre
            className={`font-mono text-sm whitespace-pre overflow-x-auto my-4 p-4 bg-black text-green-400 leading-tight rounded-md ${className}`}
          >
            {post.content}
          </pre>
        )
      }

      return (
        <div className={`my-4 prose max-w-none ${className}`}>
          <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }} />
        </div>
      )
  }
}
