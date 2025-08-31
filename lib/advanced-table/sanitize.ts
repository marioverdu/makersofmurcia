export function sanitizeAdvancedTableHTML(rawHtml: string): string {
  if (!rawHtml) return rawHtml

  // 1) Eliminar handlers inline (on*)
  let html = rawHtml.replace(/\son[a-zA-Z]+\s*=\s*"[^"]*"/g, '')

  // 2) Eliminar atributos de edición/drag y datos internos
  html = html
    .replace(/\scontenteditable\s*=\s*"(true|false)"/gi, '')
    .replace(/\sdraggable\s*=\s*"(true|false)"/gi, '')
    .replace(/\sdata-cell-id\s*=\s*"[^"]*"/gi, '')

  // 3) Eliminar botones de media
  html = html.replace(/<button[^>]*class="[^"]*media-add-button[^"]*"[^>]*>.*?<\/button>/gis, '')

  // 4) Eliminar botones de eliminación (×) que se generan dinámicamente
  // Estos botones tienen la clase específica bg-red-500 y el contenido ×
  html = html.replace(/<button[^>]*class="[^"]*bg-red-500[^"]*"[^>]*>×<\/button>/gis, '')
  
  // 5) Eliminar contenedores vacíos que quedan después de eliminar botones
  html = html.replace(/<div[^>]*class="[^"]*relative[^"]*"[^>]*>\s*<\/div>/gis, '')

  // 6) Limpieza menor de espacios
  html = html.replace(/\s{2,}/g, ' ')

  return html
}
