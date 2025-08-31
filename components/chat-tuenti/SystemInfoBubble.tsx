"use client"
import React from "react"
import { CHAT_BUBBLE_RADIUS } from "@/lib/design-tokens"

export interface QuickReplyOption {
  id: string
  text: string
  action: string
}

interface SystemInfoBubbleMasterProps {
  content: string
  quickReplies?: QuickReplyOption[]
  onQuickReply?: (action: string, text: string) => void
  isSubmitting?: boolean
  sender?: "bot" | "system" | "user"
}

export const SystemInfoBubbleMaster: React.FC<SystemInfoBubbleMasterProps> = ({
  content,
  quickReplies,
  onQuickReply,
  isSubmitting = false,
  sender = "bot",
}) => {
  return (
    <div
      className={`systeminfochat max-w-[95%] p-0 text-[#2D3748] bg-transparent`}
    >
      <div className="whitespace-pre-wrap break-words">{content}</div>
      {quickReplies && quickReplies.length > 0 && (
        <div className="quick-reply-container mt-2 space-y-2">
          {quickReplies.map((option) => (
            <button
              key={option.id}
              className="block text-left px-3 py-2 border border-[#dedede] text-[#333333] text-sm font-normal transition-all duration-200 quick-reply-option bg-transparent hover:bg-transparent focus:bg-transparent"
              style={{ borderRadius: CHAT_BUBBLE_RADIUS }}
              onClick={() => onQuickReply && onQuickReply(option.action, option.text)}
              disabled={isSubmitting}
              aria-label={option.text}
              data-option-action={option.action}
              data-option-id={option.id}
            >
              {option.text}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Nuevo componente para bubbles del usuario
interface UserBubbleMasterProps {
  content: string
}

export const UserBubbleMaster: React.FC<UserBubbleMasterProps> = ({ content }) => {
  return (
    <div
      className="userbubblemaster max-w-[95%] bg-[rgb(61,91,106)] shadow-sm p-0"
      style={{
        borderTopLeftRadius: CHAT_BUBBLE_RADIUS,
        borderTopRightRadius: CHAT_BUBBLE_RADIUS,
        borderBottomLeftRadius: CHAT_BUBBLE_RADIUS,
        borderBottomRightRadius: 2, // Mantengo la esquina especial, pero puedes cambiar a CHAT_BUBBLE_RADIUS si quieres unificar todo
      }}
    >
      <div className="whitespace-pre-wrap break-words p-2 text-white text-sm font-normal" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif' }}>{content}</div>
    </div>
  )
}
