import type React from "react"
import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"
import "@/styles/tokens.css"
import "@/styles/utilities.css"
import SessionProvider from "@/components/auth/session-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: "Light CMS Template",
  description: "Una versión extremadamente ligera para desarrollo de componentes con Design System completo y Storybook integrado.",
  generator: "Next.js",
  keywords: ["cms", "template", "design system", "storybook", "nextjs"],
  openGraph: {
    title: "Light CMS Template",
    description: "Una versión extremadamente ligera para desarrollo de componentes con Design System completo y Storybook integrado.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Light CMS Template",
    description: "Una versión extremadamente ligera para desarrollo de componentes con Design System completo y Storybook integrado.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={nunito.className}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}