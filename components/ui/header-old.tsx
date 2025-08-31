"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import { HeaderTabs } from "@/components/ui/header/tabs"
import { usePathname, useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"
import type { Post } from "@/lib/posts"

// Modificar la interfaz HeaderProps para incluir una nueva prop opcional
interface HeaderProps {
  className?: string
  children?: React.ReactNode
  transparent?: boolean
  avatarPosition?: {
    mobile: number
    desktop: number
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
    xxl: number
  }
  staticMode?: boolean // Añadido para permitir modo estático en styleguide
  pathname?: string // Permitir simular la ruta activa
}

// Actualizar la función Header para usar la nueva prop e incluir la funcionalidad de búsqueda
export function Header({
  className = "",
  children,
  transparent = false,
  avatarPosition = { mobile: 0, desktop: 0, xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },
  staticMode = false, // Por defecto false
  pathname: pathnameProp,
}: HeaderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(true)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const debouncedSearchQuery = useDebounce(searchQuery, 300)
  const isMobile = useRef(false)
  const [isAvatarVisible, setIsAvatarVisible] = useState(false)

  // Evitar hydration mismatch: valor fijo en SSR, se actualiza en useEffect
  const [searchButtonLeft, setSearchButtonLeft] = useState(avatarPosition.desktop)

  const pathnamePropLocal = pathnameProp

  useEffect(() => {
    // Calculate position immediately on mount
    const hasAvatar = React.Children.toArray(children).length > 0
    const newPosition = hasAvatar
      ? isMobile.current
        ? avatarPosition.mobile + 40
        : avatarPosition.desktop + 40
      : isMobile.current
        ? avatarPosition.mobile
        : avatarPosition.desktop

    setSearchButtonLeft(newPosition)
  }, []) // Empty dependency array means this runs once on mount

  useEffect(() => {
    // Detectar si es un dispositivo móvil
    const checkIfMobile = () => {
      const wasMobile = isMobile.current
      isMobile.current = window.innerWidth < 768

      // Update search button position if mobile state changed
      if (wasMobile !== isMobile.current) {
        const hasAvatar = React.Children.toArray(children).length > 0
        const newPosition = hasAvatar
          ? isMobile.current
            ? avatarPosition.mobile + 40
            : avatarPosition.desktop + 40
          : isMobile.current
            ? avatarPosition.mobile
            : avatarPosition.desktop

        setSearchButtonLeft(newPosition)
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [children, avatarPosition, pathname])

  useEffect(() => {
    // Only apply special behavior on home page and posts page
    if (pathname === "/" || pathname === "/posts") {
      // Check if we've already shown the header today
      const today = new Date().toDateString()
      const hasShownHeader = localStorage.getItem("headerShown") === today

      // Initially hide the avatar if it hasn't been shown today
      if (!hasShownHeader && pathname === "/") {
        setIsVisible(false)
        setIsAvatarVisible(false)
      } else if (pathname === "/posts") {
        // For posts page, avatar visibility depends on scroll position
        setIsAvatarVisible(window.scrollY > 100)
      }

      const handleScroll = () => {
        if (!isVisible && window.scrollY > 100) {
          setIsVisible(true)
          // Save that we've shown the header today
          localStorage.setItem("headerShown", today)
        }

        // Update avatar visibility based on scroll position
        // Use a different threshold for posts page vs home page
        const threshold = pathname === "/" ? 150 : 100
        setIsAvatarVisible(window.scrollY > threshold)
      }

      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    } else {
      // For other pages, avatar is visible by default
      setIsAvatarVisible(true)
    }
  }, [pathname, isVisible])

  // Efecto para manejar la búsqueda cuando cambia el query debounced
  useEffect(() => {
    const searchPosts = async () => {
      if (!debouncedSearchQuery.trim()) {
        setSearchResults([])
        return
      }

      setIsLoading(true)
      try {
        // Intentar buscar desde la API
        const response = await fetch(`/api/posts/search?q=${encodeURIComponent(debouncedSearchQuery)}`, {
          cache: "no-store",
        })

        if (!response.ok) {
          throw new Error(`Error en la búsqueda: ${response.status}`)
        }

        const data = await response.json()
        setSearchResults(data)
      } catch (error) {
        console.error("Error al buscar posts:", error)

        // Fallback: buscar en posts de muestra si la API falla
        // Esto asegura que la búsqueda funcione incluso si la API no está disponible
        const isProd =
          process.env.NEXT_PUBLIC_VERCEL_ENV === "production" || process.env.NEXT_PUBLIC_ENVIRONMENT === "production"

        if (!isProd) {
          // Simular búsqueda en posts de muestra (solo en desarrollo)
          const samplePosts = [
            {
              id: "sample-1",
              title: "Diseño de interfaces modernas con Tailwind CSS",
              excerpt: "Explorando las mejores prácticas para crear interfaces modernas con Tailwind CSS",
              content: "Tailwind CSS ha revolucionado la forma en que construimos interfaces...",
              created_at: new Date().toISOString(),
            },
            // Otros posts de muestra...
          ]

          const filteredPosts = samplePosts.filter(
            (post) =>
              post.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
              post.excerpt?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
              post.content.toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
          )

          setSearchResults(filteredPosts)
        }
      } finally {
        setIsLoading(false)
      }
    }

    searchPosts()
  }, [debouncedSearchQuery])

  // Efecto para manejar el foco en el input de búsqueda cuando se abre
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  // Función para resaltar coincidencias en el texto
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    return text.replace(regex, '<mark class="bg-yellow-200 text-gray-800">$1</mark>')
  }

  // Función para resaltar coincidencias en el contenido
  const highlightSearchMatch = (content: string, query: string): string => {
    if (!query || !content) return content || ""

    // Eliminar etiquetas HTML para trabajar con texto plano
    const plainText = content.replace(/<[^>]*>/g, " ")
    const lowerContent = plainText.toLowerCase()
    const lowerQuery = query.toLowerCase()
    const matchIndex = lowerContent.indexOf(lowerQuery)

    if (matchIndex === -1) return plainText.substring(0, 100) + "..."

    // Extraer un fragmento de texto alrededor de la coincidencia
    const startIndex = Math.max(0, matchIndex - 30)
    const endIndex = Math.min(plainText.length, matchIndex + query.length + 30)
    let snippet = plainText.substring(startIndex, endIndex)

    // Añadir elipsis si es necesario
    if (startIndex > 0) snippet = "..." + snippet
    if (endIndex < plainText.length) snippet = snippet + "..."

    // Resaltar todas las ocurrencias de la consulta en el fragmento
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    return snippet.replace(regex, '<mark class="bg-yellow-200 text-gray-800 px-0.5 rounded">$1</mark>')
  }

  // Función para navegar a un post
  const navigateToPost = (postId: string | number) => {
    router.push(`/posts/view/${postId}`)
    setIsSearchOpen(false)
    setSearchQuery("")
  }

  // Determine if we should apply the frosted glass effect (only for work-experience page)
  const isWorkExperience = pathname === "/work-experience"

  // Determine background style based on page and props
  let headerStyle = "bg-white/30 backdrop-blur-md" // Apply translucent properties to all headers

  if (transparent) {
    // For transparent headers, keep them transparent but add backdrop blur
    headerStyle = "bg-transparent backdrop-blur-md"
  }

  // Add any additional classes from className prop
  if (className) {
    headerStyle += ` ${className}`
  }

  // Effect to update search button position whenever relevant factors change
  useEffect(() => {
    const hasAvatar = React.Children.toArray(children).length > 0
    const avatarIsCurrentlyVisible = hasAvatar && isAvatarVisible

    // When avatar is not visible, position search exactly where avatar would be
    // When avatar is visible, position search to the right of avatar
    const newPosition = avatarIsCurrentlyVisible
      ? isMobile.current
        ? avatarPosition.mobile + 40 // Position to the right of avatar on mobile
        : avatarPosition.desktop + 40 // Position to the right of avatar on desktop
      : isMobile.current
        ? avatarPosition.mobile // Exactly at avatar position on mobile
        : avatarPosition.desktop // Exactly at avatar position on desktop

    setSearchButtonLeft(newPosition)
  }, [children, avatarPosition, isAvatarVisible, pathname])

  // Reset search button position when navigating between pages
  useEffect(() => {
    const hasAvatar = React.Children.toArray(children).length > 0
    const avatarIsCurrentlyVisible = hasAvatar && isAvatarVisible

    const newPosition = avatarIsCurrentlyVisible
      ? isMobile.current
        ? avatarPosition.mobile + 40
        : avatarPosition.desktop + 40
      : isMobile.current
        ? avatarPosition.mobile
        : avatarPosition.desktop

    setSearchButtonLeft(newPosition)
  }, [pathname, isAvatarVisible])

  const handleSearchToggle = () => {
    const newIsSearchOpen = !isSearchOpen
    setIsSearchOpen(newIsSearchOpen)

    // Recalculate position when closing search
    if (!newIsSearchOpen) {
      const hasAvatar = React.Children.toArray(children).length > 0
      const avatarIsCurrentlyVisible = hasAvatar && isAvatarVisible

      // When avatar is not visible, position search exactly where avatar would be
      const newPosition = avatarIsCurrentlyVisible
        ? isMobile.current
          ? avatarPosition.mobile + 40
          : avatarPosition.desktop + 40
        : isMobile.current
          ? avatarPosition.mobile
          : avatarPosition.desktop

      setSearchButtonLeft(newPosition)
    }
  }

  return (
    <div
      className={`${staticMode ? "relative" : "fixed top-0 left-0 right-0 z-50"} h-[40px] ${headerStyle} transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      } rounded-[40px] 
        mx-0 sm:mx-4 md:mx-16 lg:mx-16 xl:mx-24 2xl:mx-[216px]`}
      style={{
        borderBottom: "1px solid rgba(0, 94, 182, 0.1)",
        borderRadius: "6px",
        marginTop: "70px",
      }}
    >
      <div className="flex-1 flex items-center justify-between relative custom-header-padding glass-bg">
        {/* Avatar fijo a la izquierda */}
        <div style={{ position: "absolute", left: "0px", top: "50%", transform: "translateY(-50%)", paddingLeft: "8px" }}>
          <img
            alt="Mario Verdú"
            width={28}
            height={28}
            className="h-[28px] w-[28px] object-cover rounded-full opacity-100"
            src="https://assets.marioverdu.com/avatar/avatar-2.webp"
          />
        </div>

        {/* Barra de búsqueda a ancho completo cuando está abierta */}
        {isSearchOpen && pathname === "/posts" && (
          <div className="absolute inset-x-4 md:inset-x-[60px] top-1/2 transform -translate-y-1/2 flex items-center bg-white rounded-full border border-gray-200 overflow-hidden z-20">
            <div className="pl-3 pr-1">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Escribe para buscar..."
              className="py-1 pr-3 text-sm focus:outline-none flex-1 bg-transparent h-[28px]"
              autoFocus
            />
            <button
              onClick={() => {
                setIsSearchOpen(false)
                setSearchQuery("")
                setSearchResults([])
              }}
              className="p-1 text-gray-400 hover:text-gray-600 mr-2"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Children para elementos dinámicos (avatar, botón de búsqueda, etc.) */}
        {children}

        {/* Botón de búsqueda que se adapta según la presencia del avatar */}
        <div
          className="absolute flex items-center transition-all duration-500 ease-in-out"
          style={{
            left: `${searchButtonLeft}px`,
            opacity: 1,
            transform: isAvatarVisible ? "translateX(0)" : "translateX(0)", // Ensures smooth transition
          }}
        >
          {!isSearchOpen && pathname === "/posts" && (
            <button
              onClick={handleSearchToggle}
              className="flex items-center justify-center h-[28px] w-[28px] transition-all duration-300 hover:bg-gray-100 rounded-full"
              aria-label="Buscar posts"
              data-avatar-visible={isAvatarVisible ? "true" : "false"} // Add data attribute for styling
            >
              <Search className="h-4 w-4 text-gray-500 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Centered tabs */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <HeaderTabs pathname={pathname} />
        </div>

        {/* Resultados de búsqueda */}
        {isSearchOpen && pathname === "/posts" && searchResults.length > 0 && (
          <div
            ref={searchContainerRef}
            className="absolute top-[40px] left-4 right-4 md:left-[60px] md:right-[60px] bg-white rounded-lg shadow-xl z-50 max-h-[350px] overflow-y-auto search-results border border-gray-100"
            style={{
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(8px)",
            }}
          >
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">Buscando...</div>
            ) : searchQuery && searchResults.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No se encontraron resultados</div>
            ) : (
              <div>
                {searchResults.map((post) => (
                  <a
                    key={post.id}
                    href={`/posts/view/${post.id}`}
                    className="flex flex-col p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer search-result-item transition-colors duration-150 ease-in-out"
                    data-post-id={post.id}
                    onClick={(e) => {
                      // Permitir comportamiento normal para nueva pestaña
                      if (e.ctrlKey || e.metaKey) return

                      // Navegación manual para mayor confiabilidad
                      e.preventDefault()
                      navigateToPost(post.id)
                    }}
                  >
                    <div className="font-medium text-gray-800 mb-0.5 line-clamp-1">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightMatch(post.title, searchQuery),
                        }}
                      />
                    </div>
                    {post.excerpt && (
                      <div className="text-sm text-gray-600 mb-1 line-clamp-1">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: highlightMatch(post.excerpt, searchQuery),
                          }}
                        />
                      </div>
                    )}
                    {searchQuery && post.content && post.content.toLowerCase().includes(searchQuery.toLowerCase()) && (
                      <div className="mt-1 text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-100 line-clamp-2">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: highlightSearchMatch(post.content, searchQuery),
                          }}
                        />
                      </div>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Add this useEffect after the other useEffect hooks
export function HeaderWithSearch(props: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        event.target &&
        typeof (event.target as Element).closest === 'function' &&
        !(event.target as Element).closest('button[aria-label="Buscar posts"]')
      ) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return <Header {...props} />
}
