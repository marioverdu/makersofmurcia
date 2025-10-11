/**
 * Utilidad para convertir URLs de YouTube a iframes embebidos
 * Soporta:
 * - Videos individuales: youtube.com/watch?v=VIDEO_ID
 * - Playlists: youtube.com/watch?v=VIDEO_ID&list=PLAYLIST_ID
 * - URLs cortas: youtu.be/VIDEO_ID
 */

export interface YouTubeEmbedOptions {
  width?: string
  height?: string
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
  modestbranding?: boolean
  rel?: boolean
}

/**
 * Extrae el ID de video y playlist de una URL de YouTube
 */
export function parseYouTubeUrl(url: string): {
  videoId: string | null
  playlistId: string | null
  startIndex?: number
} | null {
  try {
    // Limpiar &amp; a &
    const cleanUrl = url.replace(/&amp;/g, '&')
    
    // Intentar parsear como URL
    let urlObj: URL
    try {
      urlObj = new URL(cleanUrl)
    } catch {
      // Si no es una URL válida, intentar agregar https://
      urlObj = new URL(`https://${cleanUrl}`)
    }

    let videoId: string | null = null
    let playlistId: string | null = null
    let startIndex: number | undefined = undefined

    // youtube.com/watch?v=...
    if (urlObj.hostname.includes('youtube.com') && urlObj.pathname === '/watch') {
      videoId = urlObj.searchParams.get('v')
      playlistId = urlObj.searchParams.get('list')
      const index = urlObj.searchParams.get('index')
      if (index) startIndex = parseInt(index, 10)
    }
    // youtu.be/VIDEO_ID
    else if (urlObj.hostname.includes('youtu.be')) {
      videoId = urlObj.pathname.slice(1) // Quitar el /
      playlistId = urlObj.searchParams.get('list')
      const index = urlObj.searchParams.get('index')
      if (index) startIndex = parseInt(index, 10)
    }
    // youtube.com/embed/VIDEO_ID
    else if (urlObj.hostname.includes('youtube.com') && urlObj.pathname.startsWith('/embed/')) {
      videoId = urlObj.pathname.slice(7) // Quitar /embed/
    }

    if (!videoId && !playlistId) {
      return null
    }

    return { videoId, playlistId, startIndex }
  } catch (error) {
    console.error('Error parsing YouTube URL:', error)
    return null
  }
}

/**
 * Genera una URL de embed de YouTube
 */
export function generateYouTubeEmbedUrl(
  parsed: { videoId: string | null; playlistId: string | null; startIndex?: number },
  options: YouTubeEmbedOptions = {}
): string {
  const params = new URLSearchParams()

  // Parámetros opcionales
  if (options.autoplay) params.set('autoplay', '1')
  if (options.muted) params.set('mute', '1')
  if (options.loop) params.set('loop', '1')
  if (options.controls === false) params.set('controls', '0')
  if (options.modestbranding) params.set('modestbranding', '1')
  if (options.rel === false) params.set('rel', '0')

  // Si hay playlist, usar el formato de playlist
  if (parsed.playlistId) {
    // Para playlists, siempre usar el formato con video específico si está disponible
    if (parsed.videoId) {
      // Formato: /embed/VIDEO_ID?list=PLAYLIST_ID
      let url = `https://www.youtube.com/embed/${parsed.videoId}?list=${parsed.playlistId}`
      
      // Agregar índice si existe (aunque el videoId ya define cuál video mostrar)
      if (parsed.startIndex) {
        params.set('index', parsed.startIndex.toString())
      }
      
      const paramString = params.toString()
      return paramString ? `${url}&${paramString}` : url
    } else {
      // Si solo hay playlist sin videoId específico, usar videoseries
      let url = `https://www.youtube.com/embed/videoseries?list=${parsed.playlistId}`
      
      if (parsed.startIndex) {
        params.set('index', parsed.startIndex.toString())
      }
      
      const paramString = params.toString()
      return paramString ? `${url}&${paramString}` : url
    }
  }
  
  // Si solo hay videoId
  if (parsed.videoId) {
    const paramString = params.toString()
    const baseUrl = `https://www.youtube.com/embed/${parsed.videoId}`
    return paramString ? `${baseUrl}?${paramString}` : baseUrl
  }

  return ''
}

/**
 * Genera el HTML del iframe de YouTube
 */
export function generateYouTubeIframe(
  url: string,
  options: YouTubeEmbedOptions = {}
): string {
  const parsed = parseYouTubeUrl(url)
  if (!parsed) return url // Si no se puede parsear, devolver la URL original

  const embedUrl = generateYouTubeEmbedUrl(parsed, options)
  const width = options.width || '100%'
  const height = options.height || '100%'

  return `<div class="youtube-embed-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0;"><iframe src="${embedUrl}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="YouTube video player"></iframe></div>`
}

/**
 * Convierte todas las URLs de YouTube en un HTML a iframes embebidos
 */
export function convertYouTubeUrlsToEmbeds(
  html: string,
  options: YouTubeEmbedOptions = {}
): string {
  if (!html) return html

  // Regex para encontrar URLs de YouTube (como texto plano o en <p>, <div>, etc.)
  const youtubeUrlRegex = /(?:^|\s|<p>|<div>|<span>)(https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)(?:[^\s<]*)?(?:<\/p>|<\/div>|<\/span>|$|\s)/gi

  let result = html

  // Buscar todas las coincidencias
  const matches = Array.from(html.matchAll(youtubeUrlRegex))

  // Procesar de atrás hacia adelante para mantener los índices correctos
  for (let i = matches.length - 1; i >= 0; i--) {
    const match = matches[i]
    const fullMatch = match[0]
    const fullUrl = fullMatch.trim().replace(/<\/?[^>]+(>|$)/g, '') // Quitar tags HTML
    
    // Verificar que no esté ya en un iframe
    const beforeMatch = html.substring(Math.max(0, match.index! - 100), match.index!)
    if (beforeMatch.includes('<iframe') || beforeMatch.includes('youtube-embed-container')) {
      continue // Ya está embebido
    }

    // Generar el iframe
    const iframe = generateYouTubeIframe(fullUrl, options)
    
    // Reemplazar la URL con el iframe
    const startIndex = match.index!
    const endIndex = startIndex + fullMatch.length
    
    result = result.substring(0, startIndex) + iframe + result.substring(endIndex)
  }

  return result
}

/**
 * Detecta si un string contiene URLs de YouTube
 */
export function hasYouTubeUrls(text: string): boolean {
  const youtubeUrlRegex = /(https?:\/\/)?(www\.|m\.)?(youtube\.com\/(watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)[a-zA-Z0-9_-]+/i
  return youtubeUrlRegex.test(text)
}

/**
 * Extrae todas las URLs de YouTube de un texto
 */
export function extractYouTubeUrls(text: string): string[] {
  const youtubeUrlRegex = /(https?:\/\/)?(www\.|m\.)?(youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)(?:[^\s]*)?/gi
  const matches = text.match(youtubeUrlRegex)
  return matches || []
}

