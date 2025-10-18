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
  title: "Makers of Murcia - Asociación Sin Ánimo de Lucro",
  description: "Si puedes pensarlo puedes crearlo. Únete a nosotros para construir el futuro que queremos ver.",
  generator: "Next.js",
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Makers of Murcia',
    description: 'Si puedes pensarlo puedes crearlo. Únete a nosotros para construir el futuro que queremos ver.',
    images: ['/asset/logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Makers of Murcia',
    description: 'Si puedes pensarlo puedes crearlo. Únete a nosotros para construir el futuro que queremos ver.',
    images: ['/asset/logo.png'],
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Climate+Crisis&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className={`${bebasNeue.variable} font-sans antialiased`}>
        <div className="grain-overlay" />
        {children}
        <Analytics />
      </body>
    </html>
  )
}