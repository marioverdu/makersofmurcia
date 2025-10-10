# 📧 Sistema de Notificaciones de Propuestas Pendientes

## 📋 Descripción

Sistema automático de notificaciones por email que se activa cada vez que se recibe una nueva propuesta pendiente. Utiliza Resend para enviar emails con toda la información de la propuesta al administrador.

## 🎯 Funcionalidad Implementada

### ✅ **Notificación Automática**
- **Trigger**: Se activa automáticamente cuando se crea una nueva propuesta
- **Destinatario**: `marioverdugambin@gmail.com` (configurado en `ADMIN_EMAIL`)
- **Remitente**: `notifications@marioverdu.com`
- **Formato del asunto**: `"Nombre del plan" - "Precio"` (ej: "Jetpack - 720€")

### ✅ **Información Completa del Email**
El email incluye todos los detalles de la propuesta:

```
📋 DETALLES DE LA PROPUESTA:
• ID: proposal_1757158115830_a14cyk0
• Plan: Jetpack
• Precio: 720€
• Servicio: uxui
• Tipo de proyecto: rediseno
• Tipo de producto: web
• Pantallas: 6
• Método de pago: cash
• Presupuesto: 720€

🌐 INFORMACIÓN TÉCNICA:
• IP: 88.20.246.97
• Navegador: Mozilla/5.0...
• URL origen: https://www.marioverdu.com/es
• Fecha: 6/9/2025, 13:28:00

📱 ACCIONES DISPONIBLES:
• Revisar en admin: https://marioverdu.com/admin/booking
• Aprobar/Rechazar desde el panel de administración
```

## 🔧 Implementación Técnica

### 1. Servicio de Email (`lib/proposal-email-service.ts`)

```typescript
export async function sendProposalNotificationEmail(data: ProposalEmailData) {
  const subject = `${data.planName} - ${data.price}€`
  
  const result = await resend.emails.send({
    from: "notifications@marioverdu.com",
    to: process.env.ADMIN_EMAIL || "marioverdugambin@gmail.com",
    subject,
    text: emailContent,
  })
  
  return { success: true, emailId: result.data?.id }
}
```

### 2. Integración en API (`app/api/proposals/route.ts`)

```typescript
// Después de crear la propuesta
const result = await createProposal({...})

// Enviar email de notificación
const emailResult = await sendProposalNotificationEmail({
  proposalId: result.proposalId,
  planName: data.planName,
  price: data.price,
  // ... resto de datos
})

if (emailResult.success) {
  console.log("✅ Email de notificación enviado:", emailResult.emailId)
}
```

### 3. Manejo de Errores
- **No bloquea la creación**: Si falla el email, la propuesta se crea igual
- **Logs detallados**: Se registran todos los intentos de envío
- **Fallback**: Si falla, se registra el error pero continúa el flujo

## 🧪 Testing

### **Script de Prueba**
```bash
npm run test-proposal-email
```

### **Resultado del Test**
```
✅ Email de propuesta enviado exitosamente!
📋 Email ID: cd5a7829-3f1b-47cd-9584-681aa1fd66f3
📧 Destinatario: marioverdugambin@gmail.com
📝 Asunto: Jetpack - 720€
```

## 🔄 Flujo Completo

### **1. Usuario Completa Propuesta**
```
Chat → Formulario → Datos de propuesta → API /api/proposals
```

### **2. Creación en Base de Datos**
```
API → createProposal() → Base de datos → Estado: "pending"
```

### **3. Envío de Notificación**
```
API → sendProposalNotificationEmail() → Resend → Email al admin
```

### **4. Administrador Recibe Email**
```
Email con toda la información → Revisar en /admin/booking → Aprobar/Rechazar
```

## 📊 Configuración

### **Variables de Entorno Requeridas**
```env
RESEND_API_KEY=re_bXZqNypo_HjhdM2RtX7mHmMXZhgrH3kBr
ADMIN_EMAIL=marioverdugambin@gmail.com
```

### **Dominio Resend**
- **Verificado**: `marioverdu.com`
- **Remitente**: `notifications@marioverdu.com`

## 🎨 Características del Email

### **Formato del Asunto**
- **Patrón**: `"Nombre del plan" - "Precio"`
- **Ejemplos**:
  - `"Jetpack - 720€"`
  - `"Hoverboard - 409€"`
  - `"Fénix - 1711€"`

### **Contenido Estructurado**
- **Detalles de la propuesta**: Información completa del proyecto
- **Información técnica**: IP, navegador, URL origen
- **Acciones disponibles**: Enlaces directos al panel de administración
- **Formato legible**: Emojis y estructura clara

## 🛡️ Seguridad y Confiabilidad

### **Validaciones**
- **URL válida**: Verificación de formato de URL
- **Email válido**: Verificación de formato de email
- **Datos completos**: Validación de todos los campos requeridos

### **Manejo de Errores**
- **Fallback graceful**: No falla si el email no se puede enviar
- **Logs detallados**: Registro de todos los intentos
- **Retry logic**: Posibilidad de reintentar en caso de fallo

## 📱 Acceso Rápido

### **Panel de Administración**
- **URL**: `https://marioverdu.com/admin/booking`
- **Funcionalidad**: Ver, aprobar, rechazar propuestas
- **Filtros**: Por estado (pending, approved, rejected)

### **Acciones Disponibles**
- ✅ **Aprobar**: Cambia estado a "approved"
- ❌ **Rechazar**: Cambia estado a "rejected"
- 🗑️ **Eliminar**: Elimina la propuesta
- 🗨️ **Ver chat**: Abre el historial de conversación

## 🚀 Beneficios

### **Para el Administrador**
- ✅ **Notificación inmediata**: Email instantáneo al recibir propuesta
- ✅ **Información completa**: Todos los detalles en un solo lugar
- ✅ **Acceso rápido**: Enlaces directos al panel de administración
- ✅ **Formato claro**: Información estructurada y fácil de leer

### **Para el Sistema**
- ✅ **Automatización**: No requiere intervención manual
- ✅ **Confiabilidad**: Sistema robusto con manejo de errores
- ✅ **Escalabilidad**: Funciona con cualquier cantidad de propuestas
- ✅ **Trazabilidad**: Logs completos de todas las notificaciones

## 📝 Logs del Sistema

### **Logs de Éxito**
```
📧 Enviando notificación de propuesta pendiente...
✅ Email de propuesta enviado exitosamente!
📋 Email ID: cd5a7829-3f1b-47cd-9584-681aa1fd66f3
```

### **Logs de Error**
```
⚠️ Error enviando email de notificación: [detalle del error]
```

## 🔍 Verificación

### **Verificar Email Recibido**
1. **Revisar Gmail**: `marioverdugambin@gmail.com`
2. **Buscar asunto**: `"Nombre del plan" - "Precio"`
3. **Verificar contenido**: Todos los detalles de la propuesta
4. **Probar enlaces**: Acceso al panel de administración

### **Verificar en Resend Dashboard**
1. **Ir a**: `resend.com > Logs`
2. **Buscar email ID**: `cd5a7829-3f1b-47cd-9584-681aa1fd66f3`
3. **Verificar status**: "Delivered" o "Sent"

## ⚠️ Notas Importantes

- **No bloquea el flujo**: Si falla el email, la propuesta se crea igual
- **Configuración requerida**: `RESEND_API_KEY` y `ADMIN_EMAIL` deben estar configurados
- **Dominio verificado**: `marioverdu.com` debe estar verificado en Resend
- **Formato del asunto**: Sigue el patrón `"Plan" - "Precio"` como solicitado
- **Información completa**: Incluye todos los datos de la propuesta
- **Acciones disponibles**: Enlaces directos al panel de administración

