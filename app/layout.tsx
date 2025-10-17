import type React from "react"
import type { Metadata } from "next"
import { Bebas_Neue } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const bebasNeue = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-bebas-neue",
})

export const metadata: Metadata = {
  title: "DESPIERTA - Asociación Sin Ánimo de Lucro",
  description: "Únete al movimiento. Eventos para jóvenes que quieren cambiar el mundo.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${bebasNeue.variable} font-sans antialiased`}>
        <div className="grain-overlay" />
        {children}
        <Analytics />
      </body>
    </html>
  )
}