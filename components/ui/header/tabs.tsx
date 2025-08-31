"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface HeaderTabsProps {
  className?: string
}

export function HeaderTabs({ className = "" }: HeaderTabsProps) {
  const pathname = usePathname()
  
  // Debug: Log the current state
  console.log(`🔍 [HeaderTabs Debug] pathname: ${pathname}`)
  const [routesVisibility, setRoutesVisibility] = useState<{ [key: string]: boolean }>({})
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" || process.env.NODE_ENV === "production"

  useEffect(() => {
    const loadVisibility = async () => {
      console.log(`🔄 [${isProduction ? "PROD" : "DEV"}] HeaderTabs: Loading route visibility...`)

      // En development, primero intentar localStorage
      if (!isProduction && typeof window !== "undefined") {
        const localVisibilityRaw = localStorage.getItem("routesVisibility")
        if (localVisibilityRaw) {
          try {
            const localVisibility = JSON.parse(localVisibilityRaw)
            console.log(`📱 [DEV] HeaderTabs: Using localStorage visibility:`, localVisibility)
            setRoutesVisibility(localVisibility)
            return
          } catch (error) {
            console.warn(`⚠️ [DEV] HeaderTabs: localStorage parse error:`, error)
          }
        }
      }

      // Si no hay localStorage o estamos en production, consultar la API
      try {
        console.log(`🌐 [${isProduction ? "PROD" : "DEV"}] HeaderTabs: Fetching from API...`)
        const response = await fetch("/api/admin/routes", {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const data = await response.json()

        if (data && data.data && data.data.routes) {
          const visibility: { [key: string]: boolean } = {}
          data.data.routes.forEach((route: any) => {
            visibility[route.path] = route.isVisible
          })

          console.log(`✅ [${isProduction ? "PROD" : "DEV"}] HeaderTabs: API visibility loaded:`, visibility)
          setRoutesVisibility(visibility)

          // En development, guardar en localStorage como cache
          if (!isProduction && typeof window !== "undefined") {
            localStorage.setItem("routesVisibility", JSON.stringify(visibility))
            console.log(`📱 [DEV] HeaderTabs: Cached in localStorage`)
          }
        } else {
          throw new Error("Invalid API response format")
        }
      } catch (error) {
        console.error(`❌ [${isProduction ? "PROD" : "DEV"}] HeaderTabs: Error loading visibility:`, error)

        // Fallback: mostrar rutas principales por defecto
        const defaultVisibility = {
          "/": true,
          "/posts": true,
          "/work-experience": true,
        }
        
        // Asegurar que siempre tengamos visibilidad por defecto
        if (Object.keys(routesVisibility).length === 0) {
          setRoutesVisibility(defaultVisibility)
        }
        console.log(`🔧 [${isProduction ? "PROD" : "DEV"}] HeaderTabs: Using default visibility`)
        setRoutesVisibility(defaultVisibility)
      }
    }

    loadVisibility()

    // Escuchar cambios en localStorage (solo en development)
    if (!isProduction && typeof window !== "undefined") {
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === "routesVisibility" && e.newValue) {
          try {
            const newVisibility = JSON.parse(e.newValue)
            console.log(`📱 [DEV] HeaderTabs: localStorage changed:`, newVisibility)
            setRoutesVisibility(newVisibility)
          } catch (error) {
            console.warn(`⚠️ [DEV] HeaderTabs: Error parsing storage change:`, error)
          }
        }
      }

      window.addEventListener("storage", handleStorageChange)
      return () => window.removeEventListener("storage", handleStorageChange)
    }
  }, [isProduction])

  // Check if estamos en un breakpoint móvil muy pequeño
  const [isTinyMobile, setIsTinyMobile] = useState(false)
  useEffect(() => {
    const checkTiny = () => setIsTinyMobile(typeof window !== 'undefined' && window.innerWidth < 380)
    checkTiny()
    window.addEventListener('resize', checkTiny)
    return () => window.removeEventListener('resize', checkTiny)
  }, [])

  // Check if we're on the posts page
  const isPostsPage = pathname.startsWith("/posts")
  const isRootPage = pathname === "/" || pathname === "/en" || pathname === "/es" || pathname.match(/^\/[a-z]{2}$/)
  const isWorkExperiencePage = pathname === "/work-experience" || 
                              pathname === "/work-experience-fix" || 
                              pathname.startsWith("/work-experience-fix") ||
                              pathname.includes("/work-experience-fix") ||
                              pathname === "/root-fix" ||
                              pathname.startsWith("/root-fix") ||
                              pathname.includes("/root-fix") ||
                              pathname.startsWith("/es/work-experience") ||
                              pathname.startsWith("/en/work-experience") ||
                              pathname.match(/^\/[a-z]{2}\/work-experience/)

  // Debug: Log the current state for ALL pages
  console.log(`🔍 [HeaderTabs Debug] pathname: ${pathname}, isRootPage: ${isRootPage}, isPostsPage: ${isPostsPage}, isWorkExperiencePage: ${isWorkExperiencePage}`)
  console.log(`🔍 [HeaderTabs Debug] pathname details:`, {
    pathname,
    startsWithPosts: pathname.startsWith("/posts"),
    startsWithWorkExperience: pathname.startsWith("/work-experience"),
    startsWithEsWorkExperience: pathname.startsWith("/es/work-experience"),
    startsWithEnWorkExperience: pathname.startsWith("/en/work-experience"),
    matchesLocaleWorkExperience: pathname.match(/^\/[a-z]{2}\/work-experience/)
  })

  console.log(`🎯 [${isProduction ? "PROD" : "DEV"}] HeaderTabs: Rendering with visibility:`, routesVisibility)

  return (
    <div className={`flex gap-[16px] h-[40px] mx-auto md:mx-0 justify-center md:justify-start ${className}`}>
      {/* Mostrar siempre las tabs principales */}
      <Link
        href="/"
        className={`text-sm font-medium h-[40px] flex items-center px-1 border-b-2 ${
          isRootPage
            ? "text-[#3D5B6A] border-[#3D5B6A]"
            : "text-gray-500 font-normal border-transparent hover:border-[#3D5B6A] hover:text-[#3D5B6A]"
        } transition-colors`}
      >
        Inicio
      </Link>
      <Link
        href="/posts"
        className={`text-sm font-medium h-[40px] flex items-center px-1 border-b-2 ${
          isPostsPage
            ? "text-[#3D5B6A] border-[#3D5B6A]"
            : "text-gray-500 font-normal border-transparent hover:border-[#3D5B6A] hover:text-[#3D5B6A]"
        } transition-colors`}
      >
        Posts
      </Link>
        <Link
    href="/work-experience"
    className={`text-sm font-medium h-[40px] flex items-center px-1 border-b-2 ${
      isWorkExperiencePage
        ? "text-[#3D5B6A] border-[#3D5B6A]"
        : "text-gray-500 font-normal border-transparent hover:border-[#3D5B6A] hover:text-[#3D5B6A]"
    } transition-colors`}
  >
    Experiencia
  </Link>
    </div>
  )
}
