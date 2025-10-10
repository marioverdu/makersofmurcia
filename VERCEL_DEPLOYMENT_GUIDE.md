# 🚀 Guía de Despliegue en Vercel - Variables de Entorno

## ⚠️ Problema Identificado

El error `DATABASE_URL no está configurado` ocurre porque Vercel no puede acceder a las variables de entorno locales (`.env.local`) durante el build. Las variables de entorno locales solo funcionan en desarrollo.

## 🔧 Solución: Configurar Variables en Vercel

### **Paso 1: Ir al Dashboard de Vercel**
1. Ve a [vercel.com](https://vercel.com)
2. Selecciona tu proyecto `simplecms`
3. Ve a **Settings** → **Environment Variables**

<<<<<<< HEAD
\`\`\`json
{
  "scripts": {
    "prebuild": "npm run generate-routes",
    "build": "next build",
    "dev": "next dev",
    "generate-routes": "node scripts/generate-routes.cjs",
    "lint": "next lint",
    "start": "next start"
  }
}
\`\`\`
=======
### **Paso 2: Agregar Variables de Entorno**

#### **Variables Críticas (Obligatorias)**
```bash
# NextAuth
NEXTAUTH_URL=https://marioverdu.com
NEXTAUTH_SECRET=W3KkSqKhFuwFDH5bogQE7YNOrVQk2TO2gdeCflra9zI=

# Google OAuth
GOOGLE_CLIENT_ID=3448168721-9v4g6dj4u3hqe1qscne9g5j153oi5un3.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

# Database (Neon)
DATABASE_URL=postgres://neondb_owner:npg_DjTA32wLyFPg@ep-weathered-cake-ad2ijk3r-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
POSTGRES_PRISMA_URL=postgres://neondb_owner:npg_DjTA32wLyFPg@ep-weathered-cake-ad2ijk3r-pooler.c-2.us-east-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require
POSTGRES_URL_NON_POOLING=postgres://neondb_owner:npg_DjTA32wLyFPg@ep-weathered-cake-ad2ijk3r.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
DATABASE_URL_UNPOOLED=postgresql://neondb_owner:npg_DjTA32wLyFPg@ep-weathered-cake-ad2ijk3r.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require

# Admin
ADMIN_EMAIL=marioverdugambin@gmail.com
NEXT_PUBLIC_ADMIN_EMAIL=marioverdugambin@gmail.com
```
>>>>>>> 0ea2f51 (Fix: Mejorar gestión de variables de entorno para Vercel - Agregar scripts de configuración automática)

#### **Variables de Vercel KV (Redis)**
```bash
KV_REST_API_URL=https://model-bear-14242.upstash.io
KV_REST_API_TOKEN=ATeiAAIjcDFiZDE3MmNjODAxYWI0NzQ1OWM0ZjU4ZmE2MmMxMGFlY3AxMA
KV_REST_API_READ_ONLY_TOKEN=AjeiAAIgcDEwl7oLQyWOkvHYtX8D8msSXH5oloTpk1z7Cx_SUvH5JA
KV_URL=rediss://default:ATeiAAIjcDFiZDE3MmNjODAxYWI0NzQ1OWM0ZjU4ZmE2MmMxMGFlY3AxMA@model-bear-14242.upstash.io:6379
REDIS_URL=rediss://default:ATeiAAIjcDFiZDE3MmNjODAxYWI0NzQ1OWM0ZjU4ZmE2MmMxMGFlY3AxMA@model-bear-14242.upstash.io:6379
```

#### **Variables de Neon Database**
```bash
NEON_PROJECT_ID=plain-voice-70379929
PGHOST=ep-weathered-cake-ad2ijk3r-pooler.c-2.us-east-1.aws.neon.tech
POSTGRES_USER=neondb_owner
POSTGRES_PASSWORD=npg_DjTA32wLyFPg
POSTGRES_DATABASE=neondb
PGPASSWORD=npg_DjTA32wLyFPg
PGDATABASE=neondb
PGUSER=neondb_owner
PGHOST_UNPOOLED=ep-weathered-cake-ad2ijk3r.c-2.us-east-1.aws.neon.tech
```

#### **Variables de Resend (Email)**
```bash
RESEND_API_KEY=re_bXZqNypo_HjhdM2RtX7mHmMXZhgrH3kBr
```

#### **Variables de Stack (Opcionales)**
```bash
STACK_SECRET_SERVER_KEY=ssk_dbzjk61asjpcrfsbhbxe3p0rtcwx65cwcbf3t8cn3np2r
NEXT_PUBLIC_STACK_PROJECT_ID=1cabdeef-64a3-4c44-97f6-523e9a1fed70
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=pck_p649byaydkcar531jatbjdbpr4pgqv4syc7dpf3vfgjs8
```

### **Paso 3: Configurar Entornos**

Para cada variable, asegúrate de que esté configurada para:
- ✅ **Production**
- ✅ **Preview** 
- ✅ **Development**

## 🔧 Optimizaciones Realizadas

### **1. Package.json Optimizado**
- ❌ Eliminado `@auth/prisma-adapter` (dependencia faltante)
- ❌ Eliminado `@mui/material-pigment-css` (dependencia faltante)
- ✅ Package-lock.json regenerado
- ✅ Scripts de build optimizados

### **2. Configuración de Vercel**
- ✅ `vercel.json` actualizado
- ✅ Script `vercel-build` agregado
- ✅ Configuración de funciones optimizada

### **3. Manejo de Variables de Entorno**
- ✅ `lib/env-config.ts` creado
- ✅ Validación de variables de entorno
- ✅ Configuración segura para desarrollo y producción

## 🚀 Pasos para Desplegar

<<<<<<< HEAD
1. **Preparar el repositorio**:
   \`\`\`bash
   git add .
   git commit -m "Optimización para despliegue Vercel v0"
   git push origin main
   \`\`\`
=======
### **1. Configurar Variables de Entorno**
```bash
# Ir al dashboard de Vercel y agregar todas las variables listadas arriba
```
>>>>>>> 0ea2f51 (Fix: Mejorar gestión de variables de entorno para Vercel - Agregar scripts de configuración automática)

### **2. Desplegar**
```bash
vercel --prod
```

### **3. Verificar Despliegue**
- ✅ Build exitoso
- ✅ Variables de entorno cargadas
- ✅ Base de datos conectada
- ✅ NextAuth funcionando

## 📋 Checklist de Verificación

- [ ] Variables de entorno configuradas en Vercel
- [ ] DATABASE_URL configurada
- [ ] NEXTAUTH_URL actualizada a marioverdu.com
- [ ] Google OAuth configurado
- [ ] Build exitoso
- [ ] Funcionalidad de autenticación
- [ ] Conexión a base de datos
- [ ] APIs funcionando

## ⚠️ Notas Importantes

1. **NEXTAUTH_URL**: Debe ser `https://marioverdu.com` (no la URL de Vercel)
2. **Variables de entorno**: Solo funcionan en el servidor de Vercel, no en el build
3. **Base de datos**: Neon debe estar configurado para aceptar conexiones desde Vercel
4. **Dominio**: Asegúrate de que `marioverdu.com` esté configurado en Vercel

## 🎯 Resultado Esperado

Después de configurar las variables de entorno en Vercel, el despliegue debería funcionar correctamente sin errores de variables de entorno faltantes.
