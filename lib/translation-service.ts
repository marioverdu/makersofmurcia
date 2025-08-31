import OpenAI from '@ai-sdk/openai';

// Configurar el cliente de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export interface TranslationResult {
  translatedText: string;
  success: boolean;
  error?: string;
}

export interface TranslationStats {
  totalLines: number;
  translatedLines: number;
  failedLines: number;
  failedTexts: string[];
}

/**
 * Traduce texto de español a inglés usando OpenAI
 */
export async function translateToEnglish(spanishText: string): Promise<TranslationResult> {
  try {
    // Intentar primero con OpenAI si está configurada
    if (process.env.OPENAI_API_KEY) {
      const response = await openai.chat({
        messages: [
          {
            role: 'system',
            content: 'Eres un traductor profesional de español a inglés. Traduce el texto manteniendo el formato HTML y las etiquetas. Solo traduce el contenido textual, no modifiques las etiquetas HTML.'
          },
          {
            role: 'user',
            content: `Traduce el siguiente texto de español a inglés, manteniendo el formato HTML:\n\n${spanishText}`
          }
        ],
        model: 'gpt-3.5-turbo',
        temperature: 0.3,
        maxTokens: 2000
      });

      const translatedText = response.choices[0]?.message?.content || spanishText;
      
      return {
        translatedText,
        success: true
      };
    }

    // Fallback gratuito usando LibreTranslate (API pública)
    return await translateWithLibreTranslate(spanishText);
    
  } catch (error) {
    console.error('Error en traducción OpenAI:', error);
    
    // Intentar fallback gratuito
    try {
      return await translateWithLibreTranslate(spanishText);
    } catch (fallbackError) {
      console.error('Error en fallback gratuito:', fallbackError);
      return {
        translatedText: spanishText,
        success: false,
        error: 'No se pudo traducir con ningún servicio disponible'
      };
    }
  }
}

/**
 * Traducción gratuita usando LibreTranslate (fallback)
 */
async function translateWithLibreTranslate(spanishText: string): Promise<TranslationResult> {
  try {
    // Usar la API pública de LibreTranslate
    const response = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: spanishText,
        source: 'es',
        target: 'en',
        format: 'html'
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      translatedText: data.translatedText || spanishText,
      success: true
    };
  } catch (error) {
    console.error('Error en LibreTranslate:', error);
    return {
      translatedText: spanishText,
      success: false,
      error: error instanceof Error ? error.message : 'Error en traducción gratuita'
    };
  }
}

/**
 * Traduce múltiples líneas de texto y retorna estadísticas
 */
export async function translateMultipleLines(texts: string[]): Promise<{
  translations: string[];
  stats: TranslationStats;
}> {
  const translations: string[] = [];
  const failedTexts: string[] = [];
  let translatedLines = 0;

  for (let i = 0; i < texts.length; i++) {
    const text = texts[i];
    if (!text.trim()) {
      translations.push(text);
      continue;
    }

    try {
      const result = await translateToEnglish(text);
      if (result.success) {
        translations.push(result.translatedText);
        translatedLines++;
      } else {
        translations.push(text); // Mantener texto original si falla
        failedTexts.push(text);
      }
    } catch (error) {
      translations.push(text); // Mantener texto original si falla
      failedTexts.push(text);
    }

    // Pequeña pausa para evitar rate limiting
    if (i < texts.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  const stats: TranslationStats = {
    totalLines: texts.length,
    translatedLines,
    failedLines: failedTexts.length,
    failedTexts
  };

  return { translations, stats };
}

/**
 * Extrae texto de contenido HTML para traducción
 */
export function extractTextFromHTML(html: string): string[] {
  // Crear un elemento temporal para parsear HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  // Extraer texto de elementos de texto
  const textElements = tempDiv.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, td, th, li');
  const texts: string[] = [];
  
  textElements.forEach(element => {
    const text = element.textContent?.trim();
    if (text && text.length > 0) {
      texts.push(text);
    }
  });
  
  return texts;
}

/**
 * Reemplaza texto en HTML con traducciones
 */
export function replaceTextInHTML(html: string, originalTexts: string[], translatedTexts: string[]): string {
  let result = html;
  
  for (let i = 0; i < originalTexts.length && i < translatedTexts.length; i++) {
    const original = originalTexts[i];
    const translated = translatedTexts[i];
    
    if (original && translated && original !== translated) {
      // Reemplazar el texto manteniendo las etiquetas HTML
      result = result.replace(new RegExp(original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), translated);
    }
  }
  
  return result;
}
