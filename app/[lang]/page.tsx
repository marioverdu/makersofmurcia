import type { Locale } from "@/types/i18n"
import RootPageClient from "./root-page-client"
import { RouteGuard } from "@/lib/route-guard"

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export default async function RootPage({ params }: PageProps) {
  return (
    <RouteGuard params={params} routePath="/[lang]" fallbackStrategy="allow">
      <RootPageClient lang={(await params).lang} />
    </RouteGuard>
  )
}