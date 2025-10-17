import type { Locale } from "@/types/i18n"
import RootPageClient from "./root-page-client"

interface PageProps {
  params: Promise<{ lang: Locale }>
}

export default async function RootPage({ params }: PageProps) {
  const { lang } = await params
  
  return <RootPageClient lang={lang} />
}