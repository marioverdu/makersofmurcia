"use client"

import { useState, useEffect } from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Check on mount
    checkDevice()

    // Add event listener
    window.addEventListener("resize", checkDevice)

    // Cleanup
    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  return !!isMobile
}

// Export alias for compatibility
export const useMobile = useIsMobile

// Default export
export default useIsMobile
