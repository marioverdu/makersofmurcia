"use client"

import type React from "react"
import { useState, useEffect, useRef, useMemo } from "react"
import { Trophy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PortfolioCard } from "@/components/portfolio-card"
import { HeaderTabs } from "@/components/ui/header/tabs"
import { HeaderContextualMenu } from "@/components/ui/header/header-contextual-menu"
import ChatTuentiButtonMaster from "@/components/chat-tuenti/chat-tuenti-button-master"
import ChatTuentiMaster from "@/components/chat-tuenti/chat-tuenti-master"
import { UnifiedLoading } from "@/components/ui/unified-loading"
import type { Locale, Dictionary } from "@/types/i18n"
import { usePathname } from "next/navigation"

// HeaderV2: Header transparente con paddings laterales turquesa según breakpoint
function HeaderV2({ isAvatarInHeader, lang }: { isAvatarInHeader: boolean; lang: Locale }) {
  return (
    <div
      style={{
        width: '100%',
        height: '40px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'none',
        zIndex: 1000,
      }}
    >
      <div className="h-full flex" style={{ marginTop: '16px' }}>
        {/* Padding izquierdo transparente */}
        <div className="bg-transparent header-blue-padding" />
        {/* Contenido principal: avatar a la izquierda y tabs centradas */}
        <div className="flex-1 flex items-center justify-between relative custom-header-padding glass-bg">
          {/* Avatar alineado exactamente al borde izquierdo, con transición y aparición como en la home */}
          <div
            style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', paddingLeft: 8 }}
          >
            <img
              alt="Mario Verdú"
              width={28}
              height={28}
              className={`h-[28px] w-[28px] object-cover rounded-full ${isAvatarInHeader ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              src="https://assets.marioverdu.com/avatar/avatar-2.webp"
            />
          </div>
          {/* Tabs centradas absolutamente */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <HeaderTabs className="mx-auto md:mx-0 justify-center md:justify-start" />
          </div>
          {/* Selector de idioma al extremo derecho */}
          <div 
            className="language-container"
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              paddingRight: '8px',
              width: '44px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            <HeaderContextualMenu currentLang={lang} hidden={true} />
          </div>
        </div>
        {/* Padding derecho transparente */}
        <div className="bg-transparent header-blue-padding" />
      </div>
      <style jsx>{`
        @media (min-width: 480px) {
          .bg-cyan-400 {
            width: 32px !important;
            background: transparent !important;
          }
        }
        @media (min-width: 768px) {
          .bg-cyan-400 {
            width: 32px !important;
            background: transparent !important;
          }
        }
        @media (min-width: 1024px) {
          .bg-cyan-400 {
            width: 32px !important;
            background: transparent !important;
          }
        }
        @media (min-width: 1280px) {
          .bg-cyan-400 {
            width: 32px !important;
            background: transparent !important;
          }
        }
        @media (min-width: 1536px) {
          .bg-cyan-400 {
            width: 32px !important;
            background: transparent !important;
          }
        }
        .custom-header-padding {
          position: relative;
          padding-left: 0px;
          padding-right: 0px;
        }
        .glass-bg {
          background: rgba(255,255,255,0.3);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 12px;
          border: 1px solid rgba(0, 94, 182, 0.1);
        }
        .header-blue-padding {
          width: 12px;
        }
        @media (min-width: 480px) {
          .header-blue-padding {
            width: 32px;
          }
        }
        @media (min-width: 768px) {
          .header-blue-padding {
            width: 32px;
          }
        }
        @media (min-width: 1024px) {
          .header-blue-padding {
            width: 32px;
          }
        }
        @media (min-width: 1280px) {
          .header-blue-padding {
            width: 32px;
          }
        }
        @media (min-width: 1536px) {
          .header-blue-padding {
            width: 32px;
          }
        }
      `}</style>
    </div>
  )
}

export interface Post {
  id: number | string
  title: string
  content: string
  excerpt?: string
  coverImage?: string
  featured_image?: string
  date?: string
  created_at: string
  updated_at?: string
  published?: boolean
  slug?: string
  contentType?: string
  environment?: "production" | "development" | "all"
  tags?: string[]
  // Campos adicionales de la base de datos
  author?: string
  views?: number
  status?: 'published' | 'draft' | 'scheduled'
  category?: string
}

interface PostsPageClientProps {
  lang: Locale
  dict: Dictionary
}

export default function PostsPageClient({ lang, dict }: PostsPageClientProps) {
  const router = useRouter()
  const [checkingVisibility, setCheckingVisibility] = useState(false)
  const [maintenance, setMaintenance] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [showTooltip, setShowTooltip] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<"posts" | "about">(
    "posts",
  )
  const [avatarClickCount, setAvatarClickCount] = useState(0)
  const [showMusicTab, setShowMusicTab] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const [showTrophyToast, setShowTrophyToast] = useState(false)

  // Header state
  const [isAvatarInHeader, setIsAvatarInHeader] = useState(false)

  // Determinar si estamos en producción
  const [isProduction, setIsProduction] = useState(false)

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false)

  // Estado y lógica para el chat Tuenti
  const [isChatOpen, setIsChatOpen] = useState(false);
  const toggleChat = () => setIsChatOpen((prev) => !prev);

  // Efecto para detectar el entorno
  useEffect(() => {
    const isProd =
      process.env.NEXT_PUBLIC_VERCEL_ENV === "production" || process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
    setIsProduction(isProd)
    console.log("Entorno detectado:", isProd ? "PRODUCCIÓN" : "DESARROLLO")
    console.log("NEXT_PUBLIC_VERCEL_ENV:", process.env.NEXT_PUBLIC_VERCEL_ENV)
    console.log("NEXT_PUBLIC_ENVIRONMENT:", process.env.NEXT_PUBLIC_ENVIRONMENT)
  }, [])

  // Function to load posts
  const loadPosts = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Check if we're in lite environment (v0 preview)
      const isLiteEnvironment =
        typeof window !== "undefined" &&
        (window.location.hostname.includes("vusercontent.net") || window.location.hostname.includes("v0.dev"))

      // In preview environment, don't even try to load posts from API
      if (isLiteEnvironment) {
        console.log("Preview environment detected, using fallback posts")
        setPosts([]) // Empty array as fallback
        setIsLoading(false)
        return
      }

      // In development or production, try to load from API
      console.log("Trying to load posts from API...")

      try {
        const response = await fetch(`/api/posts?lang=${lang}`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
        })

        console.log("Response status:", response.status)
        console.log("Content-Type:", response.headers.get("Content-Type"))

        // Check if the response is HTML instead of JSON (common error)
        const contentType = response.headers.get("Content-Type") || ""

        if (contentType.includes("text/html")) {
          console.warn("API returned HTML instead of JSON. Using empty posts as fallback.")
          setPosts([])
        } else if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`)
        } else {
          // Parse JSON response
          const data = await response.json()
          console.log(`Posts loaded: ${data.length}`)
          setPosts(data)
        }
      } catch (err) {
        console.error("Error fetching posts:", err)
        setError(`Error loading posts: ${err instanceof Error ? err.message : String(err)}`)

        // Always use empty posts as fallback
        console.warn("Using empty posts as fallback due to API error.")
        setPosts([])
      }
    } catch (err) {
      console.error("Unexpected error:", err)
      setError(`Unexpected error: ${err instanceof Error ? err.message : String(err)}`)
      setPosts([])
    } finally {
      setIsLoading(false)
    }
  }

  // Set hydrated immediately after mount
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Load posts on component mount
  useEffect(() => {
    loadPosts()
  }, [])

  // Check mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle scroll for avatar in header
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const avatarThreshold = 100
      setIsAvatarInHeader(scrollY > avatarThreshold)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Check visibility
  useEffect(() => {
    const checkVisibility = async () => {
      console.log(`🔄 [${isProduction ? "PROD" : "DEV"}] PostsPage: Checking route visibility...`)

      let visibility: { [key: string]: boolean } = {}

      // En development, primero intentar localStorage
      if (!isProduction && typeof window !== "undefined") {
        const localVisibilityRaw = localStorage.getItem("routesVisibility")
        if (localVisibilityRaw) {
          try {
            visibility = JSON.parse(localVisibilityRaw)
            console.log(`📱 [DEV] PostsPage: Using localStorage visibility:`, visibility)
          } catch (error) {
            console.warn(`⚠️ [DEV] PostsPage: localStorage parse error:`, error)
            visibility = {}
          }
        }
      }

      // Si no hay localStorage o estamos en production, consultar la API
      if (Object.keys(visibility).length === 0) {
        try {
          console.log(`🌐 [${isProduction ? "PROD" : "DEV"}] PostsPage: Fetching from API...`)
          const res = await fetch("/api/admin/routes")
          const data = await res.json()
          if (data && data.data && data.data.routes) {
            data.data.routes.forEach((route: any) => {
              visibility[route.path] = route.isVisible
            })
            console.log(`✅ [${isProduction ? "PROD" : "DEV"}] PostsPage: API visibility loaded:`, visibility)
          }
        } catch (error) {
          console.error(`❌ [${isProduction ? "PROD" : "DEV"}] PostsPage: API error:`, error)
          // Si falla la API, asume todo visible
          visibility = { "/": true, "/work-experience": true, "/posts": true }
        }
      }

      // Lógica de redirección y mantenimiento
      const priorities = ["/", "/work-experience", "/posts"]
      const current = "/posts"

      if (visibility[current] === false) {
        console.log(`🚫 [${isProduction ? "PROD" : "DEV"}] PostsPage: Current route is hidden, finding alternative...`)

        // Buscar la siguiente ruta prioritaria activa
        const next = priorities.find((r) => r !== current && visibility[r])
        if (next) {
          console.log(`🔄 [${isProduction ? "PROD" : "DEV"}] PostsPage: Redirecting to ${next}`)
          router.replace(`/${lang}${next}`)
          return
        } else {
          console.log(`🚧 [${isProduction ? "PROD" : "DEV"}] PostsPage: No active routes, showing maintenance`)
          setMaintenance(true)
        }
      } else {
        console.log(`✅ [${isProduction ? "PROD" : "DEV"}] PostsPage: Route is visible, proceeding`)
      }
    }

    checkVisibility()
  }, [isProduction, router, lang])

  // Filter posts based on selected category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "posts") {
      return posts.filter(post => post.category !== "about")
    } else if (selectedCategory === "about") {
      return posts.filter(post => post.category === "about")
    }
    return posts
  }, [posts, selectedCategory])

  // About tab post
  const aboutTabPost = useMemo(() => {
    return posts.find(post => post.category === "about") || {
      id: "about",
      title: dict.posts.aboutMe,
      content: lang === 'es' ? 
        `<p>Soy Mario Verdú, Frontend Developer (Next.js / React) con más de 6 años de experiencia en Diseño de productos digitales.</p>
        <p>Diseño, valido, itero y prototipo productos diferenciales siempre comprometido con el desarrollo de sistemas de diseño limpios, vibrantes y funcionales 🌱</p>
        <p>Trabajo con equipos que entienden la comunicación como una experiencia transversal que impacta en todos los recovecos del negocio 🚀</p>
        <p><a href="mailto:contact@marioverdu.com" class="text-primary hover:underline font-medium">¿Hablamos?</a></p>` : 
        `<p>I'm Mario Verdú, Frontend Developer (Next.js / React) with more than 6 years of experience in Digital Product Design.</p>
        <p>I design, validate, iterate and prototype differential products always committed to developing clean, vibrant and functional design systems 🌱</p>
        <p>I work with teams that understand communication as a transversal experience that impacts every corner of the business 🚀</p>
        <p><a href="mailto:contact@marioverdu.com" class="text-primary hover:underline font-medium">Let's talk?</a></p>`,
      excerpt: "",
      created_at: new Date().toISOString()
    }
  }, [posts, lang, dict.posts.aboutMe])

  // Format date function
  function formatDate(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Handle avatar click
  const handleAvatarClick = () => {
    setAvatarClickCount(prev => prev + 1)
    if (avatarClickCount + 1 >= 3) {
      setShowMusicTab(true)
      setShowTrophyToast(true)
      setTimeout(() => setShowTrophyToast(false), 3000)
    }
  }

  // Handle triple click
  const handleTripleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setClickCount(prev => prev + 1)
    if (clickCount + 1 >= 3) {
      setShowTooltip(true)
      setTimeout(() => setShowTooltip(false), 2000)
    }
  }



    if (maintenance) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F7F8FC]">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {dict.posts.pageUnderMaintenance}
          </h1>
          <p className="text-gray-600">
            {dict.posts.maintenanceMessage}
          </p>
        </div>
      </div>
    )
  }

  // Show loading while not hydrated
  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F7F8FC]">
        <UnifiedLoading />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F8FC]">
      {/* Header */}
      <HeaderV2 isAvatarInHeader={isAvatarInHeader} lang={lang} />

      {/* Profile Card */}
      <div className="relative h-[204px] w-full" style={{ marginTop: '56px' }}>
        {/* Fondo sólido */}
        <div className="absolute h-full w-full">
          <div className="h-[204px] w-full"></div>
        </div>

        {/* Contenido del header */}
        <div className="absolute left-1/2 -bottom-[120px] z-10 w-[300px] -translate-x-1/2 rounded-[10px] p-5 text-center">
          <div
            className="relative mx-auto mb-[10px] h-[80px] w-[80px] overflow-hidden rounded-full transition-opacity duration-300 opacity-100 cursor-pointer"
            onClick={(e) => {
              handleAvatarClick()
              handleTripleClick(e)
            }}
          >
            <img
              src="https://assets.marioverdu.com/avatar/avatar-2.webp"
              alt="Avatar"
              width={80}
              height={80}
              className="h-full w-full object-cover"
            />
            {showTooltip && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg text-sm font-medium z-10 whitespace-nowrap after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-white dark:after:border-t-gray-800">
                {dict.posts.hey}
              </div>
            )}
          </div>

          <h2 className="text-base font-medium text-[hsl(var(--color-text))]">Mario Verdú</h2>

          <div 
            className="text-sm font-normal text-gray-500 mb-6 text-center mx-auto" 
            style={{ 
              width: '200px'
            }}
          >
            <div>Frontend Developer</div>
            <div>(Next.js / React)</div>
          </div>

          <div className="flex justify-center">
            <div className="w-full">
              <div className="flex space-x-4 justify-center">
                <button
                  className={`text-[#333] ${selectedCategory === "posts" ? "" : "opacity-50"}`}
                  onClick={() => setSelectedCategory("posts")}
                >
                  {dict.posts.posts}
                </button>
                <button
                  className={`text-[#333] ${selectedCategory === "about" ? "" : "opacity-50"}`}
                  onClick={() => setSelectedCategory("about")}
                >
                  {dict.posts.aboutMe}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts section with adjusted margin to account for profile card */}
      <div className="pt-[140px] pb-[72px] w-full px-4 sm:w-[83.33%] sm:px-0 max-w-[1000px] mx-auto flex flex-col items-center gap-6">
        {isLoading ? (
          <div
            className="bg-white/30 backdrop-blur-md border border-gray-100 rounded-lg shadow-sm w-full md:w-[658px] xl:w-[800px] p-6 flex flex-col items-center justify-center"
            style={{ borderBottom: "1px solid rgba(0, 94, 182, 0.1)" }}
          >
            <UnifiedLoading />
          </div>
        ) : error && selectedCategory === "posts" && filteredPosts.length === 0 ? (
          <div
            className="bg-white/30 backdrop-blur-md border border-gray-100 rounded-lg shadow-sm w-full md:w-[658px] xl:w-[800px] p-6 flex flex-col items-center justify-center"
            style={{ borderBottom: "1px solid rgba(0, 94, 182, 0.1)" }}
          >
            {!isProduction ? (
              <>
                <p className="text-blue-500 mb-2">
                  {dict.posts.developmentMode}
                </p>
                <p className="text-gray-500 mb-4">
                  {dict.posts.productionInfo}
                </p>
              </>
            ) : (
              <>
                <p className="text-amber-600 mb-2">
                  {dict.posts.notice} {error}
                </p>
                <p className="text-gray-500 mb-4">
                  {dict.posts.samplePostsInfo}
                </p>
              </>
            )}
          </div>
        ) : selectedCategory === "about" ? (
          // Mostrar el post específico de About cuando se selecciona esa categoría
          <div
            key={aboutTabPost.id}
            className="bg-white/30 backdrop-blur-md border border-gray-100 rounded-lg shadow-sm w-full md:w-[658px] xl:w-[800px] mb-0"
            style={{ borderBottom: "1px solid rgba(0, 94, 182, 0.1)" }}
          >
            <article className="pt-6 px-4 pb-6 overflow-hidden">
              <h2 className="text-xl text-left mb-2 font-['Arial_Medium',_Arial,_sans-serif] font-normal">
                {aboutTabPost.title}
              </h2>
              {aboutTabPost.excerpt && <p className="text-gray-600 text-left mb-4">{aboutTabPost.excerpt}</p>}
              <div className="my-4 prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: aboutTabPost.content.replace(/\n/g, "<br />") }} />
              </div>
              <time
                dateTime={aboutTabPost.created_at}
                className="block text-sm text-gray-500 mt-4 underline decoration-gray-300"
              >
                {formatDate(aboutTabPost.created_at)}
              </time>
            </article>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div
            className="bg-white/30 backdrop-blur-md border border-gray-100 rounded-lg shadow-sm w-full md:w-[658px] xl:w-[800px] p-6 flex flex-col items-center justify-center"
            style={{ borderBottom: "1px solid rgba(0, 94, 182, 0.1)" }}
          >
            <p className="text-gray-500">{dict.posts.noPosts}</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <Link
              href={`/${lang}/posts/view/${post.id}`}
              key={post.id}
              className="bg-white/30 backdrop-blur-md border border-gray-100 rounded-lg shadow-sm w-full md:w-[658px] xl:w-[800px] mb-0 block hover:outline hover:outline-2 hover:outline-[#3D5B6A] hover:outline-offset-8 transition-all duration-300 ease-out"
              style={{ borderBottom: "1px solid rgba(0, 94, 182, 0.1)" }}
            >
              <article className="pt-6 px-4 pb-6 overflow-hidden">
                <h2 className="text-xl text-left mb-2 font-['Arial_Medium',_Arial,_sans-serif] font-normal">
                  {post.title}
                </h2>
                {post.excerpt && <p className="text-gray-600 text-left mb-4">{post.excerpt}</p>}

                <time
                  dateTime={post.created_at}
                  className="block text-sm text-gray-500 mt-4 underline decoration-gray-300"
                >
                  {formatDate(post.created_at)}
                </time>
              </article>
            </Link>
          ))
        )}
      </div>
      {showTrophyToast && (
        <div className="fixed bottom-4 right-4 z-50 bg-[rgba(30,30,30,0.9)] text-white border border-[rgba(255,255,255,0.2)] rounded-lg shadow-lg p-2 max-w-[350px] flex items-center gap-2 h-10 animate-in slide-in-from-bottom-5">
          <div className="bg-yellow-500/20 p-1.5 rounded-full flex items-center justify-center">
            <Trophy className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="font-medium text-sm">
            {dict.posts.musicUnlocked}
          </div>
        </div>
      )}

      {/* Chat Tuenti */}
      <div style={{ width: '100%', height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 32 }}>
        <ChatTuentiButtonMaster isOpen={isChatOpen} onClick={toggleChat} />
      </div>
      <ChatTuentiMaster isOpen={isChatOpen} toggleChat={toggleChat} botName="Mario Verdú" isMobile={isMobile} />
    </div>
  )
}
