import type { Metadata } from "next"
import { getDictionary } from "@/lib/get-dictionary"
import type { Locale } from "@/types/i18n"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  try {
    const { lang } = await params
    
    // Validar que lang sea un locale válido
    if (!['en', 'es'].includes(lang)) {
      return {
        title: "Mario Verdú - Desarrollador Web",
        description: "Desarrollador web full-stack especializado en React, Next.js y tecnologías modernas",
      }
    }
    
    const dict = await getDictionary(lang)
    
    return {
      title: dict.home.title,
      description: dict.home.description,
      keywords: ["desarrollo web", "tecnología", "blog", "portfolio", "programación"],
      openGraph: {
        title: dict.home.title,
        description: dict.home.description,
        locale: lang,
        type: "website",
      },
    }
  } catch (error) {
    // Fallback metadata for cases where dictionary loading fails
    return {
      title: "Mario Verdú",
      description: "Desarrollo de producto digital alineado con tu visión de negocio",
      keywords: ["desarrollo web", "tecnología", "blog", "portfolio", "programación"],
      openGraph: {
        title: "Mario Verdú",
        description: "Desarrollo de producto digital alineado con tu visión de negocio",
        type: "website",
      },
    }
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  return children
}
