#!/bin/bash

# Comando rápido para matar el puerto 3000
echo "🔪 Matando proceso en puerto 3000..."

PID=$(lsof -ti:3000 2>/dev/null)

if [ -n "$PID" ]; then
    echo "⚠️  Encontrado proceso $PID en puerto 3000"
    echo "🔪 Matando proceso..."
    kill -9 $PID
    echo "✅ Proceso eliminado"
else
    echo "✅ Puerto 3000 ya está libre"
fi

echo "🎯 Puerto 3000: $(lsof -ti:3000 2>/dev/null || echo 'Libre')"
