import type { Locale } from '@/types/i18n'
import esDict from '@/app/dictionaries/es.json'
import enDict from '@/app/dictionaries/en.json'

const dictionaries = {
  es: esDict,
  en: enDict,
}

export const getDictionary = async (locale: Locale) => {
  try {
    const dictionary = dictionaries[locale]
    if (!dictionary) {
      console.error(`Dictionary not found for locale ${locale}, using Spanish fallback`)
      return dictionaries.es
    }
    return dictionary
  } catch (error) {
    console.error(`Error loading dictionary for locale ${locale}:`, error)
    // Fallback to Spanish if there's an error
    return dictionaries.es
  }
}
