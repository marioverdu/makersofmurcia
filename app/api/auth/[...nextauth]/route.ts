import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// Verificar variables de entorno requeridas
const requiredEnvVars = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL, // Asegúrate de que esta variable esté bien configurada
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
}

// Log de variables de entorno (sin mostrar valores sensibles)
console.log("🔧 NextAuth Environment Check:", {
  GOOGLE_CLIENT_ID: !!requiredEnvVars.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: !!requiredEnvVars.GOOGLE_CLIENT_SECRET,
  NEXTAUTH_SECRET: !!requiredEnvVars.NEXTAUTH_SECRET,
  NEXTAUTH_URL: requiredEnvVars.NEXTAUTH_URL,
  ADMIN_EMAIL: requiredEnvVars.ADMIN_EMAIL,
})

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: requiredEnvVars.GOOGLE_CLIENT_ID || "",
      clientSecret: requiredEnvVars.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("🔐 SignIn attempt:", {
        userEmail: user.email,
        configuredAdminEmail: requiredEnvVars.ADMIN_EMAIL,
        provider: account?.provider,
      })

      // En desarrollo, permitir cualquier usuario
      if (process.env.NODE_ENV === "development") {
        console.log("✅ Development mode - allowing access")
        return true
      }

      // En producción, verificar email admin
      if (user.email === requiredEnvVars.ADMIN_EMAIL) {
        console.log("✅ Admin access granted")
        return true
      }

      console.log("❌ Access denied - not admin email")
      return false
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
        session.user.isAdmin = session.user.email === requiredEnvVars.ADMIN_EMAIL
      }
      return session
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.isAdmin = user.email === requiredEnvVars.ADMIN_EMAIL
      }
      return token
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  secret: requiredEnvVars.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
