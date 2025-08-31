import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { ContentType } from "@/lib/content-type-detector"

interface PostCardProps {
  id: string
  title: string
  excerpt: string
  content: string
  contentType: ContentType
  coverImage: string
  date: string
  tags?: string[]
  className?: string
}

export function PostCard({
  id,
  title,
  excerpt,
  content,
  contentType,
  coverImage,
  date,
  tags = [],
  className,
}: PostCardProps) {
  return (
    <article
      className={cn(
        "bg-white/30 backdrop-blur-md rounded-lg overflow-hidden shadow-sm transition-all duration-300 ease-out hover:outline hover:outline-2 hover:outline-[#3D5B6A] hover:outline-offset-8 h-fit border border-gray-100",
        className,
      )}
      style={{ borderBottom: "1px solid rgba(0, 94, 182, 0.1)" }}
    >
      <Link href={`/posts/view/${id}`} className="block">
        <div className="flex flex-col h-full">
          {/* Thumbnail based on post type */}
          {contentType === "quote" ? (
            <div className="h-[300px] bg-secondary flex items-center justify-center p-8">
              <blockquote className="text-2xl font-serif text-secondary-foreground leading-relaxed text-center">
                {content.replace(/^>|\n/g, "")}
              </blockquote>
            </div>
          ) : contentType === "music-player" ? (
            <div className="h-[180px] bg-gradient-to-br from-orange-200 to-amber-100 flex items-center justify-center">
              <div className="text-orange-700 font-medium">SoundCloud Player</div>
            </div>
          ) : (
            <div
              className={cn(
                "relative w-full aspect-[4/5]",
                contentType === "photo" && "aspect-[4/5]",
                contentType === "video-player" && "aspect-[4/5]",
                (contentType === "post" || contentType === "post+") && "aspect-[4/5]",
              )}
            >
              <Image
                src={coverImage || "/placeholder.svg?height=600&width=400"}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6 pb-4">
            {/* Excerpt - Now first */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-4">{excerpt}</p>

            {/* Add special handling for ASCII art content */}
            {contentType === "ascii-art" && (
              <pre className="font-mono text-xs overflow-x-auto my-2 p-2 bg-gray-100 rounded-md max-h-[150px]">
                {content}
              </pre>
            )}

            {/* Badge/tag and date in the same div with space-between */}
            <div className="flex justify-between items-center mt-auto">
              {/* Badge/Tag on the left */}
              <span
                className={cn(
                  "inline-block px-3 py-1 rounded-full text-xs font-semibold",
                  contentType === "post+" && "bg-violet-100 text-violet-700",
                  contentType === "photo" && "bg-blue-100 text-blue-700",
                  contentType === "quote" && "bg-purple-100 text-purple-700",
                  contentType === "music-player" && "bg-pink-100 text-pink-700",
                  contentType === "video-player" && "bg-orange-100 text-orange-700",
                  contentType === "ascii-art" && "bg-green-100 text-green-700",
                  contentType === "post" && "bg-sky-100 text-sky-700",
                )}
              >
                {contentType}
              </span>

              {/* Date on the right */}
              <p className="text-sm text-gray-500">{new Date(date).toLocaleDateString()}</p>
            </div>

            {/* Hidden content - Store but don't display */}
            <div className="hidden">
              <h2 className="text-xl font-semibold leading-relaxed mb-3 line-clamp-2">{title}</h2>

              <div className="flex justify-between items-center mt-2">
                {tags && tags.length > 0 && (
                  <span className="text-xs py-0.5 px-2 bg-gray-100 text-gray-600 rounded-full">{tags[0]}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
