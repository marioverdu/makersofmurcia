# 🚀 Guía de Configuración de Vercel

## Problema Actual
El build de Vercel está fallando porque `DATABASE_URL` no está configurado en las variables de entorno de Vercel.

## Solución

### Opción 1: Configuración Manual (Recomendada)

1. **Ve al Dashboard de Vercel**
   - Abre https://vercel.com/dashboard
   - Selecciona tu proyecto

2. **Configura las Variables de Entorno**
   - Ve a **Settings** > **Environment Variables**
   - Agrega las siguientes variables:

#### Variables Críticas de Base de Datos:
```
DATABASE_URL=postgres://neondb_owner:npg_DjTA32wLyFPg@ep-weathered-cake-ad2ijk3r-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
POSTGRES_PRISMA_URL=postgres://neondb_owner:npg_DjTA32wLyFPg@ep-weathered-cake-ad2ijk3r-pooler.c-2.us-east-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require
POSTGRES_URL_NON_POOLING=postgres://neondb_owner:npg_DjTA32wLyFPg@ep-weathered-cake-ad2ijk3r.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
POSTGRES_USER=neondb_owner
POSTGRES_PASSWORD=npg_DjTA32wLyFPg
POSTGRES_DATABASE=neondb
```

#### Variables de Autenticación:
```
NEXTAUTH_SECRET=W3KkSqKhFuwFDH5bogQE7YNOrVQk2TO2gdeCflra9zI=
NEXTAUTH_URL=https://aaa23444.vercel.app/
GOOGLE_CLIENT_ID=3448168721-9v4g6dj4u3hqe1qscne9g5j153oi5un3.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
```

#### Variables de Email:
```
RESEND_API_KEY=re_bXZqNypo_HjhdM2RtX7mHmMXZhgrH3kBr
ADMIN_EMAIL=marioverdugambin@gmail.com
NEXT_PUBLIC_ADMIN_EMAIL=marioverdugambin@gmail.com
```

#### Variables de Redis/KV:
```
KV_REST_API_TOKEN=ATeiAAIjcDFiZDE3MmNjODAxYWI0NzQ1OWM0ZjU4ZmE2MmMxMGFlY3AxMA
KV_REST_API_URL=https://model-bear-14242.upstash.io
KV_REST_API_READ_ONLY_TOKEN=AjeiAAIgcDEwl7oLQyWOkvHYtX8D8msSXH5oloTpk1z7Cx_SUvH5JA
REDIS_URL=rediss://default:ATeiAAIjcDFiZDE3MmNjODAxYWI0NzQ1OWM0ZjU4ZmE2MmMxMGFlY3AxMA@model-bear-14242.upstash.io:6379
KV_URL=rediss://default:ATeiAAIjcDFiZDE3MmNjODAxYWI0NzQ1OWM0ZjU4ZmE2MmMxMGFlY3AxMA@model-bear-14242.upstash.io:6379
```

#### Variables de Stack:
```
STACK_SECRET_SERVER_KEY=ssk_dbzjk61asjpcrfsbhbxe3p0rtcwx65cwcbf3t8cn3np2r
NEXT_PUBLIC_STACK_PROJECT_ID=1cabdeef-64a3-4c44-97f6-523e9a1fed70
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=pck_p649byaydkcar531jatbjdbpr4pgqv4syc7dpf3vfgjs8
```

### Opción 2: Usar Vercel CLI

1. **Instala Vercel CLI** (si no lo tienes):
   ```bash
   npm install -g vercel
   ```

2. **Ejecuta el script de configuración**:
   ```bash
   ./scripts/setup-vercel-env.sh
   ```

3. **O configura manualmente con CLI**:
   ```bash
   vercel env add DATABASE_URL production
   # Repite para cada variable
   ```

### Opción 3: Usar el Comando Directo

```bash
# Configurar variables una por una
vercel env add DATABASE_URL production
vercel env add POSTGRES_PRISMA_URL production
vercel env add NEXTAUTH_SECRET production
# ... etc
```

## Después de Configurar las Variables

1. **Hacer Commit y Push**:
   ```bash
   git add .
   git commit -m "Fix: Mejorar gestión de variables de entorno para Vercel"
   git push
   ```

2. **Desplegar**:
   ```bash
   vercel --prod
   ```

## Verificación

Después del despliegue, verifica que:
- ✅ El build no falle por `DATABASE_URL`
- ✅ Las APIs funcionen correctamente
- ✅ La autenticación funcione
- ✅ Los emails se envíen

## Troubleshooting

### Si el build sigue fallando:
1. Verifica que todas las variables estén configuradas en Vercel
2. Asegúrate de que los valores sean correctos
3. Revisa los logs de build en Vercel

### Si las APIs no funcionan:
1. Verifica que `DATABASE_URL` esté configurado correctamente
2. Revisa que la base de datos esté accesible desde Vercel
3. Verifica los logs de las funciones serverless

## Notas Importantes

- Las variables de entorno en Vercel son **case-sensitive**
- Asegúrate de configurar las variables para **Production** y **Preview**
- Las variables `NEXT_PUBLIC_*` son visibles en el cliente
- Las demás variables solo están disponibles en el servidor
