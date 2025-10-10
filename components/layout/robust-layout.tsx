"use client"

import { useState, useEffect } from 'react'

interface RobustLayoutProps {
  children: React.ReactNode
  className?: string
  backgroundImage?: string
  backgroundSize?: string
  backgroundPosition?: string
  backgroundRepeat?: string
}

export function RobustLayout({
  children,
  className = "",
  backgroundImage,
  backgroundSize = "cover",
  backgroundPosition = "center",
  backgroundRepeat = "no-repeat"
}: RobustLayoutProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Set hydrated immediately to prevent layout shift
    setIsHydrated(true)
  }, [])

  const backgroundStyle = backgroundImage ? {
    backgroundImage: `url('${backgroundImage}')`,
    backgroundSize,
    backgroundPosition,
    backgroundRepeat,
  } : {}

  return (
    <div
      className={`min-h-screen w-full overflow-x-hidden ${isHydrated ? 'hydrated' : ''} ${className}`}
      style={backgroundStyle}
    >
      {children}
    </div>
  )
}
