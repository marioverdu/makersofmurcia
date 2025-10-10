"use client"

import { useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

interface MouseScrollIndicatorProps {
  className?: string
  showOnMobile?: boolean
}

export default function MouseScrollIndicator({ className = "", showOnMobile = false }: MouseScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true)
  const isMobile = useIsMobile()

  useEffect(() => {
    const handleScroll = () => {
      // Hide indicator after user scrolls down 100px
      if (window.scrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Don't show on mobile unless explicitly requested
  if (isMobile && !showOnMobile) {
    return null
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10 ${className}`}>
      <div className="flex flex-col items-center animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
        <div className="mt-2 text-xs text-gray-500 font-medium">Scroll</div>
      </div>
    </div>
  )
}
