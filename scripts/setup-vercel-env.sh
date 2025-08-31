#!/bin/bash

# Script para configurar variables de entorno en Vercel
# Uso: ./scripts/setup-vercel-env.sh

echo "🚀 Configurando variables de entorno en Vercel..."

# Verificar si Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI no está instalado. Instalando..."
    npm install -g vercel
fi

# Variables de entorno críticas que necesitas configurar
declare -a env_vars=(
    "DATABASE_URL"
    "POSTGRES_PRISMA_URL"
    "POSTGRES_URL_NON_POOLING"
    "POSTGRES_USER"
    "POSTGRES_PASSWORD"
    "POSTGRES_DATABASE"
    "NEXTAUTH_SECRET"
    "NEXTAUTH_URL"
    "GOOGLE_CLIENT_ID"
    "GOOGLE_CLIENT_SECRET"
    "RESEND_API_KEY"
    "ADMIN_EMAIL"
    "NEXT_PUBLIC_ADMIN_EMAIL"
    "KV_REST_API_TOKEN"
    "KV_REST_API_URL"
    "KV_REST_API_READ_ONLY_TOKEN"
    "REDIS_URL"
    "KV_URL"
    "STACK_SECRET_SERVER_KEY"
    "NEXT_PUBLIC_STACK_PROJECT_ID"
    "NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY"
)

echo "📋 Variables de entorno a configurar:"
for var in "${env_vars[@]}"; do
    echo "  - $var"
done

echo ""
echo "⚠️  IMPORTANTE: Necesitas configurar estas variables manualmente en el dashboard de Vercel:"
echo "   1. Ve a https://vercel.com/dashboard"
echo "   2. Selecciona tu proyecto"
echo "   3. Ve a Settings > Environment Variables"
echo "   4. Agrega cada variable con su valor correspondiente"
echo ""
echo "🔗 O usa el comando: vercel env add"
echo ""

# Opción para usar Vercel CLI
read -p "¿Quieres usar Vercel CLI para configurar las variables? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🔧 Configurando variables con Vercel CLI..."
    
    for var in "${env_vars[@]}"; do
        echo "Configurando $var..."
        vercel env add "$var" production
    done
    
    echo "✅ Variables configuradas. Ejecutando vercel --prod para desplegar..."
    vercel --prod
else
    echo "📝 Configura las variables manualmente en el dashboard de Vercel y luego ejecuta:"
    echo "   vercel --prod"
fi
