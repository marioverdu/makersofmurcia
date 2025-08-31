"use client"

import { useState } from "react"
import { ChatButton } from "../chat-button"

export const CustomChatButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleChat = () => {
    setIsOpen(!isOpen)
    // Here you could also trigger the actual chat to open
    // For example, by dispatching a custom event:
    // window.dispatchEvent(new CustomEvent('toggleChatTuenti'))
  }

  return (
    <ChatButton
      isOpen={isOpen}
      onClick={toggleChat}
      position="bottom-right"
      padding={{
        bottom: 8, // Custom padding
        right: 8, // Custom padding
      }}
      size={42} // Custom size
      colors={{
        background: "#518b0d", // Custom color
        backgroundHover: "#3e6a0a",
        icon: "#ffffff",
      }}
    />
  )
}

export default CustomChatButton
