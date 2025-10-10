"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import CategoryTabs from "@/components/ui/category-tabs"
import { HeaderTabs } from "@/components/ui/header/tabs"

import ChatTuentiButtonMaster from "@/components/chat-tuenti/chat-tuenti-button-master"
import ChatTuentiMaster from "@/components/chat-tuenti/chat-tuenti-master"
import AdvancedTableV2View from "@/components/advanced-table-v2/AdvancedTableV2View"
import FeaturedImage from "@/components/ui/featured-image"
import { enhanceContentForSEO } from "@/lib/content-enhancer"
import PostSEO from "@/components/seo/post-seo"
import { UnifiedLoading } from "@/components/ui/unified-loading"
import { PrimaryButton } from "@/components/ui/primary-button"
import type { Locale, Dictionary } from "@/types/i18n"

interface PostViewClientProps {
  lang: Locale
  dict: Dictionary
  postId: string
}

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
            <HeaderTabs className="mx-auto md:mx-0 justify-center md:justify-start" lang={lang} />
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
      `}</style>
    </div>
  )
}

export default function PostViewClient({ lang, dict, postId }: PostViewClientProps) {
  const router = useRouter()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pageViews, setPageViews] = useState<number>(0)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isAvatarInHeader, setIsAvatarInHeader] = useState(false)
  const [selectedTab, setSelectedTab] = useState<"posts" | "about">("posts")
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" || process.env.NODE_ENV === "production"
  
  // Nota: La protección de rutas se maneja en el Server Component (page.tsx)

  const toggleChat = () => setIsChatOpen((prev) => !prev)

  // Función para formatear fechas
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/posts/${postId}?lang=${lang}`)
        if (!response.ok) {
          throw new Error('Post not found')
        }
        const data = await response.json()
        setPost(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading post')
      } finally {
        setLoading(false)
      }
    }

    if (postId) {
      fetchPost()
    }
  }, [postId, lang])

  // Obtener contador real de vistas vía engine de analytics
  useEffect(() => {
    const fetchViews = async () => {
      try {
        // page_path debe coincidir con lo que trackea AnalyticsTracker
        const pagePath = `/${lang}/posts/view/${postId}`
        const res = await fetch(`/api/analytics/page-views?page_path=${encodeURIComponent(pagePath)}`)
        if (!res.ok) return
        const data = await res.json()
        if (typeof data?.views === 'number') setPageViews(data.views)
      } catch (_) {
        // Silencioso: no bloquear la UI por métricas
      }
    }

    if (postId) {
      fetchViews()
    }
  }, [postId, lang])

            // Mostrar avatar en header después de scroll
          useEffect(() => {
            const handleScroll = () => {
              setIsAvatarInHeader(window.scrollY > 100)
            }

            window.addEventListener('scroll', handleScroll)
            return () => window.removeEventListener('scroll', handleScroll)
          }, [])

          // En vista pública NO inicializamos funciones globales de edición

  // Show loading while loading post
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F8FC]">
        <HeaderV2 isAvatarInHeader={false} lang={lang} />
        <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <UnifiedLoading />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#F7F8FC]">
        <HeaderV2 isAvatarInHeader={false} lang={lang} />
        <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">{dict.common.error}</h1>
              <p className="text-gray-600">{dict.posts.error}</p>
              <PrimaryButton
                onClick={() => router.push(`/${lang}/posts`)}
                size="md"
              >
                {dict.common.back}
              </PrimaryButton>
            </div>
          </div>
        </div>
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
          <div className="relative mx-auto mb-[10px] h-[80px] w-[80px] overflow-hidden rounded-full transition-opacity duration-300 opacity-100 cursor-pointer">
            <img
              src="https://assets.marioverdu.com/avatar/avatar-2.webp"
              alt="Avatar"
              width={80}
              height={80}
              className="h-full w-full object-cover"
            />
          </div>

          <h2 className="text-base font-medium text-[hsl(var(--color-text))]">Mario Verdú</h2>

          <div 
            className="text-sm font-normal text-gray-500 mb-6 text-center mx-auto" 
            style={{ width: '200px' }}
          >
            <div>Frontend Developer</div>
            <div>(Next.js / React)</div>
          </div>

          <div className="flex justify-center">
            <div className="w-full">
              <CategoryTabs
                selected={(selectedTab === 'posts' ? 'concept' : 'about') as any}
                onChange={(next) => setSelectedTab(next === 'about' ? 'about' : 'posts')}
                onNavigate={(next) => {
                  if (next === 'concept' || next === 'portfolio' || next === 'about') {
                    // Navegar a la página de lista con la pestaña deseada
                    const params = new URLSearchParams({ tab: next }).toString()
                    window.location.href = `/${lang}/posts?${params}`
                  }
                }}
                labels={{ posts: dict.posts.posts, about: dict.posts.aboutMe, portfolio: 'Portfolio' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Post Content with adjusted margin to account for profile card */}
      <div className="pt-[140px] pb-[72px] w-full px-4 sm:w-[83.33%] sm:px-0 max-w-[1000px] mx-auto flex flex-col items-center gap-6">
        {selectedTab === "posts" ? (
          /* Post Card */
          <div className="bg-white/30 backdrop-blur-md border border-gray-100 rounded-lg shadow-sm w-full md:w-[658px] xl:w-[800px] mb-8" style={{ borderBottom: "1px solid rgba(0, 94, 182, 0.1)" }}>
          <article className="pt-6 px-4 pb-4 overflow-hidden">
            {/* Post Header */}
            <div className="mb-6">
              <h1 className="text-2xl text-left mb-3 font-['Arial_Medium',_Arial,_sans-serif] font-normal">
                {post.title}
              </h1>
              
              {/* Post Meta */}
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>{dict.posts.publishedOn} {formatDate(post.created_at)}</span>
                {post.author && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{dict.posts.author}: {post.author}</span>
                  </>
                )}
                {post.category && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{post.category}</span>
                  </>
                )}
              </div>

              {/* Featured Image */}
              {post.featured_image && ((post.contentType || '').toLowerCase() === 'portfolio' || (post.category || '').toLowerCase() === 'portfolio') && (
                <div className="mb-6">
                  <FeaturedImage src={post.featured_image} alt={post.title} />
                </div>
              )}
            </div>

            {/* Post Content */}
            {/* Usar AdvancedTableV2View para renderizar contenido con scrollbar contextual */}
            <AdvancedTableV2View 
              content={enhanceContentForSEO(post.content)} 
              className="prose max-w-none"
            />
            
            {/* SEO adicional para el post */}
            <PostSEO 
              post={post} 
              canonicalUrl={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://marioverdu.com'}/${lang}/posts/view/${postId}`}
              lang={lang}
            />

            {/* Post Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-cyan-100 text-cyan-800 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Views and Updated */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span><span>{pageViews || 0}</span> {dict.posts.views || 'views'}</span>
                <span>{dict.posts.updatedOn || 'Updated'}: {formatDate(post.updated_at)}</span>
              </div>
                         </div>
           </article>
         </div>
        ) : (
          /* About Me Content */
          <div className="bg-white/30 backdrop-blur-md border border-gray-100 rounded-lg shadow-sm w-full md:w-[658px] xl:w-[800px] mb-0" style={{ borderBottom: "1px solid rgba(0, 94, 182, 0.1)" }}>
            <article className="pt-6 px-4 pb-6 overflow-hidden">
              <h2 className="text-xl text-left mb-2 font-['Arial_Medium',_Arial,_sans-serif] font-normal">
                {lang === 'es' ? 'Sobre mi' : 'About me'}
              </h2>
              <div className="my-4 prose max-w-none">
                <div>
                  {lang === 'es' ? (
                    <>
                      <p>Soy Mario Verdú, Frontend Developer (Next.js / React) con más de 6 años de experiencia en Diseño de productos digitales.</p>
                      <br />
                      <p>Diseño, valido, itero y prototipo productos diferenciales siempre comprometido con el desarrollo de sistemas de diseño limpios, vibrantes y funcionales 🌱</p>
                      <br />
                      <p>Trabajo con equipos que entienden la comunicación como una experiencia transversal que impacta en todos los recovecos del negocio 🚀</p>
                      <br />
                      <p><a href="mailto:contact@marioverdu.com" className="text-primary hover:underline font-medium">¿Hablamos?</a></p>
                    </>
                  ) : (
                    <>
                      <p>I am Mario Verdú, Frontend Developer (Next.js / React) with over 6 years of experience in digital product design.</p>
                      <br />
                      <p>I design, validate, iterate, and prototype unique products, always committed to developing clean, vibrant, and functional design systems 🌱</p>
                      <br />
                      <p>I work with teams that understand communication as a cross-cutting experience that impacts every corner of the business 🚀</p>
                      <br />
                      <p><a href="mailto:contact@marioverdu.com" className="text-primary hover:underline font-medium">Shall we talk?</a></p>
                    </>
                  )}
                </div>
              </div>
              <time dateTime="2025-08-30T17:36:12.268Z" className="block text-sm text-gray-500 mt-4 underline decoration-gray-300">
                {lang === 'es' ? '30 de agosto de 2025' : 'August 30, 2025'}
              </time>
            </article>
          </div>
        )}

        {/* Back to Posts Button - Solo visible en pestaña posts */}
        {selectedTab === "posts" && (
          <div className="w-full md:w-[658px] xl:w-[800px] flex justify-center">
            <PrimaryButton
              onClick={() => router.push(`/${lang}/posts`)}
              size="custom"
              className="h-9 text-base px-2"
            >
              ← {dict.common.back} {dict.posts.posts}
            </PrimaryButton>
          </div>
        )}
      </div>

      {/* Chat Tuenti - Usando configuración por defecto */}
      <ChatTuentiButtonMaster 
        isOpen={isChatOpen} 
        onClick={toggleChat}
      />
      <ChatTuentiMaster isOpen={isChatOpen} toggleChat={toggleChat} botName="Mario Verdú" isMobile={false} />
    </div>
  )
}
