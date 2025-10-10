import { Metadata } from "next"
import { seoEngine, seoConfigs } from "@/lib/seo-engine"
import PostsPageClient from "./posts-page-client"
import { getDictionary } from "@/lib/get-dictionary"
import type { Locale } from "@/types/i18n"
import { RouteGuard } from "@/lib/route-guard"

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  
  return seoEngine.generateMetadata({
    ...seoConfigs.posts,
    title: dict.posts.title,
    description: dict.posts.subtitle,
  })
}

export default async function PostsPage({ params }: PageProps) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  
  return (
    <RouteGuard params={params} routePath="/[lang]/posts" fallbackStrategy="allow">
      <PostsPageClient lang={lang} dict={dict} />
    </RouteGuard>
  )
}
