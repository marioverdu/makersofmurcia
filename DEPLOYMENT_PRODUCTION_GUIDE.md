# 🚀 Guía de Despliegue a Producción

## 📋 Preparación

### 1. Variables de Entorno
- Copia las variables del archivo `env.production.vercel.example` al dashboard de Vercel
- Asegúrate de que todas las variables estén configuradas correctamente
- La URL de producción debe ser: `https://marioverdu.com`

### 2. Verificación Local
```bash
# Instalar dependencias
npm install --legacy-peer-deps

# Generar rutas
npm run generate-routes

# Build local
npm run build

# Verificar que funciona
npm run start
```

## 🚀 Despliegue Automático

### Opción 1: Script Automático
```bash
./deploy-production.sh
```

### Opción 2: Despliegue Manual
```bash
# 1. Build y verificación
npm run build && npm run start

# 2. Desplegar a Vercel
vercel --prod
```

## 📝 Checklist de Producción

- [ ] Variables de entorno configuradas en Vercel
- [ ] Build local exitoso
- [ ] Servidor local funcionando
- [ ] Sin cambios sin commitear
- [ ] Rama main actualizada
- [ ] Dominio configurado: marioverdu.com

## 🔧 Configuración de Vercel

### Build Command
```bash
npm run build
```

### Install Command
```bash
npm install --legacy-peer-deps
```

### Output Directory
```
.next
```

### Environment Variables
Ver archivo `env.production.vercel.example` para la lista completa.

## 🐛 Troubleshooting

### Error de Build
- Verificar que todas las dependencias estén instaladas
- Revisar logs de build en Vercel
- Asegurar que las variables de entorno estén configuradas

### Error de Runtime
- Verificar logs de función en Vercel
- Comprobar conexiones a base de datos
- Revisar configuración de NextAuth

### Error de Dominio
- Verificar configuración DNS
- Comprobar configuración en Vercel
- Asegurar que el dominio esté verificado

## 📞 Soporte

Para problemas de despliegue:
1. Revisar logs en Vercel Dashboard
2. Verificar configuración de variables de entorno
3. Comprobar que el build local funciona
4. Contactar soporte si persisten los problemas
