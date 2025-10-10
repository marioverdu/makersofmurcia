"use client"

interface ImageCarouselProps {
  images: {
    src: string
    alt: string
  }[]
  className?: string
  imageClassName?: string
}

export function ImageCarousel({ images, className = "", imageClassName = "" }: ImageCarouselProps) {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            className={`absolute object-contain opacity-100 ${imageClassName}`}
            style={{ transform: "translate(-50%, -50%)", left: "50%", top: "50%" }}
          />
        ))}
      </div>
    </div>
  )
}
