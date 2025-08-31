"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { HeaderTabs } from "@/components/ui/header/tabs"
import ChatTuentiButtonMaster from "@/components/chat-tuenti/chat-tuenti-button-master"
import ChatTuentiMaster from "@/components/chat-tuenti/chat-tuenti-master"
import type { Locale, Dictionary } from "@/types/i18n"
import { UnifiedLoading } from "@/components/ui/unified-loading"
import { PrimaryButton } from "@/components/ui/primary-button"

interface CMSDetailProps {
  lang: Locale
  dict: Dictionary
  postId: string
}

export default function CMSDetail({ lang, dict, postId }: CMSDetailProps) {
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}`)
        if (!response.ok) {
          throw new Error('Post no encontrado')
        }
        const data = await response.json()
        setPost(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [postId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <UnifiedLoading />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {error || 'Post no encontrado'}
          </h1>
          <PrimaryButton
            onClick={() => router.back()}
            size="md"
          >
            Volver
          </PrimaryButton>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-[rgba(203,219,227,0.1)] border border-[rgba(0,94,182,0.1)] rounded-[12px] shadow-md w-full md:w-[658px] xl:w-[800px] mb-8 block mx-auto">
          <article className="pt-6 px-4 pb-4 overflow-hidden">
            <h1 className="text-2xl font-semibold text-left mb-2">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-gray-600 text-left mb-4">{post.excerpt}</p>
            )}

            <div className="my-4 prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <time
                dateTime={post.created_at}
                className="block text-sm text-gray-500 underline decoration-gray-300"
              >
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </time>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Por Mario Verdú</span>
              </div>
            </div>
          </article>
        </div>
      </div>

      <ChatTuentiButtonMaster />
      <ChatTuentiMaster />
    </div>
  )
}
