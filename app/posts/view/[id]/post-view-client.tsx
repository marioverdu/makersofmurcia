"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/ui/header"
import { useParams, useRouter } from "next/navigation"
import type { Post } from "@/lib/posts-db"
import Link from "next/link"
import PostSEO from "@/components/seo/post-seo"

export default function PostViewClient() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isAvatarInHeader, setIsAvatarInHeader] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 150
      setIsAvatarInHeader(window.scrollY > scrollThreshold)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/posts/${id}`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
        })

        if (!response.ok) {
          throw new Error(`No se pudo cargar el post (Status: ${response.status})`)
        }

        const data = await response.json()
        if (!data || typeof data !== "object") {
          throw new Error("Datos de post inválidos recibidos del API")
        }

        setPost(data)
      } catch (err) {
        setError(
          `No se pudo cargar el post. ${err instanceof Error ? err.message : "Por favor, inténtalo de nuevo más tarde."}`,
        )
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchPost()
    }
  }, [id])

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
  }

  const markdownToHtml = (markdown: string) => {
    let html = markdown
    html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 my-4 italic text-gray-600">$1</blockquote>')
    html = html.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold my-4">$1</h1>')
    html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold my-4">$2</h2>')
    html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold my-4">$3</h3>')
    html = html.replace(/^---$/gm, '<hr class="my-8 border-gray-300" />')
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')
    html = html.replace(/\n/g, '<br />')
    return html
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F8FC]">
        <Header className="bg-[#F7F8FC]" isAvatarInHeader={isAvatarInHeader}>
          <div className="flex items-center absolute left-4">
            {isAvatarInHeader && (
              <Link href="/" className="h-[28px] w-[28px] overflow-hidden rounded-full transition-all duration-300 ease-in-out">
                <img src="https://assets.marioverdu.com/avatar/avatar-2.webp" alt="Avatar" width={28} height={28} className="h-full w-full object-cover" />
              </Link>
            )}
          </div>
        </Header>
        <div className="pt-[140px] w-full px-4 sm:w-[83.33%] sm:px-0 max-w-[1000px] mx-auto flex flex-col items-center">
          <div className="bg-[rgba(203,219,227,0.1)] border border-[rgba(0,94,182,0.1)] rounded-[12px] shadow-md w-full md:w-[658px] xl:w-[800px] mb-8 block">
            <article className="pt-6 px-4 pb-4 overflow-hidden min-h-[300px]">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
                <div className="h-40 bg-gray-200 rounded w-full"></div>
                <div className="flex justify-between">
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#F7F8FC]">
        <Header className="bg-[#F7F8FC]" isAvatarInHeader={isAvatarInHeader}>
          <div className="flex items-center absolute left-4">
            {isAvatarInHeader && (
              <Link href="/" className="h-[28px] w-[28px] overflow-hidden rounded-full transition-all duration-300 ease-in-out">
                <img src="https://assets.marioverdu.com/avatar/avatar-2.webp" alt="Avatar" width={28} height={28} className="h-full w-full object-cover" />
              </Link>
            )}
          </div>
        </Header>
        <div className="pt-[140px] w-full px-4 sm:w-[83.33%] sm:px-0 max-w-[1000px] mx-auto flex flex-col items-center">
          <div className="bg-[rgba(203,219,227,0.1)] border border-[rgba(0,94,182,0.1)] rounded-[12px] shadow-md w-full md:w-[658px] xl:w-[800px] mb-8 block">
            <article className="pt-6 px-4 pb-4 overflow-hidden">
              <h2 className="text-xl font-semibold text-left mb-2">Error</h2>
              <p className="text-gray-600 text-left mb-4">{error || "No se pudo cargar el post"}</p>
              <div className="p-3 bg-gray-100 rounded-md text-sm">
                <p className="font-medium">Información de depuración:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>ID solicitado: {id}</li>
                  <li>Tipo de ID: {typeof id}</li>
                  <li>URL actual: {typeof window !== "undefined" ? window.location.href : "N/A"}</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </div>
    )
  }

  const renderPostContent = () => {
    if (!post || !post.content) return null
    if (post.content.includes('<div') || post.content.includes('<pre')) {
      return (
        <div className="my-4 prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      )
    }
    return (
      <div className="my-4 prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }} />
      </div>
    )
  }

  return (
    <>
      {post && <PostSEO post={post} />}
      <div className="min-h-screen bg-[#F7F8FC]">
        <Header className="bg-[#F7F8FC]" isAvatarInHeader={isAvatarInHeader}>
          <div className="flex items-center absolute left-4">
            {isAvatarInHeader && (
              <Link href="/" className="h-[28px] w-[28px] overflow-hidden rounded-full transition-all duration-300 ease-in-out">
                <img src="https://assets.marioverdu.com/avatar/avatar-2.webp" alt="Avatar" width={28} height={28} className="h-full w-full object-cover" />
              </Link>
            )}
          </div>
        </Header>
        <div className="pt-[140px] w-full px-4 sm:w-[83.33%] sm:px-0 max-w-[1000px] mx-auto flex flex-col items-center">
          <div className="bg-[rgba(203,219,227,0.1)] border border-[rgba(0,94,182,0.1)] rounded-[12px] shadow-md w-full md:w-[658px] xl:w-[800px] mb-8 block">
            <article className="pt-6 px-4 pb-4 overflow-hidden">
              <h2 className="text-xl font-semibold text-left mb-2">{post.title}</h2>
              {post.excerpt && <p className="text-gray-600 text-left mb-4">{post.excerpt}</p>}
              {renderPostContent()}
              <div className="mt-4 flex items-center justify-between">
                <time dateTime={post.created_at} className="block text-sm text-gray-500 underline decoration-gray-300">
                  {formatDate(post.created_at)}
                </time>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  {post.author && <span>Por {post.author}</span>}
                  {post.views > 0 && <span>{post.views} vistas</span>}
                  {post.category && <span className="bg-gray-100 px-2 py-1 rounded text-xs">{post.category}</span>}
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  )
}
