/**
 * Mejora el contenido HTML de posts para SEO y experiencia de usuario
 */

/**
 * Genera un ID único para un heading basado en su texto
 */
function generateHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remover caracteres especiales
    .replace(/\s+/g, '-') // Espacios a guiones
    .replace(/-+/g, '-') // Múltiples guiones a uno
    .replace(/^-|-$/g, '') // Remover guiones del inicio y final
    .slice(0, 50) // Limitar longitud
}

/**
 * Añade IDs a los headings para permitir enlaces de fragmento
 */
export function addHeadingIds(htmlContent: string): string {
  if (!htmlContent) return htmlContent

  // Buscar todos los headings (h1, h2, h3, h4, h5, h6)
  return htmlContent.replace(
    /<(h[1-6])([^>]*)>(.*?)<\/h[1-6]>/gi,
    (match, tag, attributes, content) => {
      // Extraer texto limpio del heading
      const textContent = content.replace(/<[^>]*>/g, '').trim()
      
      if (!textContent) return match

      // Generar ID único
      const id = generateHeadingId(textContent)
      
      // Si ya tiene ID, no modificar
      if (attributes.includes('id=')) return match

      // Añadir ID al heading
      return `<${tag}${attributes} id="${id}">${content}</${tag}>`
    }
  )
}

/**
 * Mejora las listas para fragmentos destacados
 */
export function enhanceLists(htmlContent: string): string {
  if (!htmlContent) return htmlContent

  // Añadir clases semánticas a listas
  return htmlContent
    .replace(/<ol([^>]*)>/gi, '<ol$1 class="seo-ordered-list">')
    .replace(/<ul([^>]*)>/gi, '<ul$1 class="seo-unordered-list">')
    .replace(/<li([^>]*)>/gi, '<li$1 class="seo-list-item">')
}

/**
 * Mejora las tablas para fragmentos destacados
 */
export function enhanceTables(htmlContent: string): string {
  if (!htmlContent) return htmlContent

  return htmlContent.replace(
    /<table([^>]*)>/gi,
    '<table$1 class="seo-table" role="table">'
  )
}

/**
 * Añade marcado semántico a párrafos importantes
 */
export function enhanceParagraphs(htmlContent: string): string {
  if (!htmlContent) return htmlContent

  // Marcar párrafos que empiezan con palabras clave importantes
  const importantKeywords = [
    'importante:', 'nota:', 'atención:', 'recuerda:', 'tip:', 'consejo:',
    'important:', 'note:', 'attention:', 'remember:', 'warning:', 'advice:'
  ]

  let enhanced = htmlContent

  importantKeywords.forEach(keyword => {
    const regex = new RegExp(
      `<p([^>]*)>\\s*${keyword.replace(':', '\\:')}`,
      'gi'
    )
    enhanced = enhanced.replace(
      regex,
      `<p$1 class="seo-important-paragraph"><strong>${keyword}</strong>`
    )
  })

  return enhanced
}

/**
 * Mejora las citas en blockquotes
 */
export function enhanceBlockquotes(htmlContent: string): string {
  if (!htmlContent) return htmlContent

  return htmlContent.replace(
    /<blockquote([^>]*)>/gi,
    '<blockquote$1 class="seo-blockquote" role="blockquote">'
  )
}

/**
 * Preserva los saltos de línea en el contenido HTML
 */
export function preserveLineBreaks(htmlContent: string): string {
  if (!htmlContent) return htmlContent

  // NO convertir saltos de línea si el contenido es principalmente HTML (tiene iframes, divs, etc.)
  // Esto evita romper estructuras HTML como iframes de YouTube
  const hasHTMLStructure = /<(iframe|div|video|embed|object)[^>]*>/i.test(htmlContent)
  
  if (hasHTMLStructure) {
    // Si hay estructura HTML, no tocar los saltos de línea
    return htmlContent
  }

  // Solo para contenido de texto plano, convertir saltos de línea en <br> tags
  return htmlContent.replace(/\n/g, '<br>')
}

/**
 * Función principal que aplica todas las mejoras SEO al contenido
 */
export function enhanceContentForSEO(htmlContent: string): string {
  if (!htmlContent) return htmlContent

  let enhanced = htmlContent

  // Preservar saltos de línea primero
  enhanced = preserveLineBreaks(enhanced)

  // Aplicar todas las mejoras en secuencia
  enhanced = addHeadingIds(enhanced)
  enhanced = enhanceLists(enhanced)
  enhanced = enhanceTables(enhanced)
  enhanced = enhanceParagraphs(enhanced)
  enhanced = enhanceBlockquotes(enhanced)

  return enhanced
}

/**
 * Extrae todos los headings del contenido para generar tabla de contenidos
 */
export function extractHeadings(htmlContent: string): Array<{
  id: string
  text: string
  level: number
}> {
  if (!htmlContent) return []

  const headings: Array<{ id: string; text: string; level: number }> = []
  const headingRegex = /<h([1-6])([^>]*?)id="([^"]*)"[^>]*>(.*?)<\/h[1-6]>/gi

  let match
  while ((match = headingRegex.exec(htmlContent)) !== null) {
    const level = parseInt(match[1])
    const id = match[3]
    const text = match[4].replace(/<[^>]*>/g, '').trim()

    if (text && id) {
      headings.push({ id, text, level })
    }
  }

  return headings
}

/**
 * Genera una tabla de contenidos en HTML
 */
export function generateTableOfContents(headings: Array<{
  id: string
  text: string
  level: number
}>): string {
  if (headings.length === 0) return ''

  const tocItems = headings.map(heading => {
    const indent = '  '.repeat(heading.level - 1)
    return `${indent}<li><a href="#${heading.id}">${heading.text}</a></li>`
  }).join('\n')

  return `
    <nav class="table-of-contents" role="navigation" aria-label="Tabla de contenidos">
      <h2>Contenido</h2>
      <ol>
        ${tocItems}
      </ol>
    </nav>
  `
}
