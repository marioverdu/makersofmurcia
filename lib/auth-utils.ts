import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

// Detectar si estamos en producción
const isProduction =
  process.env.NODE_ENV === "production" ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ||
  process.env.VERCEL_ENV === "production"

export async function verifyAuth() {
  try {
    if (!isProduction) {
      console.log("🔓 Auth bypassed - Development mode")
      return true
    }

    const session = await getServerSession(authOptions)
    return !!session?.user
  } catch (error) {
    console.error("❌ Error verifying auth:", error)
    return false
  }
}

export async function checkAdminAuth() {
  try {
    if (!isProduction) {
      console.log("🔓 Admin auth bypassed - Development mode")
      return true
    }

    const session = await getServerSession(authOptions)
    const adminEmail = process.env.ADMIN_EMAIL

    const isAdmin = session?.user?.email === adminEmail
    console.log("🔐 Admin check:", {
      userEmail: session?.user?.email,
      adminEmail,
      isAdmin,
    })

    return isAdmin
  } catch (error) {
    console.error("❌ Error checking admin auth:", error)
    return false
  }
}

export async function getCurrentUser() {
  try {
    if (!isProduction) {
      return {
        id: "dev-user",
        email: "dev@example.com",
        name: "Development User",
        isAdmin: true,
      }
    }

    const session = await getServerSession(authOptions)
    return session?.user || null
  } catch (error) {
    console.error("❌ Error getting current user:", error)
    return null
  }
}

export async function requireAuth() {
  const isAuthenticated = await verifyAuth()
  if (!isAuthenticated) {
    redirect("/login")
  }
  return true
}

export async function requireAdmin() {
  const isAdmin = await checkAdminAuth()
  if (!isAdmin) {
    redirect("/login")
  }
  return true
}

export async function getServerAuthSession() {
  try {
    return await getServerSession(authOptions)
  } catch (error) {
    console.error("❌ Error getting server session:", error)
    return null
  }
}
