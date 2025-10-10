import { Metadata } from "next"
import { seoEngine, seoConfigs } from "@/lib/seo-engine"
import PostViewClient from "./post-view-client"
import { getDictionary } from "@/lib/get-dictionary"
import { getPostById } from "@/lib/posts-db"
import type { Locale } from "@/types/i18n"
import { RouteGuard } from "@/lib/route-guard"

interface PageProps {
  params: Promise<{ lang: Locale; id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, id } = await params
  const dict = await getDictionary(lang)
  const idNum = Number(id)
  const post = Number.isFinite(idNum) ? await getPostById(idNum) : null
  
  if (!post) {
    return seoEngine.generateMetadata({
      ...seoConfigs.posts,
      title: `${dict.posts.title} - ${id}`,
      description: dict.posts.subtitle,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://marioverdu.com'}/${lang}/posts/view/${id}`,
      canonical: `/${lang}/posts/view/${id}`,
      type: "article",
    })
  }

  // Crear descripción desde excerpt o contenido
  const description = post.excerpt || 
    (post.content ? post.content.replace(/<[^>]*>/g, '').slice(0, 160) + '...' : dict.posts.subtitle)

  return seoEngine.generateMetadata({
    title: post.title,
    description: description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://marioverdu.com'}/${lang}/posts/view/${post.id}`,
    canonical: `/${lang}/posts/view/${post.id}`,
    type: "article",
    image: post.featured_image ? {
      url: post.featured_image,
      width: 1200,
      height: 630,
      alt: post.title
    } : undefined,
    publishedTime: post.created_at,
    modifiedTime: post.updated_at,
    tags: post.tags,
    section: post.category,
    locale: lang === 'es' ? 'es_ES' : 'en_US',
    alternates: {
      'es': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://marioverdu.com'}/es/posts/view/${post.id}`,
      'en': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://marioverdu.com'}/en/posts/view/${post.id}`,
      'x-default': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://marioverdu.com'}/es/posts/view/${post.id}`,
    },
  })
}

export default async function PostViewPage({ params }: PageProps) {
  const { lang, id } = await params
  const dict = await getDictionary(lang)
  
  return (
    <RouteGuard params={params} routePath="/[lang]/posts/view/[id]" fallbackStrategy="allow">
      <PostViewClient lang={lang} dict={dict} postId={id} />
    </RouteGuard>
  )
}
