import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    console.log("📧 Chat: Enviando email desde chat...")
    const { message } = await request.json()

    if (!message) {
      console.log("❌ Chat: Mensaje vacío")
      return NextResponse.json({ error: "Missing message" }, { status: 400 })
    }

    // El subject serán las primeras 8 palabras del mensaje
    const subject = message.split(" ").slice(0, 8).join(" ") || "Nuevo mensaje de contacto"

    console.log("📤 Chat: Enviando email con Resend...")
    console.log("   From: chat@marioverdu.com")
    console.log("   To: marioverdugambin@gmail.com")
    console.log("   Subject:", subject)

    // Enviar email con Resend
    const result = await resend.emails.send({
      from: "chat@marioverdu.com",
      to: "marioverdugambin@gmail.com",
      subject,
      text: message,
    })

    console.log("✅ Chat: Email enviado exitosamente!")
    console.log("📋 Chat: Email ID:", result.data?.id)

    return NextResponse.json({ 
      success: true, 
      message: "Gracias. Su mensaje será revisado a la menor brevedad posible",
      emailId: result.data?.id
    })
  } catch (error) {
    console.error("❌ Chat: Error en send-email API route:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
