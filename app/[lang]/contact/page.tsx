import { Metadata } from "next"
import { seoEngine, seoConfigs } from "@/lib/seo-engine"
import ContactPageClient from "./contact-page-client"
import { getDictionary } from "@/lib/get-dictionary"
import type { Locale } from "@/types/i18n"

interface PageProps {
  params: { lang: Locale }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const dict = await getDictionary(params.lang)
  
  return seoEngine.generateMetadata({
    ...seoConfigs.contact,
    title: dict.contact.title,
    description: dict.contact.subtitle,
  })
}

export default async function ContactPage({ params: { lang } }: PageProps) {
  const dict = await getDictionary(lang)
  
  return <ContactPageClient lang={lang} dict={dict} />
}

