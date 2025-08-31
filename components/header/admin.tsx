"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export function HeaderAdmin() {
  const router = useRouter()
  const [paddingValues, setPaddingValues] = useState({
    left: "16px",
    right: "16px",
  })

  useEffect(() => {
    updatePaddingValues()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      updatePaddingValues()
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  const updatePaddingValues = () => {
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth < 768
      setPaddingValues({
        left: isMobile ? "16px" : "60px",
        right: isMobile ? "16px" : "60px",
      })
    }
  }

  const handleSignOut = async () => {
    router.push("/")
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
      <div
        className="container mx-auto py-3"
        style={{
          paddingLeft: paddingValues.left,
          paddingRight: paddingValues.right,
        }}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="text-xl font-bold text-primary">
              Panel de Administración
            </Link>
            <span className="text-sm text-gray-500">|</span>
                          <Link href="/admin/posts" className="text-sm text-gray-600 hover:text-primary">
              Posts
            </Link>
                          <Link href="/admin/booking" className="text-sm text-gray-600 hover:text-primary">
              Booking
            </Link>
                          <Link href="/admin/maintenance" className="text-sm text-gray-600 hover:text-primary">
              Maintenance
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              <span className="font-semibold">Admin</span>
            </div>
            <button onClick={handleSignOut} className="text-sm text-gray-600 hover:text-gray-800 font-medium">
              Ir a Home
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export const Header = HeaderAdmin
