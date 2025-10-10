# 🔐 Configuración de NextAuth con Google OAuth

## ✅ Configuración Actualizada

### 🔧 Variables de Entorno Actualizadas:

#### **Local (`env.local`)**:
```bash
NEXTAUTH_URL=https://simplecms-marioverdus-projects.vercel.app
GOOGLE_CLIENT_ID=3448168721-9v4g6dj4u3hqe1qscne9g5j153oi5un3.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
NEXTAUTH_SECRET=W3KkSqKhFuwFDH5bogQE7YNOrVQk2TO2gdeCflra9zI=
```

#### **Producción (`env.production.vercel.example`)**:
```bash
NEXTAUTH_URL=https://simplecms-marioverdus-projects.vercel.app
GOOGLE_CLIENT_ID=3448168721-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXTAUTH_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx=
```

## 🌐 Configuración de Google OAuth Console:

### ✅ URLs Autorizadas:
- **JavaScript Origins**:
  - `https://marioverdu.com`
  - `https://simplecms-marioverdus-projects.vercel.app`
  - `http://localhost:3000`

- **Redirect URIs**:
  - `https://marioverdu.com`
  - `https://simplecms-marioverdus-projects.vercel.app/api/auth/callback/google`
  - `http://localhost:3000`

### 🔑 Credenciales:
- **Client ID**: `3448168721-9v4g6dj4u3hqe1qscne9g5j153oi5un3.apps.googleusercontent.com`
- **Client Secret**: `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`

## 🚀 Pasos para Actualizar en Vercel:

### 1. **Acceder al Dashboard de Vercel**:
- Ir a: https://vercel.com/dashboard
- Seleccionar el proyecto `simplecms`

### 2. **Actualizar Variables de Entorno**:
- Ir a **Settings** → **Environment Variables**
- Actualizar `NEXTAUTH_URL`:
  ```
  NEXTAUTH_URL=https://simplecms-marioverdus-projects.vercel.app
  ```

### 3. **Verificar Variables Existentes**:
- ✅ `GOOGLE_CLIENT_ID` (ya configurado)
- ✅ `GOOGLE_CLIENT_SECRET` (ya configurado)
- ✅ `NEXTAUTH_SECRET` (ya configurado)
- 🔄 `NEXTAUTH_URL` (necesita actualización)

### 4. **Redeploy Después de Cambios**:
```bash
vercel --prod
```

## 🔍 Verificación de Funcionamiento:

### ✅ URLs de Prueba:
- **Login**: `https://simplecms-marioverdus-projects.vercel.app/login`
- **Callback**: `https://simplecms-marioverdus-projects.vercel.app/api/auth/callback/google`
- **Admin**: `https://simplecms-marioverdus-projects.vercel.app/admin`

### 🧪 Testing:
1. **Probar login** con Google
2. **Verificar redirección** después del login
3. **Comprobar acceso** al panel de admin
4. **Verificar logout** funciona correctamente

## ⚠️ Notas Importantes:

1. **Tiempo de propagación**: Los cambios en Google OAuth pueden tardar 5 minutos a varias horas
2. **Variables de entorno**: Asegúrate de que todas las variables estén configuradas en Vercel
3. **URLs exactas**: Las URLs deben coincidir exactamente entre Google OAuth y NextAuth
4. **HTTPS requerido**: En producción, todas las URLs deben usar HTTPS

## 🎯 Estado Actual:

- ✅ **Google OAuth configurado** correctamente
- ✅ **URLs autorizadas** incluyen la URL de producción actual
- 🔄 **NEXTAUTH_URL** necesita actualización en Vercel
- ✅ **Credenciales** válidas y funcionando

Una vez actualizada la variable `NEXTAUTH_URL` en Vercel, el sistema de autenticación estará completamente funcional.
