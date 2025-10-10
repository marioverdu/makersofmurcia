"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import ChatTuentiButtonMaster from '@/components/chat-tuenti/chat-tuenti-button-master'
import ChatTuentiMaster from '@/components/chat-tuenti/chat-tuenti-master'

interface GlobalChatContextType {
  isChatOpen: boolean
  toggleChat: () => void
  openChatWithMessage: (message: string) => void
}

const GlobalChatContext = createContext<GlobalChatContextType | undefined>(undefined)

export function useGlobalChat() {
  const context = useContext(GlobalChatContext)
  if (context === undefined) {
    throw new Error('useGlobalChat must be used within a GlobalChatProvider')
  }
  return context
}

interface GlobalChatProviderProps {
  children: React.ReactNode
}

export function GlobalChatProvider({ children }: GlobalChatProviderProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  const openChatWithMessage = (message: string) => {
    if (!isChatOpen) {
      setIsChatOpen(true)
      // Enviar mensaje después de que el chat se abra
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("sendChatTuentiMessage", { 
          detail: { message } 
        }))
      }, 400)
    } else {
      // Si el chat ya está abierto, enviar mensaje directamente
      window.dispatchEvent(new CustomEvent("sendChatTuentiMessage", { 
        detail: { message } 
      }))
    }
  }

  // Escuchar eventos de apertura de chat desde botones
  useEffect(() => {
    const handler = (e: any) => {
      if (e.detail && e.detail.message) {
        openChatWithMessage(e.detail.message)
      }
    }
    
    window.addEventListener("openChatTuenti", handler)
    return () => window.removeEventListener("openChatTuenti", handler)
  }, [isChatOpen])

  const value: GlobalChatContextType = {
    isChatOpen,
    toggleChat,
    openChatWithMessage
  }

  return (
    <GlobalChatContext.Provider value={value}>
      {children}
      
      {/* Chat global único */}
      <ChatTuentiButtonMaster
        isOpen={isChatOpen}
        onToggle={toggleChat}
      />
      <ChatTuentiMaster
        isOpen={isChatOpen}
        toggleChat={toggleChat}
      />
    </GlobalChatContext.Provider>
  )
}

export default GlobalChatProvider
