import { useLanguage } from '@/contexts/language-context'

export interface ContextualMenuTranslations {
  downloadPDF: string
}

const contextualMenuTranslations: Record<string, ContextualMenuTranslations> = {
  es: {
    downloadPDF: 'Descargar en PDF'
  },
  en: {
    downloadPDF: 'Download PDF'
  }
}

export function useContextualMenuTranslations(lang?: string): ContextualMenuTranslations {
  const { currentLanguage } = useLanguage()
  const language = lang || currentLanguage || 'es'
  return contextualMenuTranslations[language] || contextualMenuTranslations.es
}
