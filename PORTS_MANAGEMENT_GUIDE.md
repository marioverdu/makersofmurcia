# 🔧 Comandos para Manejar Puertos de Desarrollo

## 🚀 Comandos Rápidos

### Matar puerto específico
```bash
# Matar solo puerto 3000
npm run kill-3000
# o
./kill-port-3000.sh

# Matar todos los puertos de desarrollo
npm run kill-ports
# o
./kill-dev-ports.sh
```

### Iniciar con limpieza automática
```bash
# Iniciar servidor después de matar puerto 3000
npm run clean-start

# Iniciar desarrollo después de matar puerto 3000
npm run dev-clean
```

## 🔍 Comandos de Verificación

### Ver qué está usando un puerto
```bash
# Ver proceso en puerto 3000
lsof -i:3000

# Ver solo el PID
lsof -ti:3000
```

### Matar proceso manualmente
```bash
# Encontrar PID
PID=$(lsof -ti:3000)

# Matar proceso
kill -9 $PID
```

## 📋 Puertos Comunes de Desarrollo

| Puerto | Uso Típico |
|--------|------------|
| 3000   | Next.js, React |
| 3001   | React (alternativo) |
| 8000   | Python, Django |
| 8080   | Java, Spring |
| 5000   | Flask, Python |
| 4000   | Node.js APIs |
| 9000   | Angular |

## 🎯 Scripts Creados

### `kill-port-3000.sh`
- Mata específicamente el proceso en puerto 3000
- Útil para Next.js/React

### `kill-dev-ports.sh`
- Mata procesos en múltiples puertos de desarrollo
- Puertos: 3000, 3001, 3002, 3003, 8000, 8001, 8080, 5000, 5001, 4000, 4001, 9000, 9001

## 💡 Consejos

1. **Antes de iniciar desarrollo**:
   ```bash
   npm run kill-3000
   npm run dev
   ```

2. **Si tienes problemas de puerto**:
   ```bash
   npm run kill-ports
   ```

3. **Para producción**:
   ```bash
   npm run clean-start
   ```

4. **Comando todo en uno**:
   ```bash
   npm run dev-clean
   ```

## ⚠️ Advertencias

- `kill -9` fuerza el cierre del proceso
- Asegúrate de guardar tu trabajo antes de matar procesos
- Algunos procesos pueden reiniciarse automáticamente
