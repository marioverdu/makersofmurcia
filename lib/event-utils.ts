// Simple event utilities for client-side communication

export function emitChatEvent(eventName: string, data: any) {
  if (typeof window !== "undefined") {
    const event = new CustomEvent(eventName, { detail: data })
    window.dispatchEvent(event)
  }
}

export function listenToChatEvent(eventName: string, callback: (data: any) => void) {
  if (typeof window !== "undefined") {
    const handler = (event: CustomEvent) => callback(event.detail)
    window.addEventListener(eventName, handler as EventListener)

    return () => {
      window.removeEventListener(eventName, handler as EventListener)
    }
  }

  return () => {}
}

// Simple notification system
export function showNotification(message: string, type: "success" | "error" | "info" = "info") {
  if (typeof window !== "undefined") {
    // Simple browser notification or console log
    console.log(`[${type.toUpperCase()}] ${message}`)

    // You could implement a toast system here if needed
    emitChatEvent("notification", { message, type })
  }
}
