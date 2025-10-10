import "next-auth"

declare module "next-auth" {
  interface Session {
    user?: {
      name?: string | null
      email?: string | null
      image?: string | null
      isAdmin?: boolean
    }
  }
}

// Añadir la declaración del tipo global para la función openChatTuentiWithMessage

// Añadir esto al final del archivo:

declare global {
  interface Window {
    openChatTuentiWithMessage: (message: string) => void
  }
}
