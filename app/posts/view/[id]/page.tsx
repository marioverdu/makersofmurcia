import { Metadata } from "next"
import { seoEngine } from "@/lib/seo-engine"
import { getPostById } from "@/lib/posts-db"
import { enhanceContentForSEO } from "@/lib/content-enhancer"
import AdvancedTableV2View from "@/components/advanced-table-v2/AdvancedTableV2View"

interface PageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const idNum = Number(params.id)
  const post = Number.isFinite(idNum) ? await getPostById(idNum) : null

  if (!post) {
    return seoEngine.generateMetadata({
      title: "Post | Mario Verdú",
      description: "Detalle del post",
      url: `https://marioverdu.com/posts/view/${params.id}`,
      canonical: `/posts/view/${params.id}`,
      type: "article",
    })
  }

  return seoEngine.generateMetadata({
    title: post.title,
    description: post.excerpt || (post.content ? post.content.replace(/<[^>]*>/g, "").slice(0, 160) + "..." : ""),
    url: `https://marioverdu.com/posts/view/${post.id}`,
    canonical: `/posts/view/${post.id}`,
    type: "article",
    image: post.featured_image
      ? { url: post.featured_image, width: 1200, height: 630, alt: post.title }
      : undefined,
    publishedTime: post.created_at,
    modifiedTime: post.updated_at,
    tags: post.tags,
    section: post.category,
  })
}

export default async function PostViewPage({ params }: PageProps) {
  const idNum = Number(params.id)
  const post = Number.isFinite(idNum) ? await getPostById(idNum) : null

  if (!post) {
    return (
      <div className="pt-[140px] w-full px-4 sm:w-[83.33%] sm:px-0 max-w-[1000px] mx-auto flex flex-col items-center">
        <div className="bg-[rgba(203,219,227,0.1)] border border-[rgba(0,94,182,0.1)] rounded-[12px] shadow-md w-full md:w-[658px] xl:w-[800px] mb-8 block">
          <article className="pt-6 px-4 pb-4 overflow-hidden">
            <h2 className="text-xl font-semibold text-left mb-2">Error</h2>
            <p className="text-gray-600 text-left mb-4">No se pudo cargar el post</p>
          </article>
        </div>
      </div>
    )
  }

  // Sanitización de tablas avanzadas para vista pública (sin edición)
  // Import diferido para evitar importar en rutas que no lo necesitan
  const { sanitizeAdvancedTableHTML } = await import('@/lib/advanced-table/sanitize')
  const sanitize = (html: string) => sanitizeAdvancedTableHTML(html)

  return (
    <div className="pt-[140px] w-full px-4 sm:w-[83.33%] sm:px-0 max-w-[1000px] mx-auto flex flex-col items-center">
      <div className="bg-[rgba(203,219,227,0.1)] border border-[rgba(0,94,182,0.1)] rounded-[12px] shadow-md w-full md:w-[658px] xl:w-[800px] mb-8 block">
        <article className="pt-6 px-4 pb-4 overflow-hidden">
          <h2 className="text-xl font-semibold text-left mb-2">{post.title}</h2>
          {post.excerpt && <p className="text-gray-600 text-left mb-4">{post.excerpt}</p>}
          {/* Usar AdvancedTableV2View para renderizar contenido con scrollbar contextual */}
          <AdvancedTableV2View 
            content={enhanceContentForSEO(post.content)} 
            className="my-4 prose max-w-none"
          />
          <div className="mt-4 flex items-center justify-between">
            <time dateTime={post.created_at} className="block text-sm text-gray-500 underline decoration-gray-300">
              {new Date(post.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
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
  )
}
