/**
 * Configuración de variables de entorno para Vercel
 * Maneja las variables de entorno de forma segura en desarrollo y producción
 */

export const envConfig = {
  // NextAuth
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'https://marioverdu.com',
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  // Site URL (public)
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://marioverdu.com',
  
  // Google OAuth
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  
  // Admin
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'marioverdugambin@gmail.com',
  NEXT_PUBLIC_ADMIN_EMAIL: process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'marioverdugambin@gmail.com',
  
  // Database
  DATABASE_URL: process.env.DATABASE_URL,
  POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
  POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
  DATABASE_URL_UNPOOLED: process.env.DATABASE_URL_UNPOOLED,
  
  // Vercel KV
  KV_REST_API_URL: process.env.KV_REST_API_URL,
  KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
  KV_REST_API_READ_ONLY_TOKEN: process.env.KV_REST_API_READ_ONLY_TOKEN,
  KV_URL: process.env.KV_URL,
  REDIS_URL: process.env.REDIS_URL,
  
  // Resend
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  
  // Environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV || 'development',
  
  // Neon Database
  NEON_PROJECT_ID: process.env.NEON_PROJECT_ID,
  PGHOST: process.env.PGHOST,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
  PGPASSWORD: process.env.PGPASSWORD,
  PGDATABASE: process.env.PGDATABASE,
  PGUSER: process.env.PGUSER,
  PGHOST_UNPOOLED: process.env.PGHOST_UNPOOLED,
  
  // Stack (Optional)
  STACK_SECRET_SERVER_KEY: process.env.STACK_SECRET_SERVER_KEY,
  NEXT_PUBLIC_STACK_PROJECT_ID: process.env.NEXT_PUBLIC_STACK_PROJECT_ID,
  NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,
}

/**
 * Verifica que las variables de entorno requeridas estén configuradas
 */
export function validateEnvVars() {
  const required = [
    'DATABASE_URL',
    'NEXTAUTH_SECRET',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
  ]
  
  const missing = required.filter(key => !envConfig[key as keyof typeof envConfig])
  
  if (missing.length > 0) {
    console.warn('⚠️ Variables de entorno faltantes:', missing)
    return false
  }
  
  return true
}

/**
 * Obtiene la configuración de base de datos para Vercel
 */
export function getDatabaseConfig() {
  return {
    url: envConfig.DATABASE_URL,
    prismaUrl: envConfig.POSTGRES_PRISMA_URL,
    nonPoolingUrl: envConfig.POSTGRES_URL_NON_POOLING,
    unpooledUrl: envConfig.DATABASE_URL_UNPOOLED,
  }
}

/**
 * Obtiene la configuración de NextAuth
 */
export function getNextAuthConfig() {
  return {
    url: envConfig.NEXTAUTH_URL,
    secret: envConfig.NEXTAUTH_SECRET,
    googleClientId: envConfig.GOOGLE_CLIENT_ID,
    googleClientSecret: envConfig.GOOGLE_CLIENT_SECRET,
    adminEmail: envConfig.ADMIN_EMAIL,
  }
}

/**
 * Devuelve la URL pública del sitio (para canónicos, OG, sitemaps, redirecciones absolutas)
 */
export function getSiteUrl() {
  return envConfig.NEXT_PUBLIC_SITE_URL || 'https://marioverdu.com'
}

