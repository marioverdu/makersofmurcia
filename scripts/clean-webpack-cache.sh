#!/bin/bash

echo "🧹 Limpiando cache problemático de webpack..."

# Detener el servidor de desarrollo si está corriendo
echo "🛑 Deteniendo servidor de desarrollo..."
pkill -f "next dev" || true
pkill -f "npm run dev" || true

# Limpiar cache de Next.js
echo "🗑️ Limpiando .next/cache..."
rm -rf .next/cache
rm -rf .next/webpack

# Limpiar cache de node_modules
echo "🗑️ Limpiando cache de node_modules..."
rm -rf node_modules/.cache
rm -rf node_modules/.vite

# Limpiar cache del sistema
echo "🗑️ Limpiando cache del sistema..."
rm -rf ~/.cache/next
rm -rf ~/.cache/webpack

# Reinstalar dependencias si es necesario
echo "📦 Reinstalando dependencias..."
npm ci --silent

echo "✅ Cache limpiado exitosamente!"
echo "🚀 Ahora ejecuta: npm run dev"
