import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export interface ProposalEmailData {
  proposalId: string
  planName: string
  price: number
  service: string
  projectType: string
  productType: string
  screens: number
  payment: string
  budget: string
  ipAddress: string
  userAgent: string
  url: string
  createdAt: string
  conversationData?: any
}

export async function sendProposalNotificationEmail(data: ProposalEmailData) {
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

