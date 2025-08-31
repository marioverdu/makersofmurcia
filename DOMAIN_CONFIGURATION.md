# 🌐 Configuración de Dominio Personalizado en Vercel

## 🎯 Objetivo
Configurar `marioverdu.com` como dominio personalizado en Vercel para el proyecto.

## 📋 Pasos para Configurar el Dominio

### **1. En el Dashboard de Vercel**

1. **Ir al proyecto**:
   - Ve a [vercel.com](https://vercel.com)
   - Selecciona tu proyecto `simplecms`

2. **Configurar dominio**:
   - Ve a **Settings** → **Domains**
   - Haz clic en **Add Domain**
   - Ingresa: `marioverdu.com`
   - Haz clic en **Add**

### **2. Configurar DNS**

Vercel te proporcionará registros DNS para configurar. Típicamente necesitarás:

#### **Opción A: Usar los nameservers de Vercel (Recomendado)**
```
Nameserver 1: ns1.vercel-dns.com
Nameserver 2: ns2.vercel-dns.com
Nameserver 3: ns3.vercel-dns.com
```

#### **Opción B: Configurar registros A/CNAME**
```
Tipo: A
Nombre: @
Valor: 76.76.19.34

Tipo: CNAME
Nombre: www
Valor: cname.vercel-dns.com
```

### **3. Verificar Configuración**

1. **En Vercel**:
   - El dominio aparecerá como "Pending" hasta que se configure DNS
   - Una vez configurado, cambiará a "Valid"

2. **Verificar DNS**:
   ```bash
   # Verificar que el dominio apunta a Vercel
   nslookup marioverdu.com
   dig marioverdu.com
   ```

## 🔧 Variables de Entorno Específicas del Dominio

### **Actualizar NEXTAUTH_URL**
```bash
# En el dashboard de Vercel → Environment Variables
NEXTAUTH_URL=https://marioverdu.com
```

### **Verificar Google OAuth**
1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Selecciona tu proyecto
3. Ve a **APIs & Services** → **Credentials**
4. Edita tu OAuth 2.0 Client ID
5. Agrega a **Authorized redirect URIs**:
   ```
   https://marioverdu.com/api/auth/callback/google
   ```

## 🚀 Despliegue con Dominio Personalizado

### **1. Desplegar a producción**
```bash
vercel --prod
```

### **2. Verificar despliegue**
- ✅ Build exitoso
- ✅ Dominio configurado
- ✅ SSL/HTTPS funcionando
- ✅ Variables de entorno cargadas

## 📊 Monitoreo Post-Despliegue

### **Verificar Funcionalidad**
- [ ] Página principal carga correctamente
- [ ] Autenticación con Google funciona
- [ ] APIs responden correctamente
- [ ] Base de datos conectada
- [ ] Emails se envían correctamente

### **Verificar SEO**
- [ ] Meta tags configurados
- [ ] Open Graph tags funcionando
- [ ] Sitemap generado
- [ ] Robots.txt configurado

## ⚠️ Consideraciones Importantes

1. **SSL/HTTPS**: Vercel proporciona SSL automáticamente
2. **Cache**: Puede tomar hasta 24 horas para que los cambios DNS se propaguen
3. **Subdominios**: Puedes agregar subdominios como `www.marioverdu.com`
4. **Redirects**: Configura redirects de `www` a `non-www` si es necesario

## 🎯 Resultado Final

Después de completar estos pasos:
- ✅ `marioverdu.com` apuntará a tu aplicación
- ✅ SSL/HTTPS funcionando
- ✅ Autenticación configurada
- ✅ Variables de entorno optimizadas
- ✅ Despliegue estable y confiable

