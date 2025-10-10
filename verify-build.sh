#!/bin/bash

# Script para verificar el build local antes del despliegue
echo "🔍 Verificando build local..."

# 1. Limpiar build anterior
echo "🧹 Limpiando build anterior..."
rm -rf .next
rm -rf node_modules/.cache

# 2. Instalar dependencias
echo "📦 Instalando dependencias..."
npm install --legacy-peer-deps

# 3. Generar rutas
echo "🛣️ Generando rutas..."
npm run generate-routes

# 4. Build con variables de entorno de producción
echo "🔨 Ejecutando build con configuración de producción..."
NODE_ENV=production npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build exitoso!"
    echo "🚀 Listo para desplegar a Vercel"
    echo ""
    echo "Para desplegar ejecuta:"
    echo "vercel --prod"
else
    echo "❌ Build falló. Revisa los errores antes de continuar."
    exit 1
fi
