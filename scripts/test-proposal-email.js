import dotenv from 'dotenv'
import { Resend } from 'resend'

dotenv.config({ path: '.env.local' })

const resend = new Resend(process.env.RESEND_API_KEY)

async function sendProposalNotificationEmail(data) {
  try {
    console.log("📧 Enviando notificación de propuesta pendiente...")
    
    const subject = `${data.planName} - ${data.price}€`
    
    const emailContent = `
Nueva propuesta pendiente recibida:

📋 DETALLES DE LA PROPUESTA:
• ID: ${data.proposalId}
• Plan: ${data.planName}
• Precio: ${data.price}€
• Servicio: ${data.service}
• Tipo de proyecto: ${data.projectType}
• Tipo de producto: ${data.productType}
• Pantallas: ${data.screens}
• Método de pago: ${data.payment}
• Presupuesto: ${data.budget}

🌐 INFORMACIÓN TÉCNICA:
• IP: ${data.ipAddress}
• Navegador: ${data.userAgent}
• URL origen: ${data.url}
• Fecha: ${new Date(data.createdAt).toLocaleString('es-ES')}

📱 ACCIONES DISPONIBLES:
• Revisar en admin: https://marioverdu.com/admin/booking
• Aprobar/Rechazar desde el panel de administración

---
Este email fue enviado automáticamente cuando se recibió una nueva propuesta.
`

    const result = await resend.emails.send({
      from: "notifications@marioverdu.com",
      to: process.env.ADMIN_EMAIL || "marioverdugambin@gmail.com",
      subject,
      text: emailContent,
    })

    console.log("✅ Email de propuesta enviado exitosamente!")
    console.log("📋 Email ID:", result.data?.id)
    
    return { success: true, emailId: result.data?.id }
  } catch (error) {
    console.error("❌ Error enviando email de propuesta:", error)
    return { success: false, error: error instanceof Error ? error.message : "Error desconocido" }
  }
}

async function testProposalEmail() {
  console.log('🧪 Probando envío de email de propuesta...')
  
  // Datos de prueba
  const testProposal = {
    proposalId: 'proposal_test_' + Date.now(),
    planName: 'Jetpack',
    price: 720.00,
    service: 'uxui',
    projectType: 'rediseno',
    productType: 'web',
    screens: 6,
    payment: 'cash',
    budget: '720.00€',
    ipAddress: '88.20.246.97',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    url: 'https://www.marioverdu.com/es',
    createdAt: new Date().toISOString(),
    conversationData: {
      test: true,
      message: 'Esta es una propuesta de prueba'
    }
  }
  
  try {
    const result = await sendProposalNotificationEmail(testProposal)
    
    if (result.success) {
      console.log('✅ Email de propuesta enviado exitosamente!')
      console.log('📋 Email ID:', result.emailId)
      console.log('📧 Destinatario:', process.env.ADMIN_EMAIL)
      console.log('📝 Asunto:', `${testProposal.planName} - ${testProposal.price}€`)
    } else {
      console.error('❌ Error enviando email:', result.error)
    }
  } catch (error) {
    console.error('❌ Error en test:', error.message)
  }
}

testProposalEmail()
