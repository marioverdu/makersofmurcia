import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST() {
  try {
    console.log("🧪 Test de Resend iniciado...")
    console.log("📧 API Key:", process.env.RESEND_API_KEY ? "Configurada" : "No configurada")
    
    // Test de conexión básica
    const testEmail = {
      from: "chat@marioverdu.com",
      to: ["marioverdugambin@gmail.com", "marioverdugambin@outlook.com"], // Probar con múltiples emails
      subject: "Test de Resend - " + new Date().toLocaleString(),
      text: `Este es un email de prueba para verificar la conexión con Resend.

Fecha: ${new Date().toLocaleString()}
API Key: ${process.env.RESEND_API_KEY ? "Configurada" : "No configurada"}
Dominio: marioverdu.com

Si recibes este email, significa que Resend está funcionando correctamente.

Este email se envió a múltiples direcciones para verificar la entrega.`,
    }

    console.log("📤 Enviando email de prueba...")
    const result = await resend.emails.send(testEmail)
    
    console.log("✅ Email enviado exitosamente!")
    console.log("📋 Resultado:", result)

    return NextResponse.json({
      success: true,
      message: "Test de Resend exitoso - Email enviado a múltiples direcciones",
      emailId: result.data?.id || "unknown",
      timestamp: new Date().toISOString(),
      details: {
        from: testEmail.from,
        to: testEmail.to,
        subject: testEmail.subject,
        note: "Verifica tanto Gmail como Outlook"
      }
    })

  } catch (error) {
    console.error("❌ Error en test de Resend:", error)
    
    return NextResponse.json(
      {
        success: false,
        error: "Error en test de Resend",
        details: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
