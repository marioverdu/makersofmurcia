"use client"

import React, { useState, useEffect } from "react"
import { CHAT_TUENTI_CONFIG } from "./config"
import ChatTuentiMaster from "./chat-tuenti-master"
import { MessageCircle, X } from "lucide-react"

interface ChatButtonProps {
  isOpen: boolean
  onClick: () => void
  position: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  ariaLabel: string
}

export interface ChatTuentiButtonV2Props {
  isOpen?: boolean
  onClick?: () => void
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  size?: number
  padding?: {
    bottom?: number
    right?: number
    left?: number
    top?: number
  }
  colors?: {
    background?: string
    backgroundHover?: string
    icon?: string
  }
  customClassName?: string
  ariaLabel?: string
  isBlinking?: boolean
  initialMessage?: string
  avatarSrc?: string
  botName?: string
  customStyles?: Record<string, string>
  isMobile?: boolean
}

// ChatButton: Este componente representa el BOTÓN flotante que abre/cierra la ventana del chat
export const ChatTuentiButtonV2: React.FC<ChatTuentiButtonV2Props> = ({
  isOpen: externalIsOpen,
  onClick: externalOnClick,
  position = "bottom-right",
  size = CHAT_TUENTI_CONFIG.button.size,
  padding = CHAT_TUENTI_CONFIG.button.padding,
  colors = CHAT_TUENTI_CONFIG.button.colors,
  customClassName = "",
  ariaLabel,
  isBlinking = false,
  initialMessage,
  avatarSrc,
  botName,
  customStyles,
  isMobile,
}) => {
  // Internal state to manage window visibility if not controlled externally
  const [internalIsOpen, setInternalIsOpen] = useState(false)

  // DISABLED: Cookie system teardown - All cookie-related states disabled
  // const [cookieStatus, setCookieStatus] = useState<"pending" | "accepted" | "rejected" | null>(null)
  // const [showCookieConsent, setShowCookieConsent] = useState(false)
  // const [showChatButton, setShowChatButton] = useState(false)
  const showChatButton = true // FORCED TRUE: Always show chat button

  // Determine if component is controlled or uncontrolled
  const isControlled = externalIsOpen !== undefined && externalOnClick !== undefined
  const isOpen = isControlled ? externalIsOpen : internalIsOpen

  // Toggle function that either calls external handler or manages internal state
  const toggleChat = () => {
    if (isControlled && externalOnClick) {
      externalOnClick()
    } else {
      setInternalIsOpen(!internalIsOpen)
    }
  }

  // Calculate position classes based on the position prop and padding
  const getPositionClasses = () => {
    // Only apply position classes if not overridden by customClassName containing "static"
    if (customClassName.includes("static")) {
      return ""
    }

    const positions = {
      "bottom-right": `bottom-${padding.bottom} right-${padding.right}`,
      "bottom-left": `bottom-${padding.bottom} left-${padding.left}`,
      "top-right": `top-${padding.top} right-${padding.right}`,
      "top-left": `top-${padding.top} left-${padding.left}`,
    }
    return positions[position]
  }

  // Determine if this is a fixed or static button
  const isFixedButton = !customClassName.includes("static")
  const buttonPositionClasses = getPositionClasses()

  // Add CSS variable to document root to control chat position
  React.useEffect(() => {
    document.documentElement.style.setProperty("--chat-window-offset-y", "-8px")
    return () => {
      document.documentElement.style.removeProperty("--chat-window-offset-y")
    }
  }, [])

  // DISABLED: Cookie system teardown - All cookie checking logic disabled
  useEffect(() => {
    // DISABLED: Cookie preference checking
    // const checkCookiePreference = () => {
    //   if (typeof window !== "undefined") {
    //     const cookiePreference = localStorage.getItem("cookie-preference")
    //     if (cookiePreference) {
    //       setCookieStatus(cookiePreference === "accept_all" ? "accepted" : "rejected")
    //       setShowChatButton(true)
    //       setShowCookieConsent(false)
    //     } else {
    //       setCookieStatus("pending")
    //       setShowChatButton(false)
    //       setShowCookieConsent(true)
    //     }
    //   }
    // }
    // checkCookiePreference()
    // const handleCookiePreferenceSet = () => {
    //   checkCookiePreference()
    // }
    // window.addEventListener("cookiePreferenceSet", handleCookiePreferenceSet)
    // window.addEventListener("storage", (e) => {
    //   if (e.key === "cookie-preference") {
    //     checkCookiePreference()
    //   }
    // })
    // return () => {
    //   window.removeEventListener("cookiePreferenceSet", handleCookiePreferenceSet)
    //   window.removeEventListener("storage", handleCookiePreferenceSet)
    // }
  }, [])

  // DISABLED: Cookie system teardown - Cookie consent action listener disabled
  useEffect(() => {
    // const handleCookieConsentAction = (event: CustomEvent) => {
    //   if (event.detail && event.detail.action) {
    //     setCookieStatus(event.detail.action === "accept_all" ? "accepted" : "rejected")
    //     setShowCookieConsent(false)
    //     setShowChatButton(true)
    //   }
    // }
    // window.addEventListener("cookieConsentAction", handleCookieConsentAction as EventListener)
    // return () => {
    //   window.removeEventListener("cookieConsentAction", handleCookieConsentAction as EventListener)
    // }
  }, [])

  // DISABLED: Cookie system teardown - Cookie action handler disabled
  const handleCookieAction = (action: string) => {
    console.log("Cookie system disabled - handleCookieAction", action)
    // DISABLED: Cookie handling logic
    // localStorage.setItem("cookie-preference", action)
    // setCookieStatus(action === "accept_all" ? "accepted" : "rejected")
    // setShowCookieConsent(false)
    // setShowChatButton(true)
    // const event = new Event("cookiePreferenceSet")
    // window.dispatchEvent(event)
  }

  return (
    <>
      {/* Chat button */}
      {showChatButton && (
        <button
          onClick={toggleChat}
          className={`fixed ${buttonPositionClasses} z-[1000] transition-all rounded-full flex items-center justify-center shadow-md bg-primary hover:bg-primary/90 ${isBlinking ? "msn-blinking" : ""} ${customClassName}`}
          style={{
            width: customClassName.includes("static") ? `${size}px` : "36px",
            height: customClassName.includes("static") ? `${size}px` : "36px",
            transform: "translateX(8px) translateY(8px)", // Mover el BOTÓN 8px hacia la derecha y 8px hacia abajo
          }}
          aria-label={ariaLabel || (isOpen ? "Close chat" : "Open chat")}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      )}

      {/* DISABLED: Cookie system teardown - Cookie consent UI disabled */}
      {/* 
      {showCookieConsent && !showChatButton && cookieStatus === "pending" && (
        <CookiesWindow
          onAction={(action) => {
            handleCookieAction(action)
          }}
        />
      )}
      */}

      {/* Render ChatTuentiWindow if chat is open and button is visible */}
      {!isControlled && isOpen && showChatButton && (
        <ChatTuentiMaster
          isOpen={internalIsOpen}
          toggleChat={toggleChat}
          buttonPosition={position}
          initialMessage={initialMessage}
          avatarSrc={avatarSrc}
          botName={botName}
          customStyles={customStyles}
          isMobile={isMobile}
        />
      )}
    </>
  )
}

// For backward compatibility
export const ChatButton = ChatTuentiButtonV2
export default ChatTuentiButtonV2
