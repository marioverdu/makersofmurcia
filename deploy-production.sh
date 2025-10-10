#!/bin/bash

# Script de despliegue a producción
# Uso: ./deploy-production.sh

echo "🚀 Iniciando despliegue a producción..."

# 1. Verificar que estamos en la rama correcta
echo "📋 Verificando rama actual..."
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  Advertencia: No estás en la rama main. Rama actual: $CURRENT_BRANCH"
    read -p "¿Continuar de todas formas? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Despliegue cancelado"
        exit 1
    fi
fi

# 2. Verificar que no hay cambios sin commitear
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Hay cambios sin commitear. Por favor, haz commit de tus cambios antes de desplegar."
    git status --short
    exit 1
fi

# 3. Verificar variables de entorno
echo "🔧 Verificando variables de entorno..."
if [ ! -f "env.local" ]; then
    echo "❌ No se encontró env.local. Asegúrate de tener las variables de entorno configuradas."
    exit 1
fi

# 4. Instalar dependencias
echo "📦 Instalando dependencias..."
npm install --legacy-peer-deps

# 5. Generar rutas
echo "🛣️  Generando rutas..."
npm run generate-routes

# 6. Build local para verificar
echo "🔨 Ejecutando build local..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build falló. Revisa los errores antes de continuar."
    exit 1
fi

echo "✅ Build exitoso"

# 7. Iniciar servidor local para verificar
echo "🌐 Iniciando servidor local para verificación..."
npm run start &
SERVER_PID=$!

# Esperar a que el servidor esté listo
sleep 10

# Verificar que el servidor está funcionando
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Servidor local funcionando correctamente"
else
    echo "❌ Servidor local no responde. Revisa los logs."
    kill $SERVER_PID
    exit 1
fi

# Detener servidor local
kill $SERVER_PID

# 8. Desplegar a Vercel
echo "🚀 Desplegando a Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo "✅ Despliegue exitoso!"
    echo "🌐 Tu aplicación está disponible en: https://marioverdu.com"
else
    echo "❌ Despliegue falló. Revisa los logs de Vercel."
    exit 1
fi

echo "🎉 ¡Despliegue completado!"
