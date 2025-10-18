"use client"

import React, { forwardRef } from 'react'
import Image from 'next/image'

interface GridMasonryProps {
  title?: string
  children?: React.ReactNode
  className?: string
}

interface PostCardProps {
  title: string
  image?: string
  excerpt?: string
  type: 'article' | 'photo' | 'quote' | 'video'
  tags?: string[]
  date: string
}

// Componente de Card individual
function PostCard({ title, image, excerpt, type, tags, date }: PostCardProps) {
  const getCardHeight = () => {
    switch (type) {
      case 'photo': return 'aspect-square'
      case 'quote': return 'aspect-[4/5]'
      case 'video': return 'aspect-video'
      default: return 'aspect-[3/4]'
    }
  }

  const getCardStyle = () => {
    // Sin colores de fondo, solo transparencia
    return 'bg-transparent'
  }

  return (
    <article className={`
      group relative overflow-hidden rounded-xl
      transition-all duration-300 ease-out
      hover:-translate-y-1
      ${getCardStyle()}
      ${getCardHeight()}
    `}>
      {/* Imagen de fondo si existe */}
      {image && (
        <div className="absolute inset-0">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      )}

      {/* Contenido */}
      <div className="relative h-full flex flex-col justify-end p-6">
        {type === 'quote' && (
          <blockquote className="text-lg font-serif italic text-gray-800 mb-4">
            "{excerpt}"
          </blockquote>
        )}
        
        <h3 className={`
          font-semibold leading-tight mb-2
          ${image ? 'text-white' : 'text-gray-900'}
          ${type === 'photo' ? 'text-sm' : 'text-base'}
        `}>
          {title}
        </h3>

        {excerpt && type !== 'quote' && (
          <p className={`
            text-sm line-clamp-2 mb-3
            ${image ? 'text-white/90' : 'text-gray-600'}
          `}>
            {excerpt}
          </p>
        )}

        <div className="flex items-center justify-between">
          {tags && tags.length > 0 && (
            <span className={`
              text-xs px-2 py-1 rounded-full
              ${image ? 'text-white' : 'text-gray-600'}
            `}>
              {tags[0]}
            </span>
          )}
          
          <time className={`
            text-xs
            ${image ? 'text-white/80' : 'text-gray-500'}
          `}>
            {new Date(date).toLocaleDateString('es-ES', { 
              day: 'numeric', 
              month: 'short' 
            })}
          </time>
        </div>
      </div>

      {/* Sin overlay de hover */}
    </article>
  )
}

// Datos de ejemplo para el grid con imágenes de Unsplash
const samplePosts = [
  {
    title: "Otro Ejemplo Enriquecido",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    excerpt: "This page is a demo that shows everything you can do inside portfolio and blog posts.",
    type: "article" as const,
    tags: ["Post+"],
    date: "2025-09-28"
  },
  {
    title: "Contenido Básico",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    excerpt: "This page is a demo that shows everything you can do inside portfolio and bl...",
    type: "article" as const,
    tags: ["Post"],
    date: "2025-09-28"
  },
  {
    title: "Simplicity is the ultimate sophistication",
    type: "quote" as const,
    excerpt: "Simplicity is the ultimate sophistication. - Leonardo da Vinci",
    tags: ["Quote"],
    date: "2025-09-28"
  },
  {
    title: "Demo Portfolio Post",
    image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?q=80&w=1200&auto=format&fit=crop",
    excerpt: "This page is a demo that shows everything you can do inside portfolio and blog posts.",
    type: "photo" as const,
    tags: ["Photo"],
    date: "2025-09-28"
  },
  {
    title: "Video Demo Post",
    type: "video" as const,
    excerpt: "This page is a demo that shows everything you can do inside portfolio and blog posts.",
    tags: ["Video"],
    date: "2025-09-28"
  }
]

export const GridMasonry = forwardRef<HTMLDivElement, GridMasonryProps>(
  ({ title = "Portfolio", children, className = "" }, ref) => {
    return (
      <div
        ref={ref}
        className={`w-full md:w-[658px] xl:w-[800px] mb-0 ${className}`}
      >
        <article className="pt-6 px-4 pb-6 overflow-hidden">
          {/* Grid Masonry con breakpoints actuales del proyecto */}
          <div className="
            grid gap-4 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3
            auto-rows-max
          ">
            {samplePosts.map((post, index) => (
              <PostCard key={index} {...post} />
            ))}
          </div>
          
          {children}
        </article>
      </div>
    )
  }
)

GridMasonry.displayName = 'GridMasonry'
