import { getDictionary } from '@/lib/get-dictionary'
import { Locale } from '@/types/i18n'
import HoverTestClient from './hover-test-client'

interface PageProps {
  params: {
    lang: Locale
  }
}

export default async function HoverTestPage({ params: { lang } }: PageProps) {
  const dict = await getDictionary(lang)
  
  return <HoverTestClient lang={lang} dict={dict} />
}
