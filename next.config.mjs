/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración básica y estable
  reactStrictMode: true,
  
  // Configuración de webpack simplificada para estabilidad
  webpack: (config, { dev }) => {
    if (dev) {
      // Deshabilitar cache problemático que causa warnings
      config.cache = false
      
      // Configuración mínima para estabilidad
      config.infrastructureLogging = {
        level: 'error',
      }
    }
    return config
  },
  
  // Configuración de imágenes
  images: {
    domains: ['localhost', 'assets.marioverdu.com', 'marioverdu.com'],
    unoptimized: true,
  },
  
  // Configuración de ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Configuración de TypeScript
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
