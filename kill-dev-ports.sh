#!/bin/bash

# Script para matar todos los procesos en puertos comunes de desarrollo
echo "🔪 Matando procesos en puertos de desarrollo..."

# Puertos comunes de desarrollo
PORTS=(3000 3001 3002 3003 8000 8001 8080 5000 5001 4000 4001 9000 9001)

for port in "${PORTS[@]}"; do
    echo "🔍 Verificando puerto $port..."
    PIDS=$(lsof -ti:$port 2>/dev/null)
    
    if [ -n "$PIDS" ]; then
        echo "⚠️  Encontrados procesos en puerto $port: $PIDS"
        echo "🔪 Matando procesos..."
        echo "$PIDS" | xargs kill -9 2>/dev/null
        echo "✅ Procesos en puerto $port eliminados"
    else
        echo "✅ Puerto $port libre"
    fi
done

echo ""
echo "🎯 Verificando puertos después de la limpieza:"
echo "Puerto 3000: $(lsof -ti:3000 2>/dev/null || echo 'Libre')"
echo "Puerto 3001: $(lsof -ti:3001 2>/dev/null || echo 'Libre')"
echo "Puerto 8000: $(lsof -ti:8000 2>/dev/null || echo 'Libre')"

echo ""
echo "✨ Limpieza completada!"
