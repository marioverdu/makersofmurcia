import { Metadata } from "next"
import { seoEngine, seoConfigs } from "@/lib/seo-engine"
import PostViewClient from "./post-view-client"
import { getDictionary } from "@/lib/get-dictionary"
import { getPostById } from "@/lib/posts-db"
import type { Locale } from "@/types/i18n"

interface PageProps {
  params: { lang: Locale; id: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const dict = await getDictionary(params.lang)
  const idNum = Number(params.id)
  const post = Number.isFinite(idNum) ? await getPostById(idNum) : null
  
  if (!post) {
    return seoEngine.generateMetadata({
      ...seoConfigs.posts,
      title: `${dict.posts.title} - ${params.id}`,
      description: dict.posts.subtitle,
      url: `https://marioverdu.com/${params.lang}/posts/view/${params.id}`,
      canonical: `/${params.lang}/posts/view/${params.id}`,
      type: "article",
    })
  }

  // Crear descripción desde excerpt o contenido
  const description = post.excerpt || 
    (post.content ? post.content.replace(/<[^>]*>/g, '').slice(0, 160) + '...' : dict.posts.subtitle)

  return seoEngine.generateMetadata({
    title: post.title,
    description: description,
    url: `https://marioverdu.com/${params.lang}/posts/view/${post.id}`,
    canonical: `/${params.lang}/posts/view/${post.id}`,
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
    locale: params.lang === 'es' ? 'es_ES' : 'en_US',
    alternates: {
      'es': `https://marioverdu.com/es/posts/view/${post.id}`,
      'en': `https://marioverdu.com/en/posts/view/${post.id}`,
      'x-default': `https://marioverdu.com/es/posts/view/${post.id}`,
    },
  })
}

export default async function PostViewPage({ params: { lang, id } }: PageProps) {
  const dict = await getDictionary(lang)
  
  return <PostViewClient lang={lang} dict={dict} postId={id} />
}

