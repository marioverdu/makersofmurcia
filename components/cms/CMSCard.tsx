import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { ContentType } from "@/lib/content-type-detector"

interface CMSCardProps {
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

export function CMSCard({ 
  id, 
  title, 
  excerpt, 
  content, 
  contentType, 
  coverImage, 
  date, 
  tags = [], 
  className 
}: CMSCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <Link
      href={`/posts/view/${id}`}
      className={cn(
        "bg-white/30 backdrop-blur-md border border-gray-100 rounded-lg shadow-sm w-full md:w-[658px] xl:w-[800px] mb-8 block hover:outline hover:outline-2 hover:outline-[#3D5B6A] hover:outline-offset-8 transition-all duration-300 ease-out",
        className
      )}
      style={{ borderBottom: "1px solid rgba(0, 94, 182, 0.1)" }}
    >
              <article className="pt-6 px-4 pb-6 overflow-hidden">
        {coverImage && (
          <div className="mb-4 relative h-48 rounded-lg overflow-hidden">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        
        <h2 className="text-xl text-left mb-2 font-['Arial_Medium',_Arial,_sans-serif] font-normal">
          {title}
        </h2>
        
        {excerpt && (
          <p className="text-gray-600 text-left mb-4">{excerpt}</p>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <time
          dateTime={date}
          className="block text-sm text-gray-500 mt-4 underline decoration-gray-300"
        >
          {formatDate(date)}
        </time>
      </article>
    </Link>
  )
}
