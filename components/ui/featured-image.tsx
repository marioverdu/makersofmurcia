"use client"

import React from 'react'

interface FeaturedImageProps {
  src: string
  alt: string
  className?: string
}

// FeaturedImage: componente estándar para la imagen destacada de un post
export function FeaturedImage({ src, alt, className = "w-full h-48 object-cover rounded-lg" }: FeaturedImageProps) {
  return (
    <img src={src} alt={alt} className={className} />
  )
}

export default FeaturedImage


