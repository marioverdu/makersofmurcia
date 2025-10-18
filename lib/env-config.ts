/**
 * Configuración de variables de entorno para Vercel
 * Maneja las variables de entorno de forma segura en desarrollo y producción
 */

export const envConfig = {
  // Site URL (public)
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://makersofmurcia.vercel.app',
  
  // Environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV || 'development',
}

/**
 * Verifica que las variables de entorno requeridas estén configuradas
 */
export function validateEnvVars() {
  // No hay variables requeridas para una página estática
  return true
}



/**
 * Devuelve la URL pública del sitio (para canónicos, OG, sitemaps, redirecciones absolutas)
 */
export function getSiteUrl() {
  return envConfig.NEXT_PUBLIC_SITE_URL || 'https://makersofmurcia.vercel.app'
}

