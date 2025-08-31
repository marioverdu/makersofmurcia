import type React from "react"
import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"
import SessionProvider from "@/components/auth/session-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { FaviconLoader } from "@/components/favicon-loader"

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: "Mario Verdú - Blog Personal y Portfolio",
  description: "Blog personal de Mario Verdú con artículos sobre desarrollo web, tecnología, y experiencias profesionales. Portfolio y proyectos de desarrollo.",
  generator: "Next.js",
  authors: [{ name: "Mario Verdú" }],
  keywords: ["desarrollo web", "tecnología", "blog", "portfolio", "programación"],
  openGraph: {
    title: "Mario Verdú - Blog Personal y Portfolio",
    description: "Blog personal de Mario Verdú con artículos sobre desarrollo web, tecnología, y experiencias profesionales.",
    url: "https://marioverdu.com",
    siteName: "Mario Verdú - Blog",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mario Verdú - Blog Personal y Portfolio",
    description: "Blog personal de Mario Verdú con artículos sobre desarrollo web, tecnología, y experiencias profesionales.",
  },
}

// Función para detectar si estamos en desarrollo
function isDevelopment() {
  return process.env.NODE_ENV === 'development' || 
         process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isDev = isDevelopment()
  
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Google Fonts Material Icons */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className={nunito.className}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <FaviconLoader />
            {children}
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
