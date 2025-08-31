"use client"

import { useState, useEffect } from "react"
import { ChatButton } from "./chat-button"
import ChatTuentiMaster from "./chat-tuenti-master"

interface ChatTuentiProps {
  buttonPosition?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  initialMessage?: string
  avatarSrc?: string
  botName?: string
  customStyles?: Record<string, string>
  isMobile?: boolean
}

export const ChatTuenti = ({
  buttonPosition = "bottom-right",
  initialMessage,
  avatarSrc = "https://assets.marioverdu.com/avatar/avatar-2.webp",
  botName = "Mario Verdú",
  customStyles = {},
  isMobile = false,
}: ChatTuentiProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isBlinking, setIsBlinking] = useState(false)

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsBlinking(false)
    setHasInteracted(true)
  }

  // Notification effect - disabled blinking
  useEffect(() => {
    // Blinking effect is now disabled
    setIsBlinking(false)
  }, [hasInteracted])

  useEffect(() => {
    const handler = (e: any) => {
      if (e.detail && e.detail.message) {
        if (!isOpen) {
          setIsOpen(true);
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent("sendChatTuentiMessage", { detail: { message: e.detail.message } }));
          }, 400);
        } else {
          window.dispatchEvent(new CustomEvent("sendChatTuentiMessage", { detail: { message: e.detail.message } }));
        }
      }
    };
    window.addEventListener("openChatTuenti", handler);
    return () => window.removeEventListener("openChatTuenti", handler);
  }, [isOpen]);

  return (
    <>
      <ChatButton isOpen={isOpen} onClick={toggleChat} position={buttonPosition} isBlinking={isBlinking} />

      <ChatTuentiMaster
        isOpen={isOpen}
        toggleChat={toggleChat}
        initialMessage={initialMessage}
        avatarSrc={avatarSrc}
        botName={botName}
        customStyles={customStyles}
        isMobile={isMobile}
        buttonPosition={buttonPosition}
      />
    </>
  )
}

export function ChatTuentiMaster() {
  return <ChatTuenti />
}

// Add TypeScript global declaration
declare global {
  interface Window {
    openChatTuentiWithMessage: (message: string) => void
  }
}

export default ChatTuenti
