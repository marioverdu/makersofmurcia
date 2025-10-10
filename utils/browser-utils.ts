// Utilidades para verificar el entorno de ejecución
export const isBrowser = typeof window !== 'undefined'
export const isServer = typeof window === 'undefined'

// Función helper para acceder a window de forma segura
export const getWindow = () => {
  if (typeof window === 'undefined') {
    return null
  }
  return window
}

// Función helper para acceder a document de forma segura
export const getDocument = () => {
  if (typeof document === 'undefined') {
    return null
  }
  return document
}

// Función helper para verificar si estamos en desarrollo
export const isDevelopment = () => {
  return process.env.NODE_ENV === "development" ||
    (isBrowser && (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.startsWith("192.168.")
    ))
}

// Función helper para verificar si estamos en localhost
export const isLocalhost = () => {
  if (!isBrowser) return false
  return (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname.startsWith("192.168.")
  )
}

// Función helper para obtener el hostname de forma segura
export const getHostname = () => {
  if (!isBrowser) return ''
  return window.location.hostname
}

// Función helper para obtener la URL actual de forma segura
export const getCurrentUrl = () => {
  if (!isBrowser) return ''
  return window.location.href
}
