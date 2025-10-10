"use client"

import { useCallback } from "react"

interface StoredMessage {
  id: string
  content: string
  sender: "user" | "bot" | "system"
  timestamp: string
  type?: string
  metadata?: any
}

interface StoredConversation {
  conversationId: string
  messages: StoredMessage[]
  flowState?: {
    step: string
    responses: Record<string, any>
    systemInfo: string
    currentProposalId?: string
    conversationId?: string
    lastActivity?: string
  }
  lastActivity: string
}

export function useConversationStorage() {
  const generateDeviceId = useCallback(() => {
    return `device_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  }, [])

  const saveConversation = useCallback(async (conversationData: StoredConversation) => {
    try {
      // Guardar en localStorage
      localStorage.setItem("chatTuentiConversation", JSON.stringify(conversationData))

      // También guardar en formato legacy para compatibilidad
      const legacyConversations = JSON.parse(localStorage.getItem("chatTuentiConversations") || "{}")
      legacyConversations[conversationData.conversationId] = conversationData.messages
      localStorage.setItem("chatTuentiConversations", JSON.stringify(legacyConversations))

      return true
    } catch (error) {
      console.error("Error saving conversation:", error)
      return false
    }
  }, [])

  const loadConversation = useCallback(async (conversationId: string): Promise<StoredConversation | null> => {
    try {
      // Intentar cargar desde el nuevo formato
      const stored = localStorage.getItem("chatTuentiConversation")
      if (stored) {
        const conversationData = JSON.parse(stored)
        if (conversationData.conversationId === conversationId) {
          return conversationData
        }
      }

      // Fallback al formato legacy
      const legacyConversations = JSON.parse(localStorage.getItem("chatTuentiConversations") || "{}")
      const legacyMessages = legacyConversations[conversationId]

      if (legacyMessages && legacyMessages.length > 0) {
        return {
          conversationId,
          messages: legacyMessages,
          lastActivity: new Date().toISOString(),
        }
      }

      return null
    } catch (error) {
      console.error("Error loading conversation:", error)
      return null
    }
  }, [])

  const clearConversation = useCallback(async (conversationId: string) => {
    try {
      // Limpiar nuevo formato
      localStorage.removeItem("chatTuentiConversation")

      // Limpiar formato legacy
      const legacyConversations = JSON.parse(localStorage.getItem("chatTuentiConversations") || "{}")
      delete legacyConversations[conversationId]
      localStorage.setItem("chatTuentiConversations", JSON.stringify(legacyConversations))

      return true
    } catch (error) {
      console.error("Error clearing conversation:", error)
      return false
    }
  }, [])

  return {
    generateDeviceId,
    saveConversation,
    loadConversation,
    clearConversation,
  }
}
